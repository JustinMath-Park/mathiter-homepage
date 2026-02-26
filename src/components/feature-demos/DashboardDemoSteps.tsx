"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Locale = "en" | "ko" | "ms" | "zh";

/* ─── Locale data ──────────────────────────────────────────────── */

const t = {
  en: {
    teacherDashboard: "Teacher Dashboard",
    classLabel: "Class 3-A · Math",
    summaryCards: [
      { label: "Students", icon: "👥", gradient: "from-blue-500 to-blue-600" },
      { label: "Avg Accuracy", icon: "🎯", gradient: "from-green-500 to-emerald-600" },
      { label: "Avg Level", icon: "📈", gradient: "from-purple-500 to-violet-600" },
      { label: "Active/Week", icon: "📊", gradient: "from-orange-500 to-red-500" },
    ],
    recentActivity: "Recent Activity",
    viewAll: "View all →",
    activities: [
      { name: "Minho K.", emoji: "🧒", action: "Completed 15 problems", time: "2m ago" },
      { name: "Sarah L.", emoji: "👧", action: "Started exam practice", time: "5m ago" },
      { name: "Jun W.", emoji: "👦", action: "Earned Gold card", time: "12m ago" },
    ],
    studentProfile: "Student Profile",
    active: "Active",
    lastActive: "Last active: 2m ago",
    dayStreak: "Day Streak",
    accuracy: "Accuracy",
    problems: "Problems",
    thisWeek: "This Week",
    dayLabels: ["M", "T", "W", "T", "F", "S", "S"],
    createAssignment: "Create Assignment",
    title: "Title",
    quizTitle: "Quadratic Functions Quiz",
    topic: "Topic",
    topicValue: "Algebra II — Quadratics",
    questions: "Questions",
    difficulty: "Difficulty",
    mixed: "Mixed",
    aiSuggestion: "🤖 AI Suggestion",
    aiSuggestionText: "Based on class performance, I recommend including 3 discriminant problems — 40% of students struggle with this topic.",
    applyAIMix: "Apply AI Mix",
    assignmentCreated: "Assignment Created!",
    sentTo: "Sent to 32 students",
    autoGrading: "Auto-grading enabled",
    assignmentResults: "Assignment Results",
    quadraticQuiz: "Quadratic Quiz",
    student: "Student",
    score: "Score",
    classAverage: "Class Average",
    exportExcel: "📊 Export to Excel",
    parentView: "Parent View",
    minhoProgress: "Minho's Progress",
    predictedSAT: "Predicted SAT",
    weeklyLearning: "This Week's Learning",
    weeklyTopics: [
      { topic: "Quadratic Functions", problems: 45, accuracy: 85 },
      { topic: "Linear Equations", problems: 30, accuracy: 92 },
      { topic: "Statistics", problems: 20, accuracy: 78 },
    ],
    problemsLabel: "problems",
    scoreIncrease: (pts: string) => <>Minho&apos;s predicted score increased <span className="font-bold">{pts}</span> this month!</>,
  },
  ko: {
    teacherDashboard: "교사 대시보드",
    classLabel: "3-A반 · 수학",
    summaryCards: [
      { label: "학생 수", icon: "👥", gradient: "from-blue-500 to-blue-600" },
      { label: "평균 정답률", icon: "🎯", gradient: "from-green-500 to-emerald-600" },
      { label: "평균 레벨", icon: "📈", gradient: "from-purple-500 to-violet-600" },
      { label: "주간 활동", icon: "📊", gradient: "from-orange-500 to-red-500" },
    ],
    recentActivity: "최근 활동",
    viewAll: "전체 보기 →",
    activities: [
      { name: "김민호", emoji: "🧒", action: "15문제 완료", time: "2분 전" },
      { name: "Sarah L.", emoji: "👧", action: "시험 연습 시작", time: "5분 전" },
      { name: "정우", emoji: "👦", action: "골드 카드 획득", time: "12분 전" },
    ],
    studentProfile: "학생 프로필",
    active: "활동 중",
    lastActive: "최근 활동: 2분 전",
    dayStreak: "연속 학습",
    accuracy: "정답률",
    problems: "문제 풀이",
    thisWeek: "이번 주",
    dayLabels: ["월", "화", "수", "목", "금", "토", "일"],
    createAssignment: "과제 생성",
    title: "제목",
    quizTitle: "이차함수 퀴즈",
    topic: "주제",
    topicValue: "대수 II — 이차식",
    questions: "문제 수",
    difficulty: "난이도",
    mixed: "혼합",
    aiSuggestion: "🤖 AI 추천",
    aiSuggestionText: "학급 성적 분석 결과, 판별식 문제 3개를 포함하는 것을 추천합니다 — 40%의 학생이 이 주제에 어려움을 겪고 있습니다.",
    applyAIMix: "AI 구성 적용",
    assignmentCreated: "과제가 생성되었습니다!",
    sentTo: "32명의 학생에게 전송됨",
    autoGrading: "자동 채점 활성화",
    assignmentResults: "과제 결과",
    quadraticQuiz: "이차식 퀴즈",
    student: "학생",
    score: "점수",
    classAverage: "학급 평균",
    exportExcel: "📊 엑셀로 내보내기",
    parentView: "학부모 뷰",
    minhoProgress: "민호의 학습 현황",
    predictedSAT: "예상 SAT",
    weeklyLearning: "이번 주 학습",
    weeklyTopics: [
      { topic: "이차함수", problems: 45, accuracy: 85 },
      { topic: "일차방정식", problems: 30, accuracy: 92 },
      { topic: "통계", problems: 20, accuracy: 78 },
    ],
    problemsLabel: "문제",
    scoreIncrease: (pts: string) => <>민호의 예상 점수가 이번 달 <span className="font-bold">{pts}</span> 올랐습니다!</>,
  },
  ms: {
    teacherDashboard: "Papan Pemuka Guru",
    classLabel: "Kelas 3-A · Matematik",
    summaryCards: [
      { label: "Pelajar", icon: "👥", gradient: "from-blue-500 to-blue-600" },
      { label: "Purata Ketepatan", icon: "🎯", gradient: "from-green-500 to-emerald-600" },
      { label: "Purata Tahap", icon: "📈", gradient: "from-purple-500 to-violet-600" },
      { label: "Aktif/Minggu", icon: "📊", gradient: "from-orange-500 to-red-500" },
    ],
    recentActivity: "Aktiviti Terkini",
    viewAll: "Lihat semua →",
    activities: [
      { name: "Minho K.", emoji: "🧒", action: "Selesaikan 15 soalan", time: "2m lalu" },
      { name: "Sarah L.", emoji: "👧", action: "Mulakan latihan peperiksaan", time: "5m lalu" },
      { name: "Jun W.", emoji: "👦", action: "Peroleh kad Emas", time: "12m lalu" },
    ],
    studentProfile: "Profil Pelajar",
    active: "Aktif",
    lastActive: "Aktif terakhir: 2m lalu",
    dayStreak: "Hari Berturut",
    accuracy: "Ketepatan",
    problems: "Soalan",
    thisWeek: "Minggu Ini",
    dayLabels: ["I", "S", "R", "K", "J", "S", "A"],
    createAssignment: "Cipta Tugasan",
    title: "Tajuk",
    quizTitle: "Kuiz Fungsi Kuadratik",
    topic: "Topik",
    topicValue: "Algebra II — Kuadratik",
    questions: "Soalan",
    difficulty: "Kesukaran",
    mixed: "Campuran",
    aiSuggestion: "🤖 Cadangan AI",
    aiSuggestionText: "Berdasarkan prestasi kelas, saya cadangkan 3 soalan diskriminan — 40% pelajar lemah dalam topik ini.",
    applyAIMix: "Guna Cadangan AI",
    assignmentCreated: "Tugasan Dicipta!",
    sentTo: "Dihantar kepada 32 pelajar",
    autoGrading: "Pemarkahan automatik aktif",
    assignmentResults: "Keputusan Tugasan",
    quadraticQuiz: "Kuiz Kuadratik",
    student: "Pelajar",
    score: "Skor",
    classAverage: "Purata Kelas",
    exportExcel: "📊 Eksport ke Excel",
    parentView: "Paparan Ibu Bapa",
    minhoProgress: "Kemajuan Minho",
    predictedSAT: "SAT Ramalan",
    weeklyLearning: "Pembelajaran Minggu Ini",
    weeklyTopics: [
      { topic: "Fungsi Kuadratik", problems: 45, accuracy: 85 },
      { topic: "Persamaan Linear", problems: 30, accuracy: 92 },
      { topic: "Statistik", problems: 20, accuracy: 78 },
    ],
    problemsLabel: "soalan",
    scoreIncrease: (pts: string) => <>Skor ramalan Minho meningkat <span className="font-bold">{pts}</span> bulan ini!</>,
  },
  zh: {
    teacherDashboard: "教师仪表盘",
    classLabel: "3-A班 · 数学",
    summaryCards: [
      { label: "学生人数", icon: "👥", gradient: "from-blue-500 to-blue-600" },
      { label: "平均正确率", icon: "🎯", gradient: "from-green-500 to-emerald-600" },
      { label: "平均等级", icon: "📈", gradient: "from-purple-500 to-violet-600" },
      { label: "周活跃数", icon: "📊", gradient: "from-orange-500 to-red-500" },
    ],
    recentActivity: "最近活动",
    viewAll: "查看全部 →",
    activities: [
      { name: "金民浩", emoji: "🧒", action: "完成15道题", time: "2分钟前" },
      { name: "Sarah L.", emoji: "👧", action: "开始考试练习", time: "5分钟前" },
      { name: "俊宇", emoji: "👦", action: "获得黄金卡", time: "12分钟前" },
    ],
    studentProfile: "学生档案",
    active: "活跃",
    lastActive: "最近活跃: 2分钟前",
    dayStreak: "连续学习",
    accuracy: "正确率",
    problems: "做题数",
    thisWeek: "本周",
    dayLabels: ["一", "二", "三", "四", "五", "六", "日"],
    createAssignment: "创建作业",
    title: "标题",
    quizTitle: "二次函数测验",
    topic: "主题",
    topicValue: "代数 II — 二次式",
    questions: "题目数",
    difficulty: "难度",
    mixed: "混合",
    aiSuggestion: "🤖 AI 建议",
    aiSuggestionText: "根据班级成绩分析，建议包含3道判别式题目——40%的学生在此主题上有困难。",
    applyAIMix: "应用AI方案",
    assignmentCreated: "作业已创建！",
    sentTo: "已发送给32名学生",
    autoGrading: "自动批改已启用",
    assignmentResults: "作业结果",
    quadraticQuiz: "二次式测验",
    student: "学生",
    score: "成绩",
    classAverage: "班级平均",
    exportExcel: "📊 导出到Excel",
    parentView: "家长视图",
    minhoProgress: "民浩的学习进度",
    predictedSAT: "SAT预测",
    weeklyLearning: "本周学习情况",
    weeklyTopics: [
      { topic: "二次函数", problems: 45, accuracy: 85 },
      { topic: "一次方程", problems: 30, accuracy: 92 },
      { topic: "统计", problems: 20, accuracy: 78 },
    ],
    problemsLabel: "道题",
    scoreIncrease: (pts: string) => <>民浩的预测分数本月提高了 <span className="font-bold">{pts}</span>！</>,
  },
};

const summaryValues = ["32", "78%", "3.2", "28"];

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

/* ─── Step 1: Teacher overview ──────────────────────────────────── */

export function StepOverview({ active }: { active: boolean }) {
  const l = useT();
  const showCards = useDelayed(active, 600);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.teacherDashboard}</span>
        <p className="text-pink-200 text-[10px]">{l.classLabel}</p>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {l.summaryCards.map((c, i) => (
            <div
              key={c.label}
              className={`bg-gradient-to-br ${c.gradient} rounded-xl p-3 text-white transition-all duration-500 ${
                showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">{c.icon}</span>
              </div>
              <div className="text-xl font-bold">{summaryValues[i]}</div>
              <div className="text-[10px] opacity-80">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700">{l.recentActivity}</span>
            <span className="text-[10px] text-blue-600">{l.viewAll}</span>
          </div>
          {l.activities.map((s) => (
            <div key={s.name} className="flex items-center gap-2 py-1.5 border-t border-gray-200 first:border-0">
              <span className="text-lg">{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-gray-800 truncate">{s.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{s.action}</p>
              </div>
              <span className="text-[9px] text-gray-400 whitespace-nowrap">{s.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Student detail ────────────────────────────────────── */

export function StepStudent({ active }: { active: boolean }) {
  const l = useT();
  const showProfile = useDelayed(active, 600);
  const showStats = useDelayed(active, 1400);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-white font-semibold text-sm">{l.studentProfile}</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className={`flex items-center gap-3 mb-4 transition-all duration-500 ${showProfile ? "opacity-100" : "opacity-0"}`}>
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl shadow-lg">
            🧒
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">Minho Kim</p>
            <p className="text-xs text-gray-500">Level 3 · Advanced</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">{l.active}</span>
              <span className="text-[10px] text-gray-400">{l.lastActive}</span>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-3 gap-2 mb-4 transition-all duration-500 ${showStats ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-orange-50 rounded-xl p-2.5 text-center border border-orange-200">
            <div className="text-lg">🔥</div>
            <div className="text-sm font-bold text-orange-700">12</div>
            <div className="text-[9px] text-orange-500">{l.dayStreak}</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-2.5 text-center border border-blue-200">
            <div className="text-lg">🎯</div>
            <div className="text-sm font-bold text-blue-700">82%</div>
            <div className="text-[9px] text-blue-500">{l.accuracy}</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-2.5 text-center border border-purple-200">
            <div className="text-lg">📝</div>
            <div className="text-sm font-bold text-purple-700">847</div>
            <div className="text-[9px] text-purple-500">{l.problems}</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <p className="text-xs font-bold text-gray-700 mb-2">{l.thisWeek}</p>
          <div className="flex items-end justify-between h-[80px] gap-1.5 px-1">
            {[85, 72, 90, 68, 88, 92, 78].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full bg-gradient-to-t from-pink-500 to-rose-400 rounded-t"
                  style={{ height: `${(v / 100) * 70}px` }}
                />
                <span className="text-[8px] text-gray-400">{l.dayLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Assignment creation ───────────────────────────────── */

export function StepAssignment({ active }: { active: boolean }) {
  const l = useT();
  const showForm = useDelayed(active, 500);
  const showAI = useDelayed(active, 2000);
  const showCreated = useDelayed(active, 3500);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.createAssignment}</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {!showCreated ? (
          <>
            <div className={`space-y-3 transition-all duration-500 ${showForm ? "opacity-100" : "opacity-0"}`}>
              <div>
                <label className="text-[10px] font-medium text-gray-500 mb-1 block">{l.title}</label>
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-xs text-gray-700">
                  {l.quizTitle}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-medium text-gray-500 mb-1 block">{l.topic}</label>
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-xs text-gray-700">
                  {l.topicValue}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] font-medium text-gray-500 mb-1 block">{l.questions}</label>
                  <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-xs text-gray-700">10</div>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-medium text-gray-500 mb-1 block">{l.difficulty}</label>
                  <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-xs text-gray-700">{l.mixed}</div>
                </div>
              </div>
            </div>

            {showAI && (
              <div className="mt-4 bg-blue-50 rounded-xl p-3 border border-blue-200">
                <p className="text-xs font-bold text-blue-800 mb-1">{l.aiSuggestion}</p>
                <p className="text-[10px] text-blue-700 leading-relaxed">
                  {l.aiSuggestionText}
                </p>
                <button className="mt-2 text-[10px] px-3 py-1 bg-blue-600 text-white rounded-lg font-medium">
                  {l.applyAIMix}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900">{l.assignmentCreated}</h3>
            <p className="text-xs text-gray-500 mt-1">{l.sentTo}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{l.autoGrading}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Step 4: Results O/X table ─────────────────────────────────── */

const studentResults = [
  { name: "Minho K.", results: [true, true, false, true, true] },
  { name: "Sarah L.", results: [true, false, true, true, false] },
  { name: "Jun W.", results: [true, true, true, false, true] },
  { name: "Yuna P.", results: [false, true, true, true, true] },
  { name: "Hyun J.", results: [true, true, true, true, false] },
];

export function StepResults({ active }: { active: boolean }) {
  const l = useT();
  const showTable = useDelayed(active, 800);
  const showExport = useDelayed(active, 2500);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">{l.assignmentResults}</span>
        <span className="text-pink-200 text-[10px]">{l.quadraticQuiz}</span>
      </div>

      <div className="flex-1 px-3 py-3 overflow-y-auto">
        <div className={`transition-all duration-500 ${showTable ? "opacity-100" : "opacity-0"}`}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-[10px] font-medium text-gray-500 py-1.5 pr-2">{l.student}</th>
                {[1,2,3,4,5].map(q => (
                  <th key={q} className="text-center text-[10px] font-medium text-gray-500 py-1.5 w-8">Q{q}</th>
                ))}
                <th className="text-center text-[10px] font-medium text-gray-500 py-1.5 w-12">{l.score}</th>
              </tr>
            </thead>
            <tbody>
              {studentResults.map((s) => {
                const score = s.results.filter(Boolean).length;
                return (
                  <tr key={s.name} className="border-b border-gray-100">
                    <td className="text-[11px] font-medium text-gray-800 py-2 pr-2">{s.name}</td>
                    {s.results.map((r, i) => (
                      <td key={i} className="text-center py-2">
                        <span className={`text-sm font-bold ${r ? "text-blue-600" : "text-red-500"}`}>
                          {r ? "O" : "X"}
                        </span>
                      </td>
                    ))}
                    <td className="text-center py-2">
                      <span className={`text-xs font-bold ${score >= 4 ? "text-green-600" : score >= 3 ? "text-amber-600" : "text-red-600"}`}>
                        {score}/5
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
            <span className="text-[10px] text-gray-500">{l.classAverage}</span>
            <span className="text-xs font-bold text-gray-700">76%</span>
          </div>
        </div>

        {showExport && (
          <button className="w-full mt-3 py-2 bg-green-600 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5">
            <span>{l.exportExcel}</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Step 5: Parent view ───────────────────────────────────────── */

export function StepParent({ active }: { active: boolean }) {
  const l = useT();
  const showData = useDelayed(active, 600);
  const showTrend = useDelayed(active, 1500);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.parentView}</span>
        <p className="text-teal-200 text-[10px]">{l.minhoProgress}</p>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl shadow">
            🧒
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Minho Kim</p>
            <p className="text-[10px] text-gray-500">Level 3 · 3,240 XP</p>
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-2 mb-4 transition-all duration-500 ${showData ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-blue-50 rounded-xl p-2.5 text-center border border-blue-200">
            <p className="text-sm font-bold text-blue-700">82%</p>
            <p className="text-[9px] text-blue-500">{l.accuracy}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-2.5 text-center border border-orange-200">
            <p className="text-sm font-bold text-orange-700">12</p>
            <p className="text-[9px] text-orange-500">{l.dayStreak}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-2.5 text-center border border-green-200">
            <p className="text-sm font-bold text-green-700">847</p>
            <p className="text-[9px] text-green-500">{l.problems}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-2.5 text-center border border-purple-200">
            <p className="text-sm font-bold text-purple-700">1,340</p>
            <p className="text-[9px] text-purple-500">{l.predictedSAT}</p>
          </div>
        </div>

        <div className={`bg-gray-50 rounded-xl p-3 border border-gray-200 mb-3 transition-all duration-500 ${showTrend ? "opacity-100" : "opacity-0"}`}>
          <p className="text-xs font-bold text-gray-700 mb-2">{l.weeklyLearning}</p>
          {l.weeklyTopics.map((wt) => (
            <div key={wt.topic} className="flex items-center justify-between py-1.5 border-t border-gray-200 first:border-0">
              <div>
                <p className="text-[11px] font-medium text-gray-700">{wt.topic}</p>
                <p className="text-[9px] text-gray-400">{wt.problems} {l.problemsLabel}</p>
              </div>
              <span className={`text-xs font-bold ${wt.accuracy >= 85 ? "text-green-600" : "text-amber-600"}`}>
                {wt.accuracy}%
              </span>
            </div>
          ))}
        </div>

        <div className="bg-teal-50 rounded-xl p-3 border border-teal-200 text-center">
          <p className="text-[10px] text-teal-700">
            📈 {l.scoreIncrease("+40")}
          </p>
        </div>
      </div>
    </div>
  );
}
