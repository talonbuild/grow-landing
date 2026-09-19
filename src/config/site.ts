/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  GROW — SITE CONFIGURATION
 *  The one file to edit for launch state, Kit, links and analytics.
 *  Copy lives in ./copy.ts. Replaceable images/video live in ./media.ts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type LaunchStatus = "prelaunch" | "live";

export const site = {
  name: "Grow",
  /** Legal entity shown in the footer and legal pages. */
  company: "Talon Build LLC",

  /**
   * Production origin used for canonical and Open Graph URLs (no trailing slash).
   * Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is final. Until then the
   * Vercel production URL is used, and localhost in development.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://grow.talonapp.co"),

  /* ── LAUNCH ─────────────────────────────────────────────────────────────── */
  launch: {
    /**
     * "prelaunch" → the email launch list is the primary action everywhere.
     * "live"      → "Download Grow" becomes the primary action (requires appStoreUrl).
     *               The email form stays on the page as the secondary action.
     */
    status: "prelaunch" as LaunchStatus,

    /** Paste the live App Store URL here, e.g. "https://apps.apple.com/app/grow/id0000000000". */
    appStoreUrl: "",

    /** While in "prelaunch", also show a secondary "Download Grow" button (only if appStoreUrl is set). */
    showAppStoreCtaDuringPrelaunch: false,

    /**
     * Optional App Store Connect campaign token ("pt" in Apple campaign links).
     * When set, App Store links carry ct=<utm_source>-<utm_campaign> so App Analytics
     * can attribute downloads to the same social campaign.
     */
    appStoreProviderToken: "",
  },

  /* ── KIT (email) ────────────────────────────────────────────────────────── */
  kit: {
    /**
     * How the signup form talks to Kit.
     *
     *  "form"   RECOMMENDED. Grow's own email field + button submit to Kit's public
     *           form endpoint (https://app.kit.com/forms/<formId>/subscriptions) — the
     *           same endpoint Kit's official embed posts to. Needs only `formId`.
     *           No API key, no backend. Full Grow styling, UTM attribution included.
     *
     *  "script" Kit's official JavaScript embed (<script async data-uid src>) rendered
     *           inside the Grow form container. Needs `embedUid` + `embedScriptSrc`.
     *           Kit renders its own markup; globals.css restyles it as closely as possible.
     *
     * Leave the fields for the chosen mode empty to use the development placeholder
     * (simulated success in `next dev`; an honest "not connected" error in production).
     */
    mode: "form" as "form" | "script",

    /**
     * Kit → Grow form → Publish → HTML. Copy the number from
     *   <form action="https://app.kit.com/forms/1234567/subscriptions" data-sv-form="1234567" …>
     */
    formId: process.env.NEXT_PUBLIC_KIT_FORM_ID || "",

    /**
     * Only for mode "script". Kit → Grow form → Publish → JavaScript:
     *   <script async data-uid="a1b2c3d4e5" src="https://grow.kit.com/a1b2c3d4e5/index.js"></script>
     */
    embedUid: "",
    embedScriptSrc: "",

    /**
     * Also send utm_source … utm_term as Kit custom fields (mode "form" only).
     * Create custom fields with exactly those keys in Kit first. The full landing URL
     * (with UTMs) is always sent as Kit's `referrer`, so this is optional.
     */
    sendUtmAsCustomFields: false,
  },

  /* ── LINKS ──────────────────────────────────────────────────────────────── */
  links: {
    /** PLACEHOLDER — e.g. "https://www.instagram.com/grow". Empty = hidden. */
    instagram: "",
    contactEmail: "support@talonapp.co",
  },

  /* ── ANALYTICS ──────────────────────────────────────────────────────────── */
  analytics: {
    /** GA4 measurement ID ("G-XXXXXXX"). When set, gtag.js loads after the page is interactive. */
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_ID || "",
    /** Logs every event to the browser console. */
    debug: process.env.NODE_ENV !== "production",
  },

  /* ── LEGAL ──────────────────────────────────────────────────────────────── */
  legal: {
    /** The legal text is published verbatim from the legal document (see src/content/legal.ts). */
    isDraft: false,
  },
} as const;

export const isLive = site.launch.status === "live" && Boolean(site.launch.appStoreUrl);
export const showAppStoreCta =
  Boolean(site.launch.appStoreUrl) && (isLive || site.launch.showAppStoreCtaDuringPrelaunch);
