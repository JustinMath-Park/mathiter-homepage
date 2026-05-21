"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadTossPayments, type TossPaymentsSDK } from "@tosspayments/tosspayments-sdk";
import { useAuth } from "@/lib/auth-context";

type Props = {
  productName: string;
  amount: number;
  taxFreeAmount: number;
  locale: string;
  cta: string;
  ctaLoginRequired: string;
  legalLine: string;
  loginBannerTitle: string;
  loginBannerBody: string;
  loginBannerLogin: string;
  loginBannerSignup: string;
};

/**
 * 토스페이먼츠 V2 SDK — 일반 결제창 호출 (API 개별 연동 키)
 *
 * 회원 결제 전용 — 비로그인 상태에서는 로그인 페이지로 리다이렉트.
 *
 * 흐름:
 *   1. 로그인 상태 확인 (useAuth)
 *      - 비로그인: 안내 배너 + 로그인/회원가입 버튼 노출, 결제 버튼 비활성화
 *      - 로그인: 결제 버튼 활성화 + customerKey = uid, customerEmail = user.email
 *   2. SDK 로드 (loadTossPayments + clientKey)
 *   3. payment 인스턴스 생성 (customerKey = Firebase uid)
 *   4. requestPayment(method: 'CARD', amount, orderId, ...)
 *   5. 토스 결제창 팝업/리다이렉트
 *   6. 결제 완료 → successUrl 또는 failUrl로 이동
 *   7. successUrl에서 /api/payment/confirm 호출 → 결제 승인 확정
 */
export default function PaymentForm({
  productName,
  amount,
  taxFreeAmount,
  locale,
  cta,
  ctaLoginRequired,
  legalLine,
  loginBannerTitle,
  loginBannerBody,
  loginBannerLogin,
  loginBannerSignup,
}: Props) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [tossPayments, setTossPayments] = useState<TossPaymentsSDK | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const pricingPath = `${localePrefix}/pricing`;
  const loginHref = `${localePrefix}/login?next=${encodeURIComponent(pricingPath)}`;
  const signupHref = `${localePrefix}/signup?next=${encodeURIComponent(pricingPath)}`;

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
    // 회원 결제 전용 — 비로그인이면 로그인 페이지로 보냄
    if (!user) {
      router.push(loginHref);
      return;
    }
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
      // customerKey: Firebase uid (회원 식별자, 토스 customerKey 규칙: 영문/숫자/_-/. 만)
      const customerKey = user.uid;

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
        // 결제 영수증·결과 안내 수신처
        customerEmail: user.email || undefined,
        customerName: user.displayName || undefined,
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
  void taxFreeAmount;

  const showLoginBanner = !authLoading && !user;
  const buttonLabel = isProcessing
    ? locale === "ko"
      ? "처리 중..."
      : "Processing..."
    : showLoginBanner
      ? ctaLoginRequired
      : cta;

  return (
    <div className="space-y-4">
      {showLoginBanner && (
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 px-5 py-4">
          <p className="text-sm font-semibold text-blue-900">
            {loginBannerTitle}
          </p>
          <p className="mt-1 text-xs text-blue-900/80 leading-relaxed">
            {loginBannerBody}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={loginHref}
              className="inline-block rounded-lg bg-primary text-white px-4 py-2 text-xs font-semibold hover:bg-primary/90 transition-colors"
            >
              {loginBannerLogin}
            </a>
            <a
              href={signupHref}
              className="inline-block rounded-lg border border-primary/30 bg-white text-primary px-4 py-2 text-xs font-semibold hover:bg-primary/5 transition-colors"
            >
              {loginBannerSignup}
            </a>
          </div>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={!tossPayments || isProcessing || authLoading}
        className="w-full rounded-xl bg-primary text-white font-semibold py-4 text-base hover:bg-primary/90 active:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {buttonLabel}
      </button>

      {user && (
        <p className="text-xs text-muted/80 text-center">
          {locale === "ko" ? (
            <>
              <span className="font-medium text-foreground/80">{user.email}</span>
              {" 계정으로 결제됩니다."}
            </>
          ) : (
            <>
              {"Paying as "}
              <span className="font-medium text-foreground/80">{user.email}</span>
              {"."}
            </>
          )}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2.5">
          {error}
        </p>
      )}

      <p className="text-xs text-muted/80 leading-relaxed">{legalLine}</p>
    </div>
  );
}
