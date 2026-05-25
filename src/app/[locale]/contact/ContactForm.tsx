"use client";

import { useActionState, useState } from "react";
import { submitInquiry, type SubmitResult } from "./actions";
import type {
  BlogLocale,
  TutoringTrack,
  TutoringResidence,
  TutoringTrack3,
  TutoringGoal,
} from "@/types/blog";

/* ─────────────────────────────────────────────────────────────
   COPY (ko/en — ms/zh는 별도 페이지로 fallback)
───────────────────────────────────────────────────────────── */

const COPY = {
  ko: {
    stepLabel: (n: number) => `Step ${n} / 4`,
    next: "다음 →",
    back: "← 이전",

    // Step 1
    step1Title: "자녀에게 맞는 트랙을 추천해 드릴게요.",
    step1Subtitle: "30초면 됩니다 — 3가지만 알려 주세요.",
    gradeLabel: "자녀 학년",
    gradePlaceholder: "선택해 주세요",
    gradeHelp:
      "미국 학교 학년(G1~G12) 기준입니다. UK Year · 한국 학년 매핑이 함께 표시됩니다.",
    gradeGroups: [
      {
        group: "Elementary · 초등 (미국 5년 · 만 6~11세)",
        items: [
          { v: "G1", l: "G1 · UK Year 2 · 한국 초1 (만 6~7세)" },
          { v: "G2", l: "G2 · UK Year 3 · 한국 초2 (만 7~8세)" },
          { v: "G3", l: "G3 · UK Year 4 · 한국 초3 (만 8~9세)" },
          { v: "G4", l: "G4 · UK Year 5 · 한국 초4 (만 9~10세)" },
          { v: "G5", l: "G5 · UK Year 6 · 한국 초5 (만 10~11세)" },
        ],
      },
      {
        group: "Middle School · 중등 (미국 3년 · 만 11~14세)",
        items: [
          { v: "G6", l: "G6 · UK Year 7 · 한국 초6 (만 11~12세)" },
          { v: "G7", l: "G7 · UK Year 8 · 한국 중1 (만 12~13세)" },
          { v: "G8", l: "G8 · UK Year 9 · 한국 중2 (만 13~14세)" },
        ],
      },
      {
        group: "High School · 고등 (미국 4년 · 만 14~18세)",
        items: [
          { v: "G9", l: "G9 · UK Year 10 · 한국 중3 (만 14~15세) — IGCSE 1년차" },
          { v: "G10", l: "G10 · UK Year 11 · 한국 고1 (만 15~16세) — IGCSE 시험" },
          { v: "G11", l: "G11 · UK Year 12 · 한국 고2 (만 16~17세) — AS-Level" },
          { v: "G12", l: "G12 · UK Year 13 · 한국 고3 (만 17~18세) — A-Level 시험" },
        ],
      },
    ],
    trackLabel: "공부 경로",
    trackHint: "어떤 시험·커리큘럼을 준비하시나요?",
    trackOptions: {
      us: { title: "US 트랙", body: "SAT · AP · Common Core" },
      uk: { title: "UK 트랙", body: "IGCSE · A-Level · GCSE" },
      both: { title: "둘 다 고려 중", body: "아직 결정하지 않음 / 양쪽 가능성" },
    },
    residenceLabel: "현재 거주지",
    residenceOptions: { kr: "한국", overseas: "해외" },
    step1Cta: "다음으로 →",
    noPersonalNote: "이 단계에서는 연락처를 받지 않습니다.",

    // Step 2 (NEW) — 목표 선택 (다중 가능)
    step2Title: "어떤 목표를 가지고 계신가요?",
    step2Subtitle: "선택하신 목표에 따라 가장 적합한 코스를 추천해 드립니다.",
    step2MultiHint: "✓ 여러 개를 선택하실 수 있어요 (1개 이상 필요)",
    step2Cta: "추천 코스 보기 →",
    goalGroupUs: "US 트랙",
    goalGroupUk: "UK 트랙",

    // Step 3 (이전 Step 2) — 추천 코스 + 기본 가격
    step3Eyebrow: "맞춤 추천",
    step3Title: "추천 코스",
    step3Subtitle:
      "자녀의 학년·목표를 바탕으로 가장 적합한 코스를 추천드립니다.",
    step3Cta: "이 코스로 신청 계속하기 →",
    summaryGrade: "학년",
    summaryTrack: "경로",
    summaryResidence: "거주",
    summaryGoal: "목표",
    priceLabel: "월 수업료",
    priceUnit: "만 원",
    cardPaymentHint:
      "위 결제 금액은 카드 결제 기준이며, 현금 결제 시 추가 혜택이 있습니다.",
    selectedGoalsLabel: "선택하신 목표",
    feeNote:
      "💬 다양한 수업 코스와 비용에 대해서는 상담에서 안내드립니다.",

    // Step 4 (이전 Step 3) — 연락처
    step4Eyebrow: "마지막 단계",
    step4Title: "연락처를 남겨 주세요",
    step4Subtitle:
      "Mathiter Tutoring에서 영업시간 1시간 이내로 직접 연락드립니다.",
    studentName: "학생 이름",
    studentNamePh: "예: 박세준",
    studentNameHint:
      "어머님/아버님께 어떻게 호칭할지 알기 위해 받습니다.",
    contactMethod: "선호 연락 방법",
    contactMethods: { kakao: "카카오톡", phone: "전화", email: "이메일" },
    contactDetail: "연락처",
    contactDetailPh: "카카오톡 ID, 전화번호, 또는 이메일",
    message: "추가로 전하실 말씀 (선택)",
    messagePh: "자녀의 현재 상황이나 가장 고민되는 부분을 자유롭게 적어 주세요.",
    submit: "무료 30분 상담 신청",
    submitting: "보내는 중...",
    requiredHint: "* 표시는 필수 항목입니다.",

    successTitle: "신청이 접수되었습니다.",
    successBodyFire: "영업시간 1시간 이내에 회신드리겠습니다.",
    successBodyLog: "Mathiter Tutoring에서 곧 연락드립니다. (서버 로그 모드)",
    successContact: "긴급한 문의는 contact@mathiter.com",
  },
  en: {
    stepLabel: (n: number) => `Step ${n} / 4`,
    next: "Next →",
    back: "← Back",

    step1Title: "Let us recommend the right track.",
    step1Subtitle: "Takes 30 seconds — just three quick questions.",
    gradeLabel: "Student's grade",
    gradePlaceholder: "Please select",
    gradeHelp:
      "Based on US grade (G1~G12). UK Year and KR grade equivalents shown.",
    gradeGroups: [
      {
        group: "Elementary · US 5 years · ages 6~11",
        items: [
          { v: "G1", l: "G1 · UK Year 2 · KR 초1 (ages 6~7)" },
          { v: "G2", l: "G2 · UK Year 3 · KR 초2 (ages 7~8)" },
          { v: "G3", l: "G3 · UK Year 4 · KR 초3 (ages 8~9)" },
          { v: "G4", l: "G4 · UK Year 5 · KR 초4 (ages 9~10)" },
          { v: "G5", l: "G5 · UK Year 6 · KR 초5 (ages 10~11)" },
        ],
      },
      {
        group: "Middle School · US 3 years · ages 11~14",
        items: [
          { v: "G6", l: "G6 · UK Year 7 · KR 초6 (ages 11~12)" },
          { v: "G7", l: "G7 · UK Year 8 · KR 중1 (ages 12~13)" },
          { v: "G8", l: "G8 · UK Year 9 · KR 중2 (ages 13~14)" },
        ],
      },
      {
        group: "High School · US 4 years · ages 14~18",
        items: [
          { v: "G9", l: "G9 · UK Year 10 · KR 중3 (ages 14~15) — IGCSE Year 1" },
          { v: "G10", l: "G10 · UK Year 11 · KR 고1 (ages 15~16) — IGCSE exam" },
          { v: "G11", l: "G11 · UK Year 12 · KR 고2 (ages 16~17) — AS-Level" },
          { v: "G12", l: "G12 · UK Year 13 · KR 고3 (ages 17~18) — A-Level exam" },
        ],
      },
    ],
    trackLabel: "Curriculum track",
    trackHint: "Which exams or curriculum are you preparing for?",
    trackOptions: {
      us: { title: "US Track", body: "SAT · AP · Common Core" },
      uk: { title: "UK Track", body: "IGCSE · A-Level · GCSE" },
      both: { title: "Considering both", body: "Not decided yet" },
    },
    residenceLabel: "Current residence",
    residenceOptions: { kr: "Korea", overseas: "Overseas" },
    step1Cta: "Next →",
    noPersonalNote: "No contact details collected at this step.",

    step2Title: "What is your goal?",
    step2Subtitle:
      "We'll recommend the most suitable course based on your goals.",
    step2MultiHint: "✓ You can select multiple (at least 1 required)",
    step2Cta: "See recommended course →",
    goalGroupUs: "US Track",
    goalGroupUk: "UK Track",

    step3Eyebrow: "Personalized recommendation",
    step3Title: "Recommended course",
    step3Subtitle:
      "Based on your child's grade and goal, this is our recommended course.",
    step3Cta: "Continue with this course →",
    summaryGrade: "Grade",
    summaryTrack: "Track",
    summaryResidence: "Residence",
    summaryGoal: "Goal",
    priceLabel: "Monthly tuition",
    priceUnit: "₩10K",
    cardPaymentHint:
      "The amount above is for card payment. Cash payments include additional benefits.",
    selectedGoalsLabel: "Selected goals",
    feeNote:
      "💬 Different course options and pricing are explained during the consultation.",

    step4Eyebrow: "Final step",
    step4Title: "Leave your contact details",
    step4Subtitle:
      "Mathiter Tutoring will reach out within 1 business hour.",
    studentName: "Student's name",
    studentNamePh: "e.g., Sejun Park",
    studentNameHint:
      "So we know how to address you (e.g., \"Sejun's mom\").",
    contactMethod: "Preferred contact method",
    contactMethods: { kakao: "KakaoTalk", phone: "Phone", email: "Email" },
    contactDetail: "Contact details",
    contactDetailPh: "KakaoTalk ID, phone number, or email",
    message: "Anything else (optional)",
    messagePh:
      "Please share your child's current situation or what worries you most.",
    submit: "Book free 30-min consultation",
    submitting: "Sending...",
    requiredHint: "* indicates required fields.",

    successTitle: "Received.",
    successBodyFire: "We'll reply within 1 business hour.",
    successBodyLog:
      "Mathiter Tutoring will contact you shortly. (server log mode)",
    successContact: "Urgent? contact@mathiter.com",
  },
} as const;

/* ─────────────────────────────────────────────────────────────
   GOAL 옵션 + 추천 로직 (2026-05-25 v2 옵션 A)
───────────────────────────────────────────────────────────── */

interface GoalDef {
  key: TutoringGoal;
  name: { ko: string; en: string };
  desc: { ko: string; en: string };
  recommendedTrack: TutoringTrack3;
  groupLabel?: "us" | "uk"; // 고등 only — US/UK 그룹 분리용
}

const GOALS: GoalDef[] = [
  // 초등 (G1-5) — 시험 X
  {
    key: "elem-school-pace",
    name: { ko: "학교 진도 보조", en: "School-pace support" },
    desc: {
      ko: "학교에서 배우는 내용을 안정적으로 따라가기",
      en: "Steady support to keep up with school curriculum",
    },
    recommendedTrack: "regular",
  },
  {
    key: "elem-foundation",
    name: { ko: "기초 + 사고력 강화", en: "Foundations + thinking skills" },
    desc: {
      ko: "수학 개념을 단단히 다지고 수학적 사고력 키우기",
      en: "Build solid foundations and develop mathematical thinking",
    },
    recommendedTrack: "regular",
  },
  {
    key: "elem-accelerated",
    name: { ko: "선행 학습", en: "Accelerated learning" },
    desc: {
      ko: "학년에 비해 1~2년 선행 진도 (영재학원 대비 등)",
      en: "1–2 year acceleration ahead of grade level",
    },
    recommendedTrack: "advanced", // 선행 = 학습량 많아야 가능 → 심화
  },

  // 중등 (G6-8) — 시험 X (Pre-SAT 는 US 전용, IGCSE 입문은 UK 전용)
  {
    key: "mid-school-pace",
    name: { ko: "학교 진도 보조", en: "School-pace support" },
    desc: {
      ko: "Pre-Algebra · Algebra 기초 안정",
      en: "Steady support for Pre-Algebra & Algebra basics",
    },
    recommendedTrack: "regular",
    // groupLabel 없음 = common (US/UK 모두 표시)
  },
  {
    key: "mid-pre-sat",
    name: { ko: "Pre-SAT 기초", en: "Pre-SAT foundations" },
    desc: {
      ko: "SAT 준비를 위한 기초 다지기 (G7~8 권장)",
      en: "Build foundations for future SAT prep (G7~8 recommended)",
    },
    recommendedTrack: "regular",
    groupLabel: "us",
  },
  {
    key: "mid-igcse-intro",
    name: { ko: "IGCSE 입문", en: "IGCSE introduction" },
    desc: {
      ko: "G8 진단 + IGCSE 시작 전 브리지",
      en: "G8 diagnostic + bridge before starting IGCSE",
    },
    recommendedTrack: "regular",
    groupLabel: "uk",
  },
  {
    key: "mid-accelerated",
    name: { ko: "선행 학습", en: "Accelerated learning" },
    desc: {
      ko: "2~3년 선행 진도 (영재학원 · AMC 8 대비)",
      en: "2–3 year acceleration (gifted program / AMC 8 prep)",
    },
    recommendedTrack: "advanced", // 선행 = 학습량 많아야 가능 → 심화
    // groupLabel 없음 = common
  },

  // 고등 US
  {
    key: "high-us-sat",
    name: { ko: "SAT", en: "SAT" },
    desc: {
      ko: "Digital SAT Math 800 목표",
      en: "Digital SAT Math 800 target",
    },
    recommendedTrack: "regular",
    groupLabel: "us",
  },
  {
    key: "high-us-ap-ab",
    name: { ko: "AP Calculus AB", en: "AP Calculus AB" },
    desc: {
      ko: "AP Calculus AB 5점 대비 (G10~G12)",
      en: "AP Calculus AB 5 prep (G10~G12)",
    },
    recommendedTrack: "advanced",
    groupLabel: "us",
  },
  {
    key: "high-us-ap-bc",
    name: { ko: "AP Calculus BC", en: "AP Calculus BC" },
    desc: {
      ko: "AP Calculus BC 5점 대비 (G11~G12)",
      en: "AP Calculus BC 5 prep (G11~G12)",
    },
    recommendedTrack: "advanced",
    groupLabel: "us",
  },

  // 고등 UK
  {
    key: "high-uk-igcse-diagnostic",
    name: {
      ko: "IGCSE Mathematics 진단 · 점수 개선",
      en: "IGCSE Math diagnostic & score improvement",
    },
    desc: {
      ko: "현재 점수 진단 + 약점 보완 (Year 10~11)",
      en: "Current score diagnostic + targeted improvement",
    },
    recommendedTrack: "regular",
    groupLabel: "uk",
  },
  {
    key: "high-uk-igcse-add-math",
    name: {
      ko: "IGCSE Additional Mathematics 심화 학습",
      en: "IGCSE Additional Mathematics advanced study",
    },
    desc: {
      ko: "Add Math A* 목표 심화 학습",
      en: "Additional Math A* deep dive",
    },
    recommendedTrack: "regular",
    groupLabel: "uk",
  },
  {
    key: "high-uk-a-level-bridge",
    name: {
      ko: "A Level Mathematics 준비 브리지 코스",
      en: "A Level Math bridge course",
    },
    desc: {
      ko: "IGCSE → A Level 전환 브리지 (Year 11~12)",
      en: "Bridge from IGCSE to A Level (Year 11~12)",
    },
    recommendedTrack: "advanced",
    groupLabel: "uk",
  },
  {
    key: "high-uk-a-level-full",
    name: {
      ko: "AS/A Level Mathematics + Further Mathematics",
      en: "AS/A Level Math + Further Math",
    },
    desc: {
      ko: "A Level Math + Further Math 동시 진행 (Year 12~13)",
      en: "A Level + Further Math combined (Year 12~13)",
    },
    recommendedTrack: "advanced",
    groupLabel: "uk",
  },
];

function gradeGroup(grade: string): "elementary" | "middle" | "high" {
  const n = parseInt(grade.replace(/[^0-9]/g, ""), 10);
  if (!n) return "elementary";
  if (n <= 5) return "elementary";
  if (n <= 8) return "middle";
  return "high";
}

function goalsForGradeAndTrack(
  grade: string,
  track: TutoringTrack
): GoalDef[] {
  const group = gradeGroup(grade);

  // 1단계: 학년 그룹별 후보 추출
  let candidates: GoalDef[];
  if (group === "elementary") {
    candidates = GOALS.filter((g) => g.key.startsWith("elem-"));
  } else if (group === "middle") {
    candidates = GOALS.filter((g) => g.key.startsWith("mid-"));
  } else {
    candidates = GOALS.filter((g) => g.key.startsWith("high-"));
  }

  // 2단계: 트랙별 필터 (Both 면 다 표시)
  if (track === "both") return candidates;
  // common (groupLabel 없음) + 해당 트랙만
  return candidates.filter((g) => !g.groupLabel || g.groupLabel === track);
}

function findGoal(key: TutoringGoal): GoalDef | undefined {
  return GOALS.find((g) => g.key === key);
}

/* ─────────────────────────────────────────────────────────────
   TRACK META (Step 3 표시용 — 가격 X)
───────────────────────────────────────────────────────────── */

const TRACK_META: Record<
  TutoringTrack3,
  {
    name: { ko: string; en: string };
    frequency: { ko: string; en: string };
    icon: string;
  }
> = {
  regular: {
    name: { ko: "정규 코스", en: "Regular" },
    frequency: { ko: "주 1회 · 60분 · 월 4회", en: "1× / week · 60 min · 4×/month" },
    icon: "🟢",
  },
  advanced: {
    name: { ko: "심화 코스", en: "Advanced" },
    frequency: { ko: "주 2회 · 60분 · 월 8회", en: "2× / week · 60 min · 8×/month" },
    icon: "🔵",
  },
  elite: {
    name: { ko: "엘리트 코스", en: "Elite" },
    frequency: { ko: "주 3회 · 60분 · 월 12회", en: "3× / week · 60 min · 12×/month" },
    icon: "🟣",
  },
};

// 추천 트랙 + 학년 그룹 → 월 수업료 (만 원 단위) — PricingTable과 동일한 가격표
const TRACK_PRICES: Record<
  TutoringTrack3,
  Record<"elementary" | "middle" | "high", number>
> = {
  regular: { elementary: 25, middle: 40, high: 50 },
  advanced: { elementary: 40, middle: 65, high: 80 },
  elite: { elementary: 53, middle: 85, high: 105 },
};

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */

interface Props {
  locale: BlogLocale;
}

export default function ContactForm({ locale }: Props) {
  const copy = COPY[locale];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [grade, setGrade] = useState<string>("");
  const [track, setTrack] = useState<TutoringTrack | "">("");
  const [residence, setResidence] = useState<TutoringResidence | "">("");
  const [goals, setGoals] = useState<TutoringGoal[]>([]);

  const availableGoals =
    grade && track ? goalsForGradeAndTrack(grade, track as TutoringTrack) : [];

  const selectedGoalDefs = goals
    .map((g) => findGoal(g))
    .filter((d): d is GoalDef => Boolean(d));

  // 다중 선택 → 추천 트랙: 심화가 1개라도 있으면 심화, 아니면 정규
  const recommendedTrack: TutoringTrack3 = selectedGoalDefs.some(
    (d) => d.recommendedTrack === "advanced"
  )
    ? "advanced"
    : selectedGoalDefs.some((d) => d.recommendedTrack === "elite")
      ? "elite"
      : "regular";

  const trackMeta = TRACK_META[recommendedTrack];

  function toggleGoal(key: TutoringGoal) {
    setGoals((prev) =>
      prev.includes(key) ? prev.filter((g) => g !== key) : [...prev, key]
    );
  }

  const [state, formAction, isPending] = useActionState<
    SubmitResult | null,
    FormData
  >(submitInquiry, null);

  /* ───── Success ───── */
  if (state?.ok) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-white to-accent/5 border border-primary/20 p-10 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h2 className="text-xl font-bold mb-3">{copy.successTitle}</h2>
        <p className="text-base text-foreground mb-4">
          {state.mode === "firestore"
            ? copy.successBodyFire
            : copy.successBodyLog}
        </p>
        <p className="text-sm text-muted">{copy.successContact}</p>
      </div>
    );
  }

  /* ───── Progress ───── */
  const Progress = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          {copy.stepLabel(step)}
        </span>
        <span className="text-xs text-muted">
          {Math.round((step / 4) * 100)}%
        </span>
      </div>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>
    </div>
  );

  /* ───── STEP 1 — 학년 + 트랙 + 거주지 ───── */
  if (step === 1) {
    const canProceed = grade && track && residence;
    return (
      <div>
        <Progress />
        <div className="mb-7">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            {copy.step1Title}
          </h2>
          <p className="text-sm text-muted">{copy.step1Subtitle}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            {copy.gradeLabel} <span className="text-primary">*</span>
          </label>
          <p className="text-xs text-muted mb-2">{copy.gradeHelp}</p>
          <select
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              setGoals([]); // 학년 바뀌면 목표 초기화
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm bg-white"
          >
            <option value="" disabled>
              {copy.gradePlaceholder}
            </option>
            {copy.gradeGroups.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.items.map((item) => (
                  <option key={item.v} value={item.v}>
                    {item.l}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            {copy.trackLabel} <span className="text-primary">*</span>
          </label>
          <p className="text-xs text-muted mb-2">{copy.trackHint}</p>
          <div className="grid sm:grid-cols-3 gap-2">
            {(["us", "uk", "both"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTrack(t);
                  setGoals([]); // 트랙 바뀌면 목표 초기화
                }}
                className={`px-4 py-3 border rounded-lg text-left transition-all ${
                  track === t
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-sm font-semibold text-foreground">
                  {copy.trackOptions[t].title}
                </div>
                <div className="text-xs text-muted mt-0.5">
                  {copy.trackOptions[t].body}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-foreground mb-2">
            {copy.residenceLabel} <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["kr", "overseas"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setResidence(r)}
                className={`px-4 py-3 border rounded-lg transition-all ${
                  residence === r
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-sm font-semibold">
                  {copy.residenceOptions[r]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled={!canProceed}
          onClick={() => setStep(2)}
          className="w-full gradient-bg text-white font-semibold px-6 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {copy.step1Cta}
        </button>
        <p className="text-xs text-muted text-center mt-4">
          🔒 {copy.noPersonalNote}
        </p>
      </div>
    );
  }

  /* ───── STEP 2 — 학년별 목표 선택 (다중) ───── */
  if (step === 2) {
    const canProceed = goals.length > 0;
    const group = gradeGroup(grade);
    // Both 트랙 + 고등 → US/UK 그룹 분리. (중등 Both 도 동일 처리 가능하나 옵션이 4개라 단일 리스트로 충분)
    const showUsUkLabels = group === "high" && track === "both";
    const usGoals = availableGoals.filter((g) => g.groupLabel === "us");
    const ukGoals = availableGoals.filter((g) => g.groupLabel === "uk");

    return (
      <div>
        <Progress />
        <div className="mb-7">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            {copy.step2Title}
          </h2>
          <p className="text-sm text-muted">{copy.step2Subtitle}</p>
          <p className="text-xs text-primary mt-2 font-medium">
            {copy.step2MultiHint}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {showUsUkLabels ? (
            <>
              <GoalGroup
                label={copy.goalGroupUs}
                goals={usGoals}
                selected={goals}
                onToggle={toggleGoal}
                locale={locale}
              />
              <GoalGroup
                label={copy.goalGroupUk}
                goals={ukGoals}
                selected={goals}
                onToggle={toggleGoal}
                locale={locale}
              />
            </>
          ) : (
            <GoalGroup
              goals={availableGoals}
              selected={goals}
              onToggle={toggleGoal}
              locale={locale}
            />
          )}
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-5 py-4 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            {copy.back}
          </button>
          <button
            type="button"
            disabled={!canProceed}
            onClick={() => setStep(3)}
            className="gradient-bg text-white font-semibold px-6 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copy.step2Cta}
            {goals.length > 0 && (
              <span className="ml-1 text-xs opacity-80">
                ({goals.length})
              </span>
            )}
          </button>
        </div>
      </div>
    );
  }

  /* ───── STEP 3 — 추천 코스 표시 (학년별 가격 포함) ───── */
  if (step === 3) {
    const goalNames = selectedGoalDefs.map((d) => d.name[locale]);
    const goalSummary =
      goalNames.length === 0
        ? "—"
        : goalNames.length === 1
          ? goalNames[0]
          : `${goalNames[0]} 외 ${goalNames.length - 1}개`;
    return (
      <div>
        <Progress />

        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            {copy.step3Eyebrow}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {copy.step3Title}
          </h2>
          <p className="text-sm text-muted mt-2 leading-relaxed">
            {copy.step3Subtitle}
          </p>
        </div>

        {/* Summary chips */}
        <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <SummaryChip label={copy.summaryGrade} value={grade} />
          <SummaryChip
            label={copy.summaryTrack}
            value={
              track === "us"
                ? copy.trackOptions.us.title
                : track === "uk"
                  ? copy.trackOptions.uk.title
                  : copy.trackOptions.both.title
            }
          />
          <SummaryChip
            label={copy.summaryResidence}
            value={
              residence === "kr"
                ? copy.residenceOptions.kr
                : copy.residenceOptions.overseas
            }
          />
          <SummaryChip label={copy.summaryGoal} value={goalSummary} />
        </div>

        {/* Recommended track card */}
        <div
          className="rounded-2xl p-8 mb-6"
          style={{
            background:
              recommendedTrack === "advanced"
                ? "linear-gradient(135deg, #0b2a57 0%, #1e40af 100%)"
                : recommendedTrack === "elite"
                  ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                  : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "#ffffff",
            boxShadow: "0 18px 48px rgba(15,23,42,0.18)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{trackMeta.icon}</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">
                {locale === "ko" ? "추천 코스" : "Recommended"}
              </div>
              <div className="text-3xl font-bold">{trackMeta.name[locale]}</div>
            </div>
          </div>
          <p className="text-base font-semibold opacity-95 mt-3">
            {trackMeta.frequency[locale]}
          </p>

          {/* 가격 표시 (학년 그룹 기반) + 카드/현금 안내 */}
          <div className="mt-5 pt-5 border-t border-white/25">
            <div className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1">
              {copy.priceLabel}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-bold leading-none">
                {TRACK_PRICES[recommendedTrack][gradeGroup(grade)]}
              </span>
              <span className="text-base font-medium opacity-85">
                {copy.priceUnit}
              </span>
            </div>
            <p className="text-[12px] opacity-80 mt-3 leading-relaxed">
              💳 {copy.cardPaymentHint}
            </p>
          </div>

          {/* 선택한 목표 리스트 (다중) */}
          {selectedGoalDefs.length > 0 && (
            <div className="mt-5 text-sm opacity-95">
              <div className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-2">
                {copy.selectedGoalsLabel} ({selectedGoalDefs.length})
              </div>
              <ul className="space-y-1.5">
                {selectedGoalDefs.map((d) => (
                  <li key={d.key} className="flex items-start gap-2 leading-relaxed">
                    <span className="opacity-75 flex-shrink-0">•</span>
                    <span className="font-medium">{d.name[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Fee note */}
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 leading-relaxed mb-8">
          {copy.feeNote}
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-3">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="px-5 py-4 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            {copy.back}
          </button>
          <button
            type="button"
            onClick={() => setStep(4)}
            className="gradient-bg text-white font-semibold px-6 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            {copy.step3Cta}
          </button>
        </div>
      </div>
    );
  }

  /* ───── STEP 4 — 연락처 ───── */
  return (
    <div>
      <Progress />

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          {copy.step4Eyebrow}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          {copy.step4Title}
        </h2>
        <p className="text-sm text-muted">{copy.step4Subtitle}</p>
      </div>

      <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 mb-6 text-xs text-muted flex flex-wrap items-center gap-2">
        <span>{trackMeta.icon}</span>
        <span className="font-semibold text-foreground">
          {trackMeta.name[locale]}
        </span>
        <span>·</span>
        <span>{grade}</span>
        {selectedGoalDefs.length > 0 && (
          <>
            <span>·</span>
            <span>
              {selectedGoalDefs[0].name[locale]}
              {selectedGoalDefs.length > 1 && (
                <span className="opacity-75"> 외 {selectedGoalDefs.length - 1}개</span>
              )}
            </span>
          </>
        )}
      </div>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="source" value="contact-page-wizard-v2" />
        <input type="hidden" name="gradeLevel" value={grade} />
        <input type="hidden" name="track" value={track} />
        <input type="hidden" name="residence" value={residence} />
        {/* 다중 선택 — 동일 name 으로 여러 input → FormData.getAll("goals") 로 수신 */}
        {goals.map((g) => (
          <input key={g} type="hidden" name="goals" value={g} />
        ))}
        {/* Legacy 호환 — 첫 번째 goal 도 별도로 전송 */}
        <input type="hidden" name="goal" value={goals[0] ?? ""} />
        <input type="hidden" name="recommendedTrack" value={recommendedTrack} />

        {state?.ok === false && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {copy.studentName} <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="studentName"
            required
            placeholder={copy.studentNamePh}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm"
          />
          <p className="text-xs text-muted mt-1.5">{copy.studentNameHint}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {copy.contactMethod} <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["kakao", "phone", "email"] as const).map((m, i) => (
              <label
                key={m}
                className="flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg cursor-pointer has-checked:border-primary has-checked:bg-primary/5 transition-colors text-sm"
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={m}
                  defaultChecked={i === 0}
                  className="accent-primary"
                />
                <span>{copy.contactMethods[m]}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {copy.contactDetail} <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="contactDetail"
            required
            placeholder={copy.contactDetailPh}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {copy.message}
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder={copy.messagePh}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm resize-none"
          />
        </div>

        <p className="text-xs text-muted">{copy.requiredHint}</p>

        <div className="grid grid-cols-[auto_1fr] gap-3">
          <button
            type="button"
            onClick={() => setStep(3)}
            disabled={isPending}
            className="px-5 py-4 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {copy.back}
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="gradient-bg text-white font-semibold px-6 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? copy.submitting : copy.submit}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GoalGroup — 목표 선택 라디오 그룹
───────────────────────────────────────────────────────────── */

function GoalGroup({
  label,
  goals,
  selected,
  onToggle,
  locale,
}: {
  label?: string;
  goals: GoalDef[];
  selected: TutoringGoal[];
  onToggle: (key: TutoringGoal) => void;
  locale: BlogLocale;
}) {
  return (
    <div>
      {label && (
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2.5">
          {label}
        </p>
      )}
      <div className="grid gap-2">
        {goals.map((g) => {
          const isSelected = selected.includes(g.key);
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => onToggle(g.key)}
              aria-pressed={isSelected}
              className={`relative px-4 py-3 pl-11 border rounded-lg text-left transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {/* Checkbox indicator */}
              <span
                aria-hidden
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-5 h-5 rounded border-2 transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isSelected && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 6.5L4.5 9L10 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <div className="text-sm font-semibold text-foreground">
                {g.name[locale]}
              </div>
              <div className="text-xs text-muted mt-1 leading-relaxed">
                {g.desc[locale]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SummaryChip — Step 3 상단 요약
───────────────────────────────────────────────────────────── */

function SummaryChip({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1">
        {label}
      </div>
      <div className="text-sm font-semibold text-foreground truncate">
        {value}
      </div>
    </div>
  );
}
