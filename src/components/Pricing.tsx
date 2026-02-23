const plans = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    description: "Get started with essential features",
    features: [
      "Adaptive diagnostic test",
      "Curriculum roadmap",
      "Limited SRG practice (5/day)",
      "Basic progress tracking",
      "Gamification (XP & avatar)",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Premium",
    price: "RM 99",
    period: "/month",
    description: "Full access to all AI features",
    features: [
      "Everything in Basic",
      "Unlimited SRG practice",
      "PSV personalized videos",
      "LAAS deep analysis",
      "Exam Practice (SAT, IGCSE...)",
      "Predicted Score tracking",
      "Parent dashboard access",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "School / Academy",
    price: "Custom",
    period: "",
    description: "B2B solution for institutions",
    features: [
      "All Premium features",
      "50% volume discount",
      "Teacher admin dashboard",
      "Assignment & grading tools",
      "Bulk student onboarding",
      "Custom reports & analytics",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Less Than One Tutoring Session
          </h2>
          <p className="mt-4 text-muted text-lg">
            A full month of AI-powered learning for less than the cost of a
            single hour with a private tutor.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.highlight
                  ? "bg-white shadow-xl border-2 border-primary ring-1 ring-primary/10"
                  : "bg-white shadow-sm border border-gray-100"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-bg text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted text-sm">{plan.period}</span>
                  )}
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <svg
                        className="h-5 w-5 shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={
                    plan.name === "School / Academy"
                      ? "mailto:contact@mathiter.com"
                      : "https://app.mathiter.com"
                  }
                  className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
                    plan.highlight
                      ? "gradient-bg text-white hover:opacity-90"
                      : "border border-gray-200 text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
