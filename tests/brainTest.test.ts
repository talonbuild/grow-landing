/**
 * Brain Test scoring — run with `node --test tests/brainTest.test.ts` (Node ≥ 22.6 strips types).
 * Node needs the `.ts` extension on the import and tsc forbids it, so the module is loaded
 * through createRequire and typed via `typeof import(...)`.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";

const bt = createRequire(import.meta.url)("../src/content/brainTest.ts") as typeof import("../src/content/brainTest");
type Answers = import("../src/content/brainTest").BrainTestAnswers;

const { scoreBrainTest, isCompleteAnswers, PATTERNS, CARDS, PATTERN_BY_ID, CATEGORY_SECTOR, SECTORS } = bt;

const base = { goal: "lose-momentum", recovery: "next-day", outcome: "healthier" } as const;
const answers = (over: Partial<Answers> & { picks: Answers["picks"] }): Answers => ({ ...base, ...over });
const names = (r: ReturnType<typeof scoreBrainTest>) => r.actions.map((a) => a.name);

test("data: 18 patterns, primary category lives in the pattern's sector, one action each", () => {
  assert.equal(PATTERNS.length, 18);
  for (const p of PATTERNS) {
    assert.equal(CATEGORY_SECTOR[p.categories[0]], p.sector, p.id);
    assert.ok(p.action.length > 0);
    assert.ok(p.why.length > 0);
  }
  assert.equal(new Set(PATTERNS.map((p) => p.id)).size, 18);
});

test("data: card actions carry the sector of their category and a one-line reason", () => {
  for (const c of CARDS)
    for (const a of c.actions) {
      assert.equal(CATEGORY_SECTOR[a.category], a.sector, `${c.id} · ${a.name}`);
      assert.ok(a.why.length > 0, `${c.id} · ${a.name} has no why`);
    }
  assert.equal(CARDS.filter((c) => c.fromApp).length, 5);
  assert.equal(CARDS.filter((c) => !c.fromApp).length, 3);
});

test("plan size follows the goal answer", () => {
  const picks = ["low-energy", "movement", "sluggishness"] as const;
  assert.equal(scoreBrainTest(answers({ picks, goal: "lose-momentum" })).actions.length, 4);
  assert.equal(scoreBrainTest(answers({ picks, goal: "keep-planning" })).actions.length, 3);
  assert.equal(scoreBrainTest(answers({ picks, goal: "too-much" })).actions.length, 3);
  assert.equal(scoreBrainTest(answers({ picks, goal: "until-busy" })).actions.length, 5);
  assert.equal(scoreBrainTest(answers({ picks, goal: "ready-for-more" })).actions.length, 6);
  assert.equal(scoreBrainTest(answers({ picks, goal: "until-busy" })).busyDay !== null, true);
  assert.equal(scoreBrainTest(answers({ picks, goal: "too-much" })).busyDay, null);
});

test("STRONG BODY: physical picks on strength/cardio/hydration/nutrition", () => {
  const r = scoreBrainTest(answers({ picks: ["low-energy", "movement", "sluggishness", "self-care"], outcome: "healthier", goal: "ready-for-more" }));
  assert.equal(r.card.id, "strong-body");
  assert.equal(r.coverage, 4);
  assert.equal(r.dominant, "physical");
  // The card's own actions lead, the matching mapped action ("Walk 30 minutes") first.
  assert.equal(names(r)[0], "Walk 30 minutes");
  assert.deepEqual(names(r).slice(0, 5).sort(), ["Cold shower", "Drink 2L of water", "Hit protein target", "Lift weights", "Walk 30 minutes"].sort());
  assert.equal(r.actions.length, 6);
  assert.ok(r.why.includes("STRONG BODY matches 4 of your 4 picks."));
  assert.ok(r.why.includes("Everything you picked lives in Physical."));
});

test("SHARP MIND: focus/calm/reflection picks", () => {
  const r = scoreBrainTest(answers({ picks: ["overthinking", "poor-focus", "overwhelm"], outcome: "calmer" }));
  assert.equal(r.card.id, "sharp-mind");
  assert.equal(r.coverage, 3);
  assert.equal(r.dominant, "mental");
  assert.equal(names(r)[0], "25 minutes deep work");
  assert.equal(names(r)[1], "Journal 10 minutes");
});

test("BETTER BANK vs CLEAN SLATE: same coverage, the outcome answer breaks the tie", () => {
  const picks = ["unfinished", "procrastination", "routine"] as const;
  const bank = scoreBrainTest(answers({ picks, outcome: "visible-progress" }));
  assert.equal(bank.card.id, "better-bank");
  assert.equal(bank.coverage, 3);
  const slate = scoreBrainTest(answers({ picks, outcome: "follow-through" }));
  assert.equal(slate.card.id, "clean-slate");
  assert.equal(slate.coverage, 3);
});

test("5AM: hydration/mobility/focus/space picks", () => {
  const r = scoreBrainTest(answers({ picks: ["sluggishness", "restlessness", "distractions", "routine"], outcome: "proud-routine" }));
  assert.equal(r.card.id, "5am");
  assert.equal(r.coverage, 4);
  assert.equal(r.dominant, "physical");
  assert.equal(names(r)[0], "Glass of water on waking");
});

test("CLEAN SLATE: space/responsibility/reflection picks", () => {
  const r = scoreBrainTest(answers({ picks: ["restart", "unfinished", "overthinking"], outcome: "calmer" }));
  assert.equal(r.card.id, "clean-slate");
  assert.equal(r.coverage, 3);
  assert.equal(r.dominant, "life");
});

test("composed cards when no curated card reaches three quarters", () => {
  const phys = scoreBrainTest(answers({ picks: ["sleep", "self-care", "self-doubt", "feeling-stuck"], outcome: "healthier" }));
  assert.equal(phys.card.id, "first-move");
  assert.equal(phys.coverage, null);
  assert.equal(phys.dominant, "physical");
  // Mapped actions first, in sector order, then the base list.
  assert.deepEqual(names(phys), ["Hip openers before bed", "Cook one real meal", "Speak up once today", "Say yes to the invite"]);
  assert.ok(phys.why.includes("Your mix is its own thing, so this plan is built straight from what you picked."));

  const mental = scoreBrainTest(answers({ picks: ["self-doubt", "momentum", "feeling-stuck"], outcome: "calmer" }));
  assert.equal(mental.card.id, "clear-signal");
  const life = scoreBrainTest(answers({ picks: ["feeling-stuck", "lack-of-direction", "sleep"], outcome: "follow-through" }));
  assert.equal(life.card.id, "loose-ends");
});

test("one pick never matches a curated card; it gets the composed card and a 3-action minimum", () => {
  const r = scoreBrainTest(answers({ picks: ["low-energy"], goal: "too-much" }));
  assert.equal(r.card.id, "first-move");
  assert.equal(r.actions.length, 3);
  assert.equal(names(r)[0], "Walk 30 minutes");
  assert.ok(r.singleSector);
  assert.ok(r.why.includes("STRONG BODY") === false);
  assert.ok(r.why.startsWith("You picked Low energy."));
});

test("sector tie: the outcome answer decides, then the first pattern tapped", () => {
  const byOutcome = scoreBrainTest(answers({ picks: ["overthinking", "low-energy"], outcome: "healthier" }));
  assert.equal(byOutcome.dominant, "physical");
  const byOutcome2 = scoreBrainTest(answers({ picks: ["overthinking", "low-energy"], outcome: "calmer" }));
  assert.equal(byOutcome2.dominant, "mental");
  // Outcome sector (Life) is not in the tie → first tapped wins.
  const byTap = scoreBrainTest(answers({ picks: ["overthinking", "low-energy"], outcome: "follow-through" }));
  assert.equal(byTap.dominant, "mental");
});

test("all three sectors tied: outcome decides and the why line says so", () => {
  const r = scoreBrainTest(answers({ picks: ["low-energy", "overthinking", "procrastination"], outcome: "follow-through" }));
  assert.equal(r.dominant, "life");
  assert.ok(r.evenSpread);
  assert.ok(r.why.includes("They touch all three sectors equally, so your 30-day win points the way: start with Life."));
});

test("only one sector picked: the why line names it", () => {
  const r = scoreBrainTest(answers({ picks: ["overthinking", "self-doubt"], outcome: "healthier" }));
  assert.ok(r.singleSector);
  assert.ok(r.why.includes("Everything you picked lives in Mental. The other two stay quiet until your first checkpoint, when you can widen the plan."));
});

test("no action in the dominant sector: the last action is swapped for a dominant mapped action", () => {
  // Physical dominant (3 picks) but SHARP MIND wins on coverage with a calmer outcome; plan of 3 is all mental.
  const r = scoreBrainTest(answers({ picks: ["low-energy", "sleep", "restlessness"], outcome: "calmer", goal: "too-much" }));
  assert.equal(r.card.id, "sharp-mind");
  assert.equal(r.dominant, "physical");
  assert.equal(r.actions.length, 3);
  assert.ok(r.actions.some((a) => a.sector === "physical"));
  assert.equal(names(r)[2], "Walk 30 minutes");
});

test("duplicate actions are removed before cutting to plan size", () => {
  // Make bed comes from both the Disorganization pick and the CLEAN SLATE card.
  const r = scoreBrainTest(answers({ picks: ["routine", "restart", "unfinished"], outcome: "follow-through", goal: "ready-for-more" }));
  assert.equal(r.card.id, "clean-slate");
  const n = names(r);
  assert.equal(new Set(n).size, n.length);
  assert.equal(n.filter((x) => x === "Make bed").length, 1);
});

test("fewer mapped actions than plan size: padded, never shorter than 3, never longer than the plan", () => {
  const r = scoreBrainTest(answers({ picks: ["unfinished", "procrastination"], outcome: "visible-progress", goal: "ready-for-more" }));
  assert.equal(r.card.id, "better-bank");
  assert.equal(r.actions.length, 6);
  const n = names(r);
  assert.equal(new Set(n).size, 6);
  for (const g of ["keep-planning", "too-much"] as const) assert.equal(scoreBrainTest(answers({ picks: ["low-energy"], goal: g })).actions.length, 3);
});

test("fills: 0.25 + 0.65 × share; a sector with no action sits at 0.08; dominant is fullest", () => {
  const r = scoreBrainTest(answers({ picks: ["low-energy", "movement", "sluggishness", "self-care"], goal: "lose-momentum", outcome: "healthier" }));
  const total = r.actions.length;
  for (const s of SECTORS) {
    const n = r.actions.filter((a) => a.sector === s).length;
    assert.equal(r.fills[s], n === 0 ? 0.08 : Math.round((0.25 + 0.65 * (n / total)) * 1000) / 1000);
  }
  assert.equal(Math.max(...SECTORS.map((s) => r.fills[s])), r.fills[r.lead]);
  assert.equal(r.lead, r.dominant);
});

test("lead sector: when a curated card leans away from the pick-dominant sector, the fills, caption and target follow the plan", () => {
  // 2 Physical picks + 1 Mental + 1 Life → Physical dominant; SHARP MIND covers 3 and gives 3 Mental actions.
  const r = scoreBrainTest(answers({ picks: ["low-energy", "sleep", "overthinking", "procrastination"], outcome: "calmer", goal: "lose-momentum" }));
  assert.equal(r.card.id, "sharp-mind");
  assert.equal(r.dominant, "physical");
  assert.equal(r.lead, "mental");
  assert.equal(Math.max(...SECTORS.map((s) => r.fills[s])), r.fills.mental);
  assert.equal(r.brainCaption, "Start with Mental. Grow it for three days.");
  assert.ok(r.firstTarget.startsWith("Complete every Mental action"));
  assert.ok(r.why.includes("but SHARP MIND matches 3 of your 4 picks and its actions lean Mental, so that is where it puts its weight."));
  // Composed cards always lead with the dominant sector.
  const c = scoreBrainTest(answers({ picks: ["sleep", "self-care", "self-doubt", "feeling-stuck"], outcome: "healthier" }));
  assert.equal(c.lead, c.dominant);
});

test("per-sector cap is never reachable; the plan never exceeds 6", () => {
  for (const c of CARDS) assert.ok(c.actions.length <= 6);
  const r = scoreBrainTest(answers({ picks: ["low-energy", "sleep", "movement", "sluggishness", "restlessness", "self-care"], goal: "ready-for-more" }));
  assert.equal(r.actions.length, 6);
  assert.ok(r.actions.filter((a) => a.sector === "physical").length <= 10);
});

test("recovery line and first target follow the answers", () => {
  const r = scoreBrainTest(answers({ picks: ["low-energy"], recovery: "fresh-start" }));
  assert.ok(r.recovery.startsWith("The fresh start is tomorrow at 7:00 a.m."));
  assert.equal(r.firstTarget, "Complete every Physical action three days running. In GROW, three days is a Frequency: your first checkpoint, and your first chance to adjust the plan.");
  assert.equal(r.brainCaption, "Start with Physical. Grow it for three days.");
  assert.equal(r.headline, "Your starter Brainwave: FIRST MOVE");
});

test("scoring is pure and deterministic; sector tags come from categories", () => {
  const a = answers({ picks: ["distractions", "momentum", "poor-focus", "restart"], outcome: "calmer", goal: "until-busy" });
  assert.deepEqual(scoreBrainTest(a), scoreBrainTest(a));
  for (const act of scoreBrainTest(a).actions) assert.equal(CATEGORY_SECTOR[act.category], act.sector);
});

test("every action row has a reason, and no row repeats its pattern label back to back", () => {
  const r = scoreBrainTest(answers({ picks: ["sleep", "overthinking", "procrastination"], outcome: "calmer", goal: "lose-momentum" }));
  assert.equal(r.card.id, "clear-signal");
  for (const a of r.actions) {
    assert.ok(a.why.length > 0, a.name);
    if (a.fromPattern) assert.ok(!a.fromPattern.why.startsWith(a.fromPattern.label), `${a.fromPattern.label}. ${a.fromPattern.why}`);
  }
  for (const p of PATTERNS) assert.ok(!p.why.startsWith(p.label), p.id);
});

test("user-facing result copy never leans on undefined app terms", () => {
  const r = scoreBrainTest(answers({ picks: ["sleep", "overthinking", "procrastination"], outcome: "calmer", goal: "until-busy", recovery: "rethink" }));
  const text = [r.why, r.firstTarget, r.recovery, r.busyDay ?? "", r.brainCaption].join(" ");
  for (const banned of ["Growing day", "cycle", "Dormant", "curated", "cards", "ties"]) assert.ok(!text.includes(banned), banned);
  // "Frequency" appears once, defined in the same sentence.
  assert.ok(r.firstTarget.includes("three days is a Frequency"));
});

test("isCompleteAnswers guards the stored draft", () => {
  assert.equal(isCompleteAnswers({ picks: [], goal: "too-much", recovery: "rethink", outcome: "calmer" }), false);
  assert.equal(isCompleteAnswers({ picks: ["sleep"], goal: null, recovery: "rethink", outcome: "calmer" }), false);
  assert.equal(isCompleteAnswers({ picks: ["sleep"], goal: "too-much", recovery: "rethink", outcome: "calmer" }), true);
  assert.equal(isCompleteAnswers({ picks: ["nope" as never], goal: "too-much", recovery: "rethink", outcome: "calmer" }), false);
  assert.equal(isCompleteAnswers({ picks: Array(7).fill("sleep"), goal: "too-much", recovery: "rethink", outcome: "calmer" }), false);
  assert.ok(PATTERN_BY_ID.sleep);
  assert.throws(() => scoreBrainTest({ picks: [], ...base }));
});
