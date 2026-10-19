import type { Metadata } from "next";

import { BrainTest } from "@/components/brain-test/BrainTest";
import { PageEffects } from "@/components/PageEffects";
import { SiteFooter } from "@/components/site/SiteFooter";
import { brainTestCopy } from "@/content/brainTest";

import "../home.css";
import "./brain-test.css";

export const metadata: Metadata = {
  title: "Brain Test",
  description: brainTestCopy.intro,
  alternates: { canonical: "/brain-test" },
};

/**
 * The Brain Test: GROW 6.0's three Day 1 questions, then the starter Brainwave the app would
 * seed from them. Content and logic live in src/content/brainTest.ts.
 */
export default function BrainTestPage() {
  return (
    <main id="main" className="gd">
      <section className="gd-card bt-card" data-tone="dawn" aria-label={brainTestCopy.eyebrow}>
        <BrainTest />
      </section>
      <SiteFooter />
      <PageEffects />
    </main>
  );
}
