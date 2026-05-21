/**
 * SSO: mathiter.com → app.mathiter.com
 *
 * 클라이언트가 자신의 Firebase ID Token 을 POST 로 보내면:
 *  1. Firebase Admin SDK 로 ID Token 검증 (서명 + 만료 + 발급자)
 *  2. 검증된 uid 로 1시간 만료 custom token 발급
 *  3. 응답: { customToken }
 *
 * 클라이언트는 받은 customToken 을 app.mathiter.com/sso?token=... 으로 전달.
 * app.mathiter.com 의 /sso 페이지가 signInWithCustomToken(token) 호출하여
 * 사용자가 다시 로그인하지 않아도 자동 인증된다.
 *
 * 보안:
 *  - 동일 Firebase project (mathiter-prod-kr) 내에서만 동작
 *  - custom token 기본 만료 = 1시간 (firebase-admin SDK 기본값)
 *  - HTTPS 필수
 *  - app.mathiter.com 의 /sso 페이지는 받은 token 으로 로그인 후
 *    history.replaceState 로 URL 에서 토큰 즉시 제거
 */
import { NextResponse, type NextRequest } from "next/server";
import { getAdminAuth, isFirebaseConfigured } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!isFirebaseConfigured()) {
    return NextResponse.json(
      { error: "Firebase Admin not configured on this deployment." },
      { status: 500 }
    );
  }

  let idToken: string | undefined;
  try {
    const body = await req.json();
    idToken = typeof body?.idToken === "string" ? body.idToken : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!idToken) {
    return NextResponse.json(
      { error: "idToken is required in request body." },
      { status: 400 }
    );
  }

  const auth = getAdminAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Firebase Admin Auth unavailable." },
      { status: 500 }
    );
  }

  try {
    // 1) ID token 검증 — 만료된/위조된 토큰은 throw
    const decoded = await auth.verifyIdToken(idToken, true);

    // 2) 동일 uid 로 custom token 발급 (1시간 만료)
    const customToken = await auth.createCustomToken(decoded.uid, {
      // 필요 시 추가 claim — app 측에서 회원 가입 출처 표시 등
      sso_source: "mathiter-homepage",
    });

    return NextResponse.json(
      {
        customToken,
        uid: decoded.uid,
        email: decoded.email ?? null,
      },
      {
        headers: {
          // 캐시 금지 (개별 토큰이므로)
          "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err) {
    const code = (err as { code?: string }).code;
    // 토큰 만료/위조 — 401 로 반환 (클라이언트는 그냥 일반 redirect 로 fallback)
    if (code === "auth/id-token-expired" || code === "auth/id-token-revoked") {
      return NextResponse.json(
        { error: "ID token expired or revoked." },
        { status: 401 }
      );
    }
    if (code === "auth/argument-error" || code === "auth/invalid-id-token") {
      return NextResponse.json(
        { error: "Invalid ID token." },
        { status: 400 }
      );
    }
    console.error("[sso/grant-token] verifyIdToken failed:", err);
    return NextResponse.json(
      { error: "Failed to grant SSO token." },
      { status: 500 }
    );
  }
}
