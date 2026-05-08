"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getClientAuth,
  GoogleAuthProvider,
  signInWithPopup,
  isFirebaseClientConfigured,
  isAdminEmail,
} from "@/lib/firebase-client";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";

export default function AdminLogin() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAdminAuth();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // If already logged in as admin, redirect to /admin/blog
  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.replace("/admin/blog");
    }
  }, [loading, user, isAdmin, router]);

  const configured = isFirebaseClientConfigured();

  async function signIn() {
    if (!configured) {
      setError("Firebase 환경변수가 설정되지 않았습니다.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const auth = getClientAuth();
      if (!auth) throw new Error("Auth not initialized");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (!isAdminEmail(result.user.email)) {
        setError(
          `${result.user.email} 계정은 어드민 권한이 없습니다. 관리자에게 문의하세요.`
        );
        // Sign out — they shouldn't stay logged in
        await auth.signOut();
        return;
      }
      router.replace("/admin/blog");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(`로그인 실패: ${msg}`);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="text-xs text-primary font-bold tracking-widest mb-3">
            MATHITER ADMIN
          </div>
          <h1 className="text-2xl font-bold mb-2">블로그 에디터 로그인</h1>
          <p className="text-muted text-sm leading-relaxed">
            Mathiter Tutoring 블로그를 직접 편집하려면 Google 계정으로 로그인하세요.
          </p>
        </div>

        {!configured && (
          <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-sm text-yellow-900">
            <strong>Firebase 환경변수가 설정되지 않았습니다.</strong>
            <br />
            Vercel에 NEXT_PUBLIC_FIREBASE_* 변수 설정 필요.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={signIn}
          disabled={pending || !configured}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-full py-3 px-5 font-medium text-foreground hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.13 4.13 0 0 1-1.79 2.71v2.26h2.9c1.7-1.56 2.69-3.87 2.69-6.61z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.71H.96v2.34A9 9 0 0 0 9 18z"
            />
            <path
              fill="#FBBC05"
              d="M3.95 10.71A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.17.29-1.71V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l2.99-2.34z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z"
            />
          </svg>
          {pending ? "로그인 중..." : "Google로 로그인"}
        </button>

        <p className="mt-6 text-xs text-muted text-center">
          허용된 이메일 계정만 어드민에 접근할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
