/**
 * Shared site copy. Brain Test content lives in src/content/brainTest.ts and legal
 * text lives in src/content/legal.ts. Preserve the core headline and brain labels.
 */

export const copy = {
  meta: {
    title: "Grow — What You Repeat Changes What You Become",
    description:
      "Build daily habits with GROW. Choose your actions, follow through, and watch your brain grow. Available now on the App Store for iPhone and iPad.",
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
    eyebrow: "Now on the App Store",
    subline: "GROW is a daily consistency app: choose your actions, follow through, and watch an evolving brain record it.",
    cta: "Download Grow",
    secondaryCta: "Find your starting point",
    ctaNote: "Available for iPhone and iPad. Subscription required.",
    /** Big line on the locked App Store button (small line reads "App Store"). */
    appStoreLocked: "Download unavailable",
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
    lede: "A GROW cycle runs from 5:00 a.m. to 5:00 a.m. Inside it, four steps. Rituals clear the way. Actions do the work.",
    loop: [
      { step: "Prime", body: "A short morning checklist to set up your environment and remove friction before you act." },
      { step: "Act", body: "Open a sector. Check off its actions. Record how each one felt, if you want to." },
      { step: "Reset", body: "An evening ritual to settle your environment and prepare tomorrow." },
      { step: "Reflect", body: "Write about an action, the whole cycle, or anything on your mind. Optional, always." },
    ],
    closing: "Prime and Reset support the routine. Only completed actions earn growth.",
    dial: { morning: "Morning", evening: "Evening", caption: "One cycle. 5:00 a.m. to 5:00 a.m." },
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
    body: "Your next action is a place to start. Download GROW, build your Brainwave, and make today count.",
    cta: "Download Grow",
    note: "Available for iPhone and iPad. Subscription required.",
  },

  about: {
    eyebrow: "About",
    headline: "Built for the person who wants to lock in.",
    paragraphs: [
      "We are Marcos and Leo. We built GROW because we kept starting over. The plans were fine. The follow-through was not.",
      "So we built something small and strict. One daily plan, a Brainwave. Three sectors: Physical, Mental, Life. A day counts when you complete one action. A sector grows when you complete all of them.",
      "We were careful about what earns growth. Rituals help, but they do not count. Reflection is there when you want it, not as homework. Miss a day and you get one cycle to come back, because a single bad day should not erase a good month.",
      "GROW is made by Talon Build LLC and is available now on the App Store for iPhone and iPad. If you want to lock in, we built it for you.",
    ],
    signoff: "— Marcos & Leo",
    cta: "Download Grow",
    ctaNote: "Available for iPhone and iPad. Subscription required.",
  },

  footer: {
    tagline: "GROW, a daily habit app by Talon Build LLC.",
  },

  form: {
    label: "Email address",
    placeholder: "Your email",
    submitting: "Signing you up…",
    /* Kit form 9931121 is single opt-in (no confirmation email), so the success line must not
       ask people to check their inbox. Switch back to "Check your inbox to confirm your email."
       if the incentive/double opt-in email is turned on in Kit. */
    success: "You're signed up.",
    invalid: "That does not look like an email address.",
    guardTitle: "One more step.",
    guardBody: "A quick security check finishes your signup.",
    guardCta: "Continue",
    error: "Something went wrong. Please try again.",
    notConnected: "Email signup is unavailable. Please try again later.",
  },
} as const;
