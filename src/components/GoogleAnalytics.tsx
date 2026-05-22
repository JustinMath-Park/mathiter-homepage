"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4 (GA4) 측정 스크립트.
 *
 * - NEXT_PUBLIC_GA_ID 환경변수가 있을 때만 활성화.
 * - 로컬 dev에서는 .env.local에 GA_ID를 넣지 않으면 자동으로 비활성화 (데이터 오염 방지).
 * - Vercel Production / Preview env 에는 등록 → 실 트래픽 추적.
 *
 * Next.js App Router의 SPA navigation 은 history.pushState 를 사용하므로
 * GA4 "향상된 측정 (Enhanced Measurement)" 의 페이지 변경 이벤트가 자동으로 잡힘.
 * 만약 페이지뷰가 누락된다면 usePathname + manual gtag('event', 'page_view') 추가 검토.
 */
export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
