import type { MetadataRoute } from "next";

import { legalDocs } from "@/content/legal";
import { site } from "@/config/site";

// Static export (GitHub Pages) generates this file at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/brain-test`, changeFrequency: "monthly", priority: 0.5 },
    ...legalDocs.map((d) => ({ url: `${site.url}${d.path}`, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
