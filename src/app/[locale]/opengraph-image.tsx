import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const ogContent: Record<
  string,
  {
    title: string;
    subtitle: string;
    stats: { value: string; label: string }[];
  }
> = {
  en: {
    title: "Find your child's math\nweak spots in 10 minutes",
    subtitle: "AI Math Coach for International School Exams",
    stats: [
      { value: "6+", label: "Exams" },
      { value: "24/7", label: "AI Tutor" },
      { value: "1,000+", label: "Problems" },
    ],
  },
  ko: {
    title: "우리 아이 수학, 10분 진단으로\n취약점을 찾아드립니다",
    subtitle: "국제학교 수학 시험 대비 AI 학습 코치",
    stats: [
      { value: "6+", label: "지원 시험" },
      { value: "24/7", label: "AI 튜터" },
      { value: "1,000+", label: "맞춤 문제" },
    ],
  },
  ms: {
    title: "Kenal pasti kelemahan matematik\nanak anda dalam 10 minit",
    subtitle: "Jurulatih Matematik AI untuk Sekolah Antarabangsa",
    stats: [
      { value: "6+", label: "Peperiksaan" },
      { value: "24/7", label: "Tutor AI" },
      { value: "1,000+", label: "Soalan" },
    ],
  },
};

async function loadFont(
  family: string,
  weight: number,
  text?: string
): Promise<ArrayBuffer> {
  const params = new URLSearchParams({
    family: `${family}:wght@${weight}`,
    ...(text ? { text } : {}),
  });

  const css = await fetch(`https://fonts.googleapis.com/css2?${params}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((r) => r.text());

  const match = css.match(/src: url\((.+?)\) format\(/);
  if (!match) throw new Error(`Font not found: ${family}`);

  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = ogContent[locale] || ogContent.en;

  const allText =
    c.title + c.subtitle + c.stats.map((s) => s.value + s.label).join("");
  const fontData = await loadFont("Noto Sans KR", 700, allText);
  const fontDataRegular = await loadFont("Noto Sans KR", 400, allText);

  const logoBuffer = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          fontFamily: "NotoSansKR",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "8px",
            height: "100%",
            background: "linear-gradient(180deg, #1e3a5f 0%, #2563eb 50%, #06b6d4 100%)",
            display: "flex",
          }}
        />

        {/* Bottom accent stripe */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #1e3a5f 0%, #2563eb 50%, #06b6d4 100%)",
            display: "flex",
          }}
        />

        {/* Decorative dot pattern - top right */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            width: "120px",
            height: "120px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            opacity: 0.08,
          }}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#1e3a5f",
                display: "flex",
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "56px 70px 48px 70px",
            flex: 1,
          }}
        >
          {/* Top: Logo + Brand + Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <img
                src={logoBase64}
                width={52}
                height={52}
                style={{ borderRadius: "14px" }}
              />
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#1e3a5f",
                }}
              >
                Mathiter
              </span>
            </div>
            <div
              style={{
                display: "flex",
                background: "#f0f4ff",
                borderRadius: "24px",
                padding: "8px 22px",
                fontSize: "15px",
                fontWeight: 400,
                color: "#3b5998",
                border: "1px solid #dce4f5",
              }}
            >
              SAT · IGCSE · IB · A-Level · CSAT
            </div>
          </div>

          {/* Middle: Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              gap: "14px",
              marginTop: "-6px",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.25,
                whiteSpace: "pre-wrap",
              }}
            >
              {c.title}
            </div>
            <div
              style={{
                fontSize: "21px",
                fontWeight: 400,
                color: "#6b7280",
                marginTop: "2px",
              }}
            >
              {c.subtitle}
            </div>
          </div>

          {/* Bottom: Stats bar */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {c.stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#f8fafc",
                  borderRadius: "14px",
                  padding: "12px 22px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <span
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    color: "#2563eb",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#6b7280",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}

            {/* Domain */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
                fontSize: "17px",
                fontWeight: 400,
                color: "#9ca3af",
              }}
            >
              mathiter.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "NotoSansKR",
          data: fontData,
          weight: 700,
          style: "normal",
        },
        {
          name: "NotoSansKR",
          data: fontDataRegular,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
