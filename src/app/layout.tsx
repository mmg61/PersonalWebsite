import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mmgrsy.tr"),
  title: "MMG",
  description: "Modern web teknolojileri ile kullanıcı odaklı, performanslı ve ölçeklenebilir dijital deneyimler geliştiriyorum. Projelerime ve yeteneklerime göz atın.",
  keywords: ["Yazılım Geliştirici", "Web Developer", "Frontend", "Backend", "React", "Next.js", "Portfolyo", "MMG", "Muhammet Mustafa Gürsoy"],
  authors: [{ name: "Muhammet Mustafa Gürsoy", url: "https://github.com/mmg61" }],
  openGraph: {
    title: "MMG",
    description: "Modern web teknolojileri ile geliştirdiğim projelerim ve kişisel portfolyom.",
    url: "https://mmgrsy.tr",
    siteName: "MMG Portfolyo",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
        alt: "MMG Portfolyo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MMG",
    description: "Modern web teknolojileri ile geliştirdiğim projelerim ve kişisel portfolyom.",
    images: ["/cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`scroll-smooth ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#011026] text-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}