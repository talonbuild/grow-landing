"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";

import { GrowBrain } from "@/components/brain/GrowBrain";
import { GrowSignupForm } from "@/components/GrowSignupForm";
import {
  brainTestCopy as copy,
  CATEGORY_LABEL,
  GOAL_STEP,
  isCompleteAnswers,
  OUTCOME_STEP,
  PATTERN_MAX,
  PATTERN_MIN,
  PATTERN_STEP,
  PATTERNS,
  RECOVERY_STEP,
  scoreBrainTest,
  SECTOR_LABEL,
  SECTORS,
  STEP_COUNT,
  type BrainTestDraft,
  type BrainTestResult,
  type GoalId,
  type OutcomeId,
  type PatternId,
  type RecoveryId,
  type Sector,
  type SingleStep,
} from "@/content/brainTest";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "grow.brainTest.v1";

type Phase = "intro" | "steps" | "result";

const EMPTY: BrainTestDraft = { picks: [], goal: null, recovery: null, outcome: null };

/* ── sessionStorage (private mode may throw; the test works without memory) ── */

const listeners = new Set<() => void>();
function subscribeStored(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
function getStoredRaw(): string | null {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
const getServerRaw = () => null;

function parseStored(raw: string | null): BrainTestDraft | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { picks?: unknown; answers?: Record<string, unknown> };
    const picks = Array.isArray(parsed.picks) ? (parsed.picks.filter((p) => typeof p === "string") as PatternId[]) : [];
    const a = parsed.answers ?? {};
    const draft: BrainTestDraft = {
      picks,
      goal: typeof a.goal === "string" ? (a.goal as GoalId) : null,
      recovery: typeof a.recovery === "string" ? (a.recovery as RecoveryId) : null,
      outcome: typeof a.outcome === "string" ? (a.outcome as OutcomeId) : null,
    };
    return isCompleteAnswers(draft) ? draft : null;
  } catch {
    return null;
  }
}

function writeStored(draft: BrainTestDraft) {
  try {
    const { picks, goal, recovery, outcome } = draft;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ picks, answers: { goal, recovery, outcome } }));
  } catch {
    /* storage blocked: the result simply is not remembered */
  }
  listeners.forEach((cb) => cb());
}

function clearStored() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((cb) => cb());
}

/* ── The test ─────────────────────────────────────────────────────────────── */

export function BrainTest() {
  const reduced = useReducedMotion();
  // Returning visitor: the stored answers are read on the client (null on the server) and the
  // result is recomputed from them until the visitor starts or retakes the test.
  const storedRaw = useSyncExternalStore(subscribeStored, getStoredRaw, getServerRaw);
  const stored = useMemo(() => parseStored(storedRaw), [storedRaw]);
  const [phaseState, setPhase] = useState<Phase | null>(null);
  const [step, setStep] = useState(0);
  const [draftState, setDraft] = useState<BrainTestDraft>(EMPTY);
  const [hint, setHint] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const phase: Phase = phaseState ?? (stored ? "result" : "intro");
  const draft: BrainTestDraft = phaseState === null && stored ? stored : draftState;

  const result: BrainTestResult | null = useMemo(
    () => (phase === "result" && isCompleteAnswers(draft) ? scoreBrainTest(draft) : null),
    [phase, draft],
  );

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return draft.picks.length >= PATTERN_MIN && draft.picks.length <= PATTERN_MAX;
      case 1:
        return draft.goal !== null;
      case 2:
        return draft.recovery !== null;
      default:
        return draft.outcome !== null;
    }
  }, [step, draft]);

  // Every step (and the result) lands at the same place: its header just under the site header.
  // Headings take focus without scrolling; this owns the scroll, so it never alternates between
  // "hero visible" and "question pinned" from one step to the next. It runs when the new panel
  // mounts (after the old one has left), so the page height is final and nothing clamps it.
  const scrollToPanel = useCallback(() => {
    if (phaseState === null) return;
    const el = phase === "steps" ? headRef.current : rootRef.current;
    if (!el) return;
    const headerH = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 52;
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerH - 20);
    if (Math.abs(top - window.scrollY) < 8) return;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }, [phase, phaseState, reduced]);

  const start = useCallback(() => {
    setDraft(EMPTY);
    setStep(0);
    setHint(null);
    setPhase("steps");
    track("brain_test_started");
  }, []);

  const next = useCallback(() => {
    if (!stepValid) {
      setHint(step === 0 ? copy.pickAtLeastOne : copy.pickOneToContinue);
      return;
    }
    track("brain_test_step", { step: step + 1 });
    if (step < STEP_COUNT - 1) {
      setHint(null);
      setStep(step + 1);
      return;
    }
    if (isCompleteAnswers(draft)) {
      const r = scoreBrainTest(draft);
      writeStored(draft);
      track("brain_test_completed", { card: r.card.id, sector: r.dominant, size: r.actions.length });
      setPhase("result");
    }
  }, [step, stepValid, draft]);

  const clearHint = useCallback(() => setHint(null), []);

  const back = useCallback(() => {
    if (step > 0) {
      setHint(null);
      setStep(step - 1);
    }
  }, [step]);

  const retake = useCallback(() => {
    clearStored();
    setDraft(EMPTY);
    setStep(0);
    setHint(null);
    setPhase("steps");
    track("brain_test_started", { retake: true });
  }, []);

  const togglePick = useCallback((id: PatternId) => {
    setDraft((d) => {
      const has = d.picks.includes(id);
      if (has) return { ...d, picks: d.picks.filter((p) => p !== id) };
      if (d.picks.length >= PATTERN_MAX) return d;
      return { ...d, picks: [...d.picks, id] };
    });
    setHint(null);
  }, []);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (phase !== "steps") return;
    const target = e.target as HTMLElement;
    if (e.key === "Escape" && step > 0) {
      e.preventDefault();
      back();
      return;
    }
    if (e.key === "Enter" && !target.closest("button, a, input, textarea, select")) {
      e.preventDefault();
      next();
    }
  }

  const variants = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -16 } };
  const enterT = reduced ? { duration: 0.12 } : { duration: 0.24, ease: [0.2, 0.7, 0.2, 1] as const };
  const exitT = reduced ? { duration: 0.12 } : { duration: 0.18, ease: [0.4, 0, 1, 1] as const };

  const panelKey = phase === "steps" ? `step-${step}` : phase;

  return (
    <div ref={rootRef} className="bt" data-phase={phase} onKeyDown={onKeyDown}>
      {phase === "steps" && (
        <div className="bt-head" ref={headRef}>
          <p className="bt-step-label" aria-live="polite">
            {copy.stepLabel(step + 1, STEP_COUNT)}
          </p>
          <div className="bt-progress" role="progressbar" aria-valuemin={1} aria-valuemax={STEP_COUNT} aria-valuenow={step + 1} aria-label="Brain Test progress">
            <span className="bt-progress-fill" style={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={panelKey} className="bt-panel" initial={variants.initial} animate={{ ...variants.animate, transition: enterT }} exit={{ ...variants.exit, transition: exitT }}>
          <OnMount fn={scrollToPanel} />
          {phase === "intro" && <Intro onStart={start} />}
          {phase === "steps" && step === 0 && <PatternStep picks={draft.picks} onToggle={togglePick} />}
          {phase === "steps" && step === 1 && <SingleChoice step={GOAL_STEP} value={draft.goal} onPick={clearHint} onChange={(goal) => setDraft((d) => ({ ...d, goal }))} />}
          {phase === "steps" && step === 2 && <SingleChoice step={RECOVERY_STEP} value={draft.recovery} onPick={clearHint} onChange={(recovery) => setDraft((d) => ({ ...d, recovery }))} />}
          {phase === "steps" && step === 3 && <SingleChoice step={OUTCOME_STEP} value={draft.outcome} onPick={clearHint} onChange={(outcome) => setDraft((d) => ({ ...d, outcome }))} />}
          {phase === "result" && result && <Result result={result} onRetake={retake} takeFocus={phaseState !== null} />}
        </motion.div>
      </AnimatePresence>

      {phase === "steps" && (
        <div className="bt-foot">
          <p className="bt-foot-hint" role="status" aria-live="polite">
            {hint}
          </p>
          {step > 0 && (
            <button type="button" className="bt-back" onClick={back}>
              {copy.back}
            </button>
          )}
          <button type="button" className="btn-primary bt-continue" onClick={next} aria-disabled={!stepValid || undefined}>
            {step === STEP_COUNT - 1 ? copy.seeResult : copy.continue}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Runs `fn` when its panel mounts (each panel has its own key) ───────────── */

function OnMount({ fn }: { fn: () => void }) {
  useEffect(() => {
    fn();
    // Only on mount: the panel key changes with every step, so each step gets one call.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/* ── Intro ─────────────────────────────────────────────────────────────────── */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="bt-intro">
      <button type="button" className="btn-primary bt-start" onClick={onStart}>
        {copy.startCta}
      </button>
      <p className="bt-intro-meta">{copy.startMeta}</p>
    </div>
  );
}

/* ── A step heading that takes focus when it appears ───────────────────────── */

function StepHeading({ id, children, help }: { id: string; children: ReactNode; help: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);
  return (
    <>
      <h2 id={id} ref={ref} tabIndex={-1} className="bt-prompt">
        {children}
      </h2>
      <div className="bt-help-row">{help}</div>
    </>
  );
}

/* ── Step 1: patterns ──────────────────────────────────────────────────────── */

function PatternStep({ picks, onToggle }: { picks: PatternId[]; onToggle: (id: PatternId) => void }) {
  const full = picks.length >= PATTERN_MAX;
  const helpText = full ? copy.sixIsTheLimit : PATTERN_STEP.help;
  return (
    <div className="bt-step" data-step="patterns">
      <StepHeading
        id="bt-prompt-patterns"
        help={
          <>
            <p className="bt-help" role="status" aria-live="polite">
              {helpText}
            </p>
            <p className="bt-count" aria-hidden="true">
              {picks.length} / {PATTERN_MAX}
            </p>
          </>
        }
      >
        {PATTERN_STEP.prompt}
      </StepHeading>

      <div className="bt-groups">
        {SECTORS.map((sector) => (
          <div key={sector} className="bt-group" role="group" aria-labelledby={`bt-group-${sector}`}>
            <p id={`bt-group-${sector}`} className="band-eyebrow bt-group-title" data-sector={sector}>
              <span className="band-eyebrow-dot" aria-hidden="true" />
              {SECTOR_LABEL[sector]}
            </p>
            <div className="bt-chips">
              {PATTERNS.filter((p) => p.sector === sector).map((p) => {
                const on = picks.includes(p.id);
                const blocked = full && !on;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className="bt-chip"
                    data-sector={sector}
                    aria-pressed={on}
                    aria-disabled={blocked || undefined}
                    onClick={() => {
                      if (!blocked) onToggle(p.id);
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Steps 2–4: one answer ─────────────────────────────────────────────────── */

function SingleChoice<Id extends string>({
  step,
  value,
  onChange,
  onPick,
}: {
  step: SingleStep<Id>;
  value: Id | null;
  onChange: (id: Id) => void;
  onPick?: () => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusIndex = Math.max(
    0,
    step.options.findIndex((o) => o.id === value),
  );

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const i = refs.current.findIndex((el) => el === document.activeElement);
    if (i === -1) return;
    const n = step.options.length;
    let to: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") to = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") to = (i - 1 + n) % n;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = n - 1;
    if (to === null) return;
    e.preventDefault();
    refs.current[to]?.focus();
  }

  return (
    <div className="bt-step" data-step={step.id}>
      <StepHeading
        id={`bt-prompt-${step.id}`}
        help={
          <p className="bt-help">{step.help}</p>
        }
      >
        {step.prompt}
      </StepHeading>
      <div className="bt-radios" role="radiogroup" aria-labelledby={`bt-prompt-${step.id}`} onKeyDown={onKey}>
        {step.options.map((o, i) => {
          const checked = o.id === value;
          return (
            <button
              key={o.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={i === focusIndex ? 0 : -1}
              className="bt-radio"
              onClick={() => {
                onChange(o.id);
                onPick?.();
              }}
            >
              <span className="bt-ring" aria-hidden="true" />
              <span className="bt-radio-label">{o.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Result ────────────────────────────────────────────────────────────────── */

function Result({ result, onRetake, takeFocus }: { result: BrainTestResult; onRetake: () => void; takeFocus: boolean }) {
  const reduced = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);
  // Fills rise from 0 once the screen is on (instant under reduced motion).
  const [risen, setRisen] = useState(Boolean(reduced));
  useEffect(() => {
    // The title takes focus when the visitor has just finished the test, so a screen reader
    // announces the result. A returning visitor keeps the page as it was (no stray focus ring).
    if (takeFocus) titleRef.current?.focus({ preventScroll: true });
    const raf = requestAnimationFrame(() => setRisen(true));
    return () => cancelAnimationFrame(raf);
    // Mount only: takeFocus describes how this screen was reached.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fills = risen ? result.fills : { physical: 0, mental: 0, life: 0 };
  const r = copy.result;

  return (
    <section className="bt-result" aria-labelledby="bt-result-title">
      <p className="band-eyebrow bt-result-kicker" data-sector={result.lead}>
        <span className="band-eyebrow-dot" aria-hidden="true" />
        {r.kicker}
      </p>
      <h2 id="bt-result-title" ref={titleRef} tabIndex={-1} className="bt-result-title">
        <span className="sr-only">{r.kicker}: </span>
        {result.card.name}
      </h2>
      <p className="bt-result-line">{result.card.line}</p>

      <div className="bt-result-grid">
        <figure className="bt-brain">
          <div className="bt-brain-art">
            <div className="brain-halo" aria-hidden="true" />
            <GrowBrain id="bt-result" fills={fills} label={`Your starter Brainwave, weighted towards ${SECTOR_LABEL[result.lead]}`} />
          </div>
          <figcaption className="bt-brain-caption">{result.brainCaption}</figcaption>
        </figure>
        <div className="bt-result-text">
          <p className="bt-why">{result.why}</p>
          <p className="bt-brain-note">{r.brainNote}</p>
        </div>
      </div>

      <h3 className="bt-h3">{r.actionsTitle}</h3>
      <ol className="bt-actions">
        {result.actions.map((a, i) => (
          <li key={a.name} className="bt-action" style={{ "--i": i } as React.CSSProperties}>
            <span className="bt-action-n" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="bt-action-body">
              <span className="bt-action-name">{a.name}</span>
              <span className="bt-action-sub">{a.fromPattern ? `${a.fromPattern.label}. ${a.fromPattern.why}` : `${CATEGORY_LABEL[a.category]}. ${a.why}`}</span>
            </span>
            <SectorTag sector={a.sector} />
          </li>
        ))}
      </ol>

      <div className="bt-notes">
        <div className="bt-note">
          <h3 className="bt-h3">{r.firstTargetTitle}</h3>
          <p>{result.firstTarget}</p>
        </div>
        <div className="bt-note">
          <h3 className="bt-h3">{r.recoveryTitle}</h3>
          <p>{result.recovery}</p>
        </div>
        {result.busyDay && (
          <div className="bt-note">
            <h3 className="bt-h3">{r.busyDayTitle}</h3>
            <p>{result.busyDay}</p>
          </div>
        )}
      </div>

      <div className="bt-cta">
        <GrowSignupForm location="brain-test-result" buttonLabel={r.cta} note={r.ctaNote} />
      </div>

      <p className="bt-disclaimer">{r.disclaimer}</p>
      <button type="button" className="bt-retake" onClick={onRetake}>
        {copy.retake}
      </button>
    </section>
  );
}

function SectorTag({ sector }: { sector: Sector }) {
  return (
    <span className="bt-tag" data-sector={sector}>
      {SECTOR_LABEL[sector]}
    </span>
  );
}
