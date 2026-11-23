"use client";

import { Phone } from "lucide-react";
import { useState, useEffect } from "react";

interface ObfuscatedPhoneProps {
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
  isIconOnly?: boolean;
  textClassName?: string;
}

export default function ObfuscatedPhone({
  className = "",
  iconClassName = "w-4 h-4 text-[#00b4d8]",
  showIcon = false,
  isIconOnly = false,
  textClassName = "",
}: ObfuscatedPhoneProps) {
  const [href, setHref] = useState("#");

  const country = "+90";
  const area = "553";
  const p1 = "827";
  const p2 = "61";
  const p3 = "26";
  const fullUri = `tel:${country}${area}${p1}${p2}${p3}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setHref(fullUri);
    }, 1000);
    return () => clearTimeout(timer);
  }, [fullUri]);

  return (
    <a
      href={href}
      className={className}
      onMouseEnter={() => setHref(fullUri)}
      onClick={() => setHref(fullUri)}
    >
      {showIcon && <Phone className={iconClassName} />}
      {!isIconOnly && (
        <span className={textClassName}>
          {country} ({area})<span className="hidden">.bot-trap.</span> {p1} {p2} {p3}
        </span>
      )}
    </a>
  );
}
