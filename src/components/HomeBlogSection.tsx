import BlogCard from "@/components/blog/BlogCard";
import { getFeaturedForHome } from "@/lib/blog";
import type { BlogLocale } from "@/types/blog";

interface Props {
  locale: string;
}

const COPY = {
  ko: {
    eyebrow: "BLOG",
    title: "박세준 원장의 글",
    subtitle:
      "8년 1:1 국제학교 수학 과외에서 나온 가이드. 자녀의 시험과 진학에 바로 쓸 수 있습니다.",
    cta: "전체 글 보기 →",
  },
  en: {
    eyebrow: "BLOG",
    title: "From Sejun Park",
    subtitle:
      "Real guides from 8 years of 1:1 international school math tutoring — practical for your child's exams and admissions.",
    cta: "Read all posts →",
  },
} as const;

export default async function HomeBlogSection({ locale }: Props) {
  if (locale !== "ko" && locale !== "en") return null;

  const blogLocale = locale as BlogLocale;
  const posts = await getFeaturedForHome(blogLocale, 3);
  if (posts.length === 0) return null;

  const copy = COPY[blogLocale];
  const localePrefix = blogLocale === "en" ? "" : `/${blogLocale}`;

  return (
    <section className="py-20 sm:py-24 bg-surface" id="blog">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold text-primary tracking-widest mb-3">
            {copy.eyebrow}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            {copy.title}
          </h2>
          <p className="mt-4 text-base text-muted max-w-2xl mx-auto">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={`${localePrefix}/blog`}
            className="text-primary font-semibold hover:underline"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
