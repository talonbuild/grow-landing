"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Wordmark } from "@/components/brand/Wordmark";
import { copy } from "@/config/copy";
import { site } from "@/config/site";

const tabs = [
  { href: "/about", label: copy.nav.about },
  { href: "/privacy", label: copy.nav.privacy },
  { href: "/brain-test", label: copy.nav.brainTest },
];

/** Grow + home icon on the left; About · Privacy · Brain Test on the right. Adapts to the band beneath it. */
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="home-link" aria-label={`${site.name} — home`} aria-current={pathname === "/" ? "page" : undefined}>
          <Wordmark className="text-[1rem]" />
          <svg viewBox="0 0 24 24" className="home-icon" aria-hidden="true">
            <path d="M3.5 10.6 12 3.8l8.5 6.8" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.6 9.4V20h4.8v-5.6h3.2V20h4.8V9.4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <nav aria-label="Primary" className="site-nav">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} className="site-tab" aria-current={pathname === t.href ? "page" : undefined}>
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
