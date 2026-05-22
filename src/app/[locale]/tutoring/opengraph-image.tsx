import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { routing } from "@/i18n/routing";

export const alt = "Mathiter Tutoring";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Content = {
  kicker: string;
  title: string;
  subtitle: string;
  tutor: string;
  role: string;
  badges: { value: string; label: string }[];
  footer: string;
};

const content: Record<string, Content> = {
  ko: {
    kicker: "SAT 수학 과외 · 국제학교 수학 1:1",
    title: "국제학교 수학\n1:1 과외",
    subtitle: "SAT·AP·IB·IGCSE\n박세준 원장이 직접 지도",
    tutor: "박세준",
    role: "Mathiter 원장",
    badges: [
      { value: "8년+", label: "국제학교 수학 지도" },
      { value: "SAT 800", label: "만점 지도 경험" },
      { value: "AP BC 5", label: "고득점 지도 경험" },
    ],
    footer: "mathiter.com/ko/tutoring",
  },
  en: {
    kicker: "SAT Math · International School 1:1 Tutoring",
    title: "International School\nMath Tutoring",
    subtitle: "SAT·AP·IB·IGCSE\nTaught by Justin Park",
    tutor: "Justin Park",
    role: "Founder, Mathiter",
    badges: [
      { value: "8+ yrs", label: "international math" },
      { value: "SAT 800", label: "score coaching" },
      { value: "AP BC 5", label: "score coaching" },
    ],
    footer: "mathiter.com/tutoring",
  },
};

async function loadFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer | undefined> {
  try {
    const params = new URLSearchParams({
      family: `${family}:wght@${weight}`,
      text,
    });
    const css = await fetch(`https://fonts.googleapis.com/css2?${params}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
      next: { revalidate: 86400 },
    }).then((r) => r.text());

    const match = css.match(/src: url\((.+?)\) format\(/);
    if (!match) return undefined;

    return fetch(match[1], { next: { revalidate: 86400 } }).then((r) =>
      r.arrayBuffer()
    );
  } catch {
    return undefined;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale] ?? content.en;
  const allText = [
    c.kicker,
    c.title,
    c.subtitle,
    c.tutor,
    c.role,
    c.footer,
    ...c.badges.flatMap((badge) => [badge.value, badge.label]),
    "Mathiter Tutoring",
  ].join("");

  const [fontBold, fontRegular, logoBuffer, tutorBuffer] = await Promise.all([
    loadFont("Noto Sans KR", 700, allText),
    loadFont("Noto Sans KR", 400, allText),
    readFile(join(process.cwd(), "public", "logo-mark.png")),
    readFile(join(process.cwd(), "public", "justin-park.jpg")),
  ]);

  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  const tutorSrc = `data:image/jpeg;base64,${tutorBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#f8fafc",
          fontFamily: "NotoSansKR",
          color: "#0b2a57",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(11,42,87,0.06) 0%, rgba(255,255,255,0) 48%, rgba(249,115,22,0.08) 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 12,
            background:
              "linear-gradient(180deg, #0b2a57 0%, #1d5396 58%, #f97316 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 56,
            top: 42,
            width: 118,
            height: 118,
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            opacity: 0.12,
          }}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#0b2a57",
                display: "flex",
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "relative",
            flex: 1,
            height: "100%",
            display: "flex",
            padding: "56px 58px 48px 70px",
            gap: 44,
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <img
                src={logoSrc}
                alt="Mathiter"
                width={46}
                height={46}
                style={{ borderRadius: 10 }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#0b2a57",
                    display: "flex",
                  }}
                >
                  Mathiter Tutoring
                </div>
                <div
                  style={{
                    marginTop: 7,
                    fontSize: 15,
                    fontWeight: 400,
                    color: "#64748b",
                    display: "flex",
                  }}
                >
                  Math + Iter, the math path
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 46,
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                background: "#eff5fc",
                border: "1px solid #dbeafe",
                borderRadius: 999,
                padding: "9px 18px",
                color: "#1d5396",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {c.kicker}
            </div>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                whiteSpace: "pre-line",
                fontSize: locale === "en" ? 62 : 76,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                color: "#0b2a57",
              }}
            >
              {c.title}
            </div>

            <div
              style={{
                marginTop: 22,
                display: "flex",
                whiteSpace: "pre-line",
                fontSize: 32,
                lineHeight: 1.28,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              {c.subtitle}
            </div>

            <div
              style={{
                marginTop: "auto",
                display: "flex",
                gap: 12,
              }}
            >
              {c.badges.map((badge) => (
                <div
                  key={badge.value}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minWidth: 142,
                    padding: "14px 17px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: 27,
                      lineHeight: 1,
                      fontWeight: 700,
                      color: "#1d5396",
                    }}
                  >
                    {badge.value}
                  </div>
                  <div
                    style={{
                      marginTop: 7,
                      display: "flex",
                      fontSize: 13,
                      lineHeight: 1.25,
                      fontWeight: 400,
                      color: "#64748b",
                    }}
                  >
                    {badge.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              width: 360,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "24px 0 26px 38px",
                background:
                  "linear-gradient(180deg, #0b2a57 0%, #153f7a 62%, #1d5396 100%)",
                borderRadius: 30,
                boxShadow: "0 28px 58px rgba(11,42,87,0.25)",
                display: "flex",
              }}
            />
            <div
              style={{
                position: "relative",
                width: 292,
                height: 410,
                borderRadius: 26,
                overflow: "hidden",
                border: "8px solid #ffffff",
                background: "#ffffff",
                boxShadow: "0 24px 50px rgba(15,23,42,0.20)",
                display: "flex",
              }}
            >
              <img
                src={tutorSrc}
                alt={c.tutor}
                width={292}
                height={410}
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 52,
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 18,
                padding: "18px 20px",
                minWidth: 245,
                boxShadow: "0 18px 44px rgba(15,23,42,0.18)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: "#f97316",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                }}
              >
                FOUNDER
              </div>
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  color: "#0b2a57",
                  fontSize: 30,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {c.tutor}
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  color: "#64748b",
                  fontSize: 16,
                  fontWeight: 400,
                }}
              >
                {c.role}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                right: 10,
                top: 74,
                background: "#fff7ed",
                color: "#c2410c",
                border: "1px solid #fed7aa",
                borderRadius: 999,
                padding: "10px 17px",
                fontSize: 16,
                fontWeight: 700,
                display: "flex",
              }}
            >
              1:1 LIVE
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 58,
            bottom: 36,
            display: "flex",
            color: "#94a3b8",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          {c.footer}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(fontRegular
          ? [
              {
                name: "NotoSansKR",
                data: fontRegular,
                weight: 400 as const,
                style: "normal" as const,
              },
            ]
          : []),
        ...(fontBold
          ? [
              {
                name: "NotoSansKR",
                data: fontBold,
                weight: 700 as const,
                style: "normal" as const,
              },
            ]
          : []),
      ],
    }
  );
}
