"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Locale = "en" | "ko" | "ms" | "zh";

/* ─── Locale data ──────────────────────────────────────────────── */

const t = {
  en: {
    satMath: "SAT Math Practice",
    question: "Question",
    discriminants: "Discriminants",
    medium: "Medium",
    problemText: (k: string) => <>If <span className="font-mono font-semibold text-indigo-700">x² − 6x + k = 0</span> has exactly one real solution, what is the value of <span className="italic">{k}</span>?</>,
    notQuiteTitle: "Not quite",
    notQuiteDesc: "Let's look at this together.",
    tryAgain: "Try Again",
    showMe: "Show me how",
    aiTutor: "AI Tutor",
    interactiveCoaching: "Interactive Coaching",
    thinkTogether: "Let's Think This Through Together",
    answerBelow: "Answer the questions below to discover the solution",
    questionOf: (s: number, tot: number) => `Question ${s} of ${tot}`,
    complete: (p: number) => `${p}% Complete`,
    submitAnswer: "Submit Answer",
    needHint: "Need a Hint?",
    hideHint: "Hide Hint",
    correctContinue: "✓ Correct! Let's continue...",
    correctAll: "✓ Correct! All questions completed!",
    completed: "Completed",
    socratic1Q: <>In the formula D = b² − 4ac, what operation do we perform on <span className="text-indigo-700">b</span>?</>,
    socratic1Opts: ["Halve it", "Square it", "Multiply by 4", "Subtract from a"],
    socratic2Q: <>For the equation x² − 6x + k = 0, what is <span className="text-indigo-700">b²</span>?</>,
    socratic3Q: <>So 36 − 4k = 0. What is <span className="text-indigo-700">k</span>?</>,
    wrongFeedback: "Not quite. Try again or ask for a hint.",
    hintLabel: "💡 Hint:",
    hintText: "Since 4k = 36, try dividing both sides by 4.",
    lookTogether: "Let's look at this together",
    givenEquation: "Given Equation",
    discriminantFormula: "Discriminant Formula",
    twoSolutions: "D > 0 → Two distinct solutions",
    oneSolution: "D = 0 → Exactly one solution ✓",
    noSolutions: "D < 0 → No real solutions",
    condition: "Condition",
    conditionText: "exactly one solution → D = 0",
    stepByStep: "Step-by-Step",
    commonMistake: "⚠️ Common Mistake",
    commonMistakeText: <>You need to <span className="font-bold">square</span> b, not halve it!</>,
    gotIt: "Got it!",
    xpEarned: "+25 XP Earned!",
    sessionComplete: "🌟 Session Complete!",
    xpEarnedLabel: "XP Earned",
    newCard: "New Card: Discriminant Master",
    discriminantExpert: "Discriminant Expert",
    bronzeTier: "Bronze Tier",
    streakTitle: "7-Day Streak!",
    streakDesc: "Keep going — you're on fire!",
    readyNext: "You won't make this mistake again. Ready for the next one?",
  },
  ko: {
    satMath: "SAT 수학 연습",
    question: "문제",
    discriminants: "판별식",
    medium: "중급",
    problemText: (k: string) => <>만약 <span className="font-mono font-semibold text-indigo-700">x² − 6x + k = 0</span>이 정확히 하나의 실근을 가지면, <span className="italic">{k}</span>의 값은?</>,
    notQuiteTitle: "아쉬워요",
    notQuiteDesc: "같이 살펴볼까요?",
    tryAgain: "다시 시도",
    showMe: "풀이 보기",
    aiTutor: "AI 튜터",
    interactiveCoaching: "대화형 코칭",
    thinkTogether: "함께 풀어봅시다",
    answerBelow: "아래 질문에 답하며 풀이를 찾아보세요",
    questionOf: (s: number, tot: number) => `질문 ${s} / ${tot}`,
    complete: (p: number) => `${p}% 완료`,
    submitAnswer: "정답 제출",
    needHint: "힌트 보기",
    hideHint: "힌트 숨기기",
    correctContinue: "✓ 정답! 계속 진행합니다...",
    correctAll: "✓ 정답! 모든 질문을 완료했습니다!",
    completed: "완료",
    socratic1Q: <>공식 D = b² − 4ac에서 <span className="text-indigo-700">b</span>에 어떤 연산을 수행하나요?</>,
    socratic1Opts: ["반으로 나누기", "제곱하기", "4를 곱하기", "a에서 빼기"],
    socratic2Q: <>방정식 x² − 6x + k = 0에서 <span className="text-indigo-700">b²</span>의 값은?</>,
    socratic3Q: <>그러면 36 − 4k = 0. <span className="text-indigo-700">k</span>의 값은?</>,
    wrongFeedback: "아쉬워요. 다시 시도하거나 힌트를 요청하세요.",
    hintLabel: "💡 힌트:",
    hintText: "4k = 36이므로, 양변을 4로 나눠보세요.",
    lookTogether: "같이 풀어봅시다",
    givenEquation: "주어진 방정식",
    discriminantFormula: "판별식 공식",
    twoSolutions: "D > 0 → 서로 다른 두 실근",
    oneSolution: "D = 0 → 정확히 하나의 실근 ✓",
    noSolutions: "D < 0 → 실근 없음",
    condition: "조건",
    conditionText: "정확히 하나의 실근 → D = 0",
    stepByStep: "단계별 풀이",
    commonMistake: "⚠️ 흔한 실수",
    commonMistakeText: <>b를 반으로 나누는 게 아니라 <span className="font-bold">제곱</span>해야 합니다!</>,
    gotIt: "알겠어요!",
    xpEarned: "+25 XP 획득!",
    sessionComplete: "🌟 세션 완료!",
    xpEarnedLabel: "획득 XP",
    newCard: "새 카드: 판별식 마스터",
    discriminantExpert: "판별식 전문가",
    bronzeTier: "브론즈 등급",
    streakTitle: "7일 연속 학습!",
    streakDesc: "계속 해봐요!",
    readyNext: "이제 이 실수는 안 할 거예요. 다음 문제 준비됐나요?",
  },
  ms: {
    satMath: "Latihan Matematik SAT",
    question: "Soalan",
    discriminants: "Diskriminan",
    medium: "Sederhana",
    problemText: (k: string) => <>Jika <span className="font-mono font-semibold text-indigo-700">x² − 6x + k = 0</span> mempunyai tepat satu penyelesaian nyata, apakah nilai <span className="italic">{k}</span>?</>,
    notQuiteTitle: "Belum tepat",
    notQuiteDesc: "Jom lihat bersama.",
    tryAgain: "Cuba lagi",
    showMe: "Tunjukkan caranya",
    aiTutor: "Tutor AI",
    interactiveCoaching: "Bimbingan Interaktif",
    thinkTogether: "Jom Fikirkan Bersama",
    answerBelow: "Jawab soalan di bawah untuk menemui penyelesaian",
    questionOf: (s: number, tot: number) => `Soalan ${s} daripada ${tot}`,
    complete: (p: number) => `${p}% Selesai`,
    submitAnswer: "Hantar Jawapan",
    needHint: "Perlukan Petunjuk?",
    hideHint: "Sembunyikan",
    correctContinue: "✓ Betul! Jom teruskan...",
    correctAll: "✓ Betul! Semua soalan selesai!",
    completed: "Selesai",
    socratic1Q: <>Dalam formula D = b² − 4ac, apakah operasi yang kita lakukan pada <span className="text-indigo-700">b</span>?</>,
    socratic1Opts: ["Bahagi dua", "Kuasa dua", "Darab dengan 4", "Tolak daripada a"],
    socratic2Q: <>Untuk persamaan x² − 6x + k = 0, apakah <span className="text-indigo-700">b²</span>?</>,
    socratic3Q: <>Jadi 36 − 4k = 0. Apakah <span className="text-indigo-700">k</span>?</>,
    wrongFeedback: "Belum tepat. Cuba lagi atau minta petunjuk.",
    hintLabel: "💡 Petunjuk:",
    hintText: "Oleh kerana 4k = 36, cuba bahagi kedua-dua belah dengan 4.",
    lookTogether: "Jom lihat bersama",
    givenEquation: "Persamaan Diberi",
    discriminantFormula: "Formula Diskriminan",
    twoSolutions: "D > 0 → Dua penyelesaian berbeza",
    oneSolution: "D = 0 → Tepat satu penyelesaian ✓",
    noSolutions: "D < 0 → Tiada penyelesaian nyata",
    condition: "Syarat",
    conditionText: "tepat satu penyelesaian → D = 0",
    stepByStep: "Langkah demi Langkah",
    commonMistake: "⚠️ Kesilapan Biasa",
    commonMistakeText: <>Anda perlu <span className="font-bold">kuasa dua</span> b, bukan bahagi dua!</>,
    gotIt: "Faham!",
    xpEarned: "+25 XP Diperoleh!",
    sessionComplete: "🌟 Sesi Selesai!",
    xpEarnedLabel: "XP Diperoleh",
    newCard: "Kad Baharu: Pakar Diskriminan",
    discriminantExpert: "Pakar Diskriminan",
    bronzeTier: "Tahap Gangsa",
    streakTitle: "Rekod 7 Hari!",
    streakDesc: "Teruskan — anda hebat!",
    readyNext: "Anda tak akan buat kesilapan ini lagi. Sedia untuk soalan seterusnya?",
  },
  zh: {
    satMath: "SAT 数学练习",
    question: "题目",
    discriminants: "判别式",
    medium: "中等",
    problemText: (k: string) => <>如果 <span className="font-mono font-semibold text-indigo-700">x² − 6x + k = 0</span> 恰好有一个实数解，<span className="italic">{k}</span> 的值是多少？</>,
    notQuiteTitle: "还不对",
    notQuiteDesc: "我们一起来看看。",
    tryAgain: "再试一次",
    showMe: "查看解析",
    aiTutor: "AI 导师",
    interactiveCoaching: "互动辅导",
    thinkTogether: "一起来思考",
    answerBelow: "回答下方问题，找到答案",
    questionOf: (s: number, tot: number) => `第 ${s} 题，共 ${tot} 题`,
    complete: (p: number) => `${p}% 已完成`,
    submitAnswer: "提交答案",
    needHint: "需要提示？",
    hideHint: "隐藏提示",
    correctContinue: "✓ 正确！继续...",
    correctAll: "✓ 正确！所有题目已完成！",
    completed: "已完成",
    socratic1Q: <>在公式 D = b² − 4ac 中，我们对 <span className="text-indigo-700">b</span> 进行什么运算？</>,
    socratic1Opts: ["除以二", "平方", "乘以4", "从a中减去"],
    socratic2Q: <>对于方程 x² − 6x + k = 0，<span className="text-indigo-700">b²</span> 是多少？</>,
    socratic3Q: <>所以 36 − 4k = 0。<span className="text-indigo-700">k</span> 是多少？</>,
    wrongFeedback: "还不对。再试一次或查看提示。",
    hintLabel: "💡 提示：",
    hintText: "既然 4k = 36，试着两边都除以 4。",
    lookTogether: "一起来看看",
    givenEquation: "已知方程",
    discriminantFormula: "判别式公式",
    twoSolutions: "D > 0 → 两个不同实根",
    oneSolution: "D = 0 → 恰好一个实根 ✓",
    noSolutions: "D < 0 → 无实根",
    condition: "条件",
    conditionText: "恰好一个实根 → D = 0",
    stepByStep: "分步求解",
    commonMistake: "⚠️ 常见错误",
    commonMistakeText: <>你需要对 b 取<span className="font-bold">平方</span>，而不是除以二！</>,
    gotIt: "明白了！",
    xpEarned: "+25 XP 获得！",
    sessionComplete: "🌟 课程完成！",
    xpEarnedLabel: "获得 XP",
    newCard: "新卡片：判别式大师",
    discriminantExpert: "判别式专家",
    bronzeTier: "青铜等级",
    streakTitle: "连续学习7天！",
    streakDesc: "继续加油！",
    readyNext: "这个错误不会再犯了。准备好下一题了吗？",
  },
} as const;

function useT() {
  const locale = useLocale() as Locale;
  return t[locale] || t.en;
}

/* ─── Shared helpers ────────────────────────────────────────────── */

function useDelayed(active: boolean, delayMs: number) {
  const [fired, setFired] = useState(false);
  useEffect(() => {
    if (!active) { setFired(false); return; }
    const t = setTimeout(() => setFired(true), delayMs);
    return () => clearTimeout(t);
  }, [active, delayMs]);
  return fired;
}

/* ─── Step 1 : Problem screen (SAT-style) ───────────────────────── */

export function StepProblem({ active }: { active: boolean }) {
  const l = useT();
  const selected = useDelayed(active, 1500);
  const submitted = useDelayed(active, 2800);

  return (
    <div className="h-full flex flex-col text-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">{l.satMath}</span>
        <div className="flex items-center gap-3 text-white text-xs">
          <span className="font-mono font-bold">28:45</span>
          <span className="text-blue-100">5 / 22</span>
        </div>
      </div>

      {/* Problem */}
      <div className="flex-1 px-5 py-4">
        <div className="mb-1 text-xs text-gray-400">{l.question} 5</div>
        <div className="text-xs text-gray-400 mb-3">
          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-semibold">{l.discriminants}</span>
          <span className="ml-2 text-gray-400 text-[10px]">{l.medium}</span>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed">
          {l.problemText("k")}
        </p>

        {/* Choices */}
        <div className="mt-5 space-y-2.5">
          {[
            { letter: "A", value: "k = 0" },
            { letter: "B", value: "k = 3" },
            { letter: "C", value: "k = 9" },
            { letter: "D", value: "k = 36" },
          ].map((c) => {
            const isB = c.letter === "B";
            const isSelected = isB && selected;
            const isWrong = isB && submitted;
            return (
              <div
                key={c.letter}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border-2 transition-all duration-500 ${
                  isWrong
                    ? "border-red-500 bg-red-50"
                    : isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                }`}
              >
                <span className={`font-bold text-base ${
                  isWrong ? "text-red-600" : isSelected ? "text-blue-600" : "text-gray-400"
                }`}>
                  {c.letter}.
                </span>
                <span className={`text-sm ${isWrong ? "text-red-700" : isSelected ? "text-blue-700" : "text-gray-700"}`}>
                  {c.value}
                </span>
                {isWrong && (
                  <svg className="w-5 h-5 text-red-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2 : Incorrect feedback modal ─────────────────────────── */

export function StepFeedback({ active }: { active: boolean }) {
  const l = useT();
  const clickTry = useDelayed(active, 2000);

  return (
    <div className="h-full flex flex-col">
      {/* Dimmed background */}
      <div className="flex-1 relative bg-gray-100">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className={`bg-white rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl transition-all duration-300 ${active ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{l.notQuiteTitle}</h3>
            <p className="text-gray-600 text-center mb-6 text-sm">{l.notQuiteDesc}</p>
            <div className="flex flex-col gap-2.5">
              <button className={`w-full px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-500 ${
                clickTry ? "bg-blue-700 text-white ring-2 ring-blue-300 scale-[1.02]" : "bg-blue-600 text-white"
              }`}>
                {l.tryAgain}
              </button>
              <button className="w-full px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm">
                {l.showMe}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3 : Socratic Q1 ─────────────────────────────────────── */

export function StepSocratic1({ active }: { active: boolean }) {
  const l = useT();
  const selectAnswer = useDelayed(active, 1800);
  const showCorrect = useDelayed(active, 3200);

  return (
    <SocraticLayout step={1} total={3} progress={selectAnswer ? 33 : 0}>
      <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200">
        <p className="text-sm font-semibold text-gray-800 mb-4">
          {l.socratic1Q}
        </p>
        <div className="space-y-2">
          {l.socratic1Opts.map((opt, idx) => {
            const isCorrect = idx === 1; // "Square it" equivalent
            const isSelected = isCorrect && selectAnswer;
            const isGreen = isCorrect && showCorrect;
            return (
              <div
                key={idx}
                className={`w-full text-left px-4 py-2.5 rounded-lg border-2 text-sm transition-all duration-500 ${
                  isGreen
                    ? "border-green-500 bg-green-100 font-semibold"
                    : isSelected
                      ? "border-blue-500 bg-blue-100 font-semibold"
                      : "border-gray-200 bg-white"
                }`}
              >
                <span className="text-gray-700">{opt}</span>
              </div>
            );
          })}
        </div>
        {showCorrect && (
          <div className="mt-3 p-2.5 bg-green-100 border border-green-300 rounded-lg text-green-800 font-semibold text-sm">
            {l.correctContinue}
          </div>
        )}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium text-xs">{l.submitAnswer}</button>
          <button className="px-3 py-2 bg-yellow-500 text-white rounded-lg font-medium text-xs">{l.needHint}</button>
        </div>
      </div>
    </SocraticLayout>
  );
}

/* ─── Step 4 : Socratic Q2 ─────────────────────────────────────── */

export function StepSocratic2({ active }: { active: boolean }) {
  const l = useT();
  const selectAnswer = useDelayed(active, 1800);
  const showCorrect = useDelayed(active, 3000);

  return (
    <SocraticLayout step={2} total={3} progress={selectAnswer ? 66 : 33}>
      <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200">
        <p className="text-sm font-semibold text-gray-800 mb-4">
          {l.socratic2Q}
        </p>
        <div className="space-y-2">
          {["−6", "6", "36", "−36"].map((opt) => {
            const isCorrect = opt === "36";
            const isSelected = isCorrect && selectAnswer;
            const isGreen = isCorrect && showCorrect;
            return (
              <div
                key={opt}
                className={`w-full text-left px-4 py-2.5 rounded-lg border-2 text-sm transition-all duration-500 ${
                  isGreen
                    ? "border-green-500 bg-green-100 font-semibold"
                    : isSelected
                      ? "border-blue-500 bg-blue-100 font-semibold"
                      : "border-gray-200 bg-white"
                }`}
              >
                <span className="text-gray-700">{opt}</span>
              </div>
            );
          })}
        </div>
        {showCorrect && (
          <div className="mt-3 p-2.5 bg-green-100 border border-green-300 rounded-lg text-green-800 font-semibold text-sm">
            {l.correctContinue}
          </div>
        )}
        {/* Completed tracker */}
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs font-semibold text-green-800">✓ {l.completed}: 1 / 3</p>
          <p className="text-[10px] text-green-700 ml-2 mt-0.5">• {l.question} 1 ✓</p>
        </div>
      </div>
    </SocraticLayout>
  );
}

/* ─── Step 5 : Socratic Q3 + Hint ──────────────────────────────── */

export function StepSocratic3({ active }: { active: boolean }) {
  const l = useT();
  const selectWrong = useDelayed(active, 1200);
  const showWrongFb = useDelayed(active, 1800);
  const showHint = useDelayed(active, 2800);
  const selectCorrect = useDelayed(active, 3800);
  const showCorrect = useDelayed(active, 4200);

  return (
    <SocraticLayout step={3} total={3} progress={showCorrect ? 100 : 66}>
      <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200">
        <p className="text-sm font-semibold text-gray-800 mb-4">
          {l.socratic3Q}
        </p>
        <div className="space-y-2">
          {["3", "9", "12", "36"].map((opt) => {
            const is3 = opt === "3";
            const is9 = opt === "9";
            const isWrongSelected = is3 && selectWrong && !selectCorrect;
            const isWrongFeedback = is3 && showWrongFb && !selectCorrect;
            const isCorrectSelected = is9 && selectCorrect;
            const isGreen = is9 && showCorrect;
            return (
              <div
                key={opt}
                className={`w-full text-left px-4 py-2.5 rounded-lg border-2 text-sm transition-all duration-500 ${
                  isGreen
                    ? "border-green-500 bg-green-100 font-semibold"
                    : isCorrectSelected
                      ? "border-blue-500 bg-blue-100 font-semibold"
                      : isWrongFeedback
                        ? "border-red-500 bg-red-100"
                        : isWrongSelected
                          ? "border-blue-500 bg-blue-100 font-semibold"
                          : "border-gray-200 bg-white"
                }`}
              >
                <span className="text-gray-700">{opt}</span>
              </div>
            );
          })}
        </div>

        {/* Wrong feedback */}
        {showWrongFb && !selectCorrect && (
          <div className="mt-3 p-2.5 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
            {l.wrongFeedback}
          </div>
        )}

        {/* Hint */}
        {showHint && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="text-xs font-semibold text-yellow-800 mb-0.5">{l.hintLabel}</p>
            <p className="text-xs text-gray-700">{l.hintText}</p>
          </div>
        )}

        {showCorrect && (
          <div className="mt-3 p-2.5 bg-green-100 border border-green-300 rounded-lg text-green-800 font-semibold text-sm">
            {l.correctAll}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium text-xs">{l.submitAnswer}</button>
          <button className={`px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 ${
            showHint ? "bg-yellow-600 text-white" : "bg-yellow-500 text-white"
          }`}>{showHint ? l.hideHint : l.needHint}</button>
        </div>
      </div>
    </SocraticLayout>
  );
}

/* ─── Step 6 : Visual Nudge (Discriminant) ─────────────────────── */

export function StepVisualNudge({ active }: { active: boolean }) {
  const l = useT();
  const showFormula = useDelayed(active, 800);
  const showCondition = useDelayed(active, 1800);
  const showCalc = useDelayed(active, 2800);
  const showAnswer = useDelayed(active, 4000);
  const showWarning = useDelayed(active, 5200);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative bg-gray-100">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl overflow-y-auto max-h-[95%]">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-4">
              {l.lookTogether}
            </h3>

            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              {/* Given equation */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                <p className="text-[10px] text-gray-500 mb-1">{l.givenEquation}</p>
                <p className="font-mono text-base font-bold text-blue-800">x² − 6x + k = 0</p>
              </div>

              {/* Discriminant formula */}
              <div className={`bg-purple-50 p-3 rounded-lg border border-purple-200 text-center transition-all duration-500 ${showFormula ? "opacity-100" : "opacity-0"}`}>
                <p className="text-[10px] text-gray-500 mb-1">{l.discriminantFormula}</p>
                <p className="font-mono text-sm font-bold text-purple-800 mb-2">D = b² − 4ac</p>
                <div className="text-[10px] space-y-0.5">
                  <p className="text-gray-500">{l.twoSolutions}</p>
                  <p className="font-bold text-purple-800">{l.oneSolution}</p>
                  <p className="text-gray-500">{l.noSolutions}</p>
                </div>
              </div>

              {/* Condition */}
              <div className={`bg-green-50 p-3 rounded-lg border border-green-200 text-center transition-all duration-500 ${showCondition ? "opacity-100" : "opacity-0"}`}>
                <p className="text-[10px] text-gray-500 mb-1">{l.condition}</p>
                <p className="text-sm font-bold text-green-800">{l.conditionText}</p>
              </div>

              {/* Calculation */}
              <div className={`bg-yellow-50 p-3 rounded-lg border border-yellow-200 transition-all duration-500 ${showCalc ? "opacity-100" : "opacity-0"}`}>
                <p className="text-[10px] text-gray-500 mb-2 text-center">{l.stepByStep}</p>
                <div className="space-y-1 text-xs font-mono text-gray-800">
                  <p>a = 1, b = −6, c = k</p>
                  <p>(−6)² − 4(1)(k) = 0</p>
                  <p>36 − 4k = 0</p>
                  <p className={`font-bold text-green-700 transition-all duration-500 ${showAnswer ? "opacity-100" : "opacity-0"}`}>
                    k = 36 ÷ 4 = <span className="text-base">9</span> ✓
                  </p>
                </div>
              </div>

              {/* Warning */}
              <div className={`bg-red-50 p-3 rounded-lg border border-red-200 transition-all duration-500 ${showWarning ? "opacity-100" : "opacity-0"}`}>
                <p className="text-[10px] font-semibold text-red-700">{l.commonMistake}</p>
                <p className="text-xs text-red-600 mt-0.5">
                  {l.commonMistakeText}
                </p>
                <p className="text-[10px] font-mono text-red-400 mt-1 line-through">k = 6 ÷ 2 = 3 ✗</p>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                {l.gotIt}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 7 : Retry + Correct ─────────────────────────────────── */

export function StepRetry({ active }: { active: boolean }) {
  const l = useT();
  const selectC = useDelayed(active, 1500);
  const showCorrect = useDelayed(active, 2500);
  const showXP = useDelayed(active, 3200);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">{l.satMath}</span>
        <div className="flex items-center gap-3 text-white text-xs">
          <span className="font-mono font-bold">27:32</span>
        </div>
      </div>

      <div className="flex-1 px-5 py-4">
        <p className="text-sm text-gray-800 leading-relaxed mb-4">
          {l.problemText("k")}
        </p>

        <div className="space-y-2.5">
          {[
            { letter: "A", value: "k = 0" },
            { letter: "B", value: "k = 3" },
            { letter: "C", value: "k = 9" },
            { letter: "D", value: "k = 36" },
          ].map((c) => {
            const isC = c.letter === "C";
            const isSelected = isC && selectC;
            const isGreen = isC && showCorrect;
            return (
              <div
                key={c.letter}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border-2 transition-all duration-500 ${
                  isGreen
                    ? "border-green-500 bg-green-50"
                    : isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                }`}
              >
                <span className={`font-bold text-base ${
                  isGreen ? "text-green-600" : isSelected ? "text-blue-600" : "text-gray-400"
                }`}>
                  {c.letter}.
                </span>
                <span className={`text-sm ${isGreen ? "text-green-700 font-medium" : "text-gray-700"}`}>{c.value}</span>
                {isGreen && (
                  <svg className="w-5 h-5 text-green-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* XP popup */}
        {showXP && (
          <div className="mt-4 text-center">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold animate-bounce">
              {l.xpEarned}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Step 8 : Session result ──────────────────────────────────── */

export function StepResult({ active }: { active: boolean }) {
  const l = useT();
  const showXP = useDelayed(active, 500);
  const showCard = useDelayed(active, 1500);
  const showStreak = useDelayed(active, 2500);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-center">
        <span className="text-white font-bold text-lg">{l.sessionComplete}</span>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col items-center justify-center gap-5">
        {/* XP */}
        <div className={`text-center transition-all duration-700 ${showXP ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="text-4xl font-bold text-amber-500">+25</div>
          <div className="text-sm text-gray-500 mt-1">{l.xpEarnedLabel}</div>
        </div>

        {/* Card */}
        <div className={`w-full max-w-xs bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white text-center transition-all duration-700 ${showCard ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="text-2xl mb-1">🏅</div>
          <div className="font-bold text-sm">{l.newCard}</div>
          <div className="text-xs text-indigo-200 mt-1">{l.discriminantExpert}</div>
          <div className="mt-2 inline-block px-2 py-0.5 bg-white/20 rounded text-[10px]">{l.bronzeTier}</div>
        </div>

        {/* Streak */}
        <div className={`flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg transition-all duration-700 ${showStreak ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-xl">🔥</span>
          <div>
            <div className="text-sm font-bold text-orange-700">{l.streakTitle}</div>
            <div className="text-[10px] text-orange-500">{l.streakDesc}</div>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-2">
          {l.readyNext}
        </p>
      </div>
    </div>
  );
}

/* ─── Shared Socratic Layout ──────────────────────────────────── */

function SocraticLayout({
  step,
  total,
  progress,
  children,
}: {
  step: number;
  total: number;
  progress: number;
  children: React.ReactNode;
}) {
  const l = useT();

  return (
    <div className="h-full flex flex-col text-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">💡</div>
          <span className="text-white font-semibold text-sm">{l.aiTutor}</span>
        </div>
        <span className="text-emerald-100 text-[10px]">{l.interactiveCoaching}</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto">
        <h3 className="text-base font-bold text-gray-800 mb-1 text-center">
          {l.thinkTogether}
        </h3>
        <p className="text-xs text-gray-500 text-center mb-3">{l.answerBelow}</p>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 mb-4">
          <span>{l.questionOf(step, total)}</span>
          <span>•</span>
          <span>{l.complete(progress)}</span>
        </div>

        {children}
      </div>
    </div>
  );
}
