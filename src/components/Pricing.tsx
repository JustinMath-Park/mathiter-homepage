import { useTranslations } from "next-intl";

const planKeys = ["basic", "premium", "school"] as const;
const featureCounts = { basic: 5, premium: 8, school: 7 };

export default function Pricing() {
  const t = useTranslations("pricing");

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t("label")}
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-muted text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {planKeys.map((key) => {
            const isHighlight = key === "premium";
            const count = featureCounts[key];
            return (
              <div
                key={key}
                className={`relative rounded-2xl p-8 ${
                  isHighlight
                    ? "bg-white shadow-xl border-2 border-primary ring-1 ring-primary/10"
                    : "bg-white shadow-sm border border-gray-100"
                }`}
              >
                {isHighlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="gradient-bg text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      {t("mostPopular")}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold">{t(`plans.${key}.name`)}</h3>
                  <p className="mt-1 text-sm text-muted">{t(`plans.${key}.description`)}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{t(`plans.${key}.price`)}</span>
                    {t(`plans.${key}.period`) && (
                      <span className="text-muted text-sm">{t(`plans.${key}.period`)}</span>
                    )}
                  </div>

                  <ul className="mt-8 space-y-3">
                    {Array.from({ length: count }, (_, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <svg
                          className="h-5 w-5 shrink-0 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{t(`plans.${key}.features.${i}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={
                      key === "school"
                        ? "mailto:contact@mathiter.com"
                        : "https://app.mathiter.com"
                    }
                    className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
                      isHighlight
                        ? "gradient-bg text-white hover:opacity-90"
                        : "border border-gray-200 text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {t(`plans.${key}.cta`)}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
