import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TutoringPage from "@/components/tutoring/TutoringPage";
import TutoringStructuredData from "@/components/tutoring/TutoringStructuredData";

type Props = {
  params: Promise<{ locale: string }>;
};

const TUTORING_LOCALES = ["en", "ko"] as const;
type TutoringLocale = (typeof TUTORING_LOCALES)[number];

function isTutoringLocale(locale: string): locale is TutoringLocale {
  return TUTORING_LOCALES.includes(locale as TutoringLocale);
}

function tutoringPath(locale: TutoringLocale) {
  return locale === "en" ? "/tutoring" : `/${locale}/tutoring`;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isTutoringLocale(locale)) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const t = await getTranslations({ locale, namespace: "tutoring.metadata" });
  const path = tutoringPath(locale);

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        TUTORING_LOCALES.map((loc) => [loc, tutoringPath(loc)])
      ),
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: path,
      siteName: "Mathiter Tutoring",
      type: "website",
    },
    keywords:
      locale === "ko"
        ? [
            "SAT 수학 과외",
            "국제학교 수학 과외",
            "SAT Math 과외",
            "AP Calculus 과외",
            "IB Math 과외",
            "IGCSE 수학 과외",
            "1:1 화상 수학 과외",
            "박세준 수학 과외",
          ]
        : [
            "SAT Math tutor",
            "international school math tutor",
            "AP Calculus tutor",
            "IB Math tutor",
            "IGCSE math tutor",
            "online math tutoring",
            "Justin Park Mathiter",
          ],
  };
}

export default async function Tutoring({ params }: Props) {
  const { locale } = await params;

  if (!isTutoringLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <TutoringPage />
      <TutoringStructuredData />
    </>
  );
}
