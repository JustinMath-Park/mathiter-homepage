import { useTranslations } from "next-intl";

const beliefKeys = ["direction", "feedback", "consistency"] as const;
const promiseKeys = ["clarity", "consistency", "confidence"] as const;

const beliefIcons: React.ReactNode[] = [
  // Compass - Direction
  <svg key="direction" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v2m0 16v2m10-10h-2M4 12H2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>,
  // Lightbulb - Feedback
  <svg key="feedback" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l.146.146A2 2 0 0115.5 21h-7a2 2 0 01-1.182-3.614l.146-.146z" />
  </svg>,
  // Cog/Gear - Consistency
  <svg key="consistency" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

const promiseIcons: React.ReactNode[] = [
  // Eye - Clarity
  <svg key="clarity" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // Refresh/Loop - Consistency
  <svg key="consistency" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
  </svg>,
  // Shield Check - Confidence
  <svg key="confidence" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
];

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

        {/* Vision / Approach */}
        <div className="mt-16 mx-auto max-w-3xl">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-primary mb-6">
            {t("visionLabel")}
          </h3>
          <p className="text-center text-muted leading-relaxed">
            {t("vision")}
          </p>
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
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary">
                  {beliefIcons[i]}
                </div>
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
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full gradient-bg text-white">
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
          <p className="mt-4 text-sm text-muted">
            {t("tagline")}
          </p>
        </div>
      </div>
    </section>
  );
}
