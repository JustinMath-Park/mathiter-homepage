import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { getFeaturedForTutoring } from "@/lib/blog";
import type { BlogLocale } from "@/types/blog";

const SUPPORTED_LOCALES: BlogLocale[] = ["ko", "en"];

type Props = {
  params: Promise<{ locale: string }>;
};

const COPY = {
  ko: {
    metaTitle: "박세준 1:1 국제학교 수학 과외 | Mathiter Tutoring",
    metaDescription:
      "8년간 SAT 만점·AP BC 5점 학생 다수 배출. 두 자녀를 해외 국제학교에서 직접 키운 학부모 강사. 100% 온라인 1:1 화상 수학 과외.",
    eyebrow: "TUTORING",
    headline: "한 사람이 끝까지 가르치는",
    headlineHighlight: " 1:1 국제학교 수학 과외",
    subHeadline:
      "8년간 SAT 만점·AP BC 5점 학생 다수 배출. 두 자녀를 해외 국제학교에서 직접 키운 같은 학부모로서, 자녀의 수학 여정을 처음부터 끝까지 안내합니다.",
    ctaPrimary: "무료 30분 상담 신청",
    ctaSecondary: "블로그 글 보기",
    trustNote: "영업시간 1시간 이내 회신 · 1회 시범 수업 후 결정",
    uspTitle: "왜 Mathiter Tutoring인가요?",
    usps: [
      {
        title: "한 사람이 가르치는 1:1",
        body: "학원처럼 강사가 자주 바뀌지 않습니다. 박세준 원장이 첫 상담부터 마지막 시험까지 직접 책임집니다.",
      },
      {
        title: "같은 학부모 입장의 강사",
        body: "두 자녀를 해외 국제학교에서 직접 키우고 있습니다. 학부모의 고민을 가장 먼저 경험한 사람이 답해 드립니다.",
      },
      {
        title: "Mathiter 학습앱 번들",
        body: "수업 외 시간도 막히지 않게. 학부모가 자녀의 출결·과제·점수 추이를 한 화면에서 봅니다.",
      },
      {
        title: "한·영 이중언어 수업",
        body: "한국식 수학 어휘에 익숙한 자녀가 영어 SAT·AP 문제에 빠르게 적응할 수 있도록.",
      },
      {
        title: "거리·시차 무관",
        body: "100% 온라인. 해외 거주·이주 가족도 동일 수업의 질. 양국 시간대 모두 운영합니다.",
      },
    ],
    profileTitle: "박세준 원장",
    profileItems: [
      "휘문중·중동고 졸업 — 초·중·고 12년을 대치동에서",
      "고려대학교 수학과 입학",
      "한양대학교 전자전기컴퓨터공학 졸업",
      "8년간 국제학교 수학 전담 지도",
      "두 자녀를 해외 국제학교에서 직접 양육 중",
      "SAT Math 800/800 만점 학생 다수 배출",
      "AP Calculus BC 5/5 만점 학생 다수 배출",
    ],
    stepsTitle: "수업 진행 4단계",
    steps: [
      {
        n: "01",
        title: "학부모 상담 (30분 무료)",
        body: "카톡·전화·미팅 중 편한 방식으로. 자녀 현재 상황과 목표를 듣고, 어떻게 시작할지 함께 정합니다.",
      },
      {
        n: "02",
        title: "학생과 첫 대면 수업 (55분)",
        body: "1회 대면 — 사전 레벨 테스트 결과 공유 + 가벼운 수업으로 자녀와의 합을 확인합니다.",
      },
      {
        n: "03",
        title: "진행 여부 결정 + 주간 스케줄",
        body: "첫 수업 후 결정해도 늦지 않습니다. 진행 시 주 1~3회 스케줄을 함께 잡습니다.",
      },
      {
        n: "04",
        title: "온라인 정규 수업 (100% 온라인)",
        body: "Google Meet + Mathiter 학습앱. 매 수업 후 학부모에게 진행 현황과 숙제 안내가 발송됩니다.",
      },
    ],
    pricingTitle: "투명한 1회 단가",
    pricingNote: "1타임 = 55분 1:1 수업 · 매월 자동결제 또는 회당 결제 선택",
    pricing: [
      { tier: "초등학생", price: "₩80,000", per: "/ 1타임" },
      { tier: "중학생", price: "₩100,000", per: "/ 1타임" },
      { tier: "고등 / SAT / AP", price: "₩120,000", per: "/ 1타임" },
    ],
    groupNote: "그룹 수업(최대 3명) 시 1인당 30% OFF",
    blogTitle: "더 알아보기 — 박세준의 글",
    blogSubtitle:
      "8년 1:1 과외에서 나온 가이드. 자녀의 시험과 진학에 바로 쓸 수 있는 글들만 모았습니다.",
    blogCta: "블로그 전체 보기 →",
    finalTitle: "지금 시작하면, 한 학기가 달라집니다",
    finalBody:
      "1회 대면 수업 후 결정하시면 됩니다. 부담 없이 30분 무료 상담부터 시작해 보세요.",
    finalCta: "무료 30분 상담 신청",
  },
  en: {
    metaTitle: "1:1 International School Math Tutoring | Mathiter Tutoring",
    metaDescription:
      "8 years of teaching international school students — many SAT 800 and AP Calc BC 5 graduates. A tutor who is also a parent of two children attending international schools abroad. 100% online 1:1 video tutoring.",
    eyebrow: "TUTORING",
    headline: "One tutor,",
    headlineHighlight: " end-to-end 1:1 international school math",
    subHeadline:
      "Over 8 years, many of my students have scored 800 on SAT Math and 5 on AP Calc BC. As a parent of two attending international schools abroad myself, I guide your child's math journey from start to finish.",
    ctaPrimary: "Book a free 30-min consultation",
    ctaSecondary: "Read the blog",
    trustNote: "Reply within 1 business hour · Decide after one trial lesson",
    uspTitle: "Why Mathiter Tutoring?",
    usps: [
      {
        title: "One tutor, one student",
        body: "Unlike academies that rotate teachers, I personally handle every step — from the first consultation to the final exam.",
      },
      {
        title: "A tutor who is also a parent",
        body: "I'm raising two children at international schools abroad. I've lived through the same questions you have.",
      },
      {
        title: "Bundled Mathiter learning app",
        body: "Outside-class support without you watching over them. Parents see attendance, homework, and score trends in one dashboard.",
      },
      {
        title: "Bilingual Korean–English lessons",
        body: "Helps Korean-trained students adapt quickly to SAT and AP problems written in English.",
      },
      {
        title: "Distance and time zones don't matter",
        body: "100% online. Same lesson quality whether you're in Seoul, KL, or New York. Both Korean and overseas time slots available.",
      },
    ],
    profileTitle: "Sejun Park",
    profileItems: [
      "Whimoon Middle, Choongdong High — 12 years studying in Daechi-dong",
      "Korea University, Mathematics",
      "Hanyang University, Electrical & Computer Engineering",
      "8 years of full-time international school math tutoring",
      "Father of two children currently attending international schools abroad",
      "Many students achieved 800/800 on SAT Math",
      "Many students achieved 5/5 on AP Calculus BC",
    ],
    stepsTitle: "How it works (4 steps)",
    steps: [
      {
        n: "01",
        title: "Free 30-min parent consultation",
        body: "KakaoTalk, phone, or video — your pick. We discuss your child's current state and goals, and decide how to start together.",
      },
      {
        n: "02",
        title: "First in-person lesson (55 min)",
        body: "One in-person session — placement test results review + a light lesson to confirm fit with your child.",
      },
      {
        n: "03",
        title: "Decide + set weekly schedule",
        body: "Only after the first lesson. If we proceed, we agree on 1–3 sessions per week.",
      },
      {
        n: "04",
        title: "Regular online lessons (100% online)",
        body: "Google Meet + Mathiter app. After every lesson, parents receive a progress and homework summary.",
      },
    ],
    pricingTitle: "Transparent per-lesson pricing",
    pricingNote:
      "1 lesson = 55 min 1:1 · Monthly auto-pay or per-lesson payment",
    pricing: [
      { tier: "Elementary", price: "₩80,000", per: "/ lesson" },
      { tier: "Middle School", price: "₩100,000", per: "/ lesson" },
      { tier: "High School / SAT / AP", price: "₩120,000", per: "/ lesson" },
    ],
    groupNote: "Group lessons (up to 3 students): 30% off per person",
    blogTitle: "Learn more — articles by Sejun Park",
    blogSubtitle:
      "Real guides from 8 years of 1:1 tutoring. Practical for your child's exams and admissions.",
    blogCta: "Read all posts →",
    finalTitle: "Start now, change a semester",
    finalBody:
      "Decide only after the first lesson. Begin with a no-pressure free 30-minute consultation.",
    finalCta: "Book a free 30-min consultation",
  },
} as const;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale as BlogLocale] ?? COPY.ko;
  const localePath = locale === "en" ? "/tutoring" : `/${locale}/tutoring`;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: localePath,
      languages: {
        ko: "/ko/tutoring",
        en: "/tutoring",
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

export default async function TutoringPage({ params }: Props) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as BlogLocale)) {
    notFound();
  }

  setRequestLocale(locale);

  const blogLocale = locale as BlogLocale;
  const copy = COPY[blogLocale];
  const localePrefix = blogLocale === "en" ? "" : `/${blogLocale}`;
  const featuredPosts = await getFeaturedForTutoring(blogLocale, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-primary">
                {copy.eyebrow}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {copy.headline}
              <span className="gradient-text">{copy.headlineHighlight}</span>
            </h1>

            <p className="mt-6 text-base lg:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              {copy.subHeadline}
            </p>

            <div className="mt-8 flex items-center gap-3 flex-wrap justify-center">
              <a
                href={`${localePrefix}/contact`}
                className="gradient-bg text-white font-semibold px-7 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                {copy.ctaPrimary}
              </a>
              <a
                href={`${localePrefix}/blog`}
                className="font-semibold px-7 py-3.5 rounded-full text-base border border-gray-200 hover:border-gray-300 transition-colors"
              >
                {copy.ctaSecondary}
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">{copy.trustNote}</p>
          </div>
        </section>

        {/* USPs */}
        <section className="py-20 bg-surface">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              {copy.uspTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {copy.usps.map((u, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-100"
                >
                  <div className="text-2xl font-bold text-primary mb-3">
                    0{i + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{u.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profile */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-2xl gradient-bg flex items-center justify-center text-white font-bold text-5xl">
                박
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{copy.profileTitle}</h2>
                <p className="text-sm text-primary font-medium mb-5">
                  Mathiter Tutoring · {blogLocale === "ko" ? "원장" : "Founder"}
                </p>
                <ul className="space-y-2.5">
                  {copy.profileItems.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground/80">
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 bg-surface">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              {copy.stepsTitle}
            </h2>
            <div className="space-y-4">
              {copy.steps.map((step) => (
                <div
                  key={step.n}
                  className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-5 items-start"
                >
                  <div className="text-3xl font-bold gradient-text flex-shrink-0 w-14">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
              {copy.pricingTitle}
            </h2>
            <p className="text-sm text-muted text-center mb-12">
              {copy.pricingNote}
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {copy.pricing.map((p) => (
                <div
                  key={p.tier}
                  className="bg-white rounded-2xl p-8 border border-gray-100 text-center"
                >
                  <div className="text-sm text-muted mb-3">{p.tier}</div>
                  <div className="text-3xl font-bold text-foreground">
                    {p.price}
                  </div>
                  <div className="text-sm text-muted mt-1">{p.per}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-primary font-medium">
              💡 {copy.groupNote}
            </p>
          </div>
        </section>

        {/* Featured blog posts */}
        {featuredPosts.length > 0 && (
          <section className="py-20 bg-surface">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  {copy.blogTitle}
                </h2>
                <p className="text-muted max-w-2xl mx-auto">
                  {copy.blogSubtitle}
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <a
                  href={`${localePrefix}/blog`}
                  className="text-primary font-semibold hover:underline"
                >
                  {copy.blogCta}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {copy.finalTitle}
            </h2>
            <p className="text-muted mb-8 leading-relaxed">{copy.finalBody}</p>
            <a
              href={`${localePrefix}/contact`}
              className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              {copy.finalCta}
              <span>→</span>
            </a>
            <p className="mt-4 text-xs text-muted italic">{copy.trustNote}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
