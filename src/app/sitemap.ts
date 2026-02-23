import type { MetadataRoute } from "next";

const BASE_URL = "https://mathiter.com";
const locales = ["en", "ko", "ms"];
const defaultLocale = "en";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url:
      locale === defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: locale === defaultLocale ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((loc) => [
          loc,
          loc === defaultLocale ? BASE_URL : `${BASE_URL}/${loc}`,
        ])
      ),
    },
  }));
}
