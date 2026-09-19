"use client";

import type { ReactNode } from "react";

import { site } from "@/config/site";
import { getUtm } from "@/lib/attribution";
import { track } from "@/lib/analytics";

function appStoreHref(): string {
  const { appStoreUrl, appStoreProviderToken } = site.launch;
  if (!appStoreProviderToken || typeof window === "undefined") return appStoreUrl;
  try {
    const url = new URL(appStoreUrl);
    const utm = getUtm();
    const campaign = [utm.utm_source, utm.utm_campaign].filter(Boolean).join("-").slice(0, 40);
    url.searchParams.set("pt", appStoreProviderToken);
    if (campaign) url.searchParams.set("ct", campaign);
    return url.toString();
  } catch {
    return appStoreUrl;
  }
}

/**
 * "Download Grow". Renders nothing until site.launch.appStoreUrl is set.
 * If Apple's official badge is preferred, place the licensed badge artwork inside.
 */
export function AppStoreLink({
  children,
  className,
  location,
}: {
  children: ReactNode;
  className?: string;
  location: string;
}) {
  if (!site.launch.appStoreUrl) return null;
  return (
    <a
      href={site.launch.appStoreUrl}
      rel="noopener"
      className={className}
      onClick={(event) => {
        track("app_store_click", { cta_location: location });
        const href = appStoreHref();
        if (href !== site.launch.appStoreUrl) {
          event.preventDefault();
          window.location.assign(href);
        }
      }}
    >
      {children}
    </a>
  );
}
