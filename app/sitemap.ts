import type { MetadataRoute } from "next";

// Required for metadata routes under output: export.
export const dynamic = "force-static";

const BASE = "https://vibeslop.ceo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site; boards are hash fragments (#exits / #layoffs), which are
  // not separate indexable URLs, so the sitemap lists only the root.
  return [
    {
      url: `${BASE}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
