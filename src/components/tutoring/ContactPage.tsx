"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ContactForm from "@/app/[locale]/contact/ContactForm";
import type { BlogLocale } from "@/types/blog";

export default function ContactPage() {
  const t = useTranslations("tutoring.contact");
  const rawLocale = useLocale();
  // ContactForm은 ko/en 카피만 가지고 있음 — ms/zh는 ko로 안전 fallback
  const locale: BlogLocale = rawLocale === "en" ? "en" : "ko";
  const [kakaoCopied, setKakaoCopied] = useState(false);

  const phoneNumber = t("phone.value");
  const kakaoId = t("kakao.value");
  const emailAddress = t("email.value");

  function handleKakaoCopy(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(kakaoId).catch(() => {});
    }
    setKakaoCopied(true);
    window.setTimeout(() => setKakaoCopied(false), 2000);
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Mini header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-mark.png"
              alt="Mathiter Tutoring"
              style={{ width: 30, height: 30, borderRadius: 7 }}
            />
            <span
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#0b2a57",
                letterSpacing: "-0.015em",
              }}
            >
              Mathiter Tutoring
            </span>
          </Link>
          <Link
            href="/"
            style={{
              fontSize: 14,
              color: "#475569",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            {t("back")}
          </Link>
        </div>
      </header>

      <main style={{ padding: "72px 0 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          {/* Header */}
          <section style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
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
              {t("header.eyebrow")}
            </p>
            <h1
              className="contact-title"
              style={{
                margin: "14px 0 0",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "#0b2a57",
                lineHeight: 1.2,
              }}
            >
              {t("header.title")}
            </h1>
            <p
              style={{
                marginTop: 18,
                fontSize: 17,
                color: "#475569",
                lineHeight: 1.7,
                whiteSpace: "pre-line",
              }}
            >
              {t("header.subtitle")}
            </p>
          </section>

          {/* Channels + Form */}
          <section
            className="contact-grid"
            style={{
              marginTop: 56,
              display: "grid",
              gap: 24,
              alignItems: "start",
            }}
          >
            {/* Left: 3 channel cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <ChannelCard
                tag={t("phone.tag")}
                title={t("phone.title")}
                value={phoneNumber}
                hint={t("phone.hint")}
                cta={t("phone.cta")}
                href={`tel:${t("phone.tel")}`}
                accent="#1d5396"
                chipBg="#eff5fc"
              />
              <ChannelCard
                tag={t("kakao.tag")}
                title={t("kakao.title")}
                value={kakaoId}
                hint={t("kakao.hint")}
                cta={kakaoCopied ? t("kakao.copied") : t("kakao.cta")}
                href="#kakao-copy"
                onClick={handleKakaoCopy}
                accent="#92400e"
                chipBg="#fef3c7"
              />
              <ChannelCard
                tag={t("email.tag")}
                title={t("email.title")}
                value={emailAddress}
                hint={t("email.hint")}
                cta={t("email.cta")}
                href={`mailto:${emailAddress}`}
                accent="#0b2a57"
                chipBg="#e0e7ff"
              />
            </div>

            {/* Right: 3-Step Inquiry Wizard */}
            <article
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "36px 32px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
              }}
            >
              <ContactForm locale={locale} />

              <p
                style={{
                  margin: "20px 0 0",
                  fontSize: 11,
                  color: "#94a3b8",
                  lineHeight: 1.55,
                  textAlign: "center",
                }}
              >
                {t("form.agreement")}
              </p>
            </article>
          </section>

          {/* Trust badges */}
          <section
            style={{
              marginTop: 48,
              display: "flex",
              gap: 18,
              justifyContent: "center",
              flexWrap: "wrap",
              fontSize: 13,
              color: "#475569",
            }}
          >
            <span>{t("trust.reply")}</span>
            <span>{t("trust.trial")}</span>
            <span>{t("trust.payment")}</span>
            <span>{t("trust.refund")}</span>
          </section>

          {/* Tutor info card */}
          <section
            style={{
              marginTop: 56,
              background: "linear-gradient(135deg,#0b2a57 0%, #153f7a 60%, #1d5396 100%)",
              color: "#fff",
              borderRadius: 20,
              padding: "32px 36px",
              display: "flex",
              gap: 22,
              alignItems: "flex-start",
              flexWrap: "wrap",
              boxShadow: "0 20px 40px rgba(11,42,87,0.20)",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg,#f59e0b,#f97316)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                boxShadow: "0 10px 24px rgba(249,115,22,0.4)",
              }}
            >
              🎓
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  color: "#fdba74",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {t("tutor.title")}
              </div>
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.015em",
                  marginBottom: 10,
                }}
              >
                {t("tutor.name")}
              </div>
              <div style={{ fontSize: 14, color: "#bdd2f0", lineHeight: 1.65, marginBottom: 8 }}>
                {t("tutor.summary")}
              </div>
              <div style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.6 }}>
                {t("tutor.education")}
              </div>
            </div>
          </section>
        </div>
      </main>

      <style>{`
        .contact-grid { grid-template-columns: 1fr; }
        .contact-title { font-size: 30px; }
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 0.85fr 1.15fr; gap: 28px; }
          .contact-title { font-size: 42px; }
        }
      `}</style>
    </div>
  );
}

type ChannelCardProps = {
  tag: string;
  title: string;
  value: string;
  hint: string;
  cta: string;
  href: string;
  accent: string;
  chipBg: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

function ChannelCard({ tag, title, value, hint, cta, href, accent, chipBg, external, onClick }: ChannelCardProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        display: "block",
        background: "#fff",
        borderRadius: 16,
        padding: "20px 22px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
        textDecoration: "none",
        color: "inherit",
        transition: "box-shadow .2s, transform .2s, border-color .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 14px 30px rgba(15,23,42,0.08)";
        e.currentTarget.style.borderColor = "rgba(29,83,150,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.04)";
        e.currentTarget.style.borderColor = "#e2e8f0";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: accent,
            background: chipBg,
            padding: "5px 10px",
            borderRadius: 9999,
          }}
        >
          {tag}
        </span>
        <span style={{ fontSize: 13, color: accent, fontWeight: 600 }}>{cta} →</span>
      </div>
      <div
        style={{
          marginTop: 14,
          fontSize: 16,
          fontWeight: 700,
          color: "#0b2a57",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 4,
          fontSize: 18,
          fontWeight: 600,
          color: "#0f172a",
          letterSpacing: "0",
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      >
        {value}
      </div>
      <div style={{ marginTop: 6, fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{hint}</div>
    </a>
  );
}

type FormFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
};

function FormField({ name, label, placeholder, required, multiline }: FormFieldProps) {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontSize: 14.5,
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    background: "#f8fafc",
    color: "#0f172a",
    fontFamily: "inherit",
    transition: "border-color .15s, background .15s",
    boxSizing: "border-box",
  };
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#334155" }}>
        {label}
        {required ? <span style={{ color: "#f97316", marginLeft: 4 }}>*</span> : null}
      </span>
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={4}
          style={{ ...inputStyle, resize: "vertical", minHeight: 96 }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#1d5396";
            e.currentTarget.style.background = "#fff";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.background = "#f8fafc";
          }}
        />
      ) : (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          required={required}
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#1d5396";
            e.currentTarget.style.background = "#fff";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.background = "#f8fafc";
          }}
        />
      )}
    </label>
  );
}
