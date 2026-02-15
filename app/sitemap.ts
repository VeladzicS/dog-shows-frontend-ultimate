import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dogshows.showsightmagazine.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1.0 },
    {
      url: `${BASE_URL}/judges`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dogs`,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Monthly archive pages for 2026
  for (let m = 1; m <= 12; m++) {
    const month = String(m).padStart(2, "0");
    entries.push({
      url: `${BASE_URL}/events/month/2026/${month}`,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return entries;
}
