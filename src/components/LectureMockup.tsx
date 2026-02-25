"use client";

/**
 * Lecture (PSV) Mockup
 * Shows a math lecture video player on top + concept explanation below
 */
export default function LectureMockup() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px]">
            ▶
          </div>
          <div>
            <span className="text-white text-sm font-semibold">Lecture</span>
            <span className="text-violet-200 text-[10px] ml-2">Algebra</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="bg-white/20 text-white px-2 py-0.5 rounded-full">
            3 / 8
          </span>
          <span className="text-violet-200">5:42</span>
        </div>
      </div>

      {/* Video player area */}
      <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
        {/* Fake video content - math animation frame */}
        <svg viewBox="0 0 320 180" className="w-full h-full">
          {/* Dark background */}
          <rect width="320" height="180" fill="#1a1a2e" />

          {/* Grid lines */}
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={40 + i * 30}
              y1="20"
              x2={40 + i * 30}
              y2="155"
              stroke="#2a2a4a"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="40"
              y1={20 + i * 27}
              x2="280"
              y2={20 + i * 27}
              stroke="#2a2a4a"
              strokeWidth="0.5"
            />
          ))}

          {/* Axes */}
          <line x1="40" y1="155" x2="280" y2="155" stroke="#6366f1" strokeWidth="1.5" />
          <line x1="160" y1="20" x2="160" y2="155" stroke="#6366f1" strokeWidth="1.5" />

          {/* Axis labels */}
          <text x="275" y="168" fontSize="8" className="fill-indigo-400">x</text>
          <text x="165" y="28" fontSize="8" className="fill-indigo-400">y</text>

          {/* Parabola: y = (x-1)² - 4, scaled */}
          <path
            d="M 55,40 Q 80,120 115,148 Q 140,162 160,155 Q 180,148 205,120 Q 240,60 265,20"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Vertex point */}
          <circle cx="160" cy="155" r="4" fill="#fbbf24" />
          <text x="168" y="168" fontSize="7" className="fill-yellow-400">vertex (1, −4)</text>

          {/* Equation label */}
          <rect x="15" y="5" width="110" height="18" rx="4" fill="#6366f1" opacity="0.8" />
          <text x="70" y="17" textAnchor="middle" fontSize="9" className="fill-white" fontWeight="600">
            f(x) = (x − 1)² − 4
          </text>

          {/* X-intercepts */}
          <circle cx="100" cy="155" r="3" fill="#34d399" />
          <text x="88" y="148" fontSize="6" className="fill-emerald-400">(−1, 0)</text>
          <circle cx="220" cy="155" r="3" fill="#34d399" />
          <text x="224" y="148" fontSize="6" className="fill-emerald-400">(3, 0)</text>

          {/* Axis of symmetry dashed line */}
          <line
            x1="160" y1="20" x2="160" y2="155"
            stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"
          />
        </svg>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent ml-1" />
          </div>
        </div>

        {/* Video progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div className="h-full bg-violet-500 rounded-r" style={{ width: "42%" }} />
        </div>
      </div>

      {/* Concept explanation section */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">
            Concept
          </span>
          <h3 className="text-xs font-bold text-gray-800">
            Vertex Form of Quadratic Functions
          </h3>
        </div>
      </div>

      {/* Content - math explanation */}
      <div className="px-4 pb-4 space-y-2.5">
        {/* Key formula */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2">
          <p className="text-[10px] text-indigo-600 font-medium mb-1">Standard Form:</p>
          <p className="font-mono text-sm text-indigo-900 font-semibold text-center">
            f(x) = a(x − h)² + k
          </p>
          <p className="text-[9px] text-indigo-500 text-center mt-1">
            vertex = (h, k), axis of symmetry: x = h
          </p>
        </div>

        {/* Step-by-step */}
        <div className="space-y-1.5">
          <div className="flex gap-2">
            <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              Identify <span className="font-semibold text-indigo-700">a = 1</span>, <span className="font-semibold text-indigo-700">h = 1</span>, <span className="font-semibold text-indigo-700">k = −4</span> from f(x) = (x − 1)² − 4
            </p>
          </div>
          <div className="flex gap-2">
            <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              The vertex is at <span className="font-mono font-semibold text-indigo-700">(1, −4)</span> — the minimum point since a &gt; 0
            </p>
          </div>
          <div className="flex gap-2">
            <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              X-intercepts: set f(x) = 0 → x = −1, 3
            </p>
          </div>
        </div>

        {/* AI question hint */}
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <span className="text-xs">💡</span>
          <p className="text-[10px] text-amber-700">
            <span className="font-semibold">Ask AI:</span> Tap to ask questions about this concept
          </p>
        </div>
      </div>
    </>
  );
}
