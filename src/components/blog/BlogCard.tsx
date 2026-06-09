import type { BlogPostSummary } from "@/types/blog";

interface Props {
  post: BlogPostSummary;
  variant?: "default" | "compact";
}

const CATEGORY_LABEL: Record<string, { ko: string; en: string }> = {
  sat: { ko: "SAT", en: "SAT" },
  ap: { ko: "AP", en: "AP" },
  ib: { ko: "IB", en: "IB" },
  igcse: { ko: "IGCSE", en: "IGCSE" },
  alevel: { ko: "A-Level", en: "A-Level" },
  "school-life": { ko: "학교생활", en: "School Life" },
  moving: { ko: "이주 준비", en: "Moving Abroad" },
  general: { ko: "일반", en: "General" },
};

export default function BlogCard({ post, variant = "default" }: Props) {
  const localePrefix = post.locale === "en" ? "" : `/${post.locale}`;
  const href = `${localePrefix}/blog/${post.slug}`;
  const categoryLabel =
    CATEGORY_LABEL[post.category]?.[post.locale] ?? post.category;

  if (variant === "compact") {
    return (
      <a
        href={href}
        className="group flex gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-surface/50 transition-colors px-2 -mx-2 rounded-lg"
      >
        {post.heroImage && (
          <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-surface overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.heroImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-primary font-medium mb-1">
            {categoryLabel}
          </div>
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs text-muted mt-1">
            {formatDate(post.publishedAt, post.locale)}
          </p>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
    >
      {post.heroImage ? (
        <div className="aspect-[16/9] bg-surface overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.heroImage}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] gradient-bg flex items-center justify-center">
          <span className="text-white/90 text-2xl font-bold">Mathiter</span>
        </div>
      )}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-2 text-xs mb-3">
          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {categoryLabel}
          </span>
          <span className="text-muted">
            {formatDate(post.publishedAt, post.locale)}
          </span>
        </div>
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        {post.author?.name && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-muted">
            <span>{post.author.name}</span>
          </div>
        )}
      </div>
    </a>
  );
}

function formatDate(iso: string, locale: "ko" | "en") {
  try {
    const d = new Date(iso);
    if (locale === "ko") {
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
    }
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
