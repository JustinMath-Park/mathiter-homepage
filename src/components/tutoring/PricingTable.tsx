"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * PricingTable
 * --------------------------------------------------------------
 * 학년(초·중·고) × 트랙(정규·심화·엘리트) 9-cell 가격 매트릭스.
 * 3 컬럼 카드 레이아웃: 트랙별로 카드, 카드 안에 학년별 가격 3 row.
 *
 * 정책 (2026-05-25 확정 v2):
 * - 학년 ↑ = 시간당 단가 ↑ (초 < 중 < 고)
 * - 횟수 ↑ = 시간당 단가 ↓ (할인 효과)
 * - 가격 노출 O (이전 PricingTeaser의 "가격 숨김" 정책에서 변경)
 * - 회당 단가는 표시하지 않음 (학부모 인식 복잡화 방지)
 *
 * UX: subtitle 아래 "학년 매칭표 보기" chip → 모달로 US/UK/KR 학년 비교표.
 */

type TrackKey = "regular" | "advanced" | "elite";
type GradeKey = "elementary" | "middle" | "high";

interface Track {
  key: TrackKey;
  prices: Record<GradeKey, number>; // 만 원 단위
  featured: boolean;
}

const TRACKS: Track[] = [
  {
    key: "regular",
    prices: { elementary: 25, middle: 40, high: 50 },
    featured: false,
  },
  {
    key: "advanced",
    prices: { elementary: 40, middle: 65, high: 80 },
    featured: true,
  },
  {
    key: "elite",
    prices: { elementary: 53, middle: 85, high: 105 },
    featured: false,
  },
];

const GRADES: GradeKey[] = ["elementary", "middle", "high"];

interface GradeChartRow {
  age: string;
  us: string;
  uk: string;
  kr: string;
  band: string;
}

export default function PricingTable() {
  const t = useTranslations("tutoring.pricingTable");
  const [chartOpen, setChartOpen] = useState(false);

  // Lock body scroll when modal open + close on Esc
  useEffect(() => {
    if (!chartOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [chartOpen]);

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

          {/* Grade chart chip */}
          <button
            type="button"
            onClick={() => setChartOpen(true)}
            style={{
              marginTop: 20,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: 999,
              color: "#0b2a57",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
              boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#0b2a57",
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ?
            </span>
            {t("gradeChart.trigger")}
          </button>
        </div>

        {/* 3 Track Cards */}
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
            <TrackCard key={track.key} track={track} t={t} />
          ))}
        </div>

        {/* Notes */}
        <div
          style={{
            marginTop: 48,
            padding: "32px 28px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            display: "grid",
            gap: 12,
          }}
        >
          <NoteRow icon="✓" text={t("notes.ai")} accent="#0b2a57" bold />
          <NoteRow icon="✓" text={t("notes.trial")} accent="#0b2a57" />
          <NoteRow icon="✓" text={t("notes.format")} accent="#0b2a57" />
          <NoteRow icon="※" text={t("notes.card")} accent="#94a3b8" />
        </div>
      </div>

      {/* Grade chart modal */}
      {chartOpen && <GradeChartModal onClose={() => setChartOpen(false)} t={t} />}
    </section>
  );
}

/* ── GradeChartModal ─────────────────────────────────────── */

function GradeChartModal({
  onClose,
  t,
}: {
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  // next-intl 의 t.raw 로 array 데이터 가져오기
  const rows = (t.raw("gradeChart.rows") as GradeChartRow[]) ?? [];

  const bandColor = (band: string) => {
    if (band === "초등" || band === "Elementary") return "#10b981";
    if (band === "중등" || band === "Middle") return "#3b82f6";
    return "#f97316"; // 고등 / High
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="grade-chart-title"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        zIndex: 1000,
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: 20,
          maxWidth: 720,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 24px 60px rgba(15,23,42,0.28)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "28px 32px 20px",
            borderBottom: "1px solid #e2e8f0",
            position: "sticky",
            top: 0,
            background: "#ffffff",
            zIndex: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div>
            <h3
              id="grade-chart-title"
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: "#0b2a57",
                letterSpacing: "-0.02em",
              }}
            >
              {t("gradeChart.modalTitle")}
            </h3>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 13.5,
                color: "#475569",
                lineHeight: 1.55,
              }}
            >
              {t("gradeChart.modalSubtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("gradeChart.closeLabel")}
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              border: "none",
              background: "#f1f5f9",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 700,
              color: "#475569",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Table */}
        <div style={{ padding: "8px 32px 24px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13.5,
            }}
          >
            <thead>
              <tr>
                {(["age", "us", "uk", "kr", "band"] as const).map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "12px 8px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#64748b",
                      borderBottom: "2px solid #e2e8f0",
                    }}
                  >
                    {t(`gradeChart.columns.${col}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom:
                      i === rows.length - 1
                        ? "none"
                        : "1px solid #f1f5f9",
                  }}
                >
                  <td
                    style={{
                      padding: "12px 8px",
                      color: "#0b2a57",
                      fontWeight: 600,
                    }}
                  >
                    {row.age}
                  </td>
                  <td style={{ padding: "12px 8px", color: "#475569" }}>
                    {row.us}
                  </td>
                  <td style={{ padding: "12px 8px", color: "#475569" }}>
                    {row.uk}
                  </td>
                  <td style={{ padding: "12px 8px", color: "#475569" }}>
                    {row.kr}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        background: `${bandColor(row.band)}15`,
                        color: bandColor(row.band),
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {row.band}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <div
          style={{
            padding: "16px 32px 28px",
            borderTop: "1px solid #e2e8f0",
            background: "#f8fafc",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "#64748b",
              lineHeight: 1.6,
            }}
          >
            ※ {t("gradeChart.note")}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── TrackCard ───────────────────────────────────────────── */

function TrackCard({
  track,
  t,
}: {
  track: Track;
  t: ReturnType<typeof useTranslations>;
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
      }}
    >
      {/* "가장 인기" 배지 (Advanced 전용) */}
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
          {t(`${trackKey}.badge`)}
        </div>
      )}

      {/* Track header — eng name + ko name */}
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
        {t(`${trackKey}.engName`)}
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
        {t(`${trackKey}.name`)}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          fontWeight: 600,
          color: featured ? "#dbeafe" : "#475569",
        }}
      >
        {t(`${trackKey}.frequency`)}
      </p>

      {/* Tagline */}
      <p
        style={{
          marginTop: 18,
          marginBottom: 0,
          fontSize: 15,
          fontWeight: 600,
          color: featured ? "#ffffff" : "#0b2a57",
          lineHeight: 1.4,
        }}
      >
        {t(`${trackKey}.tagline`)}
      </p>
      <p
        style={{
          margin: "10px 0 0",
          fontSize: 13.5,
          color: featured ? "#bfdbfe" : "#64748b",
          lineHeight: 1.65,
        }}
      >
        {t(`${trackKey}.detail`)}
      </p>

      {/* Price rows (3 grades) */}
      <div
        style={{
          marginTop: 28,
          paddingTop: 24,
          borderTop: featured
            ? "1px solid rgba(255,255,255,0.18)"
            : "1px solid #e2e8f0",
          display: "grid",
          gap: 14,
          flexGrow: 1,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: featured ? "#bfdbfe" : "#94a3b8",
          }}
        >
          {t("monthlyLabel")}
        </p>
        {GRADES.map((g) => (
          <div
            key={g}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 13.5,
                color: featured ? "#dbeafe" : "#475569",
                fontWeight: 500,
              }}
            >
              {t(`grades.${g}`)}
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: featured ? "#ffffff" : "#0b2a57",
                letterSpacing: "-0.01em",
              }}
            >
              {track.prices[g]}
              <span
                style={{
                  marginLeft: 4,
                  fontSize: 12,
                  fontWeight: 500,
                  color: featured ? "#bfdbfe" : "#94a3b8",
                }}
              >
                {t("unit")}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/contact"
        style={{
          marginTop: 28,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "14px 20px",
          background: featured ? "#ffffff" : "#0b2a57",
          color: featured ? "#0b2a57" : "#ffffff",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 700,
          textDecoration: "none",
          transition: "transform 0.15s ease",
        }}
      >
        {t("ctaLabel")} →
      </Link>
    </div>
  );
}

/* ── NoteRow ─────────────────────────────────────────────── */

function NoteRow({
  icon,
  text,
  accent,
  bold,
}: {
  icon: string;
  text: string;
  accent: string;
  bold?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span
        style={{
          color: accent,
          fontSize: 14,
          fontWeight: 700,
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {icon}
      </span>
      <p
        style={{
          margin: 0,
          color: bold ? "#0b2a57" : "#475569",
          fontSize: 14,
          fontWeight: bold ? 600 : 400,
          lineHeight: 1.6,
        }}
      >
        {text}
      </p>
    </div>
  );
}
