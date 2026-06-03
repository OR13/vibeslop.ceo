import type { MetadataRoute } from "next";

// Required for metadata routes under output: export.
export const dynamic = "force-static";

const BASE = "https://vibeslop.ceo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/exits", "/layoffs"].map((p) => ({
    url: `${BASE}${p}/`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
}
