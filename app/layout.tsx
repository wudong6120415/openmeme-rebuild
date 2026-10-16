import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://openmeme.art"),
  title: {
    default: "OpenMeme.art · 撸毛信号 · 比所有人早一步",
    template: "%s · OpenMeme.art",
  },
  description:
    "1-2 周内 TGE / 空投 / 防骗 · 由 @ruoxi01 真人筛选 · 比 DexScreener 更懂撸毛人。",
  keywords: [
    "撸毛", "空投", "TGE", "MEME", "meme币", "crypto", "加密货币",
    "OpenMeme", "ruoxi01", "DEX", "Solana", "BSC", "Base",
  ],
  authors: [{ name: "@ruoxi01" }],
  creator: "@ruoxi01",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://openmeme.art",
    siteName: "OpenMeme.art",
    title: "OpenMeme.art · 撸毛信号 · 比所有人早一步",
    description: "AI 扫全网 · @ruoxi01 真人筛选 · 大白话翻译每一条撸毛机会。",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "OpenMeme.art · 撸毛信号 · 比所有人早一步",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenMeme.art · 撸毛信号",
    description: "AI 扫全网 · @ruoxi01 真人筛选 · Open + Meme + 空投 + 撸毛",
    creator: "@ruoxi01",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://openmeme.art" },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen bg-bg-base text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
