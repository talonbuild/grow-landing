/**
 * The Brain Test: GROW 6.0's Day 1 questions on the web, content and logic.
 *
 * Pure data and pure functions; no React here. Everything the visitor reads comes from the
 * GROW 6.0 file (~/Desktop/Noggin Current/GROW 6.0 — LATEST from Leo (2026-10-12).html, the
 * Day 1 flow and the Brainwave builder), because the kit has no onboarding screens:
 * - the three questions and their answers: FOCUS, PACE and BEST;
 * - Noggin's lines: L, each answer's `say`, and ADD_LINE in the builder;
 * - the starter plan: SUGG (three gentle starts per lobe), TINY (each one's two-minute
 *   version) and seedPicks();
 * - the plan's name ideas: NAME_POOL and nameIdeas(); his check-ins: KNOCKS.
 * Site rules: only true claims, Noggin is "he", and this is not a test of anyone's brain.
 */

import type { Headline } from "@/content/home";

export type Lobe = "physical" | "mental" | "life";
export const LOBES: readonly Lobe[] = ["physical", "mental", "life"];
export const LOBE_NAME: Record<Lobe, string> = { physical: "Physical", mental: "Mental", life: "Life" };

export type PaceId = "packed" | "steady" | "wild";
export type BestId = "morning" | "midday" | "evening";
export type Category = "cardio" | "hydration" | "mobility" | "focus" | "calm" | "reflection" | "space" | "relationships" | "money";

/* ── The three questions (verbatim from 6.0's Day 1) ───────────────────────── */

export interface Option<Id extends string> {
  id: Id;
  name: string;
  line: string;
  /** What Noggin says when you pick it. */
  say: string;
}

export const FOCUS_STEP = {
  prompt: "What do you want most?",
  help: "Pick one, two or all three.",
  options: [
    { id: "physical", name: "Physical", line: "Move, sleep, eat well", say: "Physical. Our legs just sat up." },
    { id: "mental", name: "Mental", line: "Focus, calm, learn", say: "Mental. My favourite lobe. Obviously." },
    { id: "life", name: "Life", line: "Home, money, routine", say: "Life. The stuff that makes the days work." },
  ] as readonly Option<Lobe>[],
} as const;

export const PACE_STEP = {
  prompt: "How do your days go?",
  help: "Honest answer. I’m your brain, I’ll know.",
  options: [
    { id: "packed", name: "Packed", line: "Back to back. Keep it quick.", say: "Then we go tiny and fast. Two minutes counts." },
    { id: "steady", name: "Steady", line: "Same rhythm most days.", say: "A rhythm. I can work with a rhythm." },
    { id: "wild", name: "All over the place", line: "Every day is different.", say: "Same. I’m mostly water. We’ll flow." },
  ] as readonly Option<PaceId>[],
} as const;

export const BEST_STEP = {
  prompt: "When are you at your best?",
  help: "I’ll knock when it suits you.",
  options: [
    { id: "morning", name: "Morning", line: "Up early, sharp by 9.", say: "A morning brain. I’ll be up before the coffee." },
    { id: "midday", name: "Midday", line: "I hit my stride after lunch.", say: "Midday. Peak brain hours. Noted." },
    { id: "evening", name: "Evening", line: "I come alive after 5.", say: "Evening. Night-owl lobes. Cozy." },
  ] as readonly Option<BestId>[],
} as const;

export const STEP_COUNT = 3;

/* ── Noggin's lines (verbatim from 6.0) ────────────────────────────────────── */

export const NOGGIN_LINE = {
  hello: "Hi. I’m your brain.",
  focus: "Tap a lobe.",
  allThree: "All three. Ambitious. I’m into it.",
  drain: "Okay. Draining that one.",
  pace: "Busy days count too. Tiny ones especially.",
  best: "Two knocks a day, max. I’m polite like that.",
  build: "Now the fun part. What do we do every day?",
  tiny: "Tiny isn’t easy mode. It’s the ignition.",
} as const;

/** What Noggin says when an action joins the plan. */
export const ADD_LINE: Record<Category, string> = {
  cardio: "Cardio. My legs are imaginary. My commitment is not.",
  hydration: "Water. My favourite ingredient. It’s me.",
  mobility: "Bendy brain, happy brain.",
  focus: "One thing, all the way. I can do one thing.",
  calm: "Lower the noise. Ahh. That’s the stuff.",
  reflection: "Writing it down. I’ll file it.",
  space: "Tidy room, tidy lobes.",
  relationships: "Your people. I’m blushing on their behalf.",
  money: "Money, counted. Very grown-up of us.",
};

/* ── The starter plan ──────────────────────────────────────────────────────── */

export interface Suggestion {
  lobe: Lobe;
  category: Category;
  name: string;
  /** The two-minute version, used when days are packed. */
  tiny: string;
}

/** Day 1's three gentle starts per lobe, in the app's order. */
export const SUGGESTIONS: Record<Lobe, readonly Suggestion[]> = {
  physical: [
    { lobe: "physical", category: "cardio", name: "Walk for 20 minutes", tiny: "Walk for 5 minutes" },
    { lobe: "physical", category: "hydration", name: "Drink 2L of water", tiny: "One glass of water" },
    { lobe: "physical", category: "mobility", name: "Stretch 10 minutes", tiny: "Stretch for 2 minutes" },
  ],
  mental: [
    { lobe: "mental", category: "focus", name: "Focus for 10 minutes", tiny: "10 minutes, one tab open" },
    { lobe: "mental", category: "calm", name: "Meditate 10 minutes", tiny: "Three slow breaths" },
    { lobe: "mental", category: "reflection", name: "Journal 3 sentences", tiny: "Write one line" },
  ],
  life: [
    { lobe: "life", category: "space", name: "Make your bed", tiny: "Clear one surface" },
    { lobe: "life", category: "relationships", name: "Text someone you love", tiny: "Send someone a heart" },
    { lobe: "life", category: "money", name: "Move $5 to savings", tiny: "Move $1 to savings" },
  ],
};

/** The name the visitor sees for a suggestion: the tiny version on packed days. */
export function actionName(s: Suggestion, pace: PaceId): string {
  return pace === "packed" ? s.tiny : s.name;
}

export interface BrainTestAnswers {
  /** The lobes picked in question 1, in the app's order (Physical, Mental, Life). */
  focus: readonly Lobe[];
  pace: PaceId;
  best: BestId;
}

/** Partial answers, as held while the test is in progress. */
export interface BrainTestDraft {
  focus: Lobe[];
  pace: PaceId | null;
  best: BestId | null;
}

export function isCompleteAnswers(d: BrainTestDraft): d is BrainTestDraft & BrainTestAnswers {
  return (
    d.focus.length > 0 &&
    d.focus.every((l) => LOBES.includes(l)) &&
    PACE_STEP.options.some((o) => o.id === d.pace) &&
    BEST_STEP.options.some((o) => o.id === d.best)
  );
}

/** Keeps the picked lobes unique and in the app's order. */
export function orderLobes(list: readonly Lobe[]): Lobe[] {
  return LOBES.filter((l) => list.includes(l));
}

/**
 * The app's seedPicks(): every lobe starts with one action; a lobe you want most starts with
 * two; a packed day keeps it to one tiny action per lobe.
 */
export function starterPicks(a: BrainTestAnswers): Suggestion[] {
  const focus = orderLobes(a.focus);
  return LOBES.flatMap((l) => {
    const n = a.pace === "packed" ? 1 : focus.includes(l) ? 2 : 1;
    return SUGGESTIONS[l].slice(0, n);
  });
}

export const NAME_POOL: Record<Lobe | "mixed", readonly string[]> = {
  physical: ["Strong Body", "Daily Motion", "Body First"],
  mental: ["Sharp Mind", "Clear Head", "Deep Focus"],
  life: ["Room to Live", "Good Company", "Life, Handled"],
  mixed: ["Steady Climb", "Full Brain", "Lock In", "Big Brain Energy"],
};

/**
 * The app's nameIdeas(): a plan spread over two or more lobes, none above 60%, gets the mixed
 * names; otherwise its main lobe's names come first. (The app's "Morning System" idea needs
 * the time-of-day step, which the web version skips.)
 */
export function nameIdeas(picks: readonly Suggestion[]): string[] {
  const counts: Record<Lobe, number> = { physical: 0, mental: 0, life: 0 };
  for (const p of picks) counts[p.lobe] += 1;
  const total = picks.length;
  const dom = LOBES.reduce((best, l) => (counts[l] > counts[best] ? l : best), LOBES[0]);
  const mixed = LOBES.filter((l) => counts[l] > 0).length >= 2 && counts[dom] < total * 0.6;
  const first = mixed || total === 0 ? NAME_POOL.mixed : NAME_POOL[dom];
  return [...new Set([...first, ...NAME_POOL.mixed])].slice(0, 4);
}

/** The Continue button on question 1, as in the app. */
export function focusCta(focus: readonly Lobe[]): string {
  const names = orderLobes(focus).map((l) => LOBE_NAME[l]);
  if (names.length === 0) return "Pick at least one";
  if (names.length === 3) return "Grow all three";
  return `Grow ${names.join(" and ")}`;
}

/** His two check-ins a day, at your best time. */
export const CHECKINS: Record<BestId, readonly { at: string; line: string }[]> = {
  morning: [
    { at: "7:00 am", line: "Morning. I’m mostly water and fully ready. What’s the plan?" },
    { at: "6:00 pm", line: "Today still counts. One glass of water. Two slow breaths. I’m not picky." },
  ],
  midday: [
    { at: "11:30 am", line: "Before lunch: one small thing, and today already counts." },
    { at: "6:00 pm", line: "Today still counts. One glass of water. Two slow breaths. I’m not picky." },
  ],
  evening: [
    { at: "5:30 pm", line: "Evening shift. One small thing and today counts. I’ll hold the door." },
    { at: "8:30 pm", line: "Last call before my nightcap. Tiny counts." },
  ],
};

/* ── Page copy ─────────────────────────────────────────────────────────────── */

export const brainTestCopy = {
  eyebrow: "Brain Test",
  headline: [[{ text: "Three questions." }], [{ text: "One " }, { text: "Brainwave.", accent: true }]] as Headline,
  intro:
    "The three questions GROW asks on Day 1. Answer them and see the Brainwave, your daily plan, that Noggin would start you on.",
  startCta: "Start",
  startMeta: "Three taps, under a minute.",
  stepLabel: (n: number) => `Question ${n} of ${STEP_COUNT}`,
  back: "Back",
  continue: "Continue",
  seeResult: "See my Brainwave",
  result: {
    kicker: "Your starter Brainwave",
    sub: (n: number) =>
      n === 0
        ? "Pick at least one action to start with."
        : `${n} small ${n === 1 ? "action" : "actions"} to start with. Tap any of them to change your plan.`,
    otherNames: "Other names",
    picked: (n: number) => (n === 0 ? "Resting today is fine" : `${n} picked`),
    rules: "Every action you do fills one of his lobes. Miss a day and he waits.",
    checkinsTitle: "His check-ins",
    checkinsSub: "At most two a day. Never after 9:30 pm, and quiet once you’re done.",
    ctaTitle: "Build it for real on Day 1.",
    ctaNote: "Free to download for iPhone and iPad",
    retake: "Start over",
    disclaimer:
      "This is a preview of GROW’s Day 1, not a test of your brain. GROW shows your consistency. It is not a medical or cognitive test.",
  },
} as const;
