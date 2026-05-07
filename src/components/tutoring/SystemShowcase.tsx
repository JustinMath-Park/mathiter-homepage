import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function SystemShowcase() {
  const t = useTranslations("tutoring.system");

  return (
    <section id="system" style={{ padding: "112px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
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
            className="sys-title"
            style={{
              margin: "14px 0 0",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#0b2a57",
              lineHeight: 1.15,
            }}
          >
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>
          <p style={{ marginTop: 18, fontSize: 18, color: "#475569", lineHeight: 1.6 }}>
            {t("subtitle")}
          </p>
        </div>

        {/* For Students */}
        <div
          className="sys-row"
          style={{
            marginTop: 96,
            display: "grid",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: "#1d5396",
                background: "#eff5fc",
                padding: "5px 12px",
                borderRadius: 9999,
              }}
            >
              {t("students.tag")}
            </span>
            <h3
              className="sys-h3"
              style={{
                margin: "20px 0 16px",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "#0b2a57",
                lineHeight: 1.15,
              }}
            >
              {t("students.title")}
            </h3>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: "#475569" }}>
              {t("students.body")}
            </p>
            <ul
              style={{
                marginTop: 28,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {[
                { t: t("students.item1Title"), s: t("students.item1Body") },
                { t: t("students.item2Title"), s: t("students.item2Body") },
                { t: t("students.item3Title"), s: t("students.item3Body") },
              ].map((b) => (
                <li key={b.t} style={{ display: "flex", gap: 14 }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "#eff5fc",
                      color: "#1d5396",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>
                      {b.t}
                    </div>
                    <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.55 }}>{b.s}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <StudentMockup />
        </div>

        {/* For Parents */}
        <div
          className="sys-row sys-row-alt"
          style={{
            marginTop: 128,
            display: "grid",
            gap: 80,
            alignItems: "center",
          }}
        >
          <ParentMockup />
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: "#c2410c",
                background: "#fff7ed",
                padding: "5px 12px",
                borderRadius: 9999,
              }}
            >
              {t("parents.tag")}
            </span>
            <h3
              className="sys-h3"
              style={{
                margin: "20px 0 16px",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "#0b2a57",
                lineHeight: 1.15,
              }}
            >
              {t("parents.title")}
            </h3>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: "#475569" }}>
              {t("parents.body")}
            </p>
            <ul
              style={{
                marginTop: 28,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {[
                { t: t("parents.item1Title"), s: t("parents.item1Body") },
                { t: t("parents.item2Title"), s: t("parents.item2Body") },
                { t: t("parents.item3Title"), s: t("parents.item3Body") },
              ].map((b) => (
                <li key={b.t} style={{ display: "flex", gap: 14 }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "#fff7ed",
                      color: "#c2410c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>
                      {b.t}
                    </div>
                    <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.55 }}>{b.s}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 64, display: "flex", justifyContent: "center" }}>
          <Link
            href="/product"
            className="sys-app-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "13px 24px",
              background: "#fff",
              border: "1.5px solid #cbd5e1",
              borderRadius: 9999,
              fontSize: 14.5,
              fontWeight: 600,
              color: "#0b2a57",
              textDecoration: "none",
              boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
              transition: "border-color .2s, color .2s",
            }}
          >
            {t("appCta")}
          </Link>
        </div>
      </div>

      <style>{`
        .sys-row { grid-template-columns: 1fr; }
        .sys-h3 { font-size: 28px; }
        .sys-title { font-size: 32px; }
        .sys-app-cta:hover { border-color: #1d5396 !important; color: #1d5396 !important; }
        @media (min-width: 1024px) {
          .sys-row { grid-template-columns: 1fr 1.05fr; }
          .sys-row-alt { grid-template-columns: 1.05fr 1fr; }
          .sys-h3 { font-size: 36px; }
          .sys-title { font-size: 44px; }
        }
      `}</style>
    </section>
  );
}

function StudentMockup() {
  const t = useTranslations("tutoring.system.studentMockup");
  const topics = [
    { t: t("topic1"), v: 96, c: "#10b981" },
    { t: t("topic2"), v: 88, c: "#10b981" },
    { t: t("topic3"), v: 64, c: "#f97316" },
    { t: t("topic4"), v: 52, c: "#ef4444" },
    { t: t("topic5"), v: 81, c: "#1d5396" },
  ];
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: -16,
          background: "linear-gradient(120deg, rgba(29,83,150,0.16), rgba(47,125,212,0.16))",
          filter: "blur(40px)",
          borderRadius: 32,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 18,
          border: "1px solid #e2e8f0",
          boxShadow: "0 25px 50px rgba(15,23,42,0.10)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 22px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#f97316" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#0b2a57" }}>{t("header")}</span>
          </div>
          <span
            style={{
              fontSize: 11,
              color: "#64748b",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            34:12 / 70:00
          </span>
        </div>

        <div style={{ padding: "22px 22px 18px", background: "#f8fafc" }}>
          <div
            style={{
              fontSize: 11,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            {t("questionLabel")}
          </div>
          <div style={{ fontSize: 14, color: "#0f172a", lineHeight: 1.6 }}>
            {t("questionText")}{" "}
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                background: "#fff",
                padding: "1px 6px",
                borderRadius: 4,
                border: "1px solid #e2e8f0",
              }}
            >
              f(x) = 2x² − 3x + 1
            </span>
            {" / "}
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                background: "#fff",
                padding: "1px 6px",
                borderRadius: 4,
                border: "1px solid #e2e8f0",
              }}
            >
              f(−2)
            </span>
          </div>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { l: "A", v: "11", state: null as null | "correct" | "selected" },
              { l: "B", v: "15", state: "correct" as const },
              { l: "C", v: "−1", state: "selected" as const },
              { l: "D", v: "3", state: null },
            ].map((o) => (
              <div
                key={o.l}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  background:
                    o.state === "selected" ? "#fef2f2" : o.state === "correct" ? "#ecfdf5" : "#fff",
                  border:
                    o.state === "selected"
                      ? "1.5px solid #ef4444"
                      : o.state === "correct"
                        ? "1.5px solid #10b981"
                        : "1px solid #e2e8f0",
                  borderRadius: 10,
                  fontSize: 13,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: "#fff",
                    border: "1px solid #cbd5e1",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  {o.l}
                </span>
                <span style={{ color: "#0f172a", fontWeight: 500 }}>{o.v}</span>
                {o.state === "correct" && (
                  <span style={{ marginLeft: "auto", fontSize: 10, color: "#047857", fontWeight: 700 }}>
                    {t("correctLabel")}
                  </span>
                )}
                {o.state === "selected" && (
                  <span style={{ marginLeft: "auto", fontSize: 10, color: "#b91c1c", fontWeight: 700 }}>
                    {t("pickedLabel")}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "10px 12px",
              background: "#fff",
              border: "1px dashed #f97316",
              borderRadius: 10,
              fontSize: 12.5,
              color: "#9a3412",
            }}
          >
            {t("autoNote")}
          </div>
        </div>

        <div style={{ padding: "18px 22px 22px", borderTop: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#0b2a57" }}>
              {t("topicMastery")}
            </span>
            <span style={{ fontSize: 11, color: "#64748b" }}>{t("updated")}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {topics.map((tp) => (
              <div key={tp.t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontSize: 11.5,
                    color: "#475569",
                    width: 110,
                    flexShrink: 0,
                  }}
                >
                  {tp.t}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    background: "#f1f5f9",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${tp.v}%`,
                      height: "100%",
                      background: tp.c,
                      borderRadius: 999,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#334155",
                    width: 32,
                    textAlign: "right",
                  }}
                >
                  {tp.v}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ParentMockup() {
  const t = useTranslations("tutoring.system.parentMockup");
  const sessions = [
    {
      d: t("session1Date"),
      tp: t("session1Topic"),
      s: t("session1Summary"),
      c: "#10b981",
    },
    {
      d: t("session2Date"),
      tp: t("session2Topic"),
      s: t("session2Summary"),
      c: "#f59e0b",
    },
    {
      d: t("session3Date"),
      tp: t("session3Topic"),
      s: t("session3Summary"),
      c: "#10b981",
    },
  ];
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: -16,
          background: "linear-gradient(120deg, rgba(249,115,22,0.16), rgba(245,158,11,0.16))",
          filter: "blur(40px)",
          borderRadius: 32,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 18,
          border: "1px solid #e2e8f0",
          boxShadow: "0 25px 50px rgba(15,23,42,0.10)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(90deg,#0b2a57,#1d5396)",
            color: "#fff",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: "#bdd2f0",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontWeight: 600,
              }}
            >
              {t("view")}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{t("title")}</div>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "6px 12px",
              borderRadius: 9999,
              fontSize: 11.5,
              fontWeight: 600,
            }}
          >
            {t("tuitionStatus")}
          </div>
        </div>

        <div style={{ padding: "20px 22px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div
                style={{
                  fontSize: 11.5,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                }}
              >
                {t("predictedLabel")}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 38, fontWeight: 700, color: "#0b2a57", letterSpacing: "-0.02em" }}>
                  {t("predictedValue")}
                </span>
                <span style={{ fontSize: 14, color: "#64748b" }}>{t("predictedMax")}</span>
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 12,
                    color: "#047857",
                    background: "#ecfdf5",
                    padding: "3px 8px",
                    borderRadius: 9999,
                    fontWeight: 700,
                  }}
                >
                  {t("trend")}
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#64748b" }}>{t("targetLabel")}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#f97316" }}>{t("targetValue")}</div>
            </div>
          </div>
          <div
            style={{
              marginTop: 14,
              height: 8,
              background: "#fff",
              borderRadius: 999,
              border: "1px solid #f1f5f9",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "92%",
                height: "100%",
                background: "linear-gradient(90deg,#1d5396,#2f7dd4)",
                borderRadius: 999,
              }}
            />
          </div>
        </div>

        <div style={{ padding: "18px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#0b2a57" }}>{t("notesTitle")}</span>
            <span style={{ fontSize: 11, color: "#1d5396", fontWeight: 600 }}>{t("viewAll")}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sessions.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "10px 12px",
                  background: "#f8fafc",
                  borderRadius: 10,
                  border: "1px solid #f1f5f9",
                }}
              >
                <span
                  style={{
                    width: 4,
                    alignSelf: "stretch",
                    borderRadius: 4,
                    background: s.c,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#0f172a" }}>{s.tp}</span>
                    <span
                      style={{
                        fontSize: 10.5,
                        color: "#64748b",
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      {s.d}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>{s.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "14px 22px",
            background: "#fff7ed",
            borderTop: "1px solid #fde68a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "#fde68a",
                color: "#92400e",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ₩
            </span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#92400e" }}>{t("invoiceTitle")}</div>
              <div style={{ fontSize: 10.5, color: "#b45309" }}>{t("invoiceMeta")}</div>
            </div>
          </div>
          <span
            style={{
              fontSize: 11,
              color: "#047857",
              fontWeight: 700,
              background: "#ecfdf5",
              padding: "4px 10px",
              borderRadius: 9999,
            }}
          >
            {t("invoiceStatus")}
          </span>
        </div>
      </div>
    </div>
  );
}
