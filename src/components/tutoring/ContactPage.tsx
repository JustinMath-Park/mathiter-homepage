"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitInquiry, type SubmitResult } from "@/app/[locale]/contact/actions";

export default function ContactPage() {
  const t = useTranslations("tutoring.contact");
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState<
    SubmitResult | null,
    FormData
  >(submitInquiry, null);
  const submitted = state?.ok === true;
  const submitError = state && state.ok === false ? state.error : null;

  const phoneNumber = t("phone.value");
  const kakaoId = t("kakao.value");
  const emailAddress = t("email.value");

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
                cta={t("kakao.cta")}
                href="#kakao-placeholder"
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

            {/* Right: Message form */}
            <article
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "36px 32px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#c2410c",
                  background: "#fff7ed",
                  padding: "5px 12px",
                  borderRadius: 9999,
                  textTransform: "uppercase",
                }}
              >
                {t("form.tag")}
              </span>
              <h2
                style={{
                  margin: "16px 0 6px",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#0b2a57",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.3,
                }}
              >
                {t("form.title")}
              </h2>
              <p style={{ margin: 0, fontSize: 14.5, color: "#64748b", lineHeight: 1.6 }}>
                {t("form.subtitle")}
              </p>

              {submitted ? (
                <div
                  style={{
                    marginTop: 28,
                    padding: "32px 24px",
                    background: "#ecfdf5",
                    border: "1px solid #6ee7b7",
                    borderRadius: 14,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      marginBottom: 10,
                    }}
                  >
                    ✅
                  </div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#047857",
                      marginBottom: 6,
                    }}
                  >
                    상담 신청이 접수됐습니다
                  </div>
                  <div style={{ fontSize: 14, color: "#065f46", lineHeight: 1.55 }}>
                    영업시간 1시간 이내로 박세준 원장이 직접 연락드립니다.
                  </div>
                </div>
              ) : (
                <form
                  action={formAction}
                  style={{
                    marginTop: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="source" value="tutoring-contact" />
                  <input type="hidden" name="contactMethod" value="kakao" />

                  <FormField
                    name="parentName"
                    label={t("form.nameLabel")}
                    placeholder={t("form.namePlaceholder")}
                    required
                  />
                  <FormField
                    name="contactDetail"
                    label={t("form.contactLabel")}
                    placeholder={t("form.contactPlaceholder")}
                    required
                  />
                  <FormField
                    name="studentGrade"
                    label={t("form.studentLabel")}
                    placeholder={t("form.studentPlaceholder")}
                  />
                  <FormField
                    name="message"
                    label={t("form.messageLabel")}
                    placeholder={t("form.messagePlaceholder")}
                    multiline
                  />

                  {submitError && (
                    <div
                      style={{
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        color: "#b91c1c",
                        padding: "10px 14px",
                        borderRadius: 10,
                        fontSize: 13,
                      }}
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    style={{
                      marginTop: 4,
                      background: "linear-gradient(135deg,#f59e0b 0%, #f97316 100%)",
                      color: "#fff",
                      border: "none",
                      fontWeight: 600,
                      padding: "15px 24px",
                      borderRadius: 9999,
                      fontSize: 15,
                      cursor: isPending ? "not-allowed" : "pointer",
                      opacity: isPending ? 0.7 : 1,
                      boxShadow:
                        "0 12px 28px rgba(249,115,22,0.32), 0 2px 4px rgba(249,115,22,0.18)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    {isPending ? "전송 중..." : t("form.submit")}
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>

                  <p
                    style={{
                      margin: 0,
                      fontSize: 11.5,
                      color: "#94a3b8",
                      lineHeight: 1.55,
                      textAlign: "center",
                    }}
                  >
                    {t("form.submitNote")}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      color: "#94a3b8",
                      lineHeight: 1.55,
                      textAlign: "center",
                    }}
                  >
                    {t("form.agreement")}
                  </p>
                </form>
              )}
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
};

function ChannelCard({ tag, title, value, hint, cta, href, accent, chipBg }: ChannelCardProps) {
  return (
    <a
      href={href}
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
