"use client";

import { useEffect, useState } from "react";

/**
 * SRG (Socratic Reasoning Guide) Mockup Slides
 * Shows how the system guides students through mistakes with diagrams and questions
 * Three variations: Geometry, Algebra (Discriminant), Number Line
 */

// ─── Variation A: Geometry Rectangle ────────────────────────────────
export function SRGGeometryMockup({ animated }: { animated: boolean }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setSelected(true), 1200);
      return () => clearTimeout(timer);
    }
    setSelected(false);
  }, [animated]);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
            💡
          </div>
          <span className="text-white text-sm font-semibold">AI Tutor</span>
          <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">
            Step 2 of 4
          </span>
        </div>
        <span className="text-emerald-100 text-[10px]">Guided Review</span>
      </div>

      {/* Prompt banner */}
      <div className="mx-4 mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-[10px] text-amber-800 font-medium">
          ❌ You answered: Width = 12m
        </p>
        <p className="text-[10px] text-amber-700 mt-0.5">
          Let&apos;s check if that works!
        </p>
      </div>

      {/* Rectangle diagram */}
      <div className="mx-4 mt-3 flex justify-center">
        <svg viewBox="0 0 240 130" className="w-full max-w-[240px]">
          {/* Student's wrong rectangle */}
          <rect x="10" y="15" width="100" height="80" rx="3"
            fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
          <text x="60" y="10" textAnchor="middle" className="fill-red-500" fontSize="8" fontWeight="600">12m</text>
          <text x="3" y="58" textAnchor="end" className="fill-red-500" fontSize="8" fontWeight="600"
            transform="rotate(-90, 3, 58)">17m</text>
          <text x="60" y="62" textAnchor="middle" className="fill-red-400" fontSize="7">204m²</text>
          <text x="60" y="73" textAnchor="middle" className="fill-red-400" fontSize="6">✗ Too big!</text>

          {/* Arrow */}
          <text x="125" y="58" textAnchor="middle" className="fill-gray-400" fontSize="10">→</text>

          {/* Correct rectangle */}
          <rect x="140" y="25" width="85" height="60" rx="3"
            fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
          <text x="182" y="20" textAnchor="middle" className="fill-green-600" fontSize="8" fontWeight="600">7m</text>
          <text x="133" y="58" textAnchor="end" className="fill-green-600" fontSize="8" fontWeight="600"
            transform="rotate(-90, 133, 58)">12m</text>
          <text x="182" y="58" textAnchor="middle" className="fill-green-600" fontSize="7">84m²</text>
          <text x="182" y="69" textAnchor="middle" className="fill-green-500" fontSize="6">✓ Correct!</text>

          {/* Label */}
          <text x="60" y="108" textAnchor="middle" className="fill-red-400" fontSize="7">Your answer</text>
          <text x="182" y="108" textAnchor="middle" className="fill-green-500" fontSize="7">Correct answer</text>
        </svg>
      </div>

      {/* Guiding question */}
      <div className="mx-4 mt-3 px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-[10px] text-blue-800 font-semibold mb-1.5">
          🤔 If width = 12m and length = 12 + 5 = 17m,
        </p>
        <p className="text-xs text-blue-900 font-medium">
          What is the area? (12 × 17 = ?)
        </p>
      </div>

      {/* Answer options */}
      <div className="mx-4 mt-2.5 mb-4 grid grid-cols-2 gap-2">
        <div className="text-center py-1.5 rounded-lg border border-gray-200 text-[10px] text-gray-600 transition-all duration-500">
          84m²
        </div>
        <div className={`text-center py-1.5 rounded-lg text-[10px] transition-all duration-500 ${
          selected
            ? "border-2 border-blue-400 bg-blue-50 text-blue-700 font-medium"
            : "border border-gray-200 text-gray-600"
        }`}>
          204m²
        </div>
        <div className="text-center py-1.5 rounded-lg border border-gray-200 text-[10px] text-gray-600 transition-all duration-500">
          168m²
        </div>
        <div className="text-center py-1.5 rounded-lg border border-gray-200 text-[10px] text-gray-600 transition-all duration-500">
          60m²
        </div>
      </div>
    </>
  );
}

// ─── Variation B: Algebra Discriminant ──────────────────────────────
export function SRGDiscriminantMockup() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
            💡
          </div>
          <span className="text-white text-sm font-semibold">AI Tutor</span>
          <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">
            Step 2 of 3
          </span>
        </div>
        <span className="text-emerald-100 text-[10px]">Guided Review</span>
      </div>

      {/* Prompt */}
      <div className="mx-4 mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-[10px] text-amber-800 font-medium">
          ❌ You answered: k = 3
        </p>
        <p className="text-[10px] text-amber-700 mt-0.5">
          Let&apos;s think through this step by step.
        </p>
      </div>

      {/* Equation box */}
      <div className="mx-4 mt-3 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
        <p className="text-[10px] text-indigo-600 mb-1">Given equation:</p>
        <p className="font-mono text-sm font-semibold text-indigo-800">
          x² − 6x + k = 0
        </p>
      </div>

      {/* Discriminant formula */}
      <div className="mx-4 mt-2.5 px-3 py-2.5 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-[10px] text-purple-700 font-semibold mb-1">Discriminant formula:</p>
        <p className="font-mono text-xs text-purple-900 text-center font-semibold">
          D = b² − 4ac
        </p>
        <div className="mt-2 space-y-0.5 text-[9px]">
          <p className="text-gray-500">D &gt; 0 → Two distinct real solutions</p>
          <p className="text-purple-700 font-semibold">D = 0 → Exactly one real solution ✓</p>
          <p className="text-gray-500">D &lt; 0 → No real solutions</p>
        </div>
      </div>

      {/* Common mistake callout */}
      <div className="mx-4 mt-2.5 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-[10px] text-red-700 font-semibold">⚠️ Common Mistake:</p>
        <p className="text-[10px] text-red-600 mt-0.5">
          k = b/2 = 6/2 = <span className="line-through">3</span> ← You halved instead of squaring!
        </p>
      </div>

      {/* Guiding question */}
      <div className="mx-4 mt-2.5 mb-4 px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-[10px] text-blue-800 font-semibold mb-1">
          🤔 For exactly one solution, D = 0:
        </p>
        <p className="text-xs text-blue-900 font-medium">
          (−6)² − 4(1)(k) = 0, so k = ?
        </p>
        <div className="mt-2 flex gap-2">
          <span className="flex-1 text-center py-1 rounded border border-gray-200 text-[10px] text-gray-600">3</span>
          <span className="flex-1 text-center py-1 rounded border-2 border-green-400 bg-green-50 text-[10px] text-green-700 font-medium">9</span>
          <span className="flex-1 text-center py-1 rounded border border-gray-200 text-[10px] text-gray-600">36</span>
        </div>
      </div>
    </>
  );
}

// ─── Variation C: Number Line ───────────────────────────────────────
export function SRGNumberLineMockup({ animated }: { animated: boolean }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setSelected(true), 1200);
      return () => clearTimeout(timer);
    }
    setSelected(false);
  }, [animated]);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
            💡
          </div>
          <span className="text-white text-sm font-semibold">AI Tutor</span>
          <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">
            Step 1 of 3
          </span>
        </div>
        <span className="text-emerald-100 text-[10px]">Guided Review</span>
      </div>

      {/* Prompt */}
      <div className="mx-4 mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-[10px] text-amber-800 font-medium">
          ❌ You answered: Width = −12m
        </p>
        <p className="text-[10px] text-amber-700 mt-0.5">
          Let&apos;s think about this together.
        </p>
      </div>

      {/* Number line */}
      <div className="mx-4 mt-3 flex justify-center">
        <svg viewBox="0 0 260 80" className="w-full max-w-[260px]">
          {/* Negative zone shading */}
          <rect x="10" y="28" width="115" height="24" rx="2" fill="#fef2f2" opacity="0.6" />
          <text x="65" y="23" textAnchor="middle" fontSize="7" className="fill-red-400">Negative zone</text>

          {/* Positive zone */}
          <rect x="130" y="28" width="120" height="24" rx="2" fill="#f0fdf4" opacity="0.6" />
          <text x="195" y="23" textAnchor="middle" fontSize="7" className="fill-green-500">Positive zone</text>

          {/* Line */}
          <line x1="15" y1="40" x2="245" y2="40" stroke="#9ca3af" strokeWidth="1.5" />

          {/* Ticks and labels */}
          {[
            { x: 30, label: "−15" },
            { x: 65, label: "−10" },
            { x: 95, label: "−5" },
            { x: 125, label: "0" },
            { x: 158, label: "5" },
            { x: 190, label: "10" },
            { x: 220, label: "15" },
          ].map((tick) => (
            <g key={tick.label}>
              <line x1={tick.x} y1="36" x2={tick.x} y2="44" stroke="#9ca3af" strokeWidth="1" />
              <text x={tick.x} y="56" textAnchor="middle" fontSize="7"
                className={tick.label === "0" ? "fill-gray-700 font-bold" : "fill-gray-400"}>
                {tick.label}
              </text>
            </g>
          ))}

          {/* Student's answer: -12 */}
          <circle cx="42" cy="40" r="7" fill="#ef4444" opacity="0.9" />
          <text x="42" y="43" textAnchor="middle" fontSize="6" className="fill-white font-bold">−12</text>
          <text x="42" y="68" textAnchor="middle" fontSize="6" className="fill-red-500">✗</text>

          {/* Correct answer: 7 */}
          <circle cx="172" cy="40" r="7" fill="#22c55e" opacity="0.9" />
          <text x="172" y="43" textAnchor="middle" fontSize="6" className="fill-white font-bold">7</text>
          <text x="172" y="68" textAnchor="middle" fontSize="6" className="fill-green-500">✓</text>
        </svg>
      </div>

      {/* Context question */}
      <div className="mx-4 mt-2 px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-[10px] text-blue-800 font-semibold mb-1.5">
          🤔 A garden&apos;s width is −12 meters.
        </p>
        <p className="text-xs text-blue-900 font-medium">
          Can you measure a negative distance in real life?
        </p>
      </div>

      {/* Answer options */}
      <div className="mx-4 mt-2.5 mb-4 flex gap-2">
        <div className="flex-1 text-center py-2 rounded-lg border border-gray-200 text-[10px] text-gray-600 transition-all duration-500">
          Yes, it can be negative
        </div>
        <div className={`flex-1 text-center py-2 rounded-lg text-[10px] transition-all duration-500 ${
          selected
            ? "border-2 border-green-400 bg-green-50 text-green-700 font-medium"
            : "border border-gray-200 text-gray-600"
        }`}>
          No, that&apos;s impossible
        </div>
      </div>

      {/* Key insight */}
      <div className="mx-4 mb-4 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-[10px] text-indigo-700 italic">
          💡 Context matters! In real-world problems, always check if your answer makes physical sense.
        </p>
      </div>
    </>
  );
}
