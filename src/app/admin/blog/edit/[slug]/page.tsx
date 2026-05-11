"use client";

import { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getClientDb } from "@/lib/firebase-client";
import AdminGate from "@/components/admin/AdminGate";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

// react-md-editor uses window/document — must be client-only
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "katex/dist/katex.min.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function AdminBlogEditPage({ params }: Props) {
  const { slug } = use(params);
  return (
    <AdminGate>
      <BlogEditInner slug={slug} />
    </AdminGate>
  );
}

type Frontmatter = {
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  status: string;
  category: string;
  showOnHome: boolean;
  showOnTutoring: boolean;
};

function BlogEditInner({ slug }: { slug: string }) {
  const [content, setContent] = useState<string>("");
  const [frontmatter, setFrontmatter] = useState<Frontmatter>({
    title: "",
    description: "",
    excerpt: "",
    publishedAt: "",
    status: "published",
    category: "general",
    showOnHome: true,
    showOnTutoring: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [originalDoc, setOriginalDoc] = useState<Record<string, unknown>>({});

  useEffect(() => {
    async function load() {
      try {
        const db = getClientDb();
        if (!db) throw new Error("Firestore not initialized");
        const ref = doc(db, "blogPosts", slug);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          throw new Error(`글을 찾을 수 없습니다: ${slug}`);
        }
        const data = snap.data();
        setOriginalDoc(data);
        setContent(String(data.content ?? ""));
        setFrontmatter({
          title: String(data.title ?? ""),
          description: String(data.description ?? ""),
          excerpt: String(data.excerpt ?? ""),
          publishedAt: String(data.publishedAt ?? ""),
          status: String(data.status ?? "published"),
          category: String(data.category ?? "general"),
          showOnHome: data.showOnHome !== false, // default true
          showOnTutoring: data.showOnTutoring !== false, // default true
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  async function save() {
    setSaving(true);
    setError(null);
    setSaveMsg(null);
    try {
      const db = getClientDb();
      if (!db) throw new Error("Firestore not initialized");
      const ref = doc(db, "blogPosts", slug);
      const today = new Date().toISOString().slice(0, 10);
      await updateDoc(ref, {
        title: frontmatter.title,
        description: frontmatter.description,
        excerpt: frontmatter.excerpt,
        publishedAt: frontmatter.publishedAt,
        status: frontmatter.status,
        category: frontmatter.category,
        showOnHome: frontmatter.showOnHome,
        showOnTutoring: frontmatter.showOnTutoring,
        content,
        updatedAt: today,
        lastEditedAt: serverTimestamp(),
      });
      setSaveMsg(`✅ 저장 완료 — 라이브 5분 내 반영 (ISR revalidate)`);
      // Update locally
      setOriginalDoc({ ...originalDoc, ...frontmatter, content, updatedAt: today });
    } catch (e) {
      setError(`저장 실패: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setSaving(false);
    }
  }

  function setF<K extends keyof Frontmatter>(k: K, v: Frontmatter[K]) {
    setFrontmatter((prev) => ({ ...prev, [k]: v }));
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <a
              href="/admin/blog"
              className="text-muted hover:text-foreground transition-colors"
            >
              ← 목록
            </a>
            <span className="text-muted">/</span>
            <span className="font-mono text-xs text-muted">{slug}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`/ko/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              라이브 미리보기 →
            </a>
            <button
              type="button"
              onClick={save}
              disabled={saving || loading}
              className="gradient-bg text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading && (
          <div className="text-center py-16 text-muted">글 불러오는 중...</div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {saveMsg && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
            {saveMsg}
          </div>
        )}

        {!loading && !error && (
          <div className="grid lg:grid-cols-[300px_1fr] gap-6">
            {/* Frontmatter editor */}
            <aside className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 h-fit lg:sticky lg:top-24">
              <h2 className="text-xs font-bold text-muted tracking-widest">
                메타데이터
              </h2>

              <Field
                label="제목"
                value={frontmatter.title}
                onChange={(v) => setF("title", v)}
              />

              <Field
                label="요약 (카드용, 100자 내외)"
                value={frontmatter.excerpt}
                onChange={(v) => setF("excerpt", v)}
                multiline
              />

              <Field
                label="메타 description (155자 이내, SEO)"
                value={frontmatter.description}
                onChange={(v) => setF("description", v)}
                multiline
              />

              <div>
                <label className="text-xs font-medium text-foreground/70 block mb-1.5">
                  상태
                </label>
                <select
                  value={frontmatter.status}
                  onChange={(e) => setF("status", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="published">published (라이브)</option>
                  <option value="draft">draft (비공개)</option>
                  <option value="archived">archived</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground/70 block mb-1.5">
                  카테고리
                </label>
                <select
                  value={frontmatter.category}
                  onChange={(e) => setF("category", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="sat">SAT</option>
                  <option value="ap">AP</option>
                  <option value="ib">IB</option>
                  <option value="igcse">IGCSE</option>
                  <option value="school-life">school-life</option>
                  <option value="moving">moving (이주 준비)</option>
                  <option value="general">general</option>
                </select>
              </div>

              <Field
                label="발행일 (YYYY-MM-DD)"
                value={frontmatter.publishedAt}
                onChange={(v) => setF("publishedAt", v)}
              />

              {/* Visibility toggles */}
              <div className="pt-3 border-t border-gray-100 space-y-2.5">
                <label className="text-xs font-medium text-foreground/70 block">
                  노출 위치
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={frontmatter.showOnHome}
                    onChange={(e) => setF("showOnHome", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                  />
                  <span className="text-xs leading-snug text-foreground/80 group-hover:text-foreground transition-colors">
                    <span className="font-semibold">메인 페이지에 노출</span>
                    <br />
                    <span className="text-muted">
                      체크된 글 중 발행일 최신 3개가 자동 노출됩니다.
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={frontmatter.showOnTutoring}
                    onChange={(e) =>
                      setF("showOnTutoring", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                  />
                  <span className="text-xs leading-snug text-foreground/80 group-hover:text-foreground transition-colors">
                    <span className="font-semibold">튜터링 페이지에 노출</span>
                    <br />
                    <span className="text-muted">
                      체크된 글 중 발행일 최신 6개가 자동 노출됩니다.
                    </span>
                  </span>
                </label>
              </div>

              <p className="text-[11px] text-muted leading-relaxed pt-3 border-t border-gray-100">
                💡 저장 시 Firestore에만 반영됩니다. git의 .md 파일은 별도로 동기화 필요 — 자세한 내용은 <code className="text-[10px]">content/blog/EDITING.md</code>
              </p>
            </aside>

            {/* Markdown editor */}
            <div className="bg-white rounded-2xl border border-gray-100 p-1 overflow-hidden" data-color-mode="light">
              <MDEditor
                value={content}
                onChange={(v) => setContent(v ?? "")}
                height={720}
                preview="live"
                visibleDragbar={false}
                previewOptions={{
                  // Match the live PostBody rendering pipeline so the
                  // editor's preview shows the exact same output:
                  //   - GFM tables / strikethrough (with singleTilde:false)
                  //   - $...$ inline + $$...$$ block math via KaTeX
                  //   - raw HTML (<strong>...</strong>) for Korean-particle
                  //     bold edge cases
                  remarkPlugins: [[remarkGfm, { singleTilde: false }], remarkMath],
                  rehypePlugins: [rehypeRaw, rehypeKatex],
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-foreground/70 block mb-1.5">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none"
        />
      )}
    </div>
  );
}
