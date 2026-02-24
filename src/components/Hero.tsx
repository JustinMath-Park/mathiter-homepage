"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const DashboardMockup = dynamic(() => import("./DashboardMockup"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-lg mx-auto h-[400px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});

export default function Hero() {
  const t = useTranslations("hero");

  const benefits = [
    { icon: "🎯", text: t("benefits.diagnosis") },
    { icon: "📊", text: t("benefits.analytics") },
    { icon: "🎮", text: t("benefits.gamification") },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-primary">
                {t("badge")}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
              {t("headlineLine1")}
              <br />
              <span className="gradient-text">{t("headlineHighlight")}</span>
              {t("headlineLine2")}
            </h1>

            {/* Sub-headline */}
            <p className="mt-5 text-base lg:text-lg leading-relaxed text-muted max-w-xl mx-auto lg:mx-0">
              {t("subHeadline")}
            </p>

            {/* Key benefits */}
            <div className="mt-6 space-y-2.5">
              {benefits.map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2.5 text-sm text-gray-700 justify-center lg:justify-start"
                >
                  <span className="text-base">{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex items-center gap-4 flex-wrap justify-center lg:justify-start">
              <a
                href="https://app.mathiter.com"
                className="gradient-bg text-white font-semibold px-7 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                {t("ctaPrimary")}
              </a>
              <a
                href="#features"
                className="flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-base border border-gray-200 hover:border-gray-300 transition-colors"
              >
                {t("ctaSecondary")}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>

            {/* Trust note */}
            <p className="mt-4 text-xs text-muted">
              {t("trustNote")}
            </p>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="relative">
            <DashboardMockup />
          </div>
        </div>

      </div>
    </section>
  );
}
