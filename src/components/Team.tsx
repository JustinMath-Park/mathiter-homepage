import { useTranslations } from "next-intl";

const beliefKeys = ["direction", "feedback", "consistency"] as const;
const promiseKeys = ["clarity", "consistency", "confidence"] as const;
const loopKeys = ["diagnose", "plan", "practice", "fix", "prove"] as const;

const beliefIcons = ["🧭", "💡", "⚙️"];
const promiseIcons = ["✦", "✦", "✦"];

export default function Team() {
  const t = useTranslations("team");

  return (
    <section id="team" className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t("label")}
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            {t("subtitle")}
          </p>
          <p className="mt-3 text-lg font-medium text-foreground/80">
            {t("mission")}
          </p>
        </div>

        {/* Learning Loop */}
        <div className="mt-16 mx-auto max-w-3xl">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-primary mb-6">
            {t("visionLabel")}
          </h3>
          <p className="text-center text-muted mb-8">
            {t("vision")}
          </p>
          <div className="flex items-center justify-center flex-wrap gap-3">
            {loopKeys.map((key, i) => (
              <div key={key} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-sm">
                  {t(`loop.${key}`)}
                </span>
                {i < loopKeys.length - 1 && (
                  <svg className="h-4 w-4 text-primary/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Beliefs */}
        <div className="mt-20">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-primary mb-10">
            {t("beliefsLabel")}
          </h3>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {beliefKeys.map((key, i) => (
              <div
                key={key}
                className="rounded-2xl border border-gray-100 bg-white p-7 hover:shadow-md transition-shadow text-center"
              >
                <span className="text-3xl">{beliefIcons[i]}</span>
                <h4 className="mt-4 text-lg font-bold text-foreground">
                  {t(`beliefs.${key}.title`)}
                </h4>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {t(`beliefs.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Promises */}
        <div className="mt-20">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-primary mb-10">
            {t("promisesLabel")}
          </h3>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {promiseKeys.map((key, i) => (
              <div
                key={key}
                className="relative rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] p-7 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full gradient-bg text-white text-lg font-bold">
                  {promiseIcons[i]}
                </div>
                <h4 className="mt-4 text-lg font-bold text-foreground">
                  {t(`promises.${key}.title`)}
                </h4>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {t(`promises.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://app.mathiter.com"
            className="inline-flex items-center gap-2 gradient-bg text-white text-base font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            {t("cta")}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
