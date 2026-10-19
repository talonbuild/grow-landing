"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";

import { AppStoreButton } from "@/components/site/AppStoreButton";
import { Title } from "@/components/site/Title";
import {
  actionName,
  ADD_LINE,
  BEST_STEP,
  brainTestCopy as copy,
  CHECKINS,
  FOCUS_STEP,
  focusCta,
  isCompleteAnswers,
  LOBE_NAME,
  LOBES,
  nameIdeas,
  NOGGIN_LINE,
  orderLobes,
  PACE_STEP,
  starterPicks,
  SUGGESTIONS,
  type BestId,
  type BrainTestDraft,
  type Lobe,
  type Option,
  type PaceId,
  type Suggestion,
} from "@/content/brainTest";
import { track } from "@/lib/analytics";

type Phase = "intro" | "steps" | "result";

const EMPTY: BrainTestDraft = { focus: [], pace: null, best: null };
const keyOf = (s: Suggestion) => `${s.lobe}:${s.category}`;

/**
 * GROW 6.0's Day 1 on the web: three questions, Noggin answering each one, then the starter
 * Brainwave the app would seed from the answers, which the visitor can change. Nothing is stored.
 */
export function BrainTest() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<BrainTestDraft>(EMPTY);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [chosenName, setChosenName] = useState<string | null>(null);
  const [line, setLine] = useState<{ text: string; n: number }>({ text: NOGGIN_LINE.hello, n: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  const say = (text: string) => setLine((l) => ({ text, n: l.n + 1 }));

  const picks = useMemo(() => LOBES.flatMap((l) => SUGGESTIONS[l].filter((s) => picked.has(keyOf(s)))), [picked]);
  const ideas = useMemo(() => nameIdeas(picks), [picks]);
  const name = chosenName ?? ideas[0];

  // Each new question (and the result) brings the card's top under the site header and moves focus
  // to its heading, so keyboard and screen-reader users land on the new question.
  useEffect(() => {
    if (!moved.current) return;
    const root = rootRef.current;
    if (root) {
      const headerH = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 52;
      const top = root.getBoundingClientRect().top;
      if (top < headerH || top > window.innerHeight * 0.4) {
        window.scrollTo({ top: Math.max(0, top + window.scrollY - headerH - 12), behavior: reduced ? "auto" : "smooth" });
      }
    }
    headRef.current?.focus({ preventScroll: true });
  }, [phase, step, reduced]);

  const go = (nextPhase: Phase, nextStep = 0) => {
    moved.current = true;
    setPhase(nextPhase);
    setStep(nextStep);
  };

  const start = () => {
    track("brain_test_started");
    setDraft(EMPTY);
    say(NOGGIN_LINE.focus);
    go("steps", 0);
  };

  const toggleFocus = (id: Lobe) => {
    const on = !draft.focus.includes(id);
    const focus = orderLobes(on ? [...draft.focus, id] : draft.focus.filter((l) => l !== id));
    setDraft({ ...draft, focus });
    if (!on) say(NOGGIN_LINE.drain);
    else say(focus.length === 3 ? NOGGIN_LINE.allThree : FOCUS_STEP.options.find((o) => o.id === id)!.say);
  };

  const choosePace = (id: PaceId) => {
    setDraft({ ...draft, pace: id });
    say(PACE_STEP.options.find((o) => o.id === id)!.say);
  };

  const chooseBest = (id: BestId) => {
    setDraft({ ...draft, best: id });
    say(BEST_STEP.options.find((o) => o.id === id)!.say);
  };

  const stepValid = step === 0 ? draft.focus.length > 0 : step === 1 ? draft.pace !== null : draft.best !== null;

  const next = () => {
    if (!stepValid) return;
    track("brain_test_step", { step: step + 1 });
    if (step === 0) {
      say(NOGGIN_LINE.pace);
      go("steps", 1);
    } else if (step === 1) {
      say(NOGGIN_LINE.best);
      go("steps", 2);
    } else if (isCompleteAnswers(draft)) {
      setPicked(new Set(starterPicks(draft).map(keyOf)));
      setChosenName(null);
      say(draft.pace === "packed" ? NOGGIN_LINE.tiny : NOGGIN_LINE.build);
      track("brain_test_completed", { focus: draft.focus.join("+"), pace: draft.pace, best: draft.best });
      go("result");
    }
  };

  const back = () => {
    if (step === 0) {
      say(NOGGIN_LINE.hello);
      go("intro");
    } else go("steps", step - 1);
  };

  const togglePick = (s: Suggestion) => {
    const k = keyOf(s);
    const nextSet = new Set(picked);
    if (nextSet.has(k)) {
      nextSet.delete(k);
      say(NOGGIN_LINE.drain);
    } else {
      nextSet.add(k);
      say(ADD_LINE[s.category]);
    }
    setPicked(nextSet);
  };

  const retake = () => {
    setDraft(EMPTY);
    setPicked(new Set());
    setChosenName(null);
    say(NOGGIN_LINE.hello);
    go("intro");
  };

  const sky = phase === "intro" ? "dawn" : (draft.best ?? "dawn");
  const panelKey = phase === "steps" ? `steps-${step}` : phase;
  const motionProps = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.32, ease: [0.2, 0.7, 0.2, 1] as const },
      };

  return (
    <div ref={rootRef} className="bt" data-phase={phase}>
      <div className="bt-main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={panelKey} className="bt-panel" {...motionProps}>
            {phase === "intro" && (
              <div className="bt-intro">
                <p className="bt-eyebrow">{copy.eyebrow}</p>
                <Title lines={copy.headline} as="h1" id="test-title" />
                <p className="gd-sub">{copy.intro}</p>
                <div className="bt-start">
                  <button type="button" className="bt-btn" onClick={start}>
                    {copy.startCta}
                    <Chevron />
                  </button>
                  <p className="gd-note">{copy.startMeta}</p>
                </div>
              </div>
            )}

            {phase === "steps" && (
              <div className="bt-step">
                <h1 className="sr-only">{copy.eyebrow}</h1>
                <div className="bt-progress" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <i key={i} data-on={i <= step || undefined} />
                  ))}
                </div>
                <p className="bt-label">{copy.stepLabel(step + 1)}</p>
                {step === 0 && (
                  <Question prompt={FOCUS_STEP.prompt} help={FOCUS_STEP.help} headRef={headRef}>
                    {FOCUS_STEP.options.map((o) => (
                      <OptionButton key={o.id} option={o} kind="focus" on={draft.focus.includes(o.id)} onClick={() => toggleFocus(o.id)} art={<span className="bt-opt-lobe" data-lobe={o.id} />} />
                    ))}
                  </Question>
                )}
                {step === 1 && (
                  <Question prompt={PACE_STEP.prompt} help={PACE_STEP.help} headRef={headRef}>
                    {PACE_STEP.options.map((o) => (
                      <OptionButton key={o.id} option={o} kind="one" on={draft.pace === o.id} onClick={() => choosePace(o.id)} art={<span className="bt-opt-icon">{PACE_ICON[o.id]}</span>} />
                    ))}
                  </Question>
                )}
                {step === 2 && (
                  <Question prompt={BEST_STEP.prompt} help={BEST_STEP.help} headRef={headRef}>
                    {BEST_STEP.options.map((o) => (
                      <OptionButton key={o.id} option={o} kind="one" on={draft.best === o.id} onClick={() => chooseBest(o.id)} art={<span className="bt-opt-sky" data-sky={o.id}>{o.id === "evening" ? <Moon /> : <Sun />}</span>} />
                    ))}
                  </Question>
                )}
                <div className="bt-nav">
                  <button type="button" className="bt-btn bt-btn-soft bt-back" onClick={back}>
                    <ChevronLeft />
                    <span className="bt-back-text">{copy.back}</span>
                  </button>
                  <button type="button" className="bt-btn" onClick={next} disabled={!stepValid}>
                    {step === 0 ? focusCta(draft.focus) : step === 2 ? copy.seeResult : copy.continue}
                    <Chevron />
                  </button>
                </div>
              </div>
            )}

            {phase === "result" && draft.pace && draft.best && (
              <div className="bt-result">
                <h1 className="sr-only">{copy.eyebrow}</h1>
                <p className="bt-eyebrow">{copy.result.kicker}</p>
                <h2 ref={headRef} tabIndex={-1} className="gd-title bt-name">
                  <PlanName name={name} />
                </h2>
                <p className="bt-sub">{copy.result.sub(picks.length)}</p>

                <div className="bt-names" role="group" aria-label={copy.result.otherNames}>
                  <span className="bt-label">{copy.result.otherNames}</span>
                  {ideas
                    .filter((n) => n !== name)
                    .slice(0, 3)
                    .map((n) => (
                      <button key={n} type="button" className="bt-name-chip" onClick={() => setChosenName(n)}>
                        {n}
                      </button>
                    ))}
                </div>

                <div className="bt-lobes">
                  {LOBES.map((l) => {
                    const n = picks.filter((p) => p.lobe === l).length;
                    return (
                      <section key={l} className="bt-lobe" data-lobe={l} aria-label={LOBE_NAME[l]}>
                        <header>
                          <span className="bt-lobe-pill">{LOBE_NAME[l]}</span>
                          <span className="bt-lobe-n">{copy.result.picked(n)}</span>
                        </header>
                        <div className="bt-chips">
                          {SUGGESTIONS[l].map((s) => {
                            const on = picked.has(keyOf(s));
                            return (
                              <button key={s.category} type="button" className="bt-chip" aria-pressed={on} onClick={() => togglePick(s)}>
                                {on ? <Check /> : <Plus />}
                                {actionName(s, draft.pace!)}
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>

                <p className="bt-rules">{copy.result.rules}</p>

                <div className="bt-checkins">
                  <h3 className="bt-label">{copy.result.checkinsTitle}</h3>
                  <ul>
                    {CHECKINS[draft.best].map((c) => (
                      <li key={c.at}>
                        <span className="bt-checkin-at">{c.at}</span>
                        <span className="bt-checkin-line">{c.line}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="bt-checkins-sub">{copy.result.checkinsSub}</p>
                </div>

                <div className="bt-cta">
                  <p className="bt-cta-title">{copy.result.ctaTitle}</p>
                  <AppStoreButton location="brain_test" />
                  <p className="gd-note">{copy.result.ctaNote}</p>
                  <button type="button" className="bt-btn bt-btn-soft" onClick={retake}>
                    {copy.result.retake}
                  </button>
                </div>

                <p className="bt-fine">{copy.result.disclaimer}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bt-stage" data-sky={sky}>
        <i className="bt-sky" data-k="dawn" aria-hidden="true" />
        <i className="bt-sky" data-k="morning" aria-hidden="true" />
        <i className="bt-sky" data-k="midday" aria-hidden="true" />
        <i className="bt-sky" data-k="evening" aria-hidden="true" />
        <p key={line.n} className="bt-bubble" aria-live="polite">
          {line.text}
        </p>
        <div className="bt-noggin">
          <Image
            src={phase === "result" ? "/media/kit/noggin-3d-check.webp" : "/media/kit/noggin-3d-wave.webp"}
            alt={phase === "result" ? "Noggin holding a big green tick." : "Noggin, a little brain with green, blue and sky-blue lobes, waving."}
            width={1100}
            height={1100}
            priority
            sizes="(max-width: 48rem) 44vw, 380px"
            className="gd-float"
          />
        </div>
      </div>
    </div>
  );
}

/** The plan's name with its last word in the accent colour ("Steady Climb."). */
function PlanName({ name }: { name: string }) {
  const i = name.lastIndexOf(" ");
  if (i < 0) return <em>{name}.</em>;
  return (
    <>
      <span>{name.slice(0, i + 1)}</span>
      <em>{name.slice(i + 1)}.</em>
    </>
  );
}

function Question({ prompt, help, headRef, children }: { prompt: string; help: string; headRef: RefObject<HTMLHeadingElement | null>; children: ReactNode }) {
  return (
    <>
      <h2 ref={headRef} tabIndex={-1} className="bt-q">
        {prompt}
      </h2>
      <p className="bt-help">{help}</p>
      <div className="bt-opts" role="group" aria-label={prompt}>
        {children}
      </div>
    </>
  );
}

function OptionButton<Id extends string>({ option, kind, on, onClick, art }: { option: Option<Id>; kind: "focus" | "one"; on: boolean; onClick: () => void; art: ReactNode }) {
  return (
    <button type="button" className="bt-opt" data-kind={kind} data-id={option.id} aria-pressed={on} onClick={onClick}>
      {art}
      <span className="bt-opt-txt">
        <b>{option.name}</b>
        <span>{option.line}</span>
      </span>
      <span className="bt-opt-mark" aria-hidden="true">
        {on && <Check />}
      </span>
    </button>
  );
}

/* ── Small line icons ─────────────────────────────────────────────────────── */

const svg = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

function Check() {
  return (
    <svg {...svg} strokeWidth={2.8} className="bt-ico">
      <path d="m6 12.5 4 4 8-9" />
    </svg>
  );
}
function Plus() {
  return (
    <svg {...svg} strokeWidth={2.4} className="bt-ico">
      <path d="M12 6v12M6 12h12" />
    </svg>
  );
}
function Chevron() {
  return (
    <svg {...svg} strokeWidth={2.4} className="bt-ico">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg {...svg} strokeWidth={2.4} className="bt-ico">
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}
function Sun() {
  return (
    <svg {...svg} className="bt-ico">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  );
}
function Moon() {
  return (
    <svg {...svg} className="bt-ico">
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
    </svg>
  );
}

const PACE_ICON: Record<PaceId, ReactNode> = {
  packed: (
    <svg {...svg} className="bt-ico">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  steady: (
    <svg {...svg} className="bt-ico">
      <path d="M3 12c2.2-3.6 4.4-3.6 6.6 0s4.4 3.6 6.6 0 3.6-3.6 4.8-1.8" />
    </svg>
  ),
  wild: (
    <svg {...svg} className="bt-ico">
      <path d="M3 12h3.5l2.5-6 4 12 3-8 1.5 2H21" />
    </svg>
  ),
};
