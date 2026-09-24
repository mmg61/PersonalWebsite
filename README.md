# Kişisel Portfolyo

Bu proje yeteneklerimi, projelerimi ve iletişim bilgilerimi sergilemek amacıyla modern web teknolojileri kullanılarak sıfırdan geliştirilmiştir. Sistem, %100 SEO uyumlu ve mobil cihazlara tam duyarlı (responsive) olacak şekilde tasarlanmıştır.

## Kullanılan Teknolojiler

* **Framework:** Next.js 15 (App Router & Server-Side Rendering)
* **Kütüphane:** React 19
* **Stil & Tasarım:** Tailwind CSS v4 (Sadece Solid/Blok renkler kullanılarak keskin bir tasarım dili oluşturuldu)
* **İkonlar:** Lucide React
* **Yayınlama (Deployment):** Ubuntu VPS, Nginx Reverse Proxy, PM2 ve Let's Encrypt SSL

## Proje Gidişatı ve Yol Haritası

Proje şu ana kadar planlanan aşamaların çoğunu başarıyla tamamlamış durumdadır:

- **Altyapı Kurulumu:** Next.js ve Tailwind CSS iskeleti oluşturuldu.
- **Kullanıcı Arayüzü (UI):** Tek sayfa (One-Page) mimarisine uygun olarak Header, Giriş (Hero), Hakkımda, Projeler ve İletişim bölümleri tasarlandı.
- **Tasarım Dili:** Aydınlık/Karanlık tema karmaşası kaldırılarak, mavinin 5 farklı tonuyla keskin ve temiz bir renk hiyerarşisi kuruldu.
- **Tipografi:** Google Fonts üzerinden **Inter** yazı tipi projeye entegre edildi.
- **SEO & Optimizasyon:** Meta etiketleri, Open Graph ayarları, Description ve Keywords kodlara eklendi. Projeye özgü logo eklendi.
- **Sunucu & Yayınlama:** Proje, GitHub bağımsız olarak ZIP ile VPS'e aktarıldı. Nginx ve PM2 kurularak canlıya alındı.
- **Güvenlik & Alan Adı:** Cloudflare DNS üzerinden A kayıtları yapıldı, Certbot ile Let's Encrypt SSL (HTTPS kilit ikonu) sertifikası başarıyla kuruldu.
- **Dinamik Veri:** Projeler bölümünün doğrudan GitHub API ile beslenerek otomatik güncellenmesi sağlandı.
- **Kişisel İçerik:** Hakkımda ve Giriş metinleri, görsellerle birlikte detaylandırıldı.

## Kurulum

Projeyi kendi bilgisayarınızda çalıştırmak isterseniz:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirici sunucusunu başlatın
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek projeyi görüntüleyebilirsiniz.
