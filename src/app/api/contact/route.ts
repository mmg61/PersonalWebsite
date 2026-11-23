import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

const rateLimitMap = new Map<string, number>();
const usedNoncesMap = new Map<string, number>();

const RATE_LIMIT_WINDOW_MS = 15_000;
const CAPTCHA_TTL_MS = 10 * 60 * 1000;
const MAX_MAP_SIZE = 1000;

const FALLBACK_RUNTIME_SECRET = crypto.randomBytes(32).toString("hex");

function getSigningSecret(): string {
  return (
    process.env.CAPTCHA_SECRET ||
    process.env.WEB3FORMS_ACCESS_KEY ||
    FALLBACK_RUNTIME_SECRET
  );
}

function signPayload(payload: string): string {
  return crypto
    .createHmac("sha256", getSigningSecret())
    .update(payload)
    .digest("hex");
}

function pruneMap(map: Map<string, number>, ttlMs: number, now: number) {
  for (const [key, timestamp] of map) {
    if (now - timestamp > ttlMs) {
      map.delete(key);
    }
  }
  while (map.size >= MAX_MAP_SIZE) {
    const oldestKey = map.keys().next().value;
    if (!oldestKey) break;
    map.delete(oldestKey);
  }
}

function getClientIp(req: NextRequest): string {
  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor.split(",");
    const lastHop = parts[parts.length - 1]?.trim();
    if (lastHop) return lastHop;
  }

  return "unknown";
}

function verifyCaptchaToken(
  token: unknown,
  answer: unknown,
  now: number
): { valid: boolean; reason?: string } {
  if (typeof token !== "string" || !token) {
    return { valid: false, reason: "Güvenlik doğrulaması eksik. Lütfen soruyu yenileyin." };
  }

  const parts = token.split(":");
  if (parts.length !== 5) {
    return { valid: false, reason: "Geçersiz güvenlik anahtarı." };
  }

  const [aStr, bStr, issuedAtStr, nonce, providedSig] = parts;
  const mathA = Number(aStr);
  const mathB = Number(bStr);
  const issuedAt = Number(issuedAtStr);

  if (
    !Number.isInteger(mathA) ||
    !Number.isInteger(mathB) ||
    !Number.isInteger(issuedAt) ||
    !nonce ||
    !providedSig
  ) {
    return { valid: false, reason: "Geçersiz güvenlik anahtarı." };
  }

  if (now - issuedAt > CAPTCHA_TTL_MS || issuedAt > now + 5000) {
    return { valid: false, reason: "Güvenlik sorusunun süresi doldu. Lütfen yeni soruyu cevaplayın." };
  }

  pruneMap(usedNoncesMap, CAPTCHA_TTL_MS, now);
  if (usedNoncesMap.has(nonce)) {
    return { valid: false, reason: "Bu güvenlik sorusu zaten kullanıldı. Lütfen yeni soruyu cevaplayın." };
  }

  const payload = `${mathA}:${mathB}:${issuedAt}:${nonce}`;
  const expectedSig = signPayload(payload);

  const providedBuf = Buffer.from(providedSig, "hex");
  const expectedBuf = Buffer.from(expectedSig, "hex");

  if (
    providedBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(providedBuf, expectedBuf)
  ) {
    return { valid: false, reason: "Güvenlik imzası doğrulanamadı." };
  }

  const numAnswer = Number(answer);
  if (!Number.isInteger(numAnswer) || numAnswer !== mathA + mathB) {
    return { valid: false, reason: "Güvenlik sorusunu yanlış cevapladınız." };
  }

  usedNoncesMap.set(nonce, issuedAt);
  return { valid: true };
}

export async function GET() {
  const mathA = crypto.randomInt(1, 11);
  const mathB = crypto.randomInt(1, 11);
  const issuedAt = Date.now();
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${mathA}:${mathB}:${issuedAt}:${nonce}`;
  const sig = signPayload(payload);

  return NextResponse.json(
    {
      mathA,
      mathB,
      captchaToken: `${payload}:${sig}`,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const now = Date.now();
    const ip = getClientIp(req);

    pruneMap(rateLimitMap, RATE_LIMIT_WINDOW_MS, now);
    const lastRequest = rateLimitMap.get(ip) || 0;
    if (now - lastRequest < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json(
        {
          success: false,
          message: "Çok sık mesaj gönderiyorsunuz. Lütfen 15 saniye bekleyip tekrar deneyin.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, honeypot, captchaAnswer, captchaToken } = body;

    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: "Mesajınız başarıyla gönderildi!",
      });
    }

    const captchaCheck = verifyCaptchaToken(captchaToken, captchaAnswer, now);
    if (!captchaCheck.valid) {
      return NextResponse.json(
        {
          success: false,
          message: captchaCheck.reason || "Güvenlik sorusunu yanlış cevapladınız.",
        },
        { status: 400 }
      );
    }

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Lütfen tüm zorunlu alanları doldurun.",
        },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Sistem hatası: WEB3FORMS_ACCESS_KEY yapılandırılmamış.",
        },
        { status: 500 }
      );
    }

    rateLimitMap.set(ip, now);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name.trim(),
        email: email.trim(),
        subject:
          typeof subject === "string" && subject.trim()
            ? subject.trim()
            : "Web Sitenizden Yeni Mesaj",
        message: message.trim(),
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      return NextResponse.json({
        success: true,
        message: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: data.message || "Mesaj gönderilirken bir hata oluştu.",
      },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Sunucu ile iletişim kurulamadı. Lütfen daha sonra tekrar deneyin.",
      },
      { status: 500 }
    );
  }
}
