"use client";

import { Mail } from "lucide-react";
import { useState, useEffect } from "react";

interface ObfuscatedEmailProps {
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
  isIconOnly?: boolean;
}

export default function ObfuscatedEmail({ 
  className = "", 
  iconClassName = "w-4 h-4 text-[#00b4d8]", 
  showIcon = false,
  isIconOnly = false
}: ObfuscatedEmailProps) {
  const [href, setHref] = useState("#");
  
  // E-posta parçaları
  const u = "mgrsy";
  const d = "outlook.com.tr";

  useEffect(() => {
    // Botlar ilk yüklemede href içini boş ("#") görecek. 
    // Sayfa yüklendikten 1 saniye sonra sadece tarayıcıda mail linki oluşturulacak.
    const timer = setTimeout(() => {
      setHref(`mailto:${u}@${d}`);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a 
      href={href}
      className={className}
      onMouseEnter={() => setHref(`mailto:${u}@${d}`)}
      onClick={() => setHref(`mailto:${u}@${d}`)}
    >
      {showIcon && <Mail className={iconClassName} />}
      {!isIconOnly && (
        <span className="hidden sm:inline">
          {/* Botların kaynak koddan e-posta kopyalamasını engellemek için araya gizli bir nokta ekliyoruz */}
          {u}<span className="hidden">.bot-trap.</span>&#64;{d}
        </span>
      )}
    </a>
  );
}
