const features = [
  {
    tag: "SRG",
    title: "Socratic AI Coach",
    description:
      "Instead of giving answers, SRG asks the right questions — guiding students to discover their own misconceptions. Smart traps in MCQs surface hidden weak points, while the system auto-tags errors for spaced repetition.",
    color: "bg-indigo-500",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    tag: "PSV",
    title: "AI-Generated Video Lessons",
    description:
      "When a misconception is detected, PSV auto-generates a personalized correction video — from error analysis to script to math visualization rendering. Each video targets exactly the concept the student struggles with.",
    color: "bg-cyan-500",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    tag: "LAAS",
    title: "5-Agent Analytics System",
    description:
      "Five specialized AI agents collaborate to analyze learning data from multiple sources — profiling, score prediction, curriculum planning, misconception detection, and practice recommendation — all in real time.",
    color: "bg-violet-500",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    tag: "Gamification",
    title: "RPG-Style Learning",
    description:
      "XP, avatars, pets, Tamagotchi-style care, and seasonal rankings make daily learning irresistible. 20 years of game development DNA transformed into an education system where studying grows your character.",
    color: "bg-emerald-500",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    tag: "Exam Practice",
    title: "Real Exam Simulation",
    description:
      "Practice under identical conditions to your target exam — Digital SAT adaptive format, IGCSE, IB, and more. Auto-graded with detailed weakness analysis reports.",
    color: "bg-orange-500",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    tag: "Dashboard",
    title: "Parent & Teacher Analytics",
    description:
      "Real-time monitoring of study frequency, progress, weak concepts, and predicted score changes. Teachers get automatic grading, reports, and assignment management — saving hours of manual work.",
    color: "bg-pink-500",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Core Features
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Dual-Engine AI Meets Gamification
          </h2>
          <p className="mt-4 text-muted text-lg">
            Six integrated systems that work together to create a complete math
            learning navigation experience.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.tag}
              className="group rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${f.color} text-white`}
                >
                  {f.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  {f.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
