import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Arrive } from "@/components/home-day/Arrive";
import { Device } from "@/components/home-day/Device";
import { WorldsCarousel } from "@/components/home-day/WorldsCarousel";
import { PageEffects } from "@/components/PageEffects";
import { AppStoreButton } from "@/components/site/AppStoreButton";
import { SiteFooter } from "@/components/site/SiteFooter";
import { home, type Headline, type Screen } from "@/content/home";

import "./home.css";

export const metadata: Metadata = {
  title: { absolute: home.meta.title },
  description: home.meta.description,
  alternates: { canonical: "/" },
  openGraph: { title: home.meta.title, description: home.meta.description, url: "/" },
  twitter: { title: home.meta.title, description: home.meta.description },
};

/** A two-line headline with its one accent word, as in the App Store set. */
function Title({ lines, as: Tag = "h2", id }: { lines: Headline; as?: "h1" | "h2"; id?: string }) {
  return (
    <Tag className="gd-title" id={id}>
      {lines.map((line, i) => (
        <span key={i} className="gd-line">
          {line.map((p, j) => (p.accent ? <em key={j}>{p.text}</em> : <span key={j}>{p.text}</span>))}
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

/** A real recording in the phone frame, or a still of the phone. */
function Screen({ screen }: { screen: Screen }) {
  if (screen.video && screen.poster) return <Device video={screen.video} poster={screen.poster} alt={screen.alt} />;
  return <Phone src={screen.src!} alt={screen.alt} />;
}

function Phone({ src, alt, priority = false, className = "" }: { src: string; alt: string; priority?: boolean; className?: string }) {
  return (
    <Image
      className={`gd-phone ${className}`}
      src={src}
      alt={alt}
      width={640}
      height={1308}
      priority={priority}
      sizes="(max-width: 48rem) 70vw, 360px"
    />
  );
}

function Noggin({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <Image className={`gd-noggin ${className}`} src={src} alt={alt} width={1000} height={1000} sizes="(max-width: 48rem) 52vw, 420px" />;
}

export default function Home() {
  const { hero, cards, worlds, widgets, faq, final } = home;
  const [how, medal, night, waits, day90] = cards;

  const card = (c: (typeof cards)[number], side: "left" | "right") => (
    <Arrive key={c.id} id={c.id} className="gd-card gd-split" data-tone={c.tone} data-side={side} aria-labelledby={`${c.id}-title`}>
      <div className="gd-words">
        <Title lines={c.headline} id={`${c.id}-title`} />
        <p className="gd-sub">{c.sub}</p>
        <p className="gd-body">{c.body}</p>
      </div>
      <div className="gd-visual">
        <Screen screen={c.phone} />
        {c.noggin && <Noggin src={c.noggin.src} alt={c.noggin.alt} className="gd-float" />}
      </div>
    </Arrive>
  );

  return (
    <main id="main" className="gd">
      {/* Dawn: the promise */}
      <section className="gd-card gd-hero" data-tone="dawn" aria-labelledby="hero-title">
        <div className="gd-hero-words">
          <Title lines={hero.headline} as="h1" id="hero-title" />
          <p className="gd-sub">{hero.sub}</p>
          <div className="gd-cta">
            <AppStoreButton location="hero" />
            <p className="gd-note">{hero.note}</p>
          </div>
        </div>
        <div className="gd-hero-visual">
          <Phone
            src="/media/kit/phone-app-front-home-day3-1.webp"
            alt="GROW Home on Day 3: days showing up, Noggin, and the three lobes Physical, Mental and Life."
            priority
            className="gd-hero-phone"
          />
          <Image
            className="gd-noggin gd-hero-noggin gd-float"
            src="/media/kit/noggin-3d-wave.webp"
            alt="Noggin, a little brain with green, blue and sky-blue lobes, waving."
            width={1100}
            height={1100}
            priority
            sizes="(max-width: 48rem) 46vw, 380px"
          />
        </div>
      </section>

      {card(how, "right")}

      {/* Midday: the three worlds */}
      <Arrive id="worlds" className="gd-card gd-worlds" data-tone="sky" aria-labelledby="worlds-title">
        <div className="gd-center">
          <Title lines={worlds.headline} id="worlds-title" />
          <p className="gd-sub">{worlds.sub}</p>
        </div>
        <WorldsCarousel items={worlds.items} />
      </Arrive>

      {card(medal, "left")}

      {/* Evening: widgets */}
      <Arrive className="gd-card gd-widgets" data-tone="lilac" aria-labelledby="widgets-title">
        <div className="gd-center">
          <Title lines={widgets.headline} id="widgets-title" />
          <p className="gd-sub">{widgets.sub}</p>
        </div>
        <div className="gd-widget-art">
          <Image src={widgets.src} alt={widgets.alt} width={1300} height={868} sizes="(max-width: 48rem) 92vw, 1040px" />
        </div>
      </Arrive>

      {card(night, "right")}
      {card(waits, "left")}
      {card(day90, "right")}

      <Arrive id="faq" className="gd-card gd-faq" data-tone="paper" aria-labelledby="faq-title">
        <h2 className="gd-title gd-faq-title" id="faq-title">
          {faq.title}
        </h2>
        <div className="gd-faq-list">
          {faq.items.map((it) => (
            <details key={it.q} className="gd-q">
              <summary>{it.q}</summary>
              <p>
                {it.a}
                {it.link && (
                  <>
                    {" "}
                    <Link href={it.link.href}>{it.link.label}</Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </Arrive>

      <Arrive className="gd-card gd-final" data-tone="dawn" aria-labelledby="final-title">
        <Image className="gd-icon" src="/media/kit/brand-app-icon.webp" alt="The GROW app icon" width={256} height={256} />
        <Title lines={final.headline} id="final-title" />
        <p className="gd-sub">{final.sub}</p>
        <div className="gd-cta">
          <AppStoreButton location="final" />
          <p className="gd-note">{hero.note}</p>
        </div>
      </Arrive>

      <SiteFooter />
      <PageEffects />
    </main>
  );
}
