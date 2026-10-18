@AGENTS.md

## Design tools (installed 2026-10-17, project-scoped in `.claude/skills/`)

`.claude/skills/` is gitignored (public repo). To restore on a fresh clone: `npx skills experimental_install` (reads `skills-lock.json`), then `npm install -g @playwright/cli@latest && playwright-cli install --skills claude`.

- `design-taste-frontend`: art direction for web pages. Its scripts need a Chromium browser; `CHROME_PATH` is set in `.claude/settings.local.json` to Playwright's Chrome for Testing. Working files go to `.taste-skill/` (gitignored).
- `image-to-code`: written for Codex; it wants to generate mockup images first. Claude Code has no built-in image generation, so use an image tool (Higgsfield, Figma, Firefly) only when asked, for layout mockups only. Never generate Noggin; draw it from the real rig.
- `web-design-guidelines`: fetches Vercel's latest rules from GitHub on each run, then reviews the named files.
- `playwright-cli`: browser automation (global CLI, config in `.playwright/cli.config.json`). Web only; it cannot drive the native GROW app.

GROW's existing brand always wins over a skill's house style: keep the colours, type and brain/Noggin art in `src/app/globals.css`, `src/config/` and `src/components/brain/` unless Marcos asks for a change.

## Design references (on demand only)

84 brand DESIGN.md files (VoltAgent/awesome-design-md) live outside this repo at `~/Developer/design-references/awesome-design-md/design-md/<brand>/DESIGN.md`. Open one only when asked to compare with or borrow from a named brand. Never copy one into this repo or apply it as GROW's style.
