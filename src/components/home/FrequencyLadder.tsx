"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { copy } from "@/config/copy";

/** The nine Frequencies as a rising ladder that lights up as you scroll past it. */
export function FrequencyLadder() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "end 0.5"] });
  const steps = copy.progress.frequencies;
  const max = steps[steps.length - 1];

  return (
    <div ref={ref} className="ladder" role="img" aria-label={copy.progress.frequenciesCaption}>
      <ol className="ladder-bars" aria-hidden="true">
        {steps.map((n, i) => (
          <Bar key={n} n={n} index={i} count={steps.length} height={Math.round((18 + 82 * (Math.log(n) / Math.log(max))) * 100) / 100} progress={scrollYProgress} reduced={reduced} />
        ))}
      </ol>
      <p className="ladder-label" aria-hidden="true">
        {copy.progress.ladderLabel}
      </p>
    </div>
  );
}

function Bar({
  n,
  index,
  count,
  height,
  progress,
  reduced,
}: {
  n: number;
  index: number;
  count: number;
  height: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const at = (index + 0.6) / count;
  const lit = useTransform(progress, [at - 0.06, at], [0, 1]);
  const scaleY = useTransform(lit, [0, 1], [0.35, 1]);
  return (
    <li className="ladder-step" style={{ "--h": `${height}%` } as React.CSSProperties}>
      <div className="ladder-bar-wrap">
        <motion.div className="ladder-bar" style={reduced ? { scaleY: 1, opacity: 1 } : { scaleY, opacity: lit }} />
        <div className="ladder-bar-ghost" />
      </div>
      <span className="ladder-n">{n}</span>
    </li>
  );
}
