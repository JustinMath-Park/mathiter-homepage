"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Locale = "en" | "ko" | "ms";

interface StudentData {
  name: string;
  initial: string;
  grade: string;
  level: number;
  xp: string;
  streak: string;
  mathScore: number;
  accuracy: number;
  problemsSolved: number;
  testsCompleted: number;
  scoreChange: string;
  scoreTrend: number[];
  radarValues: number[];
  radarLabels: string[];
  weakTopics: { label: string; value: number }[];
}

interface Labels {
  level: string;
  xp: string;
  streak: string;
  mathScore: string;
  accuracy: string;
  problems: string;
  tests: string;
  testUnit: string;
  scoreTrend: string;
  topicSkills: string;
  weakTopics: string;
}

const labels: Record<Locale, Labels> = {
  en: {
    level: "Level",
    xp: "XP",
    streak: "Streak",
    mathScore: "Math Score",
    accuracy: "Accuracy",
    problems: "Problems",
    tests: "Tests",
    testUnit: "",
    scoreTrend: "📈 Score Trend",
    topicSkills: "🎯 Topic Skills",
    weakTopics: "⚠️ Weak Topics",
  },
  ko: {
    level: "레벨",
    xp: "XP",
    streak: "연속 학습",
    mathScore: "수학 실력",
    accuracy: "정답률",
    problems: "문제 풀이",
    tests: "테스트",
    testUnit: "회",
    scoreTrend: "📈 수학 실력 변화",
    topicSkills: "🎯 토픽별 능력치",
    weakTopics: "⚠️ 취약 주제",
  },
  ms: {
    level: "Tahap",
    xp: "XP",
    streak: "Berturut",
    mathScore: "Skor Matematik",
    accuracy: "Ketepatan",
    problems: "Soalan",
    tests: "Ujian",
    testUnit: "",
    scoreTrend: "📈 Perubahan Skor",
    topicSkills: "🎯 Kemahiran Topik",
    weakTopics: "⚠️ Topik Lemah",
  },
};

// Shared numeric data (same across locales)
const numericData = [
  {
    level: 12,
    xp: "4,800",
    mathScore: 80,
    accuracy: 88,
    problemsSolved: 320,
    testsCompleted: 12,
    scoreTrend: [68, 65, 70, 69, 72, 71, 74, 73, 76, 75, 78, 77, 80],
    radarValues: [0.85, 0.72, 0.6, 0.78, 0.65],
    weakValues: [56, 65, 73],
  },
  {
    level: 18,
    xp: "7,200",
    mathScore: 91,
    accuracy: 94,
    problemsSolved: 580,
    testsCompleted: 24,
    scoreTrend: [83, 85, 84, 87, 86, 88, 87, 89, 88, 90, 89, 91, 91],
    radarValues: [0.92, 0.88, 0.85, 0.9, 0.78],
    weakValues: [62, 70, 75],
  },
  {
    level: 9,
    xp: "3,100",
    mathScore: 67,
    accuracy: 72,
    problemsSolved: 185,
    testsCompleted: 7,
    scoreTrend: [52, 50, 55, 54, 58, 57, 60, 59, 63, 62, 65, 64, 67],
    radarValues: [0.7, 0.55, 0.68, 0.62, 0.48],
    weakValues: [42, 48, 58],
  },
  {
    level: 15,
    xp: "5,600",
    mathScore: 85,
    accuracy: 90,
    problemsSolved: 420,
    testsCompleted: 18,
    scoreTrend: [75, 76, 74, 78, 77, 80, 79, 82, 81, 83, 82, 84, 85],
    radarValues: [0.88, 0.82, 0.9, 0.75, 0.85],
    weakValues: [58, 66, 72],
  },
  {
    level: 21,
    xp: "9,400",
    mathScore: 94,
    accuracy: 96,
    problemsSolved: 720,
    testsCompleted: 30,
    scoreTrend: [88, 89, 88, 90, 89, 91, 90, 92, 91, 93, 92, 93, 94],
    radarValues: [0.95, 0.92, 0.88, 0.94, 0.9],
    weakValues: [72, 76, 80],
  },
];

// Locale-specific text for each student
const studentText: Record<
  Locale,
  {
    name: string;
    initial: string;
    grade: string;
    streak: string;
    scoreChange: string;
    radarLabels: string[];
    weakLabels: string[];
  }[]
> = {
  en: [
    {
      name: "Jihoon Kim",
      initial: "J",
      grade: "Grade 8",
      streak: "15 days",
      scoreChange: "+12 pts ↑",
      radarLabels: ["Functions", "Equations", "Geometry", "Stats", "Probability"],
      weakLabels: ["Ratio", "Probability", "Functions"],
    },
    {
      name: "Sarah Lee",
      initial: "S",
      grade: "Year 10 · IGCSE",
      streak: "23 days",
      scoreChange: "+8 pts ↑",
      radarLabels: ["Algebra", "Geometry", "Stats", "Number", "Trig"],
      weakLabels: ["Trig", "Vectors", "Proofs"],
    },
    {
      name: "Soyeon Park",
      initial: "S",
      grade: "Grade 10",
      streak: "8 days",
      scoreChange: "+15 pts ↑",
      radarLabels: ["Functions", "Calculus", "Probability", "Vectors", "Sequences"],
      weakLabels: ["Calculus", "Sequences", "Vectors"],
    },
    {
      name: "Amir Razak",
      initial: "A",
      grade: "Form 4 · SPM",
      streak: "31 days",
      scoreChange: "+10 pts ↑",
      radarLabels: ["Algebra", "Graphs", "Stats", "Calculus", "Geometry"],
      weakLabels: ["Calculus", "Proofs", "Graphs"],
    },
    {
      name: "Haeun Lee",
      initial: "H",
      grade: "Grade 11 · IB Math",
      streak: "42 days",
      scoreChange: "+6 pts ↑",
      radarLabels: ["Functions", "Calculus", "Probability", "Vectors", "Sequences"],
      weakLabels: ["Integrals", "Complex", "Vectors"],
    },
  ],
  ko: [
    {
      name: "김지훈",
      initial: "김",
      grade: "중학교 2학년",
      streak: "15일",
      scoreChange: "+12점 ↑",
      radarLabels: ["함수", "방정식", "도형", "통계", "확률"],
      weakLabels: ["비례", "확률", "함수"],
    },
    {
      name: "Sarah Lee",
      initial: "S",
      grade: "Year 10 · IGCSE",
      streak: "23일",
      scoreChange: "+8점 ↑",
      radarLabels: ["대수", "기하", "통계", "수", "삼각함수"],
      weakLabels: ["삼각함수", "벡터", "증명"],
    },
    {
      name: "박소연",
      initial: "박",
      grade: "고등학교 1학년",
      streak: "8일",
      scoreChange: "+15점 ↑",
      radarLabels: ["함수", "미적분", "확률", "벡터", "수열"],
      weakLabels: ["미적분", "수열", "벡터"],
    },
    {
      name: "Amir Razak",
      initial: "A",
      grade: "Form 4 · SPM",
      streak: "31일",
      scoreChange: "+10점 ↑",
      radarLabels: ["대수", "그래프", "통계", "미적분", "기하"],
      weakLabels: ["미적분", "증명", "그래프"],
    },
    {
      name: "이하은",
      initial: "이",
      grade: "Grade 11 · IB Math",
      streak: "42일",
      scoreChange: "+6점 ↑",
      radarLabels: ["함수", "미적분", "확률", "벡터", "수열"],
      weakLabels: ["적분", "복소수", "벡터"],
    },
  ],
  ms: [
    {
      name: "Kim Ji-hoon",
      initial: "K",
      grade: "Tingkatan 2",
      streak: "15 hari",
      scoreChange: "+12 mata ↑",
      radarLabels: ["Fungsi", "Persamaan", "Geometri", "Statistik", "Kebarangkalian"],
      weakLabels: ["Nisbah", "Kebarangkalian", "Fungsi"],
    },
    {
      name: "Sarah Lee",
      initial: "S",
      grade: "Year 10 · IGCSE",
      streak: "23 hari",
      scoreChange: "+8 mata ↑",
      radarLabels: ["Algebra", "Geometri", "Statistik", "Nombor", "Trigonometri"],
      weakLabels: ["Trigonometri", "Vektor", "Bukti"],
    },
    {
      name: "Park So-yeon",
      initial: "P",
      grade: "Tingkatan 4",
      streak: "8 hari",
      scoreChange: "+15 mata ↑",
      radarLabels: ["Fungsi", "Kalkulus", "Kebarangkalian", "Vektor", "Jujukan"],
      weakLabels: ["Kalkulus", "Jujukan", "Vektor"],
    },
    {
      name: "Amir Razak",
      initial: "A",
      grade: "Tingkatan 4 · SPM",
      streak: "31 hari",
      scoreChange: "+10 mata ↑",
      radarLabels: ["Algebra", "Graf", "Statistik", "Kalkulus", "Geometri"],
      weakLabels: ["Kalkulus", "Bukti", "Graf"],
    },
    {
      name: "Lee Ha-eun",
      initial: "L",
      grade: "Grade 11 · IB Math",
      streak: "42 hari",
      scoreChange: "+6 mata ↑",
      radarLabels: ["Fungsi", "Kalkulus", "Kebarangkalian", "Vektor", "Jujukan"],
      weakLabels: ["Kamiran", "Kompleks", "Vektor"],
    },
  ],
};

function buildStudents(locale: Locale): StudentData[] {
  const texts = studentText[locale];
  return numericData.map((num, i) => ({
    name: texts[i].name,
    initial: texts[i].initial,
    grade: texts[i].grade,
    level: num.level,
    xp: num.xp,
    streak: texts[i].streak,
    mathScore: num.mathScore,
    accuracy: num.accuracy,
    problemsSolved: num.problemsSolved,
    testsCompleted: num.testsCompleted,
    scoreChange: texts[i].scoreChange,
    scoreTrend: num.scoreTrend,
    radarValues: num.radarValues,
    radarLabels: texts[i].radarLabels,
    weakTopics: texts[i].weakLabels.map((label, j) => ({
      label,
      value: num.weakValues[j],
    })),
  }));
}

const ROTATE_INTERVAL = 5000;

export default function DashboardMockup() {
  const locale = useLocale() as Locale;
  const l = labels[locale] || labels.en;
  const students = buildStudents(locale);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [animated, setAnimated] = useState(false);

  const rotateStudent = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % students.length);
      setAnimated(false);
      setFading(false);
      setTimeout(() => setAnimated(true), 100);
    }, 400);
  }, [students.length]);

  useEffect(() => {
    const initTimer = setTimeout(() => setAnimated(true), 600);
    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(rotateStudent, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [rotateStudent]);

  const student = students[currentIndex];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-60" />

      <div
        className={`relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-opacity duration-400 ${fading ? "opacity-0" : "opacity-100"}`}
      >
        {/* Top bar */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
              {student.initial}
            </div>
            <div>
              <div className="text-white text-sm font-semibold">
                {student.name}
              </div>
              <div className="text-blue-100 text-[10px]">{student.grade}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white text-[10px]">
            <div className="text-center">
              <div className="font-bold text-sm">{student.level}</div>
              <div className="text-blue-100">{l.level}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-sm">{student.xp}</div>
              <div className="text-blue-100">{l.xp}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-sm">{student.streak}</div>
              <div className="text-blue-100">{l.streak}</div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-0 border-b border-gray-100">
          <StatCard
            label={l.mathScore}
            value={String(student.mathScore)}
            unit="/100"
            color="text-indigo-600"
            animated={animated}
          />
          <StatCard
            label={l.accuracy}
            value={String(student.accuracy)}
            unit="%"
            color="text-emerald-600"
            animated={animated}
          />
          <StatCard
            label={l.problems}
            value={String(student.problemsSolved)}
            unit=""
            color="text-blue-600"
            animated={animated}
          />
          <StatCard
            label={l.tests}
            value={String(student.testsCompleted)}
            unit={l.testUnit}
            color="text-purple-600"
            animated={animated}
          />
        </div>

        {/* Charts area */}
        <div className="p-4 space-y-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-gray-700">
                {l.scoreTrend}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                {student.scoreChange}
              </span>
            </div>
            <MiniLineChart
              points={student.scoreTrend}
              animated={animated}
              id={currentIndex}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <span className="text-[11px] font-semibold text-gray-700">
                {l.topicSkills}
              </span>
              <MiniRadarChart
                values={student.radarValues}
                labels={student.radarLabels}
                animated={animated}
                id={currentIndex}
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <span className="text-[11px] font-semibold text-gray-700">
                {l.weakTopics}
              </span>
              <div className="mt-2 space-y-1.5">
                {student.weakTopics.map((topic, i) => (
                  <WeakTopicBar
                    key={`${currentIndex}-${topic.label}`}
                    label={topic.label}
                    value={topic.value}
                    animated={animated}
                    delay={i * 100}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 pb-3">
          {students.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-4 bg-indigo-500"
                  : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  color,
  animated,
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
  animated: boolean;
}) {
  return (
    <div className="text-center py-3 border-r border-gray-100 last:border-r-0">
      <div
        className={`text-lg font-bold ${color} transition-all duration-700 ${animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        {value}
        <span className="text-[10px] font-normal text-gray-400">{unit}</span>
      </div>
      <div className="text-[10px] text-gray-500">{label}</div>
    </div>
  );
}

function MiniLineChart({
  points,
  animated,
  id,
}: {
  points: number[];
  animated: boolean;
  id: number;
}) {
  const width = 280;
  const height = 48;
  const padding = 4;
  const min = Math.min(...points) - 5;
  const max = Math.max(...points) + 5;

  const getX = (i: number) =>
    padding + (i / (points.length - 1)) * (width - padding * 2);
  const getY = (v: number) =>
    height - padding - ((v - min) / (max - min)) * (height - padding * 2);

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(p)}`)
    .join(" ");
  const areaD = `${pathD} L ${getX(points.length - 1)} ${height} L ${getX(0)} ${height} Z`;
  const gradId = `lineGrad-${id}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full transition-opacity duration-1000 ${animated ? "opacity-100" : "opacity-0"}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradId})`} />
      <path
        d={pathD}
        fill="none"
        stroke="#4f46e5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={getX(points.length - 1)}
        cy={getY(points[points.length - 1])}
        r="3"
        fill="#4f46e5"
        className={`transition-opacity duration-1000 delay-500 ${animated ? "opacity-100" : "opacity-0"}`}
      />
    </svg>
  );
}

function MiniRadarChart({
  values,
  labels,
  animated,
  id,
}: {
  values: number[];
  labels: string[];
  animated: boolean;
  id: number;
}) {
  const size = 100;
  const center = size / 2;
  const radius = 35;
  const levels = 3;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    return {
      x: center + Math.cos(angle) * radius * value,
      y: center + Math.sin(angle) * radius * value,
    };
  };

  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const scale = (level + 1) / levels;
    return (
      labels
        .map((_, i) => {
          const p = getPoint(i, scale);
          return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
        })
        .join(" ") + " Z"
    );
  });

  const dataPath =
    values
      .map((v, i) => {
        const p = getPoint(i, v);
        return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
      })
      .join(" ") + " Z";

  return (
    <svg
      key={id}
      viewBox={`0 0 ${size} ${size}`}
      className={`w-full mt-1 transition-opacity duration-1000 ${animated ? "opacity-100" : "opacity-0"}`}
    >
      {gridPaths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
      ))}
      <path
        d={dataPath}
        fill="#4f46e5"
        fillOpacity="0.15"
        stroke="#4f46e5"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {labels.map((cat, i) => {
        const p = getPoint(i, 1.25);
        return (
          <text
            key={cat}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-500"
            fontSize="6"
          >
            {cat}
          </text>
        );
      })}
      {values.map((v, i) => {
        const p = getPoint(i, v);
        return <circle key={i} cx={p.x} cy={p.y} r="2" fill="#4f46e5" />;
      })}
    </svg>
  );
}

function WeakTopicBar({
  label,
  value,
  animated,
  delay,
}: {
  label: string;
  value: number;
  animated: boolean;
  delay: number;
}) {
  const color =
    value < 60
      ? "bg-red-400"
      : value < 70
        ? "bg-orange-400"
        : "bg-yellow-400";

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-gray-600 w-8 shrink-0 truncate">
        {label}
      </span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{
            width: animated ? `${value}%` : "0%",
            transitionDelay: `${delay + 300}ms`,
          }}
        />
      </div>
      <span className="text-[10px] font-medium text-gray-600 w-7 text-right">
        {value}%
      </span>
    </div>
  );
}
