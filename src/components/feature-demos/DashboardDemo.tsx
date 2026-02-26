"use client";

import GenericDemo from "./GenericDemo";
import { DASHBOARD_STEPS } from "./DashboardDemoScript";
import { StepOverview, StepStudent, StepAssignment, StepResults, StepParent } from "./DashboardDemoSteps";

const STEP_COMPONENTS = [StepOverview, StepStudent, StepAssignment, StepResults, StepParent];

export default function DashboardDemo() {
  return <GenericDemo steps={DASHBOARD_STEPS} stepComponents={STEP_COMPONENTS} accentColor="pink" />;
}
