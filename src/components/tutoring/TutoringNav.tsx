"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function TutoringNav() {
  const t = useTranslations("tutoring.nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#worry", label: t("worry") },
    { href: "#process", label: t("process") },
    { href: "#system", label: t("system") },
    { href: "#tutor", label: t("tutor") },
    { href: "#pricing", label: t("pricing") },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid rgba(241,245,249,0.8)",
        transition: "border-color .2s",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a
          href="#"
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
            alt="Mathiter"
            style={{ width: 34, height: 34, borderRadius: 8 }}
          />
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: "#0b2a57",
            }}
          >
            Mathiter
          </span>
        </a>

        <nav className="hidden md:flex" style={{ gap: 36 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 14.5,
                color: "#475569",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0b2a57")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/product"
            className="hidden md:inline-block"
            style={{
              fontSize: 13,
              color: "#475569",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0b2a57")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
          >
            {t("app")}
          </Link>
          <LanguageSwitcher />
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#0b2a57",
              color: "#fff",
              border: "1px solid #0b2a57",
              fontSize: 14,
              fontWeight: 600,
              padding: "10px 18px",
              borderRadius: 9999,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(11,42,87,0.15)",
              transition: "background .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#153f7a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0b2a57")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            {t("signIn")}
          </Link>
        </div>
      </div>
    </header>
  );
}
