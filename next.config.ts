import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (grow.talonapp.co). `next build` writes the whole site
 * to ./out — plain HTML, CSS and JS. No server, no image optimizer.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
