import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vibeslop.ceo"),
  title: {
    default: "vibeslop.ceo — the AI labor leaderboards",
    template: "%s — vibeslop.ceo",
  },
  description:
    "Two leaderboards for the AI era: AI-built companies that were acquired, and CEOs who cut staff citing AI. 2025 and 2026.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "vibeslop.ceo",
    description:
      "Solo-owned, AI-built companies that sold, and CEOs who laid off citing AI.",
    url: "https://vibeslop.ceo",
    siteName: "vibeslop.ceo",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "vibeslop.ceo — the AI labor leaderboards" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "vibeslop.ceo",
    description:
      "Solo-owned, AI-built companies that sold, and CEOs who laid off citing AI.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b">
          <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-4 px-4 py-4">
            <Link href="/" className="flex items-baseline gap-2.5">
              <span className="font-mono text-lg font-bold tracking-tight">
                vibeslop<span className="text-muted-foreground">.ceo</span>
              </span>
              <span className="text-muted-foreground text-sm">
                Exits &amp; Layoffs
              </span>
            </Link>
            <a
              href="https://github.com/OR13/vibeslop.ceo"
              className="text-muted-foreground shrink-0 text-sm hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
