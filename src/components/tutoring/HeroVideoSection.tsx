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
  // Default state assumes sound-on. Browser may force mute fallback below.
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // When the section enters the viewport, try to autoplay WITH SOUND first.
  // Browsers will reject unmuted autoplay without a prior user gesture — in
  // that case we silently fall back to muted autoplay so the visuals still
  // hook the visitor, and the toggle pill below lets them turn sound on.
  useEffect(() => {
    const node = containerRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Optimistically try unmuted autoplay
          video.muted = false;
          video.volume = 0.85;
          video
            .play()
            .then(() => setIsMuted(false))
            .catch(() => {
              // Fallback: muted autoplay (always allowed)
              video.muted = true;
              setIsMuted(true);
              video.play().catch(() => undefined);
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

  const handleToggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      // Currently muted → unmute and (re)start so the message is heard from the top
      v.muted = false;
      v.volume = 0.85;
      v.currentTime = 0;
      setIsMuted(false);
      v.play().catch(() => undefined);
    } else {
      v.muted = true;
      setIsMuted(true);
    }
  };

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      // First user-gesture play: ensure sound is on
      v.muted = false;
      v.volume = 0.85;
      setIsMuted(false);
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
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

          {/* Bottom-left: sound toggle pill (always visible) */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? t("unmuteLabel") : t("muteLabel")}
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
              background: isMuted
                ? "rgba(34,211,238,0.85)"
                : "rgba(0,0,0,0.55)",
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
              (e.currentTarget.style.background = isMuted
                ? "rgba(34,211,238,1)"
                : "rgba(34,211,238,0.85)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = isMuted
                ? "rgba(34,211,238,0.85)"
                : "rgba(0,0,0,0.55)")
            }
          >
            {isMuted ? (
              // Muted icon (speaker with X)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              // Unmuted icon (speaker with sound waves)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77S18.01 4.14 14 3.23z" />
              </svg>
            )}
            <span>{isMuted ? t("unmuteLabel") : t("muteLabel")}</span>
          </button>
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
