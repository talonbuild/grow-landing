import type { Metadata } from "next";

import { GrowBrain } from "@/components/brain/GrowBrain";
import { GrowSignupForm } from "@/components/GrowSignupForm";
import { Reveal } from "@/components/motion/Reveal";
import { ShinyText } from "@/components/motion/ShinyText";
import { PageEffects } from "@/components/PageEffects";
import { Band } from "@/components/site/Band";
import { SiteFooter } from "@/components/site/SiteFooter";
import { copy } from "@/config/copy";

export const metadata: Metadata = {
  title: "About",
  description: copy.about.headline,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const c = copy.about;
  return (
    <main id="main">
      <Band color="#ffffff" theme="light" className="page" labelledBy="about-title">
        <article className="page-inner page-narrow">
          <p className="band-eyebrow enter">
            <span className="band-eyebrow-dot" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h1 id="about-title" className="display-page enter" style={{ animationDelay: "80ms" }}>
            <ShinyText tone="ink" delay={1200}>
              {c.headline}
            </ShinyText>
          </h1>
          <div className="page-prose">
            {c.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 60} amount={0.2}>
                {p}
              </Reveal>
            ))}
            <Reveal as="p" className="page-signoff" amount={0.2}>
              {c.signoff}
            </Reveal>
          </div>
          <Reveal className="page-cta" amount={0.2}>
            <GrowSignupForm location="about" buttonLabel={c.cta} note={c.ctaNote} />
          </Reveal>
        </article>
        <div className="page-brain" aria-hidden="true">
          <GrowBrain id="about" fills={{ physical: 0.7, mental: 0.5, life: 0.36 }} fluid decorative />
        </div>
      </Band>
      <SiteFooter />
      <PageEffects />
    </main>
  );
}
