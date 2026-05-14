"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * PricingTeaser
 * --------------------------------------------------------------
 * 랜딩 페이지에서는 가격을 직접 노출하지 않는다.
 * 패키지의 "단계 구조"만 보여주고, 정확한 금액은 무료 상담에서 안내.
 * (TutoringPricing 컴포넌트는 그대로 보존되어 있어, 추후 복귀 가능)
 */
export default function PricingTeaser() {
  const t = useTranslations("tutoring.pricingTeaser");
  const tp = useTranslations("tutoring.pricing");

  const tiers: Array<{ k: "basic" | "advanced" | "pro" | "master"; icon: string }> = [
    { k: "basic", icon: "🚲" },
    { k: "advanced", icon: "🚗" },
    { k: "pro", icon: "🚙" },
    { k: "master", icon: "🏎️" },
  ];

  return (
    <section id="pricing" style={{ padding: "112px 0", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 12.5,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#f97316",
              margin: 0,
            }}
          >
            {t("eyebrow")}
          </p>
          <h2
            style={{
              margin: "16px 0 0",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#0b2a57",
              fontSize: "clamp(28px, 4.2vw, 44px)",
              lineHeight: 1.18,
            }}
          >
            {t("title")}
          </h2>
          <p
            style={{
              margin: "20px 0 0",
              color: "#475569",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.7,
            }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* 4 Tier Pills (이름·아이콘만, 가격 X) */}
        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {tiers.map(({ k, icon }) => (
            <div
              key={k}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: "24px 20px",
                textAlign: "center",
                boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
              }}
            >
              <div style={{ fontSize: 36, lineHeight: 1 }}>{icon}</div>
              <p
                style={{
                  margin: "12px 0 4px",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "#64748b",
                }}
              >
                {tp(`${k}.stage`)}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0b2a57",
                }}
              >
                {tp(`${k}.name`)}
              </p>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: 13,
                  color: "#94a3b8",
                  lineHeight: 1.5,
                }}
              >
                {tp(`${k}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Inquiry Card */}
        <div
          style={{
            marginTop: 56,
            background: "linear-gradient(135deg, #0b2a57 0%, #1e40af 100%)",
            borderRadius: 24,
            padding: "56px 40px",
            textAlign: "center",
            color: "#ffffff",
            boxShadow: "0 24px 60px rgba(15,23,42,0.16)",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#bfdbfe",
              margin: 0,
            }}
          >
            {t("ctaEyebrow")}
          </p>
          <h3
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(22px, 2.6vw, 30px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
            }}
          >
            {t("ctaTitle")}
          </h3>
          <p
            style={{
              margin: "20px auto 0",
              maxWidth: 640,
              fontSize: "clamp(14px, 1.3vw, 16px)",
              lineHeight: 1.7,
              color: "#dbeafe",
            }}
          >
            {t("ctaBody")}
          </p>

          <div
            style={{
              marginTop: 36,
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 32px",
                background: "#ffffff",
                color: "#0b2a57",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(15,23,42,0.2)",
                transition: "transform 0.15s ease",
              }}
            >
              {t("ctaPrimary")} →
            </Link>
            <Link
              href="#tutor-profile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 28px",
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          <p
            style={{
              marginTop: 28,
              fontSize: 12.5,
              color: "#bfdbfe",
              letterSpacing: "0.04em",
            }}
          >
            {t("ctaNote")}
          </p>
        </div>
      </div>
    </section>
  );
}
