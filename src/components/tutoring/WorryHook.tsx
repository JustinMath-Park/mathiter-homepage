"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function WorryHook() {
  const t = useTranslations("tutoring.worryHook");

  const worries = [
    { key: "going", accent: "#f97316", chipBg: "#fff7ed", chipColor: "#c2410c" },
    { key: "current", accent: "#1d5396", chipBg: "#eff5fc", chipColor: "#1d5396" },
    { key: "abroad", accent: "#10b981", chipBg: "#ecfdf5", chipColor: "#047857" },
  ] as const;

  return (
    <section
      id="worry"
      style={{
        padding: "112px 0",
        background: "linear-gradient(180deg,#fff 0%, #f8fafc 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -100,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(249,115,22,0.05)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
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
            className="worry-title"
            style={{
              margin: "14px 0 0",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#0b2a57",
              lineHeight: 1.2,
            }}
          >
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>
          <p
            style={{
              marginTop: 20,
              fontSize: 17,
              color: "#475569",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
            }}
          >
            {t("subtitle")}
          </p>
        </div>

        <div
          className="worry-grid"
          style={{
            marginTop: 64,
            display: "grid",
            gap: 24,
          }}
        >
          {worries.map(({ key, accent, chipBg, chipColor }) => (
            <article
              key={key}
              style={{
                position: "relative",
                background: "#fff",
                borderRadius: 20,
                padding: "32px 30px 28px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                transition: "box-shadow .25s, transform .25s, border-color .2s",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  alignSelf: "flex-start",
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: chipColor,
                  background: chipBg,
                  padding: "5px 12px",
                  borderRadius: 9999,
                  textTransform: "uppercase",
                }}
              >
                {t(`${key}.tag` as `${typeof key}.tag`)}
              </span>

              <p
                style={{
                  margin: 0,
                  fontSize: 19,
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                  color: "#0b2a57",
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: accent, fontWeight: 700, marginRight: 6 }}>Q.</span>
                {t(`${key}.q` as `${typeof key}.q`)}
              </p>

              <div
                style={{
                  position: "relative",
                  paddingLeft: 20,
                  borderLeft: `3px solid ${accent}`,
                  marginTop: "auto",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 14.5,
                    lineHeight: 1.65,
                    color: "#475569",
                  }}
                >
                  {t(`${key}.a` as `${typeof key}.a`)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: 80,
            position: "relative",
            background: "linear-gradient(135deg,#0b2a57 0%, #153f7a 60%, #1d5396 100%)",
            color: "#fff",
            borderRadius: 24,
            padding: "44px 40px",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(11,42,87,0.20)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(249,115,22,0.18)",
              filter: "blur(50px)",
            }}
          />
          <h3
            className="worry-meaning-title"
            style={{
              margin: 0,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#fff",
              lineHeight: 1.2,
              position: "relative",
            }}
          >
            {t.rich("meaning.title", {
              grad: (chunks) => (
                <span
                  style={{
                    background: "linear-gradient(135deg,#fbbf24,#f97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {chunks}
                </span>
              ),
            })}
          </h3>
          <p
            style={{
              margin: "16px auto 28px",
              fontSize: 16.5,
              lineHeight: 1.7,
              color: "#bdd2f0",
              maxWidth: 620,
              position: "relative",
            }}
          >
            {t("meaning.body")}
          </p>
          <Link
            href="/contact"
            style={{
              position: "relative",
              background: "linear-gradient(135deg,#f59e0b 0%, #f97316 100%)",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              padding: "14px 28px",
              borderRadius: 9999,
              fontSize: 15,
              cursor: "pointer",
              textDecoration: "none",
              boxShadow: "0 12px 28px rgba(249,115,22,0.32)",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {t("cta")}
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        .worry-grid { grid-template-columns: 1fr; }
        .worry-title { font-size: 28px; }
        .worry-meaning-title { font-size: 24px; }
        @media (min-width: 768px) {
          .worry-title { font-size: 38px; }
          .worry-meaning-title { font-size: 30px; }
        }
        @media (min-width: 1024px) {
          .worry-grid { grid-template-columns: repeat(3, 1fr); }
          .worry-title { font-size: 44px; }
        }
      `}</style>
    </section>
  );
}
