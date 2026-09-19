import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { ShinyText } from "@/components/motion/ShinyText";
import { Band } from "@/components/site/Band";
import { copy } from "@/config/copy";

import { FrequencyLadder } from "./FrequencyLadder";

export function Progress() {
  const c = copy.progress;
  return (
    <Band id="progress" color="#d7e5ec" from="#12417d" theme="light" labelledBy="progress-title">
      <div className="band-inner">
        <Reveal late as="p" className="band-eyebrow" data-sector="life">
          <span className="band-eyebrow-dot" aria-hidden="true" />
          {c.eyebrow}
          <span className="band-eyebrow-sector">{c.sector}</span>
        </Reveal>
        <Reveal late as="h2" delay={70} className="display-band">
          <ShinyText tone="navy">{c.headline}</ShinyText>
        </Reveal>
        <ScrollWords className="band-lede" text={c.lede} />

        <div className="ladder-stage">
          <FrequencyLadder />
          <Reveal late as="p" className="ladder-caption">
            {c.frequenciesCaption}
          </Reveal>
        </div>

        <ul className="points points-compact">
          {c.points.map((p, i) => (
            <Reveal late as="li" key={p.title} delay={i * 120} className="point">
              <h3 className="point-title">{p.title}</h3>
              <p className="point-body">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Band>
  );
}
