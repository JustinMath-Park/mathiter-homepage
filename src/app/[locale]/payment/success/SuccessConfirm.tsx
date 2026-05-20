"use client";

import { useEffect, useState } from "react";

type Labels = {
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
};

type ConfirmedPayment = {
  paymentKey: string;
  orderId: string;
  orderName?: string;
  totalAmount: number;
  status: string;
  method?: string;
  approvedAt?: string;
  card?: {
    company?: string;
    number?: string;
    installmentPlanMonths?: number;
  };
  receipt?: {
    url?: string;
  };
};

type Props = {
  paymentKey?: string;
  orderId?: string;
  amount?: string;
  locale: string;
  labels: Labels;
};

/**
 * 결제 성공 페이지에서 /api/payment/confirm을 호출해 토스 결제 승인을 확정.
 * 페이지 로드 시 단 한 번만 confirm 호출 (StrictMode 중복 호출 방지).
 */
export default function SuccessConfirm({
  paymentKey,
  orderId,
  amount,
  locale,
  labels,
}: Props) {
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [payment, setPayment] = useState<ConfirmedPayment | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const localePrefix = locale === "en" ? "" : `/${locale}`;

  useEffect(() => {
    // 파라미터 누락 체크
    if (!paymentKey || !orderId || !amount) {
      setState("error");
      setErrorMessage(labels.missingParams);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/payment/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });

        const data = await res.json();

        if (cancelled) return;

        if (!res.ok || !data.success) {
          setState("error");
          setErrorMessage(
            data.error || data.message || labels.errorMessage
          );
          return;
        }

        setPayment(data.payment);
        setState("success");
      } catch (err) {
        if (cancelled) return;
        console.error("[PaymentConfirm] Error:", err);
        setState("error");
        setErrorMessage(labels.errorMessage);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [paymentKey, orderId, amount, labels.errorMessage, labels.missingParams]);

  if (state === "loading") {
    return (
      <div className="text-center py-16">
        <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6" />
        <h1 className="text-2xl font-bold mb-2">{labels.confirmingTitle}</h1>
        <p className="text-muted">{labels.confirmingMessage}</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50/50 px-8 py-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
          <span className="text-2xl">✕</span>
        </div>
        <h1 className="text-xl font-bold text-red-900 mb-2">
          {labels.errorTitle}
        </h1>
        <p className="text-sm text-red-700/80 mb-6">{errorMessage}</p>
        <a
          href={`${localePrefix}/pricing`}
          className="inline-block rounded-lg bg-foreground text-white px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          {labels.backToPricing}
        </a>
      </div>
    );
  }

  // success state
  if (!payment) return null;

  const formattedAmount = new Intl.NumberFormat(
    locale === "ko" ? "ko-KR" : "en-US",
    { style: "currency", currency: "KRW", maximumFractionDigits: 0 }
  ).format(payment.totalAmount);

  const formattedDate = payment.approvedAt
    ? new Date(payment.approvedAt).toLocaleString(
        locale === "ko" ? "ko-KR" : "en-US",
        { dateStyle: "medium", timeStyle: "short" }
      )
    : "—";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-8 py-8 border-b border-gray-100 bg-gradient-to-r from-green-50/60 to-white text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
          <span className="text-2xl text-green-700">✓</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{labels.successTitle}</h1>
        <p className="text-sm text-muted">{labels.successMessage}</p>
      </div>

      <dl className="px-8 py-7 space-y-3 text-sm">
        <Row label={labels.productLabel} value={payment.orderName || "—"} />
        <Row label={labels.paidLabel} value={<strong>{formattedAmount}</strong>} />
        <Row label={labels.methodLabel} value={payment.method || "—"} />
        {payment.card?.company && (
          <Row label={labels.cardCompanyLabel} value={payment.card.company} />
        )}
        <Row label={labels.paidAtLabel} value={formattedDate} />
        <Row label={labels.orderIdLabel} value={<code className="text-xs">{payment.orderId}</code>} />
      </dl>

      {payment.receipt?.url && (
        <div className="px-8 py-4 border-t border-gray-100 text-center">
          <a
            href={payment.receipt.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            {locale === "ko" ? "영수증 보기 ↗" : "View Receipt ↗"}
          </a>
        </div>
      )}

      <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 text-center">
        <a
          href="https://app.mathiter.com"
          className="inline-block rounded-lg bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          {labels.goToApp}
        </a>
      </div>
    </div>
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
