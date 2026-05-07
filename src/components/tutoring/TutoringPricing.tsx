"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function TutoringPricing() {
  const t = useTranslations("tutoring.pricing");

  const plans = [
    {
      k: "elem",
      name: t("elem.name"),
      desc: t("elem.desc"),
      price: t("elem.price"),
      feats: [t("elem.feat1"), t("elem.feat2"), t("elem.feat3"), t("elem.feat4")],
      hi: false,
    },
    {
      k: "middle",
      name: t("middle.name"),
      desc: t("middle.desc"),
      price: t("middle.price"),
      feats: [t("middle.feat1"), t("middle.feat2"), t("middle.feat3"), t("middle.feat4")],
      hi: false,
    },
    {
      k: "high",
      name: t("high.name"),
      desc: t("high.desc"),
      price: t("high.price"),
      feats: [
        t("high.feat1"),
        t("high.feat2"),
        t("high.feat3"),
        t("high.feat4"),
        t("high.feat5"),
      ],
      hi: true,
    },
  ];

  return (
    <section id="pricing" style={{ padding: "112px 0", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: 12.5,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#1d5396",
              margin: 0,
            }}
          >
            {t("eyebrow")}
          </p>
          <h2
            className="pricing-title"
            style={{
              margin: "14px 0 0",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#0b2a57",
              lineHeight: 1.2,
            }}
          >
            {t("titleLine1")}{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#1d5396,#2f7dd4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("titleHighlight")}
            </span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 17, color: "#475569", lineHeight: 1.6 }}>
            {t("subtitle")}
          </p>

          <div
            style={{
              marginTop: 22,
              display: "inline-flex",
              gap: 14,
              alignItems: "center",
              padding: "10px 18px",
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 9999,
              fontSize: 13.5,
              color: "#334155",
              boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span style={{ fontWeight: 600 }}>⏱ {t("sessionLength")}</span>
            <span style={{ width: 1, height: 14, background: "#e2e8f0" }} />
            <span style={{ color: "#047857", fontWeight: 600 }}>{t("paymentNote")}</span>
          </div>
        </div>

        <div
          className="pricing-grid"
          style={{
            marginTop: 64,
            display: "grid",
            gap: 24,
          }}
        >
          {plans.map((p) => (
            <div
              key={p.k}
              style={{
                position: "relative",
                borderRadius: 20,
                padding: "36px 30px",
                background: "#fff",
                border: p.hi ? "2px solid #1d5396" : "1px solid #e2e8f0",
                boxShadow: p.hi
                  ? "0 25px 50px rgba(11,42,87,0.14)"
                  : "0 1px 3px rgba(15,23,42,0.04)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {p.hi && (
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg,#0b2a57,#1d5396)",
                    color: "#fff",
                    fontSize: 11.5,
                    fontWeight: 700,
                    padding: "6px 16px",
                    borderRadius: 9999,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("highlightTag")}
                </div>
              )}

              <h3
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0b2a57",
                  letterSpacing: "-0.015em",
                }}
              >
                {p.name}
              </h3>
              <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "#64748b", lineHeight: 1.5 }}>
                {p.desc}
              </p>

              <div style={{ marginTop: 24, paddingBottom: 20, borderBottom: "1px dashed #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#64748b" }}>
                    {t("currencySymbol")}
                  </span>
                  <span
                    style={{
                      fontSize: 38,
                      fontWeight: 700,
                      color: "#0b2a57",
                      letterSpacing: "-0.025em",
                      lineHeight: 1,
                    }}
                  >
                    {p.price}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "#64748b",
                      marginLeft: 4,
                      fontWeight: 500,
                    }}
                  >
                    {t("perSession")}
                  </span>
                </div>
              </div>

              <ul
                style={{
                  marginTop: 22,
                  marginBottom: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                  flex: 1,
                }}
              >
                {p.feats.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      gap: 10,
                      fontSize: 13.5,
                      color: "#334155",
                      alignItems: "flex-start",
                      lineHeight: 1.5,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={p.hi ? "#1d5396" : "#10b981"}
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                style={{
                  marginTop: 28,
                  width: "100%",
                  padding: "13px 0",
                  borderRadius: 9999,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  textAlign: "center",
                  background: p.hi ? "linear-gradient(135deg,#f59e0b,#f97316)" : "#fff",
                  color: p.hi ? "#fff" : "#0b2a57",
                  border: p.hi ? "none" : "1.5px solid #cbd5e1",
                  boxShadow: p.hi ? "0 10px 24px rgba(249,115,22,0.32)" : "none",
                  display: "block",
                }}
              >
                {p.hi ? t("primaryCta") : t("secondaryCta")}
              </Link>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <div
            className="group-banner"
            style={{
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(105deg,#0b2a57 0%, #153f7a 60%, #1d5396 100%)",
              color: "#fff",
              borderRadius: 20,
              padding: "32px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 28,
              flexWrap: "wrap",
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
                background: "rgba(249,115,22,0.18)",
                filter: "blur(40px)",
              }}
            />

            <div
              style={{
                position: "relative",
                display: "flex",
                gap: 20,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: "linear-gradient(135deg,#f59e0b,#f97316)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 24px rgba(249,115,22,0.4)",
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
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fbbf24",
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
                    lineHeight: 1.3,
                  }}
                >
                  {t("groupBanner.titleLine1")}
                  <br />
                  {t("groupBanner.titleLine2Prefix")}
                  <span style={{ color: "#fdba74", fontStyle: "italic" }}>
                    {t("groupBanner.titleLine2Highlight")}
                  </span>
                  {t("groupBanner.titleLine2Suffix")}
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              style={{
                position: "relative",
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

      <style jsx>{`
        .pricing-grid { grid-template-columns: 1fr; }
        :global(.pricing-title) { font-size: 30px; }
        :global(.group-banner-title) { font-size: 20px; }
        @media (min-width: 720px) {
          .pricing-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .pricing-grid { grid-template-columns: 1fr 1fr 1fr; }
          :global(.pricing-title) { font-size: 44px; }
          :global(.group-banner-title) { font-size: 24px; }
        }
      `}</style>
    </section>
  );
}
