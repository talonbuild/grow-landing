"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/** The shortest pause between a card coming into view and its contents fading in. */
const BEAT_MS = 250;
/** Never wait longer than this for the pictures; show the card anyway. */
const MAX_WAIT_MS = 1800;

/**
 * A home card whose contents arrive together: the words, the phone and Noggin fade in at once,
 * a beat after the card scrolls into view and only once its pictures (phone stills, the frame,
 * video posters) are loaded, so a half-loaded white phone never shows.
 *
 * Server HTML is fully visible. After hydration only cards still below the fold are hidden
 * (`data-arrive="wait"`, styled in home.css); a card already on screen stays as it is.
 */
export function Arrive({ children, ...rest }: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.dataset.arrive = "wait";
    let alive = true;

    let loading: Promise<unknown> | null = null;
    const load = () =>
      (loading ??= Promise.all([
        ...[...el.querySelectorAll("img")].map((img) => {
          img.loading = "eager";
          return img.decode().catch(() => {});
        }),
        ...[...el.querySelectorAll("video")]
          .filter((v) => v.poster)
          .map((v) => {
            const still = new Image();
            still.src = v.poster;
            return still.decode().catch(() => {});
          }),
      ]));

    // Start fetching well before the card arrives…
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        near.disconnect();
        void load();
      },
      { rootMargin: "900px 0px" },
    );
    // …and fade it in once it is properly on screen and its pictures are ready.
    const seen = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        seen.disconnect();
        const t0 = performance.now();
        void Promise.race([load(), new Promise((r) => setTimeout(r, MAX_WAIT_MS))]).then(() => {
          window.setTimeout(() => {
            if (alive) el.dataset.arrive = "in";
          }, Math.max(0, BEAT_MS - (performance.now() - t0)));
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    near.observe(el);
    seen.observe(el);
    return () => {
      alive = false;
      near.disconnect();
      seen.disconnect();
      delete el.dataset.arrive;
    };
  }, []);

  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
}
