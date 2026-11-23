# Kişisel Portfolyo ve Proje Platformu (mmgrsy.tr)

Bu proje; yazılım geliştirme çalışmalarımı, mühendislik geçmişimi, geliştirdiğim açık kaynaklı projeleri ve iletişim kanallarımı tek bir merkezde toplamak amacıyla sıfırdan tasarlanmış modern bir web uygulamasıdır. 

Canlı olarak **[mmgrsy.tr](https://mmgrsy.tr)** adresinde yayınlanan platform; hız, arama motoru uyumluluğu (SEO), güvenlik ve sade kullanıcı deneyimi odaklı bir mimari üzerine inşa edilmiştir.

---

## Projenin Amacı ve Tasarım Yaklaşımı

Klasik, karmaşık ve yavaş açılan portfolyo şablonları yerine; ziyaretçinin aradığı bilgiye doğrudan ulaşabildiği **Tek Sayfa (One-Page)** akışı tercih edilmiştir. 

Tasarım dilinde benimsenen temel ilkeler şunlardır:

* **Keskin Renk Blokları ile Bölümleme:** Bölümler arasında çizgiler (border) veya göz yoran renk geçişleri (gradient) kullanılmamıştır. Her bölüm, mavinin en koyu lacivert tonlarından açık buz mavisine uzanan 5 farklı tonunun keskin kontrastıyla birbirinden ayrılır. Vurgu noktalarında ve harekete geçirici butonlarda ise yüksek kontrast sağlayan sarı ve turuncu tonları kullanılmıştır.
* **Tek ve Tutarlı Tema:** Aydınlık ve karanlık mod karmaşası yerine, her cihazda ve her ekranda aynı görsel kimliği koruyan sabit bir renk paleti uygulanmıştır.
* **Erişilebilir ve Okunabilir Arayüz:** Temel tipografi kuralları Tailwind CSS v4 `@layer base` katmanında yapılandırılmış, doğal kaydırma erişilebilirliği korunmuş ve Google Fonts üzerinden entegre edilen **Inter** yazı tipi ile yüksek okunabilirlik elde edilmiştir.

---

## Sayfa Bölümleri ve Fonksiyonel Özellikler

Platform yukarıdan aşağıya doğru birbirini tamamlayan 6 ana bileşenden oluşur:

### 1. Üst Bilgi Çubuğu (Header)
Sayfa kaydırıldıkça üst kısımda sabit kalan bu alanda site logosu ve hızlı iletişim bağlantıları yer alır. Hem e-posta adresi (`ObfuscatedEmail`) hem de telefon numarası (`ObfuscatedPhone`), kaynak kodunu tarayan spam botlarından korunması için özel gizleme bileşenleri ile parçalanarak sunulur ve yalnızca gerçek kullanıcı etkileşimiyle aktif hale gelir.

### 2. Karşılama Ekranı (Hero)
Ziyaretçiyi karşılayan ilk ekrandır. Akıcı giriş animasyonları (Framer Motion) eşliğinde geliştirici vizyonunu özetleyen ana başlık, kısa tanıtım metni, profil fotoğrafı ve sayfa içi bölümlere hızlı geçiş sağlayan yönlendirme butonları bulunur.

### 3. Hakkımda ve İnteraktif Özgeçmiş (About & CV Modal)
Geliştiricinin çalışma alanlarını, ilgi duyduğu teknolojileri ve sosyal medya hesaplarını barındırır. 
* **İnteraktif CV Penceresi:** Ziyaretçiler sayfadan ayrılmadan "CV Gör" butonuna tıklayarak; eğitim geçmişini, teknik yetkinlikleri, deneyimlerini ve öne çıkan mühendislik projelerini detaylı bir pencere (modal) içinde inceleyebilir. Pencere `ESC` tuşuyla veya dış alana tıklanarak kapatılabilir.
* **CV İndirme Koruması:** Özgeçmişi PDF formatında indirmek isteyen kullanıcılar için art arda gereksiz istekleri engelleyen bekleme süreli (cooldown) indirme mekanizması mevcuttur.

### 4. Dinamik GitHub Projeleri (Projects)
Bu bölüm herhangi bir veritabanına veya yönetim paneline ihtiyaç duymadan doğrudan **GitHub REST API** üzerinden beslenir:
* GitHub profilindeki projeler sunucu tarafında çekilir ve performans ile API sınırlarını korumak amacıyla saatlik olarak önbelleklenir (caching).
* Başka hesaplardan çatallanan (fork) depolar otomatik olarak filtrelenir; yalnızca özgün projeler listelenir.
* Her projenin GitHub deposundaki `cover.png` görselinin varlığı sunucu tarafında `HEAD` isteğiyle önceden doğrulanır. Görseli bulunan projeler `next/image` optimizasyonu ile sunulurken, görseli bulunmayan projeler tarayıcıda hiçbir kırık görsel (`404`) isteği üretmeden doğrudan özel yedek kapak (fallback) tasarımıyla gösterilir.
* İlk görünümde en güncel 3 proje sergilenir; ziyaretçi "Daha Fazla Gör" butonuyla tüm projeleri aynı sayfa içinde açıp kapatabilir.

### 5. Sunucu Doğrulamalı Güvenli İletişim Formu (Contact & API Route)
Ziyaretçilerin doğrudan mesaj gönderebilmesi için sunucu tarafında çalışan özel bir API rotası (`/api/contact`) ve **Web3Forms** altyapısı kullanılmıştır. Form, spam saldırılarına karşı çok katmanlı sunucu koruması içerir:
* **HMAC-SHA256 İmzalı Captcha:** Matematik sorusu sunucu tarafında üretilir, zaman damgası ve tek kullanımlık `nonce` değeriyle birlikte `CAPTCHA_SECRET` anahtarı kullanılarak kriptografik olarak imzalanır (`crypto.timingSafeEqual`). Böylece istemci tarafında soru veya cevabın taklit edilmesi ve aynı sorunun tekrar kullanılması (replay attack) engellenir.
* **Honeypot (Bot Tuzağı) ve Hız Sınırı (Rate Limiting):** Otomatik botlar gizli tuzak alanıyla sessizce reddedilir ve IP başına gönderim sıklığı sınırlandırılır.
* **Veri ve Uzunluk Doğrulaması:** Tüm alanlar sunucu tarafında karakter sınırlarına (isim/e-posta/konu için 200, mesaj için 5000 karakter) ve e-posta format kontrolüne tabi tutulur; erişim anahtarı (`WEB3FORMS_ACCESS_KEY`) istemciye hiçbir zaman açılmaz.

### 6. Alt Bilgi (Footer)
Tüm alt sayfalardan (`404` dahil) ana sayfa bölümlerine doğrudan dönüş sağlayan bağlantıları, bot korumalı iletişim bilgilerini, sosyal medya kısayollarını ve telif hakkı metnini barındıran en koyu lacivert tonlu kapanış bölümüdür.

---

## Teknik Altyapı ve Mimari

* **Framework:** Next.js 16 (App Router mimarisi, Route Handlers ve Server-Side Rendering)
* **Arayüz Kütüphanesi:** React 19 & TypeScript
* **Stil Motoru:** Tailwind CSS v4 (`@layer base` ve `@theme inline` mimarisi)
* **Animasyon ve İkonlar:** Framer Motion & Lucide React
* **HTTP Güvenlik Başlıkları:** `Content-Security-Policy (CSP)`, `Strict-Transport-Security (HSTS)`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` ve `Permissions-Policy` başlıkları ile clickjacking ve XSS saldırılarına karşı tam koruma.
* **SEO ve İndeksleme:** Sunucu taraflı oluşturulan sayfalar sayesinde tüm içerik arama motoru botları tarafından anında okunabilir. Dinamik `sitemap.xml`, `robots.txt`, OpenGraph ve Twitter paylaşım kartları ile tam SEO uyumluluğu sağlanmıştır.
* **Sunucu ve Yayınlama:** Uygulama Ubuntu VPS üzerinde **PM2** süreç yöneticisi ile kesintisiz çalıştırılmakta, **Nginx Reverse Proxy** üzerinden yayınlanmakta ve **Cloudflare DNS** ile **Let's Encrypt SSL (HTTPS)** güvenlik katmanlarıyla korunmaktadır.
