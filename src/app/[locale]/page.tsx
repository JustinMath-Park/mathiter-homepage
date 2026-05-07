import { setRequestLocale } from "next-intl/server";
import TutoringPage from "@/components/tutoring/TutoringPage";
import TutoringStructuredData from "@/components/tutoring/TutoringStructuredData";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <TutoringPage />
      <TutoringStructuredData />
    </>
  );
}
