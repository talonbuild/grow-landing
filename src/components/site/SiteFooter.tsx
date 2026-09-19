import Link from "next/link";

import { copy } from "@/config/copy";
import { legalDocs } from "@/content/legal";
import { site } from "@/config/site";

/** One quiet line at the very bottom, on whatever band ends the page. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="site-footer-tagline">{copy.footer.tagline}</p>
      <div className="site-footer-row">
        <span>
          © {new Date().getFullYear()} {site.company}
        </span>
        {legalDocs.map((d) => (
          <Link key={d.slug} href={d.path} className="footer-link">
            {d.title}
          </Link>
        ))}
        {site.links.contactEmail && (
          <a href={`mailto:${site.links.contactEmail}`} className="footer-link">
            {copy.nav.contact}
          </a>
        )}
        {site.links.instagram && (
          <a href={site.links.instagram} rel="noopener" className="footer-link">
            Instagram
          </a>
        )}
      </div>
    </footer>
  );
}
