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

  // idToken 의 payload 를 decode 만 (signature 검증 없이) 해서 어떤 project
  // 에서 발급된 토큰인지 진단에 사용. Vercel env(server admin) 와 클라이언트
  // Firebase project 가 mismatch 면 verifyIdToken 이 깨지는데, 그 정보가
  // 응답에 같이 있으면 디버깅 즉시 가능.
  let tokenAud: string | undefined;
  let tokenIss: string | undefined;
  try {
    const payload = JSON.parse(
      Buffer.from(idToken.split(".")[1] || "", "base64url").toString("utf8")
    );
    tokenAud = payload?.aud;
    tokenIss = payload?.iss;
  } catch {
    // 디코드 실패 — 토큰 자체 malformed
  }

  try {
    // 1) ID token 검증 — 만료된/위조된 토큰은 throw
    const decoded = await auth.verifyIdToken(idToken, true);

    // 2) 동일 uid 로 custom token 발급 (1시간 만료)
    const customToken = await auth.createCustomToken(decoded.uid, {
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
          "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err) {
    const code = (err as { code?: string }).code;
    const message = (err as { message?: string }).message;
    // 진단용 — 어느 project 의 token 인지 + 서버 admin 이 어느 project 인지
    // 둘 다 응답에 노출 (mismatch 가 흔한 원인).
    const diag = {
      code,
      message,
      tokenAud,
      tokenIss,
      serverProjectId: process.env.FIREBASE_PROJECT_ID,
    };

    if (code === "auth/id-token-expired" || code === "auth/id-token-revoked") {
      return NextResponse.json(
        { error: "ID token expired or revoked.", diag },
        { status: 401 }
      );
    }
    if (code === "auth/argument-error" || code === "auth/invalid-id-token") {
      return NextResponse.json(
        { error: "Invalid ID token.", diag },
        { status: 400 }
      );
    }
    console.error("[sso/grant-token] verifyIdToken failed:", err);
    return NextResponse.json(
      { error: "Failed to grant SSO token.", diag },
      { status: 500 }
    );
  }
}
