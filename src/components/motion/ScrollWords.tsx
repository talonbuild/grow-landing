"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * A paragraph that reads itself in: each word brightens as it scrolls through the
 * lower part of the viewport. Reserve for ledes — one element per word.
 * Words rest at REST opacity, the lowest that still reads at 4.5:1 on every band
 * (white on the green band is the tightest), and light up to full.
 */
const REST = 0.78;
export function ScrollWords({ text, className = "", as: Tag = "p" }: { text: string; className?: string; as?: "p" | "h2" | "h3" }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });
  const words = text.split(" ");

  if (reduced) {
    const Comp = Tag;
    return <Comp className={className}>{text}</Comp>;
  }
  const Comp = motion[Tag];
  return (
    <Comp ref={ref as never} className={`scroll-words ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <Word key={i} word={word} progress={scrollYProgress} start={i / words.length} end={(i + 1) / words.length} />
      ))}
    </Comp>
  );
}

function Word({ word, progress, start, end }: { word: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [REST, 1]);
  return (
    <motion.span style={{ opacity }} aria-hidden="true">
      {word}{" "}
    </motion.span>
  );
}
