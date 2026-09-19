"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { copy } from "@/config/copy";

/** The ring's drawing box. Wide enough that the side labels sit clear of the ring. */
const VB = { x: -30, y: -4, w: 160, h: 108 };
const at = (x: number, y: number) => ({ left: `${((x - VB.x) / VB.w) * 100}%`, top: `${((y - VB.y) / VB.h) * 100}%` });

type Anchor = "start" | "middle" | "end";

/**
 * The GROW day as a ring: 7:00 a.m. at the top, 7:00 p.m. at the bottom. The arc draws
 * as the section scrolls and each step lights as the arc reaches it. The ring is SVG;
 * the labels are HTML placed over it so they render at real, readable font sizes.
 */
export function CycleDial() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  const steps = copy.prime.loop;
  // Prime (top), Act (right), Reset (bottom), Reflect (left)
  const positions: { x: number; y: number; anchor: Anchor; at: number }[] = [
    { x: 50, y: 1, anchor: "middle", at: 0.02 },
    { x: 93, y: 50, anchor: "start", at: 0.28 },
    { x: 50, y: 99, anchor: "middle", at: 0.53 },
    { x: 7, y: 50, anchor: "end", at: 0.78 },
  ];

  return (
    <div ref={ref} className="dial" role="img" aria-label={copy.prime.dial.caption}>
      <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} className="dial-svg" aria-hidden="true">
        <circle cx="50" cy="50" r="38" className="dial-track" />
        <motion.circle
          cx="50"
          cy="50"
          r="38"
          className="dial-arc"
          transform="rotate(-90 50 50)"
          style={{ pathLength: reduced ? 1 : scrollYProgress }}
        />
        {/* 7:00 a.m. and 7:00 p.m. marks */}
        <line x1="50" y1="8.5" x2="50" y2="14" className="dial-tick" />
        <line x1="50" y1="86" x2="50" y2="91.5" className="dial-tick" />
      </svg>
      <div className="dial-labels" aria-hidden="true">
        <span className="dial-label dial-time" style={at(50, 22)}>
          {copy.prime.dial.morning}
        </span>
        <span className="dial-label dial-time" style={at(50, 78)}>
          {copy.prime.dial.evening}
        </span>
        {steps.map((s, i) => (
          <DialLabel key={s.step} text={s.step} {...positions[i]} progress={scrollYProgress} reduced={!!reduced} />
        ))}
      </div>
    </div>
  );
}

function DialLabel({
  text,
  x,
  y,
  anchor,
  at: lightAt,
  progress,
  reduced,
}: {
  text: string;
  x: number;
  y: number;
  anchor: Anchor;
  at: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // Unlit steps stay at 0.62: still 4.9:1 on the navy band, so the ring reads before it is scrubbed.
  const opacity = useTransform(progress, [Math.max(0, lightAt - 0.08), lightAt + 0.04], [0.62, 1]);
  return (
    <motion.span className="dial-label dial-step" data-anchor={anchor} style={{ ...at(x, y), opacity: reduced ? 1 : opacity }}>
      {text}
    </motion.span>
  );
}
