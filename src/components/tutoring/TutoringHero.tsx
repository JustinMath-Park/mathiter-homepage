"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function TutoringHero() {
  const t = useTranslations("tutoring.hero");

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "96px 0 72px",
        background: "linear-gradient(180deg, #f8fafc 0%, #fff 60%)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "55%",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "rgba(29,83,150,0.06)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 160,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(249,115,22,0.04)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div
        className="hero-grid"
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(11,42,87,0.15)",
              background: "rgba(11,42,87,0.04)",
              padding: "6px 14px",
              borderRadius: 9999,
              marginBottom: 24,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "#10b981" }} />
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: "#0b2a57",
                letterSpacing: "0.02em",
              }}
            >
              {t("badge")}
            </span>
          </div>

          <h1
            className="hero-title"
            style={{
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              fontWeight: 700,
              margin: 0,
              color: "#0b2a57",
            }}
          >
            {t.rich("headline", {
              em: (chunks) => (
                <span
                  style={{
                    background: "linear-gradient(135deg,#f59e0b 0%, #f97316 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    fontWeight: 700,
                  }}
                >
                  {chunks}
                </span>
              ),
              grad: (chunks) => (
                <span
                  style={{
                    background: "linear-gradient(135deg,#1d5396 0%, #2f7dd4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {chunks}
                </span>
              ),
              br: () => <br />,
            })}
          </h1>

          <p
            style={{
              marginTop: 24,
              fontSize: 18.5,
              lineHeight: 1.65,
              color: "#475569",
              maxWidth: 580,
              whiteSpace: "pre-line",
            }}
          >
            {t("subHeadline")}
          </p>

          <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                background: "linear-gradient(135deg,#f59e0b 0%, #f97316 100%)",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                padding: "16px 30px",
                borderRadius: 9999,
                fontSize: 15.5,
                cursor: "pointer",
                textDecoration: "none",
                boxShadow:
                  "0 12px 32px rgba(249,115,22,0.32), 0 2px 4px rgba(249,115,22,0.18)",
                transition: "transform .2s, box-shadow .2s",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 16px 36px rgba(249,115,22,0.38)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(249,115,22,0.32), 0 2px 4px rgba(249,115,22,0.18)";
              }}
            >
              {t("ctaPrimary")}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <a
              href="#process"
              style={{
                background: "#fff",
                color: "#0b2a57",
                border: "1.5px solid #cbd5e1",
                fontWeight: 600,
                padding: "16px 28px",
                borderRadius: 9999,
                fontSize: 15.5,
                cursor: "pointer",
                transition: "border-color .2s",
                textDecoration: "none",
                display: "inline-block",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0b2a57")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#cbd5e1")}
            >
              {t("ctaSecondary")}
            </a>
          </div>

          <p
            style={{
              marginTop: 14,
              fontSize: 13,
              color: "#64748b",
              fontWeight: 500,
              letterSpacing: "0.005em",
            }}
          >
            {t("ctaMicrocopy")}
          </p>

          <div
            style={{
              marginTop: 44,
              paddingTop: 28,
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              { i: "🎓", t: t("trustBadges.experience") },
              { i: "🏆", t: t("trustBadges.results") },
              { i: "📱", t: t("trustBadges.app") },
            ].map((b) => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "#eff5fc",
                    color: "#1d5396",
                    fontSize: 14,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {b.i}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#334155",
                  }}
                >
                  {b.t}
                </span>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>

      <style jsx>{`
        .hero-grid {
          grid-template-columns: 1fr;
        }
        :global(.hero-title) {
          font-size: 36px;
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.05fr 0.95fr;
          }
          :global(.hero-title) {
            font-size: 56px;
          }
        }
      `}</style>
    </section>
  );
}

function HeroVisual() {
  const t = useTranslations("tutoring.hero");
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setAnimated(true), 350);
    return () => clearTimeout(id);
  }, []);

  return (
    <div style={{ position: "relative", paddingLeft: 16 }}>
      <div
        style={{
          position: "absolute",
          inset: -20,
          background:
            "linear-gradient(120deg, rgba(29,83,150,0.18), rgba(47,125,212,0.18), rgba(249,115,22,0.10))",
          filter: "blur(40px)",
          borderRadius: 40,
          opacity: 0.7,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: -32,
          top: 32,
          zIndex: 3,
          width: 128,
          height: 128,
          borderRadius: "50%",
          overflow: "hidden",
          border: "5px solid #fff",
          boxShadow: "0 18px 40px rgba(15,23,42,0.18)",
          background: "linear-gradient(135deg, #1d5396, #0b2a57)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/justin-park.jpg"
          alt="박세준 (Justin Park) — Mathiter Tutoring 원장"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          background: "#0f172a",
          borderRadius: "18px 18px 6px 6px",
          padding: "10px 10px 14px",
          boxShadow: "0 30px 60px rgba(15,23,42,0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px 10px" }}>
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#ef4444" }} />
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#f59e0b" }} />
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#10b981" }} />
          <span
            style={{
              marginLeft: 12,
              fontSize: 11,
              color: "#94a3b8",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            {t("dashboard.url")}
          </span>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid #1e293b",
          }}
        >
          <DashboardMini animated={animated} />
        </div>
      </div>

      <div
        style={{
          height: 10,
          background: "linear-gradient(180deg,#1e293b,#0f172a)",
          borderRadius: "0 0 16px 16px",
          margin: "0 -8px",
        }}
      />
      <div
        style={{
          height: 4,
          background: "#cbd5e1",
          width: 80,
          margin: "2px auto 0",
          borderRadius: "0 0 8px 8px",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: -16,
          bottom: 36,
          zIndex: 3,
          background: "#fff",
          borderRadius: 14,
          padding: "14px 16px",
          boxShadow: "0 14px 30px rgba(15,23,42,0.14)",
          border: "1px solid #f1f5f9",
          minWidth: 220,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg,#fef3c7,#fde68a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b45309",
              fontSize: 16,
            }}
          >
            📅
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>
              {t("nextSession.label")}
            </div>
            <div style={{ fontSize: 13.5, color: "#0f172a", fontWeight: 600 }}>
              {t("nextSession.value")}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 11.5,
            color: "#475569",
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #f1f5f9",
            paddingTop: 8,
          }}
        >
          <span>{t("nextSession.topic")}</span>
          <span style={{ color: "#10b981", fontWeight: 600 }}>{t("nextSession.status")}</span>
        </div>
      </div>
    </div>
  );
}

function DashboardMini({ animated }: { animated: boolean }) {
  const t = useTranslations("tutoring.hero.dashboard");
  const trend = [82, 84, 83, 86, 85, 88, 87, 90, 91, 93, 92, 95];
  const W = 320,
    H = 64,
    pad = 4;
  const min = Math.min(...trend) - 4;
  const max = Math.max(...trend) + 4;
  const x = (i: number) => pad + (i / (trend.length - 1)) * (W - pad * 2);
  const y = (v: number) => H - pad - ((v - min) / (max - min)) * (H - pad * 2);
  const d = trend.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p)}`).join(" ");
  const area = `${d} L ${x(trend.length - 1)} ${H} L ${x(0)} ${H} Z`;

  const stats = [
    { v: "770", u: "/800", l: t("predicted"), c: "#1d5396" },
    { v: "94", u: "%", l: t("accuracy"), c: "#10b981" },
    { v: "23", u: "", l: t("sessions"), c: "#0b2a57" },
    { v: "5", u: "", l: t("weeks"), c: "#f97316" },
  ];

  return (
    <div style={{ background: "#fff" }}>
      <div
        style={{
          background: "linear-gradient(90deg,#0b2a57,#1d5396)",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            JK
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>
              {t("studentName")}
            </div>
            <div style={{ color: "#bdd2f0", fontSize: 10 }}>{t("studentInfo")}</div>
          </div>
        </div>
        <div
          style={{
            background: "#f97316",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 9999,
          }}
        >
          {t("trend")}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              padding: "10px 0",
              borderRight: i < 3 ? "1px solid #f1f5f9" : "none",
            }}
          >
            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: s.c,
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(6px)",
                transition: `all .7s ${i * 80}ms ease`,
              }}
            >
              {s.v}
              <span style={{ fontSize: 10, fontWeight: 500, color: "#94a3b8" }}>
                {s.u}
              </span>
            </div>
            <div style={{ fontSize: 10, color: "#64748b" }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#334155" }}>
            {t("trendTitle")}
          </span>
          <span style={{ fontSize: 10, color: "#047857", fontWeight: 600 }}>
            {t("trendDelta")}
          </span>
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", opacity: animated ? 1 : 0, transition: "opacity 1s" }}
        >
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d5396" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1d5396" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#hg)" />
          <path
            d={d}
            fill="none"
            stroke="#1d5396"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={x(trend.length - 1)} cy={y(trend[trend.length - 1])} r="3.5" fill="#f97316" />
          <circle
            cx={x(trend.length - 1)}
            cy={y(trend[trend.length - 1])}
            r="6"
            fill="#f97316"
            fillOpacity="0.25"
          />
        </svg>
      </div>
    </div>
  );
}
