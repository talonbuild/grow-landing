"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { copy } from "@/config/copy";
import { site } from "@/config/site";
import { trackOnce, track } from "@/lib/analytics";
import { isValidEmail, kitFormAction, kitMode, subscribe } from "@/lib/kit";

type Status = "idle" | "submitting" | "success" | "error" | "guard";

/** Lets the page respond to a signup (the brain fills completely). */
function markJoined() {
  document.documentElement.setAttribute("data-grow-joined", "");
}

export interface GrowSignupFormProps {
  /** Reported with analytics events as `form_location`. */
  location: string;
  buttonLabel: string;
  note?: string;
  className?: string;
  /** "dark" inverts the shell for dark bands. */
  tone?: "light" | "dark";
}

/**
 * The Grow email signup. One component for every signup on the site.
 *
 * KIT INTEGRATION — configured in src/config/site.ts → `kit`:
 *  • mode "form"   → this UI posts to Kit's form endpoint (see lib/kit.ts).
 *  • mode "script" → Kit's official JS embed is injected below, inside the Grow shell.
 *  • nothing set   → development placeholder (simulated success in `next dev`).
 */
export function GrowSignupForm({ location, buttonLabel, note, className = "", tone = "light" }: GrowSignupFormProps) {
  const mode = kitMode();
  return (
    <div data-signup={location} data-tone={tone} className={`signup ${className}`}>
      {mode === "script" ? (
        <KitScriptEmbed location={location} />
      ) : (
        <NativeForm location={location} buttonLabel={buttonLabel} placeholder={mode === "placeholder"} />
      )}
      {note && <p className="signup-note">{note}</p>}
    </div>
  );
}

function NativeForm({
  location,
  buttonLabel,
  placeholder,
}: {
  location: GrowSignupFormProps["location"];
  buttonLabel: string;
  placeholder: boolean;
}) {
  const uid = useId();
  const inputId = `${uid}-email`;
  const errorId = `${uid}-error`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [guardUrl, setGuardUrl] = useState("");
  const successRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  // Back from Kit's security check: the form's redirect URL in Kit points at /?joined=1.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("joined") !== "1") return;
    track("email_signup_success", { form_location: location, via: "kit_guard" });
    markJoined();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reflecting a URL flag on mount
    setStatus("success");
  }, [location]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    if (!isValidEmail(email)) {
      setStatus("error");
      setError(copy.form.invalid);
      inputRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setError("");
    track("email_submit", { form_location: location });

    const result = await subscribe(email);
    if (result.ok === true) {
      track("email_signup_success", { form_location: location });
      markJoined();
      setStatus("success");
    } else if (result.ok === "guard") {
      setGuardUrl(result.url);
      setStatus("guard");
    } else {
      setStatus("error");
      setError(result.message);
    }
  }

  if (status === "success") {
    return (
      <div className="signup-shell signup-success" role="status">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-physical text-white">
          <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
            <path
              d="m5 10.5 3.2 3L15 6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p ref={successRef} tabIndex={-1} className="text-left text-[1rem] font-medium leading-snug text-ink outline-none">
          {copy.form.success}
        </p>
      </div>
    );
  }

  if (status === "guard") {
    return (
      <div className="signup-shell signup-guard" role="status">
        <p className="signup-guard-text">
          <strong>{copy.form.guardTitle}</strong> {copy.form.guardBody}
        </p>
        <a href={guardUrl} className="btn-primary signup-button signup-guard-cta">
          {copy.form.guardCta}
        </a>
      </div>
    );
  }

  const invalid = status === "error" && Boolean(error);

  return (
    <form
      // Without JavaScript the form still reaches Kit directly (Kit shows its own confirmation).
      action={kitFormAction()}
      method="post"
      noValidate
      onSubmit={onSubmit}
      aria-busy={status === "submitting"}
    >
      <div className="signup-shell" data-invalid={invalid || undefined}>
        <label htmlFor={inputId} className="sr-only">
          {copy.form.label}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          name="email_address"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="send"
          required
          placeholder={copy.form.placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          onFocus={() => trackOnce("signup_started", { trigger: "field_focus", form_location: location })}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          disabled={status === "submitting"}
          className="signup-input"
        />
        <button type="submit" className="btn-primary signup-button" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <span className="spinner" aria-hidden="true" />
              <span className="sr-only">{copy.form.submitting}</span>
            </>
          ) : (
            buttonLabel
          )}
        </button>
      </div>

      <p id={errorId} role="alert" className="signup-error">
        {invalid ? <span className="mt-3 block">{error}</span> : null}
      </p>

      {placeholder && process.env.NODE_ENV !== "production" && (
        <p className="mt-3 font-mono text-[13px] text-muted">
          Dev placeholder · Kit not connected · src/config/site.ts → kit
        </p>
      )}
    </form>
  );
}

/**
 * KIT OFFICIAL JAVASCRIPT EMBED (mode "script").
 * Kit's <script async data-uid src> renders its form where the script is placed —
 * here, inside the Grow container. Styling overrides live in globals.css (.kit-embed).
 */
function KitScriptEmbed({ location }: { location: GrowSignupFormProps["location"] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (!container.querySelector("script")) {
      const script = document.createElement("script");
      script.async = true;
      script.dataset.uid = site.kit.embedUid;
      script.src = site.kit.embedScriptSrc;
      container.appendChild(script);
    }

    const onFocus = (e: FocusEvent) => {
      if ((e.target as HTMLElement).matches?.('input[type="email"], input[name="email_address"]')) {
        trackOnce("signup_started", { trigger: "field_focus", form_location: location });
      }
    };
    const onSubmit = () => track("email_submit", { form_location: location });
    const observer = new MutationObserver(() => {
      if (container.querySelector(".formkit-alert-success:not(:empty)")) {
        track("email_signup_success", { form_location: location });
        markJoined();
        observer.disconnect();
      }
    });

    container.addEventListener("focusin", onFocus);
    container.addEventListener("submit", onSubmit, true);
    observer.observe(container, { childList: true, subtree: true, characterData: true });
    return () => {
      container.removeEventListener("focusin", onFocus);
      container.removeEventListener("submit", onSubmit, true);
      observer.disconnect();
    };
  }, [location]);

  return <div ref={ref} className="kit-embed" />;
}
