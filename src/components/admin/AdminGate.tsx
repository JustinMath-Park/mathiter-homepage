"use client";

import { useAdminAuth } from "./AdminAuthProvider";

interface Props {
  children: React.ReactNode;
}

/**
 * Wraps admin pages — shows loading / config-missing / login-required /
 * not-admin states. Children only render for authenticated admin users.
 */
export default function AdminGate({ children }: Props) {
  const { user, isAdmin, loading, configured } = useAdminAuth();

  if (!configured) {
    return (
      <Centered>
        <h1 className="text-xl font-bold mb-3">Firebase 설정 필요</h1>
        <p className="text-muted text-sm leading-relaxed mb-4">
          Vercel에 다음 환경변수를 설정해주세요 (Production scope):
        </p>
        <pre className="text-xs bg-surface-dark p-4 rounded-lg overflow-x-auto leading-relaxed">
          {`NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID`}
        </pre>
        <p className="text-xs text-muted mt-3">
          Firebase Console → 프로젝트 설정 → 내 앱 → 웹 앱 등록 후 받은 config 값.
        </p>
      </Centered>
    );
  }

  if (loading) {
    return (
      <Centered>
        <p className="text-muted text-sm">로그인 상태 확인 중...</p>
      </Centered>
    );
  }

  if (!user) {
    return (
      <Centered>
        <h1 className="text-2xl font-bold mb-2">로그인 필요</h1>
        <p className="text-muted text-sm mb-6">
          Mathiter 어드민에 접근하려면 Google 계정으로 로그인하세요.
        </p>
        <a
          href="/admin/login"
          className="inline-block gradient-bg text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          로그인 페이지로
        </a>
      </Centered>
    );
  }

  if (!isAdmin) {
    return (
      <Centered>
        <h1 className="text-2xl font-bold mb-2 text-red-700">접근 권한 없음</h1>
        <p className="text-muted text-sm mb-2">
          {user.email} 계정은 어드민 권한이 없습니다.
        </p>
        <p className="text-xs text-muted">
          관리자에게 이메일을 allowlist에 추가해 달라고 요청하세요.
        </p>
        <a
          href="/admin/login"
          className="inline-block mt-6 text-sm text-primary hover:underline"
        >
          다른 계정으로 로그인
        </a>
      </Centered>
    );
  }

  return <>{children}</>;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        {children}
      </div>
    </div>
  );
}
