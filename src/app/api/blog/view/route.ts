/**
 * POST /api/blog/view — record a blog post view.
 *
 * Body: { slug: string }
 *
 * Dedup strategy (server-side, can't be spoofed):
 *   - Same IP + same slug + same UTC day = counted once.
 *   - Dedup record: blogViews/{slug}__{ipHash12}__{YYYY-MM-DD}.
 *   - Counter: blogPosts/{slug}.viewCount += 1 (via FieldValue.increment).
 *
 * Admin exclusion (best-effort, client header):
 *   - Browsers that have visited /admin set localStorage `mathiter_admin_seen=1`.
 *   - The tracker reads that and adds `X-Mathiter-Admin: 1` header.
 *   - Server skips counting if header present.
 *
 * Bot filter:
 *   - Common crawler UA patterns are skipped.
 *
 * Privacy:
 *   - IP is SHA-256 hashed (truncated to 12 hex chars) before storing.
 *   - Original IP never persisted.
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BOT_UA_REGEX = /bot|crawler|spider|crawl|preview|fetch\b|curl|wget|HeadlessChrome|Lighthouse|Slackbot|facebookexternalhit|Twitterbot|Discordbot|LinkedInBot|WhatsApp|TelegramBot/i;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as { slug?: unknown };
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    if (!slug || !/^[a-z0-9-]+$/.test(slug) || slug.length > 100) {
      return NextResponse.json({ ok: false, error: "invalid-slug" }, { status: 400 });
    }

    // Admin browser opt-out (client sets X-Mathiter-Admin: 1)
    if (req.headers.get("x-mathiter-admin") === "1") {
      return NextResponse.json({ ok: true, skipped: "admin" });
    }

    // Bot filter
    const ua = req.headers.get("user-agent") || "";
    if (BOT_UA_REGEX.test(ua)) {
      return NextResponse.json({ ok: true, skipped: "bot" });
    }

    // Resolve client IP from Vercel headers
    const fwd = req.headers.get("x-forwarded-for") || "";
    const ip = fwd.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "0.0.0.0";

    // Privacy: hash IP (salted) and truncate
    const ipHash = crypto
      .createHash("sha256")
      .update(ip + "|mathiter-views")
      .digest("hex")
      .slice(0, 12);

    // Dedup key — one count per (slug, IP, UTC day)
    const day = new Date().toISOString().slice(0, 10);
    const dedupId = `${slug}__${ipHash}__${day}`;

    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ ok: false, error: "no-firestore" }, { status: 503 });
    }

    const viewRef = db.collection("blogViews").doc(dedupId);
    const postRef = db.collection("blogPosts").doc(slug);

    const result = await db.runTransaction(async (tx) => {
      const existing = await tx.get(viewRef);
      if (existing.exists) {
        return { counted: false };
      }
      tx.set(viewRef, {
        slug,
        ipHash,
        day,
        ua: ua.slice(0, 200),
        createdAt: FieldValue.serverTimestamp(),
      });
      tx.set(
        postRef,
        { viewCount: FieldValue.increment(1) },
        { merge: true }
      );
      return { counted: true };
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[/api/blog/view] error:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
