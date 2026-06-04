import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-sans-jp",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-serif-jp",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const description =
  "和田町会(横浜国立大学経営者会)は、卒業生有志により設立された経営者・実務家のための学びと交流の場です。半世紀以上にわたり、経営の知見を深め合い、社会への責任を果たす人材を輩出してきました。";

export const metadata: Metadata = {
  title: "和田町会 | 横浜国立大学経営者会",
  description,
  keywords: ["和田町会", "横浜国立大学", "経営者会", "卒業生", "経営", "横浜国大", "OB会"],
  authors: [{ name: "和田町会" }],
  openGraph: {
    title: "和田町会 | 横浜国立大学経営者会",
    description,
    locale: "ja_JP",
    type: "website",
    siteName: "和田町会",
  },
  twitter: {
    card: "summary_large_image",
    title: "和田町会 | 横浜国立大学経営者会",
    description,
  },
  // 開発中のため検索エンジン除外。公開時に index: true, follow: true に変更すること。
  robots: { index: false, follow: false },
  icons: { icon: "/icon.jpg" },
};

// viewport は Next.js 14 以降 metadata から分離。metadata 内の viewport は非推奨。
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${notoSerifJp.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
