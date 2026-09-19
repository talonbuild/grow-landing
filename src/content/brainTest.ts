/**
 * The Brain Test — content and scoring.
 *
 * Pure data + a pure `scoreBrainTest(answers)`; no React here. The result is never stored,
 * only the answers (see BrainTest.tsx), and it is recomputed on load.
 *
 * Language rule: the 18 options are the app's "consistency patterns" — never symptoms,
 * conditions or disorders in user-facing copy. This is a consistency app, not medical advice.
 */

export type Sector = "physical" | "mental" | "life";
export const SECTORS: readonly Sector[] = ["physical", "mental", "life"];
export const SECTOR_LABEL: Record<Sector, string> = { physical: "Physical", mental: "Mental", life: "Life" };

export type Category =
  | "strength"
  | "cardio"
  | "hydration"
  | "nutrition"
  | "mobility"
  | "focus"
  | "calm"
  | "reflection"
  | "resilience"
  | "confidence"
  | "space"
  | "courage"
  | "responsibility"
  | "money"
  | "relationships";

/** Which sector an action belongs to, by its category (the app's own grouping). */
export const CATEGORY_SECTOR: Record<Category, Sector> = {
  strength: "physical",
  cardio: "physical",
  hydration: "physical",
  nutrition: "physical",
  mobility: "physical",
  focus: "mental",
  calm: "mental",
  reflection: "mental",
  resilience: "mental",
  confidence: "mental",
  space: "life",
  courage: "life",
  responsibility: "life",
  money: "life",
  relationships: "life",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  strength: "Strength",
  cardio: "Cardio",
  hydration: "Hydration",
  nutrition: "Nutrition",
  mobility: "Mobility",
  focus: "Focus",
  calm: "Calm",
  reflection: "Reflection",
  resilience: "Resilience",
  confidence: "Confidence",
  space: "Space",
  courage: "Courage",
  responsibility: "Responsibility",
  money: "Money",
  relationships: "Relationships",
};

/* ── Page copy ─────────────────────────────────────────────────────────────── */

export const brainTestCopy = {
  eyebrow: "Brain Test",
  headline: "Where does your consistency live?",
  intro: "Tell us what has been showing up. In under a minute you get a starter Brainwave: the card, the actions, and where to begin.",
  startCta: "Start the test",
  startMeta: "Four steps. Under a minute. Nothing is stored beyond this visit.",
  retake: "Retake the test",
  back: "Back",
  continue: "Continue",
  seeResult: "See my result",
  stepLabel: (n: number, of: number) => `Step ${n} of ${of}`,
  pickAtLeastOne: "Pick at least one to continue.",
  pickOneToContinue: "Choose one to continue.",
  sixIsTheLimit: "Six is the limit. Swap one out to change it.",
  result: {
    kicker: "Your starter Brainwave",
    actionsTitle: "Your actions",
    firstTargetTitle: "First target",
    recoveryTitle: "When you miss a day",
    busyDayTitle: "On a busy day",
    brainNote:
      "The three fills show where your starter plan puts its weight, not where you are today. A sector with no action stays a faint line until you add one at your first checkpoint.",
    cta: "Join the waitlist",
    ctaNote: "Your plan lives in the app at launch. The waitlist is how you get there.",
    disclaimer:
      "These are consistency patterns you reported, not a diagnosis. GROW is a consistency app, not medical or psychological advice.",
  },
} as const;

/* ── Step 1: the app's 18 consistency patterns ─────────────────────────────── */

export type PatternId =
  | "low-energy"
  | "sleep"
  | "movement"
  | "sluggishness"
  | "restlessness"
  | "self-care"
  | "overthinking"
  | "distractions"
  | "momentum"
  | "poor-focus"
  | "self-doubt"
  | "overwhelm"
  | "procrastination"
  | "routine"
  | "unfinished"
  | "feeling-stuck"
  | "restart"
  | "lack-of-direction";

export interface Pattern {
  id: PatternId;
  label: string;
  sector: Sector;
  /** Primary category first; the pair is what the card matching looks at. */
  categories: readonly [Category, ...Category[]];
  /** The one app action this pattern maps to. */
  action: string;
  why: string;
}

export const PATTERNS: readonly Pattern[] = [
  { id: "low-energy", label: "Low energy", sector: "physical", categories: ["cardio", "hydration"], action: "Walk 30 minutes", why: "The lowest-cost way to raise energy is to move. Cardio: build your capacity." },
  { id: "sleep", label: "Poor sleep", sector: "physical", categories: ["mobility", "calm"], action: "Hip openers before bed", why: "An evening action that ends the day on purpose instead of by accident." },
  { id: "movement", label: "Inactivity", sector: "physical", categories: ["strength", "cardio"], action: "3 sets of squats", why: "No equipment, no travel, done in four minutes. Nowhere to hide." },
  { id: "sluggishness", label: "Sluggishness", sector: "physical", categories: ["hydration", "nutrition"], action: "Glass of water on waking", why: "First thing, zero friction. The day starts moving before you decide anything." },
  { id: "restlessness", label: "Restlessness", sector: "physical", categories: ["mobility", "cardio"], action: "Stretch 10 minutes", why: "Gives restless energy somewhere to go, ten minutes at a time." },
  { id: "self-care", label: "Neglected self-care", sector: "physical", categories: ["nutrition", "mobility"], action: "Cook one real meal", why: "The most concrete daily act of looking after yourself." },
  { id: "overthinking", label: "Overthinking", sector: "mental", categories: ["reflection", "calm"], action: "Journal 10 minutes", why: "Gets the loop out of your head and onto a page where it stops." },
  { id: "distractions", label: "Distractibility", sector: "mental", categories: ["focus"], action: "Phone in another room", why: "Removes the biggest distraction physically, not by willpower." },
  { id: "momentum", label: "Low motivation", sector: "mental", categories: ["focus", "resilience"], action: "One task to done", why: "Motivation follows a finished thing. Make one finish the daily target." },
  { id: "poor-focus", label: "Poor focus", sector: "mental", categories: ["focus", "calm"], action: "25 minutes deep work", why: "Focus is trained in blocks. One block a day is the whole ask." },
  { id: "self-doubt", label: "Self-doubt", sector: "mental", categories: ["confidence", "reflection"], action: "Speak up once today", why: "Do the thing that scares you a little, once, daily. That is confidence." },
  { id: "overwhelm", label: "Overwhelm", sector: "mental", categories: ["calm", "space"], action: "5 slow breaths at noon", why: "A midday reset small enough to keep on the worst day." },
  { id: "procrastination", label: "Procrastination", sector: "life", categories: ["courage", "responsibility"], action: "Start before ready", why: "Ready never arrives on its own. Courage: ask, try, begin." },
  { id: "routine", label: "Disorganization", sector: "life", categories: ["space", "responsibility"], action: "Make bed", why: "Your room is your mind. The first order of the day, in two minutes." },
  { id: "unfinished", label: "Unfinished tasks", sector: "life", categories: ["responsibility", "money"], action: "Answer the pending email", why: "Handle it before it handles you. One open loop closed every day." },
  { id: "feeling-stuck", label: "Feeling stuck", sector: "life", categories: ["courage", "relationships"], action: "Say yes to the invite", why: "Stuck usually means the same room, same day. The invite changes the room." },
  { id: "restart", label: "Constant restarts", sector: "life", categories: ["space", "resilience"], action: "10-minute evening reset", why: "Tomorrow starts where today ended, not from zero." },
  { id: "lack-of-direction", label: "Lack of direction", sector: "life", categories: ["courage", "reflection"], action: "Ask one question", why: "Direction starts with a question you have not asked yet." },
];

export const PATTERN_BY_ID: Record<PatternId, Pattern> = Object.fromEntries(PATTERNS.map((p) => [p.id, p])) as Record<PatternId, Pattern>;

export const PATTERN_MIN = 1;
export const PATTERN_MAX = 6;

/* ── Steps 2–4: the three verbatim app questions ───────────────────────────── */

export type GoalId = "lose-momentum" | "keep-planning" | "too-much" | "until-busy" | "ready-for-more";
export type RecoveryId = "next-day" | "becomes-a-few" | "rethink" | "fresh-start";
export type OutcomeId = "follow-through" | "healthier" | "calmer" | "visible-progress" | "proud-routine";

export interface SingleOption<Id extends string> {
  id: Id;
  label: string;
  /** Plain-language note on what this answer changes in the result. */
  effect: string;
}

export interface SingleStep<Id extends string> {
  id: "goal" | "recovery" | "outcome";
  prompt: string;
  help: string;
  options: readonly SingleOption<Id>[];
}

export const PATTERN_STEP = {
  id: "patterns",
  prompt: "What's been showing up lately?",
  help: "Pick one to six. The ones that keep showing up.",
} as const;

export const GOAL_STEP: SingleStep<GoalId> = {
  id: "goal",
  prompt: "When you start a new goal, what usually happens?",
  help: "Your answer sets how many actions your starter plan holds.",
  options: [
    { id: "lose-momentum", label: "I start strong, then lose momentum", effect: "Plan size 4. Enough to feel, small enough to keep past week two." },
    { id: "keep-planning", label: "I keep planning instead of starting", effect: "Plan size 3. The smallest plan, so starting is the only decision left." },
    { id: "too-much", label: "I take on too much at once", effect: "Plan size 3. Three actions, on purpose." },
    { id: "until-busy", label: "I stay consistent until life gets busy", effect: "Plan size 5. The result reminds you that on a busy day one action still counts." },
    { id: "ready-for-more", label: "I'm consistent, but ready for more", effect: "Plan size 6. The largest starter plan." },
  ],
};

export const RECOVERY_STEP: SingleStep<RecoveryId> = {
  id: "recovery",
  prompt: "When you miss a day, what happens next?",
  help: "So your plan knows what to say the day after a miss.",
  options: [
    { id: "next-day", label: "I get back to it the next day", effect: "Recovery line confirms you already do what the app asks after a miss." },
    { id: "becomes-a-few", label: "One missed day often becomes a few", effect: "Recovery line stresses the one-day window and that one action, any action, brings the streak back." },
    { id: "rethink", label: "I rethink the whole plan", effect: "Recovery line says the plan waits for the next checkpoint; a missed day only needs one action." },
    { id: "fresh-start", label: "I wait for a fresh start", effect: "Recovery line makes 7:00 a.m. tomorrow the fresh start and one action the price of keeping the streak." },
  ],
};

export const OUTCOME_STEP: SingleStep<OutcomeId> = {
  id: "outcome",
  prompt: "What would feel like a win in 30 days?",
  help: "When it is close, this decides where your plan starts.",
  options: [
    { id: "follow-through", label: "Follow through more often", effect: "Sector tie goes to Life. Card tie order: CLEAN SLATE, BETTER BANK, 5AM, SHARP MIND, STRONG BODY." },
    { id: "healthier", label: "Feel healthier and more energized", effect: "Sector tie goes to Physical. Card tie order: STRONG BODY, 5AM, SHARP MIND, CLEAN SLATE, BETTER BANK." },
    { id: "calmer", label: "Have a calmer, clearer mind", effect: "Sector tie goes to Mental. Card tie order: SHARP MIND, CLEAN SLATE, 5AM, STRONG BODY, BETTER BANK." },
    { id: "visible-progress", label: "Make visible progress on one goal", effect: "Sector tie goes to Life. Card tie order: BETTER BANK, SHARP MIND, STRONG BODY, CLEAN SLATE, 5AM." },
    { id: "proud-routine", label: "Feel proud of a routine I kept", effect: "Sector tie goes to Life. Card tie order: 5AM, CLEAN SLATE, STRONG BODY, SHARP MIND, BETTER BANK." },
  ],
};

export const STEP_COUNT = 4;

/* ── Scoring tables ────────────────────────────────────────────────────────── */

export const PLAN_SIZE: Record<GoalId, number> = {
  "lose-momentum": 4,
  "keep-planning": 3,
  "too-much": 3,
  "until-busy": 5,
  "ready-for-more": 6,
};

export const OUTCOME_SECTOR: Record<OutcomeId, Sector> = {
  "follow-through": "life",
  healthier: "physical",
  calmer: "mental",
  "visible-progress": "life",
  "proud-routine": "life",
};

export type AppCardId = "strong-body" | "sharp-mind" | "better-bank" | "5am" | "clean-slate";
export type ComposedCardId = "first-move" | "clear-signal" | "loose-ends";
export type CardId = AppCardId | ComposedCardId;

export const OUTCOME_CARD_ORDER: Record<OutcomeId, readonly AppCardId[]> = {
  "follow-through": ["clean-slate", "better-bank", "5am", "sharp-mind", "strong-body"],
  healthier: ["strong-body", "5am", "sharp-mind", "clean-slate", "better-bank"],
  calmer: ["sharp-mind", "clean-slate", "5am", "strong-body", "better-bank"],
  "visible-progress": ["better-bank", "sharp-mind", "strong-body", "clean-slate", "5am"],
  "proud-routine": ["5am", "clean-slate", "strong-body", "sharp-mind", "better-bank"],
};

export const RECOVERY_LINE: Record<RecoveryId, string> = {
  "next-day": "You already do what GROW asks. Miss a day and your streak goes dormant, not dead. Do one action the next day and it carries on.",
  "becomes-a-few": "GROW gives you one day of grace. Miss a day, then do one action the next day. Not the whole plan. One action brings the streak back.",
  rethink: "Do not rethink it. A missed day only pauses the streak; one action the next day brings it back. Change the plan at your next checkpoint, not on a bad day.",
  "fresh-start": "The fresh start is tomorrow at 7:00 a.m. Miss a day, do one action the next day, and the streak carries on.",
};

export const BUSY_DAY_LINE = "On a busy day, one action still counts. Complete any one action in your Brainwave and that is a day you showed up.";

export interface CardAction {
  sector: Sector;
  category: Category;
  name: string;
  /** One line on why this action is in the plan, shown when no pick put it there. */
  why: string;
}

export interface Card {
  id: CardId;
  name: string;
  line: string;
  /** True for the app's own curated cards; false for the composed fallbacks. */
  fromApp: boolean;
  /** Curated cards match on these categories. Composed cards have none. */
  matches: readonly Category[];
  /** The sector a composed card stands in for. */
  sector?: Sector;
  actions: readonly CardAction[];
}

export const CARDS: readonly Card[] = [
  {
    id: "strong-body",
    name: "STRONG BODY",
    line: "A physical base you can build anything on.",
    fromApp: true,
    matches: ["strength", "cardio", "hydration", "nutrition", "resilience"],
    actions: [
      { sector: "physical", category: "strength", name: "Lift weights", why: "Strength compounds. One session at a time." },
      { sector: "physical", category: "cardio", name: "Walk 30 minutes", why: "The lowest-cost way to raise energy is to move." },
      { sector: "physical", category: "hydration", name: "Drink 2L of water", why: "Two litres a day. The simplest number in the plan." },
      { sector: "physical", category: "nutrition", name: "Hit protein target", why: "One number to hit. The rest of the plate follows." },
      { sector: "mental", category: "resilience", name: "Cold shower", why: "Sixty seconds of discomfort, chosen. Resilience in practice." },
    ],
  },
  {
    id: "sharp-mind",
    name: "SHARP MIND",
    line: "Attention is the skill under every skill.",
    fromApp: true,
    matches: ["focus", "calm", "reflection", "cardio"],
    actions: [
      { sector: "mental", category: "focus", name: "25 minutes deep work", why: "One block of real attention. No tabs, no phone." },
      { sector: "mental", category: "calm", name: "Meditate 10 minutes", why: "Ten minutes of sitting still. Calm is trained, not found." },
      { sector: "mental", category: "reflection", name: "Journal 10 minutes", why: "Gets the loop out of your head and onto a page." },
      { sector: "physical", category: "cardio", name: "Walk 20 minutes", why: "Twenty minutes outside clears more than it costs." },
    ],
  },
  {
    id: "better-bank",
    name: "BETTER BANK",
    line: "Small money moves, made daily.",
    fromApp: true,
    matches: ["money", "responsibility"],
    actions: [
      { sector: "life", category: "money", name: "Log every expense", why: "Write down every spend. Seeing it is the first move." },
      { sector: "life", category: "money", name: "No impulse buys today", why: "One day without the unplanned purchase. Then another." },
      { sector: "life", category: "responsibility", name: "Handle one pending task", why: "One open loop, closed. Handle it before it handles you." },
    ],
  },
  {
    id: "5am",
    name: "5AM",
    line: "Win the morning before the world wakes.",
    fromApp: true,
    matches: ["hydration", "mobility", "focus", "space"],
    actions: [
      { sector: "physical", category: "hydration", name: "Glass of water on waking", why: "First thing, zero friction. The day starts moving." },
      { sector: "physical", category: "mobility", name: "Stretch 10 minutes", why: "Ten minutes for the body you sit in all day." },
      { sector: "mental", category: "focus", name: "One task before 7am", why: "Finish one thing before the world starts asking." },
      { sector: "life", category: "space", name: "Make bed", why: "Your room is your mind. Two minutes, first thing." },
    ],
  },
  {
    id: "clean-slate",
    name: "CLEAN SLATE",
    line: "Reset your space, reset your head.",
    fromApp: true,
    matches: ["space", "responsibility", "reflection"],
    actions: [
      { sector: "life", category: "space", name: "Make bed", why: "Your room is your mind. Two minutes, first thing." },
      { sector: "life", category: "space", name: "10-minute evening reset", why: "Tomorrow starts where today ended, not from zero." },
      { sector: "life", category: "responsibility", name: "Answer the pending email", why: "One open loop closed every day." },
      { sector: "mental", category: "reflection", name: "Write 3 lines tonight", why: "Three lines: what happened, what you noticed, what is next." },
    ],
  },
  {
    id: "first-move",
    name: "FIRST MOVE",
    line: "Get moving. Energy follows.",
    fromApp: false,
    matches: [],
    sector: "physical",
    actions: [
      { sector: "physical", category: "cardio", name: "Walk 30 minutes", why: "The lowest-cost way to raise energy is to move." },
      { sector: "physical", category: "hydration", name: "Glass of water on waking", why: "First thing, zero friction. The day starts moving." },
      { sector: "physical", category: "mobility", name: "Stretch 10 minutes", why: "Ten minutes for the body you sit in all day." },
      { sector: "physical", category: "strength", name: "3 sets of squats", why: "No equipment, no travel, done in four minutes." },
      { sector: "mental", category: "focus", name: "One task to done", why: "Motivation follows a finished thing. Make one finish the target." },
      { sector: "life", category: "space", name: "Make bed", why: "Your room is your mind. Two minutes, first thing." },
    ],
  },
  {
    id: "clear-signal",
    name: "CLEAR SIGNAL",
    line: "Less noise. One thing at a time.",
    fromApp: false,
    matches: [],
    sector: "mental",
    actions: [
      { sector: "mental", category: "focus", name: "One task to done", why: "Motivation follows a finished thing. Make one finish the target." },
      { sector: "mental", category: "calm", name: "5 slow breaths at noon", why: "A midday reset small enough to keep on the worst day." },
      { sector: "mental", category: "reflection", name: "Write 3 lines tonight", why: "Three lines: what happened, what you noticed, what is next." },
      { sector: "mental", category: "focus", name: "Phone in another room", why: "Removes the biggest distraction physically, not by willpower." },
      { sector: "physical", category: "cardio", name: "Walk 20 minutes", why: "Twenty minutes outside clears more than it costs." },
      { sector: "life", category: "space", name: "Clear the desk", why: "A clear surface is a clear start." },
    ],
  },
  {
    id: "loose-ends",
    name: "LOOSE ENDS",
    line: "Finish one thing. Then the next.",
    fromApp: false,
    matches: [],
    sector: "life",
    actions: [
      { sector: "life", category: "responsibility", name: "Answer the pending email", why: "One open loop closed every day." },
      { sector: "life", category: "space", name: "Make bed", why: "Your room is your mind. Two minutes, first thing." },
      { sector: "life", category: "courage", name: "Start before ready", why: "Ready never arrives on its own. Begin." },
      { sector: "life", category: "relationships", name: "Text someone you love", why: "One message. Relationships are kept in small moves." },
      { sector: "mental", category: "reflection", name: "Write 3 lines tonight", why: "Three lines: what happened, what you noticed, what is next." },
      { sector: "physical", category: "hydration", name: "Glass of water on waking", why: "First thing, zero friction. The day starts moving." },
    ],
  },
];

export const CARD_BY_ID: Record<CardId, Card> = Object.fromEntries(CARDS.map((c) => [c.id, c])) as Record<CardId, Card>;

const COMPOSED_FOR_SECTOR: Record<Sector, ComposedCardId> = { physical: "first-move", mental: "clear-signal", life: "loose-ends" };

/** The per-sector cap in the app. Never reachable here (max plan is 6) but enforced anyway. */
export const SECTOR_CAP = 10;

/* ── Answers ───────────────────────────────────────────────────────────────── */

export interface BrainTestAnswers {
  /** Pattern ids in tap order. */
  picks: readonly PatternId[];
  goal: GoalId;
  recovery: RecoveryId;
  outcome: OutcomeId;
}

/** Partial answers, as held while the test is in progress. */
export interface BrainTestDraft {
  picks: PatternId[];
  goal: GoalId | null;
  recovery: RecoveryId | null;
  outcome: OutcomeId | null;
}

export function isCompleteAnswers(draft: BrainTestDraft): draft is BrainTestDraft & BrainTestAnswers {
  return (
    draft.picks.length >= PATTERN_MIN &&
    draft.picks.length <= PATTERN_MAX &&
    draft.picks.every((id) => id in PATTERN_BY_ID) &&
    draft.goal !== null &&
    draft.goal in PLAN_SIZE &&
    draft.recovery !== null &&
    draft.recovery in RECOVERY_LINE &&
    draft.outcome !== null &&
    draft.outcome in OUTCOME_SECTOR
  );
}

/* ── Result ────────────────────────────────────────────────────────────────── */

export interface PlanAction extends CardAction {
  /** The pattern this action answers, when it came from one of the picks. */
  fromPattern?: Pattern;
}

export interface BrainTestResult {
  card: Card;
  actions: PlanAction[];
  planSize: number;
  /** The sector with the most picks (after tie-breaks). Drives the card fallback and ordering. */
  dominant: Sector;
  /** Where the finished plan puts its weight: the sector with the most actions (ties go to `dominant`). Drives the fills, caption and first target. */
  lead: Sector;
  sectorCounts: Record<Sector, number>;
  /** How many picks the curated card covers; null for a composed card. */
  coverage: number | null;
  /** 0–1 per sector: where the plan puts its weight. */
  fills: Record<Sector, number>;
  headline: string;
  why: string;
  brainCaption: string;
  firstTarget: string;
  recovery: string;
  /** Present only when the goal answer asks for it (life gets busy). */
  busyDay: string | null;
  /** True when every pick lives in one sector. */
  singleSector: boolean;
  /** True when all three sectors held the same number of picks. */
  evenSpread: boolean;
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function dedupeByName<T extends { name: string }>(list: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of list) {
    if (seen.has(item.name)) continue;
    seen.add(item.name);
    out.push(item);
  }
  return out;
}

/** Pure. Same answers → same result. */
export function scoreBrainTest(answers: BrainTestAnswers): BrainTestResult {
  const picks = dedupeByName(
    answers.picks.filter((id) => id in PATTERN_BY_ID).map((id) => ({ name: id, pattern: PATTERN_BY_ID[id] })),
  )
    .map((x) => x.pattern)
    .slice(0, PATTERN_MAX);
  if (picks.length === 0) throw new Error("scoreBrainTest needs at least one pattern pick");

  const outcomeSector = OUTCOME_SECTOR[answers.outcome];

  // 1. Sector signal.
  const sectorCounts: Record<Sector, number> = { physical: 0, mental: 0, life: 0 };
  for (const p of picks) sectorCounts[p.sector] += 1;
  const top = Math.max(...SECTORS.map((s) => sectorCounts[s]));
  const tied = SECTORS.filter((s) => sectorCounts[s] === top);
  let dominant: Sector;
  if (tied.length === 1) dominant = tied[0];
  else if (tied.includes(outcomeSector)) dominant = outcomeSector;
  else dominant = picks.find((p) => tied.includes(p.sector))?.sector ?? tied[0];
  const evenSpread = tied.length === 3;
  const singleSector = SECTORS.filter((s) => sectorCounts[s] > 0).length === 1;

  // Sector order: dominant first, then by pick count, then the outcome's sector, then first tapped.
  const firstTap = (s: Sector) => {
    const i = picks.findIndex((p) => p.sector === s);
    return i === -1 ? Number.POSITIVE_INFINITY : i;
  };
  const sectorOrder = [...SECTORS].sort((a, b) => {
    if (a === dominant) return -1;
    if (b === dominant) return 1;
    if (sectorCounts[b] !== sectorCounts[a]) return sectorCounts[b] - sectorCounts[a];
    if (a === outcomeSector) return -1;
    if (b === outcomeSector) return 1;
    return firstTap(a) - firstTap(b);
  });

  // 2. Mapped actions (one per pick, deduplicated by name), ordered by sector then tap order.
  const mapped: PlanAction[] = dedupeByName(
    sectorOrder.flatMap((s) =>
      picks
        .filter((p) => p.sector === s)
        .map((p) => ({ sector: p.sector, category: p.categories[0], name: p.action, why: p.why, fromPattern: p })),
    ),
  );

  // 3. Plan size.
  const planSize = PLAN_SIZE[answers.goal];

  // 4. Card.
  const appCards = CARDS.filter((c) => c.fromApp);
  const coverageOf = (card: Card) => picks.filter((p) => p.categories.some((c) => card.matches.includes(c))).length;
  const threshold = Math.ceil(0.75 * picks.length);
  const order = OUTCOME_CARD_ORDER[answers.outcome];
  let card: Card | undefined;
  let coverage: number | null = null;
  if (picks.length >= 2) {
    const candidates = appCards
      .map((c) => ({ card: c, coverage: coverageOf(c) }))
      .filter((x) => x.coverage >= threshold)
      .sort((a, b) => b.coverage - a.coverage || order.indexOf(a.card.id as AppCardId) - order.indexOf(b.card.id as AppCardId));
    if (candidates.length) {
      card = candidates[0].card;
      coverage = candidates[0].coverage;
    }
  }
  const composed = CARD_BY_ID[COMPOSED_FOR_SECTOR[dominant]];
  if (!card) card = composed;

  // 5. Action list.
  const mappedNames = new Set(mapped.map((a) => a.name));
  const withPattern = (a: CardAction): PlanAction => ({ ...a, fromPattern: mapped.find((m) => m.name === a.name)?.fromPattern });
  let pool: PlanAction[];
  if (card.fromApp) {
    const cardActions = card.actions.map(withPattern);
    const leading = cardActions.filter((a) => mappedNames.has(a.name));
    const rest = cardActions.filter((a) => !mappedNames.has(a.name));
    pool = [...leading, ...rest, ...mapped, ...composed.actions];
  } else {
    pool = [...mapped, ...card.actions.map(withPattern)];
  }
  let actions = dedupeByName(pool).slice(0, planSize);
  // Per-sector cap (never reachable with a 6-action plan, kept for parity with the app).
  const perSector: Record<Sector, number> = { physical: 0, mental: 0, life: 0 };
  actions = actions.filter((a) => {
    perSector[a.sector] += 1;
    return perSector[a.sector] <= SECTOR_CAP;
  });
  if (!actions.some((a) => a.sector === dominant)) {
    const first = mapped.find((a) => a.sector === dominant);
    if (first) actions = [...actions.slice(0, -1), first];
  }

  // Lead sector: where the plan actually puts its weight. Usually the dominant sector; a curated
  // card can lean elsewhere (e.g. two Physical picks whose secondary categories select SHARP MIND).
  const actionCounts: Record<Sector, number> = { physical: 0, mental: 0, life: 0 };
  for (const a of actions) actionCounts[a.sector] += 1;
  const topActions = Math.max(...SECTORS.map((s) => actionCounts[s]));
  const leadTied = SECTORS.filter((s) => actionCounts[s] === topActions);
  const lead: Sector = leadTied.includes(dominant) ? dominant : (sectorOrder.find((s) => leadTied.includes(s)) ?? dominant);

  // 6. Why line.
  const pickLabels = joinList(picks.map((p) => p.label));
  const dominantCount = sectorCounts[dominant];
  const dom = SECTOR_LABEL[dominant];
  const leadLabel = SECTOR_LABEL[lead];
  const pickWord = picks.length === 1 ? "pick" : "picks";
  const cardReason = card.fromApp
    ? `${card.name} matches ${coverage} of your ${picks.length} ${pickWord}.`
    : "Your mix is its own thing, so this plan is built straight from what you picked.";
  let why: string;
  if (lead !== dominant) {
    const covers = card.fromApp ? `${card.name} matches ${coverage} of your ${picks.length} ${pickWord} and its actions lean ${leadLabel}` : `the plan leans ${leadLabel}`;
    why = `You picked ${pickLabels}. ${dominantCount} of your ${picks.length} ${pickWord} live in ${dom}, but ${covers}, so that is where it puts its weight.`;
  } else if (singleSector) {
    why = `You picked ${pickLabels}. Everything you picked lives in ${dom}. The other two stay quiet until your first checkpoint, when you can widen the plan. ${cardReason}`;
  } else if (evenSpread) {
    why = `You picked ${pickLabels}. They touch all three sectors equally, so your 30-day win points the way: start with ${dom}. ${cardReason}`;
  } else {
    why = `You picked ${pickLabels}. ${dominantCount} of your ${picks.length} picks live in ${dom}, so that is where the plan puts its weight. ${cardReason}`;
  }

  // 7. Fills.
  const total = actions.length || 1;
  const fills = { physical: 0, mental: 0, life: 0 } as Record<Sector, number>;
  for (const s of SECTORS) {
    const n = actions.filter((a) => a.sector === s).length;
    fills[s] = n === 0 ? 0.08 : Math.round((0.25 + 0.65 * (n / total)) * 1000) / 1000;
  }

  // 8. First target + lines.
  return {
    card,
    actions,
    planSize,
    dominant,
    lead,
    sectorCounts,
    coverage,
    fills,
    headline: `Your starter Brainwave: ${card.name}`,
    why,
    brainCaption: `Start with ${leadLabel}. Grow it for three days.`,
    firstTarget: `Complete every ${leadLabel} action three days running. In GROW, three days is a Frequency: your first checkpoint, and your first chance to adjust the plan.`,
    recovery: RECOVERY_LINE[answers.recovery],
    busyDay: answers.goal === "until-busy" ? BUSY_DAY_LINE : null,
    singleSector,
    evenSpread,
  };
}
