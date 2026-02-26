"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Locale = "en" | "ko" | "ms" | "zh";

/* ─── Locale data ──────────────────────────────────────────────── */

const t = {
  en: {
    levelXP: "Level & XP",
    advanced: "Advanced",
    level4: "Level 4",
    toExpert: "1,760 XP to Expert",
    levels: ["Beg", "Exp", "Cha", "Adv", "Exp", "Cha"],
    streakAttendance: "Streak & Attendance",
    dayStreak: "Day Streak!",
    best: "Best: 21 days",
    thisMonth: "This Month",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    studied: "20 / 24 days studied this month",
    collectionCards: "Collection Cards",
    cardsCount: "27 cards",
    cards: [
      { name: "Discriminant Master", tier: "Diamond" },
      { name: "Quadratic Expert", tier: "Gold" },
      { name: "Fraction Conqueror", tier: "Silver" },
      { name: "Exponent Beginner", tier: "Bronze" },
    ],
    nextGoal: "🎯 Next Goal",
    nextGoalDesc: "Overcome 3 more mistakes to earn a new Gold card!",
    myAvatar: "My Avatar",
    avatarLevel: "Level 4 — Advanced",
    crown: "Crown",
    cape: "Cape",
    wand: "Wand",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
    avatarGrows: "Your avatar grows with every study session!",
    badges: "Badges",
    badgesEarned: "5 / 6 earned",
    badgeList: [
      { name: "First Streak", desc: "3 days in a row" },
      { name: "Century Club", desc: "100 problems solved" },
      { name: "Perfect Week", desc: "7/7 days active" },
      { name: "Speed Demon", desc: "Under 30s per problem" },
      { name: "Night Owl", desc: "Study after 10 PM" },
      { name: "Grand Master", desc: "Reach Champion level" },
    ],
    newBadge: "🎖️ New Badge Earned!",
    newBadgeDesc: "Speed Demon — Average solve time under 30 seconds!",
  },
  ko: {
    levelXP: "레벨 & XP",
    advanced: "고급",
    level4: "레벨 4",
    toExpert: "전문가까지 1,760 XP",
    levels: ["초급", "탐험", "도전", "고급", "전문", "챔피"],
    streakAttendance: "연속 학습 & 출석",
    dayStreak: "일 연속 학습!",
    best: "최고: 21일",
    thisMonth: "이번 달",
    days: ["월", "화", "수", "목", "금", "토", "일"],
    studied: "이번 달 20 / 24일 학습",
    collectionCards: "수집 카드",
    cardsCount: "27장",
    cards: [
      { name: "판별식 마스터", tier: "다이아몬드" },
      { name: "이차식 전문가", tier: "골드" },
      { name: "분수 정복자", tier: "실버" },
      { name: "지수 초보", tier: "브론즈" },
    ],
    nextGoal: "🎯 다음 목표",
    nextGoalDesc: "실수 3개만 더 극복하면 새 골드 카드를 획득합니다!",
    myAvatar: "내 아바타",
    avatarLevel: "레벨 4 — 고급",
    crown: "왕관",
    cape: "망토",
    wand: "지팡이",
    rare: "레어",
    epic: "에픽",
    legendary: "전설",
    avatarGrows: "학습할수록 아바타가 성장합니다!",
    badges: "배지",
    badgesEarned: "5 / 6 획득",
    badgeList: [
      { name: "첫 연속 학습", desc: "3일 연속" },
      { name: "100문제 클럽", desc: "100문제 풀기" },
      { name: "완벽한 한 주", desc: "7/7일 활동" },
      { name: "스피드 마스터", desc: "문제당 30초 미만" },
      { name: "올빼미", desc: "밤 10시 이후 학습" },
      { name: "그랜드 마스터", desc: "챔피언 레벨 달성" },
    ],
    newBadge: "🎖️ 새 배지 획득!",
    newBadgeDesc: "스피드 마스터 — 평균 풀이 시간 30초 미만!",
  },
  ms: {
    levelXP: "Tahap & XP",
    advanced: "Lanjutan",
    level4: "Tahap 4",
    toExpert: "1,760 XP ke Pakar",
    levels: ["Mul", "Pen", "Cab", "Lnj", "Pkr", "Jua"],
    streakAttendance: "Rekod & Kehadiran",
    dayStreak: "Hari Berturut!",
    best: "Terbaik: 21 hari",
    thisMonth: "Bulan Ini",
    days: ["Isn", "Sel", "Rab", "Kha", "Jum", "Sab", "Ahd"],
    studied: "20 / 24 hari belajar bulan ini",
    collectionCards: "Kad Koleksi",
    cardsCount: "27 kad",
    cards: [
      { name: "Pakar Diskriminan", tier: "Berlian" },
      { name: "Pakar Kuadratik", tier: "Emas" },
      { name: "Penakluk Pecahan", tier: "Perak" },
      { name: "Pemula Eksponen", tier: "Gangsa" },
    ],
    nextGoal: "🎯 Matlamat Seterusnya",
    nextGoalDesc: "Atasi 3 lagi kesilapan untuk kad Emas baharu!",
    myAvatar: "Avatar Saya",
    avatarLevel: "Tahap 4 — Lanjutan",
    crown: "Mahkota",
    cape: "Jubah",
    wand: "Tongkat",
    rare: "Jarang",
    epic: "Epik",
    legendary: "Lagenda",
    avatarGrows: "Avatar anda berkembang dengan setiap sesi!",
    badges: "Lencana",
    badgesEarned: "5 / 6 diperoleh",
    badgeList: [
      { name: "Rekod Pertama", desc: "3 hari berturut" },
      { name: "Kelab 100", desc: "100 soalan diselesaikan" },
      { name: "Minggu Sempurna", desc: "7/7 hari aktif" },
      { name: "Pantas", desc: "Bawah 30s setiap soalan" },
      { name: "Burung Hantu", desc: "Belajar selepas 10 PM" },
      { name: "Grand Master", desc: "Capai tahap Juara" },
    ],
    newBadge: "🎖️ Lencana Baharu!",
    newBadgeDesc: "Pantas — Purata masa penyelesaian bawah 30 saat!",
  },
  zh: {
    levelXP: "等级 & XP",
    advanced: "进阶",
    level4: "等级 4",
    toExpert: "距专家还需 1,760 XP",
    levels: ["初级", "探索", "挑战", "进阶", "专家", "冠军"],
    streakAttendance: "连续学习 & 出勤",
    dayStreak: "天连续学习！",
    best: "最佳: 21天",
    thisMonth: "本月",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    studied: "本月学习 20 / 24 天",
    collectionCards: "收集卡牌",
    cardsCount: "27张",
    cards: [
      { name: "判别式大师", tier: "钻石" },
      { name: "二次式专家", tier: "黄金" },
      { name: "分数征服者", tier: "白银" },
      { name: "指数新手", tier: "青铜" },
    ],
    nextGoal: "🎯 下一个目标",
    nextGoalDesc: "再克服3个错误即可获得新的黄金卡牌！",
    myAvatar: "我的头像",
    avatarLevel: "等级 4 — 进阶",
    crown: "皇冠",
    cape: "披风",
    wand: "魔杖",
    rare: "稀有",
    epic: "史诗",
    legendary: "传说",
    avatarGrows: "每次学习都会让头像成长！",
    badges: "徽章",
    badgesEarned: "已获得 5 / 6",
    badgeList: [
      { name: "首次连续", desc: "连续3天" },
      { name: "百题俱乐部", desc: "完成100道题" },
      { name: "完美一周", desc: "7/7天活跃" },
      { name: "速度之星", desc: "每题不到30秒" },
      { name: "夜猫子", desc: "晚上10点后学习" },
      { name: "大师", desc: "达到冠军等级" },
    ],
    newBadge: "🎖️ 获得新徽章！",
    newBadgeDesc: "速度之星 — 平均解题时间不到30秒！",
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

/* ─── Step 1: XP & Level ────────────────────────────────────────── */

const levelData = [
  { color: "from-gray-400 to-gray-500" },
  { color: "from-green-400 to-green-600" },
  { color: "from-blue-400 to-blue-600" },
  { color: "from-purple-400 to-purple-600" },
  { color: "from-orange-400 to-red-500" },
  { color: "from-amber-400 to-yellow-500" },
];

export function StepXP({ active }: { active: boolean }) {
  const l = useT();
  const showLevel = useDelayed(active, 600);
  const showXPGain = useDelayed(active, 1800);
  const showBar = useDelayed(active, 1000);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.levelXP}</span>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col items-center justify-center">
        <div className={`text-center mb-6 transition-all duration-700 ${showLevel ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg mb-3">
            <span className="text-3xl">⚡</span>
          </div>
          <div className="text-lg font-bold text-gray-900">{l.advanced}</div>
          <div className="text-xs text-gray-500">{l.level4}</div>
        </div>

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
          <p className="text-[10px] text-gray-400 text-center mt-1">{l.toExpert}</p>
        </div>

        {showXPGain && (
          <div className="mt-5 animate-bounce">
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold shadow-md">
              +25 XP 🎉
            </span>
          </div>
        )}

        <div className="w-full mt-6 flex items-center justify-between px-2">
          {levelData.map((ld, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${ld.color} ${i <= 3 ? "ring-2 ring-white shadow" : "opacity-40"}`} />
              <span className={`text-[8px] mt-1 ${i <= 3 ? "text-gray-600 font-medium" : "text-gray-400"}`}>
                {l.levels[i]}
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
  const l = useT();
  const showFlame = useDelayed(active, 500);
  const showGrid = useDelayed(active, 1200);

  const weeks = [
    [true, true, true, true, true, false, true],
    [true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true],
    [true, true, true, false, false, false, false],
  ];

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.streakAttendance}</span>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col items-center">
        <div className={`text-center mb-5 transition-all duration-700 ${showFlame ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="text-5xl mb-2">🔥</div>
          <div className="text-3xl font-bold text-orange-600">7</div>
          <div className="text-xs text-gray-500">{l.dayStreak}</div>
          <p className="text-[10px] text-orange-400 mt-1">{l.best}</p>
        </div>

        <div className={`w-full bg-gray-50 rounded-xl p-3 border border-gray-200 transition-all duration-700 ${showGrid ? "opacity-100" : "opacity-0"}`}>
          <p className="text-[10px] text-gray-400 font-medium mb-2">{l.thisMonth}</p>
          <div className="grid grid-cols-7 gap-1.5 mb-1">
            {l.days.map(d => (
              <div key={d} className="text-center text-[9px] text-gray-400">{d}</div>
            ))}
          </div>
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

        <p className="text-[10px] text-gray-400 mt-3">{l.studied}</p>
      </div>
    </div>
  );
}

/* ─── Step 3: Collection Cards ──────────────────────────────────── */

const cardGradients = [
  "from-cyan-400 to-blue-500",
  "from-amber-400 to-yellow-500",
  "from-gray-300 to-gray-500",
  "from-orange-300 to-orange-500",
];
const cardEmojis = ["💎", "🥇", "🥈", "🥉"];
const cardCounts = [12, 8, 5, 2];

export function StepCards({ active }: { active: boolean }) {
  const l = useT();
  const show1 = useDelayed(active, 400);
  const show2 = useDelayed(active, 800);
  const show3 = useDelayed(active, 1200);
  const show4 = useDelayed(active, 1600);
  const shows = [show1, show2, show3, show4];

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">{l.collectionCards}</span>
        <span className="text-emerald-100 text-[10px]">{l.cardsCount}</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2.5">
          {l.cards.map((c, i) => (
            <div
              key={c.name}
              className={`bg-gradient-to-br ${cardGradients[i]} rounded-xl p-3 text-white text-center shadow-lg transition-all duration-500 ${
                shows[i] ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <div className="text-2xl mb-1">{cardEmojis[i]}</div>
              <div className="text-xs font-bold leading-tight">{c.name}</div>
              <div className="text-[10px] opacity-80 mt-0.5">{c.tier}</div>
              <div className="mt-2 inline-block px-2 py-0.5 bg-white/20 rounded-full text-[10px]">
                ×{cardCounts[i]}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-3 border border-purple-200 text-center">
          <p className="text-xs font-bold text-purple-800">{l.nextGoal}</p>
          <p className="text-[10px] text-purple-600 mt-0.5">{l.nextGoalDesc}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4: Avatar ────────────────────────────────────────────── */

export function StepAvatar({ active }: { active: boolean }) {
  const l = useT();
  const showAvatar = useDelayed(active, 600);
  const showItems = useDelayed(active, 1500);

  const items = [
    { name: l.crown, emoji: "👑", rarity: l.rare },
    { name: l.cape, emoji: "🦸", rarity: l.epic },
    { name: l.wand, emoji: "🪄", rarity: l.legendary },
  ];

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3">
        <span className="text-white font-semibold text-sm">{l.myAvatar}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4">
        <div className={`mb-6 transition-all duration-700 ${showAvatar ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-xl ring-4 ring-white">
            <span className="text-6xl">🧙‍♂️</span>
          </div>
          <div className="text-center mt-3">
            <p className="text-base font-bold text-gray-900">MathWizard_42</p>
            <p className="text-xs text-gray-500">{l.avatarLevel}</p>
          </div>
        </div>

        <div className={`w-full grid grid-cols-3 gap-2 transition-all duration-500 ${showItems ? "opacity-100" : "opacity-0"}`}>
          {items.map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-200">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <p className="text-[10px] font-medium text-gray-700">{item.name}</p>
              <p className="text-[9px] text-purple-500">{item.rarity}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-gray-400 mt-4">{l.avatarGrows}</p>
      </div>
    </div>
  );
}

/* ─── Step 5: Badges ────────────────────────────────────────────── */

const badgeEmojis = ["🔥", "💯", "⭐", "⚡", "🦉", "🏆"];
const badgeEarned = [true, true, true, true, true, false];

export function StepBadges({ active }: { active: boolean }) {
  const l = useT();
  const showBadges = useDelayed(active, 600);
  const showNew = useDelayed(active, 2000);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">{l.badges}</span>
        <span className="text-emerald-100 text-[10px]">{l.badgesEarned}</span>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2.5">
          {l.badgeList.map((b, i) => (
            <div
              key={b.name}
              className={`text-center p-2.5 rounded-xl transition-all duration-500 ${
                badgeEarned[i]
                  ? "bg-amber-50 border border-amber-200"
                  : "bg-gray-100 border border-gray-200 opacity-50"
              } ${showBadges ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              style={{ transitionDelay: `${i * 100}ms`, opacity: showBadges ? (badgeEarned[i] ? 1 : 0.5) : 0 }}
            >
              <div className={`text-2xl mb-1 ${!badgeEarned[i] ? "grayscale" : ""}`}>{badgeEmojis[i]}</div>
              <p className="text-[10px] font-bold text-gray-700 leading-tight">{b.name}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>

        {showNew && (
          <div className="mt-4 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-3 border border-amber-300 text-center animate-pulse">
            <p className="text-xs font-bold text-amber-800">{l.newBadge}</p>
            <p className="text-[10px] text-amber-600 mt-0.5">{l.newBadgeDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
