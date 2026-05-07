import { useTranslations } from "next-intl";

export default function TutorProfile() {
  const t = useTranslations("tutoring.tutor");

  return (
    <section
      id="tutor"
      style={{
        padding: "112px 0",
        background: "#0b2a57",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "rgba(47,125,212,0.25)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -120,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(249,115,22,0.10)",
          filter: "blur(80px)",
        }}
      />

      <div
        className="tutor-grid"
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              aspectRatio: "4/5",
              borderRadius: 20,
              background: "linear-gradient(135deg,#153f7a,#0b2a57)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textAlign: "center",
                lineHeight: 1.6,
                whiteSpace: "pre-line",
              }}
            >
              {t("photoPlaceholder")}
            </span>
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                padding: "6px 12px",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {t("leadTag")}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: -28,
              right: -28,
              background: "#fff",
              color: "#0f172a",
              padding: "16px 18px",
              borderRadius: 16,
              boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
              maxWidth: 240,
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#fff7ed",
                  color: "#c2410c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                }}
              >
                🎓
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#64748b",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("credentialLabel")}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#0b2a57",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("credentialValue")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
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
            className="tutor-name"
            style={{
              margin: "14px 0 0",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            {t("name")}
          </h2>
          <p style={{ marginTop: 10, fontSize: 17, color: "#bdd2f0", fontWeight: 500 }}>
            {t("subtitle")}
          </p>

          <blockquote
            style={{
              margin: "32px 0 0",
              padding: "20px 24px",
              borderLeft: "3px solid #f97316",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "4px 16px 16px 4px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 18,
                lineHeight: 1.6,
                color: "#fff",
                fontWeight: 500,
                fontStyle: "italic",
                whiteSpace: "pre-line",
              }}
            >
              &ldquo;{t("quote")}&rdquo;
            </p>
          </blockquote>

          <div
            className="tutor-stats"
            style={{
              marginTop: 32,
              display: "grid",
              gap: 20,
            }}
          >
            {[
              { v: t("stat1Value"), l: t("stat1Label") },
              { v: t("stat2Value"), l: t("stat2Label") },
              { v: t("stat3Value"), l: t("stat3Label") },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  padding: "16px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "#bdd2f0",
                    marginTop: 4,
                    lineHeight: 1.45,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 32,
              padding: "20px 22px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 14,
            }}
          >
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: "#fdba74",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {t("educationTitle")}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                t("education1"),
                t("education2"),
                t("education3"),
                t("education4"),
                t("education5"),
              ].map((e) => (
                <li
                  key={e}
                  style={{
                    display: "flex",
                    gap: 10,
                    fontSize: 14,
                    color: "#dce9f8",
                    lineHeight: 1.5,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#f97316",
                      marginTop: 8,
                    }}
                  />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 24 }}>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: "#bdd2f0",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {t("subjectsTitle")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                t("subject1"),
                t("subject2"),
                t("subject3"),
                t("subject4"),
                t("subject5"),
                t("subject6"),
                t("subject7"),
              ].map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 12.5,
                    padding: "6px 12px",
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.08)",
                    color: "#dce9f8",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tutor-grid { grid-template-columns: 1fr; }
        .tutor-name { font-size: 32px; }
        .tutor-stats { grid-template-columns: 1fr; }
        @media (min-width: 900px) {
          .tutor-grid { grid-template-columns: 0.8fr 1.2fr; }
          .tutor-name { font-size: 44px; }
          .tutor-stats { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  );
}
