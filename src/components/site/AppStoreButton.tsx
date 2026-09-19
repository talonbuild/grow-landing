import { AppStoreLink } from "@/components/CtaLinks";
import { copy } from "@/config/copy";
import { site } from "@/config/site";

/**
 * The App Store button. Locked ("Coming soon") until site.launch.appStoreUrl is set,
 * then a real link. Swap the inner markup for Apple's official badge at launch.
 */
export function AppStoreButton({ location, className = "" }: { location: string; className?: string }) {
  if (site.launch.appStoreUrl) {
    return (
      <AppStoreLink location={location} className={`btn-store ${className}`}>
        <AppleGlyph />
        <span className="btn-store-text">
          <span className="btn-store-small">Download on the</span>
          <span className="btn-store-big">App Store</span>
        </span>
      </AppStoreLink>
    );
  }
  return (
    <span className={`btn-store btn-store-locked ${className}`} role="button" aria-disabled="true" title={copy.hero.appStoreLocked}>
      <svg viewBox="0 0 24 24" className="btn-store-lock" aria-hidden="true">
        <rect x="5" y="10.5" width="14" height="10" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="btn-store-text">
        <span className="btn-store-small">App Store</span>
        <span className="btn-store-big">{copy.hero.appStoreLocked}</span>
      </span>
    </span>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="btn-store-apple" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.8 3-.8s1.8.8 3 .7c1.3 0 2-1.1 2.8-2.3.9-1.3 1.2-2.6 1.3-2.6-.1 0-2.5-.9-2.5-3.7ZM14.1 5.9c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3Z"
      />
    </svg>
  );
}
