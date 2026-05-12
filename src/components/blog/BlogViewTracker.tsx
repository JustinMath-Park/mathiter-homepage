"use client";

/**
 * BlogViewTracker — invisible component that records a page view via
 * POST /api/blog/view on mount.
 *
 * Behavior:
 *   - Skipped if browser has visited /admin (localStorage `mathiter_admin_seen=1`).
 *   - Skipped if this slug was already fired in the current tab session
 *     (sessionStorage). Prevents React 19 strict-mode double effect + accidental
 *     re-renders from double-counting.
 *   - Fire-and-forget; never blocks UI; ignores failures.
 *
 * Server-side dedup also runs (same IP + same slug + same UTC day = 1) so
 * even if this client-side guard is bypassed, the counter stays accurate.
 */

import { useEffect } from "react";

interface Props {
  slug: string;
}

export default function BlogViewTracker({ slug }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip rapid duplicate within same tab
    const sessionKey = `mathiter_view_${slug}`;
    if (window.sessionStorage.getItem(sessionKey)) return;
    window.sessionStorage.setItem(sessionKey, "1");

    // Detect admin browser
    const isAdminBrowser =
      window.localStorage.getItem("mathiter_admin_seen") === "1";

    // Fire-and-forget
    fetch("/api/blog/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(isAdminBrowser ? { "X-Mathiter-Admin": "1" } : {}),
      },
      body: JSON.stringify({ slug }),
      keepalive: true,
    }).catch(() => {
      // best-effort; ignore failures
    });
  }, [slug]);

  return null;
}
