import { getTranslations } from "next-intl/server";

export default async function StructuredData() {
  const t = await getTranslations("metadata");

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mathiter",
    url: "https://mathiter.com",
    description: t("description"),
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@mathiter.com",
      contactType: "customer service",
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mathiter",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    description: t("description"),
    url: "https://mathiter.com",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "MYR",
        name: "Basic",
      },
      {
        "@type": "Offer",
        price: "99",
        priceCurrency: "MYR",
        name: "Premium",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What exams does Mathiter support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mathiter currently supports Digital SAT with IGCSE, IB Math, A-Level, and Korean CSAT coming soon.",
        },
      },
      {
        "@type": "Question",
        name: "How does the AI tutor work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mathiter's AI tutor uses guiding questions (Socratic method) to help students discover their own mistakes, rather than simply giving answers.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a free plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Mathiter offers a free Basic plan that includes adaptive diagnostic testing, a personalized study roadmap, limited daily practice sessions, and gamification features.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
