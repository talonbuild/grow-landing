/**
 * Shared site copy. Home page copy lives in src/content/home.ts, Brain Test content in
 * src/content/brainTest.ts and legal text in src/content/legal.ts.
 * Facts follow GROW 6.0 (~/Desktop/Claude Design TikTok Carousels): only true claims,
 * "free to download" at most, Noggin is "he".
 */

import type { Headline } from "@/content/home";

export const copy = {
  meta: {
    title: "Grow — Your habits have a buddy",
    description:
      "GROW is a daily habit app for iPhone and iPad. Do small actions across Physical, Mental and Life, and Noggin, your brain buddy, grows every time you show up.",
  },

  nav: {
    about: "About",
    privacy: "Privacy",
    brainTest: "Brain Test",
    contact: "Contact",
  },

  hero: {
    /** Big line on the locked App Store button (small line reads "App Store"). */
    appStoreLocked: "Download unavailable",
  },

  about: {
    description: "Hi, we're Marcos and Leo. We make GROW, the habit app where Noggin, your brain buddy, grows every time you show up.",
    eyebrow: "About",
    headline: [[{ text: "We built the buddy" }], [{ text: "we " }, { text: "needed.", accent: true }]] as Headline,
    sub: "Hi, we're Marcos and Leo. We make GROW.",
    paragraphs: [
      "We built GROW because we kept starting over. The plans were fine. The follow-through was not.",
      "So we gave our habits a buddy. Noggin is a little brain with three lobes: Physical, Mental and Life. You pick a few small actions for each one, and every action you do fills a lobe.",
      "GROW counts the days you show up, not the days you miss. Miss a day and Noggin waits for you. No catching up, just one small thing when you come back.",
      "Keep showing up and he keeps growing, one step at a time along the road to Day 90, where he graduates. No perfect streak needed.",
      "GROW is made by Talon Build LLC, for iPhone and iPad.",
    ],
    contact: "Want to say hi? Write to us at",
    signoff: "Marcos & Leo",
    signoffRole: "Founders of GROW",
    final: {
      headline: [[{ text: "Come say hi" }], [{ text: "to " }, { text: "Noggin.", accent: true }]] as Headline,
      sub: "Download GROW and pick one small thing for today.",
    },
    ctaNote: "Free to download for iPhone and iPad",
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
