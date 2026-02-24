import { useTranslations } from "next-intl";

const examKeys = ["sat", "igcse", "ib", "aLevel", "csat", "more"] as const;

const examFlags: Record<string, string> = {
  sat: "\uD83C\uDDFA\uD83C\uDDF8",
  igcse: "\uD83C\uDDEC\uD83C\uDDE7",
  ib: "\uD83C\uDF0D",
  aLevel: "\uD83C\uDDEC\uD83C\uDDE7",
  csat: "\uD83C\uDDF0\uD83C\uDDF7",
  more: "\uD83D\uDE80",
};

const examStatuses: Record<string, string> = {
  sat: "live",
  igcse: "comingSoon",
  ib: "planned",
  aLevel: "planned",
  csat: "planned",
  more: "expanding",
};

export default function Curriculum() {
  const t = useTranslations("curriculum");

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t("label")}
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-muted text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examKeys.map((key) => {
            const statusKey = examStatuses[key];
            const status = t(`statuses.${statusKey}`);
            const isAvailable = statusKey === "live" || statusKey === "comingSoon";
            return (
              <div
                key={key}
                className={`flex items-center gap-4 rounded-xl border p-5 transition-shadow ${
                  isAvailable
                    ? "border-gray-100 bg-white hover:shadow-sm"
                    : "border-gray-100/60 bg-gray-50/50 opacity-60"
                }`}
              >
                <span className={`text-3xl ${isAvailable ? "" : "grayscale"}`}>{examFlags[key]}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${isAvailable ? "" : "text-gray-400"}`}>{t(`exams.${key}.name`)}</span>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusKey === "live"
                          ? "bg-green-50 text-green-700"
                          : statusKey === "comingSoon"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className={`text-sm ${isAvailable ? "text-muted" : "text-gray-400"}`}>{t(`exams.${key}.description`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
