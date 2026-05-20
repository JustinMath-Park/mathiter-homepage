/**
 * POST /api/payment/confirm
 *
 * 토스페이먼츠 결제 승인 API 호출.
 * 클라이언트가 successUrl로 리다이렉트된 후, paymentKey/orderId/amount를
 * 받아서 이 라우트로 POST 호출하면 시크릿 키로 토스 API에 결제 확정.
 *
 * 요청 본문: { paymentKey: string, orderId: string, amount: number }
 *
 * 토스 API 레퍼런스:
 *   POST https://api.tosspayments.com/v1/payments/confirm
 *   Authorization: Basic <Base64(secret_key + ':')>
 *
 * ⚠️ 시크릿 키는 서버 사이드 전용. 절대 응답에 포함하거나 로그에 남기지 말 것.
 */

import { NextRequest, NextResponse } from "next/server";

const TOSS_API_URL = "https://api.tosspayments.com/v1/payments/confirm";

// 명시적으로 Node.js Runtime 강제 — Edge Runtime에서는 Buffer 동작이
// 다를 수 있고, Toss docs는 표준 Base64 인코딩을 요구함.
export const runtime = "nodejs";

type ConfirmRequest = {
  paymentKey: string;
  orderId: string;
  amount: number;
};

export async function POST(req: NextRequest) {
  const rawKey = process.env.TOSS_SECRET_KEY;

  if (!rawKey) {
    console.error("[PaymentConfirm] TOSS_SECRET_KEY is not set");
    return NextResponse.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );
  }

  // 환경변수 정리 — Toss docs 요구사항: UTF-8 BOM, 공백, 줄바꿈 제거
  //   .trim()            → 앞뒤 공백·줄바꿈 제거
  //   replace ^﻿/  → UTF-8 BOM (혹시 .env에 섞였을 가능성)
  const secretKey = rawKey.trim().replace(/^﻿/, "");

  if (secretKey.length === 0) {
    console.error("[PaymentConfirm] TOSS_SECRET_KEY is empty after trim");
    return NextResponse.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );
  }

  // 🔍 진단 로그 — Vercel 함수 로그에서 키 셋업 확인용
  // (시크릿 키 전체는 절대 로그 X — prefix·suffix만)
  const keyDiag = {
    rawLength: rawKey.length,
    cleanLength: secretKey.length,
    diff: rawKey.length - secretKey.length,
    hadBOM: rawKey.charCodeAt(0) === 0xfeff,
    hadLeadingSpace: rawKey.startsWith(" ") || rawKey.startsWith("\t"),
    hadTrailingSpace: rawKey.endsWith(" ") || rawKey.endsWith("\t"),
    hadNewline: /[\r\n]/.test(rawKey),
    prefix: secretKey.slice(0, 12),
    suffix: secretKey.slice(-4),
    startsWithTestSk: secretKey.startsWith("test_sk_"),
    startsWithLiveSk: secretKey.startsWith("live_sk_"),
  };
  console.log("[PaymentConfirm] Key diagnostics:", keyDiag);

  // 1. 요청 본문 파싱
  let body: Partial<ConfirmRequest>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { paymentKey, orderId, amount } = body;

  // 2. 필수 파라미터 검증
  if (
    typeof paymentKey !== "string" ||
    typeof orderId !== "string" ||
    typeof amount !== "number"
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing or invalid parameters (paymentKey, orderId, amount)",
      },
      { status: 400 }
    );
  }

  if (amount <= 0 || amount > 10_000_000) {
    // 1천만원 초과 결제는 단건 결제로 비현실적
    return NextResponse.json(
      { success: false, error: "Amount out of allowed range" },
      { status: 400 }
    );
  }

  // 3. 토스 결제 승인 API 호출
  // Toss docs: "시크릿 키 뒤에 ':'을 추가하고 base64로 인코딩하세요"
  //   - UTF-8로 인코딩 (Buffer 기본값)
  //   - 콜론 누락 금지
  //   - BOM 금지 (위에서 제거함)
  const auth = Buffer.from(`${secretKey}:`, "utf8").toString("base64");

  console.log("[PaymentConfirm] Auth header diagnostic:", {
    authLength: auth.length,
    authPrefix: auth.slice(0, 16),
    expectedDecodedLength: secretKey.length + 1, // +1 for ':'
  });

  try {
    const tossRes = await fetch(TOSS_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    const data = await tossRes.json();

    if (!tossRes.ok) {
      // 토스가 4xx/5xx 응답
      console.error("[PaymentConfirm] Toss API error:", {
        status: tossRes.status,
        code: data.code,
        message: data.message,
        orderId,
      });

      return NextResponse.json(
        {
          success: false,
          error: data.message || "Payment approval failed",
          code: data.code,
          status: tossRes.status,
        },
        { status: tossRes.status }
      );
    }

    // 4. 승인 성공 - 결제 정보 정규화
    // 자세한 응답 형식: https://docs.tosspayments.com/reference#payment
    const payment = {
      paymentKey: data.paymentKey,
      orderId: data.orderId,
      orderName: data.orderName,
      totalAmount: data.totalAmount,
      balanceAmount: data.balanceAmount,
      status: data.status,
      method: data.method,
      approvedAt: data.approvedAt,
      requestedAt: data.requestedAt,
      currency: data.currency,
      suppliedAmount: data.suppliedAmount,
      vat: data.vat,
      taxFreeAmount: data.taxFreeAmount,
      card: data.card
        ? {
            company: data.card.issuerCode
              ? translateIssuerCode(data.card.issuerCode)
              : undefined,
            number: data.card.number,
            installmentPlanMonths: data.card.installmentPlanMonths,
            isInterestFree: data.card.isInterestFree,
          }
        : undefined,
      receipt: data.receipt,
    };

    // TODO: Firestore에 결제 기록 저장 (다음 단계에서 추가)
    // - payments 컬렉션에 doc 추가
    // - userId 매핑
    // - subscription 활성화

    return NextResponse.json({ success: true, payment });
  } catch (err) {
    console.error("[PaymentConfirm] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * 토스가 응답에 주는 카드사 코드를 사용자에게 보여줄 이름으로 변환.
 * https://docs.tosspayments.com/reference/codes#카드사-코드
 */
function translateIssuerCode(code: string): string {
  const map: Record<string, string> = {
    "11": "BC카드",
    "12": "광주은행",
    "14": "롯데카드",
    "15": "수협은행",
    "17": "전북은행",
    "18": "제주은행",
    "19": "BC바로카드",
    "20": "새마을금고",
    "21": "신협",
    "22": "씨티카드",
    "23": "우리카드",
    "24": "우체국예금",
    "25": "저축은행",
    "26": "신한카드",
    "27": "현대카드",
    "31": "BC카드",
    "32": "KEB하나카드",
    "33": "우리카드",
    "34": "신한카드",
    "35": "산업은행",
    "36": "씨티카드",
    "37": "농협카드",
    "38": "수협",
    "41": "NH농협카드",
    "42": "롯데카드",
    "43": "케이뱅크",
    "44": "토스뱅크",
    "46": "광주카드",
    "47": "신협카드",
    "48": "삼성카드",
    "51": "산림조합",
    "52": "신한카드",
    "54": "현대카드",
    "55": "KB국민카드",
    "56": "BC카드",
    "57": "BC바로카드",
    "60": "BC카드",
    "61": "KB국민카드",
    "62": "BC카드",
    "63": "삼성카드",
    "64": "롯데카드",
    "65": "수협",
    "66": "신한카드",
    "67": "농협카드",
    "71": "우리카드",
    "81": "BC카드",
    "91": "다이너스카드",
    "94": "유니온페이",
    "96": "마스터카드",
    "97": "비자카드",
    "98": "JCB카드",
    "99": "은련카드",
  };
  return map[code] || code;
}
