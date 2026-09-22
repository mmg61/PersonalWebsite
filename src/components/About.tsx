"use client";

import { useState, useEffect } from 'react';

export default function About() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [downloadCooldown, setDownloadCooldown] = useState(false);

  const handleDownload = () => {
    if (downloadCooldown) return;
    
    setDownloadCooldown(true);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Muhammet_Mustafa_Gursoy_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Re-enable button after 5 seconds
    setTimeout(() => {
      setDownloadCooldown(false);
    }, 5000);
  };

  useEffect(() => {
    if (isCvOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCvOpen]);

  return (
    <section id="hakkimda" className="bg-[#023e8a] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <h2 className="text-4xl font-black mb-8 text-[#ffb703]">
            Ben Kimim
          </h2>
          <div className="bg-[#011e42] p-8 rounded-2xl shadow-2xl">
            <p className="text-lg leading-relaxed text-white/95 font-medium">
              Merhaba, ben bir yazılım geliştiricisiyim. Günlük hayatımızda karşılaştığımız problemlere güncel teknolojiler ile çözüm üretmeyi ve sürekli yeni teknolojiler öğrenmeyi seviyorum. İstek ve problemler doğrultusunda projeler geliştiriyorum. Güncel olarak crypto botları geliştirip gömülü sistemler üzerine çalışmalarda bulunuyorum.
            </p>

            <div className="mt-6 flex gap-4 md:justify-start justify-center">
              <a href="https://github.com/mmg61" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#00b4d8] text-[#011e42] rounded-full hover:bg-[#0096c7] hover:text-white transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/muhammet-mustafa-g%C3%BCrsoy-9b4618262/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#00b4d8] text-[#011e42] rounded-full hover:bg-[#0096c7] hover:text-white transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.instagram.com/m.mustafa.grsy/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#00b4d8] text-[#011e42] rounded-full hover:bg-[#0096c7] hover:text-white transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>

            <div className="mt-8 flex md:justify-start justify-center">
              <button 
                type="button"
                onClick={() => setIsCvOpen(true)}
                className="cursor-pointer bg-[#ffb703] hover:bg-[#fb8500] text-[#011e42] font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300"
              >
                CV Gör
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CV Modal */}
      {isCvOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#011e42] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 bg-[#023e8a]">
              <h3 className="text-[#ffb703] font-black text-2xl">Özgeçmiş (CV)</h3>
              <button 
                onClick={() => setIsCvOpen(false)}
                className="text-[#00b4d8] hover:text-[#ffb703] transition-colors p-2 bg-[#011e42] rounded-full cursor-pointer"
                aria-label="Kapat"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-8 bg-[#caf0f8] text-[#011e42]">
              
              {/* Profesyonel Özet */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#023e8a' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Profesyonel Özet
                </h4>
                <p className="bg-[#90e0ef]/50 p-4 rounded-lg shadow-sm font-medium leading-relaxed">
                  Masaüstü yazılım mimarisi, veri analitiği ve backend geliştirme süreçlerinde proje deneyimine sahip Bilgisayar Mühendisliği öğrencisi. Python (PySide, veri işleme kütüphaneleri) ve PHP/MySQL ekosistemlerinde uçtan uca sistemler geliştirmiş; C/C++ ile düşük seviyeli yazılım geliştirme üzerine çalışmalarını sürdürmektedir. İnsansız hava araçları ve donanım-yazılım entegrasyonu alanlarındaki takım tecrübesini analitik düşünce disipliniyle birleştirerek sürdürülebilir mühendislik çözümleri üretmeye odaklanmaktadır.
                </p>
              </div>

              {/* Teknik Yetkinlikler */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#023e8a' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  Teknik Yetkinlikler
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#90e0ef]/50 p-4 rounded-lg shadow-sm">
                  <div>
                    <span className="block text-sm text-[#023e8a] font-medium">Programlama Dilleri</span>
                    <span className="font-semibold text-sm">Python, PHP, C, C++, SQL (MySQL)</span>
                  </div>
                  <div>
                    <span className="block text-sm text-[#023e8a] font-medium">Arayüz & Kütüphaneler</span>
                    <span className="font-semibold text-sm">Qt / PySide, NumPy, Pandas, Matplotlib, OpenCV (Yüz Tanıma)</span>
                  </div>
                  <div>
                    <span className="block text-sm text-[#023e8a] font-medium">Araçlar & Platformlar</span>
                    <span className="font-semibold text-sm">Git, GitHub, VS Code, Antigravity, Apache / .htaccess</span>
                  </div>
                  <div>
                    <span className="block text-sm text-[#023e8a] font-medium">Metodolojiler</span>
                    <span className="font-semibold text-sm">OOP, Veri Modelleme, Bot Mimarisi, Donanım Entegrasyonu</span>
                  </div>
                </div>
              </div>

              {/* Deneyim */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#023e8a' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  Deneyim
                </h4>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#023e8a] pl-4 pb-2">
                    <h5 className="font-bold text-lg" style={{ color: '#023e8a' }}>Lunar UAV</h5>
                    <p className="text-[#023e8a] text-sm mb-2 font-medium">Yazılım & Donanım Destek Mühendisi (Gönüllü) • 2024 - 2025</p>
                    <ul className="list-disc pl-4 font-medium text-sm space-y-1">
                      <li>İnsansız hava araçları (İHA) sistemlerinin geliştirilme sürecinde donanım bileşenleri ve alt sistem testlerine teknik destek sağlandı.</li>
                      <li>Donanım-yazılım entegrasyon süreçlerinde yer alınarak sistem kararlılığı ve bileşen haberleşmesi üzerine pratik kazanımlar elde edildi.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projeler */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#023e8a' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  Projeler
                </h4>
                <div className="space-y-6">
                  <div className="border-l-2 border-[#023e8a] pl-4 pb-2">
                    <h5 className="font-bold text-lg" style={{ color: '#023e8a' }}>Biyometrik Doğrulamalı Akıllı Kalori & Sağlık Takip Sistemi</h5>
                    <p className="text-[#023e8a] text-sm mb-2 font-medium">Python, PySide, Pandas, NumPy</p>
                    <ul className="list-disc pl-4 font-medium text-sm space-y-1">
                      <li>Biyometrik yüz tanıma algoritmasıyla kullanıcı oturum yönetimini güvenli ve temassız hale getiren modern masaüstü yazılımı geliştirildi.</li>
                      <li>Boy, kilo, yaş ve cinsiyet parametrelerini işleyerek dinamik kalori hedefi oluşturan analiz motoru kurgulandı.</li>
                      <li>Kullanıcı gelişim trendlerini Pandas ve NumPy ile analiz edip Matplotlib bileşenleri üzerinden görselleştiren interaktif dashboard oluşturuldu.</li>
                    </ul>
                  </div>
                  <div className="border-l-2 border-[#023e8a] pl-4 pb-2">
                    <h5 className="font-bold text-lg" style={{ color: '#023e8a' }}>Kurumsal CMS & Dinamik Entegrasyon Motoru</h5>
                    <p className="text-[#023e8a] text-sm mb-2 font-medium">PHP, MySQL, Apache, Web Scraping</p>
                    <ul className="list-disc pl-4 font-medium text-sm space-y-1">
                      <li>Şirketler için dinamik içerik yönetimi sunan, rol tabanlı yetkilendirmeye sahip güvenli admin panelli web sistemi geliştirildi.</li>
                      <li>Firmanın sosyal medya güncellemelerini anlık olarak ayrıştırıp siteye duyuru formatında aktaran otomatik PHP botu programlandı.</li>
                      <li>URL yeniden yazımı ve .htaccess yapılandırmalarıyla tam SEO uyumluluğu ve sunucu güvenliği optimize edildi.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Eğitim */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#023e8a' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                  Eğitim
                </h4>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#023e8a] pl-4 pb-2">
                    <h5 className="font-bold text-lg" style={{ color: '#023e8a' }}>Karadeniz Teknik Üniversitesi</h5>
                    <p className="text-[#023e8a] text-sm font-medium">Bilgisayar Mühendisliği • Lisans Derecesi (İngilizce Hazırlık Eğitimi)</p>
                    <p className="text-sm font-medium">2026 – Günümüz</p>
                  </div>
                  <div className="border-l-2 border-[#023e8a] pl-4 pb-2">
                    <h5 className="font-bold text-lg" style={{ color: '#023e8a' }}>Yomra Fen Lisesi</h5>
                    <p className="text-[#023e8a] text-sm font-medium">2022 – 2026</p>
                  </div>
                </div>
              </div>
              
              {/* Eğitim Programları & Sertifikalar */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#023e8a' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                  Sertifikalar ve Programlar
                </h4>
                <ul className="list-disc pl-5 font-medium text-sm space-y-2 bg-[#90e0ef]/50 p-4 rounded-lg shadow-sm">
                  <li><strong>Deneyap Teknoloji Atölyeleri:</strong> Robotik ve Kodlama, Tasarım ve Üretim, Elektronik Programlama & IoT, Yazılım Teknolojileri</li>
                  <li><strong>TÜBİTAK 4006 Bilim Fuarları:</strong> Araştırma ve Geliştirme Proje Katılımları</li>
                  <li><strong>Diller:</strong> Türkçe (Anadil), İngilizce (A2 - Hazırlık Süreci Devam Ediyor)</li>
                </ul>
              </div>

            </div>
            
            {/* Modal Footer */}
            <div className="p-5 flex justify-end gap-3 bg-[#023e8a]">
              <button 
                onClick={handleDownload}
                disabled={downloadCooldown}
                className={`font-bold py-2 px-8 rounded-lg transition-colors shadow-md text-center ${
                  downloadCooldown 
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-80' 
                    : 'cursor-pointer bg-[#ffb703] hover:bg-[#fb8500] text-[#011e42]'
                }`}
              >
                {downloadCooldown ? 'İndiriliyor...' : 'CV İndir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}