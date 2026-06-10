import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/blog/BlogList";
import CTABox from "@/components/blog/CTABox";
import AdminBlogLink from "@/components/blog/AdminBlogLink";
import { getAllPublishedPosts } from "@/lib/blog";
import type { BlogLocale } from "@/types/blog";

const SUPPORTED_LOCALES: BlogLocale[] = ["ko", "en"];

type Props = {
  params: Promise<{ locale: string }>;
};

const PAGE_COPY = {
  ko: {
    title: "Mathiter 블로그",
    subtitle:
      "국제학교 수학·SAT/AP/IB/IGCSE·해외 이주 — 8년 1:1 과외 경험에서 나온 진짜 가이드.",
    eyebrow: "BLOG",
    metaTitle: "블로그 | Mathiter Tutoring",
    metaDescription:
      "국제학교 수학과 SAT, AP, IB, IGCSE 시험 대비 가이드. 8년간 1:1 과외와 두 자녀를 해외 국제학교에서 키운 Mathiter Tutoring이 직접 씁니다.",
    empty: "곧 첫 글이 올라옵니다.",
  },
  en: {
    title: "Mathiter Blog",
    subtitle:
      "International school math, SAT/AP/IB/IGCSE, and moving abroad — real guides from 8 years of 1:1 tutoring.",
    eyebrow: "BLOG",
    metaTitle: "Blog | Mathiter Tutoring",
    metaDescription:
      "International school math and SAT, AP, IB, IGCSE prep guides — written by Sejun Park, with 8 years of 1:1 tutoring experience and two children attending international schools abroad.",
    empty: "First post coming soon.",
  },
} as const;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    PAGE_COPY[locale as BlogLocale] ?? PAGE_COPY.ko;
  const localePath = locale === "en" ? "/blog" : `/${locale}/blog`;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: localePath,
      languages: {
        ko: "/ko/blog",
        en: "/blog",
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      type: "website",
      url: `https://mathiter.com${localePath}`,
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as BlogLocale)) {
    notFound();
  }

  setRequestLocale(locale);

  const blogLocale = locale as BlogLocale;
  const posts = await getAllPublishedPosts(blogLocale);
  const copy = PAGE_COPY[blogLocale];

  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold text-primary tracking-widest mb-3">
              {copy.eyebrow}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {copy.title}
            </h1>
            <p className="mt-5 text-base lg:text-lg text-muted max-w-2xl mx-auto">
              {copy.subtitle}
            </p>
          </div>

          <BlogList posts={posts} emptyMessage={copy.empty} />

          <div className="mt-16 max-w-3xl mx-auto">
            <CTABox locale={blogLocale} />
          </div>
        </div>
      </main>
      <Footer />
      <AdminBlogLink />
    </>
  );
}
