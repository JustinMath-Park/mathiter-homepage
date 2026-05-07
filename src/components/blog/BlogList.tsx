import type { BlogPostSummary } from "@/types/blog";
import BlogCard from "./BlogCard";

interface Props {
  posts: BlogPostSummary[];
  emptyMessage?: string;
  columns?: 2 | 3;
}

export default function BlogList({
  posts,
  emptyMessage = "아직 발행된 글이 없습니다.",
  columns = 3,
}: Props) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-muted">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const gridClass =
    columns === 2
      ? "grid gap-6 sm:grid-cols-2"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={gridClass}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
