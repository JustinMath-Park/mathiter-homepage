import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostBody from "@/components/blog/PostBody";
import AuthorCard from "@/components/blog/AuthorCard";
import CTABox from "@/components/blog/CTABox";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogViewTracker from "@/components/blog/BlogViewTracker";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import type { BlogLocale } from "@/types/blog";

const SUPPORTED_LOCALES: BlogLocale[] = ["ko", "en"];

/**
 * "YYYY-MM-DD" → "YYYY-MM-DDT00:00:00+09:00" (KST)
 * 이미 timezone 정보가 포함된 값이면 그대로 반환.
 * Schema.org BlogPosting datePublished / dateModified 의
 * Google "missing a timezone" warning 방지.
 */
function toISOWithKST(date: string | undefined): string | undefined {
  if (!date) return undefined;
  // 이미 ISO 8601 + timezone 형식 (T + +/-/Z) 이면 그대로
  if (/T.*([+-]\d{2}:?\d{2}|Z)$/.test(date)) return date;
  // "YYYY-MM-DD" 형식 → KST 자정 (+09:00) 으로 normalize
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return `${date}T00:00:00+09:00`;
  // 다른 형식은 그대로 (혹시 다른 변형이 들어왔을 때 깨지지 않게)
  return date;
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const CATEGORY_LABEL: Record<string, { ko: string; en: string }> = {
  sat: { ko: "SAT", en: "SAT" },
  ap: { ko: "AP", en: "AP" },
  ib: { ko: "IB", en: "IB" },
  igcse: { ko: "IGCSE", en: "IGCSE" },
  "school-life": { ko: "학교생활", en: "School Life" },
  moving: { ko: "이주 준비", en: "Moving Abroad" },
  general: { ko: "일반", en: "General" },
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(({ locale, slug }) => ({ locale, slug }));
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as BlogLocale)) {
    return {};
  }

  const post = await getPostBySlug(locale as BlogLocale, slug);
  if (!post) return {};

  const localePath =
    locale === "en" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

  return {
    title: `${post.title} | Mathiter Tutoring 블로그`,
    description: post.description || post.excerpt,
    alternates: {
      canonical: localePath,
    },
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      type: "article",
      url: `https://mathiter.com${localePath}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      // OG image is auto-injected by ./opengraph-image.tsx (file-based convention)
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as BlogLocale)) {
    notFound();
  }

  setRequestLocale(locale);

  const blogLocale = locale as BlogLocale;
  const post = await getPostBySlug(blogLocale, slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(blogLocale, post.id, 3);
  const categoryLabel =
    CATEGORY_LABEL[post.category]?.[blogLocale] ?? post.category;
  const localePrefix = blogLocale === "en" ? "" : `/${blogLocale}`;

  const wordCount = countWords(post.content, blogLocale);
  const absoluteHero = post.heroImage
    ? `https://mathiter.com${post.heroImage.startsWith("/") ? post.heroImage : `/${post.heroImage}`}`
    : undefined;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || post.excerpt,
    image: absoluteHero ? [absoluteHero] : undefined,
    // ISO 8601 + KST timezone (Search Console "missing a timezone" warning fix)
    // markdown frontmatter 는 "2026-05-14" 형식. 이미 timezone 포함된 값이면 그대로.
    datePublished: toISOWithKST(post.publishedAt),
    dateModified: toISOWithKST(post.updatedAt),
    wordCount,
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
    articleSection: categoryLabel,
    keywords: post.tags?.join(", "),
    inLanguage: blogLocale === "ko" ? "ko-KR" : "en-US",
    author: {
      "@type": "Person",
      name: post.author.name,
      description: post.author.bio,
      url: `https://mathiter.com${localePrefix}/tutoring`,
    },
    publisher: {
      "@type": "Organization",
      name: "Mathiter Tutoring",
      url: "https://mathiter.com",
      logo: {
        "@type": "ImageObject",
        url: "https://mathiter.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mathiter.com${localePrefix}/blog/${post.slug}`,
    },
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Mathiter",
        item: `https://mathiter.com${localePrefix}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: blogLocale === "ko" ? "블로그" : "Blog",
        item: `https://mathiter.com${localePrefix}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://mathiter.com${localePrefix}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted mb-6">
            <a
              href={`${localePrefix}/blog`}
              className="hover:text-foreground transition-colors"
            >
              ← {blogLocale === "ko" ? "블로그 목록" : "All posts"}
            </a>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-xs mb-4">
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {categoryLabel}
              </span>
              <span className="text-muted">
                {formatDate(post.publishedAt, blogLocale)}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-lg text-muted leading-relaxed">
                {post.excerpt}
              </p>
            )}
            <div className="mt-6 flex items-center gap-2 text-sm text-foreground/70">
              <span>{post.author.name}</span>
            </div>
          </header>

          {/* Hero image */}
          {post.heroImage && (
            <div className="mb-10 -mx-6 sm:mx-0 sm:rounded-2xl overflow-hidden bg-surface aspect-[16/9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Body */}
          <PostBody content={post.content} />

          {/* CTA */}
          <CTABox
            locale={blogLocale}
            variant={
              post.persona === 1
                ? "persona1"
                : post.persona === 3
                  ? "persona3"
                  : "default"
            }
          />

          {/* Author */}
          <div className="mt-10">
            <AuthorCard author={post.author} locale={blogLocale} />
          </div>

          {/* Related */}
          <RelatedPosts posts={related} locale={blogLocale} />
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogViewTracker slug={post.slug} />
    </>
  );
}

function countWords(content: string, locale: BlogLocale): number {
  const stripped = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[#>*_`~|-]/g, " ")
    .trim();
  if (locale === "ko") {
    return stripped.replace(/\s+/g, "").length;
  }
  return stripped.split(/\s+/).filter(Boolean).length;
}

function formatDate(iso: string, locale: BlogLocale) {
  try {
    const d = new Date(iso);
    if (locale === "ko") {
      return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
    }
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
