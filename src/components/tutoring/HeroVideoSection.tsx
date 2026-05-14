"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * HeroVideoSection — sits between WorryHook and Process.
 *
 * Visual language: minimal flow / dark tone, matching the on-screen video itself
 * (Premium dark · Mathiter signal cyan accents · serif italic accent word).
 * The video itself is self-hosted from /public/videos/.
 */
export default function HeroVideoSection() {
  const t = useTranslations("tutoring.heroVideo");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-play (muted) when section enters the viewport
  useEffect(() => {
    const node = containerRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* iOS may block; user can press play */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleUnmute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 0.85;
    setIsMuted(false);
    setHasInteracted(true);
    if (v.paused) v.play().catch(() => undefined);
  };

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
    setHasInteracted(true);
  };

  return (
    <section
      id="hero-video"
      style={{
        position: "relative",
        padding: "112px 0",
        background:
          "radial-gradient(ellipse at 50% 0%, #0f1a2e 0%, #060914 65%, #03050d 100%)",
        overflow: "hidden",
      }}
    >
      {/* Soft ambient glows */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -200,
          left: "20%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(34,211,238,0.08)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -200,
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(79,70,229,0.10)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* Eyebrow + headline */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 16px",
              borderRadius: 9999,
              background: "rgba(34,211,238,0.10)",
              border: "1px solid rgba(34,211,238,0.30)",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#22d3ee",
                boxShadow: "0 0 10px rgba(34,211,238,0.7)",
              }}
            />
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: "#7dd3fc",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {t("eyebrow")}
            </span>
          </div>

          <h2
            className="hv-title"
            style={{
              margin: 0,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            {t.rich("title", {
              em: (chunks) => (
                <span
                  style={{
                    fontFamily:
                      "'Newsreader', Georgia, ui-serif, serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    background:
                      "linear-gradient(135deg,#22d3ee 0%, #7dd3fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {chunks}
                </span>
              ),
              br: () => <br />,
            })}
          </h2>

          <p
            style={{
              marginTop: 18,
              fontSize: 17,
              lineHeight: 1.6,
              color: "rgba(226,232,240,0.78)",
              maxWidth: 620,
              marginInline: "auto",
            }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Video card */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            maxWidth: 1080,
            margin: "0 auto",
            borderRadius: 24,
            overflow: "hidden",
            background: "#000",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 40px 100px rgba(34,211,238,0.10), 0 24px 60px rgba(0,0,0,0.55)",
          }}
        >
          {/* Subtle inner glow ring */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 24,
              border: "1px solid rgba(34,211,238,0.15)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          <video
            ref={videoRef}
            playsInline
            muted
            loop={false}
            preload="metadata"
            poster="/videos/tutoring_hero_poster.jpg"
            controls={false}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              aspectRatio: "16 / 9",
              background: "#000",
              cursor: "pointer",
            }}
            onClick={handlePlayPause}
          >
            <source
              src="/videos/tutoring_hero_1080p.mp4"
              type="video/mp4"
              media="(min-width: 768px)"
            />
            <source src="/videos/tutoring_hero_720p.mp4" type="video/mp4" />
            {t("fallbackText")}
          </video>

          {/* Center play overlay (only when paused / not yet interacted) */}
          {!isPlaying && (
            <button
              type="button"
              onClick={handlePlayPause}
              aria-label={t("playLabel")}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 100%)",
                border: "none",
                cursor: "pointer",
                zIndex: 3,
                transition: "opacity .25s",
              }}
            >
              <span
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.95) 0%, rgba(79,70,229,0.95) 100%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 20px 50px rgba(34,211,238,0.45), 0 0 0 8px rgba(34,211,238,0.10)",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                  <path d="M7 5.5v13l11-6.5L7 5.5z" />
                </svg>
              </span>
            </button>
          )}

          {/* Bottom-left: unmute pill (only while muted, after auto-play) */}
          {isMuted && (
            <button
              type="button"
              onClick={handleUnmute}
              aria-label={t("unmuteLabel")}
              style={{
                position: "absolute",
                left: 18,
                bottom: 18,
                zIndex: 4,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 16px",
                borderRadius: 9999,
                background: "rgba(0,0,0,0.55)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.01em",
                transition: "background .2s, transform .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(34,211,238,0.85)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.55)")
              }
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77S18.01 4.14 14 3.23z" />
              </svg>
              <span>{t("unmuteLabel")}</span>
            </button>
          )}
        </div>

        {/* Caption strip below video */}
        <p
          style={{
            marginTop: 28,
            textAlign: "center",
            fontSize: 13.5,
            color: "rgba(148,163,184,0.85)",
            letterSpacing: "0.01em",
          }}
        >
          {t("caption")}
        </p>
      </div>

      <style jsx>{`
        :global(.hv-title) {
          font-size: 32px;
        }
        @media (min-width: 768px) {
          :global(.hv-title) {
            font-size: 44px;
          }
        }
        @media (min-width: 1024px) {
          :global(.hv-title) {
            font-size: 52px;
          }
        }
      `}</style>
    </section>
  );
}
