"use client";

import { useEffect } from "react";

import { trackOnce } from "@/lib/analytics";
import { captureUtm } from "@/lib/attribution";

/** Captures UTMs and fires `landing_view`. Renders nothing. */
export function PageEffects() {
  useEffect(() => {
    captureUtm();
    trackOnce("landing_view", { referrer: document.referrer || undefined });
  }, []);

  return null;
}
