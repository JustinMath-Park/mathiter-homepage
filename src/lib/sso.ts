"use client";

import type { User } from "firebase/auth";

/**
 * mathiter.com → app.mathiter.com SSO 헬퍼.
 *
 * Header / Pricing / Hero 등에서 app.mathiter.com 으로 보내는 모든 버튼이
 * 사용한다. user 가 있으면 custom token 을 받아 URL 에 동봉, 없으면 그냥
 * targetUrl 로 이동 (app 측에서 자체 로그인 흐름).
 *
 * 실패해도 사용자 흐름은 끊기지 않도록 — token 발급 실패 시 plain redirect
 * 로 fallback.
 */
export async function navigateToAppWithSSO(
  user: User | null,
  targetUrl: string,
  nextPath?: string
): Promise<void> {
  // 비로그인 — 그냥 이동
  if (!user) {
    window.location.href = targetUrl;
    return;
  }

  try {
    // 항상 강제 갱신 — 캐시된 stale token 으로 verifyIdToken 가 깨지는
    // 케이스(프로젝트 마이그 직후 등) 를 차단.
    const idToken = await user.getIdToken(/* forceRefresh */ true);
    if (!idToken) {
      console.warn("[SSO] user.getIdToken returned empty");
      window.location.href = targetUrl;
      return;
    }

    const res = await fetch("/api/sso/grant-token", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    });

    if (!res.ok) {
      // 실패 원인을 콘솔에 자세히 남겨야 디버깅 가능. body 까지 출력.
      let body = "";
      try {
        body = await res.text();
      } catch {}
      console.warn(
        "[SSO] grant-token failed",
        res.status,
        body || "<empty body>",
        { uid: user.uid, email: user.email, idTokenLen: idToken.length }
      );
      // grant 실패 — 그냥 이동 (app 에서 다시 로그인 받음)
      window.location.href = targetUrl;
      return;
    }

    const { customToken } = (await res.json()) as { customToken?: string };
    if (!customToken) {
      console.warn("[SSO] grant-token response missing customToken");
      window.location.href = targetUrl;
      return;
    }

    // 1) target 이 fully-qualified URL 인지 path 인지 따져서 base 분리
    const url = new URL(targetUrl);
    // /sso?token=...&next=/ko/study 로 라우팅
    url.pathname = "/sso";
    url.searchParams.set("token", customToken);
    if (nextPath) url.searchParams.set("next", nextPath);
    window.location.href = url.toString();
  } catch (err) {
    console.warn("[SSO] unexpected error, falling back to plain redirect", err);
    window.location.href = targetUrl;
  }
}
