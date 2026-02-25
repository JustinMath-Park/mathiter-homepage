"use client";

/**
 * Lecture (PSV) Mockup
 * Shows a math lecture video player on top + concept explanation below
 *
 * Graph coordinate system for f(x) = (x-1)² - 4:
 *   math x: -3 to 5  →  SVG x: 40 to 280  (30 px per unit)
 *   math y: -5 to 5   →  SVG y: 155 to 20  (13.5 px per unit, inverted)
 */
const mapX = (x: number) => 40 + (x + 3) * 30;
const mapY = (y: number) => 155 - (y + 5) * 13.5;

// Generate smooth parabola: f(x) = (x-1)² - 4, x from -2 to 4 in 0.25 steps
const parabolaPoints: [number, number][] = [];
for (let x = -2; x <= 4; x += 0.25) {
  const y = (x - 1) ** 2 - 4;
  parabolaPoints.push([mapX(x), mapY(y)]);
}
const parabolaPath =
  parabolaPoints.map(([sx, sy], i) => `${i === 0 ? "M" : "L"}${sx.toFixed(1)},${sy.toFixed(1)}`).join(" ");

// Grid lines aligned to integer coordinates
const vGridLines = [-2, -1, 0, 1, 2, 3, 4].map((x) => mapX(x));
const hGridLines = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((y) => mapY(y));

// Key points
const origin = { x: mapX(0), y: mapY(0) };
const vertex = { x: mapX(1), y: mapY(-4) };
const intercept1 = { x: mapX(-1), y: mapY(0) };
const intercept2 = { x: mapX(3), y: mapY(0) };

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
      <div className="relative bg-gray-900 h-44 flex items-center justify-center">
        <svg viewBox="0 0 320 180" className="w-full h-full">
          <rect width="320" height="180" fill="#1a1a2e" />

          {/* Grid lines at integer coordinates */}
          {vGridLines.map((sx) => (
            <line key={`v${sx}`} x1={sx} y1="20" x2={sx} y2="160" stroke="#2a2a4a" strokeWidth="0.5" />
          ))}
          {hGridLines.map((sy) => (
            <line key={`h${sy}`} x1="35" y1={sy} x2="280" y2={sy} stroke="#2a2a4a" strokeWidth="0.5" />
          ))}

          {/* Axes at y=0 and x=0 */}
          <line x1="35" y1={origin.y} x2="280" y2={origin.y} stroke="#6366f1" strokeWidth="1.2" />
          <line x1={origin.x} y1="20" x2={origin.x} y2="160" stroke="#6366f1" strokeWidth="1.2" />

          {/* Axis labels */}
          <text x="276" y={origin.y - 4} fontSize="8" className="fill-indigo-400">x</text>
          <text x={origin.x + 5} y="27" fontSize="8" className="fill-indigo-400">y</text>

          {/* Tick labels on x-axis */}
          {[-2, -1, 1, 2, 3, 4].map((n) => (
            <text key={`xt${n}`} x={mapX(n)} y={origin.y + 10} textAnchor="middle" fontSize="6" className="fill-gray-500">
              {n}
            </text>
          ))}
          {/* Tick labels on y-axis */}
          {[-4, -3, -2, -1, 1, 2, 3, 4].map((n) => (
            <text key={`yt${n}`} x={origin.x - 7} y={mapY(n) + 2.5} textAnchor="end" fontSize="6" className="fill-gray-500">
              {n}
            </text>
          ))}

          {/* Axis of symmetry: x = 1 */}
          <line
            x1={vertex.x} y1="25" x2={vertex.x} y2="158"
            stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4"
          />

          {/* Parabola - computed from actual function values */}
          <path
            d={parabolaPath}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vertex point (1, -4) */}
          <circle cx={vertex.x} cy={vertex.y} r="4" fill="#fbbf24" />
          <text x={vertex.x + 7} y={vertex.y + 11} fontSize="7" className="fill-yellow-400">
            vertex (1, −4)
          </text>

          {/* X-intercepts (-1, 0) and (3, 0) */}
          <circle cx={intercept1.x} cy={intercept1.y} r="3" fill="#34d399" />
          <text x={intercept1.x - 3} y={intercept1.y - 6} textAnchor="middle" fontSize="6" className="fill-emerald-400">
            (−1, 0)
          </text>
          <circle cx={intercept2.x} cy={intercept2.y} r="3" fill="#34d399" />
          <text x={intercept2.x + 3} y={intercept2.y - 6} textAnchor="middle" fontSize="6" className="fill-emerald-400">
            (3, 0)
          </text>

          {/* Equation label */}
          <rect x="15" y="5" width="115" height="18" rx="4" fill="#6366f1" opacity="0.8" />
          <text x="72" y="17" textAnchor="middle" fontSize="9" className="fill-white" fontWeight="600">
            f(x) = (x − 1)² − 4
          </text>
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
      <div className="px-4 pb-3 space-y-2">
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
