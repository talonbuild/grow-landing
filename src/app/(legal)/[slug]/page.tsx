import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageEffects } from "@/components/PageEffects";
import { Band } from "@/components/site/Band";
import { SiteFooter } from "@/components/site/SiteFooter";
import { legalDocs } from "@/content/legal";

/** Route segment → document. /terms, /privacy, /subscription-terms */
const byRoute = Object.fromEntries(legalDocs.map((d) => [d.path.slice(1), d]));

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.path.slice(1) }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = byRoute[slug];
  if (!doc) return {};
  return { title: doc.title, description: doc.intro, alternates: { canonical: doc.path } };
}

export default async function LegalPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const doc = byRoute[slug];
  if (!doc) notFound();

  return (
    <main id="main">
      <Band color="#ffffff" theme="light" className="page" labelledBy="legal-title">
        <article className="page-inner page-narrow legal">
          <nav aria-label="Legal documents" className="legal-nav">
            {legalDocs.map((d) => (
              <Link key={d.slug} href={d.path} aria-current={d.slug === doc.slug ? "page" : undefined}>
                {d.title}
              </Link>
            ))}
          </nav>
          <h1 id="legal-title" className="display-page">
            {doc.title}
          </h1>
          <p className="legal-updated">{doc.updated}</p>
          <p className="legal-intro">{doc.intro}</p>
          <div className="legal-body">
            {doc.blocks.map((b, i) =>
              b.type === "h" ? (
                <h2 key={i}>{b.text}</h2>
              ) : b.type === "ul" ? (
                <ul key={i}>
                  {b.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.text}</p>
              ),
            )}
          </div>
        </article>
      </Band>
      <SiteFooter />
      <PageEffects />
    </main>
  );
}
