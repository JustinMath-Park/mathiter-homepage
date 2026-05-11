"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type TierKey = "basic" | "advanced" | "pro" | "master";

type Tier = {
  k: TierKey;
  hi: boolean;
  hasGroup: boolean;
  features: string[];
  prevName: string | null;
};

const PREV_ICON: Record<TierKey, string> = {
  basic: "",
  advanced: "🚗",
  pro: "🚙",
  master: "🏎️",
};

export default function TutoringPricing() {
  const t = useTranslations("tutoring.pricing");
  const locale = useLocale();
  const isKo = locale === "ko";

  const tiers: Tier[] = [
    {
      k: "basic",
      hi: false,
      hasGroup: false,
      features: ["feat1", "feat2", "feat3", "feat4", "feat5", "feat6"],
      prevName: null,
    },
    {
      k: "advanced",
      hi: true,
      hasGroup: true,
      features: ["feat1", "feat2", "feat3", "feat4", "feat5"],
      prevName: t("basic.name"),
    },
    {
      k: "pro",
      hi: false,
      hasGroup: true,
      features: ["feat1", "feat2", "feat3", "feat4", "feat5"],
      prevName: t("advanced.name"),
    },
    {
      k: "master",
      hi: false,
      hasGroup: false,
      features: ["feat1", "feat2", "feat3", "feat4", "feat5", "feat6"],
      prevName: t("pro.name"),
    },
  ];

  return (
    <section id="pricing" style={{ padding: "112px 0", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Value Proposition */}
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
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
            className="pricing-value-title"
            style={{
              margin: "16px 0 0",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#0b2a57",
              lineHeight: 1.2,
            }}
          >
            {t("valueTitleLine1")}
            <br />
            {t("valueTitleLine2")}{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#1d5396,#2f7dd4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("valueTitleHighlight")}
            </span>
          </h2>
          <p
            style={{
              marginTop: 22,
              fontSize: 17,
              color: "#475569",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
            }}
          >
            {t("valueSubtitle")}
          </p>
        </div>

        {/* 3 pillars */}
        <div className="pricing-pillars" style={{ marginTop: 48, display: "grid", gap: 18 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: "22px 24px",
                display: "flex",
                gap: 16,
                alignItems: "center",
                boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  fontSize: 28,
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "#eff5fc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {t(`pillar${i}Icon` as "pillar1Icon")}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 15.5,
                    fontWeight: 700,
                    color: "#0b2a57",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t(`pillar${i}Title` as "pillar1Title")}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 3, lineHeight: 1.5 }}>
                  {t(`pillar${i}Body` as "pillar1Body")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Table Header */}
        <div style={{ marginTop: 96, maxWidth: 720, marginInline: "auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "#1d5396",
              margin: 0,
            }}
          >
            {t("tableEyebrow")}
          </p>
          <h3
            className="pricing-table-title"
            style={{
              margin: "12px 0 0",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#0b2a57",
              lineHeight: 1.2,
            }}
          >
            {t("tableTitleLine1")}{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#1d5396,#2f7dd4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("tableTitleHighlight")}
            </span>
          </h3>
          <p style={{ marginTop: 14, fontSize: 15, color: "#64748b", lineHeight: 1.6 }}>
            {t("tableSubtitle")}
          </p>
        </div>

        {/* 4 Tier Cards */}
        <div className="pricing-grid" style={{ marginTop: 56, display: "grid", gap: 20 }}>
          {tiers.map((tier) => (
            <article
              key={tier.k}
              style={{
                position: "relative",
                background: "#fff",
                borderRadius: 20,
                padding: "32px 24px 28px",
                border: tier.hi ? "2px solid #f97316" : "1px solid #e2e8f0",
                boxShadow: tier.hi
                  ? "0 18px 40px rgba(249,115,22,0.18)"
                  : "0 1px 3px rgba(15,23,42,0.04)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {tier.hi && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg,#f59e0b,#f97316)",
                    color: "#fff",
                    fontSize: 11.5,
                    fontWeight: 700,
                    padding: "5px 14px",
                    borderRadius: 9999,
                    whiteSpace: "nowrap",
                    letterSpacing: "0.06em",
                  }}
                >
                  {t("highlightTag")}
                </div>
              )}

              <div
                style={{
                  display: "inline-block",
                  alignSelf: "flex-start",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: tier.hi ? "#c2410c" : "#1d5396",
                  background: tier.hi ? "#fff7ed" : "#eff5fc",
                  padding: "4px 10px",
                  borderRadius: 9999,
                  textTransform: "uppercase",
                }}
              >
                {t(`${tier.k}.stage` as "basic.stage")}
              </div>

              <h4
                style={{
                  margin: "12px 0 4px",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0b2a57",
                  letterSpacing: "-0.015em",
                }}
              >
                {t(`${tier.k}.name` as "basic.name")}
              </h4>
              <p style={{ margin: 0, fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>
                {t(`${tier.k}.desc` as "basic.desc")}
              </p>

              <div style={{ marginTop: 22, paddingBottom: 18, borderBottom: "1px dashed #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>
                    {t("currencySymbol")}
                  </span>
                  <span
                    style={{
                      fontSize: 30,
                      fontWeight: 700,
                      color: "#0b2a57",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                    }}
                  >
                    {t(`${tier.k}.price` as "basic.price")}
                  </span>
                  <span style={{ fontSize: 13, color: "#64748b", marginLeft: 4 }}>
                    {t("perMonth")}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                  {t(`${tier.k}.monthly` as "basic.monthly")}
                </div>
              </div>

              {tier.prevName && (
                <div
                  style={{
                    marginTop: 18,
                    fontSize: 11.5,
                    color: "#1d5396",
                    fontWeight: 600,
                    background: "#eff5fc",
                    padding: "7px 12px",
                    borderRadius: 9999,
                    alignSelf: "flex-start",
                  }}
                >
                  {PREV_ICON[tier.k] ? `${PREV_ICON[tier.k]} ` : ""}
                  {t("includesPrev", { prevName: tier.prevName })}
                </div>
              )}

              <ul
                style={{
                  marginTop: 16,
                  marginBottom: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}
              >
                {tier.features.map((featKey) => (
                  <li
                    key={featKey}
                    style={{
                      display: "flex",
                      gap: 9,
                      fontSize: 13,
                      color: "#334155",
                      alignItems: "flex-start",
                      lineHeight: 1.5,
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={tier.hi ? "#f97316" : "#10b981"}
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {t(`${tier.k}.${featKey}` as "basic.feat1")}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                style={{
                  marginTop: 24,
                  width: "100%",
                  padding: "12px 0",
                  borderRadius: 9999,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                  background: tier.hi ? "linear-gradient(135deg,#f59e0b,#f97316)" : "#fff",
                  color: tier.hi ? "#fff" : "#0b2a57",
                  border: tier.hi ? "none" : "1.5px solid #cbd5e1",
                  boxShadow: tier.hi ? "0 10px 24px rgba(249,115,22,0.32)" : "none",
                }}
              >
                {tier.hi ? t("primaryCta") : t("secondaryCta")}
              </Link>
            </article>
          ))}
        </div>

        {/* Group Discount Banner */}
        <div style={{ marginTop: 40 }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(105deg,#0b2a57 0%, #153f7a 60%, #1d5396 100%)",
              color: "#fff",
              borderRadius: 20,
              padding: "32px 32px",
              boxShadow: "0 20px 40px rgba(11,42,87,0.25)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "rgba(16,185,129,0.18)",
                filter: "blur(40px)",
              }}
            />

            <div
              style={{
                position: "relative",
                display: "flex",
                gap: 24,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: "linear-gradient(135deg,#10b981,#047857)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 24px rgba(16,185,129,0.4)",
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 240 }}>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: "#6ee7b7",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("groupBanner.kicker")}
                </div>
                <div
                  className="group-banner-title"
                  style={{
                    fontWeight: 700,
                    marginTop: 6,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                  }}
                >
                  {t("groupBanner.titleLine1")}{" "}
                  {t("groupBanner.titleLine2Prefix")}
                  <span style={{ color: "#fdba74" }}>
                    {t("groupBanner.titleLine2Highlight")}
                  </span>
                  {t("groupBanner.titleLine2Suffix")}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    color: "#bdd2f0",
                    lineHeight: 1.55,
                  }}
                >
                  {t("groupBanner.subtitle")}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: "#94a3b8",
                    lineHeight: 1.55,
                  }}
                >
                  {t("groupBanner.noteMaster")}
                </div>
              </div>

              <Link
                href="/contact"
                style={{
                  flexShrink: 0,
                  background: "#fff",
                  color: "#0b2a57",
                  border: "none",
                  fontWeight: 700,
                  padding: "13px 24px",
                  borderRadius: 9999,
                  fontSize: 14,
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  whiteSpace: "nowrap",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                }}
              >
                {t("groupBanner.cta")}
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Box */}
        <div
          style={{
            marginTop: 24,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: "20px 24px",
            boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
          }}
        >
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#1d5396",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {t("paymentBoxTitle")}
          </div>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 13.5,
              color: "#334155",
              lineHeight: 1.6,
            }}
          >
            <li>{t("paymentLine1")}</li>
            <li>{t("paymentLine2")}</li>
            <li>{t("paymentLine3")}</li>
          </ul>
        </div>

        {/* 교습료 신고 안내 박스 — 「학원법」 의무 게시 */}
        <div
          style={{
            marginTop: 28,
            padding: "20px 24px",
            borderRadius: 14,
            border: "1px solid #E5E7EB",
            background: "#F9FAFB",
            fontSize: 13,
            lineHeight: 1.7,
            color: "#374151",
          }}
        >
          <h3
            style={{
              fontWeight: 600,
              color: "#111827",
              marginBottom: 10,
              fontSize: 14,
            }}
          >
            📋 {isKo ? "교습료 신고 안내" : "Tutoring Fee Disclosure"}
          </h3>
          <p style={{ marginBottom: 12 }}>
            {isKo
              ? "본 서비스는 「학원의 설립·운영 및 과외교습에 관한 법률」에 따라 용인교육지원청에 신고된 개인과외교습 서비스입니다. 교습료는 신고된 시간당 단가 × 월 총 교습 시간으로 산정됩니다."
              : "This service is a registered private tutoring service under Korea's Act on the Establishment and Operation of Private Teaching Institutes, filed with the Yongin Education Support Office. Tuition is calculated as the declared hourly rate × monthly total tutoring hours."}
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12,
              marginBottom: 12,
            }}
          >
            <thead>
              <tr style={{ background: "#F3F4F6" }}>
                <th style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "left" }}>
                  {isKo ? "패키지" : "Package"}
                </th>
                <th style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "right" }}>
                  {isKo ? "월 교습료" : "Monthly Fee"}
                </th>
                <th style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "left" }}>
                  {isKo ? "신고 교습 시간 (산식)" : "Declared Hours (formula)"}
                </th>
                <th style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "right" }}>
                  {isKo ? "시간당" : "Per Hour"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px" }}>Basic</td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "right" }}>
                  ₩600,000
                </td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px" }}>
                  <strong>30.1h</strong>
                  <br />
                  <span style={{ color: "#9CA3AF", fontSize: 11 }}>
                    {isKo ? "일 140분 × 주 3회 × 4.3주" : "140min × 3/wk × 4.3wks"}
                  </span>
                </td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "right" }}>
                  ₩19,933
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px" }}>Advanced</td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "right" }}>
                  ₩860,000
                </td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px" }}>
                  <strong>43.0h</strong>
                  <br />
                  <span style={{ color: "#9CA3AF", fontSize: 11 }}>
                    {isKo ? "일 150분 × 주 4회 × 4.3주" : "150min × 4/wk × 4.3wks"}
                  </span>
                </td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "right" }}>
                  ₩20,000
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px" }}>Pro</td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "right" }}>
                  ₩960,000
                </td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px" }}>
                  <strong>48.0h</strong>
                  <br />
                  <span style={{ color: "#9CA3AF", fontSize: 11 }}>
                    {isKo ? "일 167분 × 주 4회 × 4.3주*" : "167min × 4/wk × 4.3wks*"}
                  </span>
                </td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "right" }}>
                  ₩20,000
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px" }}>Master</td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "right" }}>
                  ₩1,200,000
                </td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px" }}>
                  <strong>57.3h</strong>
                  <br />
                  <span style={{ color: "#9CA3AF", fontSize: 11 }}>
                    {isKo ? "일 160분 × 주 5회 × 4.3주" : "160min × 5/wk × 4.3wks"}
                  </span>
                </td>
                <td style={{ border: "1px solid #E5E7EB", padding: "6px 8px", textAlign: "right" }}>
                  ₩20,942
                </td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
            {isKo ? (
              <>
                ▸ <strong>1:1 실시간 화상 코칭</strong>: Basic·Advanced·Pro = 주 2회 × 55분 (월 ~7.3h),
                Master = 주 3회 × 55분 (월 ~11h)
              </>
            ) : (
              <>
                ▸ <strong>1:1 live video coaching</strong>: Basic·Advanced·Pro = 2/wk × 55min (~7.3h/mo),
                Master = 3/wk × 55min (~11h/mo)
              </>
            )}
          </p>
          <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
            {isKo
              ? "▸ 나머지 시간 = AI 학습 모니터링·과제 첨삭·학부모 주간 리포트·Q&A 응답 (비동기 학습 관리). 시간당 단가는 법정 상한(22,000원) 이내 준수."
              : "▸ Remaining hours = AI monitoring + homework review + parent weekly reports + Q&A responses (asynchronous management). Hourly rate within statutory cap (KRW 22,000)."}
          </p>
          <p style={{ fontSize: 12, color: "#6B7280" }}>
            {isKo
              ? "▸ * Pro 단가는 보완 신고 진행 중 · 신고번호: 발급 진행 중 (용인교육지원청) · 환불은 진행 회차 비율로 정산"
              : "▸ * Pro supplementary filing in progress · Registration: pending (Yongin Education Support Office) · Refunds calculated by completed session ratio"}
          </p>
        </div>
      </div>

      <style jsx>{`
        .pricing-pillars { grid-template-columns: 1fr; }
        .pricing-grid { grid-template-columns: 1fr; }
        :global(.pricing-value-title) { font-size: 28px; }
        :global(.pricing-table-title) { font-size: 24px; }
        :global(.group-banner-title) { font-size: 19px; }
        @media (min-width: 720px) {
          .pricing-pillars { grid-template-columns: repeat(3, 1fr); }
          .pricing-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1100px) {
          .pricing-grid { grid-template-columns: repeat(4, 1fr); gap: 18px; }
          :global(.pricing-value-title) { font-size: 40px; }
          :global(.pricing-table-title) { font-size: 32px; }
          :global(.group-banner-title) { font-size: 22px; }
        }
      `}</style>
    </section>
  );
}
