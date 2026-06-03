import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — without this Turbopack walks up and finds the
  // parent overmind monorepo's bun.lock, picking the wrong root.
  turbopack: { root: __dirname },
  // Emit a fully static site into ./out — no server required.
  output: "export",
  // GitHub Pages serves directories; trailing slashes map /exits -> /exits/index.html.
  trailingSlash: true,
  // next/image optimization needs a server; disable it for static hosting.
  images: { unoptimized: true },
};

export default nextConfig;
