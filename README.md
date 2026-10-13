# Grow — landing page

The public website for GROW, available on the App Store for iPhone and iPad. The site sends visitors directly to [GROW's App Store listing](https://apps.apple.com/us/app/grow-daily-habit-tracker/id6758687009). A subscription is required.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · `motion` · GitHub Pages static export.

## Run and check

```bash
npm install
npm run dev                         # http://localhost:3000
npm run lint
node --test tests/brainTest.test.ts  # 24 scoring tests
npm run build                       # type-checks and writes ./out
```

For browser layout checks with the site running:

```bash
node scripts/readability-probe.mjs /tmp/probe.json http://localhost:3000
```

The probe checks overlapping text, small text and overflow across the public pages at six viewport sizes. These commands document the validation workflow; they are not a record of its latest results.

## Site structure

- **Home** — the app's brain artwork, followed by Why Lock In?, Why Prime?, See Your Progress and a final download prompt. The brain's three sector labels link to the corresponding sections and support keyboard navigation.
- **About** — the story from Marcos and Leo, with a direct App Store link.
- **Brain Test** — four steps produce a starter Brainwave and suggested actions, followed by an App Store button. It does not submit answers or transfer a plan into the app.
- **Legal** — `/terms`, `/privacy` and `/subscription-terms`, using the text in `src/content/legal.ts`.

The main calls to action link to the live App Store listing. The website's launch waitlist forms have been removed from the public pages. The Kit component remains in the codebase for possible future use; no signup is needed to reach the app.

The daily GROW cycle runs from **5:00 a.m. to 5:00 a.m.** Morning Prime and evening Reset rituals support the routine; completed actions earn growth.

## Where to change things

| What | File |
|---|---|
| App Store URL and ID, launch state, site origin, analytics IDs | `src/config/site.ts` |
| Shared marketing copy and cycle times | `src/config/copy.ts` |
| Home sections | `src/components/home/*` |
| App Store button and tracked link | `src/components/site/AppStoreButton.tsx`, `src/components/CtaLinks.tsx` |
| Brain Test copy, data and scoring | `src/content/brainTest.ts` |
| Brain Test interface | `src/components/brain-test/BrainTest.tsx` |
| Brain artwork and navigation anchors | `src/components/brain/anatomy.ts` |
| Legal text | `src/content/legal.ts` |
| Colors, typography and motion | `src/app/globals.css` |

### App Store settings

`site.launch.status` is `"live"`. `site.launch.appStoreUrl` points to app ID `6758687009`, also stored as `site.launch.appStoreId` for the iOS Smart App Banner. App Store links use the shared component so click attribution is consistent.

Updating configuration does not rewrite copy or swap components automatically. If availability changes, update the page and Brain Test copy alongside the configuration.

## Deploy — GitHub Pages

Repo: `talonbuild/grow-landing`. Every push to `main` runs `.github/workflows/deploy.yml`: install, lint, Brain Test scoring tests, build and deploy. Pages source must be **GitHub Actions**. The custom domain is `grow.talonapp.co`; `public/CNAME` and `public/.nojekyll` ship in the export.

`output: "export"` and `trailingSlash: true` in `next.config.ts` produce a standalone `out` directory. No application server is needed. Preview the complete exported directory rather than copying a generated HTML file by itself; it references the generated `_next` assets.

The workflow sets `NEXT_PUBLIC_SITE_URL` to `https://grow.talonapp.co`. Repository variable `GA4_ID` optionally enables analytics. The legacy `KIT_FORM_ID` variable is still passed through, but the current public pages do not render a signup form. Changes to repository variables require another workflow run.

## Attribution and analytics

UTM parameters remain on the landing URL and are remembered in `sessionStorage` for navigation between site pages. The brain navigation scrolls without changing the URL. App Store clicks call `track("app_store_click", { cta_location })`.

Optional `site.launch.appStoreProviderToken` adds Apple's `pt` and `ct` campaign parameters to the App Store destination. Without a provider token, links use the configured URL directly.

| Event | Trigger |
|---|---|
| `landing_view` | Initial page load; not repeated by client-side navigation |
| `app_store_click` | Shared App Store link clicked |
| `brain_test_started` | Test started or retaken |
| `brain_test_step` | Valid step completed |
| `brain_test_completed` | Result generated |

Events include UTMs, `page_path` and `launch_status`. GA4 loads when `NEXT_PUBLIC_GA4_ID` is set. An existing `window.posthog` is used if provided; another provider can register through `registerAnalyticsProvider` in `src/lib/analytics.ts`. Development builds log events to the console. Configuring a provider is necessary to collect production analytics.

## Brain Test

Step 1 offers the app's 18 consistency patterns, six per sector; choose one to six. Steps 2–4 ask about goals, recovery and a desired outcome. The pure `scoreBrainTest` function chooses a curated Brainwave or composes a starter card, with suggested actions, a target of three Growing days and recovery guidance.

Only answers are stored in browser `sessionStorage`, and results are recomputed from them. Retake clears the answers. No backend receives them, and the App Store link does not contain them. The scoring tests cover the existing patterns, plan sizes, card selection and recovery behavior.

## Brand and performance

The brain uses the app's anatomy, glass, folds and water fills as inline SVG with CSS 3D transforms. No 3D engine is included. Unbounded supplies the display typography; body text uses system fonts.

Reduced-motion preferences disable the tilt, recurring CSS animation and scroll effects. App Store links work without JavaScript; the interactive Brain Test needs JavaScript. Keep marketing content visible if enhancement scripts are unavailable.

## Legacy Kit integration

`src/components/GrowSignupForm.tsx` remains available but is not used by the live download pages. It supports a public form endpoint or Kit's script embed, with validation, error states and optional UTM fields. Never add a Kit API key or secret: the public form ID is sufficient. Before reintroducing email signup, update its purpose, consent and confirmation copy, and verify the chosen form's behavior.
