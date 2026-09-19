"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Fades and lifts its children into place when they enter the viewport, once.
 * Also stamps `data-in` on the element so CSS inside (e.g. brain water) can react.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  as: Tag = "div",
  className,
  amount = 0.25,
  late = false,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "figure" | "p" | "h2" | "h3";
  className?: string;
  amount?: number;
  /** Reveal only once the element is well inside the viewport — for content on colour bands, so text lands on its own colour. */
  late?: boolean;
} & Record<`data-${string}`, string | undefined>) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount, margin: late ? "0px 0px -26% 0px" : "0px 0px -8% 0px" });
  const reduced = useReducedMotion();
  const Comp = motion[Tag];

  return (
    <Comp
      ref={ref as never}
      className={className}
      data-in={inView || undefined}
      initial={reduced ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.95, ease: [0.2, 0.7, 0.2, 1], delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
