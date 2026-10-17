# Kişisel Portfolyo ve Proje Platformu (mmgrsy.tr)

Bu proje; yazılım geliştirme çalışmalarımı, mühendislik geçmişimi, geliştirdiğim açık kaynaklı projeleri ve iletişim kanallarımı tek bir merkezde toplamak amacıyla sıfırdan tasarlanmış modern bir web uygulamasıdır. 

Canlı olarak **[mmgrsy.tr](https://mmgrsy.tr)** adresinde yayınlanan platform; hız, arama motoru uyumluluğu (SEO), güvenlik ve sade kullanıcı deneyimi odaklı bir mimari üzerine inşa edilmiştir.

---

## Projenin Amacı ve Tasarım Yaklaşımı

Klasik, karmaşık ve yavaş açılan portfolyo şablonları yerine; ziyaretçinin aradığı bilgiye doğrudan ulaşabildiği **Tek Sayfa (One-Page)** akışı tercih edilmiştir. 

Tasarım dilinde benimsenen temel ilkeler şunlardır:

* **Keskin Renk Blokları ile Bölümleme:** Bölümler arasında çizgiler (border) veya göz yoran renk geçişleri (gradient) kullanılmamıştır. Her bölüm, mavinin en koyu lacivert tonlarından açık buz mavisine uzanan 5 farklı tonunun keskin kontrastıyla birbirinden ayrılır. Vurgu noktalarında ve harekete geçirici butonlarda ise yüksek kontrast sağlayan sarı ve turuncu tonları kullanılmıştır.
* **Tek ve Tutarlı Tema:** Aydınlık ve karanlık mod karmaşası yerine, her cihazda ve her ekranda aynı görsel kimliği koruyan sabit bir renk paleti uygulanmıştır.
* **Sadeleştirilmiş Arayüz:** Tarayıcı kaydırma çubuğu (scrollbar) gizlenerek tam ekran görsel bütünlük sağlanmış, Google Fonts üzerinden entegre edilen **Inter** yazı tipi ile yüksek okunabilirlik elde edilmiştir.

---

## Sayfa Bölümleri ve Fonksiyonel Özellikler

Platform yukarıdan aşağıya doğru birbirini tamamlayan 6 ana bileşenden oluşur:

### 1. Üst Bilgi Çubuğu (Header)
Sayfa kaydırıldıkça üst kısımda sabit kalan bu alanda site logosu ve hızlı iletişim bağlantıları yer alır. E-posta adresi, kaynak kodunu tarayan spam botlarından korunması için özel bir gizleme bileşeni (`ObfuscatedEmail`) ile parçalanarak sunulur ve yalnızca gerçek kullanıcı etkileşimiyle aktif hale gelir.

### 2. Karşılama Ekranı (Hero)
Ziyaretçiyi karşılayan ilk ekrandır. Akıcı giriş animasyonları (Framer Motion) eşliğinde geliştirici vizyonunu özetleyen ana başlık, kısa tanıtım metni, profil fotoğrafı ve sayfa içi bölümlere hızlı geçiş sağlayan yönlendirme butonları bulunur.

### 3. Hakkımda ve İnteraktif Özgeçmiş (About & CV Modal)
Geliştiricinin çalışma alanlarını, ilgi duyduğu teknolojileri ve sosyal medya hesaplarını barındırır. 
* **İnteraktif CV Penceresi:** Ziyaretçiler sayfadan ayrılmadan "CV Gör" butonuna tıklayarak; eğitim geçmişini, teknik yetkinlikleri, deneyimlerini ve öne çıkan mühendislik projelerini detaylı bir pencere (modal) içinde inceleyebilir.
* **CV İndirme Koruması:** Özgeçmişi PDF formatında indirmek isteyen kullanıcılar için art arda gereksiz istekleri engelleyen bekleme süreli (cooldown) indirme mekanizması mevcuttur.

### 4. Dinamik GitHub Projeleri (Projects)
Bu bölüm herhangi bir veritabanına veya yönetim paneline ihtiyaç duymadan doğrudan **GitHub REST API** üzerinden beslenir:
* GitHub profilindeki projeler sunucu tarafında çekilir ve performans ile API sınırlarını korumak amacıyla saatlik olarak önbelleklenir (caching).
* Başka hesaplardan çatallanan (fork) depolar otomatik olarak filtrelenir; yalnızca özgün projeler listelenir.
* Her projenin GitHub deposundaki `cover.png` görseli otomatik olarak kart kapağına yansıtılır. Görseli bulunmayan projeler için tasarım bütünlüğünü bozmayan özel bir yedek kapak (fallback) oluşturulur.
* İlk görünümde en güncel 3 proje sergilenir; ziyaretçi "Daha Fazla Gör" butonuyla tüm projeleri aynı sayfa içinde açıp kapatabilir.

### 5. Güvenli İletişim Formu (Contact)
Ziyaretçilerin doğrudan mesaj gönderebilmesi için **Web3Forms API** altyapısı kullanılmıştır. Form, spam saldırılarına karşı iki katmanlı koruma içerir:
* **Honeypot (Bot Tuzağı):** Normal kullanıcıların görmediği ancak otomatik form dolduran botların takıldığı gizli doğrulama alanı.
* **Dinamik Matematik Doğrulaması:** Her kullanımda rastgele üretilen toplama işlemi ile formun gerçek bir kullanıcı tarafından gönderildiği doğrulanır.

### 6. Alt Bilgi (Footer)
Site haritası bağlantıları, açık iletişim bilgileri, sosyal medya kısayolları ve telif hakkı metnini barındıran en koyu lacivert tonlu kapanış bölümüdür.

---

## Teknik Altyapı ve Mimari

* **Framework:** Next.js 16 (App Router mimarisi ve Server-Side Rendering)
* **Arayüz Kütüphanesi:** React 19 & TypeScript
* **Stil Motoru:** Tailwind CSS v4
* **Animasyon ve İkonlar:** Framer Motion & Lucide React
* **SEO ve İndeksleme:** Sunucu taraflı oluşturulan sayfalar sayesinde tüm içerik arama motoru botları tarafından anında okunabilir. Dinamik `sitemap.xml`, `robots.txt`, OpenGraph ve Twitter paylaşım kartları ile tam SEO uyumluluğu sağlanmıştır.
* **Sunucu ve Yayınlama:** Uygulama Ubuntu VPS üzerinde **PM2** süreç yöneticisi ile kesintisiz çalıştırılmakta, **Nginx Reverse Proxy** üzerinden yayınlanmakta ve **Cloudflare DNS** ile **Let's Encrypt SSL (HTTPS)** güvenlik katmanlarıyla korunmaktadır.
