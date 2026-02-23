const team = [
  {
    name: "Sejun Park",
    role: "CEO / CTO",
    bio: "20 years in online game development (server/client architecture). Korea University Mathematics graduate. Built the entire Mathiter platform — 25,000+ LoC across 49 services. Father of two international school students in Malaysia (7+ years).",
    highlights: [
      "Korea Univ. Math + Game Dev veteran",
      "Full-stack AI/ML engineer",
      "Domain expert: international school math",
    ],
  },
  {
    name: "Seongryong Lim",
    role: "CCO (Chief Content Officer)",
    bio: "17 years of math education experience. Veteran instructor who has guided thousands of students. Deep expertise in international math curricula (IGCSE, SAT, IB) and Korean math education. Ensures every AI-generated problem meets the highest quality standards.",
    highlights: [
      "17-year math education veteran",
      "SAT/IGCSE/IB curriculum expert",
      "Content quality assurance lead",
    ],
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Team
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Where Tech Meets Teaching
          </h2>
          <p className="mt-4 text-muted text-lg">
            A game developer who became a math AI engineer, and a veteran math
            instructor — the rare combination that understands both the code and
            the classroom.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-md transition-shadow"
            >
              {/* Avatar placeholder */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted leading-relaxed">
                {member.bio}
              </p>

              <ul className="mt-5 space-y-2">
                {member.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-12 mx-auto max-w-3xl text-center">
          <blockquote className="text-lg italic text-muted">
            &ldquo;A math-major engineer with 20 years of game dev DNA and a
            17-year veteran math instructor — together, we built a platform that
            truly understands both technology and education.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
