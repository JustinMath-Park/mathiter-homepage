import type { MetadataRoute } from "next";

const BASE_URL = "https://mathiter.com";
const locales = ["en", "ko", "ms"];
const defaultLocale = "en";

function localeUrl(locale: string, path: string = "") {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/terms", "/privacy"];

  return pages.flatMap((path) =>
    locales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? (locale === defaultLocale ? 1.0 : 0.8) : 0.3,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, localeUrl(loc, path)])
        ),
      },
    }))
  );
}
