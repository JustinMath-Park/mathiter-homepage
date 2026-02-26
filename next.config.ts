import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/pricing-plans/:path*", destination: "/#pricing", permanent: true },
      { source: "/challenges", destination: "/", permanent: true },
      { source: "/notifications", destination: "/", permanent: true },
      { source: "/my-subscriptions", destination: "/", permanent: true },
      { source: "/ir", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
