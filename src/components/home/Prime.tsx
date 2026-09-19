import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { ShinyText } from "@/components/motion/ShinyText";
import { Band } from "@/components/site/Band";
import { copy } from "@/config/copy";

import { CycleDial } from "./CycleDial";

export function Prime() {
  const c = copy.prime;
  return (
    <Band id="prime" color="#12417d" from="#0f6b48" theme="dark" labelledBy="prime-title">
      <div className="band-inner">
        <Reveal late as="p" className="band-eyebrow" data-sector="mental">
          <span className="band-eyebrow-dot" aria-hidden="true" />
          {c.eyebrow}
          <span className="band-eyebrow-sector">{c.sector}</span>
        </Reveal>
        <Reveal late as="h2" delay={70} className="display-band">
          <ShinyText tone="white">{c.headline}</ShinyText>
        </Reveal>
        <ScrollWords className="band-lede" text={c.lede} />

        <div className="prime-grid">
          <Reveal late className="prime-dial" amount={0.3}>
            <CycleDial />
            <p className="dial-caption">{c.dial.caption}</p>
          </Reveal>
          <ol className="loop">
            {c.loop.map((s, i) => (
              <Reveal late as="li" key={s.step} delay={i * 110} className="loop-step">
                <span className="loop-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="loop-title">{s.step}</h3>
                  <p className="loop-body">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal late as="p" className="band-closing">
          {c.closing}
        </Reveal>
      </div>
    </Band>
  );
}
