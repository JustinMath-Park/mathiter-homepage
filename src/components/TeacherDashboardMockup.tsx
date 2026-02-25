"use client";

/**
 * Teacher Dashboard Mockup
 * Shows class overview with student analytics, performance comparison, and alerts
 */

const students = [
  { rank: 1, name: "Sarah Lee", grade: "Y10", level: 18, rate: 94, streak: 23, xp: "7.2k", trend: "up" },
  { rank: 2, name: "Amir Razak", grade: "F4", level: 15, rate: 90, streak: 31, xp: "5.6k", trend: "up" },
  { rank: 3, name: "Jihoon Kim", grade: "G8", level: 12, rate: 88, streak: 15, xp: "4.8k", trend: "up" },
  { rank: 4, name: "Haeun Lee", grade: "G11", level: 21, rate: 96, streak: 42, xp: "9.4k", trend: "up" },
  { rank: 5, name: "Wei Chen", grade: "G9", level: 10, rate: 78, streak: 12, xp: "3.5k", trend: "down" },
];

const alerts = [
  { name: "Soyeon Park", rate: 52, topic: "Calculus" },
  { name: "Daniel Lim", rate: 58, topic: "Probability" },
];

export default function TeacherDashboardMockup() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            R
          </div>
          <div>
            <div className="text-white text-sm font-semibold">Rachel Kim</div>
            <div className="text-blue-200 text-[10px]">Teacher Dashboard</div>
          </div>
        </div>
        <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">
          Class 8A
        </span>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-0 border-b border-gray-100">
        {[
          { label: "Students", value: "32", color: "text-blue-600", icon: "👥" },
          { label: "Avg Score", value: "82", color: "text-emerald-600", icon: "📊" },
          { label: "Avg Level", value: "14", color: "text-purple-600", icon: "⭐" },
          { label: "Active", value: "28", color: "text-orange-600", icon: "🔥" },
        ].map((stat) => (
          <div key={stat.label} className="text-center py-2 border-r border-gray-100 last:border-r-0">
            <div className="text-[8px] mb-0.5">{stat.icon}</div>
            <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-[9px] text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Student ranking */}
      <div className="px-4 pt-2.5 pb-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-gray-700">🏆 Top Performers</span>
          <div className="flex gap-1">
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">Level</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">XP</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">Rate</span>
          </div>
        </div>

        <div className="space-y-1">
          {students.map((s) => (
            <div
              key={s.rank}
              className="flex items-center gap-2 px-2 py-1 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {/* Rank */}
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                  s.rank === 1
                    ? "bg-amber-100 text-amber-700"
                    : s.rank === 2
                      ? "bg-gray-200 text-gray-600"
                      : s.rank === 3
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-400"
                }`}
              >
                {s.rank}
              </span>

              {/* Name & grade */}
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium text-gray-800 truncate">
                  {s.name} <span className="text-[9px] text-gray-400 font-normal">{s.grade}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 text-[10px] shrink-0">
                <span className="font-bold text-blue-600">{s.level}</span>
                <span className={`font-bold ${s.rate >= 85 ? "text-emerald-600" : s.rate >= 70 ? "text-amber-600" : "text-red-500"}`}>
                  {s.rate}%
                </span>
                <span className="font-bold text-orange-500">🔥{s.streak}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Needs attention */}
      <div className="mx-4 mt-2 mb-3 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-[10px] text-red-700 font-semibold mb-1">⚠️ Needs Attention</p>
        <div className="space-y-1">
          {alerts.map((a) => (
            <div key={a.name} className="flex items-center justify-between text-[10px]">
              <span className="text-red-600">{a.name}</span>
              <span className="text-red-500">
                {a.rate}% · <span className="text-red-400">{a.topic}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
