import type { BlogLocale, BlogPostSummary } from "@/types/blog";
import BlogCard from "./BlogCard";

interface Props {
  posts: BlogPostSummary[];
  locale: BlogLocale;
}

export default function RelatedPosts({ posts, locale }: Props) {
  if (posts.length === 0) return null;

  const heading = locale === "ko" ? "관련 글" : "Related Posts";

  return (
    <section className="mt-16 pt-12 border-t border-gray-100">
      <h2 className="text-2xl font-bold mb-6">{heading}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
