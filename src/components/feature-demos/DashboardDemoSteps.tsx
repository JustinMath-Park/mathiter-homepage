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

/* ─── Step 1: Teacher overview ──────────────────────────────────── */

const summaryCards = [
  { label: "Students", value: "32", icon: "👥", gradient: "from-blue-500 to-blue-600" },
  { label: "Avg Accuracy", value: "78%", icon: "🎯", gradient: "from-green-500 to-emerald-600" },
  { label: "Avg Level", value: "3.2", icon: "📈", gradient: "from-purple-500 to-violet-600" },
  { label: "Active/Week", value: "28", icon: "📊", gradient: "from-orange-500 to-red-500" },
];

export function StepOverview({ active }: { active: boolean }) {
  const showCards = useDelayed(active, 600);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">Teacher Dashboard</span>
        <p className="text-pink-200 text-[10px]">Class 3-A · Math</p>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {summaryCards.map((c, i) => (
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
              <div className="text-xl font-bold">{c.value}</div>
              <div className="text-[10px] opacity-80">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Quick student list */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700">Recent Activity</span>
            <span className="text-[10px] text-blue-600">View all →</span>
          </div>
          {[
            { name: "Minho K.", emoji: "🧒", action: "Completed 15 problems", time: "2m ago" },
            { name: "Sarah L.", emoji: "👧", action: "Started exam practice", time: "5m ago" },
            { name: "Jun W.", emoji: "👦", action: "Earned Gold card", time: "12m ago" },
          ].map((s) => (
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
  const showProfile = useDelayed(active, 600);
  const showStats = useDelayed(active, 1400);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-white font-semibold text-sm">Student Profile</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Profile header */}
        <div className={`flex items-center gap-3 mb-4 transition-all duration-500 ${showProfile ? "opacity-100" : "opacity-0"}`}>
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl shadow-lg">
            🧒
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">Minho Kim</p>
            <p className="text-xs text-gray-500">Level 3 · Advanced</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">Active</span>
              <span className="text-[10px] text-gray-400">Last active: 2m ago</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className={`grid grid-cols-3 gap-2 mb-4 transition-all duration-500 ${showStats ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-orange-50 rounded-xl p-2.5 text-center border border-orange-200">
            <div className="text-lg">🔥</div>
            <div className="text-sm font-bold text-orange-700">12</div>
            <div className="text-[9px] text-orange-500">Day Streak</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-2.5 text-center border border-blue-200">
            <div className="text-lg">🎯</div>
            <div className="text-sm font-bold text-blue-700">82%</div>
            <div className="text-[9px] text-blue-500">Accuracy</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-2.5 text-center border border-purple-200">
            <div className="text-lg">📝</div>
            <div className="text-sm font-bold text-purple-700">847</div>
            <div className="text-[9px] text-purple-500">Problems</div>
          </div>
        </div>

        {/* Recent performance */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <p className="text-xs font-bold text-gray-700 mb-2">This Week</p>
          <div className="flex items-end justify-between h-[80px] gap-1.5 px-1">
            {[85, 72, 90, 68, 88, 92, 78].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full bg-gradient-to-t from-pink-500 to-rose-400 rounded-t"
                  style={{ height: `${(v / 100) * 70}px` }}
                />
                <span className="text-[8px] text-gray-400">{["M","T","W","T","F","S","S"][i]}</span>
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
  const showForm = useDelayed(active, 500);
  const showAI = useDelayed(active, 2000);
  const showCreated = useDelayed(active, 3500);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">Create Assignment</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {!showCreated ? (
          <>
            <div className={`space-y-3 transition-all duration-500 ${showForm ? "opacity-100" : "opacity-0"}`}>
              <div>
                <label className="text-[10px] font-medium text-gray-500 mb-1 block">Title</label>
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-xs text-gray-700">
                  Quadratic Functions Quiz
                </div>
              </div>
              <div>
                <label className="text-[10px] font-medium text-gray-500 mb-1 block">Topic</label>
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-xs text-gray-700">
                  Algebra II — Quadratics
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] font-medium text-gray-500 mb-1 block">Questions</label>
                  <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-xs text-gray-700">10</div>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-medium text-gray-500 mb-1 block">Difficulty</label>
                  <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-xs text-gray-700">Mixed</div>
                </div>
              </div>
            </div>

            {/* AI suggestion */}
            {showAI && (
              <div className="mt-4 bg-blue-50 rounded-xl p-3 border border-blue-200">
                <p className="text-xs font-bold text-blue-800 mb-1">🤖 AI Suggestion</p>
                <p className="text-[10px] text-blue-700 leading-relaxed">
                  Based on class performance, I recommend including 3 discriminant problems — 40% of students struggle with this topic.
                </p>
                <button className="mt-2 text-[10px] px-3 py-1 bg-blue-600 text-white rounded-lg font-medium">
                  Apply AI Mix
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
            <h3 className="text-base font-bold text-gray-900">Assignment Created!</h3>
            <p className="text-xs text-gray-500 mt-1">Sent to 32 students</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Auto-grading enabled</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Step 4: Results O/X table ─────────────────────────────────── */

const students = [
  { name: "Minho K.", results: [true, true, false, true, true] },
  { name: "Sarah L.", results: [true, false, true, true, false] },
  { name: "Jun W.", results: [true, true, true, false, true] },
  { name: "Yuna P.", results: [false, true, true, true, true] },
  { name: "Hyun J.", results: [true, true, true, true, false] },
];

export function StepResults({ active }: { active: boolean }) {
  const showTable = useDelayed(active, 800);
  const showExport = useDelayed(active, 2500);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">Assignment Results</span>
        <span className="text-pink-200 text-[10px]">Quadratic Quiz</span>
      </div>

      <div className="flex-1 px-3 py-3 overflow-y-auto">
        {/* O/X table */}
        <div className={`transition-all duration-500 ${showTable ? "opacity-100" : "opacity-0"}`}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-[10px] font-medium text-gray-500 py-1.5 pr-2">Student</th>
                {[1,2,3,4,5].map(q => (
                  <th key={q} className="text-center text-[10px] font-medium text-gray-500 py-1.5 w-8">Q{q}</th>
                ))}
                <th className="text-center text-[10px] font-medium text-gray-500 py-1.5 w-12">Score</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
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

          {/* Summary */}
          <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
            <span className="text-[10px] text-gray-500">Class Average</span>
            <span className="text-xs font-bold text-gray-700">76%</span>
          </div>
        </div>

        {/* Export button */}
        {showExport && (
          <button className="w-full mt-3 py-2 bg-green-600 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5">
            <span>📊</span> Export to Excel
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Step 5: Parent view ───────────────────────────────────────── */

export function StepParent({ active }: { active: boolean }) {
  const showData = useDelayed(active, 600);
  const showTrend = useDelayed(active, 1500);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">Parent View</span>
        <p className="text-teal-200 text-[10px]">Minho&apos;s Progress</p>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Child avatar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl shadow">
            🧒
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Minho Kim</p>
            <p className="text-[10px] text-gray-500">Level 3 · 3,240 XP</p>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 gap-2 mb-4 transition-all duration-500 ${showData ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-blue-50 rounded-xl p-2.5 text-center border border-blue-200">
            <p className="text-sm font-bold text-blue-700">82%</p>
            <p className="text-[9px] text-blue-500">Accuracy</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-2.5 text-center border border-orange-200">
            <p className="text-sm font-bold text-orange-700">12 days</p>
            <p className="text-[9px] text-orange-500">Streak</p>
          </div>
          <div className="bg-green-50 rounded-xl p-2.5 text-center border border-green-200">
            <p className="text-sm font-bold text-green-700">847</p>
            <p className="text-[9px] text-green-500">Problems</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-2.5 text-center border border-purple-200">
            <p className="text-sm font-bold text-purple-700">1,340</p>
            <p className="text-[9px] text-purple-500">Predicted SAT</p>
          </div>
        </div>

        {/* Weekly trend */}
        <div className={`bg-gray-50 rounded-xl p-3 border border-gray-200 mb-3 transition-all duration-500 ${showTrend ? "opacity-100" : "opacity-0"}`}>
          <p className="text-xs font-bold text-gray-700 mb-2">This Week&apos;s Learning</p>
          {[
            { topic: "Quadratic Functions", problems: 45, accuracy: 85 },
            { topic: "Linear Equations", problems: 30, accuracy: 92 },
            { topic: "Statistics", problems: 20, accuracy: 78 },
          ].map((t) => (
            <div key={t.topic} className="flex items-center justify-between py-1.5 border-t border-gray-200 first:border-0">
              <div>
                <p className="text-[11px] font-medium text-gray-700">{t.topic}</p>
                <p className="text-[9px] text-gray-400">{t.problems} problems</p>
              </div>
              <span className={`text-xs font-bold ${t.accuracy >= 85 ? "text-green-600" : "text-amber-600"}`}>
                {t.accuracy}%
              </span>
            </div>
          ))}
        </div>

        <div className="bg-teal-50 rounded-xl p-3 border border-teal-200 text-center">
          <p className="text-[10px] text-teal-700">
            📈 Minho&apos;s predicted score increased <span className="font-bold">+40 points</span> this month!
          </p>
        </div>
      </div>
    </div>
  );
}
