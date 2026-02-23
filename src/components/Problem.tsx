import { useTranslations } from "next-intl";

const problemKeys = ["retention", "gap", "personalization"] as const;

const icons: Record<string, React.ReactNode> = {
  retention: (
    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
  gap: (
    <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  personalization: (
    <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export default function Problem() {
  const t = useTranslations("problem");

  return (
    <section id="problem" className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t("label")}
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-muted text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {problemKeys.map((key) => (
            <div
              key={key}
              className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50">
                {icons[key]}
              </div>
              <h3 className="text-xl font-semibold">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 text-muted leading-relaxed">{t(`items.${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
