"use client";

/**
 * AdminBlogLink — a floating "블로그 관리" button shown ONLY to the admin
 * (sspark222@gmail.com) on public blog pages. Invisible to everyone else
 * (renders null), so it never appears for normal visitors.
 *
 * Uses the public AuthProvider (useAuth) — present on /[locale]/blog/* pages.
 */

import { useAuth } from "@/lib/auth-context";
import { isAdminEmail } from "@/lib/firebase-client";

export default function AdminBlogLink({ label = "블로그 관리" }: { label?: string }) {
  const { user } = useAuth();
  if (!isAdminEmail(user?.email)) return null;

  return (
    <a
      href="/admin/blog"
      title="블로그 관리 대시보드 (관리자 전용)"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-black/5 transition-opacity hover:opacity-90"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
      {label}
    </a>
  );
}
