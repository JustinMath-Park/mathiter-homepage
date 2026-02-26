"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Locale = "en" | "ko" | "ms" | "zh";

/* ─── Locale data ──────────────────────────────────────────────── */

const t = {
  en: {
    examPractice: "Exam Practice",
    chooseExam: "Choose Your Exam",
    practiceUnder: "Practice under real exam conditions",
    exams: [
      { name: "Digital SAT", desc: "Math + Reading & Writing" },
      { name: "IGCSE Math", desc: "Extended Paper 2 & 4" },
      { name: "IB Math AA", desc: "SL & HL Papers" },
      { name: "AP Calculus", desc: "AB & BC Exams" },
    ],
    startPractice: "Start Practice Exam →",
    satMathModule1: "SAT Math · Module 1",
    question: "Question",
    flag: "🚩 Flag",
    calc: "🧮 Calc",
    ref: "📐 Ref",
    prev: "← Prev",
    next: "Next →",
    calculator: "📟 Calculator",
    referenceSheet: "📐 Reference Sheet",
    circle: "Circle",
    rectangle: "Rectangle",
    triangle: "Triangle",
    pythagorean: "Pythagorean",
    satModule2Hard: "SAT Math · Module 2 (Hard)",
    module1Complete: "Module 1 Complete!",
    correctOf: "18 / 22 correct",
    adjustingDifficulty: "Based on your performance, Module 2 difficulty is being adjusted...",
    module2Hard: "Module 2 — Hard",
    scoredWell: "You scored well! Difficulty increased.",
    module1Label: "Module 1",
    standard: "Standard",
    module2Label: "Module 2",
    hard: "Hard",
    realSATNote: "This is exactly how the real SAT works.",
    examResults: "Exam Results",
    predictedSATScore: "Predicted SAT Score",
    topicBreakdown: "Topic Breakdown",
    topics: [
      { name: "Algebra", score: 92 },
      { name: "Geometry", score: 78 },
      { name: "Statistics", score: 85 },
      { name: "Advanced Math", score: 70 },
    ],
    reviewWrong: "Review Wrong Answers (8)",
    exportReport: "Export Report",
  },
  ko: {
    examPractice: "시험 연습",
    chooseExam: "시험을 선택하세요",
    practiceUnder: "실제 시험 환경에서 연습하세요",
    exams: [
      { name: "Digital SAT", desc: "수학 + 읽기 & 쓰기" },
      { name: "IGCSE Math", desc: "확장 Paper 2 & 4" },
      { name: "IB Math AA", desc: "SL & HL Papers" },
      { name: "AP Calculus", desc: "AB & BC 시험" },
    ],
    startPractice: "모의시험 시작 →",
    satMathModule1: "SAT 수학 · 모듈 1",
    question: "문제",
    flag: "🚩 표시",
    calc: "🧮 계산기",
    ref: "📐 공식",
    prev: "← 이전",
    next: "다음 →",
    calculator: "📟 계산기",
    referenceSheet: "📐 공식 시트",
    circle: "원",
    rectangle: "직사각형",
    triangle: "삼각형",
    pythagorean: "피타고라스",
    satModule2Hard: "SAT 수학 · 모듈 2 (어려움)",
    module1Complete: "모듈 1 완료!",
    correctOf: "22문제 중 18개 정답",
    adjustingDifficulty: "성적에 따라 모듈 2 난이도가 조정 중입니다...",
    module2Hard: "모듈 2 — 어려움",
    scoredWell: "잘하셨어요! 난이도가 올라갑니다.",
    module1Label: "모듈 1",
    standard: "표준",
    module2Label: "모듈 2",
    hard: "어려움",
    realSATNote: "실제 SAT도 이렇게 진행됩니다.",
    examResults: "시험 결과",
    predictedSATScore: "예상 SAT 점수",
    topicBreakdown: "주제별 분석",
    topics: [
      { name: "대수", score: 92 },
      { name: "기하", score: 78 },
      { name: "통계", score: 85 },
      { name: "심화 수학", score: 70 },
    ],
    reviewWrong: "오답 확인 (8개)",
    exportReport: "리포트 내보내기",
  },
  ms: {
    examPractice: "Latihan Peperiksaan",
    chooseExam: "Pilih Peperiksaan Anda",
    practiceUnder: "Latihan dalam keadaan sebenar",
    exams: [
      { name: "Digital SAT", desc: "Matematik + Bacaan & Penulisan" },
      { name: "IGCSE Math", desc: "Kertas Lanjutan 2 & 4" },
      { name: "IB Math AA", desc: "Kertas SL & HL" },
      { name: "AP Calculus", desc: "Peperiksaan AB & BC" },
    ],
    startPractice: "Mula Latihan →",
    satMathModule1: "SAT Matematik · Modul 1",
    question: "Soalan",
    flag: "🚩 Tanda",
    calc: "🧮 Kira",
    ref: "📐 Rujukan",
    prev: "← Sebelum",
    next: "Seterusnya →",
    calculator: "📟 Kalkulator",
    referenceSheet: "📐 Helaian Rujukan",
    circle: "Bulatan",
    rectangle: "Segi Empat",
    triangle: "Segitiga",
    pythagorean: "Pythagoras",
    satModule2Hard: "SAT Matematik · Modul 2 (Sukar)",
    module1Complete: "Modul 1 Selesai!",
    correctOf: "18 / 22 betul",
    adjustingDifficulty: "Berdasarkan prestasi anda, kesukaran Modul 2 sedang diselaraskan...",
    module2Hard: "Modul 2 — Sukar",
    scoredWell: "Anda hebat! Kesukaran meningkat.",
    module1Label: "Modul 1",
    standard: "Standard",
    module2Label: "Modul 2",
    hard: "Sukar",
    realSATNote: "Ini tepat seperti SAT sebenar.",
    examResults: "Keputusan Peperiksaan",
    predictedSATScore: "Skor SAT Ramalan",
    topicBreakdown: "Pecahan Topik",
    topics: [
      { name: "Algebra", score: 92 },
      { name: "Geometri", score: 78 },
      { name: "Statistik", score: 85 },
      { name: "Matematik Lanjutan", score: 70 },
    ],
    reviewWrong: "Semak Jawapan Salah (8)",
    exportReport: "Eksport Laporan",
  },
  zh: {
    examPractice: "考试练习",
    chooseExam: "选择你的考试",
    practiceUnder: "在真实考试环境下练习",
    exams: [
      { name: "Digital SAT", desc: "数学 + 阅读与写作" },
      { name: "IGCSE Math", desc: "拓展卷 2 & 4" },
      { name: "IB Math AA", desc: "SL & HL 试卷" },
      { name: "AP Calculus", desc: "AB & BC 考试" },
    ],
    startPractice: "开始模拟考试 →",
    satMathModule1: "SAT 数学 · 模块 1",
    question: "题目",
    flag: "🚩 标记",
    calc: "🧮 计算器",
    ref: "📐 公式",
    prev: "← 上一题",
    next: "下一题 →",
    calculator: "📟 计算器",
    referenceSheet: "📐 参考公式表",
    circle: "圆",
    rectangle: "矩形",
    triangle: "三角形",
    pythagorean: "勾股定理",
    satModule2Hard: "SAT 数学 · 模块 2（困难）",
    module1Complete: "模块 1 完成！",
    correctOf: "22题中答对18题",
    adjustingDifficulty: "根据你的表现，模块 2 难度正在调整...",
    module2Hard: "模块 2 — 困难",
    scoredWell: "表现很好！难度已提升。",
    module1Label: "模块 1",
    standard: "标准",
    module2Label: "模块 2",
    hard: "困难",
    realSATNote: "这正是真正的 SAT 考试方式。",
    examResults: "考试结果",
    predictedSATScore: "SAT 预测分数",
    topicBreakdown: "主题分析",
    topics: [
      { name: "代数", score: 92 },
      { name: "几何", score: 78 },
      { name: "统计", score: 85 },
      { name: "高级数学", score: 70 },
    ],
    reviewWrong: "查看错题 (8题)",
    exportReport: "导出报告",
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

/* ─── Step 1: Exam selection ────────────────────────────────────── */

const examIcons = ["📝", "📐", "📊", "∫"];

export function StepSelect({ active }: { active: boolean }) {
  const l = useT();
  const highlight = useDelayed(active, 1200);
  const showCheck = useDelayed(active, 2200);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.examPractice}</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <h3 className="text-base font-bold text-gray-900 mb-1">{l.chooseExam}</h3>
        <p className="text-xs text-gray-500 mb-4">{l.practiceUnder}</p>

        <div className="space-y-2.5">
          {l.exams.map((e, i) => {
            const isFirst = i === 0;
            const isActive = isFirst && highlight;
            const checked = isFirst && showCheck;
            return (
              <div
                key={e.name}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-500 ${
                  checked
                    ? "border-orange-500 bg-orange-50 shadow-md"
                    : isActive
                      ? "border-orange-300 bg-orange-50/50"
                      : "border-gray-200 bg-white"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                  checked ? "bg-orange-500 text-white" : "bg-gray-100"
                }`}>
                  {examIcons[i]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{e.name}</p>
                  <p className="text-[10px] text-gray-500">{e.desc}</p>
                </div>
                {checked && (
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {showCheck && (
          <button className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium text-sm shadow-lg">
            {l.startPractice}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Step 2: Exam interface ────────────────────────────────────── */

export function StepExam({ active }: { active: boolean }) {
  const l = useT();
  const selectAnswer = useDelayed(active, 2000);
  const showConfirm = useDelayed(active, 3500);

  const qStates = [
    "ans", "ans", "ans", "ans", "cur", "un", "un", "un", "flag", "un", "un",
    "un", "un", "un", "un", "un", "un", "un", "un", "un", "un", "un",
  ];

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 flex items-center justify-between">
        <span className="text-white font-semibold text-xs">{l.satMathModule1}</span>
        <div className="flex items-center gap-2 text-white">
          <span className="font-mono font-bold text-xs bg-white/20 px-2 py-0.5 rounded">28:45</span>
          <span className="text-blue-200 text-[10px]">5 / 22</span>
        </div>
      </div>

      <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap gap-1">
          {qStates.map((s, i) => (
            <div
              key={i}
              className={`w-[28px] h-[28px] rounded text-[10px] font-bold flex items-center justify-center ${
                s === "ans" ? "bg-green-500 text-white"
                : s === "cur" ? "bg-blue-600 text-white ring-2 ring-blue-300"
                : s === "flag" ? "bg-orange-400 text-white"
                : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-3 overflow-y-auto">
        <div className="text-[10px] text-gray-400 mb-2">{l.question} 5</div>
        <p className="text-sm text-gray-800 leading-relaxed mb-4">
          A function <span className="font-mono">f</span> is defined as{" "}
          <span className="font-mono font-semibold text-indigo-700">f(x) = 3(x + 2)² − 12</span>.
          What is the minimum value of f(x)?
        </p>

        <div className="space-y-2">
          {[
            { letter: "A", value: "−12" },
            { letter: "B", value: "−6" },
            { letter: "C", value: "2" },
            { letter: "D", value: "12" },
          ].map((c) => {
            const isA = c.letter === "A";
            const isSelected = isA && selectAnswer;
            return (
              <div
                key={c.letter}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg border-2 transition-all duration-500 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 ring-1 ring-blue-300"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 text-gray-400"
                }`}>
                  {c.letter}
                </div>
                <span className={`text-sm ${isSelected ? "text-blue-700 font-medium" : "text-gray-700"}`}>{c.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-3 py-2 border-t border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-[10px] text-gray-500 flex items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100">{l.flag}</button>
          <button className="text-[10px] text-gray-500 flex items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100">{l.calc}</button>
          <button className="text-[10px] text-gray-500 flex items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100">{l.ref}</button>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="text-[10px] text-gray-500 px-2 py-1 rounded hover:bg-gray-100">{l.prev}</button>
          <button className={`text-[10px] px-3 py-1 rounded font-medium transition-all duration-300 ${
            showConfirm ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
          }`}>{l.next}</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Exam tools ────────────────────────────────────────── */

export function StepTools({ active }: { active: boolean }) {
  const l = useT();
  const showCalc = useDelayed(active, 800);
  const showRef = useDelayed(active, 2500);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 flex items-center justify-between">
        <span className="text-white font-semibold text-xs">{l.satMathModule1}</span>
        <span className="font-mono font-bold text-xs text-white bg-white/20 px-2 py-0.5 rounded">25:12</span>
      </div>

      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gray-100 opacity-30" />

        {showCalc && !showRef && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 w-[260px] shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-700">{l.calculator}</span>
                <button className="text-gray-400 text-xs">✕</button>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 mb-3">
                <p className="text-right text-white font-mono text-lg">3(2+2)²-12</p>
                <p className="text-right text-green-400 font-mono text-2xl font-bold mt-1">= 36</p>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {["7","8","9","÷","4","5","6","×","1","2","3","−","0",".","=","+"].map(k => (
                  <button key={k} className={`py-2 rounded text-xs font-medium ${
                    "÷×−+=".includes(k) ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-700"
                  }`}>{k}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {showRef && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 w-[280px] shadow-2xl max-h-[90%] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-700">{l.referenceSheet}</span>
                <button className="text-gray-400 text-xs">✕</button>
              </div>
              <div className="space-y-3 text-xs">
                <div className="bg-blue-50 p-2.5 rounded-lg">
                  <p className="font-bold text-blue-800 mb-1">{l.circle}</p>
                  <p className="font-mono text-gray-700">A = πr²</p>
                  <p className="font-mono text-gray-700">C = 2πr</p>
                </div>
                <div className="bg-green-50 p-2.5 rounded-lg">
                  <p className="font-bold text-green-800 mb-1">{l.rectangle}</p>
                  <p className="font-mono text-gray-700">A = ℓw</p>
                  <p className="font-mono text-gray-700">P = 2(ℓ + w)</p>
                </div>
                <div className="bg-purple-50 p-2.5 rounded-lg">
                  <p className="font-bold text-purple-800 mb-1">{l.triangle}</p>
                  <p className="font-mono text-gray-700">A = ½bh</p>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-lg">
                  <p className="font-bold text-amber-800 mb-1">{l.pythagorean}</p>
                  <p className="font-mono text-gray-700">a² + b² = c²</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-gray-200 bg-white flex items-center gap-2">
        <button className={`text-[10px] flex items-center gap-0.5 px-2 py-1 rounded ${showCalc && !showRef ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-500"}`}>{l.calc}</button>
        <button className={`text-[10px] flex items-center gap-0.5 px-2 py-1 rounded ${showRef ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-500"}`}>{l.ref}</button>
        <button className="text-[10px] text-gray-500 flex items-center gap-0.5 px-2 py-1 rounded">{l.flag}</button>
      </div>
    </div>
  );
}

/* ─── Step 4: Adaptive module transition ────────────────────────── */

export function StepAdaptive({ active }: { active: boolean }) {
  const l = useT();
  const showComplete = useDelayed(active, 500);
  const showTransition = useDelayed(active, 1800);
  const showModule2 = useDelayed(active, 3200);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2">
        <span className="text-white font-semibold text-xs">
          {showModule2 ? l.satModule2Hard : l.satMathModule1}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {showComplete && !showModule2 && (
          <div className={`text-center transition-all duration-700 ${showTransition ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}>
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{l.module1Complete}</h3>
            <p className="text-xs text-gray-500 mt-2">{l.correctOf}</p>
            <div className="mt-4 bg-blue-50 rounded-xl p-3 border border-blue-200">
              <p className="text-xs text-blue-800">{l.adjustingDifficulty}</p>
              <div className="mt-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}

        {showModule2 && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{l.module2Hard}</h3>
            <p className="text-xs text-gray-500 mt-2">{l.scoredWell}</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="bg-green-50 rounded-lg px-3 py-2 border border-green-200">
                <p className="text-[10px] text-green-600">{l.module1Label}</p>
                <p className="text-sm font-bold text-green-700">{l.standard}</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="bg-orange-50 rounded-lg px-3 py-2 border border-orange-200">
                <p className="text-[10px] text-orange-600">{l.module2Label}</p>
                <p className="text-sm font-bold text-orange-700">{l.hard}</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-4">{l.realSATNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Step 5: Results screen ────────────────────────────────────── */

export function StepResults({ active }: { active: boolean }) {
  const l = useT();
  const showScore = useDelayed(active, 600);
  const showTopics = useDelayed(active, 1600);
  const showActions = useDelayed(active, 2800);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.examResults}</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className={`bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 text-white text-center mb-4 transition-all duration-700 ${showScore ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <p className="text-xs text-blue-200">{l.predictedSATScore}</p>
          <p className="text-4xl font-bold mt-1">1,340</p>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs">
            <span>Math: 680</span>
            <span className="text-blue-300">|</span>
            <span>R&W: 660</span>
          </div>
        </div>

        <div className={`space-y-2.5 transition-all duration-500 ${showTopics ? "opacity-100" : "opacity-0"}`}>
          <p className="text-xs font-bold text-gray-700">{l.topicBreakdown}</p>
          {l.topics.map((tp) => (
            <div key={tp.name}>
              <div className="flex items-center justify-between text-[10px] mb-0.5">
                <span className="text-gray-600">{tp.name}</span>
                <span className="font-bold text-gray-700">{tp.score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    tp.score >= 85 ? "bg-green-500" : tp.score >= 70 ? "bg-amber-500" : "bg-red-400"
                  }`}
                  style={{ width: `${tp.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-4 space-y-2 transition-all duration-500 ${showActions ? "opacity-100" : "opacity-0"}`}>
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-medium">
            {l.reviewWrong}
          </button>
          <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
            {l.exportReport}
          </button>
        </div>
      </div>
    </div>
  );
}
