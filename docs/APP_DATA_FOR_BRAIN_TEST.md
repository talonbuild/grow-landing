# GROW app data for the website Brain Test (copied verbatim from the app source, 2026-09-18)

Source files: `GROW-Native-V4.1/src/onboarding/assessmentModel.ts`, `src/core/categories.ts`, `src/core/curated.ts`.
The app's own wording. Use the labels exactly; the ids are the app's ids.

## 1. Consistency patterns — the "symptoms" (app comment: "Self-reported experiences, not a diagnosis or scored measurement.")

| Sector | id | Label |
|---|---|---|
| physical | low-energy | Low energy |
| physical | sleep | Poor sleep |
| physical | movement | Inactivity |
| physical | sluggishness | Sluggishness |
| physical | restlessness | Restlessness |
| physical | self-care | Neglected self-care |
| mental | overthinking | Overthinking |
| mental | distractions | Distractibility |
| mental | momentum | Low motivation |
| mental | poor-focus | Poor focus |
| mental | self-doubt | Self-doubt |
| mental | overwhelm | Overwhelm |
| life | procrastination | Procrastination |
| life | routine | Disorganization |
| life | unfinished | Unfinished tasks |
| life | feeling-stuck | Feeling stuck |
| life | restart | Constant restarts |
| life | lack-of-direction | Lack of direction |

## 2. Assessment questions (app onboarding; "These choices never award days or alter action completion.")

- **pattern** — "When you start a new goal, what usually happens?" → I start strong, then lose momentum / I keep planning instead of starting / I take on too much at once / I stay consistent until life gets busy / I'm consistent, but ready for more
- **followThrough** — "How often do your to-dos stay undone?" → Almost every day / A few times a week / About once a week / Occasionally / Rarely
- **position** — "How would you describe your current situation?" → I'm ready for a fresh start / I'm doing okay, but feel stuck / I'm making progress without a rhythm / I have a routine I want to strengthen
- **purpose** — "What matters most about making this change?" → Feel better in my body and mind / Build trust in myself / Move toward a meaningful goal / Create more structure in my life / Show up better for people I care about
- **planChange** — "What usually makes you change your plan?" → Progress feels too slow / My plan asks too much of me / A busy day knocks me off track / A new idea pulls me elsewhere / I tend to stick with my plan
- **outcome** — "What would feel like a win in 30 days?" → Follow through more often / Feel healthier and more energized / Have a calmer, clearer mind / Make visible progress on one goal / Feel proud of a routine I kept
- **recovery** — "When you miss a day, what happens next?" → I get back to it the next day / One missed day often becomes a few / I rethink the whole plan / I wait for a fresh start
- **accountability** — "What do you want GROW to hold you to?" → A few actions I can do every day / Finishing what I said I would do / Returning after an imperfect day / Steady progress toward my goal

## 3. Categories (15) with the app's example actions

| Sector | id | Name | Line | Example actions |
|---|---|---|---|---|
| physical | cardio | CARDIO | Move your body. Build your capacity. | Run 1 mile · Walk 30 minutes · Bike 5 miles |
| physical | strength | STRENGTH | Lift something. Carry more of your life. | Lift weights · 40 push-ups · 3 sets of squats |
| physical | mobility | MOBILITY | Stay loose. Move like you mean it. | Stretch 10 minutes · Morning yoga flow · Hip openers before bed |
| physical | nutrition | NUTRITION | Feed the machine on purpose. | Hit protein target · Cook one real meal · No sugar today |
| physical | hydration | HYDRATION | Water first. Everything runs on it. | Drink 2L of water · Glass of water on waking · Water before every meal |
| mental | focus | FOCUS | One thing at a time, all the way. | 25 minutes deep work · Phone in another room · One task to done |
| mental | calm | CALM | Lower the noise inside. | Meditate 10 minutes · 5 slow breaths at noon · Sit outside quietly |
| mental | reflection | REFLECTION | Watch yourself think. | Journal 10 minutes · Write 3 lines tonight · Review the day |
| mental | confidence | CONFIDENCE | Do the thing that scares you a little. | Speak up once today · Make the hard call · Do one thing badly on purpose |
| mental | resilience | RESILIENCE | Take the hit. Stay in the game. | Cold shower · Finish the hard task first · No complaints today |
| life | money | MONEY | Know your numbers. Own them. | Log every expense · No impulse buys today · Move $5 to savings |
| life | space | SPACE | Your room is your mind. | Make bed · Clear the desk · 10-minute evening reset |
| life | relationships | RELATIONSHIPS | Show up for your people. | Text someone you love · Call home · One real conversation |
| life | responsibility | RESPONSIBILITY | Handle it before it handles you. | Answer the pending email · Pay one bill · Book the appointment |
| life | courage | COURAGE | Ask. Try. Begin. | Ask one question · Start before ready · Say yes to the invite |

## 4. Curated Brainwaves — the "Grow cards" (starting plans a user can pick and customise in the app)

- **STRONG BODY** — "A physical base you can build anything on." → Lift weights (strength) · Walk 30 minutes (cardio) · Drink 2L of water (hydration) · Hit protein target (nutrition) · Cold shower (mental/resilience)
- **SHARP MIND** — "Attention is the skill under every skill." → 25 minutes deep work (focus) · Meditate 10 minutes (calm) · Journal 10 minutes (reflection) · Walk 20 minutes (physical/cardio)
- **BETTER BANK** — "Small money moves, made daily." → Log every expense (money) · No impulse buys today (money) · Handle one pending task (responsibility)
- **5AM** — "Win the morning before the world wakes." → Glass of water on waking (hydration) · Stretch 10 minutes (mobility) · One task before 7am (focus) · Make bed (space)
- **CLEAN SLATE** — "Reset your space, reset your head." → Make bed (space) · 10-minute evening reset (space) · Answer the pending email (responsibility) · Write 3 lines tonight (reflection)

## 5. Rules that must stay true (from the product)
- A Brainwave supports up to ten actions per sector; a good starter plan is small (3–6 actions total).
- Showing Up = one action anywhere; Growing = every action in a sector; Lock-In = every action across every active sector.
- Frequencies at 3, 5, 10, 14, 21, 30, 45, 60, 90 Growing days. Missing a day → Dormant for one cycle; one action brings the streak back.
- Not medical or psychological advice. The patterns are self-reported experiences, not a diagnosis. Never call anything a disorder, condition or symptom in user-facing copy — the app calls them "consistency patterns" / "what's been showing up".
