"use client";

import { useEffect, useState } from "react";

function useDelayed(active: boolean, delayMs: number) {
  const [fired, setFired] = useState(false);
  useEffect(() => {
    if (!active) { setFired(false); return; }
    const t = setTimeout(() => setFired(true), delayMs);
    return () => clearTimeout(t);
  }, [active, delayMs]);
  return fired;
}

/* ─── Step 1: Overview stats grid ───────────────────────────────── */

const stats = [
  { label: "Problems", value: "2,847", icon: "📝", color: "bg-blue-50 text-blue-700" },
  { label: "Accuracy", value: "78.3%", icon: "🎯", color: "bg-green-50 text-green-700" },
  { label: "Study Days", value: "142", icon: "📅", color: "bg-purple-50 text-purple-700" },
  { label: "Streak", value: "7 days", icon: "🔥", color: "bg-orange-50 text-orange-700" },
];

export function StepOverview({ active }: { active: boolean }) {
  const showStats = useDelayed(active, 800);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">My Dashboard</span>
        <p className="text-violet-200 text-[10px]">February 2026</p>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`${s.color} rounded-xl p-3 text-center transition-all duration-500 ${
                showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-lg mb-0.5">{s.icon}</div>
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-[10px] opacity-70">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Level indicator */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-amber-800">Level 3 — Advanced</span>
            <span className="text-[10px] text-amber-600">2,847 / 5,000 XP</span>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full" style={{ width: "57%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Weekly progress chart ─────────────────────────────── */

const weeklyData = [
  { day: "Mon", correct: 65, incorrect: 20 },
  { day: "Tue", correct: 45, incorrect: 15 },
  { day: "Wed", correct: 80, incorrect: 10 },
  { day: "Thu", correct: 55, incorrect: 25 },
  { day: "Fri", correct: 70, incorrect: 12 },
  { day: "Sat", correct: 90, incorrect: 8 },
  { day: "Sun", correct: 40, incorrect: 5 },
];

export function StepWeekly({ active }: { active: boolean }) {
  const showBars = useDelayed(active, 600);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">Weekly Progress</span>
      </div>

      <div className="flex-1 px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span className="text-[10px] text-gray-500">Correct</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-400" />
            <span className="text-[10px] text-gray-500">Incorrect</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end justify-between gap-2 h-[200px] px-1">
          {weeklyData.map((d, i) => {
            const maxH = 180;
            const total = d.correct + d.incorrect;
            const correctH = (d.correct / 100) * maxH;
            const incorrectH = (d.incorrect / 100) * maxH;
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full flex flex-col justify-end"
                  style={{ height: `${maxH}px` }}
                >
                  <div
                    className={`bg-red-400 rounded-t transition-all duration-700 ${showBars ? "" : "!h-0"}`}
                    style={{ height: showBars ? `${incorrectH}px` : 0, transitionDelay: `${i * 80}ms` }}
                  />
                  <div
                    className={`bg-green-500 rounded-t transition-all duration-700 ${showBars ? "" : "!h-0"}`}
                    style={{ height: showBars ? `${correctH}px` : 0, transitionDelay: `${i * 80}ms` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">{d.day}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">Total this week: <span className="font-bold text-gray-700">535 problems</span></p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Radar chart ───────────────────────────────────────── */

const radarTopics = [
  { name: "Algebra", score: 85 },
  { name: "Geometry", score: 72 },
  { name: "Statistics", score: 90 },
  { name: "Calculus", score: 55 },
  { name: "Number Theory", score: 68 },
  { name: "Trig", score: 78 },
];

export function StepRadar({ active }: { active: boolean }) {
  const showRadar = useDelayed(active, 800);
  const showLabels = useDelayed(active, 1500);

  const cx = 130;
  const cy = 130;
  const maxR = 90;
  const n = radarTopics.length;

  // Helper: get x,y for a given angle index and radius fraction (0-1)
  const pt = (i: number, frac: number) => {
    const angle = (i * 360) / n - 90;
    const rad = (angle * Math.PI) / 180;
    const r = frac * maxR;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  // Build hex polygon string for a given radius fraction
  const hexPoints = (frac: number) =>
    Array.from({ length: n }, (_, i) => pt(i, frac))
      .map((p) => `${p.x},${p.y}`)
      .join(" ");

  // Data polygon
  const dataPoints = radarTopics.map((t, i) => pt(i, t.score / 100));
  const dataPoly = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Label positions (further out)
  const labelR = maxR + 28;
  const labelPt = (i: number) => {
    const angle = (i * 360) / n - 90;
    const rad = (angle * Math.PI) / 180;
    return { x: cx + labelR * Math.cos(rad), y: cy + labelR * Math.sin(rad) };
  };

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">Ability Map</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-2">
        <div className={`transition-all duration-1000 ${showRadar ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          <svg width="260" height="260" viewBox="0 0 260 260">
            {/* Background hex grids */}
            {[0.25, 0.5, 0.75, 1].map((frac) => (
              <polygon
                key={frac}
                points={hexPoints(frac)}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={1}
              />
            ))}

            {/* Axis lines from center to each vertex */}
            {radarTopics.map((_, i) => {
              const p = pt(i, 1);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={p.x}
                  y2={p.y}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                />
              );
            })}

            {/* Filled data polygon */}
            <polygon
              points={dataPoly}
              fill="rgba(99, 102, 241, 0.15)"
              stroke="#6366f1"
              strokeWidth={2}
            />

            {/* Data point dots */}
            {dataPoints.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={4}
                fill="#6366f1"
                stroke="white"
                strokeWidth={2}
              />
            ))}

            {/* Labels */}
            {showLabels &&
              radarTopics.map((t, i) => {
                const lp = labelPt(i);
                return (
                  <text
                    key={t.name}
                    x={lp.x}
                    y={lp.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] fill-gray-600 font-medium"
                  >
                    {t.name}
                  </text>
                );
              })}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-2 grid grid-cols-3 gap-x-4 gap-y-1">
          {radarTopics.map((t) => (
            <div key={t.name} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${t.score >= 80 ? "bg-green-500" : t.score >= 60 ? "bg-amber-500" : "bg-red-400"}`} />
              <span className="text-[10px] text-gray-500">{t.name} {t.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4: Predicted score ───────────────────────────────────── */

export function StepPredicted({ active }: { active: boolean }) {
  const showScore = useDelayed(active, 800);
  const showTrend = useDelayed(active, 1800);
  const showBreakdown = useDelayed(active, 2800);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">Predicted Score</span>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col items-center">
        {/* Big score */}
        <div className={`text-center mb-4 transition-all duration-700 ${showScore ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            1,340
          </div>
          <p className="text-xs text-gray-400 mt-1">Predicted SAT Score</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold text-green-600">+40 from last month</span>
          </div>
        </div>

        {/* Trend line */}
        <div className={`w-full bg-gray-50 rounded-xl p-3 border border-gray-200 mb-3 transition-all duration-500 ${showTrend ? "opacity-100" : "opacity-0"}`}>
          <p className="text-[10px] text-gray-500 mb-2">Score Trend (6 months)</p>
          <div className="flex items-end justify-between h-[60px] gap-1">
            {[1180, 1200, 1250, 1280, 1300, 1340].map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t"
                  style={{ height: `${((s - 1100) / 300) * 60}px` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-gray-400">Sep</span>
            <span className="text-[9px] text-gray-400">Feb</span>
          </div>
        </div>

        {/* Section breakdown */}
        <div className={`w-full space-y-2 transition-all duration-500 ${showBreakdown ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
            <span className="text-xs font-medium text-blue-800">Math</span>
            <span className="text-sm font-bold text-blue-700">680</span>
          </div>
          <div className="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2">
            <span className="text-xs font-medium text-green-800">Reading & Writing</span>
            <span className="text-sm font-bold text-green-700">660</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 5: Misconception tracking ────────────────────────────── */

const misconceptions = [
  { name: "Negative exponents", count: 8, status: "conquered", color: "bg-green-100 border-green-300 text-green-800" },
  { name: "Quadratic discriminant", count: 5, status: "improving", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
  { name: "Absolute value inequalities", count: 3, status: "active", color: "bg-red-100 border-red-300 text-red-800" },
];

export function StepMisconception({ active }: { active: boolean }) {
  const show1 = useDelayed(active, 600);
  const show2 = useDelayed(active, 1200);
  const show3 = useDelayed(active, 1800);
  const shows = [show1, show2, show3];

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">Misconception Tracker</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <p className="text-xs text-gray-500 mb-4">AI tracks patterns in your mistakes to help you improve.</p>

        <div className="space-y-3">
          {misconceptions.map((m, i) => (
            <div
              key={m.name}
              className={`p-3 rounded-xl border ${m.color} transition-all duration-500 ${shows[i] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold">{m.name}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  m.status === "conquered" ? "bg-green-200 text-green-800"
                  : m.status === "improving" ? "bg-yellow-200 text-yellow-800"
                  : "bg-red-200 text-red-800"
                }`}>
                  {m.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/50 rounded-full h-1.5">
                  <div
                    className={`h-full rounded-full ${
                      m.status === "conquered" ? "bg-green-500" : m.status === "improving" ? "bg-yellow-500" : "bg-red-400"
                    }`}
                    style={{ width: m.status === "conquered" ? "100%" : m.status === "improving" ? "60%" : "30%" }}
                  />
                </div>
                <span className="text-[10px]">{m.count} errors</span>
              </div>
            </div>
          ))}
        </div>

        {/* Why section */}
        <div className="mt-4 bg-purple-50 p-3 rounded-xl border border-purple-200">
          <p className="text-xs font-bold text-purple-800 mb-1">💡 Why you keep getting it wrong</p>
          <p className="text-[11px] text-purple-700 leading-relaxed">
            You confuse |x| &lt; a with |x| &gt; a. Remember: less than = AND, greater than = OR.
          </p>
        </div>
      </div>
    </div>
  );
}
