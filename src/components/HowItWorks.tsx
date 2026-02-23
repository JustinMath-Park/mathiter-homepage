import { useTranslations } from "next-intl";

const stepKeys = ["diagnose", "learn", "practice", "review", "test"] as const;

const stepMeta: Record<string, { color: string; bg: string }> = {
  diagnose: { color: "text-indigo-500", bg: "bg-indigo-50" },
  learn: { color: "text-cyan-500", bg: "bg-cyan-50" },
  practice: { color: "text-violet-500", bg: "bg-violet-50" },
  review: { color: "text-emerald-500", bg: "bg-emerald-50" },
  test: { color: "text-orange-500", bg: "bg-orange-50" },
};

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t("label")}
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-muted text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-16 relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-200 via-violet-200 to-orange-200" />

          <div className="grid gap-8 lg:grid-cols-5">
            {stepKeys.map((key) => {
              const meta = stepMeta[key];
              return (
                <div key={key} className="relative text-center">
                  <div
                    className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${meta.bg} border-4 border-white shadow-sm relative z-10`}
                  >
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-wider ${meta.color}`}>
                        Step {t(`steps.${key}.step`)}
                      </div>
                      <div className={`text-lg font-bold ${meta.color}`}>
                        {t(`steps.${key}.title`)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-muted">
                      {t(`steps.${key}.subtitle`)}
                    </span>
                    <p className="mt-3 text-sm text-muted leading-relaxed">
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Loop arrow */}
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{t("loopText")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
