/**
 * Provider-agnostic analytics.
 *
 * Components only ever call `track(event, props)`. Every event automatically
 * carries the current UTM values and page path.
 *
 * Built-in providers (no dependencies):
 *  - GA4       → used when `window.gtag` exists (loaded by <AnalyticsScripts/> when
 *                site.analytics.ga4MeasurementId is set).
 *  - PostHog   → used when `window.posthog` exists (add the PostHog snippet in layout).
 *  - Console   → when site.analytics.debug is true.
 *
 * Anything else: call `registerAnalyticsProvider((event, props) => …)` once on the client.
 */
import { site } from "@/config/site";
import { getUtm } from "@/lib/attribution";

export type GrowEvent =
  | "landing_view"
  | "signup_started"
  | "email_submit"
  | "email_signup_success"
  | "app_store_click"
  | "brain_test_started"
  | "brain_test_step"
  | "brain_test_completed";

export type EventProps = Record<string, string | number | boolean | undefined>;
export type AnalyticsProvider = (event: GrowEvent, props: EventProps) => void;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    posthog?: { capture: (event: string, props?: Record<string, unknown>) => void };
  }
}

const providers: AnalyticsProvider[] = [
  (event, props) => window.gtag?.("event", event, props),
  (event, props) => window.posthog?.capture(event, props),
  (event, props) => {
    if (site.analytics.debug) console.info(`[grow:analytics] ${event}`, props);
  },
];

export function registerAnalyticsProvider(provider: AnalyticsProvider) {
  providers.push(provider);
}

export function track(event: GrowEvent, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  const payload: EventProps = {
    ...getUtm(),
    page_path: window.location.pathname,
    launch_status: site.launch.status,
    ...props,
  };
  for (const provider of providers) {
    try {
      provider(event, payload);
    } catch {
      /* a broken provider must never break signup */
    }
  }
}

const fired = new Set<string>();

/** Fire an event at most once per page load (guards React Strict Mode double effects). */
export function trackOnce(event: GrowEvent, props: EventProps = {}) {
  if (fired.has(event)) return;
  fired.add(event);
  track(event, props);
}
