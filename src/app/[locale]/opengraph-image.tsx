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

  const allText = c.title + c.subtitle + c.stats.map((s) => s.value + s.label).join("");
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
          background: "linear-gradient(135deg, #312e81 0%, #1e40af 50%, #0891b2 100%)",
          padding: "60px 70px",
          fontFamily: "NotoSansKR",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "30%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            display: "flex",
          }}
        />

        {/* Top: Logo + Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src={logoBase64}
              width={48}
              height={48}
              style={{ borderRadius: "12px" }}
            />
            <span style={{ fontSize: "32px", fontWeight: 700, color: "white" }}>
              Mathiter
            </span>
          </div>
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "24px",
              padding: "8px 20px",
              fontSize: "16px",
              color: "rgba(255,255,255,0.9)",
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
            gap: "16px",
            marginTop: "-10px",
          }}
        >
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.25,
              whiteSpace: "pre-wrap",
            }}
          >
            {c.title}
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              marginTop: "4px",
            }}
          >
            {c.subtitle}
          </div>
        </div>

        {/* Bottom: Stats */}
        <div
          style={{
            display: "flex",
            gap: "24px",
          }}
        >
          {c.stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "14px 24px",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#67e8f9",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.8)",
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
              fontSize: "18px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            mathiter.com
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
