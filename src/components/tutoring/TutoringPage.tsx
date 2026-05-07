import { getLocale } from "next-intl/server";
import TutoringNav from "./TutoringNav";
import TutoringHero from "./TutoringHero";
import WorryHook from "./WorryHook";
import Process from "./Process";
import SystemShowcase from "./SystemShowcase";
import TutorProfile from "./TutorProfile";
import TutoringPricing from "./TutoringPricing";
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
        <Process />
        <SystemShowcase />
        <TutorProfile />
        <TutoringPricing />
        <Faq />
        <HomeBlogSection locale={locale} />
        <FinalCta />
      </main>
    </>
  );
}
