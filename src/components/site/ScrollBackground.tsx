"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type BandInfo = { top: number; color: string; from: string; fade: number };

type Rgb = [number, number, number];
const WHITE: Rgb = [255, 255, 255];
const INK: Rgb = [11, 31, 42];

const hex = (h: string): Rgb => {
  const s = h.replace("#", "");
  const f = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
  return [parseInt(f.slice(0, 2), 16), parseInt(f.slice(2, 4), 16), parseInt(f.slice(4, 6), 16)];
};
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const lum = (c: Rgb) => {
  const f = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
};
const contrast = (a: Rgb, b: Rgb) => {
  const la = lum(a);
  const lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/**
 * Keeps <html> and the header in step with the bands. Every band paints its own colour
 * (see .band in globals.css); this only (1) colours <html> with the band under the
 * viewport, so overscroll matches, and (2) stamps `data-band` (light/dark) on <html>
 * for the header — whichever of ink or white reads better on the colour under the
 * header right now, including inside a band's top cross-fade.
 */
export function ScrollBackground() {
  const { scrollY } = useScroll();
  const [bands, setBands] = useState<BandInfo[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const measure = () => {
      const list = Array.from(document.querySelectorAll<HTMLElement>("[data-band-color]")).map((el) => ({
        top: el.getBoundingClientRect().top + window.scrollY,
        color: el.dataset.bandColor!,
        from: el.dataset.bandFrom ?? el.dataset.bandColor!,
        fade: el.dataset.bandFrom ? parseFloat(getComputedStyle(el, "::before").height) || 0 : 0,
      }));
      list.sort((a, b) => a.top - b.top);
      setBands(list);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [pathname]);

  /** The painted colour at page y (a band, or a point inside its top cross-fade). */
  const colorAt = (y: number): Rgb => {
    let band = bands[0];
    for (const b of bands) if (y >= b.top) band = b;
    if (!band) return WHITE;
    const t = band.fade > 0 ? Math.min(1, Math.max(0, (y - band.top) / band.fade)) : 1;
    return mix(hex(band.from), hex(band.color), t);
  };

  const apply = (y: number) => {
    if (!bands.length) return;
    const vh = window.innerHeight;
    const root = document.documentElement;
    // <html>: the colour under the viewport's bottom edge, so rubber-band overscroll matches.
    const under = colorAt(y + vh).map(Math.round);
    root.style.backgroundColor = `rgb(${under[0]} ${under[1]} ${under[2]})`;
    // Header: pick the theme that reads better on the colour behind the header's midline.
    const headerH = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 52;
    const c = colorAt(y + headerH / 2);
    const theme = contrast(WHITE, mix(c, [0, 0, 0], 0.16)) >= contrast(INK, mix(c, WHITE, 0.55)) ? "dark" : "light";
    if (root.dataset.band !== theme) root.dataset.band = theme;
  };

  useMotionValueEvent(scrollY, "change", apply);
  useEffect(() => {
    apply(window.scrollY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bands]);

  useEffect(
    () => () => {
      document.documentElement.style.backgroundColor = "";
      delete document.documentElement.dataset.band;
    },
    [],
  );

  return null;
}
