import { HeroBrain, type SectorNavItem } from "@/components/brain/HeroBrain";
import { GrowSignupForm } from "@/components/GrowSignupForm";
import { ShinyText } from "@/components/motion/ShinyText";
import { AppStoreButton } from "@/components/site/AppStoreButton";
import { Band } from "@/components/site/Band";
import { copy } from "@/config/copy";

const nav: SectorNavItem[] = (["physical", "mental", "life"] as const).map((sector) => ({
  sector,
  ...copy.brainNav[sector],
}));

export function Hero() {
  return (
    <Band id="top" color="#ffffff" theme="light" className="hero" labelledBy="hero-title">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow enter" style={{ animationDelay: "0ms" }}>
            <span className="eyebrow-dot" aria-hidden="true" />
            {copy.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="display-hero enter" style={{ animationDelay: "90ms" }}>
            <span className="block">{copy.headline[0]}</span>
            <span className="block">
              <ShinyText tone="ink" delay={1400}>
                {copy.headline[1]}
              </ShinyText>
            </span>
          </h1>
          <p className="hero-sub enter" style={{ animationDelay: "180ms" }}>
            {copy.hero.subline}
          </p>
          <div className="hero-actions enter" style={{ animationDelay: "270ms" }}>
            <GrowSignupForm location="hero" buttonLabel={copy.hero.cta} note={copy.hero.ctaNote} />
            <AppStoreButton location="hero" className="hero-store" />
          </div>
        </div>

        <div className="hero-visual enter-brain">
          <HeroBrain items={nav} fills={{ physical: 0.64, mental: 0.46, life: 0.3 }} />
        </div>
      </div>
    </Band>
  );
}
