"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Wordmark } from "@/components/brand/Wordmark";
import { AppStoreLink } from "@/components/CtaLinks";
import { copy } from "@/config/copy";
import { site } from "@/config/site";

const tabs = [
  { href: "/about", label: copy.nav.about },
  { href: "/brain-test", label: copy.nav.brainTest },
];

/** Product navigation and a persistent download link. Legal links live in the footer. */
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="home-link" aria-label={`${site.name} — home`} aria-current={pathname === "/" ? "page" : undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/kit/brand-app-icon.webp" alt="" width={28} height={28} className="home-app-icon" />
          <Wordmark className="text-[1rem]" />
        </Link>
        <nav aria-label="Primary" className="site-nav">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} className="site-tab" aria-current={pathname === t.href ? "page" : undefined}>
              {t.label}
            </Link>
          ))}
          <AppStoreLink location="header" className="nav-download">Download</AppStoreLink>
        </nav>
      </div>
    </header>
  );
}
