---
version: alpha
name: GROW
description: >-
  GROW is a daily consistency app where Noggin, a small three-lobe brain character, grows when you show up.
  The website feels calm, cozy and premium, like Finch with an Apple product page's restraint. It uses white
  and morning-sky canvases, frosted glass, three lobe colours, wide Unbounded caps titles and plain sentences.
  Noggin is the hero and the real app is the proof. Nothing shouts.
colors:
  # neutrals (site + app 6.0)
  ink: "#0b1f2a"
  ink-soft: "#3a4c56"
  muted: "#5c6b74"
  hairline: "#e4ebef"
  mist: "#f5f9fb"
  canvas: "#ffffff"
  stage: "#eaf0f4"
  # PHYSICAL lobe
  physical: "#16885c"
  physical-ink: "#12573e"
  physical-deep: "#0b4d33"
  physical-glow: "#2fbf86"
  physical-light: "#9ff5cf"
  physical-soft: "#e3f6ec"
  # MENTAL lobe
  mental: "#164b91"
  mental-ink: "#123b70"
  mental-deep: "#0d2f66"
  mental-glow: "#3f7fe0"
  mental-light: "#a9c8ff"
  mental-soft: "#e6eefb"
  # LIFE lobe
  life: "#65a8cf"
  life-ink: "#245774"
  life-deep: "#174a6b"
  life-glow: "#5fb7ea"
  life-light: "#bfeaff"
  life-soft: "#e6f4fb"
  silver: "#c8dce6"
  # Noggin's spark (PRIME lavender)
  spark: "#8d6fd1"
  spark-light: "#b7a0dc"
  spark-deep: "#5b3f99"
  spark-soft: "#f1ecfa"
  # moments
  medal-gold: "#f2b33d"
  rest: "#d0574e"
  rest-soft: "#fcecea"
  # night (evening sections, end cards)
  night: "#0b1622"
  night-2: "#0b1430"
typography:
  hero-display:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: "clamp(44px, 7vw, 96px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: -0.02em
    textTransform: uppercase
  section-title:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: "clamp(32px, 4.6vw, 64px)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: -0.015em
    textTransform: uppercase
  card-title:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: "clamp(17px, 1.6vw, 22px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.01em
    textTransform: uppercase
  label:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.14em
    textTransform: uppercase
  button:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.06em
    textTransform: uppercase
  lead:
    fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif"
    fontSize: "clamp(19px, 1.7vw, 22px)"
    fontWeight: 500
    lineHeight: 1.45
  body:
    fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif"
    fontSize: 17px
    fontWeight: 500
    lineHeight: 1.55
  bubble:
    fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif"
    fontSize: 17px
    fontWeight: 700
    lineHeight: 1.3
  fine-print:
    fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.45
rounded:
  s: 12px
  m: 18px
  l: 24px
  xl: 30px
  pill: 999px
spacing:
  gutter: "clamp(20px, 4vw, 40px)"
  header-height: 52px
  section-y: "clamp(96px, 14vh, 160px)"
  content-max: 1200px
  text-max: 34em
motion:
  spring: "cubic-bezier(.34, 1.56, .64, 1)"
  soft-out: "cubic-bezier(0.2, 0.7, 0.2, 1)"
  in-out: "cubic-bezier(0.65, 0, 0.35, 1)"
---

# GROW: design system

GROW's single source of truth for the website redesign. It is the **source for this repo's brand**: when a skill (design-taste-frontend, image-to-code, web-design-guidelines) or a reference DESIGN.md suggests a different style, this file wins.

Sources: the site's tokens (`src/app/globals.css`), the GROW 6.0 app stylesheet and Noggin rig (`~/Desktop/Noggin Current/GROW 6.0 — LATEST from Leo (2026-10-12).html`), the Noggin montage brief (`~/Developer/grow-noggin-montage/DESIGN.md`), the Social Identity North Star, and the Mega Marketing Plan chapter 10.

## Overview

- **Promise:** You show up. Noggin grows. Lines that work: *"Small actions. A little brain that grows with you."* and *"Show up. Watch it grow."*
- **Character first, proof second.** Noggin carries the feeling. The real app (screens, recordings, the 90-day road) shows it is true.
- **Calm, cozy, Finch-like.** It is Noggin's world, not a rave. It is warm and quiet, with room to breathe.
- **Apple-grade restraint.** One clear thought per section, generous space around the hero, and one action at a time.
- **Honest.** Show only what the shipped app does. There are no fake counters, invented testimonials or brain-science claims.

## Voice

**Brand voice:** big, simple promises; warm, specific details; a little wit, always on your side.

**Noggin's voice:** sassy about the situation, kind to the person. Noggin speaks in the first person, one short line at a time (about 4–10 words), dry and affectionate. These are real lines from the app:

- "Busy days count too. Tiny ones especially."
- "Medal on. I'm sleeping in it."
- "Mmh. Five more minutes. Or one action."
- "Good morning. Yesterday's filed."
- "There you are."

**Rules language.** The app has real terms (Showing Up, Growing, Lock-In, Brainwave, Prime/Act/Reset/Reflect, Frequencies, Dormant). On the website, explain the idea in plain words first and name the term second. Use at most three terms on the home page. The rest belong on a dedicated page or in the app.

**Never:**
- guilt, shame or streak-loss threats;
- hype ("10x", "hack your brain", "rewire");
- claims that GROW or a game diagnoses, improves or changes the brain or IQ;
- urgency timers, fake visitor or community counts, pre-checked marketing boxes;
- testimonials, ratings or results that are not real, permissioned and dated.

## Colors

### The three lobes

Colour belongs to Noggin's lobes. Each lobe has six tones, and **colour always means a lobe**: never use green for "success" and red for "error" on things that are not lobes.

| Lobe | Base | Ink (text) | Deep | Glow | Light | Soft (tint bg) |
|---|---|---|---|---|---|---|
| PHYSICAL | `#16885c` | `#12573e` | `#0b4d33` | `#2fbf86` | `#9ff5cf` | `#e3f6ec` |
| MENTAL | `#164b91` | `#123b70` | `#0d2f66` | `#3f7fe0` | `#a9c8ff` | `#e6eefb` |
| LIFE | `#65a8cf` | `#245774` | `#174a6b` | `#5fb7ea` | `#bfeaff` | `#e6f4fb` |

- **Spark (Noggin's own colour, the PRIME lavender):** `#8d6fd1`, light `#b7a0dc`, deep `#5b3f99`, soft `#f1ecfa`. Use it for Noggin moments, the 61–90 "Bloom" season, and the neuron sprout. It is not a fourth lobe.
- **Medal gold** `#f2b33d`: only for the Full Brain Day medal.
- **Rest red** `#d0574e`: only for an honest dormant or missed state (the rig's dormant rim). It is never a warning, a sale badge or decoration.
- This is the **app palette** (Marcos's ruling, 2026-09-18). The North Star social boards use a brighter set (`#26A879 / #427CD5 / #9BCFE3`), which is social-only unless Marcos moves the site to it.

### Surfaces

- **Day (default):** canvas `#ffffff`, mist `#f5f9fb`, stage `#eaf0f4`.
- **Noggin's stage:** the 6.0 morning sky. It is a peach glow top-right, a lavender glow left and a pale blue to white to mint vertical wash:
  `radial-gradient(90% 60% at 78% 8%, rgba(255,214,170,.85), transparent 55%), radial-gradient(70% 55% at 12% 30%, rgba(183,160,220,.45), transparent 60%), linear-gradient(180deg, #dfe9ff 0%, #eef3ff 46%, #f6f9fb 72%, #eef5f1 100%)`.
- **Night (evening, Reset and end CTA):** `#0b1622` to `#0b1430`, with at most one soft radial light in a lobe colour.
- **Lobe bands:** full-width sections may take a lobe's base or deep colour (the current site's green, navy and silver bands). One lobe per band.

### Text colour and contrast (WCAG, measured)

| Pair | Ratio | Use |
|---|---|---|
| ink on canvas | 16.9 | all text |
| ink-soft `#3a4c56` on canvas | 8.9 | body, secondary |
| muted `#5c6b74` on canvas / mist | 5.5 / 5.2 | fine print, minimum for small text |
| white on mental | 8.6 | any size |
| white on physical-ink / physical-deep | 8.5+ | any size |
| **white on physical `#16885c`** | **4.46** | **large text only (≥ 24px, or bold ≥ 19px)**. For small text on green, use physical-ink. |
| **white on life `#65a8cf`** | **2.6: fails** | never. Use **ink on life** (6.5) or life-ink for the background. |
| white on spark `#8d6fd1` | 3.9 | large text only. Use spark-deep for small text (8.0). |
| ink on medal-gold | 9.1 | medal labels |
| lobe *-ink on its *-soft | 6.9–9.5 | lobe pills and tinted chips |
| light tones on night | 7.9–14 | night sections |

## Typography

- **Display = Unbounded** (SIL OFL, the app's display face, loaded with `next/font/google`). Weights 700–800 for titles, 900 only for a single giant word.
- **Text = Arial / Helvetica at weight 500.** This was chosen in the 2026-09-18 readability pass. The 6.0 app uses the system SF stack. Do not add a third family.
- No monospace on the site.

### The caps rule (house rule)

**Titles, tabs, names, labels, counts, pills and buttons are ALL CAPS**, like the app's title cards (PHYSICAL, PROGRESS, YOUR BADGES, NOGGIN, LOCKED IN). **Sentences stay sentence case:** sub-lines, descriptions, Noggin's bubbles, captions and legal text.

- Do it in CSS with `text-transform: uppercase`. Keep the source string in sentence or title case so screen readers and translations still work.
- Use **NOGGIN** as a name tag or title and "Noggin" inside a sentence. GROW is always "GROW".
- Unbounded caps run wide. **Measure every title at 320px.** Shorten the copy or let a single long word auto-fit before letting it overflow. Keep hero titles to two or three lines.
- Labels never go below 13px (the readability floor). Track caps labels at +0.12–0.16em and big titles at −0.01 to −0.02em.

## Noggin

Noggin is a pocket copy of the person's own three-lobe brain. Noggin is the only character on the site.

### The rig is the only drawing

- **Draw Noggin only with the canonical rig** `GROW_MASCOT_SVG(opts)` / `.set()` from `vendor/noggin/mascot-svg.js`, plus `mascot.css` and the web engine `mascot.js`. The newest copy is inlined in Leo's `GROW 6.0 — LATEST (2026-10-12).html`. Loose files are in `~/Desktop/GROW North Star/app/vendor/noggin/`. The rig is locked: vendor it into `src/vendor/noggin/` byte-for-byte and wrap it in a client component. Never edit its geometry.
- **Never** redraw, trace, restyle, recolour, outline, flatten into a hand-made illustration, or **AI-generate Noggin**, not even for mockups. In an image-to-code mockup, leave a labelled empty box where Noggin goes.
- Rasters are fine only if rendered from the rig (OG images, posters, the montage).

### Anatomy (fixed)

- **Lobes:** PHYSICAL is top-left (green), MENTAL is top-right (navy), LIFE is the bottom (sky). The eyes sit on the top lobes and the mouth on LIFE.
- **Body:** elbowed rubber-hose arms that tuck into little nubs; porcelain legs and feet; a neuron sprout on top that branches through **stage 1–6** (one branch per 15 days). There is no tail.
- **Coordinates:** `viewBox="-110 -240 220 252"`. The origin is the ground point between the feet. Size by width; height = width × 252 / 220. The rig picks its level of detail from `size`.

### States and vocabulary

| Control | Values | Meaning (must match the app) |
|---|---|---|
| `fills.{physical,mental,life}` | 0..1 | water level = days / 90, the same rule as the Home brain |
| `lit` | lobes locked in today | soft lobe glow |
| `dormant` | a lobe | red rim on an honestly missed lobe |
| `tint` | a lobe | the world Noggin is standing in (rim light, spark colour) |
| `mood` | idle, happy, cheer, proud, sleepy, worried, determined, surprised, love, calm, run | |
| `arms` | tuck, rest, out, wave, up, hips, hold, fists, thumbs, pump, calm, zero, hide | always blend between poses |
| `legs` | stand, lotus | |
| `acc` | band, cap, sweat, zzz, hearts, sparkle | |

### Staging rules

- **One Noggin per view.** Noggin stands on something (a glass floor disc with a soft shadow, a world platform or a card), with generous room around. Never crop the sprout or feet, and never tilt or rotate the whole character.
- **Sizes:** hero ≈ 280–420px wide on desktop and at least 200px on a phone. Wherever the face must read, keep Noggin at least 120px wide. Below that, use the brain mark or a lobe pill instead.
- **Speech bubbles:** white glass, bubble type (Arial bold, sentence case), the tail pointing at Noggin's head, one line at a time, never covering the face.
- **Demo honesty:** a website Noggin may show example fills and moods, but it never shows a real person's numbers or a result the app doesn't produce. Day counts on the site are labelled as examples.
- **Accessibility:** Noggin is decorative unless a moment needs it. Give it `role="img"` and `aria-label="NOGGIN"` only when it carries meaning. Never put information only in Noggin's expression.

## Motion: calm, like Finch

- **Natural speed, more room.** Let a full wave or breath play through, and use holds instead of speed. Nothing is slow-motion and nothing is frantic.
- **Easing:** springs for pop-ins (`spring` token; for text, overshoot only up to 1.04), `soft-out` for moves, and `in-out` for liquid fills. Nothing is linear except counters.
- **Idle loops:** a breath and blink about every 3–4 seconds, and a sprout sway. Pause them when Noggin is off-screen.
- **The liquid is the hero.** A lobe fill rises over about 0.8–1.2s with a gentle surface wobble, then the lobe glows.
- **Celebration:** confetti only for real moments (a lock-in or Full Brain Day), about 60–90 soft pieces in lobe colours, falling slowly. Use one pop, not a loop.
- **Never:** camera shake, full-screen white flashes, glitch or RGB-split effects, speed lines, lens flares, autoplay sound, scroll-jacking or pinned scroll that traps the reader.
- **Scroll reveals** are a soft rise and fade (12–24px). **Above-the-fold content never waits for JavaScript:** it renders visible in the HTML.
- **`prefers-reduced-motion`:** Noggin holds a static pose (idle loops off), reveals become plain fades or none, and fills jump to their final state.

## Layout

- The page gutter is `clamp(20px, 4vw, 40px)`. Content is at most 1200px wide and text lines at most about 34em. The header is 52px.
- **Sections:** one idea each, `section-y` padding, and one hero per section (Noggin, a phone recording or the road card), never two competing heroes.
- **Hero (first screen):** the promise title, a one-line explanation, the App Store badge, and Noggin. On a phone, the title and badge sit above the fold and Noggin enters at the fold.
- **Rhythm:** alternate day and lobe bands. Use the night surface for the evening/Reset story and the final CTA.
- Build mobile-first. Check at 320, 375, 768, 1024 and 1440px. There must be no horizontal scroll.

## Elevation and glass

- **Glass is the GROW surface:** `rgba(255,255,255,.72)` fill, a 1px `rgba(255,255,255,.9)` inner line, `backdrop-filter: blur(16–24px)`, radius `m`/`l`. Lobes and chips are frosted, which is the brand, not an effect.
- **Shadows:** soft and ink-tinted. Cards use `0 12px 40px rgba(11,31,42,.08)`, small items `0 2px 10px rgba(11,31,42,.06)`, and floating hero cards up to `0 18px 50px rgba(11,31,42,.18)`. Never use black shadows or hard edges.
- **Gradients:** only the morning sky, the night stage, lobe water and glow, and the spark sheen on one hero word. Do not use gradient text on body copy or gradient buttons.

## Components

- **Header:** the `GROW` wordmark (Unbounded 800 caps) on the left; two to four caps nav labels; one CTA on the right. It is translucent glass over the page, and its theme flips to light on dark bands.
- **App Store badge:** Apple's official "Download on the App Store" artwork, unmodified, in the black version on light and the white version on dark. Under it, fine print states the subscription honestly. Show it again after each proof section.
- **Buttons / pills:** `button` type in caps with a pill radius. Primary is ink with white text; secondary is glass with ink text. There is one primary per view. The minimum target is 44×44px.
- **Lobe pill:** a caps lobe name plus a dot in the lobe colour, with *-ink text on *-soft (for example `PHYSICAL`, `MENTAL · LOCKED IN`).
- **Action chip (the 6.0 action row):** glass, a lobe icon, a sentence-case action title ("Run 1 mile"), and a check circle that fills in the lobe colour when done.
- **Lock-in pill:** `PHYSICAL · LOCKED IN` with a soft slam-in (a spring, no glitch).
- **Speech bubble:** see Noggin.
- **The road card (the 90-day road from 6.0):** the white card, three 30-day rows with seasons Sprout 1–30 `#2fbf86`, Roots 31–60 `#5fb7ea` and Bloom 61–90 `#8d6fd1`, flags at Day 1 "Hatched", Day 66 "The famous 66" and Day 90, and a mini Noggin token. Copy its geometry from `roadHTML()` in the 6.0 file.
- **Phone frame:** a real app recording inside a clean, modern iPhone frame, scaled to fit width. Never crop the UI's sides.
- **Footer:** company identity (Talon Build LLC), support, Terms / Privacy / Subscription Terms (verbatim legal from `docs/legal`), and contact. There is no newsletter pre-checked.

## Imagery and proof

- **Real product only:** app recordings and screens from the **shipped** build. The 6.0 recordings in `~/Desktop/Grow Montages/Grow 6.0 - Clean UI Showcases` can go live only once they match what is in the App Store.
- **Worlds:** the three 6.0 sector world renders (glass platforms) for PHYSICAL, MENTAL and LIFE backdrops.
- **People:** real founder photos (Marcos and Leo), and real users only with permission. There are no stock "happy app user" photos.
- **Proof:** current App Store rating with its source and date, and permissioned quotes with context. Leave the slot out rather than fake it.

## Do and don't

**Do**
- Lead with Noggin and one sentence of promise; prove it with a real recording right after.
- Answer the three real questions plainly: *What can I track? What happens if I miss a day? What does it cost?*
- Keep every title in caps and every sentence in sentence case.
- Use lobe colours to mean lobes.
- Keep the page quiet enough that Noggin's small movements are what you notice.

**Don't**
- Draw, AI-generate or restyle Noggin.
- Promise a feature the shipped app doesn't have.
- Put white text on LIFE sky, or small white text on PHYSICAL green.
- Add a third font, a fourth character colour, or decorative numbering ("01, 02, 03") for things that aren't steps.
- Make it loud: no shake, flash, glitch, hype copy or urgency.

## Notes for design skills

These are deliberate brand choices. Generic "AI-slop" rules that flag them should be ignored here:
- caps labels and eyebrows (the caps rule);
- frosted glass surfaces and blurred backdrops (the lobes and chips);
- the morning-sky and lobe-water gradients;
- the brain/Noggin SVG art in place of photographs.

The real gaps they point at are welcome: no real product imagery, no dominant first-screen focal point, and too many type sizes.

## Open decisions (for Marcos)

1. **When Noggin goes live on the site.** The live app (5.1) has no Noggin yet. Noggin content stays on the `redesign/noggin` branch until the Noggin build is in the App Store (an optional "coming soon" teaser could run meanwhile).
2. **Tone of the headline:** keep "Lock in." / "What you repeat changes what you become." or move to the warmer Noggin line.
3. **Body font:** keep Arial 500 (site) or switch to the app's system SF stack.
4. **Palette:** keep the app palette (current ruling) or move the site to the brighter North Star social set.
5. **The brain diagram:** does the current HeroBrain diagram stay (for example as a "how it works" figure) once Noggin is the hero?
6. **Wordmark:** the site uses Unbounded text; the montage has a chrome GROW wordmark. Pick one.
