"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

import { Device } from "@/components/home-day/Device";

type World = {
  lobe: string;
  name: string;
  world: string;
  line: string;
  video: string;
  poster: string;
  alt: string;
};

const PHONE = "(max-width: 47.99rem)";

/**
 * The three worlds. Desktop: all three side by side, still. Phone: one world at a time, moved only by
 * the arrows, the dots, the keyboard, or one swipe per world — nothing drifts or free-scrolls.
 */
export function WorldsCarousel({ items }: { items: readonly World[] }) {
  const [i, setI] = useState(0);
  const [phone, setPhone] = useState(false);
  const startX = useRef<number | null>(null);
  const n = items.length;

  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const on = () => setPhone(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const go = (k: number) => setI(((k % n) + n) % n);

  const onKey = (e: KeyboardEvent) => {
    if (!phone) return;
    if (e.key === "ArrowRight") go(i + 1);
    else if (e.key === "ArrowLeft") go(i - 1);
  };
  const onDown = (e: PointerEvent) => {
    startX.current = e.clientX;
  };
  const onUp = (e: PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
  };

  const current = items[i];

  return (
    <div className="wc" role="group" aria-roledescription="carousel" aria-label="The three worlds" onKeyDown={onKey}>
      <button type="button" className="wc-arrow wc-prev" aria-label={`Previous world: ${items[(i - 1 + n) % n].world}`} onClick={() => go(i - 1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.5 5.5 8 12l6.5 6.5" />
        </svg>
      </button>

      <div className="wc-viewport" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (startX.current = null)}>
        <ul className="wc-track" style={{ "--i": i } as CSSProperties}>
          {items.map((w, k) => (
            <li
              key={w.lobe}
              className="wc-slide"
              data-lobe={w.lobe}
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${n}: ${w.world}`}
              aria-hidden={phone && k !== i ? true : undefined}
            >
              <div className="wc-label">
                <span className="wc-lobe">{w.name}</span>
                <strong className="wc-world">{w.world}</strong>
                <span className="wc-line">{w.line}</span>
              </div>
              <Device video={w.video} poster={w.poster} alt={w.alt} />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className="wc-arrow wc-next" aria-label={`Next world: ${items[(i + 1) % n].world}`} onClick={() => go(i + 1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9.5 5.5 16 12l-6.5 6.5" />
        </svg>
      </button>

      <div className="wc-dots">
        {items.map((w, k) => (
          <button
            key={w.lobe}
            type="button"
            className="wc-dot"
            data-lobe={w.lobe}
            aria-label={`Show ${w.world}`}
            aria-current={k === i ? "true" : undefined}
            onClick={() => go(k)}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {phone ? `${current.name}: ${current.world}` : ""}
      </p>
    </div>
  );
}
