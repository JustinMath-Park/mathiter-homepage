const curricula = [
  {
    name: "Digital SAT",
    status: "Live",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    description: "College Board adaptive format",
  },
  {
    name: "IGCSE",
    status: "Coming Soon",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    description: "Cambridge International",
  },
  {
    name: "IB Math",
    status: "Planned",
    flag: "\uD83C\uDF0D",
    description: "AA & AI (SL/HL)",
  },
  {
    name: "A-Level",
    status: "Planned",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    description: "Edexcel / CIE",
  },
  {
    name: "\uC218\uB2A5",
    status: "Planned",
    flag: "\uD83C\uDDF0\uD83C\uDDF7",
    description: "Korean CSAT Math",
  },
  {
    name: "More",
    status: "Expanding",
    flag: "\uD83D\uDE80",
    description: "AP, GCE O-Level, ...",
  },
];

export default function Curriculum() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Global Curriculum
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            One Engine, Every Exam
          </h2>
          <p className="mt-4 text-muted text-lg">
            Math problem styles differ by exam, but misconception patterns are
            universal. Our SRG/LAAS/PSV engines work across all curricula —
            just add the topic map.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {curricula.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 hover:shadow-sm transition-shadow"
            >
              <span className="text-3xl">{c.flag}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{c.name}</span>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.status === "Live"
                        ? "bg-green-50 text-green-700"
                        : c.status === "Coming Soon"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-muted">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
