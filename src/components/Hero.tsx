export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Math Education
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Learn Math Like a{" "}
            <span className="gradient-text">Game</span>
            <br />
            Ace Exams Like a{" "}
            <span className="gradient-text">Quest</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted max-w-2xl mx-auto">
            Gamification + Dual-Engine AI courseware that navigates your math
            journey — from diagnosis to personalized practice to real exam prep.
            Built for international school students targeting SAT, IGCSE, IB
            and beyond.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://app.mathiter.com"
              className="gradient-bg text-white font-semibold px-8 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Start Free Trial
            </a>
            <a
              href="#features"
              className="flex items-center gap-2 font-semibold px-8 py-3.5 rounded-full text-base border border-gray-200 hover:border-gray-300 transition-colors"
            >
              See How It Works
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "25,000+", label: "Lines of Code" },
              { value: "49", label: "AI Services" },
              { value: "5", label: "AI Agents" },
              { value: "13", label: "Dev Phases Done" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
