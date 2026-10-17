# PROJE BELLEK VE MİMARİ DOKÜMANI (PROJECT_MEMORY.md)

Bu doküman, projenin teknik altyapısını, tasarım ilkelerini, dosya organizasyonunu, veri akışını ve yayınlama (deployment) süreçlerini tanımlayan resmi referans kaynağıdır. Projede yapılacak tüm geliştirme, hata ayıklama ve revizyon işlemlerinde bu dokümanda belirtilen kurallar esas alınmalıdır.

---

## 1. PROJE KİMLİĞİ VE GELİŞTİRİCİ BİLGİLERİ

* **Proje Adı:** Personal-Website (Kişisel Portfolyo Uygulaması)
* **Canlı Alan Adı (Domain):** https://mmgrsy.tr
* **Geliştirici Adı:** Muhammet Mustafa Gürsoy
* **Marka / Başlık Kodu:** MMG / mmg61
* **Eğitim Bilgisi:** Karadeniz Teknik Üniversitesi - Bilgisayar Mühendisliği (Lisans, 2026 - Günümüz) | Yomra Fen Lisesi (2022 - 2026)
* **Uzmanlık ve Çalışma Alanları:** Web Uygulamaları Geliştirme, Masaüstü Yazılım Mimarisi (Python, PySide/Qt), Veri Analitiği (Pandas, NumPy, Matplotlib), Görüntü İşleme (OpenCV), Backend Sistemler (PHP, MySQL), Kripto Bot Mimarileri, Gömülü Sistemler ve Donanım-Yazılım Entegrasyonu (C/C++, İHA Alt Sistemleri).
* **Konum:** Trabzon, Türkiye
* **İletişim Bilgileri:**
  * **Telefon:** +90 553 827 61 26
  * **E-posta:** mgrsy@outlook.com.tr
  * **GitHub:** https://github.com/mmg61
  * **LinkedIn:** https://www.linkedin.com/in/muhammet-mustafa-g%C3%BCrsoy-9b4618262/
  * **Instagram:** https://www.instagram.com/m.mustafa.grsy/

---

## 2. TEKNOLOJİ YIĞINI (TECH STACK)

* **Uygulama Çatısı (Framework):** Next.js 16.3.5 (App Router mimarisi, Server-Side Rendering ve Static Generation desteği)
* **Kullanıcı Arayüzü Kütüphanesi:** React 19.2.8 ve React DOM 19.2.8
* **Programlama Dili:** TypeScript 5 (Strict tip denetimi aktif)
* **Stil ve Tasarım Sistemi:** Tailwind CSS v4 (`@tailwindcss/postcss` üzerinden yapılandırılmıştır; ayrı bir `tailwind.config.ts` dosyası bulunmaz, tüm tema değişkenleri `src/app/globals.css` içerisindeki `@theme inline` bloğunda tanımlanır)
* **Animasyon Kütüphanesi:** Framer Motion (`^13.4.0`)
* **İkon Kütüphanesi:** Lucide React (`^1.47.0`) ve özel SVG sosyal medya ikonları
* **Tipografi:** Google Fonts üzerinden `Inter` (`--font-inter` CSS değişkeni ile entegre edilmiştir)

---

## 3. TASARIM SİSTEMİ VE KESİN STİL KURALLARI

Projede yapılacak her türlü arayüz değişikliğinde aşağıdaki tasarım kurallarına istisnasız uyulmalıdır:

1. **Tek Tema İlkesi:** Uygulamada açık/karanlık tema (Light/Dark Mode) geçiş mekanizması veya kullanıcı tercihi anahtarı bulunmamaktadır. Tüm kullanıcılar için tek, sabit ve yüksek kontrastlı bir renk düzeni uygulanır.
2. **Keskin Blok Geçişleri:** Bölümler (Section) arasında ayırıcı çizgi (`border`) veya renk geçişi (`gradient`) kullanılmaz. Bölüm ayrımları yalnızca arka plan renklerinin açık ve koyu mavi tonları arasındaki keskin kontrast farkı ile sağlanır.
3. **Renk Paleti Tanımları:**
   * **En Koyu Lacivert (`#011026`):** `body` varsayılan arka planı ve `Footer` bölümü arka planı.
   * **Çok Koyu Lacivert (`#011e42`):** `Header` (üst bar) arka planı, `About` bölümü iç kutusu, `Contact` sol bilgi kartı, CV modal gövdesi ve `404` kartı.
   * **Koyu Mavi (`#023e8a`):** `About` (Hakkımda) bölümü ana arka planı, `Projects` içerisindeki proje kartları arka planı, CV modal üst ve alt çubuğu, `404` sayfası arka planı.
   * **Orta Koyu Mavi (`#0077b6`):** `Projects` (Öne Çıkan Projeler) bölümü ana arka planı.
   * **Canlı Açık Mavi (`#00b4d8`):** İkon renkleri, sosyal medya butonları ve vurgu metinleri.
   * **Açık Buz Mavisi (`bg-sky-50` / `bg-sky-100` / `#caf0f8`):** `Hero` (Giriş) bölümü arka planı, `Contact` (İletişim) bölümü arka planı ve CV modal içerik okuma alanı.
   * **Birincil Vurgu Sarısı (`#ffb703`):** Ana başlık vurgusu, birincil aksiyon butonları (Projelerim, CV Gör, CV İndir).
   * **İkincil Vurgu Turuncusu (`#fb8500`):** Proje teknoloji etiketleri, iletişim formu gönderim butonu ve sarı butonların üzerine gelindiğinde (`hover`) aldığı durum rengi.
4. **Kaydırma Çubuğu (Scrollbar):** Tarayıcı kaydırma çubuğu `src/app/globals.css` içerisinde `::-webkit-scrollbar { display: none; }`, `-ms-overflow-style: none;` ve `scrollbar-width: none;` kuralları ile tüm tarayıcılarda gizlenmiştir. Sayfa kaydırma işlevi yumuşak geçişli (`scroll-smooth`) olarak çalışır.

---

## 4. MİMARİ YAPI VE DOSYA ORGANİZASYONU

Proje, veritabanı veya yönetim paneli (Admin Panel) gerektirmeyen, düşük bakım maliyetli ve yüksek performanslı hibrit (Statik + Dinamik API) bir mimariye sahiptir.

### 4.1. Kök Dizin ve Konfigürasyon Dosyaları
* `package.json`: Proje bağımlılıklarını ve `dev`, `build`, `start`, `lint` betiklerini barındırır.
* `next.config.ts`: Next.js yapılandırma dosyasıdır.
* `.env.local`: Ortam değişkenlerini tutar (Git tarafından takip edilmez). İletişim formu için `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` ve opsiyonel olarak GitHub API limitlerini artırmak için `GITHUB_TOKEN` değişkenini barındırır.
* `cover.png` ve `public/cover.png`: GitHub depo önizlemesi ve OpenGraph/Twitter paylaşım kartları için kullanılan kapak görselidir.
* `public/logo.svg`: Sitenin üst barında ve tarayıcı sekme ikonunda (Favicon) kullanılan resmi vektör logosudur.
* `public/profile.jpg`: Giriş (`Hero`) bölümünde yer alan profil fotoğrafıdır.
* `public/cv.pdf`: Ziyaretçilerin indirebildiği resmi özgeçmiş dosyasıdır (`Muhammet_Mustafa_Gursoy_CV.pdf` adıyla indirilir).

### 4.2. Uygulama Rotaları ve SEO Dosyaları (`src/app/`)
* `src/app/layout.tsx`: Kök düzen bileşenidir. `metadataBase` (`https://mmgrsy.tr`), sayfa başlığı (`MMG`), meta açıklamaları, anahtar kelimeler, OpenGraph ve Twitter paylaşım kartları, arama motoru indeksleme izinleri (`robots`), favicon (`/logo.svg`) ve `Inter` font tanımlamalarını içerir. Tüm sayfaları `<Header />` ve `<Footer />` ile sarmalar.
* `src/app/page.tsx`: Ana sayfa bileşenidir. Sırasıyla `<Hero />`, `<About />`, `<Projects />` ve `<Contact />` bileşenlerini tek sayfa (One-Page) akışı içerisinde render eder.
* `src/app/globals.css`: Tailwind CSS v4 motorunu içeri aktarır, renk değişkenlerini ve gizli scrollbar kurallarını tanımlar.
* `src/app/sitemap.ts`: Arama motorları için `https://mmgrsy.tr/sitemap.xml` çıktısını dinamik olarak üretir.
* `src/app/robots.ts`: Arama motoru botlarına tarama izni veren ve site haritasını işaret eden `https://mmgrsy.tr/robots.txt` çıktısını üretir.
* `src/app/not-found.tsx`: Mevcut olmayan rotalara erişildiğinde gösterilen, sitenin renk paletiyle uyumlu özel Türkçe 404 hata sayfasıdır.

### 4.3. Arayüz Bileşenleri (`src/components/`)
* `src/components/Header.tsx`: Sayfanın üst kısmında sabit (`sticky top-0 z-50`) olarak duran başlık çubuğudur. Sol tarafta `/logo.svg`, sağ tarafta ise doğrudan arama bağlantısı (`tel:+905538276126`) ve bot korumalı e-posta bileşeni (`ObfuscatedEmail`) yer alır.
* `src/components/Hero.tsx`: `#anasayfa` kimliğine sahip karşılama bölümüdür. Framer Motion ile giriş animasyonlarına sahiptir. Sol bölümde ana slogan ("Köklerden geleceğe, Bağımsız Teknoloji."), açıklama metni ve bölümlere yönlendiren 3 adet buton (`#hakkimda`, `#projeler`, `#iletisim`); sağ bölümde ise `/profile.jpg` görseli yer alır.
* `src/components/About.tsx`: `#hakkimda` kimliğine sahip tanıtım bölümüdür. Kişisel özet metnini, sosyal medya bağlantılarını ve interaktif "CV Gör" butonunu içerir.
  * **CV Modal Mekanizması:** Butona tıklandığında açılan pencere; Profesyonel Özet, Teknik Yetkinlikler, Deneyim (Lunar UAV), Öne Çıkan Projeler, Eğitim ve Sertifikalar (Deneyap, TÜBİTAK 4006) bilgilerini detaylı olarak gösterir. Modal açıldığında arka plan kaydırması kilitlenir (`overflow: hidden`). Kullanıcı `ESC` tuşuna basarak, dış alana (backdrop) tıklayarak veya kapatma butonuna basarak modalı kapatabilir. Alt kısımdaki "CV İndir" butonu `/cv.pdf` dosyasını indirir ve art arda tıklamaları önlemek için 5 saniyelik bekleme süresi (`downloadCooldown`) uygular.
* `src/components/Projects.tsx`: Sunucu taraflı (Server Component) veri çekme bileşenidir. GitHub REST API (`https://api.github.com/users/mmg61/repos?sort=updated&per_page=30`) üzerinden projeleri çeker.
  * **Önbellekleme ve Koruma:** API istek sınırlarına (Rate Limit) takılmamak için veriler `revalidate: 3600` (1 saat) süresince önbellekte tutulur. Ortam değişkenlerinde `GITHUB_TOKEN` tanımlıysa otomatik olarak `Authorization` başlığına eklenir. Ayrıca başka hesaplardan çatallanan (`fork: true`) depolar filtrelenerek yalnızca orijinal projeler listelenir.
* `src/components/ProjectsClient.tsx`: `#projeler` kimliğine sahip istemci (Client Component) bileşenidir. Projeleri varsayılan olarak 3 adet gösterir; 3'ten fazla proje varsa "Daha Fazla Gör / Daha Az Gör" butonu ile tüm listeyi açar veya daraltır.
  * **Proje Kapak Görseli Mekanizması (`ProjectImage`):** Her bir depo için `https://raw.githubusercontent.com/mmg61/{repoName}/main/cover.png` adresindeki görseli yüklemeyi dener. Eğer ilgili depoda `cover.png` dosyası bulunmuyorsa (`onError`), görsel yerine `#011e42` arka plan üzerinde depo adını metin olarak gösteren yedek (fallback) tasarımı render eder.
* `src/components/Contact.tsx`: `#iletisim` kimliğine sahip iletişim bölümüdür. Sol kısımda iletişim ve konum kartı, sağ kısımda ise Web3Forms API (`https://api.web3forms.com/submit`) entegreli iletişim formu bulunur.
  * **Güvenlik Katmanları:** Form gönderiminde iki aşamalı spam koruması vardır:
    1. Gizli metin alanı (`honeypot` / `botcheck`): Otomatik form dolduran botları tespit edip isteği sessizce reddeder.
    2. Dinamik matematiksel doğrulama (`mathA + mathB`): Kullanıcının gerçek bir insan olduğunu doğrular.
* `src/components/Footer.tsx`: Sayfa alt bilgisidir. Marka logosu (`<MMG/>`), kısa tanıtım, sosyal medya ikonları, bölümlere hızlı erişim bağlantıları, açık iletişim bilgileri ve dinamik yıl bilgisine sahip telif hakkı metnini içerir.
* `src/components/ObfuscatedEmail.tsx`: E-posta adresini (`mgrsy@outlook.com.tr`) kaynak kodunu tarayan spam botlarından korumak amacıyla parçalara ayıran, HTML içerisine gizli tuzak elemanları (`.bot-trap.`) yerleştiren ve gerçek `mailto:` bağlantısını yalnızca istemci tarafında (sayfa yüklendikten 1 saniye sonra veya fare etkileşimiyle) oluşturan güvenlik bileşenidir.

---

## 5. SUNUCU, YAYINLAMA (DEPLOYMENT) VE DNS MİMARİSİ

* **Sunucu Ortamı:** Ubuntu VPS (`212.180.120.74`)
* **Çalışma Dizini:** `/root/mgwebsite` (veya sunucudaki ilgili proje dizini)
* **Süreç Yönetimi (Process Manager):** Uygulama sunucu üzerinde `PM2` (`mgwebsite` servis adıyla) tarafından `localhost:3000` portunda sürekli açık tutulur.
* **Web Sunucusu (Reverse Proxy):** `Nginx`, 80 ve 443 portlarına gelen `mmgrsy.tr` ve `www.mmgrsy.tr` isteklerini `http://localhost:3000` adresine yönlendirir (`/etc/nginx/sites-available/mmgrsy.tr`).
* **DNS ve SSL:** Alan adı DNS yönetimi **Cloudflare** üzerindedir (`A` kayıtları `212.180.120.74` IP adresine yönlendirilmiştir). HTTPS şifrelemesi sunucu üzerinde **Certbot (Let's Encrypt)** ile Nginx'e entegre edilmiştir.

### 5.1. Yerel Değişiklikleri GitHub'a Gönderme Komutları
```bash
git add .
git commit -m "Yapılan değişikliğin açıklaması"
git push
```

### 5.2. Sunucuda Güncelleme ve Yeniden Derleme Komutları
Dosyalar sunucuya aktarıldıktan sonra değişikliklerin canlı ortama yansıması için sunucu terminalinde çalıştırılması gereken komutlar:
```bash
npm install
npm run build
pm2 restart mgwebsite
```
