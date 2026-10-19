/**
 * Home page copy — concept "One GROW day" (2026-10-18).
 * Source of truth for the look and the words: ~/Desktop/Claude Design TikTok Carousels
 * (real GROW 6.0 screens, the App Store set, Noggin). Headlines are the App Store set's lines.
 * Rules from the kit: only true claims, no ratings, "free to download" at most, Noggin is "he".
 */

export type Tone = "dawn" | "mint" | "sky" | "gold" | "lilac" | "night" | "sunrise";

/** A headline is two lines; each line is plain text and at most one accent part (the App Store set's coloured word). */
export type Headline = { text: string; accent?: boolean }[][];

/** A phone screen: a real recording (in the phone frame) or a still of the phone with the screen. */
export type Screen = { video?: string; poster?: string; src?: string; alt: string };

export const home = {
  meta: {
    title: "Grow — Your habits have a buddy",
    description:
      "GROW is a daily habit app for iPhone and iPad. Do small actions across Physical, Mental and Life, and Noggin, your brain buddy, grows every time you show up.",
  },

  hero: {
    headline: [[{ text: "Your habits" }], [{ text: "have a " }, { text: "buddy.", accent: true }]] as Headline,
    sub: "Meet Noggin. He grows every time you show up.",
    note: "Free to download for iPhone and iPad",
  },

  cards: [
    {
      id: "how",
      tone: "mint",
      headline: [[{ text: "Small actions." }], [{ text: "Big brain.", accent: true }]] as Headline,
      sub: "Tap it done. Watch his lobes fill up.",
      body: "Pick a few small things for Physical, Mental and Life. Drink 2L of water. Read 20 pages. Text someone you love. Every one you do waters a lobe.",
      phone: { video: "/media/app/five-actions.mp4", poster: "/media/app/five-actions.jpg", alt: "Screen recording: ticking off the day’s actions on GROW Home while Noggin’s lobes fill." },
      noggin: { src: "/media/kit/noggin-3d-check.webp", alt: "Noggin holding a big green tick." },
    },
    {
      id: "medal",
      tone: "gold",
      headline: [[{ text: "Fill all three." }], [{ text: "Earn the " }, { text: "medal.", accent: true }]] as Headline,
      sub: "A Full Brain Day. Wrinkle acquired.",
      body: "Finish every lobe’s actions in one day and Noggin pins on his medal. All three lobes locked.",
      phone: { video: "/media/app/full-brain.mp4", poster: "/media/app/full-brain.jpg", alt: "Screen recording: a Full Brain Day on GROW Home. All three lobes locked, medal on." },
      noggin: { src: "/media/kit/noggin-3d-medal.webp", alt: "Noggin cheering in confetti, wearing his gold medal." },
    },
    {
      id: "night",
      tone: "night",
      headline: [[{ text: "Ten seconds" }], [{ text: "a night.", accent: true }]] as Headline,
      sub: "Check in before bed. One face is enough.",
      body: "Heavy, Low, Level, Lifted or Bright. Add a line if you want to. Only you can read it.",
      phone: { src: "/media/kit/phone-app-front-journal-how-was-today.webp", alt: "The GROW Journal: How was today? with five mood faces." },
    },
    {
      id: "waits",
      tone: "mint",
      headline: [[{ text: "Miss a day?" }], [{ text: "He waits.", accent: true }]] as Headline,
      sub: "No streak to lose. Every day you show up still counts.",
      body: "Come back and Noggin is glad to see you. No catching up. Just one small thing.",
      phone: { src: "/media/kit/phone-app-front-comeback-moment.webp", alt: "The Comeback screen: Look who it is. No catching up. Just one." },
      noggin: { src: "/media/kit/noggin-3d-calm.webp", alt: "Noggin meditating calmly on a cushion." },
    },
    {
      id: "day90",
      tone: "sunrise",
      headline: [[{ text: "Show up 90 days." }], [{ text: "Graduate.", accent: true }]] as Headline,
      sub: "From Sprout to Bloom. He wears the cap. You earned it.",
      body: "The road runs from Day 1 to Day 90 in three seasons. Every day you show up moves Noggin one step along it.",
      phone: { src: "/media/kit/phone-app-front-brain-road-to-day-90.webp", alt: "The road to Day 90 in the Brain tab." },
      noggin: { src: "/media/kit/noggin-3d-graduate.webp", alt: "Noggin in a graduation cap holding a diploma." },
    },
  ] as {
    id: string;
    tone: Tone;
    headline: Headline;
    sub: string;
    body: string;
    phone: Screen;
    noggin?: { src: string; alt: string };
  }[],

  worlds: {
    headline: [[{ text: "Every lobe" }], [{ text: "has a " }, { text: "world.", accent: true }]] as Headline,
    sub: "Noggin goes in with you.",
    items: [
      { lobe: "physical", name: "Physical", place: "A park", video: "/media/app/world-physical.mp4", poster: "/media/app/world-physical.jpg", alt: "Noggin in the Physical world, a park, with today’s Physical actions." },
      { lobe: "mental", name: "Mental", place: "A library at night", video: "/media/app/world-mental.mp4", poster: "/media/app/world-mental.jpg", alt: "Noggin in the Mental world, a library at night with a telescope." },
      { lobe: "life", name: "Life", place: "A little town", video: "/media/app/world-life.mp4", poster: "/media/app/world-life.jpg", alt: "Noggin in the Life world, a little town." },
    ],
  },

  widgets: {
    headline: [[{ text: "He lives on your" }], [{ text: "Home Screen.", accent: true }]] as Headline,
    sub: "Widgets that cheer you on, all day long.",
    src: "/media/kit/widget-every-moment-of-the-day.webp",
    alt: "GROW widgets for the Home Screen and Lock Screen through the day.",
  },

  faq: {
    title: "Questions",
    items: [
      { q: "What can I track?", a: "Small actions in three lobes: Physical (move, water, food), Mental (focus, reading, calm) and Life (people, money, your space). You pick them." },
      { q: "What happens if I miss a day?", a: "Nothing is lost. Your days showing up stay where they are, and Noggin waits for you. Come back with one small thing." },
      { q: "What does it cost?", a: "GROW is free to download. The full app is a subscription through the App Store: $24.99 a year after a 7-day free trial, or $4.99 a month (US prices). The App Store shows the price in your country before you confirm." },
      { q: "Which devices?", a: "iPhone and iPad, from the App Store, with Home Screen and Lock Screen widgets." },
      { q: "Is this brain training?", a: "No. Noggin shows your consistency. GROW is not a medical or cognitive test." },
      { q: "What do you collect?", a: "How the app is used, linked to your account ID, not your name or email.", link: { href: "/privacy", label: "Privacy Policy" } },
    ] as { q: string; a: string; link?: { href: string; label: string } }[],
  },

  final: {
    headline: [[{ text: "Day 1" }], [{ text: "starts " }, { text: "today.", accent: true }]] as Headline,
    sub: "Download GROW, pick one small thing, and say hi to Noggin.",
  },
} as const;
