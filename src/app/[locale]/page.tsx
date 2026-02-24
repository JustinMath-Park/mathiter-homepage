import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Curriculum from "@/components/Curriculum";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";

import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

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
    </>
  );
}
