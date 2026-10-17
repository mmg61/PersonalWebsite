import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-[#023e8a] text-white min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full bg-[#011e42] p-10 rounded-3xl shadow-2xl text-center">
        <span className="inline-block text-7xl sm:text-8xl font-black text-[#ffb703] mb-4">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-white/80 font-medium mb-8 leading-relaxed">
          Aradığınız sayfa mevcut değil, taşınmış veya kaldırılmış olabilir.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ffb703] hover:bg-[#fb8500] text-[#011e42] font-black rounded-full transition-colors shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Ana Sayfaya Dön
        </Link>
      </div>
    </section>
  );
}
