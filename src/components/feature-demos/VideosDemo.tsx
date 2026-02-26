"use client";

import GenericDemo from "./GenericDemo";
import { VIDEOS_STEPS } from "./VideosDemoScript";
import { StepCurriculum, StepVideo, StepGraph, StepConcept, StepAskAI } from "./VideosDemoSteps";

const STEP_COMPONENTS = [StepCurriculum, StepVideo, StepGraph, StepConcept, StepAskAI];

export default function VideosDemo() {
  return <GenericDemo steps={VIDEOS_STEPS} stepComponents={STEP_COMPONENTS} accentColor="cyan" />;
}
