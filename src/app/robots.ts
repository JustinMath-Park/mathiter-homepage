import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/_next/static/"],
      disallow: ["/api/", "/_next/data/"],
    },
    sitemap: "https://mathiter.com/sitemap.xml",
  };
}
