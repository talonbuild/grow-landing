/**
 * UTM attribution.
 *
 * - Reads utm_* from the landing URL. Never rewrites or strips the URL.
 * - Keeps them for the browser session, so attribution survives a visit to
 *   /privacy and back (which naturally drops the query string).
 * - A new visit with fresh UTMs replaces the stored set (last-touch per session).
 */

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type Utm = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "grow:utm";
let cached: Utm | null = null;

function readFromUrl(): Utm {
  const params = new URLSearchParams(window.location.search);
  const utm: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }
  return utm;
}

/** Call once on page load. Safe to call repeatedly. */
export function captureUtm(): Utm {
  if (typeof window === "undefined") return {};
  const fromUrl = readFromUrl();
  if (Object.keys(fromUrl).length > 0) {
    cached = fromUrl;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      /* storage blocked — the in-memory copy still works for this page */
    }
    return fromUrl;
  }
  return getUtm();
}

export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  if (cached) return cached;
  const fromUrl = readFromUrl();
  if (Object.keys(fromUrl).length > 0) return (cached = fromUrl);
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return (cached = JSON.parse(stored) as Utm);
  } catch {
    /* ignore */
  }
  return (cached = {});
}

/**
 * The landing URL to report as the signup referrer: the current URL with its
 * query intact, plus any session UTMs the current URL is missing.
 */
export function attributionUrl(): string {
  const url = new URL(window.location.href);
  url.hash = "";
  for (const [key, value] of Object.entries(getUtm())) {
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}
