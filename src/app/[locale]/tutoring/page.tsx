import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import TutoringPage from "@/components/tutoring/TutoringPage";
import TutoringStructuredData from "@/components/tutoring/TutoringStructuredData";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tutoring.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function Tutoring({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <TutoringPage />
      <TutoringStructuredData />
    </>
  );
}
