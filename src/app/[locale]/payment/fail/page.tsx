import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    code?: string;
    message?: string;
    orderId?: string;
  }>;
};

const content: Record<
  string,
  {
    title: string;
    subtitle: string;
    codeLabel: string;
    messageLabel: string;
    orderIdLabel: string;
    backToPricing: string;
    contactSupport: string;
  }
> = {
  ko: {
    title: "결제가 완료되지 않았습니다",
    subtitle:
      "결제 과정에서 문제가 발생했습니다. 카드 정보 또는 결제 한도를 확인하시고 다시 시도해주세요.",
    codeLabel: "오류 코드",
    messageLabel: "메시지",
    orderIdLabel: "주문 번호",
    backToPricing: "결제 페이지로 돌아가기",
    contactSupport: "지원 문의하기",
  },
  en: {
    title: "Payment was not completed",
    subtitle:
      "There was a problem during payment. Please verify your card details or limits and try again.",
    codeLabel: "Error code",
    messageLabel: "Message",
    orderIdLabel: "Order ID",
    backToPricing: "Back to pricing",
    contactSupport: "Contact support",
  },
};

export default async function PaymentFailPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const c = content[locale] || content.en;
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-gradient-to-b from-red-50/30 to-white">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
            <div className="px-8 py-8 border-b border-gray-100 bg-gradient-to-r from-red-50/60 to-white text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
                <span className="text-2xl">✕</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">{c.title}</h1>
              <p className="text-sm text-muted">{c.subtitle}</p>
            </div>

            <dl className="px-8 py-7 space-y-3 text-sm">
              {sp.code && (
                <Row label={c.codeLabel} value={<code className="text-xs">{sp.code}</code>} />
              )}
              {sp.message && (
                <Row label={c.messageLabel} value={sp.message} />
              )}
              {sp.orderId && (
                <Row label={c.orderIdLabel} value={<code className="text-xs">{sp.orderId}</code>} />
              )}
            </dl>

            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`${localePrefix}/pricing`}
                className="inline-block rounded-lg bg-primary text-white px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors text-center"
              >
                {c.backToPricing}
              </a>
              <a
                href="mailto:support@mathiter.com"
                className="inline-block rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors text-center"
              >
                {c.contactSupport}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5 border-b border-gray-50 last:border-0">
      <dt className="text-xs uppercase tracking-wider text-muted whitespace-nowrap">
        {label}
      </dt>
      <dd className="text-right text-foreground/90 break-all">{value}</dd>
    </div>
  );
}
