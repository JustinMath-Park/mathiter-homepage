import { getAdminDb, isFirebaseConfigured } from "./firebase-admin";
import { getMockPosts, MOCK_POSTS } from "./blog-mock";
import type {
  BlogLocale,
  BlogPost,
  BlogPostSummary,
  BlogCategory,
} from "@/types/blog";

const COLLECTION = "blogPosts";

/**
 * Public /blog ordering = manual curation first, then newest.
 * Posts with a numeric sortOrder come first (ascending, lower = higher);
 * posts without one fall back to publishedAt (newest first).
 */
function byCuration(a: BlogPost, b: BlogPost): number {
  const ao = typeof a.sortOrder === "number" ? a.sortOrder : Number.POSITIVE_INFINITY;
  const bo = typeof b.sortOrder === "number" ? b.sortOrder : Number.POSITIVE_INFINITY;
  if (ao !== bo) return ao - bo;
  return b.publishedAt.localeCompare(a.publishedAt);
}

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    id: post.id,
    slug: post.slug,
    locale: post.locale,
    title: post.title,
    excerpt: post.excerpt,
    heroImage: post.heroImage,
    category: post.category,
    tags: post.tags,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    author: post.author,
  };
}

function normalizePost(id: string, data: Record<string, unknown>): BlogPost {
  const post = data as Partial<BlogPost>;
  const publishedAt =
    typeof post.publishedAt === "string"
      ? post.publishedAt
      : post.publishedAt && typeof post.publishedAt === "object"
        ? new Date(
            (post.publishedAt as { _seconds?: number; seconds?: number })
              ._seconds ??
              (post.publishedAt as { seconds?: number }).seconds ??
              Date.now()
          ).toISOString()
        : new Date().toISOString();

  const updatedAt =
    typeof post.updatedAt === "string" ? post.updatedAt : publishedAt;

  return {
    id,
    slug: post.slug ?? id,
    locale: (post.locale ?? "ko") as BlogLocale,
    title: post.title ?? "(제목 없음)",
    description: post.description ?? "",
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    heroImage: post.heroImage,
    category: (post.category ?? "general") as BlogCategory,
    tags: Array.isArray(post.tags) ? post.tags : [],
    persona: post.persona ?? null,
    author: post.author ?? { name: "Mathiter" },
    publishedAt,
    updatedAt,
    status: post.status ?? "published",
    relatedPostIds: post.relatedPostIds ?? [],
    showOnTutoring: post.showOnTutoring ?? false,
    showOnHome: post.showOnHome ?? false,
    sortOrder: typeof post.sortOrder === "number" ? post.sortOrder : undefined,
    readingTime: post.readingTime,
    viewCount: post.viewCount,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    ogImage: post.ogImage,
    canonicalSlug: post.canonicalSlug ?? post.slug,
  };
}

/**
 * Fetch + filter + sort all happens in JS to avoid needing a Firestore composite
 * index. Fine for our scale (≪ 1k posts). If it grows past that, define
 * firestore.indexes.json and deploy + use server-side queries again.
 */
async function fetchAllPosts(): Promise<BlogPost[]> {
  const db = getAdminDb();
  if (!db) return [];
  const snap = await db.collection(COLLECTION).get();
  return snap.docs.map((doc) => normalizePost(doc.id, doc.data()));
}

export async function getAllPublishedPosts(
  locale: BlogLocale
): Promise<BlogPostSummary[]> {
  const db = getAdminDb();
  if (!db) {
    return getMockPosts(locale)
      .filter((p) => p.status === "published")
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .map(toSummary);
  }

  try {
    const all = await fetchAllPosts();
    return all
      .filter((p) => p.locale === locale && p.status === "published")
      .sort(byCuration)
      .map(toSummary);
  } catch (err) {
    console.error("[blog] getAllPublishedPosts failed, using mock:", err);
    return getMockPosts(locale)
      .filter((p) => p.status === "published")
      .map(toSummary);
  }
}

export async function getPostBySlug(
  locale: BlogLocale,
  slug: string
): Promise<BlogPost | null> {
  const db = getAdminDb();
  if (!db) {
    return (
      getMockPosts(locale).find(
        (p) => p.slug === slug && p.status === "published"
      ) ?? null
    );
  }

  try {
    // doc id == slug by convention (see add-post.mjs validation)
    const docRef = db.collection(COLLECTION).doc(slug);
    const doc = await docRef.get();
    if (!doc.exists) return null;
    const post = normalizePost(doc.id, doc.data() ?? {});
    if (post.locale !== locale || post.status !== "published") return null;
    return post;
  } catch (err) {
    console.error("[blog] getPostBySlug failed, using mock:", err);
    return (
      getMockPosts(locale).find(
        (p) => p.slug === slug && p.status === "published"
      ) ?? null
    );
  }
}

export async function getRelatedPosts(
  locale: BlogLocale,
  excludeId: string,
  limit = 3
): Promise<BlogPostSummary[]> {
  const all = await getAllPublishedPosts(locale);
  return all.filter((p) => p.id !== excludeId).slice(0, limit);
}

export async function getFeaturedForHome(
  locale: BlogLocale,
  limit = 3
): Promise<BlogPostSummary[]> {
  const db = getAdminDb();
  if (!db) {
    return getMockPosts(locale)
      .filter((p) => p.showOnHome && p.status === "published")
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, limit)
      .map(toSummary);
  }

  try {
    const all = await fetchAllPosts();
    return all
      .filter(
        (p) =>
          p.locale === locale && p.status === "published" && p.showOnHome
      )
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, limit)
      .map(toSummary);
  } catch (err) {
    console.error("[blog] getFeaturedForHome failed, using mock:", err);
    return getMockPosts(locale)
      .filter((p) => p.showOnHome)
      .map(toSummary)
      .slice(0, limit);
  }
}

export async function getFeaturedForTutoring(
  locale: BlogLocale,
  limit = 6
): Promise<BlogPostSummary[]> {
  const db = getAdminDb();
  if (!db) {
    return getMockPosts(locale)
      .filter((p) => p.showOnTutoring && p.status === "published")
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, limit)
      .map(toSummary);
  }

  try {
    const all = await fetchAllPosts();
    return all
      .filter(
        (p) =>
          p.locale === locale && p.status === "published" && p.showOnTutoring
      )
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, limit)
      .map(toSummary);
  } catch (err) {
    console.error("[blog] getFeaturedForTutoring failed, using mock:", err);
    return getMockPosts(locale)
      .filter((p) => p.showOnTutoring)
      .map(toSummary)
      .slice(0, limit);
  }
}

export async function getAllSlugs(): Promise<
  { locale: BlogLocale; slug: string }[]
> {
  const db = getAdminDb();
  if (!db) {
    return MOCK_POSTS.filter((p) => p.status === "published").map((p) => ({
      locale: p.locale,
      slug: p.slug,
    }));
  }

  try {
    const all = await fetchAllPosts();
    return all
      .filter((p) => p.status === "published")
      .map((p) => ({ locale: p.locale, slug: p.slug }));
  } catch (err) {
    console.error("[blog] getAllSlugs failed, using mock:", err);
    return MOCK_POSTS.map((p) => ({ locale: p.locale, slug: p.slug }));
  }
}

export { isFirebaseConfigured };
