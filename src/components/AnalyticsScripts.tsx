import Script from "next/script";

import { site } from "@/config/site";

/**
 * Loads third-party analytics only when configured. Nothing ships by default.
 * GA4: set NEXT_PUBLIC_GA4_ID (or site.analytics.ga4MeasurementId).
 * PostHog: add its snippet here; lib/analytics.ts picks up `window.posthog` automatically.
 */
export function AnalyticsScripts() {
  const id = site.analytics.ga4MeasurementId;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
