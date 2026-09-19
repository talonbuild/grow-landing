import type { Metadata, Viewport } from "next";
import { Unbounded } from "next/font/google";

import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { ScrollBackground } from "@/components/site/ScrollBackground";
import { SiteHeader } from "@/components/site/SiteHeader";
import { copy } from "@/config/copy";
import { site } from "@/config/site";

import "./globals.css";

// Unbounded (SIL OFL) — the display face the Grow app already uses. Body and UI text is
// Arial (declared at weight 500, see globals.css), so only one font file loads.
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: copy.meta.title,
    template: `%s — ${site.name}`,
  },
  description: copy.meta.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: copy.meta.title,
    description: copy.meta.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={unbounded.variable} suppressHydrationWarning>
      <body className="font-sans text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <ScrollBackground />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
