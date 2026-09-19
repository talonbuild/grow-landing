"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useCallback, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { EXPLODE, LABEL_ANCHORS, SECTORS, VIEWBOX, type Sector } from "./anatomy";
import { SectorArt, StemArt } from "./SectorArt";

export interface SectorNavItem {
  sector: Sector;
  label: string;
  hint: string;
  /** Section id on the page, e.g. "lock-in". */
  target: string;
}

export interface HeroBrainProps {
  items: SectorNavItem[];
  fills: Record<Sector, number>;
}

const DEPTH: Record<Sector, number> = { physical: 34, mental: 34, life: 8 };
const BASE_GAP = 2.4; // % of the brain box the sectors sit apart at rest

/**
 * The hero brain: the app's brain split into its three sectors. Each sector is its own
 * layer in a 3D stage — it tilts with the cursor, the sectors drift apart as you scroll,
 * and hovering (or focusing its label) fills a sector and lights its navigation label.
 * Clicking a sector or its label scrolls to that section without touching the URL.
 */
export function HeroBrain({ items, fills }: HeroBrainProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState<Sector | null>(null);

  // Leader lines start at each label's dot — measured, so they survive any font or wrap.
  const dotRefs = useRef<Partial<Record<Sector, HTMLSpanElement | null>>>({});
  const [dots, setDots] = useState<Partial<Record<Sector, [number, number]>>>({});
  useLayoutEffect(() => {
    const measure = () => {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const next: Partial<Record<Sector, [number, number]>> = {};
      for (const s of SECTORS) {
        const d = dotRefs.current[s]?.getBoundingClientRect();
        if (d) next[s] = [((d.left + d.width / 2 - box.left) / box.width) * 100, ((d.top + d.height / 2 - box.top) / box.height) * 100];
      }
      setDots(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  // Pointer → tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 16, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 55, damping: 16, mass: 0.7 });
  const rotateY = useTransform(sx, [-1, 1], [-10, 10]);
  const rotateX = useTransform(sy, [-1, 1], [8, -8]);

  // Scroll → separation
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.35", "end start"] });
  const spread = useTransform(scrollYProgress, [0, 1], [1, 3.4]);
  const fade = useTransform(scrollYProgress, [0.55, 1], [1, 0.35]);

  const onMove = useCallback(
    (e: ReactPointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      px.set(((e.clientX - r.left) / r.width) * 2 - 1);
      py.set(((e.clientY - r.top) / r.height) * 2 - 1);
    },
    [px, py],
  );
  const onLeave = useCallback(() => {
    px.set(0);
    py.set(0);
    setActive(null);
  }, [px, py]);

  const go = (target: string) => {
    const el = document.getElementById(target);
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <div
      ref={ref}
      className="hero-brain"
      data-active={active ?? undefined}
      onPointerMove={reduced ? undefined : onMove}
      onPointerLeave={onLeave}
    >
      <div className="brain-halo" aria-hidden="true" />
      <div className="brain-ground" aria-hidden="true" />

      <motion.div
        className="hero-brain-stage"
        style={reduced ? undefined : { rotateX, rotateY, opacity: fade }}
        aria-hidden="true"
      >
        <div className="hero-brain-layer hero-brain-stem" style={{ transform: "translateZ(-16px)" }}>
          <svg viewBox={VIEWBOX}>
            <StemArt />
          </svg>
        </div>

        {SECTORS.map((s, i) => {
          const item = items.find((it) => it.sector === s);
          return (
            <SectorLayer
              key={s}
              sector={s}
              index={i}
              fill={fills[s]}
              spread={spread}
              reduced={reduced}
              active={active}
              onEnter={() => setActive(s)}
              onClick={() => item && go(item.target)}
            />
          );
        })}
      </motion.div>

      {/* Leader lines from each label to its sector */}
      <svg className="hero-brain-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {items.map(({ sector }) => {
          const dot = dots[sector];
          if (!dot) return null;
          const [ax, ay] = LABEL_ANCHORS[sector];
          return <line key={sector} data-sector={sector} x1={dot[0]} y1={dot[1]} x2={ax} y2={ay} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>

      <nav className="hero-brain-nav" aria-label="Explore Grow">
        {items.map(({ sector, label, hint, target }) => {
          return (
            <a
              key={sector}
              href={`#${target}`}
              className="sector-label"
              data-sector={sector}
              data-on={active === sector || undefined}
              onPointerEnter={() => setActive(sector)}
              onFocus={() => setActive(sector)}
              onBlur={() => setActive(null)}
              onClick={(e) => {
                e.preventDefault();
                go(target);
              }}
            >
              <span
                className="sector-label-dot"
                aria-hidden="true"
                ref={(el) => {
                  dotRefs.current[sector] = el;
                }}
              />
              <span className="sector-label-text">
                <span className="sector-label-title">{label}</span>
                <span className="sector-label-hint">
                  <span>{hint}</span>
                </span>
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

function SectorLayer({
  sector: s,
  index,
  fill,
  spread,
  reduced,
  active,
  onEnter,
  onClick,
}: {
  sector: Sector;
  index: number;
  fill: number;
  spread: MotionValue<number>;
  reduced: boolean;
  active: Sector | null;
  onEnter: () => void;
  onClick: () => void;
}) {
  const [ex, ey] = EXPLODE[s];
  const x = useTransform(spread, (v) => `${ex * BASE_GAP * v}%`);
  const y = useTransform(spread, (v) => `${ey * BASE_GAP * v}%`);
  const isOn = active === s;
  const isOff = active !== null && !isOn;

  return (
    <motion.div
      className="hero-brain-layer"
      data-sector={s}
      data-full={isOn || undefined}
      style={reduced ? { x: `${ex * BASE_GAP}%`, y: `${ey * BASE_GAP}%` } : { x, y, z: DEPTH[s] }}
      animate={{ scale: isOn ? 1.045 : isOff ? 0.985 : 1, opacity: isOff ? 0.72 : 1 }}
      transition={{ type: "spring", stiffness: 170, damping: 22, mass: 0.8 }}
    >
      <svg viewBox={VIEWBOX} className="hero-brain-svg">
        <SectorArt
          sector={s}
          id="hero"
          fill={fill}
          index={index}
          fluid
          emphasis={isOn}
          hitProps={{
            onPointerEnter: onEnter,
            onClick,
            style: { cursor: "pointer", pointerEvents: "auto" },
          }}
        />
      </svg>
    </motion.div>
  );
}
