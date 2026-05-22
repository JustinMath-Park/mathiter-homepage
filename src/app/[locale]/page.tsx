import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Curriculum from "@/components/Curriculum";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

function localePath(locale: string) {
  return locale === routing.defaultLocale ? "/" : `/${locale}`;
}

function ogLocale(locale: string) {
  if (locale === "ko") return "ko_KR";
  if (locale === "zh") return "zh_CN";
  if (locale === "ms") return "ms_MY";
  return "en_US";
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = localePath(locale);

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, localePath(loc)])
      ),
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: path,
      siteName: "Mathiter",
      type: "website",
      locale: ogLocale(locale),
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Curriculum />
        <Pricing />
        <Team />
      </main>
      <Footer />
      <StructuredData />
    </>
  );
}
