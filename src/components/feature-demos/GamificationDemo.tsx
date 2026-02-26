"use client";

import GenericDemo from "./GenericDemo";
import { GAMIFICATION_STEPS } from "./GamificationDemoScript";
import { StepXP, StepStreak, StepCards, StepAvatar, StepBadges } from "./GamificationDemoSteps";

const STEP_COMPONENTS = [StepXP, StepStreak, StepCards, StepAvatar, StepBadges];

export default function GamificationDemo() {
  return <GenericDemo steps={GAMIFICATION_STEPS} stepComponents={STEP_COMPONENTS} accentColor="emerald" />;
}
