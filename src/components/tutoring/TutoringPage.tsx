import { getLocale } from "next-intl/server";
import TutoringNav from "./TutoringNav";
import TutoringHero from "./TutoringHero";
import WorryHook from "./WorryHook";
import HeroVideoSection from "./HeroVideoSection";
import Process from "./Process";
import SystemShowcase from "./SystemShowcase";
import TutorProfile from "./TutorProfile";
import PricingTeaser from "./PricingTeaser";
import Faq from "./Faq";
import FinalCta from "./FinalCta";
import HomeBlogSection from "@/components/HomeBlogSection";

export default async function TutoringPage() {
  const locale = await getLocale();
  return (
    <>
      <TutoringNav />
      <main>
        <TutoringHero />
        <WorryHook />
        <HeroVideoSection />
        <Process />
        <SystemShowcase />
        <TutorProfile />
        <PricingTeaser />
        <Faq />
        <HomeBlogSection locale={locale} />
        <FinalCta />
      </main>
    </>
  );
}
