import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/components/Providers";
import { BRAND_NAME } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteTitle = `${BRAND_NAME} — B2B Software & FinTech Engineering` as const;

const siteDescription =
  "Danijel Kresic: Independent Senior Software Engineer. Scalable B2B web applications, quantitative data pipelines, and enterprise architecture — Kresic Digital Systems." as const;

const siteKeywords: readonly string[] = [
  "Software Engineer",
  "FinTech Architect",
  "B2B Web Development",
  "Quantitative Systems",
  "Next.js",
  "React",
  "TypeScript",
  "Trading Algorithms",
];

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kresic.digital"
  ),
  title: {
    default: siteTitle,
    template: `%s · ${BRAND_NAME}`,
  },
  description: siteDescription,
  keywords: [...siteKeywords],
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
