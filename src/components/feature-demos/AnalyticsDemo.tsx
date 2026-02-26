"use client";

import GenericDemo from "./GenericDemo";
import { ANALYTICS_STEPS } from "./AnalyticsDemoScript";
import { StepOverview, StepWeekly, StepRadar, StepPredicted, StepMisconception } from "./AnalyticsDemoSteps";

const STEP_COMPONENTS = [StepOverview, StepWeekly, StepRadar, StepPredicted, StepMisconception];

export default function AnalyticsDemo() {
  return <GenericDemo steps={ANALYTICS_STEPS} stepComponents={STEP_COMPONENTS} accentColor="violet" />;
}
