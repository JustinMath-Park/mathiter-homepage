import type { BlogPost } from "@/types/blog";
import postsJson from "../../content/blog/posts.json";

/**
 * SSOT for all blog posts is `content/blog/posts.json`.
 * - This module re-exports the JSON content as typed BlogPost[] for runtime
 *   read paths in dev (when Firestore env vars are missing).
 * - `scripts/seed-blog.mjs` reads the SAME file to upload to Firestore in prod.
 * - The `tutoring-blog-write` skill writes to ONLY this file when adding a post.
 */
export const MOCK_POSTS: BlogPost[] = postsJson as BlogPost[];

export function getMockPosts(locale: "ko" | "en" = "ko"): BlogPost[] {
  return MOCK_POSTS.filter((p) => p.locale === locale);
}
