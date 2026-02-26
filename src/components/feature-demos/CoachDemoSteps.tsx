"use client";

import { useEffect, useState } from "react";

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
  const selected = useDelayed(active, 1500);
  const submitted = useDelayed(active, 2800);

  return (
    <div className="h-full flex flex-col text-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">SAT Math Practice</span>
        <div className="flex items-center gap-3 text-white text-xs">
          <span className="font-mono font-bold">28:45</span>
          <span className="text-blue-100">5 / 22</span>
        </div>
      </div>

      {/* Problem */}
      <div className="flex-1 px-5 py-4">
        <div className="mb-1 text-xs text-gray-400">Question 5</div>
        <div className="text-xs text-gray-400 mb-3">
          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-semibold">Discriminants</span>
          <span className="ml-2 text-gray-400 text-[10px]">Medium</span>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed">
          If <span className="font-mono font-semibold text-indigo-700">x² − 6x + k = 0</span> has exactly one real solution, what is the value of <span className="italic">k</span>?
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
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Not quite</h3>
            <p className="text-gray-600 text-center mb-6 text-sm">Let&apos;s look at this together.</p>
            <div className="flex flex-col gap-2.5">
              <button className={`w-full px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-500 ${
                clickTry ? "bg-blue-700 text-white ring-2 ring-blue-300 scale-[1.02]" : "bg-blue-600 text-white"
              }`}>
                Try Again
              </button>
              <button className="w-full px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm">
                Show me how
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
  const selectAnswer = useDelayed(active, 1800);
  const showCorrect = useDelayed(active, 3200);

  return (
    <SocraticLayout step={1} total={3} progress={selectAnswer ? 33 : 0}>
      <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200">
        <p className="text-sm font-semibold text-gray-800 mb-4">
          In the formula D = b² − 4ac, what operation do we perform on <span className="text-indigo-700">b</span>?
        </p>
        <div className="space-y-2">
          {["Halve it", "Square it", "Multiply by 4", "Subtract from a"].map((opt) => {
            const isCorrect = opt === "Square it";
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
            ✓ Correct! Let&apos;s continue...
          </div>
        )}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium text-xs">Submit Answer</button>
          <button className="px-3 py-2 bg-yellow-500 text-white rounded-lg font-medium text-xs">Need a Hint?</button>
        </div>
      </div>
    </SocraticLayout>
  );
}

/* ─── Step 4 : Socratic Q2 ─────────────────────────────────────── */

export function StepSocratic2({ active }: { active: boolean }) {
  const selectAnswer = useDelayed(active, 1800);
  const showCorrect = useDelayed(active, 3000);

  return (
    <SocraticLayout step={2} total={3} progress={selectAnswer ? 66 : 33}>
      <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200">
        <p className="text-sm font-semibold text-gray-800 mb-4">
          For the equation x² − 6x + k = 0, what is <span className="text-indigo-700">b²</span>?
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
            ✓ Correct! Let&apos;s continue...
          </div>
        )}
        {/* Completed tracker */}
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs font-semibold text-green-800">✓ Completed: 1 / 3</p>
          <p className="text-[10px] text-green-700 ml-2 mt-0.5">• Question 1 ✓</p>
        </div>
      </div>
    </SocraticLayout>
  );
}

/* ─── Step 5 : Socratic Q3 + Hint ──────────────────────────────── */

export function StepSocratic3({ active }: { active: boolean }) {
  const selectWrong = useDelayed(active, 1200);
  const showWrongFb = useDelayed(active, 1800);
  const showHint = useDelayed(active, 2800);
  const selectCorrect = useDelayed(active, 3800);
  const showCorrect = useDelayed(active, 4200);

  return (
    <SocraticLayout step={3} total={3} progress={showCorrect ? 100 : 66}>
      <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200">
        <p className="text-sm font-semibold text-gray-800 mb-4">
          So 36 − 4k = 0. What is <span className="text-indigo-700">k</span>?
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
            Not quite. Try again or ask for a hint.
          </div>
        )}

        {/* Hint */}
        {showHint && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="text-xs font-semibold text-yellow-800 mb-0.5">💡 Hint:</p>
            <p className="text-xs text-gray-700">Since 4k = 36, try dividing both sides by 4.</p>
          </div>
        )}

        {showCorrect && (
          <div className="mt-3 p-2.5 bg-green-100 border border-green-300 rounded-lg text-green-800 font-semibold text-sm">
            ✓ Correct! All questions completed!
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium text-xs">Submit Answer</button>
          <button className={`px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 ${
            showHint ? "bg-yellow-600 text-white" : "bg-yellow-500 text-white"
          }`}>{showHint ? "Hide Hint" : "Need a Hint?"}</button>
        </div>
      </div>
    </SocraticLayout>
  );
}

/* ─── Step 6 : Visual Nudge (Discriminant) ─────────────────────── */

export function StepVisualNudge({ active }: { active: boolean }) {
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
              Let&apos;s look at this together
            </h3>

            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              {/* Given equation */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                <p className="text-[10px] text-gray-500 mb-1">Given Equation</p>
                <p className="font-mono text-base font-bold text-blue-800">x² − 6x + k = 0</p>
              </div>

              {/* Discriminant formula */}
              <div className={`bg-purple-50 p-3 rounded-lg border border-purple-200 text-center transition-all duration-500 ${showFormula ? "opacity-100" : "opacity-0"}`}>
                <p className="text-[10px] text-gray-500 mb-1">Discriminant Formula</p>
                <p className="font-mono text-sm font-bold text-purple-800 mb-2">D = b² − 4ac</p>
                <div className="text-[10px] space-y-0.5">
                  <p className="text-gray-500">D &gt; 0 → Two distinct solutions</p>
                  <p className="font-bold text-purple-800">D = 0 → Exactly one solution ✓</p>
                  <p className="text-gray-500">D &lt; 0 → No real solutions</p>
                </div>
              </div>

              {/* Condition */}
              <div className={`bg-green-50 p-3 rounded-lg border border-green-200 text-center transition-all duration-500 ${showCondition ? "opacity-100" : "opacity-0"}`}>
                <p className="text-[10px] text-gray-500 mb-1">Condition</p>
                <p className="text-sm font-bold text-green-800">exactly one solution → D = 0</p>
              </div>

              {/* Calculation */}
              <div className={`bg-yellow-50 p-3 rounded-lg border border-yellow-200 transition-all duration-500 ${showCalc ? "opacity-100" : "opacity-0"}`}>
                <p className="text-[10px] text-gray-500 mb-2 text-center">Step-by-Step</p>
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
                <p className="text-[10px] font-semibold text-red-700">⚠️ Common Mistake</p>
                <p className="text-xs text-red-600 mt-0.5">
                  You need to <span className="font-bold">square</span> b, not halve it!
                </p>
                <p className="text-[10px] font-mono text-red-400 mt-1 line-through">k = 6 ÷ 2 = 3 ✗</p>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                Got it!
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
  const selectC = useDelayed(active, 1500);
  const showCorrect = useDelayed(active, 2500);
  const showXP = useDelayed(active, 3200);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">SAT Math Practice</span>
        <div className="flex items-center gap-3 text-white text-xs">
          <span className="font-mono font-bold">27:32</span>
        </div>
      </div>

      <div className="flex-1 px-5 py-4">
        <p className="text-sm text-gray-800 leading-relaxed mb-4">
          If <span className="font-mono font-semibold text-indigo-700">x² − 6x + k = 0</span> has exactly one real solution, what is <span className="italic">k</span>?
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
              +25 XP Earned!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Step 8 : Session result ──────────────────────────────────── */

export function StepResult({ active }: { active: boolean }) {
  const showXP = useDelayed(active, 500);
  const showCard = useDelayed(active, 1500);
  const showStreak = useDelayed(active, 2500);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-center">
        <span className="text-white font-bold text-lg">🌟 Session Complete!</span>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col items-center justify-center gap-5">
        {/* XP */}
        <div className={`text-center transition-all duration-700 ${showXP ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="text-4xl font-bold text-amber-500">+25</div>
          <div className="text-sm text-gray-500 mt-1">XP Earned</div>
        </div>

        {/* Card */}
        <div className={`w-full max-w-xs bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white text-center transition-all duration-700 ${showCard ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="text-2xl mb-1">🏅</div>
          <div className="font-bold text-sm">New Card: Discriminant Master</div>
          <div className="text-xs text-indigo-200 mt-1">Discriminant Expert</div>
          <div className="mt-2 inline-block px-2 py-0.5 bg-white/20 rounded text-[10px]">Bronze Tier</div>
        </div>

        {/* Streak */}
        <div className={`flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg transition-all duration-700 ${showStreak ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-xl">🔥</span>
          <div>
            <div className="text-sm font-bold text-orange-700">7-Day Streak!</div>
            <div className="text-[10px] text-orange-500">Keep going — you&apos;re on fire!</div>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-2">
          You won&apos;t make this mistake again. Ready for the next one?
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
  return (
    <div className="h-full flex flex-col text-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">💡</div>
          <span className="text-white font-semibold text-sm">AI Tutor</span>
        </div>
        <span className="text-emerald-100 text-[10px]">Interactive Coaching</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto">
        <h3 className="text-base font-bold text-gray-800 mb-1 text-center">
          Let&apos;s Think This Through Together
        </h3>
        <p className="text-xs text-gray-500 text-center mb-3">Answer the questions below to discover the solution</p>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 mb-4">
          <span>Question {step} of {total}</span>
          <span>•</span>
          <span>{progress}% Complete</span>
        </div>

        {children}
      </div>
    </div>
  );
}
