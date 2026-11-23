import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 15_000;

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip) || 0;
    if (now - lastRequest < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json(
        {
          success: false,
          message: "Çok sık mesaj gönderiyorsunuz. Lütfen birkaç saniye bekleyip tekrar deneyin.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, honeypot, mathA, mathB, captchaAnswer } = body;

    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: "Mesajınız başarıyla gönderildi!",
      });
    }

    const numA = Number(mathA);
    const numB = Number(mathB);
    const numAnswer = Number(captchaAnswer);

    if (
      !Number.isInteger(numA) ||
      !Number.isInteger(numB) ||
      numA < 1 ||
      numA > 10 ||
      numB < 1 ||
      numB > 10 ||
      numAnswer !== numA + numB
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Güvenlik sorusunu yanlış cevapladınız.",
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

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Sistem hatası: Web3Forms erişim anahtarı yapılandırılmamış.",
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
        Origin: "https://mmgrsy.tr",
        Referer: "https://mmgrsy.tr/",
        "User-Agent": req.headers.get("user-agent") || "Mozilla/5.0",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name.trim(),
        email: email.trim(),
        subject: typeof subject === "string" && subject.trim() ? subject.trim() : "Web Sitenizden Yeni Mesaj",
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
