/**
 * GROW wordmark — PLACEHOLDER.
 * Typeset in Unbounded, matching how the app currently sets "GROW". This is not a
 * final logo. When the official logo exists, drop the SVG into src/assets/brand/
 * and render it here; every header and footer picks it up.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-[800] uppercase tracking-[-0.01em] ${className}`}>
      Grow
    </span>
  );
}
