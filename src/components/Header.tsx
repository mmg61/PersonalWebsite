import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import ObfuscatedEmail from "./ObfuscatedEmail";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#011e42] text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="MMG Logo" 
                width={100} 
                height={32} 
                priority 
              />
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <a href="tel:+905538276126" className="flex items-center gap-2 hover:text-[#ffb703] transition-colors">
              <Phone className="h-4 w-4 text-[#00b4d8]" />
              <span className="hidden sm:inline">+90 553 827 61 26</span>
            </a>
            <span className="text-white/20">/</span>
            <ObfuscatedEmail 
              className="flex items-center gap-2 hover:text-[#ffb703] transition-colors"
              showIcon={true}
              textClassName="hidden sm:inline"
            />
          </div>
        </div>
      </div>
    </header>
  );
}