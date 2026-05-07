"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Faq() {
  const t = useTranslations("tutoring.faq");
  const [openIdx, setOpenIdx] = useState<number>(0);

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
    { q: t("q7"), a: t("a7") },
  ];

  return (
    <section id="faq" style={{ padding: "112px 0", background: "#fff" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
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
            className="faq-title"
            style={{
              margin: "14px 0 0",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#0b2a57",
              lineHeight: 1.15,
            }}
          >
            {t("title")}
          </h2>
        </div>

        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((it, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                style={{
                  background: isOpen ? "#f8fafc" : "#fff",
                  border: isOpen ? "1px solid rgba(29,83,150,0.25)" : "1px solid #e2e8f0",
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "border-color .2s, background .2s",
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "20px 24px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    color: "#0b2a57",
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    style={{
                      fontSize: 16.5,
                      fontWeight: 600,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {it.q}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      background: isOpen ? "#0b2a57" : "#eff5fc",
                      color: isOpen ? "#fff" : "#1d5396",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all .2s",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                        transition: "transform .25s",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 400 : 0,
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height .35s ease, opacity .25s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "0 24px 22px",
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: "#475569",
                    }}
                  >
                    {it.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-title { font-size: 30px; }
        @media (min-width: 768px) {
          .faq-title { font-size: 40px; }
        }
      `}</style>
    </section>
  );
}
