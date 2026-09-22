"use client";

import { Mail, MapPin, Send, Phone, RefreshCw, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import ObfuscatedEmail from "./ObfuscatedEmail";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  
  const [mathA, setMathA] = useState(0);
  const [mathB, setMathB] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const generateCaptcha = () => {
    setMathA(Math.floor(Math.random() * 10) + 1);
    setMathB(Math.floor(Math.random() * 10) + 1);
    setCaptchaAnswer("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(captchaAnswer) !== mathA + mathB) {
      setStatus("error");
      setStatusMessage("Güvenlik sorusunu yanlış cevapladınız.");
      return;
    }

    // Bot honeypot kontrolü: Eğer gizli alan doldurulmuşsa bot olduğunu anlıyoruz
    if (honeypot) {
      // Botlara karşı başarılıymış gibi davran (sessizce reddet)
      setStatus("success");
      setStatusMessage("Mesajınız başarıyla gönderildi!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setHoneypot("");
      generateCaptcha();
      return;
    }

    // .env.local içerisindeki anahtarı kullanırız. 
    // Ön yüzde (client) kullanılacağı için NEXT_PUBLIC ile başlamalıdır.
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      setStatus("error");
      setStatusMessage("Sistem hatası: Web3Forms erişim anahtarı bulunamadı. Lütfen .env.local dosyanızı kontrol edin.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ 
          access_key: accessKey,
          name, 
          email, 
          subject: subject || 'Web Sitenizden Yeni Mesaj', 
          message 
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        generateCaptcha();
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Mesaj gönderilirken bir hata oluştu.");
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("Sunucu ile iletişim kurulamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.");
    }
  };

  return (
    <section id="iletisim" className="bg-sky-50 text-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-4" style={{ color: "#000000" }}>İletişime Geçin</h2>
            <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: "#0f172a" }}>
              Yeni bir proje fikriniz mi var veya sadece tanışmak mı istiyorsunuz? Benimle aşağıdaki kanallardan veya form aracılığıyla iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-sky-100 rounded-3xl p-4 sm:p-8 border border-sky-200 shadow-2xl">
            {/* Contact Info */}
            <div className="lg:col-span-2 bg-[#011e42] text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0077b6] rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#023e8a] rounded-full blur-3xl opacity-20 -ml-20 -mb-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-6 text-[#ffb703]">İletişim Bilgileri</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#00b4d8]/20 text-[#00b4d8] rounded-xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 font-medium mb-1">E-posta</p>
                      <ObfuscatedEmail className="font-bold hover:text-[#00b4d8] transition-colors break-all" />
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#00b4d8]/20 text-[#00b4d8] rounded-xl">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 font-medium mb-1">Telefon</p>
                      <a href="tel:+905538276126" className="font-bold hover:text-[#00b4d8] transition-colors">+90 (553) 827 61 26</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#00b4d8]/20 text-[#00b4d8] rounded-xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 font-medium mb-1">Konum</p>
                      <p className="font-bold">Trabzon, Türkiye</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative z-10">
                <p className="text-sm text-white/60 font-medium mb-4">Sosyal Medya</p>
                <div className="flex gap-4">
                  <a href="https://github.com/mmg61" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-[#00b4d8] text-white rounded-xl transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/muhammet-mustafa-g%C3%BCrsoy-9b4618262/" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-[#00b4d8] text-white rounded-xl transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/m.mustafa.grsy/" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-[#00b4d8] text-white rounded-xl transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 p-4 sm:p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Honeypot field - Bot trap */}
                <input 
                  type="checkbox" 
                  name="botcheck" 
                  className="hidden" 
                  style={{ display: "none" }} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-sm font-bold text-[#011e42]">İsim Soyisim</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adınız Soyadınız" 
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border-none focus:bg-sky-50 focus:px-6 focus:tracking-wide focus:ring-0 outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-sm font-bold text-[#011e42]">E-posta</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@mail.com" 
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border-none focus:bg-sky-50 focus:px-6 focus:tracking-wide focus:ring-0 outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="subject" className="text-sm font-bold text-[#011e42]">Konu</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Hangi konuda görüşmek istersiniz?" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border-none focus:bg-sky-50 focus:px-6 focus:tracking-wide focus:ring-0 outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-bold text-[#011e42]">Mesajınız</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mesajınızı buraya yazabilirsiniz..." 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border-none focus:bg-sky-50 focus:px-6 focus:tracking-wide focus:ring-0 outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-400 resize-none"
                  ></textarea>
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="captcha" className="text-sm font-bold text-[#011e42]">Güvenlik Sorusu: {mathA} + {mathB} = ?</label>
                  <div className="flex gap-4 items-center">
                    <input 
                      type="number" 
                      id="captcha" 
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      placeholder="Sonucu yazınız" 
                      required
                      className="w-32 px-4 py-3 rounded-xl bg-white border-none focus:bg-sky-50 focus:px-6 focus:tracking-wide focus:ring-0 outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-400"
                    />
                    <button type="button" onClick={generateCaptcha} className="p-3 bg-white text-slate-500 rounded-xl hover:bg-[#011e42] hover:text-white cursor-pointer transition-colors" title="Soruyu Yenile">
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {statusMessage && (
                  <div className={`p-4 rounded-xl text-sm font-bold ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {statusMessage}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto px-8 py-4 bg-[#fb8500] hover:bg-[#ffb703] text-white hover:text-[#011e42] font-black rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      Mesaj Gönder
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}