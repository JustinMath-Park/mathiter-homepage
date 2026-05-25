"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * PricingTeaser (3-tier, 2026-05-25 v2)
 * --------------------------------------------------------------
 * 랜딩 페이지(/tutoring) 에서는 가격을 직접 노출하지 않는다.
 * 트랙의 "단계 구조"와 "타겟 학생상"만 보여주고,
 * 정확한 금액은 박세준 원장님이 직접 상담 시 /tutoring/pricing 페이지로 안내.
 *
 * 디자인: PricingTable 과 동일한 3 컬럼 카드 + 심화반 "가장 인기" 강조.
 * 차이: 월 수업료 row 가 통째로 없음. CTA = "무료 상담 신청".
 */

type TrackKey = "regular" | "advanced" | "elite";

interface Track {
  key: TrackKey;
  featured: boolean;
}

const TRACKS: Track[] = [
  { key: "regular", featured: false },
  { key: "advanced", featured: true },
  { key: "elite", featured: false },
];

export default function PricingTeaser() {
  const t = useTranslations("tutoring.pricingTeaser");
  const tt = useTranslations("tutoring.pricingTable"); // 트랙 이름/메시지 재사용

  return (
    <section id="pricing" style={{ padding: "112px 0", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}>
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

        {/* 3 Track Cards (no price row) */}
        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {TRACKS.map((track) => (
            <TrackCard key={track.key} track={track} tt={tt} />
          ))}
        </div>

        {/* CTA Card — 무료 상담 funnel */}
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

/* ── TrackCard (price row removed) ──────────────────────── */

function TrackCard({
  track,
  tt,
}: {
  track: Track;
  tt: ReturnType<typeof useTranslations>;
}) {
  const featured = track.featured;
  const trackKey = `tracks.${track.key}`;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: featured
          ? "linear-gradient(135deg, #0b2a57 0%, #1e40af 100%)"
          : "#ffffff",
        color: featured ? "#ffffff" : "#0b2a57",
        border: featured ? "none" : "1px solid #e2e8f0",
        borderRadius: 20,
        padding: featured ? "44px 28px 32px" : "40px 28px 32px",
        boxShadow: featured
          ? "0 24px 60px rgba(15,23,42,0.18)"
          : "0 1px 3px rgba(15,23,42,0.04)",
        transform: featured ? "translateY(-8px)" : "none",
        minHeight: 360,
      }}
    >
      {/* "가장 인기" 배지 */}
      {featured && (
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#f97316",
            color: "#ffffff",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            padding: "6px 16px",
            borderRadius: 999,
            boxShadow: "0 6px 16px rgba(249,115,22,0.32)",
          }}
        >
          {tt(`${trackKey}.badge`)}
        </div>
      )}

      {/* Track header */}
      <p
        style={{
          margin: 0,
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: featured ? "#bfdbfe" : "#64748b",
        }}
      >
        {tt(`${trackKey}.engName`)}
      </p>
      <h3
        style={{
          margin: "10px 0 6px",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: featured ? "#ffffff" : "#0b2a57",
        }}
      >
        {tt(`${trackKey}.name`)}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          fontWeight: 600,
          color: featured ? "#dbeafe" : "#475569",
        }}
      >
        {tt(`${trackKey}.frequency`)}
      </p>

      {/* Tagline + detail */}
      <p
        style={{
          marginTop: 24,
          marginBottom: 0,
          fontSize: 16,
          fontWeight: 600,
          color: featured ? "#ffffff" : "#0b2a57",
          lineHeight: 1.4,
        }}
      >
        {tt(`${trackKey}.tagline`)}
      </p>
      <p
        style={{
          margin: "12px 0 0",
          fontSize: 14,
          color: featured ? "#dbeafe" : "#475569",
          lineHeight: 1.65,
          flexGrow: 1,
        }}
      >
        {tt(`${trackKey}.detail`)}
      </p>
    </div>
  );
}
