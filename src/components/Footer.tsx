export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="gradient-bg h-8 w-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">Mathiter</span>
            </div>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              AI-powered math learning navigator for international school
              students. Math + Iter (Latin: path) — guiding your journey to the
              target score.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Product
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Adaptive Test", href: "#features" },
                { label: "SRG Practice", href: "#features" },
                { label: "Exam Practice", href: "#features" },
                { label: "PSV Videos", href: "#features" },
                { label: "Pricing", href: "#pricing" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Curricula */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Supported Exams
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                "Digital SAT",
                "IGCSE Mathematics",
                "IB Math AA/AI",
                "A-Level Math",
                "More coming soon",
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Contact
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="mailto:contact@mathiter.com"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  contact@mathiter.com
                </a>
              </li>
              <li>
                <a
                  href="https://app.mathiter.com"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  app.mathiter.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Mathiter. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
