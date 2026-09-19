import type { CSSProperties } from "react";

import { BOUNDS, BRAIN_COLORS, BRAIN_INK, CENTERS, FOLDS, SHAPES, type Sector } from "./anatomy";

export interface SectorArtProps {
  sector: Sector;
  /** Unique per brain instance on the page — used for gradient/clip ids. */
  id: string;
  /** 0–1 resting water level. */
  fill?: number;
  /** Stagger index for the load-time rise. */
  index?: number;
  /** Drifting water surface. */
  fluid?: boolean;
  /** Include the soft SVG drop shadow (cheap for static brains; skip on animated layers). */
  shadow?: boolean;
  /** Stronger outline (a selected / hovered sector). */
  emphasis?: boolean;
  /** Extra props on the outline path — e.g. pointer handlers for interactive brains. */
  hitProps?: React.SVGProps<SVGPathElement>;
}

/** One sector of the Grow brain: glass, water, folds. Pure SVG, no client code. */
export function SectorArt({ sector: s, id, fill = 0, index = 0, fluid = false, shadow = false, emphasis = false, hitProps }: SectorArtProps) {
  const color = BRAIN_COLORS[s];
  const level = Math.max(0, Math.min(1, fill));
  const [top, bottom] = BOUNDS[s];
  const waterY = bottom - (bottom - top) * level;
  const [cx] = CENTERS[s];
  const waterStyle = {
    "--water-from": `${bottom + 8}px`,
    "--water-to": `${waterY}px`,
    "--water-full": `${top - 6}px`,
    "--water-delay": `${index * 180}ms`,
  } as CSSProperties;

  return (
    <g className="grow-brain-sector" data-sector={s}>
      <defs>
        <linearGradient id={`${id}-${s}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff" stopOpacity=".94" />
          <stop offset=".44" stopColor={color} stopOpacity=".17" />
          <stop offset=".72" stopColor="#fff" stopOpacity=".56" />
          <stop offset="1" stopColor={color} stopOpacity=".34" />
        </linearGradient>
        <linearGradient id={`${id}-${s}-water`} x1="0" y1="0" x2=".3" y2="1">
          <stop stopColor={color} stopOpacity=".76" />
          <stop offset=".48" stopColor={color} />
          <stop offset="1" stopColor={BRAIN_INK[s]} />
        </linearGradient>
        <linearGradient id={`${id}-${s}-ridge`} x1="0" y1="0" x2=".5" y2="1">
          <stop stopColor="#fff" stopOpacity=".72" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".1" />
          <stop offset="1" stopColor={color} stopOpacity=".28" />
        </linearGradient>
        <clipPath id={`${id}-${s}-clip`}>
          <path d={SHAPES[s]} />
        </clipPath>
        {shadow && (
          <filter id={`${id}-${s}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#183d55" floodOpacity=".12" />
          </filter>
        )}
      </defs>

      <path
        d={SHAPES[s]}
        fill={`url(#${id}-${s}-glass)`}
        stroke={color}
        strokeOpacity={emphasis ? 0.95 : 0.42}
        strokeWidth={emphasis ? 2.6 : 1.6}
        filter={shadow ? `url(#${id}-${s}-shadow)` : undefined}
        className="grow-brain-hit"
        {...hitProps}
      />
      <g clipPath={`url(#${id}-${s}-clip)`} pointerEvents="none">
        <g className="grow-brain-water" style={waterStyle}>
          {fluid ? (
            <g className="grow-brain-surface">
              <path d="M-440 0Q-385-5-330 0T-110 0T110 0T330 0T550 0T770 0H880V460H-440Z" fill={`url(#${id}-${s}-water)`} />
              <path d="M-440 0Q-385-5-330 0T-110 0T110 0T330 0T550 0T770 0" fill="none" stroke="#fff" strokeOpacity=".65" strokeWidth="1.6" />
            </g>
          ) : (
            <>
              <rect x="0" y="0" width="440" height="460" fill={`url(#${id}-${s}-water)`} />
              <ellipse cx={cx} cy="1" rx={s === "physical" ? 115 : 110} ry="5" fill="#fff" fillOpacity=".2" stroke="#fff" strokeOpacity=".7" strokeWidth="1.3" />
            </>
          )}
        </g>
        {FOLDS[s].map((d, n) => (
          <g key={n}>
            <path d={d} fill="none" stroke={BRAIN_INK[s]} strokeOpacity={level ? 0.23 : 0.17} strokeWidth="11" strokeLinecap="round" />
            <path d={d} transform="translate(-3 -5)" fill="none" stroke={`url(#${id}-${s}-ridge)`} strokeWidth="24" strokeLinecap="round" />
            <path d={d} transform="translate(-5 -9)" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="1.9" strokeLinecap="round" />
          </g>
        ))}
      </g>
      <path d={SHAPES[s]} fill="none" stroke="#fff" strokeWidth="1.2" strokeOpacity=".8" transform="translate(-1 -1)" pointerEvents="none" />
    </g>
  );
}

/** Cerebellum and stem — the quiet silver base under the three sectors. */
export function StemArt() {
  return (
    <g opacity=".8" className="grow-brain-stem" pointerEvents="none">
      <path d="M275 378C287 398 303 417 314 441Q306 451 297 443L271 413Q240 404 230 384" fill="#c8dce6" stroke="#7ea8bd" />
      <path d="M325 370C360 350 407 365 401 390C399 419 348 429 316 403Z" fill="#d4e7ef" stroke="#87b2c6" />
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <path key={n} d={`M${324 + n * 2} ${379 + n * 4}Q368 ${367 + n * 9} ${397 - n * 2} ${380 + n * 5}`} fill="none" stroke="#8cb4c8" strokeWidth="1.4" />
      ))}
    </g>
  );
}
