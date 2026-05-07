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

export interface TutoringInquiry {
  parentName: string;
  studentGrade: string;
  school?: string;
  examGoal?: string;
  contactMethod: "kakao" | "phone" | "email";
  contactDetail: string;
  message?: string;
  source?: string;
  locale: BlogLocale;
}
