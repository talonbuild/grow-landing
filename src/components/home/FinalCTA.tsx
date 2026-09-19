import { GrowBrain } from "@/components/brain/GrowBrain";
import { GrowSignupForm } from "@/components/GrowSignupForm";
import { Reveal } from "@/components/motion/Reveal";
import { ShinyText } from "@/components/motion/ShinyText";
import { AppStoreButton } from "@/components/site/AppStoreButton";
import { Band } from "@/components/site/Band";
import { SiteFooter } from "@/components/site/SiteFooter";
import { copy } from "@/config/copy";

export function FinalCTA() {
  const c = copy.final;
  return (
    <Band id="join" color="#0b1f2a" from="#d7e5ec" theme="dark" className="final" labelledBy="final-title">
      <div className="band-inner final-inner">
        <Reveal className="final-brain" amount={0.4}>
          <div className="brain-halo brain-halo-dark" aria-hidden="true" />
          <GrowBrain id="final" fills={{ physical: 1, mental: 1, life: 1 }} fluid decorative />
        </Reveal>
        <Reveal as="h2" delay={80} className="display-final">
          <ShinyText tone="white">{c.headline}</ShinyText>
        </Reveal>
        <Reveal as="p" delay={140} className="final-body">
          {c.body}
        </Reveal>
        <Reveal delay={200} className="final-actions">
          <GrowSignupForm location="final" tone="dark" buttonLabel={c.cta} note={c.note} />
          <AppStoreButton location="final" className="btn-store-dark" />
        </Reveal>
      </div>
      <SiteFooter />
    </Band>
  );
}
