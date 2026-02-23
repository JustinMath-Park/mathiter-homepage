import { useTranslations } from "next-intl";

const memberKeys = ["sejun", "seongryong"] as const;

export default function Team() {
  const t = useTranslations("team");

  return (
    <section id="team" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t("label")}
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-muted text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {memberKeys.map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-xl font-bold">
                  {t(`members.${key}.name`)
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{t(`members.${key}.name`)}</h3>
                  <p className="text-sm text-primary font-medium">{t(`members.${key}.role`)}</p>
                </div>
              </div>

              <p className="text-sm text-muted leading-relaxed">{t(`members.${key}.bio`)}</p>

              <ul className="mt-5 space-y-2">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t(`members.${key}.highlights.${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-12 mx-auto max-w-3xl text-center">
          <blockquote className="text-lg italic text-muted">
            &ldquo;{t("quote")}&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
