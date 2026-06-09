/**
 * Blog comments — Mathiter login required to post (Firebase ID token verified
 * server-side via Admin SDK). Public read. Server-only write.
 *
 * GET    /api/blog/comments?slug=...            -> { ok, comments: [...] }     (public)
 * POST   /api/blog/comments { slug, text }      -> { ok, comment }             (auth)
 * DELETE /api/blog/comments?id=...              -> { ok, deleted }             (auth: owner or admin)
 *
 * Auth: Authorization: Bearer <Firebase ID token>. Token project must match the
 * Admin SDK project (mathiter-prod-kr) — verified by getAdminAuth().verifyIdToken().
 *
 * Storage: blogComments/{autoId} = { slug, uid, authorName, authorPhoto, text,
 * status, createdAt }. Counter mirrored on blogPosts/{slug}.commentCount.
 * Query is by slug only (no orderBy) to avoid a composite index; sorted in JS.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, getAdminAuth } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["sspark222@gmail.com"];
const MAX_LEN = 2000;

function isValidSlug(s: string): boolean {
  return /^[a-z0-9-]+$/.test(s) && s.length > 0 && s.length <= 100;
}

type Decoded = { uid: string; name?: string; email?: string; picture?: string };

async function verifyToken(req: NextRequest): Promise<Decoded | null> {
  const authz = req.headers.get("authorization") || "";
  const m = authz.match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  const auth = getAdminAuth();
  if (!auth) return null;
  try {
    const d = await auth.verifyIdToken(m[1].trim());
    return { uid: d.uid, name: d.name, email: d.email, picture: d.picture };
  } catch {
    return null;
  }
}

function tsToMillis(ts: unknown): number {
  const t = ts as { _seconds?: number; seconds?: number } | null;
  if (t?._seconds) return t._seconds * 1000;
  if (t?.seconds) return t.seconds * 1000;
  return 0;
}

export async function GET(req: NextRequest) {
  try {
    const slug = (req.nextUrl.searchParams.get("slug") || "").trim();
    if (!isValidSlug(slug)) {
      return NextResponse.json({ ok: false, error: "invalid-slug" }, { status: 400 });
    }
    const db = getAdminDb();
    if (!db) return NextResponse.json({ ok: true, comments: [] });

    const snap = await db.collection("blogComments").where("slug", "==", slug).get();
    const comments = snap.docs
      .map((d) => {
        const x = d.data();
        return {
          id: d.id,
          uid: typeof x.uid === "string" ? x.uid : "",
          authorName: typeof x.authorName === "string" ? x.authorName : "익명",
          authorPhoto: typeof x.authorPhoto === "string" ? x.authorPhoto : "",
          text: typeof x.text === "string" ? x.text : "",
          createdAt: tsToMillis(x.createdAt) || 0,
          status: typeof x.status === "string" ? x.status : "published",
        };
      })
      .filter((c) => c.status === "published")
      .sort((a, b) => a.createdAt - b.createdAt);

    return NextResponse.json({ ok: true, comments });
  } catch (err) {
    console.error("[/api/blog/comments GET] error:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    const body = (await req.json().catch(() => ({}))) as { slug?: unknown; text?: unknown };
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    let text = typeof body.text === "string" ? body.text.trim() : "";
    if (!isValidSlug(slug)) {
      return NextResponse.json({ ok: false, error: "invalid-slug" }, { status: 400 });
    }
    if (!text) {
      return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
    }
    if (text.length > MAX_LEN) text = text.slice(0, MAX_LEN);

    const db = getAdminDb();
    if (!db) return NextResponse.json({ ok: false, error: "no-firestore" }, { status: 503 });

    const rawName =
      decoded.name || (decoded.email ? decoded.email.split("@")[0] : "사용자");
    const authorName = String(rawName).slice(0, 60);
    const authorPhoto = decoded.picture || "";

    const ref = await db.collection("blogComments").add({
      slug,
      uid: decoded.uid,
      authorName,
      authorPhoto,
      text,
      status: "published",
      createdAt: FieldValue.serverTimestamp(),
    });
    await db
      .collection("blogPosts")
      .doc(slug)
      .set({ commentCount: FieldValue.increment(1) }, { merge: true });

    return NextResponse.json({
      ok: true,
      comment: {
        id: ref.id,
        uid: decoded.uid,
        authorName,
        authorPhoto,
        text,
        createdAt: Date.now(),
        status: "published",
      },
    });
  } catch (err) {
    console.error("[/api/blog/comments POST] error:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    const id = (req.nextUrl.searchParams.get("id") || "").trim();
    if (!id || id.length > 200) {
      return NextResponse.json({ ok: false, error: "invalid-id" }, { status: 400 });
    }
    const db = getAdminDb();
    if (!db) return NextResponse.json({ ok: false, error: "no-firestore" }, { status: 503 });

    const ref = db.collection("blogComments").doc(id);
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ ok: true, deleted: false });
    const data = snap.data() || {};

    const isOwner = data.uid === decoded.uid;
    const isAdmin =
      !!decoded.email && ADMIN_EMAILS.includes(decoded.email.toLowerCase());
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }

    await ref.delete();
    if (typeof data.slug === "string") {
      await db
        .collection("blogPosts")
        .doc(data.slug)
        .set({ commentCount: FieldValue.increment(-1) }, { merge: true });
    }
    return NextResponse.json({ ok: true, deleted: true });
  } catch (err) {
    console.error("[/api/blog/comments DELETE] error:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
