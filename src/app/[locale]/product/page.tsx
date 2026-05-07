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

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function Product({ params }: Props) {
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
