import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import type { BlogLocale } from "@/types/blog";

const SUPPORTED_LOCALES: BlogLocale[] = ["ko", "en"];

type Props = {
  params: Promise<{ locale: string }>;
};

const COPY = {
  ko: {
    metaTitle: "무료 30분 상담 신청 | Mathiter Tutoring",
    metaDescription:
      "박세준 원장의 1:1 국제학교 수학 과외 무료 상담 신청. 영업시간 1시간 이내 회신, 1회 시범 수업 후 결정.",
    eyebrow: "FREE CONSULTATION",
    headline: "무료 30분 상담 신청",
    subHeadline:
      "박세준 원장이 직접 상담드립니다. 카톡·전화·이메일 중 편한 방식을 골라 주세요.",
    bullets: [
      "30분 무료 상담 — 자녀의 현재 상황과 목표를 함께 정리",
      "1회 대면 시범 수업 후 결정",
      "100% 온라인 정규 수업 (Google Meet + Mathiter 학습앱)",
      "영업시간 1시간 이내 회신",
    ],
    sidebarTitle: "직접 연락도 좋습니다",
    sidebarBody:
      "폼이 부담스러우시면 언제든 직접 메일 주셔도 됩니다.",
    email: "contact@mathiter.com",
  },
  en: {
    metaTitle: "Book a free 30-min consultation | Mathiter Tutoring",
    metaDescription:
      "Free 1:1 consultation with Sejun Park for international school math tutoring. Reply within 1 business hour, decide after one trial lesson.",
    eyebrow: "FREE CONSULTATION",
    headline: "Book a free 30-min consultation",
    subHeadline:
      "Sejun Park will speak with you directly. Choose KakaoTalk, phone, or email — whichever is most comfortable.",
    bullets: [
      "30-min free consultation — review your child's current state and goals",
      "Decide after one in-person trial lesson",
      "100% online regular lessons (Google Meet + Mathiter app)",
      "Reply within 1 business hour",
    ],
    sidebarTitle: "Or just email us",
    sidebarBody:
      "If a form feels heavy, you're welcome to email directly.",
    email: "contact@mathiter.com",
  },
} as const;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale as BlogLocale] ?? COPY.ko;
  const localePath = locale === "en" ? "/contact" : `/${locale}/contact`;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: localePath,
      languages: {
        ko: "/ko/contact",
        en: "/contact",
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      type: "website",
      url: `https://mathiter.com${localePath}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as BlogLocale)) {
    notFound();
  }

  setRequestLocale(locale);

  const blogLocale = locale as BlogLocale;
  const copy = COPY[blogLocale];

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-primary tracking-widest mb-3">
              {copy.eyebrow}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {copy.headline}
            </h1>
            <p className="mt-5 text-base lg:text-lg text-muted max-w-2xl mx-auto">
              {copy.subHeadline}
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <ContactForm locale={blogLocale} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-surface rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4">
                  {blogLocale === "ko" ? "이렇게 진행됩니다" : "What to expect"}
                </h2>
                <ul className="space-y-3">
                  {copy.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5 text-sm">
                      <span className="text-primary mt-0.5">✓</span>
                      <span className="text-foreground/80 leading-relaxed">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold mb-2">{copy.sidebarTitle}</h2>
                <p className="text-sm text-muted mb-3 leading-relaxed">
                  {copy.sidebarBody}
                </p>
                <a
                  href={`mailto:${copy.email}`}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  {copy.email}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
