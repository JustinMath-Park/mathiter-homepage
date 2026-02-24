import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import StructuredData from "@/components/StructuredData";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = "https://mathiter.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] =
      loc === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${loc}`;
  }

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages,
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url:
        locale === routing.defaultLocale
          ? BASE_URL
          : `${BASE_URL}/${locale}`,
      siteName: "Mathiter",
      type: "website",
      locale:
        locale === "en"
          ? "en_US"
          : locale === "ko"
            ? "ko_KR"
            : locale === "zh"
              ? "zh_CN"
              : "ms_MY",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    keywords: [
      "math",
      "AI tutor",
      "SAT math",
      "IGCSE math",
      "IB math",
      "gamification",
      "edtech",
      "international school",
      "adaptive learning",
      "personalized education",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <StructuredData />
      </body>
    </html>
  );
}
