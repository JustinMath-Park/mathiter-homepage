import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "@/types/blog";

/**
 * SSOT for all blog posts is `content/blog/posts/<slug>.md` files
 * (frontmatter YAML + markdown body).
 *
 * - This module re-exports them as typed BlogPost[] for runtime read paths
 *   in dev (when Firestore env vars are missing).
 * - `scripts/seed-blog.mjs` reads the SAME files to upload to Firestore in prod.
 * - The `tutoring-blog-write` skill writes new .md files into this directory.
 *
 * To edit a post: open `content/blog/posts/<slug>.md` in any editor,
 * change the markdown body, save. Then run `npm run seed:blog` to push to
 * Firestore (production).
 */

const POSTS_DIR = path.resolve(process.cwd(), "content/blog/posts");

function loadAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { ...(data as Record<string, unknown>), content } as BlogPost;
    })
    .sort((a, b) =>
      String(b.publishedAt || "").localeCompare(String(a.publishedAt || ""))
    );
}

export const MOCK_POSTS: BlogPost[] = loadAllPosts();

export function getMockPosts(locale: "ko" | "en" = "ko"): BlogPost[] {
  return MOCK_POSTS.filter((p) => p.locale === locale);
}
