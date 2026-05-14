import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /product → / (2026-05-14: product 콘텐츠가 홈으로 이동, 기존 외부 링크 보호)
      { source: "/product", destination: "/", permanent: true },
      { source: "/product/:path*", destination: "/", permanent: true },
      { source: "/:locale(ko|ms|zh)/product", destination: "/:locale", permanent: true },
      { source: "/:locale(ko|ms|zh)/product/:path*", destination: "/:locale", permanent: true },

      { source: "/pricing-plans/:path*", destination: "/#pricing", permanent: true },
      { source: "/challenges", destination: "/", permanent: true },
      { source: "/notifications", destination: "/", permanent: true },
      { source: "/my-subscriptions", destination: "/", permanent: true },
      { source: "/ir", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Allow Firebase signInWithPopup to communicate with the popup window.
        // Default (or stricter) COOP blocks window.closed polling against
        // accounts.google.com and floods the console with warnings.
        // "same-origin-allow-popups" preserves COOP isolation for the rest
        // of the document while permitting OAuth popups to function.
        source: "/admin/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
