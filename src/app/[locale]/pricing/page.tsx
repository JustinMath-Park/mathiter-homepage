import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentForm from "./PaymentForm";

type Props = {
  params: Promise<{ locale: string }>;
};

const content: Record<
  string,
  {
    title: string;
    subtitle: string;
    productName: string;
    productPrice: string;
    productPeriod: string;
    productTax: string;
    featuresTitle: string;
    features: string[];
    noticeTitle: string;
    notices: string[];
    refundLink: string;
    termsLink: string;
    privacyLink: string;
    cta: string;
    legalLine: string;
  }
> = {
  ko: {
    title: "Mathiter Premium 구독",
    subtitle: "AI 수학 학습 앱을 무제한으로 이용하세요",
    productName: "Mathiter Premium 1개월 이용권",
    productPrice: "34,900원",
    productPeriod: "1개월 이용 / 결제 즉시 자동 활성화",
    productTax: "부가세 포함 · 간이과세자 · 면세 0원",
    featuresTitle: "이용권 포함 사항",
    features: [
      "✓ 모든 수학 강의 무제한 시청",
      "✓ AI 가이드 문제 풀이 무제한",
      "✓ 적응형 진단 테스트 무제한",
      "✓ SAT·IGCSE·IB·A-Level 실전 모의고사",
      "✓ 학부모 대시보드 (학습 진도 실시간 확인)",
      "✓ 매일 AI 학습 코칭 리포트",
    ],
    noticeTitle: "결제 안내",
    notices: [
      "본 상품은 디지털 콘텐츠 1개월 이용권입니다. 결제 즉시 정보통신망을 통해 서비스가 제공됩니다.",
      "단건 결제 상품으로 자동 갱신되지 않습니다. (정기구독은 추후 출시 예정)",
      "결제 후 7일 이내 한 번도 유료 기능에 접속하지 않은 경우 전액 환불됩니다.",
      "그 외 환불 조건은 환불정책 페이지를 참고해 주세요.",
    ],
    refundLink: "환불정책 보기 →",
    termsLink: "이용약관 →",
    privacyLink: "개인정보처리방침 →",
    cta: "결제하기",
    legalLine:
      "「결제하기」를 클릭하면 이용약관·환불정책·개인정보처리방침에 동의한 것으로 간주됩니다.",
  },
  en: {
    title: "Mathiter Premium Subscription",
    subtitle: "Unlimited access to the AI math learning app",
    productName: "Mathiter Premium 1-Month Pass",
    productPrice: "KRW 34,900",
    productPeriod: "1-month access / activated immediately upon payment",
    productTax: "VAT included · Simplified taxpayer · Tax-free portion: KRW 0",
    featuresTitle: "What's included",
    features: [
      "✓ Unlimited access to all math lessons",
      "✓ Unlimited AI-guided practice problems",
      "✓ Unlimited adaptive diagnostic tests",
      "✓ SAT, IGCSE, IB, A-Level mock exams",
      "✓ Parent dashboard (real-time learning progress)",
      "✓ Daily AI learning coaching reports",
    ],
    noticeTitle: "Payment Notice",
    notices: [
      "This is a 1-month pass for digital content. Service is provided immediately upon payment via the internet.",
      "One-time purchase. Auto-renewal is not available (recurring subscription will be released later).",
      "If you have not accessed any paid feature within 7 days of payment, a full refund is available.",
      "For other refund conditions, please refer to the Refund Policy.",
    ],
    refundLink: "Refund Policy →",
    termsLink: "Terms of Service →",
    privacyLink: "Privacy Policy →",
    cta: "Pay Now",
    legalLine:
      "By clicking 'Pay Now', you agree to the Terms of Service, Refund Policy, and Privacy Policy.",
  },
};

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale] || content.en;
  const isKo = locale === "ko";
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-gradient-to-b from-blue-50/40 to-white min-h-screen">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {c.title}
            </h1>
            <p className="mt-3 text-base text-muted">{c.subtitle}</p>
          </div>

          {/* Product card */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Product header */}
            <div className="px-8 py-7 border-b border-gray-100 bg-gradient-to-r from-blue-50/60 to-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {c.productName}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{c.productPeriod}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl sm:text-4xl font-bold text-primary">
                    {c.productPrice}
                  </p>
                  <p className="mt-1 text-xs text-muted/80">{c.productTax}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="px-8 py-7">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
                {c.featuresTitle}
              </h3>
              <ul className="space-y-2.5 text-sm text-foreground/85">
                {c.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {/* Payment form (client component) */}
            <div className="px-8 py-7 border-t border-gray-100 bg-gray-50/50">
              <PaymentForm
                productName={c.productName}
                amount={34900}
                taxFreeAmount={0}
                locale={locale}
                cta={c.cta}
                legalLine={c.legalLine}
              />
            </div>
          </div>

          {/* Payment notice */}
          <div className="mt-8 rounded-xl border border-gray-100 bg-white px-6 py-5">
            <h3 className="text-sm font-semibold mb-3">{c.noticeTitle}</h3>
            <ul className="space-y-1.5 text-xs text-muted leading-relaxed list-disc pl-5">
              {c.notices.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <a
                href={`${localePrefix}/refund`}
                className="text-primary hover:underline"
              >
                {c.refundLink}
              </a>
              <a
                href={`${localePrefix}/terms`}
                className="text-primary hover:underline"
              >
                {c.termsLink}
              </a>
              <a
                href={`${localePrefix}/privacy`}
                className="text-primary hover:underline"
              >
                {c.privacyLink}
              </a>
            </div>
          </div>

          {/* Brand reassurance */}
          <p className="mt-6 text-center text-xs text-muted/70">
            {isKo
              ? "보안 결제 by 토스페이먼츠 (Toss Payments)"
              : "Secure payment by Toss Payments"}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
