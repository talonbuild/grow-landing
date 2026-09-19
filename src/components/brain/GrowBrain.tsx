import type { CSSProperties } from "react";

import { SECTORS, VIEWBOX, type Sector } from "./anatomy";
import { SectorArt, StemArt } from "./SectorArt";

export interface GrowBrainProps {
  /** Unique per instance on a page (SVG gradient/clip ids). */
  id: string;
  /** 0–1 water level per sector. */
  fills?: Partial<Record<Sector, number>>;
  /** Emphasise one sector; the others recede. */
  focus?: Sector;
  /** Gently drifting water surface instead of a flat one. */
  fluid?: boolean;
  /** Hide from assistive tech when a caption already describes it. */
  decorative?: boolean;
  /** Draw the stem and cerebellum. */
  stem?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/** The whole Grow brain as one static SVG — for small brains, diagrams and share images. */
export function GrowBrain({
  id,
  fills = {},
  focus,
  fluid = false,
  decorative = false,
  stem = true,
  label = "The Grow brain, with its Physical, Mental and Life sectors",
  className,
  style,
}: GrowBrainProps) {
  return (
    <svg
      className={`grow-brain${className ? ` ${className}` : ""}`}
      style={style}
      viewBox={VIEWBOX}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      focusable="false"
    >
      {stem && <StemArt />}
      {SECTORS.map((s, i) => (
        <g key={s} data-dim={focus && focus !== s ? "" : undefined} className="grow-brain-sector-wrap">
          <SectorArt sector={s} id={id} fill={fills[s] ?? 0} index={i} fluid={fluid} shadow emphasis={focus === s} />
        </g>
      ))}
    </svg>
  );
}
