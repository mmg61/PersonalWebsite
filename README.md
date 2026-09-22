# MMG61 - Kişisel Portfolyo 🚀

Bu proje, bir yazılım geliştiricisi olarak yeteneklerimi, projelerimi ve iletişim bilgilerimi sergilemek amacıyla modern web teknolojileri kullanılarak sıfırdan geliştirilmiştir. Sistem, %100 SEO uyumlu ve mobil cihazlara tam duyarlı (responsive) olacak şekilde tasarlanmıştır.

## 🛠 Kullanılan Teknolojiler

* **Framework:** Next.js 15 (App Router & Server-Side Rendering)
* **Kütüphane:** React 19
* **Stil & Tasarım:** Tailwind CSS v4 (Sadece Solid/Blok renkler kullanılarak keskin bir tasarım dili oluşturuldu)
* **İkonlar:** Lucide React
* **Yayınlama (Deployment):** Ubuntu VPS, Nginx Reverse Proxy, PM2 ve Let's Encrypt SSL

## 🗺 Proje Gidişatı ve Yol Haritası

Proje şu ana kadar planlanan aşamaların çoğunu başarıyla tamamlamış durumdadır:

- [x] **Altyapı Kurulumu:** Next.js ve Tailwind CSS iskeleti oluşturuldu.
- [x] **Kullanıcı Arayüzü (UI):** Tek sayfa (One-Page) mimarisine uygun olarak Header, Giriş (Hero), Hakkımda, Projeler ve İletişim bölümleri tasarlandı.
- [x] **Tasarım Dili:** Aydınlık/Karanlık tema karmaşası kaldırılarak, mavinin 5 farklı tonuyla keskin ve temiz bir renk hiyerarşisi kuruldu. Geçişli renkler (gradient) ve çizgiler iptal edildi.
- [x] **Tipografi:** Google Fonts üzerinden **Inter** yazı tipi projeye entegre edildi.
- [x] **SEO & Optimizasyon:** Meta etiketleri, Open Graph ayarları, Description ve Keywords kodlara eklendi. "Next.js" faviconu kaldırılarak projeye özgü logo eklendi.
- [x] **Sunucu & Yayınlama:** Proje, GitHub bağımsız olarak ZIP ile VPS'e aktarıldı. Nginx ve PM2 kurularak canlıya alındı.
- [x] **Güvenlik & Alan Adı:** Cloudflare DNS üzerinden A kayıtları yapıldı, Certbot ile Let's Encrypt SSL (HTTPS kilit ikonu) sertifikası başarıyla kuruldu.
- [ ] **Dinamik Veri (Sıradaki Adım):** Projeler bölümünün doğrudan GitHub API ile beslenerek otomatik güncellenmesi sağlanacak.
- [ ] **Kişisel İçerik (Sıradaki Adım):** Hakkımda ve Giriş metinleri, görsellerle birlikte detaylandırılacak.

## 💻 Kurulum (Geliştiriciler İçin)

Projeyi kendi bilgisayarınızda çalıştırmak isterseniz:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirici sunucusunu başlatın
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek projeyi görüntüleyebilirsiniz.
