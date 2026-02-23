import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  const productLinks = [
    { label: t("product.diagnosticTest"), href: "#features" },
    { label: t("product.aiPractice"), href: "#features" },
    { label: t("product.examSimulation"), href: "#features" },
    { label: t("product.videoLessons"), href: "#features" },
    { label: t("product.pricing"), href: "#pricing" },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Mathiter" className="h-8 w-8 rounded-lg" />
              <span className="text-xl font-bold">Mathiter</span>
            </div>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              {t("brandDescription")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {t("product.title")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
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

          {/* Exams */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {t("exams.title")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="text-sm text-muted">
                  {t(`exams.items.${i}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {t("contact.title")}
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
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              {t("privacyPolicy")}
            </a>
            <a
              href="/terms"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              {t("termsOfService")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
