"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Locale = "en" | "ko" | "ms" | "zh";

/* ─── Locale data ──────────────────────────────────────────────── */

const t = {
  en: {
    curriculum: "Curriculum",
    progress: "Progress",
    topics: [
      { name: "Linear Equations", done: true },
      { name: "Quadratic Functions", done: true },
      { name: "Graphing Parabolas", active: true },
      { name: "Vertex Form", done: false },
      { name: "Factoring", done: false },
    ],
    chapterLabel: "Algebra II · Chapter 3",
    topicTitle: "Graphing Parabolas",
    tapToPlay: "Tap to play · 4:32",
    visualExplanation: "Visual Explanation",
    videoTitle: "Graphing Parabolas: Vertex Form",
    videoDesc: "Learn how to graph quadratic functions using vertex form.",
    algebraII: "Algebra II",
    chapter3: "Chapter 3",
    conceptBreakdown: "Concept Breakdown",
    vertexFormLabel: "Vertex Form: f(x) = a(x − h)² + k",
    vertex: "Vertex",
    directionWidth: "Direction & Width",
    directionText: "a = 3 (positive → opens upward)",
    narrowerText: "|a| > 1 → narrower than standard parabola",
    xIntercepts: "x-intercepts",
    askAI: "Ask AI",
    aboutTopic: "About: Graphing Parabolas",
    userQuestion: 'Why does a bigger "a" value make the parabola narrower?',
    aiResponse1: (a: string) => <>Think of <span className="font-mono font-bold">{a}</span> as a &quot;stretching factor.&quot;</>,
    aiResponse2: <>When |a| &gt; 1, every y-value gets <span className="font-semibold text-blue-700">multiplied</span> by a larger number. So the curve rises faster and appears narrower.</>,
    aiResponse3: <>For f(x) = <span className="font-mono">3</span>(x + 2)² − 12, the &quot;3&quot; makes it 3× steeper than x².</>,
    inputPlaceholder: "Ask about this lecture...",
  },
  ko: {
    curriculum: "커리큘럼",
    progress: "진행률",
    topics: [
      { name: "일차방정식", done: true },
      { name: "이차함수", done: true },
      { name: "포물선 그리기", active: true },
      { name: "꼭짓점 형태", done: false },
      { name: "인수분해", done: false },
    ],
    chapterLabel: "대수 II · 3장",
    topicTitle: "포물선 그리기",
    tapToPlay: "재생하기 · 4:32",
    visualExplanation: "시각적 설명",
    videoTitle: "포물선 그리기: 꼭짓점 형태",
    videoDesc: "꼭짓점 형태를 이용하여 이차함수를 그리는 방법을 배웁니다.",
    algebraII: "대수 II",
    chapter3: "3장",
    conceptBreakdown: "개념 분석",
    vertexFormLabel: "꼭짓점 형태: f(x) = a(x − h)² + k",
    vertex: "꼭짓점",
    directionWidth: "방향 및 너비",
    directionText: "a = 3 (양수 → 위로 열림)",
    narrowerText: "|a| > 1 → 표준 포물선보다 좁음",
    xIntercepts: "x절편",
    askAI: "AI에게 물어보기",
    aboutTopic: "주제: 포물선 그리기",
    userQuestion: '"a" 값이 클수록 포물선이 왜 좁아지나요?',
    aiResponse1: (a: string) => <><span className="font-mono font-bold">{a}</span>를 &quot;늘림 계수&quot;라고 생각하세요.</>,
    aiResponse2: <>|a| &gt; 1이면, 모든 y값이 더 큰 수로 <span className="font-semibold text-blue-700">곱해져서</span> 곡선이 더 빠르게 올라가고 좁아 보입니다.</>,
    aiResponse3: <>f(x) = <span className="font-mono">3</span>(x + 2)² − 12에서 &quot;3&quot;은 x²보다 3배 더 가파르게 만듭니다.</>,
    inputPlaceholder: "이 강의에 대해 질문하기...",
  },
  ms: {
    curriculum: "Kurikulum",
    progress: "Kemajuan",
    topics: [
      { name: "Persamaan Linear", done: true },
      { name: "Fungsi Kuadratik", done: true },
      { name: "Melukis Parabola", active: true },
      { name: "Bentuk Verteks", done: false },
      { name: "Pemfaktoran", done: false },
    ],
    chapterLabel: "Algebra II · Bab 3",
    topicTitle: "Melukis Parabola",
    tapToPlay: "Ketik untuk main · 4:32",
    visualExplanation: "Penerangan Visual",
    videoTitle: "Melukis Parabola: Bentuk Verteks",
    videoDesc: "Belajar cara melukis fungsi kuadratik menggunakan bentuk verteks.",
    algebraII: "Algebra II",
    chapter3: "Bab 3",
    conceptBreakdown: "Pecahan Konsep",
    vertexFormLabel: "Bentuk Verteks: f(x) = a(x − h)² + k",
    vertex: "Verteks",
    directionWidth: "Arah & Lebar",
    directionText: "a = 3 (positif → buka ke atas)",
    narrowerText: "|a| > 1 → lebih sempit daripada parabola standard",
    xIntercepts: "Pintasan-x",
    askAI: "Tanya AI",
    aboutTopic: "Tentang: Melukis Parabola",
    userQuestion: 'Mengapa nilai "a" yang lebih besar menjadikan parabola lebih sempit?',
    aiResponse1: (a: string) => <>Anggap <span className="font-mono font-bold">{a}</span> sebagai &quot;faktor regangan.&quot;</>,
    aiResponse2: <>Apabila |a| &gt; 1, setiap nilai-y <span className="font-semibold text-blue-700">didarab</span> dengan nombor yang lebih besar. Jadi lengkung naik lebih cepat dan kelihatan lebih sempit.</>,
    aiResponse3: <>Untuk f(x) = <span className="font-mono">3</span>(x + 2)² − 12, &quot;3&quot; menjadikannya 3× lebih curam daripada x².</>,
    inputPlaceholder: "Tanya tentang kuliah ini...",
  },
  zh: {
    curriculum: "课程大纲",
    progress: "进度",
    topics: [
      { name: "一次方程", done: true },
      { name: "二次函数", done: true },
      { name: "绘制抛物线", active: true },
      { name: "顶点式", done: false },
      { name: "因式分解", done: false },
    ],
    chapterLabel: "代数 II · 第3章",
    topicTitle: "绘制抛物线",
    tapToPlay: "点击播放 · 4:32",
    visualExplanation: "可视化讲解",
    videoTitle: "绘制抛物线：顶点式",
    videoDesc: "学习如何使用顶点式绘制二次函数。",
    algebraII: "代数 II",
    chapter3: "第3章",
    conceptBreakdown: "概念分析",
    vertexFormLabel: "顶点式: f(x) = a(x − h)² + k",
    vertex: "顶点",
    directionWidth: "方向与宽度",
    directionText: "a = 3（正数 → 开口向上）",
    narrowerText: "|a| > 1 → 比标准抛物线更窄",
    xIntercepts: "x轴截距",
    askAI: "问AI",
    aboutTopic: "关于：绘制抛物线",
    userQuestion: '为什么"a"值越大抛物线越窄？',
    aiResponse1: (a: string) => <>把 <span className="font-mono font-bold">{a}</span> 看作&quot;拉伸系数&quot;。</>,
    aiResponse2: <>当 |a| &gt; 1 时，每个 y 值都被一个更大的数<span className="font-semibold text-blue-700">乘</span>了。所以曲线上升更快，看起来更窄。</>,
    aiResponse3: <>对于 f(x) = <span className="font-mono">3</span>(x + 2)² − 12，&quot;3&quot;使其比 x² 陡 3 倍。</>,
    inputPlaceholder: "关于这节课的问题...",
  },
};

function useT() {
  const locale = useLocale() as Locale;
  return t[locale] || t.en;
}

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

export function StepCurriculum({ active }: { active: boolean }) {
  const l = useT();
  const highlight = useDelayed(active, 1200);

  return (
    <div className="h-full flex text-sm">
      {/* Sidebar */}
      <div className="w-[140px] bg-gray-50 border-r border-gray-200 py-3 px-2 flex flex-col">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">{l.curriculum}</div>
        {l.topics.map((tp, i) => {
          const isActive = "active" in tp && tp.active;
          const isDone = tp.done;
          return (
            <div
              key={i}
              className={`px-2 py-2 rounded-lg text-xs mb-1 transition-all duration-500 ${
                isActive && highlight
                  ? "bg-blue-100 text-blue-700 font-semibold border border-blue-200"
                  : isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : isDone
                      ? "text-gray-500"
                      : "text-gray-400"
              }`}
            >
              <span className="mr-1">{isDone ? "✓" : isActive ? "▶" : "○"}</span>
              {tp.name}
            </div>
          );
        })}
        <div className="mt-auto px-2">
          <div className="text-[10px] text-gray-400 mb-1">{l.progress}</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: "40%" }} />
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">2 / 5</div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4">
        <div className="text-xs text-gray-400 mb-1">{l.chapterLabel}</div>
        <h3 className="text-base font-bold text-gray-900 mb-3">{l.topicTitle}</h3>
        <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 text-center">{l.tapToPlay}</div>
      </div>
    </div>
  );
}

/* ─── Step 2: Video playing ─────────────────────────────────────── */

export function StepVideo({ active }: { active: boolean }) {
  const l = useT();
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
        <h3 className="text-sm font-bold text-gray-900">{l.videoTitle}</h3>
        <p className="text-xs text-gray-500 mt-1">{l.videoDesc}</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-medium">{l.algebraII}</span>
          <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">{l.chapter3}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Animated graph drawing ────────────────────────────── */

export function StepGraph({ active }: { active: boolean }) {
  const l = useT();
  const showAxes = useDelayed(active, 500);
  const showCurve = useDelayed(active, 1200);
  const showVertex = useDelayed(active, 2200);
  const showIntercepts = useDelayed(active, 3200);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.visualExplanation}</span>
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

          {/* Axes */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${showAxes ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute top-0 bottom-0 left-[58%] w-0.5 bg-gray-600" />
            <div className="absolute left-0 right-0 top-[38%] h-0.5 bg-gray-600" />
          </div>

          {/* Parabola SVG */}
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

          {/* Vertex point */}
          <div className={`absolute left-[42%] top-[82%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${showVertex ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>
            <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow" />
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-red-600 whitespace-nowrap bg-white/80 px-1 rounded">
              {l.vertex} (−2, −12)
            </span>
          </div>

          {/* x-intercepts */}
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
  const l = useT();
  const show1 = useDelayed(active, 600);
  const show2 = useDelayed(active, 1400);
  const show3 = useDelayed(active, 2200);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.conceptBreakdown}</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3">
        <div className="text-center mb-4">
          <p className="font-mono text-base font-bold text-gray-900">f(x) = 3(x + 2)² − 12</p>
          <p className="text-xs text-gray-400 mt-1">{l.vertexFormLabel}</p>
        </div>

        <div className={`bg-blue-50 p-3 rounded-lg border border-blue-200 transition-all duration-500 ${show1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <p className="text-xs font-semibold text-blue-800 mb-1">{l.vertex}</p>
          <p className="text-xs text-gray-700">h = −2, k = −12</p>
          <p className="text-xs text-gray-700">{l.vertex}: <span className="font-mono font-bold">(−2, −12)</span></p>
        </div>

        <div className={`bg-green-50 p-3 rounded-lg border border-green-200 transition-all duration-500 ${show2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <p className="text-xs font-semibold text-green-800 mb-1">{l.directionWidth}</p>
          <p className="text-xs text-gray-700">{l.directionText}</p>
          <p className="text-xs text-gray-700">{l.narrowerText}</p>
        </div>

        <div className={`bg-purple-50 p-3 rounded-lg border border-purple-200 transition-all duration-500 ${show3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <p className="text-xs font-semibold text-purple-800 mb-1">{l.xIntercepts}</p>
          <p className="text-xs text-gray-700">f(x) = 0:</p>
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
  const l = useT();
  const showTyping = useDelayed(active, 1000);
  const showResponse = useDelayed(active, 2500);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">{l.askAI}</span>
        <span className="text-blue-100 text-[10px]">{l.aboutTopic}</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* User message */}
        <div className="flex justify-end mb-3">
          <div className="bg-blue-500 text-white px-3 py-2 rounded-xl rounded-br-sm max-w-[80%]">
            <p className="text-xs">{l.userQuestion}</p>
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
                {l.aiResponse1("a")}
              </p>
              <p className="text-xs text-gray-800 leading-relaxed mt-1.5">
                {l.aiResponse2}
              </p>
              <p className="text-xs text-gray-800 leading-relaxed mt-1.5">
                {l.aiResponse3}
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
            placeholder={l.inputPlaceholder}
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
