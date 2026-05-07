"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function FinalCta() {
  const t = useTranslations("tutoring.finalCta");
  const tFooter = useTranslations("tutoring.footer");

  return (
    <section
      id="contact"
      style={{
        padding: "112px 0 120px",
        background: "linear-gradient(180deg,#fff 0%, #f8fafc 100%)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg,#0b2a57 0%, #153f7a 60%, #1d5396 100%)",
            color: "#fff",
            borderRadius: 28,
            padding: "72px 32px",
            textAlign: "center",
            boxShadow: "0 30px 60px rgba(11,42,87,0.30)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -100,
              left: -80,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "rgba(249,115,22,0.18)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -120,
              right: -100,
              width: 380,
              height: 380,
              borderRadius: "50%",
              background: "rgba(47,125,212,0.30)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.05,
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#fdba74",
                textTransform: "uppercase",
              }}
            >
              {t("tag")}
            </div>
            <h2
              className="cta-title"
              style={{
                margin: "24px 0 0",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#fff",
              }}
            >
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h2>
            <p
              style={{
                margin: "20px auto 0",
                fontSize: 19,
                color: "#bdd2f0",
                lineHeight: 1.55,
                maxWidth: 600,
              }}
            >
              {t("subtitle")}
            </p>

            <div
              style={{
                marginTop: 40,
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/contact"
                style={{
                  background: "linear-gradient(135deg,#f59e0b 0%, #f97316 100%)",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  padding: "16px 32px",
                  borderRadius: 9999,
                  fontSize: 16,
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 12px 28px rgba(249,115,22,0.40)",
                }}
              >
                {t("whatsapp")}
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  fontWeight: 600,
                  padding: "14.5px 28px",
                  borderRadius: 9999,
                  fontSize: 15.5,
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {t("kakao")}
              </Link>
            </div>

            <div
              style={{
                marginTop: 28,
                display: "flex",
                justifyContent: "center",
                gap: 24,
                flexWrap: "wrap",
                color: "#bdd2f0",
                fontSize: 13,
              }}
            >
              <span>{t("trust1")}</span>
              <span>{t("trust2")}</span>
              <span>{t("trust3")}</span>
            </div>
          </div>
        </div>

        <footer
          style={{
            marginTop: 80,
            paddingTop: 36,
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-mark.png"
              alt="Mathiter"
              style={{ width: 28, height: 28, borderRadius: 7 }}
            />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0b2a57" }}>Mathiter</span>
            <span style={{ fontSize: 12.5, color: "#94a3b8", marginLeft: 8 }}>
              {tFooter("by")}
            </span>
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#64748b", flexWrap: "wrap" }}>
            <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>
              {tFooter("blog")}
            </Link>
            <Link href="/product" style={{ color: "inherit", textDecoration: "none" }}>
              {tFooter("productPage")}
            </Link>
            <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>
              {tFooter("privacy")}
            </Link>
            <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }}>
              {tFooter("terms")}
            </Link>
            <a
              href="https://app.mathiter.com"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {tFooter("app")}
            </a>
          </div>
        </footer>
      </div>

      <style>{`
        .cta-title { font-size: 32px; }
        @media (min-width: 768px) {
          .cta-title { font-size: 48px; }
        }
      `}</style>
    </section>
  );
}
