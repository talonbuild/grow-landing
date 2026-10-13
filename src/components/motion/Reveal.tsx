"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Gently lifts its children into place when they enter the viewport, once.
 * Content stays visible and at rest in server-rendered HTML if JavaScript fails.
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
  id?: string;
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
      initial={false}
      animate={inView && reduced === false ? { y: [y, 0] } : { y: 0 }}
      transition={{ duration: reduced ? 0 : 0.95, ease: [0.2, 0.7, 0.2, 1], delay: reduced ? 0 : delay / 1000 }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
