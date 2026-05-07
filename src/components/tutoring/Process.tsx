import { useTranslations } from "next-intl";

export default function Process() {
  const t = useTranslations("tutoring.process");

  const steps = [
    {
      key: "step1",
      accent: "#1d5396",
      chipBg: "#eff5fc",
      chipColor: "#1d5396",
      mode: "neutral" as const,
    },
    {
      key: "step2",
      accent: "#f97316",
      chipBg: "#fff7ed",
      chipColor: "#c2410c",
      mode: "in-person" as const,
    },
    {
      key: "step3",
      accent: "#1d5396",
      chipBg: "#eff5fc",
      chipColor: "#1d5396",
      mode: "neutral" as const,
    },
    {
      key: "step4",
      accent: "#10b981",
      chipBg: "#ecfdf5",
      chipColor: "#047857",
      mode: "online" as const,
    },
  ] as const;

  return (
    <section id="process" style={{ padding: "112px 0", background: "#f8fafc" }}>
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
            className="proc-title"
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
          <p
            style={{
              marginTop: 18,
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
          className="proc-grid"
          style={{
            marginTop: 72,
            display: "grid",
            gap: 20,
            position: "relative",
          }}
        >
          {steps.map(({ key, accent, chipBg, chipColor, mode }) => (
            <article
              key={key}
              style={{
                position: "relative",
                background: "#fff",
                borderRadius: 18,
                padding: "28px 26px 26px",
                border:
                  mode === "in-person"
                    ? "1.5px solid rgba(249,115,22,0.4)"
                    : mode === "online"
                      ? "1.5px solid rgba(16,185,129,0.4)"
                      : "1px solid #e2e8f0",
                boxShadow:
                  mode === "in-person" || mode === "online"
                    ? "0 18px 40px rgba(15,23,42,0.08)"
                    : "0 1px 3px rgba(15,23,42,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#f1f5f9",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {t(`${key}.number` as `step1.number`)}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: chipColor,
                    background: chipBg,
                    padding: "4px 10px",
                    borderRadius: 9999,
                    textTransform: "uppercase",
                  }}
                >
                  {t(`${key}.modeTag` as `step1.modeTag`)}
                </span>
              </div>

              <h3
                style={{
                  margin: 0,
                  fontSize: 19,
                  fontWeight: 700,
                  color: "#0b2a57",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.3,
                }}
              >
                {t(`${key}.title` as `step1.title`)}
              </h3>

              <div
                style={{
                  fontSize: 12.5,
                  color: accent,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                ⏱ {t(`${key}.duration` as `step1.duration`)}
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "#475569",
                }}
              >
                {t(`${key}.body` as `step1.body`)}
              </p>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "inline-flex",
              gap: 12,
              alignItems: "flex-start",
              padding: "14px 22px",
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              fontSize: 14,
              color: "#334155",
              boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
              maxWidth: 720,
              textAlign: "left",
              lineHeight: 1.6,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              style={{ flexShrink: 0, marginTop: 1 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>{t("footerNote")}</span>
          </div>
        </div>
      </div>

      <style>{`
        .proc-grid { grid-template-columns: 1fr; }
        .proc-title { font-size: 28px; }
        @media (min-width: 640px) {
          .proc-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .proc-grid { grid-template-columns: repeat(4, 1fr); }
          .proc-title { font-size: 44px; }
        }
      `}</style>
    </section>
  );
}
