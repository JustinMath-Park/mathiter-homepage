"use client";

/**
 * BlogReactions — live view count + anonymous "helpful" (like) button.
 *
 * - Fetches live { viewCount, likeCount, liked } from GET /api/blog/like on mount
 *   (the page itself is statically rendered, so build-time counts are stale).
 * - Like is anonymous (no login). Server dedups by hashed IP; localStorage is not
 *   needed because the server returns `liked` for this IP on load.
 * - Optimistic toggle with revert on failure.
 */

import { useEffect, useState } from "react";

interface Props {
  slug: string;
  initialViewCount?: number;
  initialLikeCount?: number;
  locale?: "ko" | "en";
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function BlogReactions({
  slug,
  initialViewCount = 0,
  initialLikeCount = 0,
  locale = "ko",
}: Props) {
  const [views, setViews] = useState(initialViewCount);
  const [likes, setLikes] = useState(initialLikeCount);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/api/blog/like?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!alive || !d?.ok) return;
        if (typeof d.viewCount === "number") setViews(d.viewCount);
        if (typeof d.likeCount === "number") setLikes(d.likeCount);
        setLiked(Boolean(d.liked));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [slug]);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    const next = !liked;
    setLiked(next);
    setLikes((n) => Math.max(0, n + (next ? 1 : -1)));
    try {
      const r = await fetch("/api/blog/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, like: next }),
      });
      const d = await r.json();
      if (!d?.ok) throw new Error("fail");
      setLiked(Boolean(d.liked));
      if (typeof d.likeCount === "number") setLikes(Math.max(0, d.likeCount));
    } catch {
      // revert
      setLiked(!next);
      setLikes((n) => Math.max(0, n + (next ? -1 : 1)));
    } finally {
      setBusy(false);
    }
  }

  const t =
    locale === "ko"
      ? { helpful: "도움이 됐어요", views: "조회" }
      : { helpful: "Helpful", views: "views" };

  return (
    <div className="my-10 flex items-center justify-between gap-4 border-y border-foreground/10 py-5">
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-pressed={liked}
        className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 disabled:opacity-60 ${
          liked
            ? "border-rose-300 bg-rose-50 text-rose-600"
            : "border-foreground/15 text-foreground/70 hover:border-rose-300 hover:text-rose-600"
        }`}
      >
        <HeartIcon filled={liked} />
        <span>{t.helpful}</span>
        <span className="tabular-nums">{likes.toLocaleString()}</span>
      </button>

      <span className="inline-flex items-center gap-1.5 text-sm text-muted tabular-nums">
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
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        {views.toLocaleString()} {t.views}
      </span>
    </div>
  );
}
