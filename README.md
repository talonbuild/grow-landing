# Grow — landing page

Pre-launch waitlist site for the GROW app, built like an Apple product page: one scroll, full-bleed colour bands, and the app's own brain as the navigation.

- **Home** — white hero → green *Why Lock In?* → navy *Why Prime?* → silver *See Your Progress* → ink *Lock in.* The background blends between bands as you scroll (`ScrollBackground`); the header flips light/dark to match.
- **The brain** (`src/components/brain/HeroBrain.tsx`) is the app's BrainArt split into three sector layers on a 3D stage: it tilts with the cursor, the sectors drift apart as you scroll, hovering fills a sector and lights its label, and clicking a sector or label scrolls to its section (URL untouched, UTMs intact). Keyboard: Tab to a label, Enter.
- **Pages** — `/about`, `/brain-test` (a real four-step test, below), `/terms`, `/privacy`, `/subscription-terms` (verbatim legal text from `src/content/legal.ts`).
- **Type** — Unbounded for titles, Arial (declared at weight 500) for everything else; nothing renders under 13px at any width. `node scripts/readability-probe.mjs /tmp/probe.json http://localhost:3000` measures overlaps, tiny text and overflow on every page × six viewports and must print only `ok` lines.
- **Motion** — `motion` (framer-motion 13) for scroll-linked work (dial, ladder, reveals); CSS for shine sweeps, water fills and entrances. Everything respects `prefers-reduced-motion`.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · `motion`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run lint
```

## Deploy — GitHub Pages at grow.talonapp.co

The site is a static export (`output: "export"` in `next.config.ts`; `npm run build` writes `./out`). Repo: `talonbuild/grow-landing`. Every push to `main` runs `.github/workflows/deploy.yml` (lint → Brain Test tests → build → deploy to Pages). Pages source is GitHub Actions; custom domain `grow.talonapp.co` (Namecheap CNAME `grow` → `talonbuild.github.io`; `public/CNAME` and `public/.nojekyll` ship in the export).

Build-time settings live as **repository variables** (Settings → Secrets and variables → Actions → Variables): `KIT_FORM_ID` (Kit form ID — public by design), `GA4_ID` (optional). Change one, then re-run the workflow (Actions → Deploy to GitHub Pages → Run workflow) or push.

---

## Where to change things

| What | File |
|---|---|
| Launch state, App Store URL, Kit, social links, analytics IDs, legal draft flag | `src/config/site.ts` |
| Every piece of copy | `src/config/copy.ts` |
| Home sections | `src/components/home/*` (Hero, LockIn, Prime + CycleDial, Progress + FrequencyLadder, FinalCTA) |
| Brain artwork + navigation anchors | `src/components/brain/anatomy.ts` (paths, colours, explode vectors, `LABEL_ANCHORS`) |
| Band colours | each `<Band color=…>` in `src/components/home/*`; header theme follows `theme="light|dark"` |
| Legal text (verbatim) | `src/content/legal.ts` |
| Colors, type scale, motion | `src/app/globals.css` |

### Switching from pre-launch to live

In `src/config/site.ts`:

```ts
launch: {
  status: "live",
  appStoreUrl: "https://apps.apple.com/app/grow/id…",
}
```

The locked "App Store · Coming soon" buttons become real App Store links (swap in Apple's official badge inside `AppStoreButton.tsx` if preferred). The waitlist form stays as the secondary option.

---

## Kit (email)

`GrowSignupForm` (`src/components/GrowSignupForm.tsx`) is the only signup component. It supports two Kit integrations, chosen by `site.kit.mode`:

**`"form"` — recommended.** Grow's own field + button submit to Kit's public form endpoint, the same endpoint Kit's official embed posts to. No API key, no backend.

1. In Kit, create the form (Grow launch list) and set its incentive email to the "Confirm your Grow access" copy.
2. Kit → the form → **Publish** → **HTML**. Find `action="https://app.kit.com/forms/1234567/subscriptions"`.
3. Paste `1234567` into `site.kit.formId` (or set `NEXT_PUBLIC_KIT_FORM_ID` in Vercel).
4. If the form has Kit's spam protection / reCAPTCHA enabled, submissions from a custom UI can be rejected — turn it off for this form, or use mode `"script"`.

**`"script"` — Kit's JavaScript embed.** Kit → **Publish** → **JavaScript** gives `<script async data-uid="…" src="…">`. Paste `data-uid` into `embedUid` and `src` into `embedScriptSrc`, and set `mode: "script"`. Kit renders its own markup; `globals.css` (`.kit-embed`) restyles it to match as closely as Kit's CSS allows.

**Kit's spam guard.** Kit sometimes answers a custom-form submission with `status: "quarantined"` and a guard URL (a reCAPTCHA + Subscribe page). The form then shows "One more step" with a Continue button to that page. In Kit, set the form's *after submit* action to **redirect to `https://grow.talonapp.co/?joined=1`** so people land back here in the signed-up state (the brain fills, success message shows).

**Live form:** ID `9931121` ("Grow — Launch Waitlist & Growth Tips"), set as the `KIT_FORM_ID` repo variable. It is single opt-in (incentive email off), so the success copy does not mention a confirmation email.

**Not configured:** `next dev` shows a labelled placeholder that simulates success. A production build without Kit shows "Signups open very soon" instead of pretending to succeed.

Never add a Kit API key or secret to this project — none is needed.

## Attribution (UTMs)

- UTM parameters are read from the landing URL and **never removed or rewritten**.
- UTMs are kept in `sessionStorage` so they survive a trip to /about or /privacy and back. Brain navigation scrolls without changing the URL.
- Every signup sends Kit a `referrer` of the full landing URL including UTMs. Optionally also send them as Kit custom fields (`site.kit.sendUtmAsCustomFields`, after creating fields named `utm_source` … `utm_term` in Kit).
- Nothing uses `rel="noreferrer"` / `no-referrer`.
- Optional: `launch.appStoreProviderToken` adds Apple campaign parameters (`pt`, `ct`) to App Store links so App Analytics can attribute downloads to the same campaign.

Test link: `/?utm_source=instagram&utm_medium=social&utm_campaign=launch&utm_content=reel_01&utm_term=habits`

## Analytics

Components call `track(event, props)` from `src/lib/analytics.ts`. Every event includes the current UTMs, `page_path` and `launch_status`.

| Event | Fires when |
|---|---|
| `landing_view` | page load (once) |
| `signup_started` | first email-field focus (once) |
| `email_submit` | valid email submitted |
| `email_signup_success` | Kit confirms the subscription |
| `app_store_click` | any Download Grow click (`cta_location`) |

Providers: **GA4** loads automatically when `NEXT_PUBLIC_GA4_ID` is set. **PostHog** is picked up automatically if its snippet defines `window.posthog`. Anything else: `registerAnalyticsProvider((event, props) => …)`. In development, events are logged to the console.

---

## Placeholders to replace before launch

| Placeholder | Where | Notes |
|---|---|---|
| Kit form | `site.kit` | Page works in dev without it; production shows "Signups open very soon". |
| App Store URL | `site.launch.appStoreUrl` | Download buttons render nothing until set. |
| Instagram URL | `site.links.instagram` | Appears in the footer once set. Contact is support@talonapp.co. |
| Wordmark | `src/components/brand/Wordmark.tsx` | "GROW" typeset in Unbounded, matching the app. Not a logo — swap in the official SVG when it exists. |
| Favicon / Apple icon | `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` | Three brain sectors as flat shapes. Replace with the real app icon. |
| Social share image | `src/app/opengraph-image.png` (1200×630) + `.alt.txt` | Built from the live hero brain and headline. |
| Site URL | `NEXT_PUBLIC_SITE_URL` | Falls back to the Vercel production URL. |

## Brain Test

`/brain-test` turns the app's own data into a result in under a minute. Content and the pure scoring function live in `src/content/brainTest.ts`; the stepper UI is `src/components/brain-test/BrainTest.tsx` with its styles in `src/app/brain-test/brain-test.css`.

- **Step 1** — the app's 18 consistency patterns (six per sector, verbatim labels), pick one to six.
- **Steps 2–4** — three of the app's onboarding questions, verbatim: plan size comes from "When you start a new goal…", the recovery line from "When you miss a day…", tie-breaks from "What would feel like a win in 30 days?".
- **Result** — a Grow card: one of the app's five curated Brainwaves (STRONG BODY, SHARP MIND, BETTER BANK, 5AM, CLEAN SLATE) when the picks concentrate on its categories, otherwise a composed starter card (FIRST MOVE / CLEAR SIGNAL / LOOSE ENDS) built from each pattern's mapped action. Shows the actions with sector tags, the brain with fills that show where the plan puts its weight, the first target (3 Growing days), the Dormant rule, the waitlist form and a non-medical line. Answers persist for the session; Retake clears them.
- `node --test tests/brainTest.test.ts` — 24 scoring tests. Analytics: `brain_test_started`, `brain_test_step`, `brain_test_completed`.

## Brand assets used

- **The Grow brain** (`src/components/brand/GrowBrain.tsx`) is a port of the app's own `BrainArt` SVG (GROW V4.1 `src/ui/v41/BrainArt.tsx`): same anatomy paths, glass, folds and water fill. Fill levels are set in `src/app/page.tsx`.
- **Unbounded** (SIL Open Font License) for display type, as in the app; body text uses the system font stack.

## Performance notes

- One web font file; body text uses system fonts.
- Client JavaScript: the signup form, the hero brain, the scroll background, the dial/ladder scrubs and reveals (`motion`). No 3D engine — the brain is inline SVG on CSS 3D transforms.
- All motion respects `prefers-reduced-motion` (tilt, drift, shine and scrubs switch off; content is simply visible). Without JavaScript the page still renders and the form posts to Kit directly.
