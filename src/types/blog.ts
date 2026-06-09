export type BlogLocale = "ko" | "en";

export type BlogCategory =
  | "sat"
  | "ap"
  | "ib"
  | "igcse"
  | "alevel"
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

export type TutoringTrack = "us" | "uk" | "ib" | "both";
export type TutoringResidence = "kr" | "overseas";

// Legacy 4-tier (Firestore/email 기존 데이터 호환용)
export type TutoringPackage = "basic" | "advanced" | "pro" | "master";

// 새 3-tier (2026-05-25 정책 v2)
export type TutoringTrack3 = "regular" | "advanced" | "elite";

// Step 2 — 학년별 학습 목표
export type TutoringGoal =
  // 초등 (G1-5)
  | "elem-school-pace"
  | "elem-foundation"
  | "elem-accelerated"
  // 중등 (G6-8)
  | "mid-school-pace"
  | "mid-pre-sat"
  | "mid-igcse-intro"
  | "mid-accelerated"
  // 고등 US (G9-12)
  | "high-us-sat"
  | "high-us-ap-ab"
  | "high-us-ap-bc"
  // 고등 UK (Y10-13)
  | "high-uk-igcse-diagnostic"
  | "high-uk-igcse-add-math"
  | "high-uk-a-level-bridge"
  | "high-uk-a-level-full"
  // 고등 IB (DP, Y12-13)
  | "high-ib-aa-sl"
  | "high-ib-aa-hl"
  | "high-ib-ai-sl"
  | "high-ib-ai-hl";

export interface TutoringInquiry {
  // Step 4 — 연락처 (학부모가 부를 때 사용)
  studentName: string;
  contactMethod: "kakao" | "phone" | "email";
  contactDetail: string;
  message?: string;

  // Step 1 — Pre-qualifier
  gradeLevel: string;            // e.g., "G10", "G8 (중2)"
  track: TutoringTrack;          // US / UK / Both
  residence: TutoringResidence;  // KR / Overseas

  // Step 2 — 학습 목표 (다중 선택 가능)
  goals: TutoringGoal[];
  goal?: TutoringGoal; // legacy single value (deprecated — goals[0] 또는 첫 선택 유지용)

  // Step 3 — 추천 코스 (가격 X — 박세준 원장님이 상담에서 직접 안내)
  recommendedTrack: TutoringTrack3;

  // Legacy — Firestore 기존 schema 호환 (deprecated, 미래 마이그레이션 예정)
  recommendedPackage?: TutoringPackage;

  // 메타
  source?: string;
  locale: BlogLocale;

  // Legacy (기존 폼 호환용 — 곧 deprecate)
  parentName?: string;
  studentGrade?: string;
  school?: string;
  examGoal?: string;
}
