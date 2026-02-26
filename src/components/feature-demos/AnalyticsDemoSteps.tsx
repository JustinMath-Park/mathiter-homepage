"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Locale = "en" | "ko" | "ms" | "zh";

/* ─── Locale data ──────────────────────────────────────────────── */

const t = {
  en: {
    myDashboard: "My Dashboard",
    month: "February 2026",
    stats: [
      { label: "Problems", value: "2,847", icon: "📝", color: "bg-blue-50 text-blue-700" },
      { label: "Accuracy", value: "78.3%", icon: "🎯", color: "bg-green-50 text-green-700" },
      { label: "Study Days", value: "142", icon: "📅", color: "bg-purple-50 text-purple-700" },
      { label: "Streak", value: "7 days", icon: "🔥", color: "bg-orange-50 text-orange-700" },
    ],
    levelLabel: "Level 3 — Advanced",
    xpProgress: "2,847 / 5,000 XP",
    weeklyProgress: "Weekly Progress",
    correct: "Correct",
    incorrect: "Incorrect",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    totalWeek: (n: string) => <>Total this week: <span className="font-bold text-gray-700">{n} problems</span></>,
    abilityMap: "Ability Map",
    radarTopics: [
      { name: "Algebra", score: 85 },
      { name: "Geometry", score: 72 },
      { name: "Statistics", score: 90 },
      { name: "Calculus", score: 55 },
      { name: "Number Theory", score: 68 },
      { name: "Trig", score: 78 },
    ],
    predictedScore: "Predicted Score",
    predictedSAT: "Predicted SAT Score",
    fromLastMonth: "+40 from last month",
    scoreTrend6m: "Score Trend (6 months)",
    math: "Math",
    readingWriting: "Reading & Writing",
    misconceptionTracker: "Misconception Tracker",
    misconceptionDesc: "AI tracks patterns in your mistakes to help you improve.",
    misconceptions: [
      { name: "Negative exponents", count: 8, status: "conquered" },
      { name: "Quadratic discriminant", count: 5, status: "improving" },
      { name: "Absolute value inequalities", count: 3, status: "active" },
    ],
    statusLabels: { conquered: "conquered", improving: "improving", active: "active" } as Record<string, string>,
    errors: "errors",
    whyWrong: "💡 Why you keep getting it wrong",
    whyWrongText: "You confuse |x| < a with |x| > a. Remember: less than = AND, greater than = OR.",
  },
  ko: {
    myDashboard: "내 대시보드",
    month: "2026년 2월",
    stats: [
      { label: "문제 풀이", value: "2,847", icon: "📝", color: "bg-blue-50 text-blue-700" },
      { label: "정답률", value: "78.3%", icon: "🎯", color: "bg-green-50 text-green-700" },
      { label: "학습일수", value: "142", icon: "📅", color: "bg-purple-50 text-purple-700" },
      { label: "연속 학습", value: "7일", icon: "🔥", color: "bg-orange-50 text-orange-700" },
    ],
    levelLabel: "레벨 3 — 고급",
    xpProgress: "2,847 / 5,000 XP",
    weeklyProgress: "주간 진행률",
    correct: "정답",
    incorrect: "오답",
    days: ["월", "화", "수", "목", "금", "토", "일"],
    totalWeek: (n: string) => <>이번 주 총: <span className="font-bold text-gray-700">{n} 문제</span></>,
    abilityMap: "능력치 맵",
    radarTopics: [
      { name: "대수", score: 85 },
      { name: "기하", score: 72 },
      { name: "통계", score: 90 },
      { name: "미적분", score: 55 },
      { name: "정수론", score: 68 },
      { name: "삼각함수", score: 78 },
    ],
    predictedScore: "예상 점수",
    predictedSAT: "예상 SAT 점수",
    fromLastMonth: "지난달 대비 +40",
    scoreTrend6m: "점수 추이 (6개월)",
    math: "수학",
    readingWriting: "읽기 & 쓰기",
    misconceptionTracker: "오개념 추적",
    misconceptionDesc: "AI가 실수 패턴을 분석하여 개선을 도와줍니다.",
    misconceptions: [
      { name: "음의 지수", count: 8, status: "conquered" },
      { name: "이차 판별식", count: 5, status: "improving" },
      { name: "절댓값 부등식", count: 3, status: "active" },
    ],
    statusLabels: { conquered: "정복", improving: "개선 중", active: "진행 중" } as Record<string, string>,
    errors: "오류",
    whyWrong: "💡 왜 계속 틀리는지",
    whyWrongText: "|x| < a와 |x| > a를 혼동하고 있어요. 기억하세요: 미만 = AND, 초과 = OR.",
  },
  ms: {
    myDashboard: "Papan Pemuka",
    month: "Februari 2026",
    stats: [
      { label: "Soalan", value: "2,847", icon: "📝", color: "bg-blue-50 text-blue-700" },
      { label: "Ketepatan", value: "78.3%", icon: "🎯", color: "bg-green-50 text-green-700" },
      { label: "Hari Belajar", value: "142", icon: "📅", color: "bg-purple-50 text-purple-700" },
      { label: "Berturut", value: "7 hari", icon: "🔥", color: "bg-orange-50 text-orange-700" },
    ],
    levelLabel: "Tahap 3 — Lanjutan",
    xpProgress: "2,847 / 5,000 XP",
    weeklyProgress: "Kemajuan Mingguan",
    correct: "Betul",
    incorrect: "Salah",
    days: ["Isn", "Sel", "Rab", "Kha", "Jum", "Sab", "Ahd"],
    totalWeek: (n: string) => <>Jumlah minggu ini: <span className="font-bold text-gray-700">{n} soalan</span></>,
    abilityMap: "Peta Keupayaan",
    radarTopics: [
      { name: "Algebra", score: 85 },
      { name: "Geometri", score: 72 },
      { name: "Statistik", score: 90 },
      { name: "Kalkulus", score: 55 },
      { name: "Teori Nombor", score: 68 },
      { name: "Trigonometri", score: 78 },
    ],
    predictedScore: "Skor Ramalan",
    predictedSAT: "Skor SAT Ramalan",
    fromLastMonth: "+40 dari bulan lepas",
    scoreTrend6m: "Trend Skor (6 bulan)",
    math: "Matematik",
    readingWriting: "Bacaan & Penulisan",
    misconceptionTracker: "Penjejak Salah Faham",
    misconceptionDesc: "AI mengesan corak kesilapan anda untuk membantu penambahbaikan.",
    misconceptions: [
      { name: "Eksponen negatif", count: 8, status: "conquered" },
      { name: "Diskriminan kuadratik", count: 5, status: "improving" },
      { name: "Ketaksamaan nilai mutlak", count: 3, status: "active" },
    ],
    statusLabels: { conquered: "ditakluki", improving: "bertambah baik", active: "aktif" } as Record<string, string>,
    errors: "ralat",
    whyWrong: "💡 Mengapa anda terus silap",
    whyWrongText: "Anda keliru antara |x| < a dengan |x| > a. Ingat: kurang dari = DAN, lebih dari = ATAU.",
  },
  zh: {
    myDashboard: "我的仪表盘",
    month: "2026年2月",
    stats: [
      { label: "已做题目", value: "2,847", icon: "📝", color: "bg-blue-50 text-blue-700" },
      { label: "正确率", value: "78.3%", icon: "🎯", color: "bg-green-50 text-green-700" },
      { label: "学习天数", value: "142", icon: "📅", color: "bg-purple-50 text-purple-700" },
      { label: "连续学习", value: "7天", icon: "🔥", color: "bg-orange-50 text-orange-700" },
    ],
    levelLabel: "等级 3 — 进阶",
    xpProgress: "2,847 / 5,000 XP",
    weeklyProgress: "每周进度",
    correct: "正确",
    incorrect: "错误",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    totalWeek: (n: string) => <>本周总计: <span className="font-bold text-gray-700">{n} 道题</span></>,
    abilityMap: "能力图谱",
    radarTopics: [
      { name: "代数", score: 85 },
      { name: "几何", score: 72 },
      { name: "统计", score: 90 },
      { name: "微积分", score: 55 },
      { name: "数论", score: 68 },
      { name: "三角函数", score: 78 },
    ],
    predictedScore: "预测分数",
    predictedSAT: "SAT 预测分数",
    fromLastMonth: "较上月 +40",
    scoreTrend6m: "分数趋势（6个月）",
    math: "数学",
    readingWriting: "阅读与写作",
    misconceptionTracker: "错误概念追踪",
    misconceptionDesc: "AI追踪你的错误模式，帮助你改进。",
    misconceptions: [
      { name: "负指数", count: 8, status: "conquered" },
      { name: "二次判别式", count: 5, status: "improving" },
      { name: "绝对值不等式", count: 3, status: "active" },
    ],
    statusLabels: { conquered: "已攻克", improving: "改善中", active: "进行中" } as Record<string, string>,
    errors: "次错误",
    whyWrong: "💡 为什么总是做错",
    whyWrongText: "你混淆了 |x| < a 和 |x| > a。记住：小于 = 且，大于 = 或。",
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

/* ─── Step 1: Overview stats grid ───────────────────────────────── */

export function StepOverview({ active }: { active: boolean }) {
  const l = useT();
  const showStats = useDelayed(active, 800);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.myDashboard}</span>
        <p className="text-violet-200 text-[10px]">{l.month}</p>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {l.stats.map((s, i) => (
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

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-amber-800">{l.levelLabel}</span>
            <span className="text-[10px] text-amber-600">{l.xpProgress}</span>
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
  { correct: 65, incorrect: 20 },
  { correct: 45, incorrect: 15 },
  { correct: 80, incorrect: 10 },
  { correct: 55, incorrect: 25 },
  { correct: 70, incorrect: 12 },
  { correct: 90, incorrect: 8 },
  { correct: 40, incorrect: 5 },
];

export function StepWeekly({ active }: { active: boolean }) {
  const l = useT();
  const showBars = useDelayed(active, 600);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.weeklyProgress}</span>
      </div>

      <div className="flex-1 px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span className="text-[10px] text-gray-500">{l.correct}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-400" />
            <span className="text-[10px] text-gray-500">{l.incorrect}</span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 h-[200px] px-1">
          {weeklyData.map((d, i) => {
            const maxH = 180;
            const correctH = (d.correct / 100) * maxH;
            const incorrectH = (d.incorrect / 100) * maxH;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
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
                <span className="text-[10px] text-gray-400">{l.days[i]}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">{l.totalWeek("535")}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Radar chart ───────────────────────────────────────── */

export function StepRadar({ active }: { active: boolean }) {
  const l = useT();
  const showRadar = useDelayed(active, 800);
  const showLabels = useDelayed(active, 1500);

  const radarTopics = l.radarTopics;
  const cx = 130;
  const cy = 130;
  const maxR = 90;
  const n = radarTopics.length;

  const pt = (i: number, frac: number) => {
    const angle = (i * 360) / n - 90;
    const rad = (angle * Math.PI) / 180;
    const r = frac * maxR;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const hexPoints = (frac: number) =>
    Array.from({ length: n }, (_, i) => pt(i, frac))
      .map((p) => `${p.x},${p.y}`)
      .join(" ");

  const dataPoints = radarTopics.map((tp, i) => pt(i, tp.score / 100));
  const dataPoly = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const labelR = maxR + 28;
  const labelPt = (i: number) => {
    const angle = (i * 360) / n - 90;
    const rad = (angle * Math.PI) / 180;
    return { x: cx + labelR * Math.cos(rad), y: cy + labelR * Math.sin(rad) };
  };

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.abilityMap}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-2">
        <div className={`transition-all duration-1000 ${showRadar ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          <svg width="260" height="260" viewBox="0 0 260 260">
            {[0.25, 0.5, 0.75, 1].map((frac) => (
              <polygon key={frac} points={hexPoints(frac)} fill="none" stroke="#e5e7eb" strokeWidth={1} />
            ))}
            {radarTopics.map((_, i) => {
              const p = pt(i, 1);
              return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e5e7eb" strokeWidth={1} />;
            })}
            <polygon points={dataPoly} fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth={2} />
            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={4} fill="#6366f1" stroke="white" strokeWidth={2} />
            ))}
            {showLabels &&
              radarTopics.map((tp, i) => {
                const lp = labelPt(i);
                return (
                  <text key={tp.name} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" className="text-[10px] fill-gray-600 font-medium">
                    {tp.name}
                  </text>
                );
              })}
          </svg>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-x-4 gap-y-1">
          {radarTopics.map((tp) => (
            <div key={tp.name} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${tp.score >= 80 ? "bg-green-500" : tp.score >= 60 ? "bg-amber-500" : "bg-red-400"}`} />
              <span className="text-[10px] text-gray-500">{tp.name} {tp.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4: Predicted score ───────────────────────────────────── */

export function StepPredicted({ active }: { active: boolean }) {
  const l = useT();
  const showScore = useDelayed(active, 800);
  const showTrend = useDelayed(active, 1800);
  const showBreakdown = useDelayed(active, 2800);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.predictedScore}</span>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col items-center">
        <div className={`text-center mb-4 transition-all duration-700 ${showScore ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            1,340
          </div>
          <p className="text-xs text-gray-400 mt-1">{l.predictedSAT}</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold text-green-600">{l.fromLastMonth}</span>
          </div>
        </div>

        <div className={`w-full bg-gray-50 rounded-xl p-3 border border-gray-200 mb-3 transition-all duration-500 ${showTrend ? "opacity-100" : "opacity-0"}`}>
          <p className="text-[10px] text-gray-500 mb-2">{l.scoreTrend6m}</p>
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

        <div className={`w-full space-y-2 transition-all duration-500 ${showBreakdown ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
            <span className="text-xs font-medium text-blue-800">{l.math}</span>
            <span className="text-sm font-bold text-blue-700">680</span>
          </div>
          <div className="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2">
            <span className="text-xs font-medium text-green-800">{l.readingWriting}</span>
            <span className="text-sm font-bold text-green-700">660</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 5: Misconception tracking ────────────────────────────── */

export function StepMisconception({ active }: { active: boolean }) {
  const l = useT();
  const show1 = useDelayed(active, 600);
  const show2 = useDelayed(active, 1200);
  const show3 = useDelayed(active, 1800);
  const shows = [show1, show2, show3];

  const colorMap: Record<string, string> = {
    conquered: "bg-green-100 border-green-300 text-green-800",
    improving: "bg-yellow-100 border-yellow-300 text-yellow-800",
    active: "bg-red-100 border-red-300 text-red-800",
  };
  const badgeColorMap: Record<string, string> = {
    conquered: "bg-green-200 text-green-800",
    improving: "bg-yellow-200 text-yellow-800",
    active: "bg-red-200 text-red-800",
  };
  const barColorMap: Record<string, string> = {
    conquered: "bg-green-500",
    improving: "bg-yellow-500",
    active: "bg-red-400",
  };

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.misconceptionTracker}</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <p className="text-xs text-gray-500 mb-4">{l.misconceptionDesc}</p>

        <div className="space-y-3">
          {l.misconceptions.map((m, i) => (
            <div
              key={m.name}
              className={`p-3 rounded-xl border ${colorMap[m.status]} transition-all duration-500 ${shows[i] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold">{m.name}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeColorMap[m.status]}`}>
                  {l.statusLabels[m.status]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/50 rounded-full h-1.5">
                  <div
                    className={`h-full rounded-full ${barColorMap[m.status]}`}
                    style={{ width: m.status === "conquered" ? "100%" : m.status === "improving" ? "60%" : "30%" }}
                  />
                </div>
                <span className="text-[10px]">{m.count} {l.errors}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-purple-50 p-3 rounded-xl border border-purple-200">
          <p className="text-xs font-bold text-purple-800 mb-1">{l.whyWrong}</p>
          <p className="text-[11px] text-purple-700 leading-relaxed">
            {l.whyWrongText}
          </p>
        </div>
      </div>
    </div>
  );
}
