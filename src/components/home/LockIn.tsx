import { GrowBrain } from "@/components/brain/GrowBrain";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { ShinyText } from "@/components/motion/ShinyText";
import { Band } from "@/components/site/Band";
import { copy } from "@/config/copy";

/** How each measure looks on the brain: one action, one full sector, everything. */
const MINI = [
  { fills: { physical: 0.24 } },
  { fills: { physical: 1 } },
  { fills: { physical: 1, mental: 1, life: 1 } },
];

export function LockIn() {
  const c = copy.lockIn;
  return (
    <Band id="lock-in" color="#0f6b48" from="#ffffff" theme="dark" labelledBy="lock-in-title">
      <div className="band-inner">
        <Reveal late as="p" className="band-eyebrow" data-sector="physical">
          <span className="band-eyebrow-dot" aria-hidden="true" />
          {c.eyebrow}
          <span className="band-eyebrow-sector">{c.sector}</span>
        </Reveal>
        <Reveal late as="h2" delay={70} className="display-band">
          <ShinyText tone="white">{c.headline}</ShinyText>
        </Reveal>
        <ScrollWords className="band-lede" text={c.lede} />

        <ol className="points">
          {c.points.map((p, i) => (
            <Reveal late as="li" key={p.title} delay={i * 130} className="point">
              <figure className="point-visual" aria-hidden="true">
                <GrowBrain id={`lockin-${i}`} fills={MINI[i].fills} decorative stem={false} />
              </figure>
              <h3 className="point-title">{p.title}</h3>
              <p className="point-body">{p.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal late as="p" className="band-closing">
          {c.closing}
        </Reveal>
      </div>
    </Band>
  );
}
