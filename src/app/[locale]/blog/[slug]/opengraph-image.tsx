import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import type { BlogLocale } from "@/types/blog";

export const alt = "Mathiter Tutoring";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

const GRADIENT: Record<string, [string, string]> = {
  sat: ["#0f172a", "#4338ca"],
  ap: ["#0f172a", "#7c3aed"],
  ib: ["#0f172a", "#0d9488"],
  igcse: ["#0f172a", "#0891b2"],
  "school-life": ["#0f172a", "#d97706"],
  moving: ["#0f172a", "#be185d"],
  general: ["#0f172a", "#3730a3"],
};

const CATEGORY_LABEL: Record<string, { ko: string; en: string }> = {
  sat: { ko: "SAT", en: "SAT" },
  ap: { ko: "AP", en: "AP" },
  ib: { ko: "IB", en: "IB" },
  igcse: { ko: "IGCSE", en: "IGCSE" },
  "school-life": { ko: "학교생활", en: "School Life" },
  moving: { ko: "이주 준비", en: "Moving Abroad" },
  general: { ko: "일반", en: "General" },
};

export default async function OG({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  // Default fallback if post not found
  let title = "Mathiter Tutoring";
  let cat = "general";
  let label = "Mathiter";
  let footer = "mathiter.com/blog";

  const isSupported = locale === "ko" || locale === "en";
  if (isSupported) {
    const post = await getPostBySlug(locale as BlogLocale, slug);
    if (post) {
      title = post.title.length > 38 ? post.title.slice(0, 36) + "…" : post.title;
      cat = post.category;
      label =
        CATEGORY_LABEL[post.category]?.[locale as "ko" | "en"] ?? post.category;
      footer =
        locale === "ko"
          ? "Mathiter Tutoring · 박세준"
          : "Mathiter Tutoring · Sejun Park";
    }
  }

  const [c1, c2] = GRADIENT[cat] || GRADIENT.general;

  // Korean font fetch — satori needs OTF/TTF (not woff2)
  let pretendardBold: ArrayBuffer | undefined;
  try {
    const res = await fetch(
      "https://github.com/orioncactus/pretendard/raw/v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf",
      { next: { revalidate: 86400 } }
    );
    if (res.ok) pretendardBold = await res.arrayBuffer();
  } catch {
    // fall back to no custom font (latin only)
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
          display: "flex",
          flexDirection: "column",
          padding: "70px 80px",
          color: "#ffffff",
          fontFamily: pretendardBold ? "Pretendard" : "sans-serif",
          position: "relative",
        }}
      >
        {/* decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -50,
            width: 320,
            height: 320,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -80,
            width: 380,
            height: 380,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {/* category */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            opacity: 0.7,
            letterSpacing: 6,
            fontWeight: 700,
          }}
        >
          {(label || "").toUpperCase()}
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            paddingRight: 60,
          }}
        >
          <div
            style={{
              fontSize: title.length > 28 ? 64 : 76,
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: -0.02,
            }}
          >
            {title}
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 22, opacity: 0.9 }}>{footer}</div>
          <div style={{ fontSize: 18, opacity: 0.55 }}>mathiter.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: pretendardBold
        ? [
            {
              name: "Pretendard",
              data: pretendardBold,
              weight: 700,
              style: "normal",
            },
          ]
        : undefined,
    }
  );
}
