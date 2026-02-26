"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useLocale } from "next-intl";
import type { DemoStep } from "./CoachDemoScript";

type Locale = "en" | "ko" | "ms" | "zh";

interface GenericDemoProps {
  steps: DemoStep[];
  stepComponents: React.ComponentType<{ active: boolean }>[];
  accentColor?: string; // e.g. "indigo", "cyan", "violet"
}

export default function GenericDemo({
  steps,
  stepComponents,
  accentColor = "indigo",
}: GenericDemoProps) {
  const locale = (useLocale() as Locale) || "en";
  const [currentStep, setCurrentStep] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToStep = useCallback((nextStep: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setFading(false);
    }, 300);
  }, []);

  useEffect(() => {
    const duration = steps[currentStep].duration;
    timerRef.current = setTimeout(() => {
      const next = (currentStep + 1) % steps.length;
      goToStep(next);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentStep, goToStep, steps]);

  const handleDotClick = (idx: number) => {
    if (idx === currentStep) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    goToStep(idx);
  };

  const StepComponent = stepComponents[currentStep];
  const caption =
    steps[currentStep].caption[locale] || steps[currentStep].caption.en;

  const dotActive = `bg-${accentColor}-500`;
  const badgeBg = `bg-${accentColor}-100`;
  const badgeText = `text-${accentColor}-700`;
  const barBg = `bg-${accentColor}-500`;

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Left: App mockup */}
      <div className="md:w-1/2 flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-[360px] bg-white rounded-[2rem] shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-900 h-6 flex items-center justify-center">
              <div className="w-20 h-3 bg-black rounded-full" />
            </div>
            <div
              className={`h-[480px] overflow-hidden transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
            >
              <StepComponent active={!fading} />
            </div>
            <div className="bg-gray-900 h-4 flex items-center justify-center">
              <div className="w-24 h-1 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 pb-4">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => handleDotClick(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? `w-6 h-2 ${dotActive}`
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Step ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right: Caption */}
      <div className="md:w-1/2 flex flex-col justify-center p-6 md:p-10">
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${badgeBg} ${badgeText} text-sm font-bold`}
          >
            {currentStep + 1}
          </span>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Step {currentStep + 1} / {steps.length}
          </span>
        </div>

        <div
          className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
        >
          {caption.split("\n").map((line, i) => (
            <p
              key={i}
              className={`text-gray-700 leading-relaxed ${i === 0 ? "text-lg font-semibold text-gray-900" : "mt-2 text-base"}`}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className={`${barBg} h-full rounded-full transition-all duration-500`}
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() =>
              handleDotClick(
                currentStep === 0 ? steps.length - 1 : currentStep - 1,
              )
            }
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Prev
          </button>
          <button
            onClick={() =>
              handleDotClick((currentStep + 1) % steps.length)
            }
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
