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

/* ─── Step 1: Curriculum sidebar ────────────────────────────────── */

const topics = [
  { name: "Linear Equations", done: true },
  { name: "Quadratic Functions", done: true },
  { name: "Graphing Parabolas", active: true },
  { name: "Vertex Form", done: false },
  { name: "Factoring", done: false },
];

export function StepCurriculum({ active }: { active: boolean }) {
  const highlight = useDelayed(active, 1200);

  return (
    <div className="h-full flex text-sm">
      {/* Sidebar */}
      <div className="w-[140px] bg-gray-50 border-r border-gray-200 py-3 px-2 flex flex-col">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Curriculum</div>
        {topics.map((t, i) => (
          <div
            key={i}
            className={`px-2 py-2 rounded-lg text-xs mb-1 transition-all duration-500 ${
              t.active && highlight
                ? "bg-blue-100 text-blue-700 font-semibold border border-blue-200"
                : t.active
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : t.done
                    ? "text-gray-500"
                    : "text-gray-400"
            }`}
          >
            <span className="mr-1">{t.done ? "✓" : t.active ? "▶" : "○"}</span>
            {t.name}
          </div>
        ))}
        <div className="mt-auto px-2">
          <div className="text-[10px] text-gray-400 mb-1">Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: "40%" }} />
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">2 / 5</div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4">
        <div className="text-xs text-gray-400 mb-1">Algebra II · Chapter 3</div>
        <h3 className="text-base font-bold text-gray-900 mb-3">Graphing Parabolas</h3>
        <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 text-center">Tap to play · 4:32</div>
      </div>
    </div>
  );
}

/* ─── Step 2: Video playing ─────────────────────────────────────── */

export function StepVideo({ active }: { active: boolean }) {
  const showOverlay = useDelayed(active, 1000);
  const showHighlight = useDelayed(active, 2500);

  return (
    <div className="h-full flex flex-col">
      {/* Video player */}
      <div className="bg-gray-900 flex-1 relative flex items-center justify-center">
        {/* Simulated math content on video */}
        <div className="text-center">
          <p className={`text-white/90 text-sm font-mono transition-all duration-700 ${showOverlay ? "opacity-100" : "opacity-0"}`}>
            f(x) = a(x − h)² + k
          </p>
          <p className={`text-blue-400 text-xs mt-2 transition-all duration-700 ${showHighlight ? "opacity-100" : "opacity-0"}`}>
            vertex = (h, k)
          </p>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 bg-white/20">
            <div className="h-full bg-red-500 transition-all duration-[5000ms]" style={{ width: active ? "65%" : "30%" }} />
          </div>
          <div className="flex items-center justify-between px-3 py-1.5 text-[10px] text-white/70">
            <span>2:48</span>
            <span>4:32</span>
          </div>
        </div>
      </div>

      {/* Below video */}
      <div className="p-4 bg-white">
        <h3 className="text-sm font-bold text-gray-900">Graphing Parabolas: Vertex Form</h3>
        <p className="text-xs text-gray-500 mt-1">Learn how to graph quadratic functions using vertex form.</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-medium">Algebra II</span>
          <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">Chapter 3</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Animated graph drawing ────────────────────────────── */

export function StepGraph({ active }: { active: boolean }) {
  const showAxes = useDelayed(active, 500);
  const showCurve = useDelayed(active, 1200);
  const showVertex = useDelayed(active, 2200);
  const showIntercepts = useDelayed(active, 3200);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3">
        <span className="text-white font-semibold text-sm">Visual Explanation</span>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white p-4">
        {/* Graph area */}
        <div className="w-full max-w-[280px] aspect-square relative bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div key={`h${i}`} className="absolute w-full border-t border-gray-300" style={{ top: `${(i + 1) * 12.5}%` }} />
            ))}
            {[...Array(8)].map((_, i) => (
              <div key={`v${i}`} className="absolute h-full border-l border-gray-300" style={{ left: `${(i + 1) * 12.5}%` }} />
            ))}
          </div>

          {/* Axes — y-axis slightly left of center (vertex x=-2), x-axis at ~38% from top */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${showAxes ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute top-0 bottom-0 left-[58%] w-0.5 bg-gray-600" />
            <div className="absolute left-0 right-0 top-[38%] h-0.5 bg-gray-600" />
          </div>

          {/* Parabola — SVG curve: f(x) = 3(x+2)²−12, extends above x-axis */}
          {/* Coordinate map: px = 58 + x*8.25, py = 38 − f(x)*3.667 */}
          <svg
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${showCurve ? "opacity-100" : "opacity-0"}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <polyline
              points="19.2,1.8 21.7,18.6 25,38 29.1,57.2 33.3,71 37.4,79.2 41.5,82 45.6,79.2 49.8,71 53.9,57.2 58,38 61.3,18.6 63.8,1.8"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Vertex point — at the bottom of the U curve */}
          <div className={`absolute left-[42%] top-[82%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${showVertex ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>
            <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow" />
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-red-600 whitespace-nowrap bg-white/80 px-1 rounded">
              Vertex (−2, −12)
            </span>
          </div>

          {/* x-intercepts — on the x-axis (top-[38%]) */}
          <div className={`transition-all duration-500 ${showIntercepts ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute left-[25%] top-[38%] -translate-x-1/2 -translate-y-1/2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shadow" />
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-green-600 whitespace-nowrap">x = −4</span>
            </div>
            <div className="absolute left-[58%] top-[38%] -translate-x-1/2 -translate-y-1/2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shadow" />
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-green-600 whitespace-nowrap">x = 0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 text-center">
        <p className="text-xs text-gray-500">f(x) = 3(x + 2)² − 12</p>
      </div>
    </div>
  );
}

/* ─── Step 4: Concept breakdown ─────────────────────────────────── */

export function StepConcept({ active }: { active: boolean }) {
  const show1 = useDelayed(active, 600);
  const show2 = useDelayed(active, 1400);
  const show3 = useDelayed(active, 2200);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3">
        <span className="text-white font-semibold text-sm">Concept Breakdown</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3">
        <div className="text-center mb-4">
          <p className="font-mono text-base font-bold text-gray-900">f(x) = 3(x + 2)² − 12</p>
          <p className="text-xs text-gray-400 mt-1">Vertex Form: f(x) = a(x − h)² + k</p>
        </div>

        <div className={`bg-blue-50 p-3 rounded-lg border border-blue-200 transition-all duration-500 ${show1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <p className="text-xs font-semibold text-blue-800 mb-1">Vertex</p>
          <p className="text-xs text-gray-700">h = −2, k = −12</p>
          <p className="text-xs text-gray-700">Vertex point: <span className="font-mono font-bold">(−2, −12)</span></p>
        </div>

        <div className={`bg-green-50 p-3 rounded-lg border border-green-200 transition-all duration-500 ${show2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <p className="text-xs font-semibold text-green-800 mb-1">Direction & Width</p>
          <p className="text-xs text-gray-700">a = 3 (positive → opens upward)</p>
          <p className="text-xs text-gray-700">|a| &gt; 1 → narrower than standard parabola</p>
        </div>

        <div className={`bg-purple-50 p-3 rounded-lg border border-purple-200 transition-all duration-500 ${show3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <p className="text-xs font-semibold text-purple-800 mb-1">x-intercepts</p>
          <p className="text-xs text-gray-700">Set f(x) = 0:</p>
          <p className="text-xs font-mono text-gray-700">3(x + 2)² = 12</p>
          <p className="text-xs font-mono text-gray-700">(x + 2)² = 4</p>
          <p className="text-xs font-mono text-gray-700 font-bold">x = 0, x = −4</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 5: Ask AI ────────────────────────────────────────────── */

export function StepAskAI({ active }: { active: boolean }) {
  const showTyping = useDelayed(active, 1000);
  const showResponse = useDelayed(active, 2500);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">Ask AI</span>
        <span className="text-blue-100 text-[10px]">About: Graphing Parabolas</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* User message */}
        <div className="flex justify-end mb-3">
          <div className="bg-blue-500 text-white px-3 py-2 rounded-xl rounded-br-sm max-w-[80%]">
            <p className="text-xs">Why does a bigger &quot;a&quot; value make the parabola narrower?</p>
          </div>
        </div>

        {/* AI typing indicator */}
        {showTyping && !showResponse && (
          <div className="flex items-start gap-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-bold">AI</span>
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded-xl rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}

        {/* AI response */}
        {showResponse && (
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-bold">AI</span>
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded-xl rounded-bl-sm max-w-[85%]">
              <p className="text-xs text-gray-800 leading-relaxed">
                Think of <span className="font-mono font-bold">a</span> as a &quot;stretching factor.&quot;
              </p>
              <p className="text-xs text-gray-800 leading-relaxed mt-1.5">
                When |a| &gt; 1, every y-value gets <span className="font-semibold text-blue-700">multiplied</span> by a larger number. So the curve rises faster and appears narrower.
              </p>
              <p className="text-xs text-gray-800 leading-relaxed mt-1.5">
                For f(x) = <span className="font-mono">3</span>(x + 2)² − 12, the &quot;3&quot; makes it 3× steeper than x².
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Ask about this lecture..."
            className="flex-1 bg-transparent text-xs outline-none text-gray-500"
            readOnly
          />
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
