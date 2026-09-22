"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="anasayfa" className="bg-sky-50 text-slate-900 min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 -translate-y-10 lg:-translate-y-16">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 md:gap-12">
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.1] mb-6 drop-shadow-sm"
              suppressHydrationWarning
            >
              <span className="whitespace-nowrap text-[#ffb703]" style={{ color: "#ffb703" }}>Köklerden geleceğe,</span>
              <br />
              <span className="text-sky-600">Bağımsız Teknoloji.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-slate-700 max-w-xl mb-10 leading-relaxed font-medium"
            >
              Modern teknolojiler ile kullanıcı odaklı, performanslı ve ölçeklenebilir dijital deneyimler geliştiriyorum.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto mt-2"
            >
              <a 
                href="#hakkimda" 
                className="group hover:scale-105 active:scale-95 px-8 py-4 bg-sky-600 text-white hover:bg-sky-700 rounded-full font-medium transition-all duration-300 flex justify-center items-center gap-2 shadow-sm"
              >
                Ben Kimim?
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a 
                href="#projeler" 
                className="group hover:scale-105 active:scale-95 px-8 py-4 bg-[#ffb703] text-slate-900 hover:bg-[#e0a000] rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                Projelerim 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a 
                href="#iletisim" 
                className="group hover:scale-105 active:scale-95 px-8 py-4 bg-white text-slate-900 border border-slate-200 hover:border-sky-300 hover:bg-sky-100 rounded-full font-medium transition-all duration-300 flex justify-center items-center gap-2 shadow-sm"
              >
                İletişim
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>

          {/* Profile Picture / Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 shrink-0 relative"
          >
            {/* Subtle background decoration (Animated) */}
            <motion.div 
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 1, x: 16, y: 16 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-sky-200/60 rounded-3xl"
            ></motion.div>
            
            <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center border border-sky-100 shadow-sm overflow-hidden relative z-10">
              <Image 
                src="/profile.jpg" 
                alt="Profil Fotoğrafı" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 14rem, (max-width: 1024px) 18rem, 24rem"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}