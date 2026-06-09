/**
 * Blog likes — anonymous (no login), IP-deduped, server-only via Admin SDK.
 *
 * GET  /api/blog/like?slug=...        -> { ok, likeCount, viewCount, commentCount, liked }
 * POST /api/blog/like { slug, like }  -> { ok, likeCount, liked }   (toggle)
 *
 * Dedup: one like per (slug, IP). Record: blogLikes/{slug}__{ipHash12}.
 * Counter: blogPosts/{slug}.likeCount += / -= 1 (FieldValue.increment).
 * IP is SHA-256 hashed (12 hex) before storing; original IP never persisted.
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidSlug(s: string): boolean {
  return /^[a-z0-9-]+$/.test(s) && s.length > 0 && s.length <= 100;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for") || "";
  return fwd.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "0.0.0.0";
}

function ipHash(ip: string): string {
  return crypto
    .createHash("sha256")
    .update(ip + "|mathiter-likes")
    .digest("hex")
    .slice(0, 12);
}

export async function GET(req: NextRequest) {
  try {
    const slug = (req.nextUrl.searchParams.get("slug") || "").trim();
    if (!isValidSlug(slug)) {
      return NextResponse.json({ ok: false, error: "invalid-slug" }, { status: 400 });
    }
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ ok: true, likeCount: 0, viewCount: 0, commentCount: 0, liked: false });
    }
    const hash = ipHash(clientIp(req));
    const [postSnap, likeSnap] = await Promise.all([
      db.collection("blogPosts").doc(slug).get(),
      db.collection("blogLikes").doc(`${slug}__${hash}`).get(),
    ]);
    const data = postSnap.data() || {};
    return NextResponse.json({
      ok: true,
      slug,
      likeCount: Math.max(0, Number(data.likeCount || 0)),
      viewCount: Math.max(0, Number(data.viewCount || 0)),
      commentCount: Math.max(0, Number(data.commentCount || 0)),
      liked: likeSnap.exists,
    });
  } catch (err) {
    console.error("[/api/blog/like GET] error:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as { slug?: unknown; like?: unknown };
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    const like = body.like !== false; // default true (like); pass { like: false } to unlike
    if (!isValidSlug(slug)) {
      return NextResponse.json({ ok: false, error: "invalid-slug" }, { status: 400 });
    }
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ ok: false, error: "no-firestore" }, { status: 503 });
    }
    const hash = ipHash(clientIp(req));
    const likeRef = db.collection("blogLikes").doc(`${slug}__${hash}`);
    const postRef = db.collection("blogPosts").doc(slug);

    const result = await db.runTransaction(async (tx) => {
      const existing = await tx.get(likeRef);
      if (like && !existing.exists) {
        tx.set(likeRef, { slug, ipHash: hash, createdAt: FieldValue.serverTimestamp() });
        tx.set(postRef, { likeCount: FieldValue.increment(1) }, { merge: true });
        return { liked: true };
      }
      if (!like && existing.exists) {
        tx.delete(likeRef);
        tx.set(postRef, { likeCount: FieldValue.increment(-1) }, { merge: true });
        return { liked: false };
      }
      return { liked: like };
    });

    const postSnap = await postRef.get();
    const likeCount = Math.max(0, Number(postSnap.data()?.likeCount || 0));
    return NextResponse.json({ ok: true, slug, liked: result.liked, likeCount });
  } catch (err) {
    console.error("[/api/blog/like POST] error:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
