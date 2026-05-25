import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import TutoringNav from "@/components/tutoring/TutoringNav";
import PricingTable from "@/components/tutoring/PricingTable";

type Props = {
  params: Promise<{ locale: string }>;
};

const PRICING_LOCALES = ["en", "ko"] as const;
type PricingLocale = (typeof PRICING_LOCALES)[number];

function isPricingLocale(locale: string): locale is PricingLocale {
  return PRICING_LOCALES.includes(locale as PricingLocale);
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isPricingLocale(locale)) {
    return { robots: { index: false, follow: false } };
  }

  const t = await getTranslations({ locale, namespace: "tutoring.pricingTable" });

  // 🔒 Internal-use page — 박세준 원장님이 상담 중에 학부모에게 직접 공유하는 URL.
  // 외부 노출 X: 검색 색인 / OG 미리보기 / hreflang 모두 차단.
  return {
    title: `${t("title")} | Mathiter Tutoring`,
    description: t("subtitle"),
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        "max-snippet": 0,
        "max-image-preview": "none" as const,
      },
    },
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;

  if (!isPricingLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const backLabel = locale === "ko" ? "← 튜터링 소개로 돌아가기" : "← Back to Tutoring";

  return (
    <>
      <TutoringNav />
      <main style={{ background: "#f8fafc", minHeight: "100vh" }}>
        <PricingTable />

        {/* Back link footer */}
        <div
          style={{
            padding: "0 32px 80px",
            textAlign: "center",
          }}
        >
          <Link
            href="/tutoring"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "12px 24px",
              background: "transparent",
              color: "#0b2a57",
              border: "1px solid #cbd5e1",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.15s ease",
            }}
          >
            {backLabel}
          </Link>
        </div>
      </main>
    </>
  );
}
