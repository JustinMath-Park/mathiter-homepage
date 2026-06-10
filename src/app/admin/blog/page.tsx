"use client";

/**
 * Admin blog hub — engagement stats + curation + comment moderation.
 *
 *  • Stats: viewCount / likeCount / commentCount per post (read from blogPosts).
 *    Click a column header to sort by it.
 *  • Curation: editable "순번" (sortOrder) per post. Lower = higher on the public
 *    /blog list. Written client-side to blogPosts (rules allow admin write).
 *    Firestore-only field — not in .md frontmatter, so reseed (merge) preserves it.
 *    Blank = no manual order (falls back to publishedAt, newest first).
 *  • Comments: expand a post to read its comments and delete any (admin token ->
 *    DELETE /api/blog/comments).
 *
 * Firestore rules (deployed): blogPosts public read / admin write; blogComments
 * public read / server-only write (delete goes through the admin API).
 */

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { getClientDb, getClientAuth, signOut } from "@/lib/firebase-client";
import AdminGate from "@/components/admin/AdminGate";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";

type PostRow = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  status: string;
  publishedAt: string;
  category: string;
  showOnHome: boolean;
  showOnTutoring: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  sortOrder: number | null;
};

type CommentRow = {
  id: string;
  uid: string;
  authorName: string;
  authorPhoto: string;
  text: string;
  createdAt: number;
};

type SortKey = "order" | "views" | "likes" | "comments" | "date";

export default function AdminBlogList() {
  return (
    <AdminGate>
      <BlogListInner />
    </AdminGate>
  );
}

function BlogListInner() {
  const { user } = useAdminAuth();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>("order");
  const [orderDraft, setOrderDraft] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const [expanded, setExpanded] = useState<string | null>(null);
  const [commentsBySlug, setCommentsBySlug] = useState<Record<string, CommentRow[]>>({});
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const db = getClientDb();
        if (!db) throw new Error("Firestore not initialized");
        const snap = await getDocs(collection(db, "blogPosts"));
        const list: PostRow[] = snap.docs.map((d) => {
          const x = d.data() as Record<string, unknown>;
          return {
            id: d.id,
            slug: String(x.slug ?? d.id),
            locale: String(x.locale ?? "ko"),
            title: String(x.title ?? "(제목 없음)"),
            status: String(x.status ?? "draft"),
            publishedAt: String(x.publishedAt ?? ""),
            category: String(x.category ?? "general"),
            showOnHome: x.showOnHome !== false,
            showOnTutoring: x.showOnTutoring !== false,
            viewCount: typeof x.viewCount === "number" ? x.viewCount : 0,
            likeCount: typeof x.likeCount === "number" ? x.likeCount : 0,
            commentCount: typeof x.commentCount === "number" ? x.commentCount : 0,
            sortOrder: typeof x.sortOrder === "number" ? x.sortOrder : null,
          };
        });
        setPosts(list);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const byDateDesc = (a: PostRow, b: PostRow) =>
    b.publishedAt.localeCompare(a.publishedAt);

  const sorted = useMemo(() => {
    const arr = [...posts];
    switch (sortKey) {
      case "views":
        arr.sort((a, b) => b.viewCount - a.viewCount || byDateDesc(a, b));
        break;
      case "likes":
        arr.sort((a, b) => b.likeCount - a.likeCount || byDateDesc(a, b));
        break;
      case "comments":
        arr.sort((a, b) => b.commentCount - a.commentCount || byDateDesc(a, b));
        break;
      case "date":
        arr.sort(byDateDesc);
        break;
      case "order":
      default:
        arr.sort((a, b) => {
          const ao = a.sortOrder ?? Number.POSITIVE_INFINITY;
          const bo = b.sortOrder ?? Number.POSITIVE_INFINITY;
          if (ao !== bo) return ao - bo;
          return byDateDesc(a, b);
        });
    }
    return arr;
  }, [posts, sortKey]);

  const totals = useMemo(
    () => ({
      views: posts.reduce((s, p) => s + p.viewCount, 0),
      likes: posts.reduce((s, p) => s + p.likeCount, 0),
      comments: posts.reduce((s, p) => s + p.commentCount, 0),
    }),
    [posts]
  );

  async function handleSignOut() {
    const auth = getClientAuth();
    if (auth) await signOut(auth);
    window.location.href = "/admin/login";
  }

  async function saveOrder(id: string, raw: string) {
    const db = getClientDb();
    if (!db) return;
    const trimmed = raw.trim();
    const next = trimmed === "" ? null : Number.parseInt(trimmed, 10);
    if (next !== null && Number.isNaN(next)) {
      setOrderDraft((m) => {
        const { [id]: _drop, ...rest } = m;
        void _drop;
        return rest;
      });
      return;
    }
    const current = posts.find((p) => p.id === id)?.sortOrder ?? null;
    if (next === current) {
      setOrderDraft((m) => {
        const { [id]: _drop, ...rest } = m;
        void _drop;
        return rest;
      });
      return;
    }
    setSavingId(id);
    try {
      await updateDoc(doc(db, "blogPosts", id), { sortOrder: next });
      setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, sortOrder: next } : p)));
      setOrderDraft((m) => {
        const { [id]: _drop, ...rest } = m;
        void _drop;
        return rest;
      });
      setSavedId(id);
      setTimeout(() => setSavedId((s) => (s === id ? null : s)), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSavingId((s) => (s === id ? null : s));
    }
  }

  async function toggleComments(slug: string) {
    if (expanded === slug) {
      setExpanded(null);
      return;
    }
    setExpanded(slug);
    if (!commentsBySlug[slug]) {
      setLoadingComments(true);
      try {
        const r = await fetch(`/api/blog/comments?slug=${encodeURIComponent(slug)}`);
        const d = await r.json();
        if (d?.ok) setCommentsBySlug((m) => ({ ...m, [slug]: d.comments || [] }));
      } catch {
        /* ignore */
      } finally {
        setLoadingComments(false);
      }
    }
  }

  async function deleteComment(slug: string, id: string) {
    if (!user) return;
    if (!window.confirm("이 댓글을 삭제할까요?")) return;
    try {
      const token = await user.getIdToken();
      const r = await fetch(`/api/blog/comments?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = await r.json();
      if (d?.ok) {
        setCommentsBySlug((m) => ({
          ...m,
          [slug]: (m[slug] || []).filter((c) => c.id !== id),
        }));
        setPosts((ps) =>
          ps.map((p) =>
            p.slug === slug
              ? { ...p, commentCount: Math.max(0, p.commentCount - 1) }
              : p
          )
        );
      }
    } catch {
      /* ignore */
    }
  }

  function Th({
    label,
    k,
    className = "",
    title,
  }: {
    label: string;
    k: SortKey;
    className?: string;
    title?: string;
  }) {
    const active = sortKey === k;
    return (
      <th className={`py-3 px-3 font-medium ${className}`} title={title}>
        <button
          onClick={() => setSortKey(k)}
          className={`inline-flex items-center gap-1 transition-colors ${
            active ? "text-primary" : "hover:text-foreground"
          }`}
        >
          {label}
          <span className={active ? "opacity-100" : "opacity-30"}>▾</span>
        </button>
      </th>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-primary tracking-widest">
              MATHITER ADMIN
            </span>
            <span className="text-muted text-sm">·</span>
            <h1 className="font-bold">블로그 관리</h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/ko/blog"
              className="text-xs font-semibold text-primary hover:underline"
            >
              ← 블로그 사이트
            </a>
            <span className="text-xs text-muted">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted">
            총 <span className="font-semibold text-foreground">{posts.length}</span>편 · 조회{" "}
            <span className="font-semibold text-foreground">
              {totals.views.toLocaleString()}
            </span>{" "}
            · 좋아요{" "}
            <span className="font-semibold text-foreground">
              {totals.likes.toLocaleString()}
            </span>{" "}
            · 댓글{" "}
            <span className="font-semibold text-foreground">
              {totals.comments.toLocaleString()}
            </span>
          </p>
          <a
            href="/ko/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            라이브 블로그 보기 →
          </a>
        </div>

        <p className="text-xs text-muted mb-4">
          <strong className="text-foreground">순번</strong> = 공개 /blog 목록 순서
          (낮을수록 위 · 비우면 발행일순). 칸을 수정하면 자동 저장됩니다. 컬럼 제목을
          누르면 정렬됩니다.
        </p>

        {loading && (
          <div className="text-center py-16 text-muted">불러오는 중...</div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 mb-4">
            <strong>오류:</strong> {error}
          </div>
        )}

        {!loading && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs text-muted">
                <tr>
                  <th className="text-left py-3 px-5 font-medium">제목</th>
                  <th className="text-left py-3 px-3 font-medium w-20">분류</th>
                  <th className="text-left py-3 px-3 font-medium w-16">상태</th>
                  <Th label="조회" k="views" className="text-right w-16" title="같은 IP 24h 1회 · 어드민 제외" />
                  <Th label="♥" k="likes" className="text-right w-14" title="좋아요(익명)" />
                  <Th label="💬" k="comments" className="text-right w-14" title="댓글 — 클릭 시 펼쳐 관리" />
                  <Th label="순번" k="order" className="text-center w-20" title="공개 목록 순서(낮을수록 위)" />
                  <Th label="발행일" k="date" className="text-left w-24" />
                  <th className="w-16"></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((post) => (
                  <FragmentRow
                    key={post.id}
                    post={post}
                    expanded={expanded === post.slug}
                    comments={commentsBySlug[post.slug]}
                    loadingComments={loadingComments && expanded === post.slug}
                    orderValue={
                      orderDraft[post.id] ??
                      (post.sortOrder !== null ? String(post.sortOrder) : "")
                    }
                    saving={savingId === post.id}
                    saved={savedId === post.id}
                    onOrderChange={(v) =>
                      setOrderDraft((m) => ({ ...m, [post.id]: v }))
                    }
                    onOrderCommit={(v) => saveOrder(post.id, v)}
                    onToggleComments={() => toggleComments(post.slug)}
                    onDeleteComment={(id) => deleteComment(post.slug, id)}
                  />
                ))}
              </tbody>
            </table>
            {posts.length === 0 && (
              <div className="text-center py-16 text-muted">
                blogPosts 컬렉션이 비어있습니다.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function FragmentRow({
  post,
  expanded,
  comments,
  loadingComments,
  orderValue,
  saving,
  saved,
  onOrderChange,
  onOrderCommit,
  onToggleComments,
  onDeleteComment,
}: {
  post: PostRow;
  expanded: boolean;
  comments?: CommentRow[];
  loadingComments: boolean;
  orderValue: string;
  saving: boolean;
  saved: boolean;
  onOrderChange: (v: string) => void;
  onOrderCommit: (v: string) => void;
  onToggleComments: () => void;
  onDeleteComment: (id: string) => void;
}) {
  return (
    <>
      <tr className="border-t border-gray-100 hover:bg-surface/50 transition-colors">
        <td className="py-4 px-5">
          <div className="font-semibold text-foreground line-clamp-1">
            {post.title}
          </div>
          <div className="text-xs text-muted mt-1">
            [{post.locale}] {post.slug}
            {post.showOnHome && <span className="ml-2 text-primary">· 메인</span>}
            {post.showOnTutoring && (
              <span className="ml-1 text-primary">· 튜터링</span>
            )}
          </div>
        </td>
        <td className="py-4 px-3 text-xs text-muted">{post.category}</td>
        <td className="py-4 px-3">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              post.status === "published"
                ? "bg-green-50 text-green-700"
                : post.status === "draft"
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {post.status}
          </span>
        </td>
        <td className="py-4 px-3 text-right tabular-nums font-mono text-xs">
          {post.viewCount.toLocaleString()}
        </td>
        <td className="py-4 px-3 text-right tabular-nums font-mono text-xs">
          {post.likeCount > 0 ? (
            <span className="text-rose-600 font-semibold">{post.likeCount}</span>
          ) : (
            <span className="text-muted/50">0</span>
          )}
        </td>
        <td className="py-4 px-3 text-right">
          <button
            onClick={onToggleComments}
            className={`tabular-nums font-mono text-xs px-2 py-1 rounded transition-colors ${
              post.commentCount > 0
                ? "text-primary font-semibold hover:bg-primary/10"
                : "text-muted/50 hover:bg-gray-100"
            } ${expanded ? "bg-primary/10" : ""}`}
            title="클릭하여 댓글 관리"
          >
            {post.commentCount}
          </button>
        </td>
        <td className="py-4 px-3 text-center">
          <div className="inline-flex items-center gap-1">
            <input
              type="number"
              value={orderValue}
              onChange={(e) => onOrderChange(e.target.value)}
              onBlur={(e) => onOrderCommit(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              }}
              placeholder="–"
              className="w-14 text-center text-xs border border-gray-200 rounded px-1.5 py-1 bg-white focus:border-primary outline-none tabular-nums"
            />
            {saving && <span className="text-[10px] text-muted">…</span>}
            {saved && <span className="text-[10px] text-green-600">✓</span>}
          </div>
        </td>
        <td className="py-4 px-3 text-xs text-muted">{post.publishedAt}</td>
        <td className="py-4 px-3 text-right">
          <a
            href={`/admin/blog/edit/${post.slug}`}
            className="text-xs font-semibold text-primary hover:underline"
          >
            편집 →
          </a>
        </td>
      </tr>

      {expanded && (
        <tr className="bg-surface/40">
          <td colSpan={9} className="px-5 py-4">
            {loadingComments ? (
              <p className="text-xs text-muted">댓글 불러오는 중…</p>
            ) : !comments || comments.length === 0 ? (
              <p className="text-xs text-muted">댓글이 없습니다.</p>
            ) : (
              <ul className="space-y-3">
                {comments.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-start gap-3 text-sm bg-white rounded-lg border border-gray-100 px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                          {c.authorName}
                        </span>
                        <span className="text-xs text-muted">
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleString("ko-KR")
                            : ""}
                        </span>
                      </div>
                      <p className="mt-1 whitespace-pre-wrap break-words text-foreground/85">
                        {c.text}
                      </p>
                    </div>
                    <button
                      onClick={() => onDeleteComment(c.id)}
                      className="shrink-0 text-xs text-muted hover:text-rose-600 hover:underline"
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
