/**
 * GROW legal text — published VERBATIM from the legal artifact (18 September 2026).
 * The app shows the identical text; the two must not drift. Do not edit copy here —
 * update the source document and regenerate.
 */

export type LegalBlock = { type: "h"; text: string } | { type: "p"; text: string } | { type: "ul"; items: string[] };

export interface LegalDoc {
  slug: string;
  title: string;
  path: string;
  updated: string;
  intro: string;
  blocks: LegalBlock[];
}

export const legalDocs: LegalDoc[] = [
  {
    "slug": "terms",
    "title": "Terms of Use",
    "path": "/terms",
    "updated": "Last updated 18 September 2026",
    "intro": "The agreement between you and Talon Build LLC for using GROW.",
    "blocks": [
      {
        "type": "h",
        "text": "Who we are"
      },
      {
        "type": "p",
        "text": "GROW is made by Talon Build LLC (\"we\", \"us\"). You can reach a person at support@talonapp.co."
      },
      {
        "type": "p",
        "text": "These Terms are the agreement between you and us for the GROW app. By using GROW you accept them. If you do not accept them, please do not use the app."
      },
      {
        "type": "h",
        "text": "Who may use GROW"
      },
      {
        "type": "p",
        "text": "You must be at least 13 years old to use GROW. If you are under 18, you may only use it with the permission of a parent or guardian, who accepts these Terms with you."
      },
      {
        "type": "p",
        "text": "If we learn that an account belongs to someone under 13, we will delete it and everything on it."
      },
      {
        "type": "h",
        "text": "What GROW is"
      },
      {
        "type": "p",
        "text": "GROW helps you choose a small set of daily actions, keep them, and see your consistency over time. It is a tool for building habits."
      },
      {
        "type": "h",
        "text": "GROW is not medical or psychological advice"
      },
      {
        "type": "p",
        "text": "GROW is not a medical device, a therapist, a doctor or a substitute for professional care. Nothing in the app is a diagnosis, a treatment, or advice about your health, your mind or your medication."
      },
      {
        "type": "p",
        "text": "If you are struggling with your health or your mental health, speak to a qualified professional. If you are in danger or in crisis, contact your local emergency services immediately."
      },
      {
        "type": "p",
        "text": "You are responsible for the actions you choose to perform and for deciding whether they are safe and suitable for you."
      },
      {
        "type": "h",
        "text": "Your account"
      },
      {
        "type": "p",
        "text": "GROW gives you an account the first time you open it, so your progress is saved from the beginning. You can later attach that account to your Apple ID or Google account, which is how you get back into it on another phone."
      },
      {
        "type": "p",
        "text": "Keep your Apple ID and Google account secure. Anyone who can sign in as you can see and change everything in your GROW account."
      },
      {
        "type": "p",
        "text": "One account is for one person. Do not share it, sell it or transfer it."
      },
      {
        "type": "h",
        "text": "What you write stays yours"
      },
      {
        "type": "p",
        "text": "Your reflections, the names you give your Brainwave and your actions, and everything else you write in GROW belong to you. We do not claim ownership of them."
      },
      {
        "type": "p",
        "text": "You give us only the permission we need to run the service for you: to store your content, to show it back to you, to back it up, and to move it between our systems. We do not sell it, publish it, use it to train anything, or show it to anyone else — except where the law requires us to, and then only what the law requires."
      },
      {
        "type": "p",
        "text": "You can delete everything at any time from Settings, and it is erased."
      },
      {
        "type": "h",
        "text": "Subscriptions"
      },
      {
        "type": "p",
        "text": "Parts of GROW require a paid subscription. Purchases are made through the App Store, and the Subscription Terms document explains the price, the free trial, renewal, cancellation and refunds. Those terms form part of this agreement."
      },
      {
        "type": "h",
        "text": "Using GROW fairly"
      },
      {
        "type": "ul",
        "items": [
          "Do not use GROW for anything unlawful, or to harm, harass or impersonate anyone.",
          "Do not try to break, overload, probe or gain unauthorised access to the app or our systems.",
          "Do not copy, reverse engineer, decompile or resell the app, or extract its content in bulk.",
          "Do not use automated systems to access the service."
        ]
      },
      {
        "type": "h",
        "text": "The app will change"
      },
      {
        "type": "p",
        "text": "We improve GROW continuously, and we may add, change or remove features. We may also suspend or stop the service. If we stop it for good, we will give you reasonable notice and a way to get your data out where that is possible."
      },
      {
        "type": "p",
        "text": "The app needs a working internet connection for some things, and an up-to-date version of iOS. We do not promise it will always be available or free of faults."
      },
      {
        "type": "h",
        "text": "Ending this agreement"
      },
      {
        "type": "p",
        "text": "You can stop at any time by deleting your account in Settings, which erases your data. Deleting the app alone does not cancel a subscription — see the Subscription Terms."
      },
      {
        "type": "p",
        "text": "We may suspend or end your access if you break these Terms, if we are required to by law, or if your account is used in a way that puts other people or our systems at risk. We will tell you why unless we are legally prevented from doing so."
      },
      {
        "type": "h",
        "text": "No warranties"
      },
      {
        "type": "p",
        "text": "GROW is provided \"as is\" and \"as available\". To the fullest extent the law allows, we make no warranties of any kind, express or implied, including any implied warranty of merchantability, fitness for a particular purpose, or non-infringement."
      },
      {
        "type": "p",
        "text": "We do not promise that GROW will produce any particular result, that it will suit your purpose, or that it will be uninterrupted, timely, secure or error-free."
      },
      {
        "type": "h",
        "text": "Limits on our liability"
      },
      {
        "type": "p",
        "text": "To the fullest extent the law allows, we are not liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, lost data, or losses arising from your use of or inability to use GROW."
      },
      {
        "type": "p",
        "text": "Where we are liable, our total liability to you for all claims is limited to the greater of the amount you paid us in the twelve months before the claim, or twenty-five US dollars."
      },
      {
        "type": "p",
        "text": "Some places do not allow these limits. Where that is the case, they apply to you only as far as the law allows, and nothing here removes a right you have that cannot be removed."
      },
      {
        "type": "h",
        "text": "Your responsibility to us"
      },
      {
        "type": "p",
        "text": "If someone brings a claim against us because of how you used GROW or because you broke these Terms, you agree to cover the reasonable costs and damages that result, to the extent the law allows."
      },
      {
        "type": "h",
        "text": "Apple"
      },
      {
        "type": "p",
        "text": "This agreement is between you and us, not Apple, and Apple is not responsible for GROW or its content."
      },
      {
        "type": "p",
        "text": "Apple has no obligation to provide support or maintenance for GROW. If GROW fails to conform to any applicable warranty, you may tell Apple, and Apple will refund the purchase price if a refund applies; beyond that, Apple has no other warranty obligation for GROW."
      },
      {
        "type": "p",
        "text": "Apple is not responsible for addressing any claim about GROW, including product liability claims, claims that GROW fails to meet a legal requirement, and claims under consumer protection or similar law. Apple is not responsible for investigating, defending, settling or discharging any third-party claim that GROW infringes intellectual property rights."
      },
      {
        "type": "p",
        "text": "You confirm that you are not located in a country subject to a US Government embargo or designated as a \"terrorist supporting\" country, and that you are not on any US Government list of prohibited or restricted parties."
      },
      {
        "type": "p",
        "text": "Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against you."
      },
      {
        "type": "h",
        "text": "Changes to these Terms"
      },
      {
        "type": "p",
        "text": "We may update these Terms. If a change matters to you, we will tell you in the app or by email before it takes effect. Continuing to use GROW after that means you accept the new version. The date at the top of this document tells you when it last changed."
      },
      {
        "type": "h",
        "text": "Law and disputes"
      },
      {
        "type": "p",
        "text": "These Terms are governed by the laws of the State of Delaware, United States, without regard to its conflict of law rules."
      },
      {
        "type": "p",
        "text": "Before starting any formal dispute, please write to us at support@talonapp.co. Most things are resolved that way, quickly. If a dispute cannot be resolved, it will be handled by the state or federal courts located in Delaware, and both of us agree to their jurisdiction — unless the law of the place where you live gives you the right to bring it somewhere else, in which case that right stands."
      },
      {
        "type": "p",
        "text": "If any part of these Terms is found unenforceable, the rest continues to apply."
      },
      {
        "type": "h",
        "text": "Contact"
      },
      {
        "type": "p",
        "text": "Talon Build LLC — support@talonapp.co"
      },
      {
        "type": "p",
        "text": "English is the authoritative version of this document."
      }
    ]
  },
  {
    "slug": "privacy",
    "title": "Privacy Policy",
    "path": "/privacy",
    "updated": "Last updated 18 September 2026",
    "intro": "What GROW collects, why, who processes it, and how to get rid of it.",
    "blocks": [
      {
        "type": "h",
        "text": "The short version"
      },
      {
        "type": "ul",
        "items": [
          "We collect what the app needs to work, and nothing to sell.",
          "There is no advertising in GROW, no advertising identifier, and no tracking of you across other apps or websites.",
          "Your reflections are yours. We do not read them, sell them, publish them or train anything on them.",
          "We never see your card details. Apple takes the payment.",
          "Deleting your account erases everything, including your email address, immediately."
        ]
      },
      {
        "type": "h",
        "text": "Who is responsible"
      },
      {
        "type": "p",
        "text": "Talon Build LLC is responsible for the personal data described here. Write to support@talonapp.co about anything in this document, including a request to see or delete your data."
      },
      {
        "type": "h",
        "text": "What you give us"
      },
      {
        "type": "ul",
        "items": [
          "A username, and the age range you pick during onboarding.",
          "Your answers to the onboarding questions.",
          "The Brainwave you build: the actions you choose and the names you give them.",
          "Your reflections — the things you write in the app.",
          "Feedback or a bug report, if you send one, together with the address you ask us to reply to."
        ]
      },
      {
        "type": "h",
        "text": "What the app records as you use it"
      },
      {
        "type": "ul",
        "items": [
          "Which actions you ticked and when, and how a day felt if you say so.",
          "Your rituals, your streaks, your Frequencies and your history.",
          "Your time zone, so a day starts and ends at the right moment for you.",
          "Whether you have turned reminders on."
        ]
      },
      {
        "type": "h",
        "text": "What we receive when you sign in"
      },
      {
        "type": "p",
        "text": "GROW gives you an account the first time you open it, before you have told us anything about yourself. It is identified by a random id, not by your name."
      },
      {
        "type": "p",
        "text": "If you attach your Apple ID or Google account, we receive a stable identifier from Apple or Google and your email address, so we can recognise you when you come back. We do not receive your password. If you use Sign in with Apple and choose to hide your email, we only ever see the relay address Apple gives us."
      },
      {
        "type": "h",
        "text": "Payments"
      },
      {
        "type": "p",
        "text": "Your subscription is bought through the App Store. Apple takes the payment; we never see your card, and we could not charge it if we wanted to."
      },
      {
        "type": "p",
        "text": "Our payments provider, RevenueCat, records the transaction, which plan you are on and when it renews or ends, so the app knows what you are entitled to."
      },
      {
        "type": "h",
        "text": "What we measure"
      },
      {
        "type": "p",
        "text": "We record how the app is used — which screens are reached, which steps are completed, whether an action was ticked — along with your device model, its operating system version and the app version. These events are linked to your GROW account id, not to your name or email."
      },
      {
        "type": "p",
        "text": "We use this to see where the app confuses people and to fix it. It is not advertising, it is not sold, and it is not shared for anyone else's purposes."
      },
      {
        "type": "h",
        "text": "What we never collect"
      },
      {
        "type": "ul",
        "items": [
          "No advertising identifier (IDFA) and no advertising.",
          "No tracking of you across other companies' apps or websites.",
          "No location.",
          "No contacts, microphone or camera.",
          "No photos — the plan image you save goes straight to your own photo library, and we never see it.",
          "No health, fitness or medical records."
        ]
      },
      {
        "type": "h",
        "text": "Reminders stay on your phone"
      },
      {
        "type": "p",
        "text": "GROW's reminders are scheduled by your iPhone, not sent from a server. We do not know whether one was delivered, and we do not need to."
      },
      {
        "type": "h",
        "text": "Why we are allowed to hold it"
      },
      {
        "type": "p",
        "text": "If you are in the UK or the European Economic Area, the lawful bases are: performing our contract with you (running the app and your subscription), our legitimate interests (keeping the service working, secure and improving), and your consent where you have given it (notifications). You can withdraw consent at any time in Settings."
      },
      {
        "type": "h",
        "text": "Who processes it for us"
      },
      {
        "type": "p",
        "text": "We keep this list short on purpose. Each of these companies acts on our instructions and may only use your data to provide their service to us."
      },
      {
        "type": "ul",
        "items": [
          "Appwrite — stores your account and everything in it. United States.",
          "RevenueCat — records your subscription and what it entitles you to. United States.",
          "PostHog — product analytics. United States.",
          "Resend — delivers the feedback message you choose to send us. United States.",
          "Apple and Google — sign-in, and in Apple's case the payment itself."
        ]
      },
      {
        "type": "h",
        "text": "Where your data is"
      },
      {
        "type": "p",
        "text": "Our systems are in the United States. If you are outside the United States, using GROW means your data is transferred there. Where the law requires a transfer mechanism for data leaving the UK or the European Economic Area, we rely on the European Commission's standard contractual clauses with the companies above."
      },
      {
        "type": "h",
        "text": "How long we keep it"
      },
      {
        "type": "p",
        "text": "We keep your data while your account exists. When you delete your account in Settings, we erase it — your profile, your Brainwave, your history, your reflections and the email address attached to your sign-in — immediately and completely."
      },
      {
        "type": "p",
        "text": "Two things can outlive the account: records Apple holds about your purchase, which are Apple's and governed by Apple's policy, and anything we must keep by law (for example, tax records of a payment). Analytics events that were already recorded are anonymous once the account they referred to is gone."
      },
      {
        "type": "h",
        "text": "Your rights"
      },
      {
        "type": "p",
        "text": "Wherever you live, you can ask us to show you what we hold, correct it, delete it, or give you a copy. The fastest way to delete everything is Settings → Account → Delete account, which does it immediately. For anything else, write to support@talonapp.co."
      },
      {
        "type": "p",
        "text": "If you are in the UK or the EEA you also have the right to object to processing based on legitimate interests, to ask us to restrict it, and to complain to your data protection authority."
      },
      {
        "type": "p",
        "text": "If you are in California: we do not sell your personal information and we do not share it for cross-context behavioural advertising. We have not done so in the past twelve months. Exercising your rights will never get you worse service."
      },
      {
        "type": "h",
        "text": "Children"
      },
      {
        "type": "p",
        "text": "GROW is not for children under 13, and we do not knowingly collect anything from them. If you believe a child under 13 has an account, write to support@talonapp.co and we will delete it and everything on it."
      },
      {
        "type": "h",
        "text": "Security"
      },
      {
        "type": "p",
        "text": "Everything travels encrypted between your phone and our systems. Your data is stored on your account, reachable only by a signed-in session belonging to you. Access to our systems is limited to the people who need it to run the service."
      },
      {
        "type": "p",
        "text": "No system is perfect. If a breach ever affects your data, we will tell you and the relevant authority as the law requires."
      },
      {
        "type": "h",
        "text": "Changes to this policy"
      },
      {
        "type": "p",
        "text": "If we change what we collect or why, we will update this document and tell you in the app before the change takes effect. The date at the top shows when it last changed."
      },
      {
        "type": "h",
        "text": "Contact"
      },
      {
        "type": "p",
        "text": "Talon Build LLC — support@talonapp.co"
      },
      {
        "type": "p",
        "text": "English is the authoritative version of this document."
      }
    ]
  },
  {
    "slug": "subscription",
    "title": "Subscription Terms",
    "path": "/subscription-terms",
    "updated": "Last updated 18 September 2026",
    "intro": "What you are paying for, when you are charged, and how to stop.",
    "blocks": [
      {
        "type": "h",
        "text": "What a subscription gives you"
      },
      {
        "type": "p",
        "text": "A GROW subscription unlocks the whole app: your Brainwave, the daily loop, your living brain and progress, the Prime and Reset rituals, reflections and everything that comes with them."
      },
      {
        "type": "h",
        "text": "The plans"
      },
      {
        "type": "p",
        "text": "The exact price, in your own currency, is shown on the plan screen before you buy, and it is the price that applies. Prices differ between countries and can change over time."
      },
      {
        "type": "ul",
        "items": [
          "Yearly — billed once a year, and it begins with a free trial.",
          "Monthly — billed every month, with no trial."
        ]
      },
      {
        "type": "h",
        "text": "The free trial"
      },
      {
        "type": "p",
        "text": "The yearly plan starts with a free trial of the length shown on the plan screen. You are not charged during the trial."
      },
      {
        "type": "p",
        "text": "Unless you cancel at least 24 hours before the trial ends, it turns into a paid year automatically and your Apple ID is charged."
      },
      {
        "type": "p",
        "text": "A trial is once per person. If you have had one before, or you already have a subscription, any unused part of it is forfeited when you subscribe."
      },
      {
        "type": "h",
        "text": "Automatic renewal"
      },
      {
        "type": "p",
        "text": "Subscriptions renew automatically. Your Apple ID is charged within 24 hours before the current period ends, and the subscription continues for another period of the same length at the price then in effect."
      },
      {
        "type": "p",
        "text": "It keeps renewing until you cancel. Cancelling at least 24 hours before the period ends stops the next charge."
      },
      {
        "type": "h",
        "text": "How to cancel"
      },
      {
        "type": "p",
        "text": "Cancel in your Apple account, not in GROW — we cannot cancel it for you: open the iPhone Settings app, tap your name, tap Subscriptions, choose GROW, then Cancel Subscription. You can also reach the same page from GROW under Settings → Manage subscriptions."
      },
      {
        "type": "p",
        "text": "When you cancel you keep everything you paid for until the end of the period you already paid for. Nothing is lost from your account when it ends — your Brainwave and your history are still there if you come back."
      },
      {
        "type": "h",
        "text": "Refunds"
      },
      {
        "type": "p",
        "text": "Apple handles all payments and therefore all refunds. We cannot issue one. Ask Apple at reportaproblem.apple.com."
      },
      {
        "type": "p",
        "text": "Where the law where you live gives you a right to withdraw or a refund, that right stands regardless of anything here."
      },
      {
        "type": "h",
        "text": "Price changes"
      },
      {
        "type": "p",
        "text": "If we change the price of a plan, the new price applies from your next renewal. Apple will tell you in advance, and where Apple requires your agreement, your subscription will not renew at the new price until you give it."
      },
      {
        "type": "h",
        "text": "Getting a subscription back"
      },
      {
        "type": "p",
        "text": "If you reinstall GROW, change phone, or sign in somewhere else, tap Restore Purchases on the plan screen or in Settings → Manage subscriptions. Your subscription belongs to your account and to the Apple ID that bought it."
      },
      {
        "type": "h",
        "text": "Family Sharing"
      },
      {
        "type": "p",
        "text": "GROW subscriptions are not shared through Apple Family Sharing."
      },
      {
        "type": "h",
        "text": "The rest"
      },
      {
        "type": "p",
        "text": "These Subscription Terms are part of the Terms of Use, and the Privacy Policy explains what we hold about your subscription. If something here conflicts with Apple's own terms for a purchase you made through the App Store, Apple's terms govern that purchase."
      },
      {
        "type": "p",
        "text": "Questions about a payment: support@talonapp.co."
      }
    ]
  }
];

export const legalBySlug = Object.fromEntries(legalDocs.map((d) => [d.slug, d])) as Record<string, LegalDoc>;
