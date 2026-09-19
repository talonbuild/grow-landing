import Link from "next/link";

import { Band } from "@/components/site/Band";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function NotFound() {
  return (
    <main id="main">
      <Band color="#ffffff" theme="light" className="page">
        <div className="page-inner page-narrow">
          <h1 className="display-page">Nothing here.</h1>
          <p className="page-lede">
            <Link href="/" className="footer-link" style={{ textDecoration: "underline" }}>
              Back to Grow
            </Link>
          </p>
        </div>
      </Band>
      <SiteFooter />
    </main>
  );
}
