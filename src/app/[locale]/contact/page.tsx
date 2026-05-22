import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactPage from "@/components/tutoring/ContactPage";

type Props = {
  params: Promise<{ locale: string }>;
};

const CONTACT_LOCALES = ["en", "ko"] as const;
type ContactLocale = (typeof CONTACT_LOCALES)[number];

function isContactLocale(locale: string): locale is ContactLocale {
  return CONTACT_LOCALES.includes(locale as ContactLocale);
}

function contactPath(locale: ContactLocale) {
  return locale === "en" ? "/contact" : `/${locale}/contact`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isContactLocale(locale)) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const t = await getTranslations({ locale, namespace: "tutoring.contact.metadata" });
  const path = contactPath(locale);

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        CONTACT_LOCALES.map((loc) => [loc, contactPath(loc)])
      ),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: path,
      siteName: "Mathiter Tutoring",
      type: "website",
    },
  };
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;

  if (!isContactLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return <ContactPage />;
}
