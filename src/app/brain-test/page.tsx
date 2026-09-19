import type { Metadata } from "next";

import { BrainTest } from "@/components/brain-test/BrainTest";
import { ShinyText } from "@/components/motion/ShinyText";
import { PageEffects } from "@/components/PageEffects";
import { Band } from "@/components/site/Band";
import { SiteFooter } from "@/components/site/SiteFooter";
import { brainTestCopy } from "@/content/brainTest";

import "./brain-test.css";

export const metadata: Metadata = {
  title: "Brain Test",
  description: brainTestCopy.intro,
  alternates: { canonical: "/brain-test" },
};

/**
 * The Brain Test: the app's 18 consistency patterns plus three app questions become a
 * starter Brainwave in under a minute. Content and scoring live in src/content/brainTest.ts.
 */
export default function BrainTestPage() {
  const c = brainTestCopy;
  return (
    <main id="main">
      <Band color="#ffffff" theme="light" className="page" labelledBy="test-title">
        <div className="page-inner">
          <p className="band-eyebrow enter">
            <span className="band-eyebrow-dot" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h1 id="test-title" className="display-page enter" style={{ animationDelay: "80ms" }}>
            <ShinyText tone="ink" delay={1200}>
              {c.headline}
            </ShinyText>
          </h1>
          <p className="page-lede enter" style={{ animationDelay: "160ms" }}>
            {c.intro}
          </p>

          <BrainTest />
        </div>
      </Band>
      <SiteFooter />
      <PageEffects />
    </main>
  );
}
