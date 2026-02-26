"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useLocale } from "next-intl";
import { COACH_STEPS } from "./CoachDemoScript";
import {
  StepProblem,
  StepFeedback,
  StepSocratic1,
  StepSocratic2,
  StepSocratic3,
  StepVisualNudge,
  StepRetry,
  StepResult,
} from "./CoachDemoSteps";

type Locale = "en" | "ko" | "ms" | "zh";

const STEP_COMPONENTS = [
  StepProblem,
  StepFeedback,
  StepSocratic1,
  StepSocratic2,
  StepSocratic3,
  StepVisualNudge,
  StepRetry,
  StepResult,
];

export default function CoachDemo() {
  const locale = (useLocale() as Locale) || "en";
  const [currentStep, setCurrentStep] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);

  const goToStep = useCallback((nextStep: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setFading(false);
    }, 300);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (isPausedRef.current) return;

    const duration = COACH_STEPS[currentStep].duration;
    timerRef.current = setTimeout(() => {
      const next = (currentStep + 1) % COACH_STEPS.length;
      goToStep(next);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentStep, goToStep]);

  // Manual step navigation
  const handleDotClick = (idx: number) => {
    if (idx === currentStep) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    goToStep(idx);
  };

  const StepComponent = STEP_COMPONENTS[currentStep];
  const caption = COACH_STEPS[currentStep].caption[locale] || COACH_STEPS[currentStep].caption.en;

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Left: App mockup */}
      <div className="md:w-1/2 flex flex-col bg-gray-50">
        {/* Phone frame */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-[360px] bg-white rounded-[2rem] shadow-xl border border-gray-200 overflow-hidden">
            {/* Notch */}
            <div className="bg-gray-900 h-6 flex items-center justify-center">
              <div className="w-20 h-3 bg-black rounded-full" />
            </div>
            {/* Screen content */}
            <div
              className={`h-[480px] overflow-hidden transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
            >
              <StepComponent active={!fading} />
            </div>
            {/* Home bar */}
            <div className="bg-gray-900 h-4 flex items-center justify-center">
              <div className="w-24 h-1 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-1.5 pb-4">
          {COACH_STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => handleDotClick(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? "w-6 h-2 bg-indigo-500"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Step ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right: Caption + description */}
      <div className="md:w-1/2 flex flex-col justify-center p-6 md:p-10">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">
            {currentStep + 1}
          </span>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Step {currentStep + 1} / {COACH_STEPS.length}
          </span>
        </div>

        {/* Caption */}
        <div
          className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
        >
          {caption.split("\n").map((line, i) => (
            <p key={i} className={`text-gray-700 leading-relaxed ${i === 0 ? "text-lg font-semibold text-gray-900" : "mt-2 text-base"}`}>
              {line}
            </p>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / COACH_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => handleDotClick(currentStep === 0 ? COACH_STEPS.length - 1 : currentStep - 1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>
          <button
            onClick={() => handleDotClick((currentStep + 1) % COACH_STEPS.length)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
