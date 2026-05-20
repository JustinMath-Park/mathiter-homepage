"use client";

import { useState, useEffect } from "react";
import { loadTossPayments, type TossPaymentsSDK } from "@tosspayments/tosspayments-sdk";

type Props = {
  productName: string;
  amount: number;
  taxFreeAmount: number;
  locale: string;
  cta: string;
  legalLine: string;
};

/**
 * 토스페이먼츠 V2 SDK — 일반 결제창 호출 (API 개별 연동 키)
 *
 * 흐름:
 *   1. SDK 로드 (loadTossPayments + clientKey)
 *   2. payment 인스턴스 생성 (customerKey)
 *   3. requestPayment(method: 'CARD', amount, orderId, ...)
 *   4. 토스 결제창 팝업/리다이렉트
 *   5. 결제 완료 → successUrl 또는 failUrl로 이동
 *   6. successUrl에서 /api/payment/confirm 호출 → 결제 승인 확정
 */
export default function PaymentForm({
  productName,
  amount,
  taxFreeAmount,
  locale,
  cta,
  legalLine,
}: Props) {
  const [tossPayments, setTossPayments] = useState<TossPaymentsSDK | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

  useEffect(() => {
    if (!clientKey) {
      console.error("[TossPayments] NEXT_PUBLIC_TOSS_CLIENT_KEY is not set");
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const sdk = await loadTossPayments(clientKey);
        if (mounted) {
          setTossPayments(sdk);
        }
      } catch (err) {
        console.error("[TossPayments] Failed to load SDK:", err);
        if (mounted) {
          setError(
            locale === "ko"
              ? "결제 시스템 로드에 실패했습니다. 새로고침 후 다시 시도해주세요."
              : "Failed to load payment system. Please refresh and try again."
          );
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [clientKey, locale]);

  const handlePayment = async () => {
    if (!tossPayments) {
      setError(
        locale === "ko"
          ? "결제 시스템이 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요."
          : "Payment system is not ready yet. Please try again shortly."
      );
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // customerKey: 비회원 결제 (심사용). 추후 로그인 사용자 ID로 대체.
      const customerKey = `guest_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 10)}`;

      // orderId: 결제 주문 고유 ID
      const orderId = `mathiter_premium_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 10)}`;

      const payment = tossPayments.payment({ customerKey });

      await payment.requestPayment({
        method: "CARD",
        amount: {
          currency: "KRW",
          value: amount,
        },
        orderId,
        orderName: productName,
        successUrl: `${window.location.origin}/${locale}/payment/success`,
        failUrl: `${window.location.origin}/${locale}/payment/fail`,
        // 면세 금액 (taxFreeAmount): 복합과세 상점이라 명시
        // SaaS = 과세 → taxFreeAmount = 0
        // (서버 측 confirm에서도 재검증)
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });

      // 위 requestPayment 호출이 결제창을 띄우고 페이지 이동시킴.
      // 여기 도달하면 사용자가 결제창에서 취소/실패한 경우.
    } catch (err) {
      console.error("[TossPayments] Payment request failed:", err);
      setError(
        locale === "ko"
          ? "결제 요청 중 오류가 발생했습니다. 다시 시도해주세요."
          : "An error occurred during payment request. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // taxFreeAmount는 현재 옵션 A(SaaS 단건)에서 0으로 고정.
  // 향후 튜터링 결제 시 amount 전액으로 설정 (전액 면세).
  void taxFreeAmount;

  return (
    <div className="space-y-4">
      <button
        onClick={handlePayment}
        disabled={!tossPayments || isProcessing}
        className="w-full rounded-xl bg-primary text-white font-semibold py-4 text-base hover:bg-primary/90 active:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing
          ? locale === "ko"
            ? "처리 중..."
            : "Processing..."
          : cta}
      </button>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2.5">
          {error}
        </p>
      )}

      <p className="text-xs text-muted/80 leading-relaxed">{legalLine}</p>
    </div>
  );
}
