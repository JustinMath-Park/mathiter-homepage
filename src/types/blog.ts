export type BlogLocale = "ko" | "en";

export type BlogCategory =
  | "sat"
  | "ap"
  | "ib"
  | "igcse"
  | "school-life"
  | "moving"
  | "general";

export type BlogStatus = "draft" | "published" | "archived";

export type BlogPersona = 1 | 2 | 3 | null;

export interface BlogAuthor {
  name: string;
  bio?: string;
  photo?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  locale: BlogLocale;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  heroImage?: string;
  category: BlogCategory;
  tags: string[];
  persona: BlogPersona;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt: string;
  status: BlogStatus;
  relatedPostIds?: string[];
  showOnTutoring?: boolean;
  showOnHome?: boolean;
  readingTime?: number;
  viewCount?: number;
  ogImage?: string;
  canonicalSlug?: string;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  locale: BlogLocale;
  title: string;
  excerpt: string;
  heroImage?: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  readingTime?: number;
  author: BlogAuthor;
}

export type TutoringTrack = "us" | "uk" | "both";
export type TutoringResidence = "kr" | "overseas";
export type TutoringPackage = "basic" | "advanced" | "pro" | "master";

export interface TutoringInquiry {
  // Step 3 — 연락처 (학부모가 부를 때 사용)
  studentName: string;
  contactMethod: "kakao" | "phone" | "email";
  contactDetail: string;
  message?: string;

  // Step 1 — Pre-qualifier
  gradeLevel: string;            // e.g., "G10", "G8 (중2)"
  track: TutoringTrack;          // US / UK / Both
  residence: TutoringResidence;  // KR / Overseas

  // Step 2 — 추천된 패키지 (사용자가 본 추천)
  recommendedPackage: TutoringPackage;

  // 메타
  source?: string;
  locale: BlogLocale;

  // Legacy (기존 폼 호환용 — 곧 deprecate)
  parentName?: string;
  studentGrade?: string;
  school?: string;
  examGoal?: string;
}
