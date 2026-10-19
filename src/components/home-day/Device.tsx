"use client";

import { useEffect, useRef } from "react";

/**
 * A real GROW screen recording inside the kit's iPhone frame (phone-frame-front-black: the screen is a
 * hole at x 77, y 79, 1206 × 2622 of 1360 × 2780, corner radius 166). Muted loop with its poster;
 * it plays only while on screen, and never under reduced motion.
 */
export function Device({ video, poster, alt, className = "" }: { video: string; poster: string; alt: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !still.matches) {
          if (v.preload !== "auto") v.preload = "auto";
          void v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={`gd-device ${className}`}>
      <video ref={ref} muted loop playsInline preload="none" poster={poster} width={720} height={1560} aria-label={alt}>
        <source src={video} type="video/mp4" />
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="gd-device-frame" src="/media/kit/phone-frame-front-black.webp" alt="" width={720} height={1472} loading="lazy" />
    </figure>
  );
}
