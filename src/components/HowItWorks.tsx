const steps = [
  {
    num: "01",
    title: "Diagnose",
    subtitle: "Adaptive Test",
    description:
      "IRT-based adaptive testing pinpoints your exact skill level with minimal questions. Difficulty adjusts in real-time for precise diagnosis.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    num: "02",
    title: "Learn",
    subtitle: "Curriculum Roadmap",
    description:
      "AI generates a personalized learning roadmap based on your target exam and current level. Concept-first lessons structured for your path.",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    num: "03",
    title: "Practice",
    subtitle: "SRG Engine",
    description:
      "Socratic questioning guides you through problems. Smart traps reveal hidden misconceptions while LAAS agents tag and track every weakness.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    num: "04",
    title: "Review",
    subtitle: "PSV + LAAS",
    description:
      "AI generates personalized correction videos for recurring errors. 5 agents analyze your data to predict scores and plan next steps.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    num: "05",
    title: "Test",
    subtitle: "Exam Practice",
    description:
      "Take mock exams in real test conditions — SAT adaptive format, IGCSE, IB. Auto-graded with detailed analytics to close the loop.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            The Learning Navigation Loop
          </h2>
          <p className="mt-4 text-muted text-lg">
            Five seamlessly connected stages that continuously adapt to your
            progress and guide you to your target score.
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-200 via-violet-200 to-orange-200" />

          <div className="grid gap-8 lg:grid-cols-5">
            {steps.map((step) => (
              <div key={step.num} className="relative text-center">
                {/* Step circle */}
                <div
                  className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${step.bg} border-4 border-white shadow-sm relative z-10`}
                >
                  <div>
                    <div
                      className={`text-xs font-bold uppercase tracking-wider ${step.color}`}
                    >
                      Step {step.num}
                    </div>
                    <div className={`text-lg font-bold ${step.color}`}>
                      {step.title}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-muted">
                    {step.subtitle}
                  </span>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Loop arrow */}
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>
                Continuous loop — each cycle refines your predicted score
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
