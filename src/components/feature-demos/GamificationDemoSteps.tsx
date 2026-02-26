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

/* ─── Step 1: XP & Level ────────────────────────────────────────── */

const levels = [
  { name: "Beginner", min: 0, color: "from-gray-400 to-gray-500" },
  { name: "Explorer", min: 500, color: "from-green-400 to-green-600" },
  { name: "Challenger", min: 1500, color: "from-blue-400 to-blue-600" },
  { name: "Advanced", min: 3000, color: "from-purple-400 to-purple-600" },
  { name: "Expert", min: 5000, color: "from-orange-400 to-red-500" },
  { name: "Champion", min: 8000, color: "from-amber-400 to-yellow-500" },
];

export function StepXP({ active }: { active: boolean }) {
  const showLevel = useDelayed(active, 600);
  const showXPGain = useDelayed(active, 1800);
  const showBar = useDelayed(active, 1000);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">Level & XP</span>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col items-center justify-center">
        {/* Current level badge */}
        <div className={`text-center mb-6 transition-all duration-700 ${showLevel ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg mb-3">
            <span className="text-3xl">⚡</span>
          </div>
          <div className="text-lg font-bold text-gray-900">Advanced</div>
          <div className="text-xs text-gray-500">Level 4</div>
        </div>

        {/* XP bar */}
        <div className={`w-full max-w-[260px] transition-all duration-500 ${showBar ? "opacity-100" : "opacity-0"}`}>
          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
            <span>3,240 XP</span>
            <span>5,000 XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-1000"
              style={{ width: showBar ? "65%" : "0%" }}
            />
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-1">1,760 XP to Expert</p>
        </div>

        {/* XP gain popup */}
        {showXPGain && (
          <div className="mt-5 animate-bounce">
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold shadow-md">
              +25 XP 🎉
            </span>
          </div>
        )}

        {/* Level roadmap */}
        <div className="w-full mt-6 flex items-center justify-between px-2">
          {levels.map((l, i) => (
            <div key={l.name} className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${l.color} ${i <= 3 ? "ring-2 ring-white shadow" : "opacity-40"}`} />
              <span className={`text-[8px] mt-1 ${i <= 3 ? "text-gray-600 font-medium" : "text-gray-400"}`}>
                {l.name.slice(0, 3)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Streak & Attendance ───────────────────────────────── */

export function StepStreak({ active }: { active: boolean }) {
  const showFlame = useDelayed(active, 500);
  const showGrid = useDelayed(active, 1200);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeks = [
    [true, true, true, true, true, false, true],
    [true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true],
    [true, true, true, false, false, false, false],
  ];

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3">
        <span className="text-white font-semibold text-sm">Streak & Attendance</span>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col items-center">
        {/* Streak flame */}
        <div className={`text-center mb-5 transition-all duration-700 ${showFlame ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="text-5xl mb-2">🔥</div>
          <div className="text-3xl font-bold text-orange-600">7</div>
          <div className="text-xs text-gray-500">Day Streak!</div>
          <p className="text-[10px] text-orange-400 mt-1">Best: 21 days</p>
        </div>

        {/* Weekly grid */}
        <div className={`w-full bg-gray-50 rounded-xl p-3 border border-gray-200 transition-all duration-700 ${showGrid ? "opacity-100" : "opacity-0"}`}>
          <p className="text-[10px] text-gray-400 font-medium mb-2">This Month</p>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-1">
            {days.map(d => (
              <div key={d} className="text-center text-[9px] text-gray-400">{d}</div>
            ))}
          </div>
          {/* Weeks */}
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1.5 mb-1.5">
              {week.map((done, di) => (
                <div
                  key={di}
                  className={`aspect-square rounded-md flex items-center justify-center transition-all duration-300 ${
                    wi === 3 && di >= 3
                      ? "bg-gray-100 border border-dashed border-gray-300"
                      : done
                        ? "bg-gradient-to-br from-green-400 to-green-500 shadow-sm"
                        : "bg-red-100 border border-red-200"
                  }`}
                  style={{ transitionDelay: `${(wi * 7 + di) * 30}ms` }}
                >
                  {wi === 3 && di >= 3 ? null : (
                    <span className="text-[10px]">{done ? "✓" : "✗"}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="text-[10px] text-gray-400 mt-3">20 / 24 days studied this month</p>
      </div>
    </div>
  );
}

/* ─── Step 3: Collection Cards ──────────────────────────────────── */

const cards = [
  { name: "Discriminant Master", tier: "Diamond", emoji: "💎", gradient: "from-cyan-400 to-blue-500", count: 12 },
  { name: "Quadratic Expert", tier: "Gold", emoji: "🥇", gradient: "from-amber-400 to-yellow-500", count: 8 },
  { name: "Fraction Conqueror", tier: "Silver", emoji: "🥈", gradient: "from-gray-300 to-gray-500", count: 5 },
  { name: "Exponent Beginner", tier: "Bronze", emoji: "🥉", gradient: "from-orange-300 to-orange-500", count: 2 },
];

export function StepCards({ active }: { active: boolean }) {
  const show1 = useDelayed(active, 400);
  const show2 = useDelayed(active, 800);
  const show3 = useDelayed(active, 1200);
  const show4 = useDelayed(active, 1600);
  const shows = [show1, show2, show3, show4];

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">Collection Cards</span>
        <span className="text-emerald-100 text-[10px]">27 cards</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2.5">
          {cards.map((c, i) => (
            <div
              key={c.name}
              className={`bg-gradient-to-br ${c.gradient} rounded-xl p-3 text-white text-center shadow-lg transition-all duration-500 ${
                shows[i] ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <div className="text-2xl mb-1">{c.emoji}</div>
              <div className="text-xs font-bold leading-tight">{c.name}</div>
              <div className="text-[10px] opacity-80 mt-0.5">{c.tier}</div>
              <div className="mt-2 inline-block px-2 py-0.5 bg-white/20 rounded-full text-[10px]">
                ×{c.count}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-3 border border-purple-200 text-center">
          <p className="text-xs font-bold text-purple-800">🎯 Next Goal</p>
          <p className="text-[10px] text-purple-600 mt-0.5">Overcome 3 more mistakes to earn a new Gold card!</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4: Avatar ────────────────────────────────────────────── */

export function StepAvatar({ active }: { active: boolean }) {
  const showAvatar = useDelayed(active, 600);
  const showItems = useDelayed(active, 1500);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">My Avatar</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4">
        {/* Avatar */}
        <div className={`mb-6 transition-all duration-700 ${showAvatar ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-xl ring-4 ring-white">
            <span className="text-6xl">🧙‍♂️</span>
          </div>
          <div className="text-center mt-3">
            <p className="text-base font-bold text-gray-900">MathWizard_42</p>
            <p className="text-xs text-gray-500">Level 4 — Advanced</p>
          </div>
        </div>

        {/* Equipped items */}
        <div className={`w-full grid grid-cols-3 gap-2 transition-all duration-500 ${showItems ? "opacity-100" : "opacity-0"}`}>
          {[
            { name: "Crown", emoji: "👑", rarity: "Rare" },
            { name: "Cape", emoji: "🦸", rarity: "Epic" },
            { name: "Wand", emoji: "🪄", rarity: "Legendary" },
          ].map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-200">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <p className="text-[10px] font-medium text-gray-700">{item.name}</p>
              <p className="text-[9px] text-purple-500">{item.rarity}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-gray-400 mt-4">Your avatar grows with every study session!</p>
      </div>
    </div>
  );
}

/* ─── Step 5: Badges ────────────────────────────────────────────── */

const badges = [
  { name: "First Streak", emoji: "🔥", earned: true, desc: "3 days in a row" },
  { name: "Century Club", emoji: "💯", earned: true, desc: "100 problems solved" },
  { name: "Perfect Week", emoji: "⭐", earned: true, desc: "7/7 days active" },
  { name: "Speed Demon", emoji: "⚡", earned: true, desc: "Under 30s per problem" },
  { name: "Night Owl", emoji: "🦉", earned: true, desc: "Study after 10 PM" },
  { name: "Grand Master", emoji: "🏆", earned: false, desc: "Reach Champion level" },
];

export function StepBadges({ active }: { active: boolean }) {
  const showBadges = useDelayed(active, 600);
  const showNew = useDelayed(active, 2000);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">Badges</span>
        <span className="text-emerald-100 text-[10px]">5 / 6 earned</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2.5">
          {badges.map((b, i) => (
            <div
              key={b.name}
              className={`text-center p-2.5 rounded-xl transition-all duration-500 ${
                b.earned
                  ? "bg-amber-50 border border-amber-200"
                  : "bg-gray-100 border border-gray-200 opacity-50"
              } ${showBadges ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              style={{ transitionDelay: `${i * 100}ms`, opacity: showBadges ? (b.earned ? 1 : 0.5) : 0 }}
            >
              <div className={`text-2xl mb-1 ${!b.earned ? "grayscale" : ""}`}>{b.emoji}</div>
              <p className="text-[10px] font-bold text-gray-700 leading-tight">{b.name}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* New badge earned */}
        {showNew && (
          <div className="mt-4 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-3 border border-amber-300 text-center animate-pulse">
            <p className="text-xs font-bold text-amber-800">🎖️ New Badge Earned!</p>
            <p className="text-[10px] text-amber-600 mt-0.5">Speed Demon — Average solve time under 30 seconds!</p>
          </div>
        )}
      </div>
    </div>
  );
}
