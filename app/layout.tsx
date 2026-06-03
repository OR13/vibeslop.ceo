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
    "Two leaderboards for the AI era: solo founders who built and sold companies without hiring anyone, and CEOs who cut staff citing AI.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-mono font-bold tracking-tight">
              vibeslop<span className="text-muted-foreground">.ceo</span>
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/exits" className="hover:underline underline-offset-4">
                Exit Club
              </Link>
              <Link href="/layoffs" className="hover:underline underline-offset-4">
                Layoff Board
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
          {children}
        </main>

        <footer className="text-muted-foreground border-t py-6 text-center text-xs">
          <p>
            Commentary on public record. Every claim links to its source.{" "}
            <a
              href="https://github.com/OR13/vibeslop.ceo"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Contribute on GitHub
            </a>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
