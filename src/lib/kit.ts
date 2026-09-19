/**
 * Kit (formerly ConvertKit) signup.
 *
 * Mode "form" posts to Kit's public form endpoint — the same one Kit's official
 * embed uses. The form ID is public by design; no API key is involved and none
 * should ever be added to frontend code.
 */
import { copy } from "@/config/copy";
import { site } from "@/config/site";
import { UTM_KEYS, attributionUrl, getUtm } from "@/lib/attribution";

export type KitMode = "form" | "script" | "placeholder";
export type SubscribeResult = { ok: true } | { ok: false; message: string };

export function kitMode(): KitMode {
  const { mode, formId, embedUid, embedScriptSrc } = site.kit;
  if (mode === "script" && embedUid && embedScriptSrc) return "script";
  if (mode === "form" && formId) return "form";
  return "placeholder";
}

export function kitFormAction(): string | undefined {
  return site.kit.formId
    ? `https://app.kit.com/forms/${encodeURIComponent(site.kit.formId)}/subscriptions`
    : undefined;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isValidEmail = (email: string) => EMAIL_RE.test(email.trim());

export async function subscribe(email: string): Promise<SubscribeResult> {
  const mode = kitMode();

  if (mode === "placeholder") {
    if (process.env.NODE_ENV !== "production") {
      // DEVELOPMENT PLACEHOLDER — no Kit form configured in src/config/site.ts.
      console.info("[grow:kit] Placeholder signup (Kit not connected):", email);
      await new Promise((resolve) => setTimeout(resolve, 900));
      return { ok: true };
    }
    console.error("[grow:kit] Kit is not configured. Set site.kit.formId in src/config/site.ts.");
    return { ok: false, message: copy.form.notConnected };
  }

  const body = new FormData();
  body.append("email_address", email.trim());
  // Kit stores this as the subscriber's referrer and reads UTM parameters from it.
  body.append("referrer", attributionUrl());
  if (site.kit.sendUtmAsCustomFields) {
    const utm = getUtm();
    for (const key of UTM_KEYS) if (utm[key]) body.append(`fields[${key}]`, utm[key]!);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(kitFormAction()!, {
      method: "POST",
      body,
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as {
      status?: string;
      errors?: { messages?: string[] };
    } | null;
    if (res.ok && data?.status === "success") return { ok: true };

    const first = data?.errors?.messages?.[0] ?? "";
    console.warn("[grow:kit] Signup failed:", data ?? res.status);
    return { ok: false, message: /email/i.test(first) ? copy.form.invalid : copy.form.error };
  } catch (error) {
    console.warn("[grow:kit] Network error:", error);
    return { ok: false, message: copy.form.error };
  } finally {
    clearTimeout(timeout);
  }
}
