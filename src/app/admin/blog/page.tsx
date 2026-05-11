"use client";

/**
 * Admin blog list — fetch all posts from Firestore client-side.
 *
 * Firestore Security Rules required (paste this into Firebase Console
 * mathiter-prod → Firestore Database → Rules):
 *
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /blogPosts/{id} {
 *       allow read: if true;  // public reads OK (already used by ISR/SSG)
 *       allow write: if request.auth != null
 *         && request.auth.token.email in [
 *           'sspark222@gmail.com'
 *         ];
 *     }
 *     match /tutoringInquiries/{id} {
 *       allow read: if request.auth != null
 *         && request.auth.token.email in ['sspark222@gmail.com'];
 *       allow write: if true;  // anyone can submit inquiry
 *     }
 *   }
 * }
 */

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getClientDb, getClientAuth, signOut } from "@/lib/firebase-client";
import AdminGate from "@/components/admin/AdminGate";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";

type PostSummary = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  status: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  showOnHome: boolean;
  showOnTutoring: boolean;
};

export default function AdminBlogList() {
  return (
    <AdminGate>
      <BlogListInner />
    </AdminGate>
  );
}

function BlogListInner() {
  const { user } = useAdminAuth();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const db = getClientDb();
        if (!db) throw new Error("Firestore not initialized");
        const snap = await getDocs(collection(db, "blogPosts"));
        const list: PostSummary[] = snap.docs.map((doc) => {
          const d = doc.data() as Record<string, unknown>;
          return {
            id: doc.id,
            slug: String(d.slug ?? doc.id),
            locale: String(d.locale ?? "ko"),
            title: String(d.title ?? "(제목 없음)"),
            status: String(d.status ?? "draft"),
            publishedAt: String(d.publishedAt ?? ""),
            updatedAt: d.updatedAt ? String(d.updatedAt) : undefined,
            category: String(d.category ?? "general"),
            showOnHome: d.showOnHome !== false,
            showOnTutoring: d.showOnTutoring !== false,
          };
        });
        list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
        setPosts(list);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSignOut() {
    const auth = getClientAuth();
    if (auth) await signOut(auth);
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-primary tracking-widest">
              MATHITER ADMIN
            </span>
            <span className="text-muted text-sm">·</span>
            <h1 className="font-bold">블로그 글 목록</h1>
          </div>
          <div className="flex items-center gap-4">
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

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted">
            총 {posts.length}편 — 메인 노출{" "}
            <span className="font-semibold text-foreground">
              {
                posts.filter(
                  (p) => p.showOnHome && p.status === "published"
                ).length
              }
            </span>
            편 · 튜터링 노출{" "}
            <span className="font-semibold text-foreground">
              {
                posts.filter(
                  (p) => p.showOnTutoring && p.status === "published"
                ).length
              }
            </span>
            편
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

        {loading && (
          <div className="text-center py-16 text-muted">불러오는 중...</div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            <strong>Firestore 읽기 실패:</strong> {error}
            <p className="mt-2 text-xs">
              Firebase 환경변수 또는 Firestore Security Rules를 확인하세요.
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs text-muted">
                <tr>
                  <th className="text-left py-3 px-5 font-medium">제목</th>
                  <th className="text-left py-3 px-3 font-medium w-24">분류</th>
                  <th className="text-left py-3 px-3 font-medium w-20">상태</th>
                  <th className="text-left py-3 px-3 font-medium w-24">노출</th>
                  <th className="text-left py-3 px-3 font-medium w-28">발행일</th>
                  <th className="w-20"></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-t border-gray-100 hover:bg-surface/50 transition-colors"
                  >
                    <td className="py-4 px-5">
                      <div className="font-semibold text-foreground line-clamp-1">
                        {post.title}
                      </div>
                      <div className="text-xs text-muted mt-1">
                        [{post.locale}] {post.slug}
                      </div>
                    </td>
                    <td className="py-4 px-3 text-xs text-muted">
                      {post.category}
                    </td>
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
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span
                          title={
                            post.showOnHome
                              ? "메인 페이지에 노출됨"
                              : "메인 페이지 노출 안 됨"
                          }
                          className={
                            post.showOnHome
                              ? "px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium"
                              : "px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 line-through"
                          }
                        >
                          메인
                        </span>
                        <span
                          title={
                            post.showOnTutoring
                              ? "튜터링 페이지에 노출됨"
                              : "튜터링 페이지 노출 안 됨"
                          }
                          className={
                            post.showOnTutoring
                              ? "px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium"
                              : "px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 line-through"
                          }
                        >
                          튜터링
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-xs text-muted">
                      {post.publishedAt}
                    </td>
                    <td className="py-4 px-3 text-right">
                      <a
                        href={`/admin/blog/edit/${post.slug}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        편집 →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {posts.length === 0 && (
              <div className="text-center py-16 text-muted">
                Firestore blogPosts 컬렉션이 비어있습니다.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
