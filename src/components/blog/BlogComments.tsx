"use client";

/**
 * BlogComments — public comment list + login-gated composer.
 *
 * - Read: GET /api/blog/comments?slug= (public).
 * - Post: POST /api/blog/comments with `Authorization: Bearer <Firebase ID token>`.
 *   Requires Mathiter login (useAuth). Logged-out users see a sign-in gate
 *   (inline Google popup + a link to the email /login page).
 * - Delete: own comment, or admin (sspark222@gmail.com).
 *
 * All writes go through the API (Admin SDK) — the client never writes Firestore
 * directly. The client only uses Firebase Auth to obtain the ID token.
 */

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  getClientAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "@/lib/firebase-client";

interface CommentItem {
  id: string;
  uid: string;
  authorName: string;
  authorPhoto: string;
  text: string;
  createdAt: number;
}

interface Props {
  slug: string;
  locale?: "ko" | "en";
}

const ADMIN_EMAILS = ["sspark222@gmail.com"];

function relTime(ms: number, locale: "ko" | "en"): string {
  if (!ms) return "";
  const diff = Date.now() - ms;
  const s = Math.max(0, Math.floor(diff / 1000));
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (locale === "ko") {
    if (s < 60) return "방금 전";
    if (m < 60) return `${m}분 전`;
    if (h < 24) return `${h}시간 전`;
    if (d < 7) return `${d}일 전`;
  } else {
    if (s < 60) return "just now";
    if (m < 60) return `${m}m ago`;
    if (h < 24) return `${h}h ago`;
    if (d < 7) return `${d}d ago`;
  }
  const dt = new Date(ms);
  const mo = String(dt.getMonth() + 1).padStart(2, "0");
  const da = String(dt.getDate()).padStart(2, "0");
  return `${dt.getFullYear()}.${mo}.${da}`;
}

export default function BlogComments({ slug, locale = "ko" }: Props) {
  const { user, loading: authLoading, configured } = useAuth();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const t =
    locale === "ko"
      ? {
          heading: "댓글",
          placeholder: "댓글을 남겨 주세요…",
          submit: "댓글 등록",
          submitting: "등록 중…",
          loginPrompt: "댓글을 쓰려면 Mathiter 로그인이 필요합니다.",
          google: "Google로 로그인",
          email: "이메일로 로그인",
          empty: "첫 댓글을 남겨 보세요.",
          failed: "등록에 실패했어요. 잠시 후 다시 시도해 주세요.",
          del: "삭제",
          confirmDel: "이 댓글을 삭제할까요?",
          checking: "로그인 확인 중…",
        }
      : {
          heading: "Comments",
          placeholder: "Leave a comment…",
          submit: "Post",
          submitting: "Posting…",
          loginPrompt: "Sign in with your Mathiter account to comment.",
          google: "Sign in with Google",
          email: "Sign in with email",
          empty: "Be the first to comment.",
          failed: "Failed to post. Please try again.",
          del: "Delete",
          confirmDel: "Delete this comment?",
          checking: "Checking sign-in…",
        };

  const load = useCallback(() => {
    setLoadingList(true);
    fetch(`/api/blog/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok && Array.isArray(d.comments)) setComments(d.comments);
      })
      .catch(() => {})
      .finally(() => setLoadingList(false));
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  async function loginGoogle() {
    const auth = getClientAuth();
    if (!auth) return;
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch {
      /* user cancelled / popup closed */
    }
  }

  async function submit() {
    if (!user || submitting) return;
    const body = text.trim();
    if (!body) return;
    setSubmitting(true);
    setError("");
    try {
      const token = await user.getIdToken();
      const r = await fetch("/api/blog/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ slug, text: body }),
      });
      const d = await r.json();
      if (d?.ok && d.comment) {
        setComments((c) => [...c, d.comment as CommentItem]);
        setText("");
      } else {
        setError(t.failed);
      }
    } catch {
      setError(t.failed);
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(id: string) {
    if (!user) return;
    if (typeof window !== "undefined" && !window.confirm(t.confirmDel)) return;
    try {
      const token = await user.getIdToken();
      const r = await fetch(`/api/blog/comments?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = await r.json();
      if (d?.ok) setComments((c) => c.filter((x) => x.id !== id));
    } catch {
      /* ignore */
    }
  }

  const isAdmin =
    !!user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
  const nextPath =
    typeof window !== "undefined" ? window.location.pathname : "/blog";

  return (
    <section className="mt-14 border-t border-foreground/10 pt-10">
      <h2 className="mb-6 text-lg font-bold">
        {t.heading}
        {comments.length > 0 && (
          <span className="ml-2 font-normal text-muted tabular-nums">
            {comments.length}
          </span>
        )}
      </h2>

      {/* Composer / login gate */}
      {authLoading ? (
        <p className="mb-8 text-sm text-muted">{t.checking}</p>
      ) : user ? (
        <div className="mb-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
            rows={3}
            maxLength={2000}
            className="w-full resize-y rounded-xl border border-foreground/15 bg-surface px-4 py-3 text-sm leading-relaxed outline-none focus:border-primary/50"
          />
          {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted">
              {user.displayName || user.email}
            </span>
            <button
              type="button"
              onClick={submit}
              disabled={submitting || !text.trim()}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
            >
              {submitting ? t.submitting : t.submit}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-xl border border-foreground/10 bg-surface px-5 py-6 text-center">
          <p className="mb-4 text-sm text-foreground/70">{t.loginPrompt}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={loginGoogle}
              disabled={!configured}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
                <path fill="#EA4335" d="M12 4.75c1.61 0 3.06.55 4.2 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06L5.84 9.9C6.71 7.3 9.14 4.75 12 4.75z" />
              </svg>
              {t.google}
            </button>
            <a
              href={`/login?next=${encodeURIComponent(nextPath)}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t.email}
            </a>
          </div>
        </div>
      )}

      {/* List */}
      {loadingList ? (
        <p className="text-sm text-muted">···</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted">{t.empty}</p>
      ) : (
        <ul className="space-y-6">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface ring-1 ring-foreground/10">
                {c.authorPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.authorPhoto}
                    alt=""
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs font-semibold text-muted">
                    {(c.authorName || "?").slice(0, 1).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{c.authorName}</span>
                  <span className="text-xs text-muted">
                    {relTime(c.createdAt, locale)}
                  </span>
                  {(user?.uid === c.uid || isAdmin) && (
                    <button
                      type="button"
                      onClick={() => remove(c.id)}
                      className="ml-auto text-xs text-muted hover:text-rose-600"
                    >
                      {t.del}
                    </button>
                  )}
                </div>
                <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/85">
                  {c.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
