"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import AppLink from "./AppLink";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("header");
  const locale = useLocale();
  const { user, loading, signOut } = useAuth();

  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const showBlogNav = locale === "ko" || locale === "en";
  const showTutoringNav = locale === "ko" || locale === "en";

  const navLinks = [
    ...(showTutoringNav
      ? [{ href: `${localePrefix}/tutoring`, label: t("nav.tutoring") }]
      : []),
    { href: `${localePrefix}/product#problem`, label: t("nav.whyMathiter") },
    { href: `${localePrefix}/product#features`, label: t("nav.features") },
    { href: `${localePrefix}/product#how-it-works`, label: t("nav.howItWorks") },
    { href: `${localePrefix}/product#pricing`, label: t("nav.pricing") },
    ...(showBlogNav
      ? [
          {
            href: `${localePrefix}/blog`,
            label: t("nav.blog"),
          },
        ]
      : []),
  ];

  // 회원 로그인 페이지(homepage 측) 링크
  const loginHref = `${localePrefix}/login`;
  const signupHref = `${localePrefix}/signup`;

  // 사용자 표시명 — displayName 우선, 없으면 email 의 @ 앞부분
  const userDisplay = user
    ? user.displayName || (user.email ? user.email.split("@")[0] : "user")
    : "";

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href={localePrefix || "/"} className="flex items-center gap-2">
            <img src="/logo.png" alt="Mathiter" className="h-8 w-8 rounded-lg" />
            <span className="text-xl font-bold text-foreground">Mathiter</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />

            {loading ? (
              // 인증 상태 로딩 중 — 빈 자리를 차지해 layout shift 방지
              <div className="w-20 h-9" aria-hidden />
            ) : user ? (
              // 로그인 상태 — 사용자명 + 드롭다운 (로그아웃)
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
                    {userDisplay.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-[140px] truncate">
                    {t("loggedInAs", { name: userDisplay })}
                  </span>
                  <svg
                    className={`h-3.5 w-3.5 text-muted transition-transform ${menuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs text-muted">{t("account")}</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <AppLink
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-gray-50 transition-colors"
                    >
                      {t("startFree")} →
                    </AppLink>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                    >
                      {t("logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // 비로그인 상태 — 로그인 + 무료 시작
              <>
                <a
                  href={loginHref}
                  className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  {t("signIn")}
                </a>
                <AppLink
                  className="gradient-bg text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  {t("startFree")}
                </AppLink>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
            <div className="mb-3">
              <LanguageSwitcher />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-sm text-muted hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* 모바일 — 로그인 상태에 따라 분기 */}
            {!loading && user ? (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 px-1 py-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold">
                    {userDisplay.charAt(0).toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {t("loggedInAs", { name: userDisplay })}
                    </p>
                    <p className="text-xs text-muted truncate">{user.email}</p>
                  </div>
                </div>
                <AppLink
                  className="mt-2 block w-full text-center gradient-bg text-white text-sm font-medium px-5 py-2.5 rounded-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("startFree")} →
                </AppLink>
                <button
                  onClick={async () => {
                    setMobileOpen(false);
                    await signOut();
                  }}
                  className="mt-2 block w-full text-center border border-red-200 text-red-600 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-red-50 transition-colors"
                >
                  {t("logout")}
                </button>
              </div>
            ) : !loading ? (
              <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                <a
                  href={loginHref}
                  className="block w-full text-center text-sm font-medium text-primary py-2.5"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("signIn")}
                </a>
                <a
                  href={signupHref}
                  className="block w-full text-center text-sm font-medium border border-primary/30 text-primary px-5 py-2.5 rounded-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("signUp")}
                </a>
                <AppLink
                  className="block w-full text-center gradient-bg text-white text-sm font-medium px-5 py-2.5 rounded-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("startFree")}
                </AppLink>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </header>
  );
}
