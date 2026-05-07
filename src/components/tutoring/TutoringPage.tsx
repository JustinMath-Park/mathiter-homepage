import TutoringNav from "./TutoringNav";
import TutoringHero from "./TutoringHero";
import WorryHook from "./WorryHook";
import Process from "./Process";
import SystemShowcase from "./SystemShowcase";
import TutorProfile from "./TutorProfile";
import TutoringPricing from "./TutoringPricing";
import Faq from "./Faq";
import FinalCta from "./FinalCta";

export default function TutoringPage() {
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
        <FinalCta />
      </main>
    </>
  );
}
