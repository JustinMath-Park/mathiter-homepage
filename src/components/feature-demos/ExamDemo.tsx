"use client";

import GenericDemo from "./GenericDemo";
import { EXAM_STEPS } from "./ExamDemoScript";
import { StepSelect, StepExam, StepTools, StepAdaptive, StepResults } from "./ExamDemoSteps";

const STEP_COMPONENTS = [StepSelect, StepExam, StepTools, StepAdaptive, StepResults];

export default function ExamDemo() {
  return <GenericDemo steps={EXAM_STEPS} stepComponents={STEP_COMPONENTS} accentColor="orange" />;
}
