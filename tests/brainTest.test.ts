/**
 * Brain Test logic — run with `node --test tests/brainTest.test.ts` (Node ≥ 22.6 strips types).
 * Node needs the `.ts` extension on the import and tsc forbids it, so the module is loaded
 * through createRequire and typed via `typeof import(...)`.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";

const bt = createRequire(import.meta.url)("../src/content/brainTest.ts") as typeof import("../src/content/brainTest");
type Answers = import("../src/content/brainTest").BrainTestAnswers;

const {
  starterPicks,
  nameIdeas,
  focusCta,
  isCompleteAnswers,
  actionName,
  orderLobes,
  SUGGESTIONS,
  LOBES,
  ADD_LINE,
  CHECKINS,
  FOCUS_STEP,
  PACE_STEP,
  BEST_STEP,
  NOGGIN_LINE,
  brainTestCopy,
} = bt;

const names = (a: Answers) => starterPicks(a).map((p) => actionName(p, a.pace));
const perLobe = (a: Answers) => LOBES.map((l) => starterPicks(a).filter((p) => p.lobe === l).length);

test("data: the 6.0 Day 1 questions, three answers each, three starts per lobe", () => {
  assert.equal(FOCUS_STEP.prompt, "What do you want most?");
  assert.equal(PACE_STEP.prompt, "How do your days go?");
  assert.equal(BEST_STEP.prompt, "When are you at your best?");
  for (const step of [FOCUS_STEP, PACE_STEP, BEST_STEP]) {
    assert.equal(step.options.length, 3);
    for (const o of step.options) assert.ok(o.name && o.line && o.say, o.id);
  }
  for (const l of LOBES) {
    assert.equal(SUGGESTIONS[l].length, 3, l);
    for (const s of SUGGESTIONS[l]) {
      assert.equal(s.lobe, l);
      assert.ok(ADD_LINE[s.category], s.category);
      assert.notEqual(s.tiny, s.name);
    }
  }
});

test("seeding: every lobe gets one action; a lobe you want most gets two", () => {
  assert.deepEqual(perLobe({ focus: ["physical"], pace: "steady", best: "morning" }), [2, 1, 1]);
  assert.deepEqual(perLobe({ focus: ["mental", "life"], pace: "wild", best: "evening" }), [1, 2, 2]);
  assert.deepEqual(perLobe({ focus: ["physical", "mental", "life"], pace: "steady", best: "midday" }), [2, 2, 2]);
  assert.deepEqual(names({ focus: ["physical"], pace: "steady", best: "morning" }), [
    "Walk for 20 minutes",
    "Drink 2L of water",
    "Focus for 10 minutes",
    "Make your bed",
  ]);
});

test("seeding: a packed day keeps it to one tiny action per lobe", () => {
  assert.deepEqual(perLobe({ focus: ["physical", "mental", "life"], pace: "packed", best: "morning" }), [1, 1, 1]);
  assert.deepEqual(names({ focus: ["life"], pace: "packed", best: "evening" }), ["Walk for 5 minutes", "10 minutes, one tab open", "Clear one surface"]);
});

test("seeding is pure and ignores the tap order of the lobes", () => {
  const a: Answers = { focus: ["life", "physical"], pace: "steady", best: "midday" };
  assert.deepEqual(starterPicks(a), starterPicks({ ...a, focus: ["physical", "life"] }));
  assert.deepEqual(starterPicks(a), starterPicks(a));
  assert.deepEqual(orderLobes(["life", "physical", "life"]), ["physical", "life"]);
});

test("name ideas: a spread plan gets the mixed names; a one-lobe plan gets that lobe's", () => {
  const seeded = starterPicks({ focus: ["physical"], pace: "steady", best: "morning" });
  assert.deepEqual(nameIdeas(seeded), ["Steady Climb", "Full Brain", "Lock In", "Big Brain Energy"]);
  const onlyMental = SUGGESTIONS.mental.slice();
  assert.deepEqual(nameIdeas(onlyMental), ["Sharp Mind", "Clear Head", "Deep Focus", "Steady Climb"]);
  assert.deepEqual(nameIdeas([]), ["Steady Climb", "Full Brain", "Lock In", "Big Brain Energy"]);
  // 3 Physical of 4 is 75%: not mixed.
  assert.equal(nameIdeas([...SUGGESTIONS.physical, SUGGESTIONS.life[0]])[0], "Strong Body");
});

test("question 1's button names the lobes, as in the app", () => {
  assert.equal(focusCta([]), "Pick at least one");
  assert.equal(focusCta(["life", "physical"]), "Grow Physical and Life");
  assert.equal(focusCta(["mental"]), "Grow Mental");
  assert.equal(focusCta(["physical", "mental", "life"]), "Grow all three");
});

test("check-ins: two a day at your best time, never after 9:30 pm", () => {
  for (const o of BEST_STEP.options) {
    const c = CHECKINS[o.id];
    assert.equal(c.length, 2, o.id);
    for (const k of c) {
      const [, h, m, ap] = /^(\d{1,2}):(\d{2}) (am|pm)$/.exec(k.at) ?? [];
      assert.ok(h, k.at);
      const minutes = ((Number(h) % 12) + (ap === "pm" ? 12 : 0)) * 60 + Number(m);
      assert.ok(minutes <= 21 * 60 + 30, k.at);
    }
  }
});

test("isCompleteAnswers guards the draft", () => {
  assert.equal(isCompleteAnswers({ focus: [], pace: "steady", best: "morning" }), false);
  assert.equal(isCompleteAnswers({ focus: ["physical"], pace: null, best: "morning" }), false);
  assert.equal(isCompleteAnswers({ focus: ["physical"], pace: "steady", best: null }), false);
  assert.equal(isCompleteAnswers({ focus: ["nope" as never], pace: "steady", best: "morning" }), false);
  assert.equal(isCompleteAnswers({ focus: ["physical"], pace: "steady", best: "morning" }), true);
});

test("copy speaks 6.0: no 5.x rules, no brain claims", () => {
  const text = JSON.stringify({ brainTestCopy: { ...brainTestCopy, result: { ...brainTestCopy.result, sub: brainTestCopy.result.sub(3) } }, NOGGIN_LINE, ADD_LINE, CHECKINS, FOCUS_STEP, PACE_STEP, BEST_STEP, SUGGESTIONS });
  for (const banned of ["streak", "grace", "Dormant", "dormant", "sector", "5:00", "Frequency", "cycle", "diagnos", "IQ", "improves your brain"]) {
    assert.ok(!text.includes(banned), banned);
  }
  assert.ok(brainTestCopy.result.disclaimer.includes("not a test of your brain"));
  assert.ok(!/\bfree\b(?! to download)/i.test(text.replace(/Free to download/g, "")), "only 'free to download'");
});
