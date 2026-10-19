import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { PageEffects } from "@/components/PageEffects";
import { AppStoreButton } from "@/components/site/AppStoreButton";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Title } from "@/components/site/Title";
import { copy } from "@/config/copy";
import { site } from "@/config/site";

import "../home.css";
import "./about.css";

// A page-level openGraph replaces the layout's whole object, so the share image is named here too.
const shareImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "GROW: Your habits have a buddy. Noggin, a little 3D brain with green, blue and sky-blue lobes, waving.",
};

export const metadata: Metadata = {
  title: "About",
  description: copy.about.description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: "About GROW",
    description: copy.about.description,
    url: "/about",
    images: [shareImage],
  },
  twitter: { card: "summary_large_image", title: "About GROW", description: copy.about.description, images: [shareImage] },
};

export default function AboutPage() {
  const c = copy.about;
  return (
    <main id="main" className="gd ab">
      {/* Dawn: who we are */}
      <section className="gd-card ab-hero" data-tone="dawn" aria-labelledby="about-title">
        <div className="ab-hero-words">
          <p className="ab-eyebrow">{c.eyebrow}</p>
          <Title lines={c.headline} as="h1" id="about-title" />
          <p className="gd-sub">{c.sub}</p>
        </div>
        <div className="ab-hero-visual">
          <Image
            className="gd-noggin ab-hero-noggin gd-float"
            src="/media/kit/noggin-3d-wave.webp"
            alt="Noggin, a little brain with green, blue and sky-blue lobes, waving hello."
            width={1100}
            height={1100}
            priority
            sizes="(max-width: 48rem) 70vw, 480px"
          />
        </div>
      </section>

      {/* Paper: the letter */}
      <section className="gd-card ab-letter" data-tone="paper" aria-label="A note from Marcos and Leo">
        <div className="ab-letter-inner">
          {c.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} className={i === 0 ? "ab-lead" : undefined} delay={i * 50} amount={0.2}>
              {p}
            </Reveal>
          ))}
          <Reveal as="p" amount={0.2}>
            {c.contact}{" "}
            <a href={`mailto:${site.links.contactEmail}`} className="ab-mail">
              {site.links.contactEmail}
            </a>
            .
          </Reveal>
          <Reveal className="ab-signoff" amount={0.2}>
            <Image src="/media/kit/noggin-mood-love.webp" alt="" width={400} height={434} className="ab-signoff-noggin" sizes="88px" />
            <p>
              <span className="ab-signoff-name">{c.signoff}</span>
              <span className="ab-signoff-role">{c.signoffRole}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mint: say hi */}
      <section className="gd-card gd-final ab-final" data-tone="mint" aria-labelledby="about-final-title">
        <Image className="gd-icon" src="/media/kit/brand-app-icon.webp" alt="The GROW app icon" width={256} height={256} />
        <Title lines={c.final.headline} id="about-final-title" />
        <p className="gd-sub">{c.final.sub}</p>
        <div className="gd-cta">
          <AppStoreButton location="about" />
          <p className="gd-note">{c.ctaNote}</p>
        </div>
      </section>

      <SiteFooter />
      <PageEffects />
    </main>
  );
}
