/**
 * All user-facing copy. The locked lines (headline, brain labels) never change; the rest is
 * the copy deck (written by a three-writer / two-judge panel on 2026-09-18, then edited).
 * Components only read from here.
 */

export const copy = {
  meta: {
    title: "Grow — What You Repeat Changes What You Become",
    description:
      "GROW is a daily consistency app. Choose your actions, follow through, and watch an evolving brain record it. Coming to the App Store.",
  },

  nav: {
    about: "About",
    privacy: "Privacy",
    brainTest: "Brain Test",
    contact: "Contact",
  },

  /** Locked. */
  headline: ["What you repeat", "changes what you become."],

  hero: {
    eyebrow: "Consistency, measured",
    subline: "GROW is a daily consistency app: choose your actions, follow through, and watch an evolving brain record it.",
    /* Alternates: GROW is a daily consistency app: choose your actions, commit to them, and come back every day.; GROW is a daily consistency app that turns the actions you repeat into a brain you can watch grow.; GROW is a daily consistency app: one plan, three sectors, and a brain that grows when you follow through. */
    cta: "Join the waitlist",
    ctaNote: "One email when GROW is live. Nothing else.",
    /** Big line on the locked App Store button (small line reads "App Store"). */
    appStoreLocked: "Coming soon",
  },

  /** Locked labels; hints and targets are editable. */
  brainNav: {
    physical: { label: "Why Lock In?", hint: "One action counts. Every action locks in.", target: "lock-in" },
    mental: { label: "Why Prime?", hint: "Four steps a day. Only one of them earns growth.", target: "prime" },
    life: { label: "See Your Progress", hint: "Nine Frequencies. One cycle of grace.", target: "progress" },
  },

  lockIn: {
    sector: "Physical",
    eyebrow: "Why Lock In?",
    headline: "Show up. Grow. Lock in.",
    lede: "A Brainwave is your daily plan: the actions you commit to across Physical, Mental and Life. GROW measures three things about it.",
    points: [
      { title: "Showing Up", body: "Complete one action, anywhere in your Brainwave. That is a day you showed up, and it counts." },
      { title: "Growing", body: "Complete every action in a sector and that sector grows. Partial days keep your count. They do not advance it." },
      { title: "Lock-In", body: "Complete every action across every active sector. One whole day, locked in. No grace period." },
    ],
    closing: "One action keeps you in. The whole plan moves you forward.",
  },

  prime: {
    sector: "Mental",
    eyebrow: "Why Prime?",
    headline: "One loop, every day.",
    lede: "A GROW cycle runs from 7:00 a.m. to 7:00 a.m. Inside it, four steps. Rituals clear the way. Actions do the work.",
    loop: [
      { step: "Prime", body: "From 7:00 a.m. A short checklist to set up your environment and remove friction before you act." },
      { step: "Act", body: "Open a sector. Check off its actions. Record how each one felt, if you want to." },
      { step: "Reset", body: "From 7:00 p.m. Settle your environment and prepare tomorrow." },
      { step: "Reflect", body: "Write about an action, the whole cycle, or anything on your mind. Optional, always." },
    ],
    closing: "Prime and Reset support the routine. Only completed actions earn growth.",
    dial: { morning: "7:00 a.m.", evening: "7:00 p.m.", caption: "One cycle. 7:00 a.m. to 7:00 a.m." },
  },

  progress: {
    sector: "Life",
    eyebrow: "See Your Progress",
    headline: "Progress you can point to.",
    lede: "Showing Up records, Growing records, Lock-In streaks, completed cycles, every Frequency earned. Not a score. Evidence of what you actually repeated.",
    points: [
      { title: "Frequencies", body: "Nine milestones, earned by Growing days. Each one is a moment to look at the plan and adjust it." },
      { title: "Dormant", body: "Miss a day and an established Showing Up streak goes Dormant, not dead. Come back with one action within the next cycle and it continues." },
      { title: "Independent sectors", body: "Physical, Mental and Life each keep their own records. Strong in one, quiet in another, and the brain shows it honestly." },
    ],
    frequencies: [3, 5, 10, 14, 21, 30, 45, 60, 90],
    frequenciesCaption: "Frequencies at 3, 5, 10, 14, 21, 30, 45, 60 and 90 Growing days.",
    ladderLabel: "Growing days",
  },

  final: {
    headline: "Lock in.",
    /* Alternates: Be first.; Be there on day one.; Start on day one.; "Start growing." */
    body: "GROW is coming to the App Store. Leave your email and you will hear from us once, on launch day.",
    cta: "Join the waitlist",
    note: "One email at launch. Not a newsletter.",
  },

  about: {
    eyebrow: "About",
    headline: "Built for the person who wants to lock in.",
    paragraphs: [
      "We are Marcos and Leo. We built GROW because we kept starting over. The plans were fine. The follow-through was not.",
      "So we built something small and strict. One daily plan, a Brainwave. Three sectors: Physical, Mental, Life. A day counts when you complete one action. A sector grows when you complete all of them.",
      "We were careful about what earns growth. Rituals help, but they do not count. Reflection is there when you want it, not as homework. Miss a day and you get one cycle to come back, because a single bad day should not erase a good month.",
      "GROW is made by Talon Build LLC and is coming to the App Store. If you want to lock in, we would like you there first.",
    ],
    signoff: "— Marcos & Leo",
    cta: "Join the waitlist",
    ctaNote: "One email when GROW is live. Nothing else.",
  },

  brainTest: {
    eyebrow: "Coming to the app",
    headline: "Where does your consistency live?",
    body: "A short assessment that maps how you follow through onto the brain: Physical, Mental, Life. It is coming to GROW after launch. Here is a taste.",
    sampleQuestions: [
      { prompt: "When you set a goal, what usually happens in week two?", options: ["I keep going as planned", "I slow down but stay with it", "I quietly drop it"] },
      { prompt: "What gets in the way most often?", options: ["My phone", "My energy", "My schedule"] },
      { prompt: "When you miss a day, what usually happens next?", options: ["I come back the next day", "I take a few days off", "I start over from scratch"] },
    ],
    lockedLabel: "Available after launch",
    resultLabel: "Your brain, mapped",
    resultNote: "Each sector fills to match how you follow through. A first look at the result screen.",
    cta: "Join the waitlist",
    ctaNote: "Be first in line for the app and the test.",
  },

  footer: {
    tagline: "A daily consistency app by Talon Build LLC. Coming to the App Store.",
  },

  form: {
    label: "Email address",
    placeholder: "Your email",
    submitting: "Signing you up…",
    success: "You're in. Check your inbox to confirm your email.",
    invalid: "That does not look like an email address.",
    error: "Something went wrong. Please try again.",
    notConnected: "Signups open very soon. Please check back shortly.",
  },
} as const;
