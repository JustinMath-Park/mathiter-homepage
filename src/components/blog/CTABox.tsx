import type { BlogLocale } from "@/types/blog";

interface Props {
  locale: BlogLocale;
  variant?: "default" | "persona1" | "persona3";
}

const COPY = {
  ko: {
    default: {
      title: "1:1 맞춤 상담을 받고 싶으신가요?",
      body: "Mathiter Tutoring에서 30분 무료 상담을 진행합니다. 8년간 SAT 만점·AP BC 5점 학생을 다수 배출한 박세준 원장이 직접 상담해 드립니다.",
      note: "영업시간 1시간 이내 회신 · 1회 시범 수업 후 결정",
      cta: "무료 30분 상담 신청",
    },
    persona1: {
      title: "국제학교 진학을 앞두고 계신가요?",
      body: "입학 전에 영어 수학 환경에 적응시켜주는 것이 가장 효과적입니다. 두 자녀를 해외 국제학교에서 직접 키운 같은 학부모로서 박세준 원장이 직접 상담드립니다.",
      note: "영업시간 1시간 이내 회신 · 1회 시범 수업 후 결정",
      cta: "무료 30분 상담 신청",
    },
    persona3: {
      title: "해외에 계셔도 동일한 수업의 질을 보장합니다",
      body: "Google Meet 기반 Mathiter 학습앱으로 시차·거리에 구애받지 않습니다. 양국 시간대를 모두 운영해 맞춰 드립니다.",
      note: "영업시간 1시간 이내 회신 · 1회 시범 수업 후 결정",
      cta: "무료 30분 상담 신청",
    },
  },
  en: {
    default: {
      title: "Want a personalized 1:1 consultation?",
      body: "Mathiter Tutoring offers a free 30-minute consultation. Sejun Park — who has coached many students to 800 SAT Math and AP Calc BC 5s over 8 years — will speak with you directly.",
      note: "Reply within 1 business hour · Decide after one trial lesson",
      cta: "Book a free 30-min consultation",
    },
    persona1: {
      title: "Moving to an international school soon?",
      body: "Adapting to English math environments before enrollment is the most effective preparation. Sejun Park — also a parent raising two children abroad — will consult with you directly.",
      note: "Reply within 1 business hour · Decide after one trial lesson",
      cta: "Book a free 30-min consultation",
    },
    persona3: {
      title: "Living abroad? Same lesson quality, guaranteed.",
      body: "Google Meet + Mathiter learning app — no time-zone or distance limits. Both Korean and overseas time slots available.",
      note: "Reply within 1 business hour · Decide after one trial lesson",
      cta: "Book a free 30-min consultation",
    },
  },
} as const;

export default function CTABox({ locale, variant = "default" }: Props) {
  const copy = COPY[locale][variant];
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const contactHref = `${localePrefix}/contact`;

  return (
    <div className="my-10 rounded-2xl bg-gradient-to-br from-primary/5 via-white to-accent/5 border border-primary/15 p-6 sm:p-8">
      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
        {copy.title}
      </h3>
      <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-5">
        {copy.body}
      </p>
      <a
        href={contactHref}
        className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
      >
        {copy.cta}
        <span>→</span>
      </a>
      <p className="mt-4 text-xs text-muted italic">{copy.note}</p>
    </div>
  );
}
