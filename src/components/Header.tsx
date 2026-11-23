import Link from "next/link";
import Image from "next/image";
import ObfuscatedEmail from "./ObfuscatedEmail";
import ObfuscatedPhone from "./ObfuscatedPhone";

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
            <ObfuscatedPhone
              className="flex items-center gap-2 hover:text-[#ffb703] transition-colors"
              showIcon={true}
              textClassName="hidden sm:inline"
            />
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
