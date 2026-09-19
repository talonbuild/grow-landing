import type { ReactNode } from "react";

/**
 * A light sweep across the letters. Pure CSS (background-clip: text) — the text stays
 * real, selectable text. `tone` picks the base/highlight pair from globals.css.
 */
export function ShinyText({
  children,
  tone = "ink",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  tone?: "ink" | "white" | "green" | "navy" | "sky";
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`shine shine-${tone} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </span>
  );
}
