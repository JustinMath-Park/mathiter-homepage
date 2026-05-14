import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

const BASE_URL = "https://mathiter.com";
const allLocales = ["en", "ko", "ms", "zh"];
const tutoringLocales = ["en", "ko"];
const defaultLocale = "en";

function localeUrl(locale: string, path: string = "") {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages available in all 4 locales
  const sharedPages = ["", "/terms", "/privacy"];
  // Pages only in ko/en (tutoring landing + contact + blog)
  // /product was merged into / (home) on 2026-05-14 — redirect set in next.config
  const tutoringPages = ["/tutoring", "/contact", "/blog"];

  const sharedEntries = sharedPages.flatMap((path) =>
    allLocales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? (locale === defaultLocale ? 1.0 : 0.8) : 0.3,
      alternates: {
        languages: Object.fromEntries(
          allLocales.map((loc) => [loc, localeUrl(loc, path)])
        ),
      },
    }))
  );

  const tutoringEntries = tutoringPages.flatMap((path) =>
    tutoringLocales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          tutoringLocales.map((loc) => [loc, localeUrl(loc, path)])
        ),
      },
    }))
  );

  let blogPostEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllSlugs();
    blogPostEntries = slugs.map(({ locale, slug }) => ({
      url: localeUrl(locale, `/blog/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (err) {
    console.error("[sitemap] failed to load blog slugs:", err);
  }

  return [...sharedEntries, ...tutoringEntries, ...blogPostEntries];
}
