import { getLocale, getTranslations } from "next-intl/server";

export default async function TutoringStructuredData() {
  const locale = await getLocale();
  const t = await getTranslations("tutoring");
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `https://mathiter.com${localePrefix}/tutoring`;
  const contactUrl = `https://mathiter.com${localePrefix}/contact`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "박세준 (Justin Park)",
    alternateName: "Justin Park",
    jobTitle: "Founder · Lead SAT & AP Math Instructor",
    worksFor: {
      "@type": "Organization",
      name: "Mathiter Tutoring",
      url: "https://mathiter.com",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Korea University",
        sameAs: "https://www.korea.ac.kr/",
      },
      {
        "@type": "EducationalOrganization",
        name: "Hanyang University",
        sameAs: "https://www.hanyang.ac.kr/",
      },
      {
        "@type": "EducationalOrganization",
        name: "Whimoon Middle School",
      },
      {
        "@type": "EducationalOrganization",
        name: "Joongdong High School",
      },
    ],
    knowsAbout: [
      "SAT Math",
      "AP Calculus AB",
      "AP Calculus BC",
      "AP Statistics",
      "IB Math AA",
      "IB Math AI",
      "IGCSE Extended Math",
      "A-Level Math",
      "Korean CSAT Math",
    ],
    description:
      "8 years teaching international-school math; many students with SAT 800 / AP Calculus BC 5; raising two children in international schools abroad.",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Mathiter Tutoring",
    alternateName: ["Mathiter", "매스이터"],
    description: t("metadata.description"),
    url: "https://mathiter.com",
    logo: "https://mathiter.com/logo-192.png",
    founder: {
      "@type": "Person",
      name: "박세준 (Justin Park)",
    },
    areaServed: ["KR", "MY", "SG", "HK", "US", "Worldwide"],
    serviceType: [
      "SAT Math Tutoring",
      "AP Calculus AB / BC Tutoring",
      "AP Statistics Tutoring",
      "IB Math AA / AI Tutoring",
      "IGCSE Extended Math Tutoring",
      "A-Level Math Tutoring",
      "Korean CSAT Math Tutoring",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: contactUrl,
      availableLanguage: ["ko", "en"],
    },
    offers: [
      {
        "@type": "Offer",
        name: t("pricing.basic.name"),
        description: t("pricing.basic.desc"),
        price: t("pricing.basic.price").replace(/,/g, ""),
        priceCurrency: t("pricing.currencyCode"),
      },
      {
        "@type": "Offer",
        name: t("pricing.advanced.name"),
        description: t("pricing.advanced.desc"),
        price: t("pricing.advanced.price").replace(/,/g, ""),
        priceCurrency: t("pricing.currencyCode"),
      },
      {
        "@type": "Offer",
        name: t("pricing.pro.name"),
        description: t("pricing.pro.desc"),
        price: t("pricing.pro.price").replace(/,/g, ""),
        priceCurrency: t("pricing.currencyCode"),
      },
      {
        "@type": "Offer",
        name: t("pricing.master.name"),
        description: t("pricing.master.desc"),
        price: t("pricing.master.price").replace(/,/g, ""),
        priceCurrency: t("pricing.currencyCode"),
      },
    ],
  };

  const courses = [
    {
      name: "SAT Math 1:1 Tutoring",
      description:
        "1:1 tutoring for the Digital SAT Math section, taught by Justin Park (multiple students with 800/800).",
      url: `${pageUrl}#pricing`,
      educationalLevel: "High School",
    },
    {
      name: "AP Calculus AB / BC 1:1 Tutoring",
      description:
        "1:1 tutoring for AP Calculus AB and BC, with many students achieving a 5/5 score.",
      url: `${pageUrl}#pricing`,
      educationalLevel: "High School",
    },
    {
      name: "IB Math AA / AI 1:1 Tutoring",
      description:
        "1:1 tutoring for IB Math AA and AI (SL & HL), including IA support and Paper 3 strategy.",
      url: `${pageUrl}#pricing`,
      educationalLevel: "High School",
    },
    {
      name: "IGCSE Extended Math 1:1 Tutoring",
      description:
        "1:1 tutoring for Cambridge IGCSE Extended Math targeting an A* grade.",
      url: `${pageUrl}#pricing`,
      educationalLevel: "Middle/High School",
    },
    {
      name: "Korean CSAT (수능) Math 1:1 Tutoring",
      description: "1:1 tutoring for the Korean CSAT (수능) math section.",
      url: `${pageUrl}#pricing`,
      educationalLevel: "High School",
    },
  ];

  const courseSchemas = courses.map((c) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Mathiter Tutoring",
      sameAs: "https://mathiter.com",
    },
    inLanguage: ["ko", "en"],
    educationalLevel: c.educationalLevel,
    url: c.url,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT55M",
    },
  }));

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Mathiter Tutoring · 국제학교 수학 1:1 (박세준)",
    description:
      "왜 한 선생이 한국 수학과 미국 수학, 두 시스템을 모두 가르쳐야 하는가 — Mathiter Tutoring 박세준 원장이 1분 안에 보여드립니다. 12년 대치동 + 8년 국제학교, SAT Math 800, AP Calculus BC 5점.",
    thumbnailUrl: ["https://mathiter.com/videos/tutoring_hero_poster.jpg"],
    uploadDate: "2026-05-14",
    duration: "PT1M11S",
    contentUrl: "https://mathiter.com/videos/tutoring_hero_1080p.mp4",
    embedUrl: `${pageUrl}#hero-video`,
    publisher: {
      "@type": "Organization",
      name: "Mathiter Tutoring",
      logo: {
        "@type": "ImageObject",
        url: "https://mathiter.com/logo-192.png",
      },
    },
    inLanguage: ["ko"],
  };

  const allSchemas = [
    personSchema,
    organizationSchema,
    ...courseSchemas,
    faqSchema,
    videoSchema,
  ];

  return (
    <>
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
