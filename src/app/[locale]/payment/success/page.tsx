import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SuccessConfirm from "./SuccessConfirm";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    paymentKey?: string;
    orderId?: string;
    amount?: string;
  }>;
};

const content: Record<
  string,
  {
    confirmingTitle: string;
    confirmingMessage: string;
    successTitle: string;
    successMessage: string;
    productLabel: string;
    paidLabel: string;
    orderIdLabel: string;
    paymentKeyLabel: string;
    methodLabel: string;
    paidAtLabel: string;
    cardCompanyLabel: string;
    errorTitle: string;
    errorMessage: string;
    backToPricing: string;
    goToApp: string;
    missingParams: string;
  }
> = {
  ko: {
    confirmingTitle: "결제를 승인하고 있어요",
    confirmingMessage: "잠시만 기다려 주세요.",
    successTitle: "결제가 완료되었습니다",
    successMessage: "Mathiter Premium을 바로 이용하실 수 있어요.",
    productLabel: "상품명",
    paidLabel: "결제 금액",
    orderIdLabel: "주문 번호",
    paymentKeyLabel: "결제 키",
    methodLabel: "결제 수단",
    paidAtLabel: "결제 일시",
    cardCompanyLabel: "카드사",
    errorTitle: "결제 승인에 실패했습니다",
    errorMessage: "다시 시도해 주시거나 고객센터로 문의해주세요.",
    backToPricing: "결제 페이지로 돌아가기",
    goToApp: "Mathiter 앱으로 이동",
    missingParams: "결제 정보가 누락되었습니다. 처음부터 다시 시도해주세요.",
  },
  en: {
    confirmingTitle: "Confirming your payment",
    confirmingMessage: "Please wait a moment.",
    successTitle: "Payment completed",
    successMessage: "You can now use Mathiter Premium immediately.",
    productLabel: "Product",
    paidLabel: "Amount paid",
    orderIdLabel: "Order ID",
    paymentKeyLabel: "Payment Key",
    methodLabel: "Payment method",
    paidAtLabel: "Paid at",
    cardCompanyLabel: "Card issuer",
    errorTitle: "Payment confirmation failed",
    errorMessage:
      "Please try again or contact our customer support.",
    backToPricing: "Back to pricing",
    goToApp: "Go to Mathiter app",
    missingParams:
      "Payment information is missing. Please try again from the beginning.",
  },
};

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const c = content[locale] || content.en;

  const paymentKey = sp.paymentKey;
  const orderId = sp.orderId;
  const amount = sp.amount;

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-gradient-to-b from-green-50/30 to-white">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <SuccessConfirm
            paymentKey={paymentKey}
            orderId={orderId}
            amount={amount}
            locale={locale}
            labels={c}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
