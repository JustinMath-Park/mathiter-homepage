"use client";

// Static question navigation states for visual variety
const questionStates = [
  "answered", "answered", "answered", "flagged", "current",
  "unanswered", "unanswered", "answered", "unanswered", "unanswered",
  "unanswered", "flagged", "unanswered", "unanswered", "unanswered",
  "unanswered", "unanswered", "unanswered", "unanswered", "unanswered",
  "unanswered", "unanswered",
] as const;

const choices = [
  { letter: "A", value: "−12", selected: true },
  { letter: "B", value: "−6", selected: false },
  { letter: "C", value: "2", selected: false },
  { letter: "D", value: "12", selected: false },
];

export default function SATExamMockup() {
  return (
    <>
      {/* Header bar */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-semibold">SAT Math Practice</span>
          <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">
            Module 1
          </span>
        </div>
        <div className="flex items-center gap-3 text-white text-xs">
          <span className="font-mono font-bold">28:45</span>
          <span className="text-blue-100">5 / 22</span>
        </div>
      </div>

      {/* Question navigation grid */}
      <div className="px-4 pt-3 pb-2 border-b border-gray-100">
        <div className="flex flex-wrap gap-1">
          {questionStates.map((state, i) => {
            const num = i + 1;
            return (
              <div
                key={num}
                className={`w-5 h-5 rounded text-[8px] font-semibold flex items-center justify-center ${
                  state === "current"
                    ? "bg-indigo-500 text-white"
                    : state === "answered"
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                      : state === "flagged"
                        ? "bg-amber-50 text-amber-700 border border-amber-400"
                        : "bg-gray-100 text-gray-400"
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>
      </div>

      {/* Question content */}
      <div className="px-5 py-4">
        <div className="text-[10px] text-gray-400 mb-2">Question 5</div>
        <p className="text-xs text-gray-800 leading-relaxed">
          A function <span className="italic">f</span> is defined by
        </p>
        <p className="mt-2 mb-2 font-mono text-sm font-semibold text-indigo-700 text-center">
          f(x) = 3(x + 2)² − 12
        </p>
        <p className="text-xs text-gray-800 leading-relaxed">
          What is the minimum value of <span className="italic">f</span>(x)?
        </p>
      </div>

      {/* Answer choices */}
      <div className="px-5 pb-4 space-y-2">
        {choices.map((choice) => (
          <div
            key={choice.letter}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs border ${
              choice.selected
                ? "border-indigo-300 bg-indigo-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shrink-0 ${
                choice.selected
                  ? "border-indigo-500 bg-indigo-500 text-white"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {choice.letter}
            </div>
            <span
              className={
                choice.selected
                  ? "text-indigo-700 font-medium"
                  : "text-gray-700"
              }
            >
              {choice.value}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom toolbar */}
      <div className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[10px] text-gray-500">
          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">⚑ Flag</span>
          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">📊 Calc</span>
          <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700">📐 Ref</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-400 px-2 py-1 rounded border border-gray-200">
            ← Prev
          </span>
          <span className="text-[10px] text-white px-2 py-1 rounded bg-indigo-500">
            Next →
          </span>
        </div>
      </div>
    </>
  );
}
