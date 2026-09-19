import type { ReactNode } from "react";

export type BandTheme = "light" | "dark";

/**
 * A full-width section that owns a background colour. The band paints its own colour,
 * so every line of text always sits on the colour it was designed for. `from` is the
 * colour of the band above: the top of this band cross-fades from it (a short strip
 * inside the top padding, never behind text). <ScrollBackground/> keeps <html> and the
 * header in step.
 */
export function Band({
  id,
  color,
  from,
  theme,
  className = "",
  children,
  labelledBy,
}: {
  id?: string;
  color: string;
  /** Colour of the previous band, for the cross-fade at the top edge. */
  from?: string;
  theme: BandTheme;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      data-band={theme}
      data-band-color={color}
      data-band-from={from}
      aria-labelledby={labelledBy}
      className={`band band-${theme} ${className}`}
      style={{ "--band": color, "--band-prev": from ?? color } as React.CSSProperties}
    >
      {children}
    </section>
  );
}
