const problems = [
  {
    icon: (
      <svg
        className="h-8 w-8 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
        />
      </svg>
    ),
    title: "Low Retention",
    description:
      "Even the best AI tutor is useless if students don't log in. Existing edtech lacks motivation design — completion rates stay frustratingly low.",
  },
  {
    icon: (
      <svg
        className="h-8 w-8 text-amber-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
    title: "Schooling vs. Scoring Gap",
    description:
      "International school curricula focus on concept understanding, but SAT/IGCSE exams demand test-taking skills. Students fall through the gap.",
  },
  {
    icon: (
      <svg
        className="h-8 w-8 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "No Personalized Management",
    description:
      "Every student has different weak points, yet schools and tutors push one-size-fits-all progress. Grading and reporting consume hours of manual labor.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            The Problem
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            &ldquo;They Teach, But Scores Don&apos;t Rise.
            <br />
            They Push, But Kids Won&apos;t Stay.&rdquo;
          </h2>
          <p className="mt-4 text-muted text-lg">
            Three core challenges that current edtech fails to solve simultaneously.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50">
                {p.icon}
              </div>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-muted leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
