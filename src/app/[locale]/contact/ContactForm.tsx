"use client";

import { useActionState, useState } from "react";
import { submitInquiry, type SubmitResult } from "./actions";
import type {
  BlogLocale,
  TutoringTrack,
  TutoringResidence,
  TutoringPackage,
} from "@/types/blog";

/* ─────────────────────────────────────────────────────────────
   COPY
───────────────────────────────────────────────────────────── */

const COPY = {
  ko: {
    stepLabel: (n: number) => `Step ${n} / 3`,
    next: "다음 →",
    back: "← 이전",

    step1Title: "자녀에게 맞는 패키지를 추천해 드릴게요.",
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
    step1Cta: "추천 패키지 보기 →",
    noPersonalNote: "이 단계에서는 연락처를 받지 않습니다.",

    step2Eyebrow: "추천 패키지",
    step2TitlePrefix: "학년 {grade}, ",
    tracksLabel: { us: "US 트랙", uk: "UK 트랙", both: "US·UK 양쪽 고려" },
    residenceText: { kr: "한국 거주", overseas: "해외 거주" },
    step2Title: " 학생을 위한 맞춤 패키지",
    perMonth: "/ 월",
    cardPaymentNote:
      "💳 표시 금액은 카드결제 기준입니다. 현금 결제 시 상담을 통해 추가 혜택을 안내해 드립니다.",
    groupDiscountNote:
      "💡 같은 학년 친구 3명과 함께 신청하시면 그룹 단가가 적용됩니다. 자세한 조건은 무료 상담 시 안내해 드립니다.",
    masterNote:
      "※ Master 패키지는 입시·경시·시험 임박 학생을 위한 1:1 밀착 진행 패키지입니다.",
    secondaryEyebrow: "AP · SAT 적극 대비",
    secondaryHeadline:
      "G11에 AP 시험 5점을 노리신다면, Master가 더 효율적입니다",
    secondaryBody:
      "Master는 주 3회로 학습 빈도가 1.5배 늘어나지만, 회당 단가는 오히려 ₩{savePerSession}원 저렴합니다 (Pro 대비 17% ↓). AP·SAT 같은 고난도 시험을 단기간에 끌어올려야 하는 학생에게 가장 효과적이에요.",
    secondaryCompare: "회당 단가",
    secondaryPickThis: "Master로 신청하기 →",
    pickThis: "이 패키지로 신청하기 →",
    step2Cta: "신청 계속하기 →",

    step3Eyebrow: "마지막 단계",
    step3Title: "연락처를 남겨 주세요",
    step3Subtitle:
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
    stepLabel: (n: number) => `Step ${n} / 3`,
    next: "Next →",
    back: "← Back",

    step1Title: "Let us recommend the right package.",
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
    step1Cta: "See recommended package →",
    noPersonalNote: "No contact details collected at this step.",

    step2Eyebrow: "Recommended package",
    step2TitlePrefix: "For a Grade {grade}, ",
    tracksLabel: { us: "US Track", uk: "UK Track", both: "US / UK (both)" },
    residenceText: { kr: "Korea-based", overseas: "Overseas-based" },
    step2Title: " student",
    perMonth: " / month",
    cardPaymentNote:
      "💳 Listed price is for card payment. Cash payment includes additional benefits — discussed during consultation.",
    groupDiscountNote:
      "💡 Group rates apply when three friends in the same grade apply together. Conditions explained during the free consultation.",
    masterNote:
      "※ Master is a focused 1:1 package for admissions, competitions, or short-deadline exam prep.",
    secondaryEyebrow: "Serious AP · SAT prep",
    secondaryHeadline:
      "Aiming for a 5 on AP exams in G11? Master is more efficient.",
    secondaryBody:
      "Master adds 1.5× session frequency, yet costs ₩{savePerSession} less per session (17% lower vs. Pro). Best for students who must lift AP/SAT scores in a short window.",
    secondaryCompare: "Per-session rate",
    secondaryPickThis: "Apply with Master →",
    pickThis: "Apply with this package →",
    step2Cta: "Continue to apply →",

    step3Eyebrow: "Final step",
    step3Title: "Leave your contact details",
    step3Subtitle:
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
   추천 알고리즘 + 패키지 데이터
───────────────────────────────────────────────────────────── */

const PACKAGES: Record<
  TutoringPackage,
  {
    name: string;
    icon: string;
    stage: { ko: string; en: string };
    pricePerMonth: number;
    sessions: { ko: string; en: string };
    includes: { ko: string[]; en: string[] };
    groupEligible: boolean;
  }
> = {
  basic: {
    name: "Basic",
    icon: "🚲",
    stage: { ko: "초등 (US G1~5)", en: "Elementary (US G1~5)" },
    pricePerMonth: 600000,
    sessions: {
      ko: "주 2회 × 50분 · 월 8회 1:1 화상",
      en: "Twice a week × 50 min · 8 sessions/month",
    },
    includes: {
      ko: [
        "Mathiter 학습앱 (Common Core 기반)",
        "분수·소수·비율 등 핵심 개념",
        "주간 학습 진도 리포트",
      ],
      en: [
        "Mathiter learning app (Common Core aligned)",
        "Core concepts: fractions, decimals, ratios",
        "Weekly progress reports",
      ],
    },
    groupEligible: false,
  },
  advanced: {
    name: "Advanced",
    icon: "🚗",
    stage: { ko: "중등 (US G6~8)", en: "Middle School (US G6~8)" },
    pricePerMonth: 860000,
    sessions: {
      ko: "주 2회 × 55분 · 월 8회 1:1 화상",
      en: "Twice a week × 55 min · 8 sessions/month",
    },
    includes: {
      ko: [
        "Pre-Algebra · Algebra 1 집중",
        "US Middle School GPA 관리",
        "Mathiter 학습앱 + 학부모 주간 리포트",
      ],
      en: [
        "Pre-Algebra & Algebra 1 focus",
        "US Middle School GPA management",
        "Mathiter app + weekly parent report",
      ],
    },
    groupEligible: true,
  },
  pro: {
    name: "Pro",
    icon: "🚙",
    stage: { ko: "고등 (US G9~11)", en: "High School (US G9~11)" },
    pricePerMonth: 960000,
    sessions: {
      ko: "주 2회 × 55분 · 월 8회 1:1 화상",
      en: "Twice a week × 55 min · 8 sessions/month",
    },
    includes: {
      ko: [
        "Algebra 1·2 · Geometry · Pre-Calculus",
        "SAT 실전 대비 + GPA 마스터",
        "Mathiter 학습앱 + 학부모 주간 리포트",
      ],
      en: [
        "Algebra 1/2, Geometry, Pre-Calculus",
        "SAT prep + GPA mastery",
        "Mathiter app + weekly parent report",
      ],
    },
    groupEligible: true,
  },
  master: {
    name: "Master",
    icon: "🏎️",
    stage: {
      ko: "입시·경시·시험 임박",
      en: "Admissions · Competition · Exam-imminent",
    },
    pricePerMonth: 1200000,
    sessions: {
      ko: "주 3회 × 55분 · 월 12회 1:1 화상",
      en: "Three times a week × 55 min · 12 sessions/month",
    },
    includes: {
      ko: [
        "AP / SAT / ACT / AMC 대비",
        "1:1 입시·학습 컨설팅",
        "Mathiter 학습앱 + 학부모 주간 리포트",
      ],
      en: [
        "AP / SAT / ACT / AMC prep",
        "1:1 admissions & study consulting",
        "Mathiter app + weekly parent report",
      ],
    },
    groupEligible: false,
  },
};

function recommendPackage(grade: string): TutoringPackage {
  const n = parseInt(grade.replace(/[^0-9]/g, ""), 10);
  if (!n) return "basic";
  if (n <= 5) return "basic";
  if (n <= 8) return "advanced";
  if (n <= 11) return "pro";
  return "master"; // G12
}

/**
 * 보조 추천 — G10·G11에서 AP·SAT 적극 대비를 원하는 학생용.
 * 회당 단가가 Pro보다 17% 저렴해서, 빈도 1.5배에도 비용 효율이 더 높음.
 */
function secondaryRecommendation(grade: string): TutoringPackage | null {
  const n = parseInt(grade.replace(/[^0-9]/g, ""), 10);
  if (n === 10 || n === 11) return "master";
  return null;
}

function pricePerSession(p: TutoringPackage): number {
  const pkg = PACKAGES[p];
  const sessionsPerMonth = p === "master" ? 12 : 8;
  return Math.round(pkg.pricePerMonth / sessionsPerMonth);
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */

interface Props {
  locale: BlogLocale;
}

export default function ContactForm({ locale }: Props) {
  const copy = COPY[locale];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [grade, setGrade] = useState<string>("");
  const [track, setTrack] = useState<TutoringTrack | "">("");
  const [residence, setResidence] = useState<TutoringResidence | "">("");
  const [selectedPackage, setSelectedPackage] =
    useState<TutoringPackage | null>(null);

  const recommended: TutoringPackage = grade
    ? recommendPackage(grade)
    : "basic";
  const secondary = grade ? secondaryRecommendation(grade) : null;
  const pkg = PACKAGES[recommended];
  // Step 3에서는 사용자가 실제로 선택한 패키지를 우선
  const finalPackage: TutoringPackage = selectedPackage ?? recommended;

  function chooseAndContinue(p: TutoringPackage) {
    setSelectedPackage(p);
    setStep(3);
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
          {Math.round((step / 3) * 100)}%
        </span>
      </div>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
    </div>
  );

  /* ───── STEP 1 ───── */
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
            onChange={(e) => setGrade(e.target.value)}
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
                onClick={() => setTrack(t)}
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

  /* ───── STEP 2 ───── */
  if (step === 2) {
    const stage = pkg.stage[locale];
    const sessions = pkg.sessions[locale];
    const includes = pkg.includes[locale];
    const trackText = copy.tracksLabel[track as TutoringTrack];
    const residenceText = copy.residenceText[residence as TutoringResidence];
    const priceStr = `₩${pkg.pricePerMonth.toLocaleString()}`;

    return (
      <div>
        <Progress />

        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            {copy.step2Eyebrow}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {copy.step2TitlePrefix.replace("{grade}", grade)}
            {trackText} · {residenceText}
            {copy.step2Title}
          </h2>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-white to-accent/5 border border-primary/20 p-8 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">{pkg.icon}</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary">
                {stage}
              </div>
              <div className="text-2xl font-bold text-foreground">
                {pkg.name}
              </div>
            </div>
          </div>

          <div className="mt-5 mb-5">
            <div className="text-4xl sm:text-5xl font-bold text-foreground">
              {priceStr}
              <span className="text-base font-normal text-muted">
                {copy.perMonth}
              </span>
            </div>
            <div className="text-sm text-muted mt-2">{sessions}</div>
          </div>

          <ul className="space-y-2 mt-5">
            {includes.map((line, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">✓</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 mb-6">
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 leading-relaxed">
            {copy.cardPaymentNote}
          </div>
          {pkg.groupEligible && (
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-900 leading-relaxed">
              {copy.groupDiscountNote}
            </div>
          )}
          {recommended === "master" && (
            <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-xs text-muted leading-relaxed">
              {copy.masterNote}
            </div>
          )}
        </div>

        {/* 메인 추천으로 진행하는 CTA */}
        <div className="grid grid-cols-[auto_1fr] gap-3 mb-8">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-5 py-4 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            {copy.back}
          </button>
          <button
            type="button"
            onClick={() => chooseAndContinue(recommended)}
            className="gradient-bg text-white font-semibold px-6 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            {pkg.name} · {copy.pickThis}
          </button>
        </div>

        {/* 보조 추천 (G10·G11 → Master) */}
        {secondary && (() => {
          const sec = PACKAGES[secondary];
          const mainPerSession = pricePerSession(recommended);
          const secPerSession = pricePerSession(secondary);
          const savePerSession = mainPerSession - secPerSession;
          const savePerSessionStr = savePerSession.toLocaleString();
          return (
            <div className="mt-2 mb-2 rounded-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border border-orange-200 p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-2">
                💡 {copy.secondaryEyebrow}
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 leading-snug">
                {copy.secondaryHeadline}
              </h3>
              <p className="text-sm text-foreground/80 mb-5 leading-relaxed">
                {copy.secondaryBody.replace(
                  "{savePerSession}",
                  savePerSessionStr
                )}
              </p>

              {/* 비교 박스 */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-lg bg-white border border-gray-200 p-4">
                  <div className="text-xs text-muted mb-1">{pkg.name}</div>
                  <div className="text-sm font-semibold mb-1">
                    {pkg.sessions[locale]}
                  </div>
                  <div className="text-xs text-muted mt-2">
                    {copy.secondaryCompare}
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    ₩{mainPerSession.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-lg bg-white border-2 border-orange-400 p-4 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span>{sec.icon}</span>
                    <span className="text-xs font-bold text-orange-700">
                      {sec.name}
                    </span>
                  </div>
                  <div className="text-sm font-semibold mb-1">
                    {sec.sessions[locale]}
                  </div>
                  <div className="text-xs text-muted mt-2">
                    {copy.secondaryCompare}
                  </div>
                  <div className="text-lg font-bold text-orange-700">
                    ₩{secPerSession.toLocaleString()}
                    <span className="text-xs font-normal text-orange-600 ml-1">
                      (-{Math.round((savePerSession / mainPerSession) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Master 월 금액 + CTA */}
              <div className="flex flex-wrap items-baseline gap-2 mb-4">
                <span className="text-sm text-muted">{sec.name} 월</span>
                <span className="text-2xl font-bold text-foreground">
                  ₩{sec.pricePerMonth.toLocaleString()}
                </span>
                <span className="text-sm text-muted">{copy.perMonth}</span>
              </div>

              <button
                type="button"
                onClick={() => chooseAndContinue(secondary)}
                className="w-full bg-gradient-to-br from-orange-500 to-red-500 text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity shadow-md"
              >
                {copy.secondaryPickThis}
              </button>
            </div>
          );
        })()}
      </div>
    );
  }

  /* ───── STEP 3 ───── */
  return (
    <div>
      <Progress />

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          {copy.step3Eyebrow}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          {copy.step3Title}
        </h2>
        <p className="text-sm text-muted">{copy.step3Subtitle}</p>
      </div>

      <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 mb-6 text-xs text-muted flex flex-wrap items-center gap-2">
        <span>{PACKAGES[finalPackage].icon}</span>
        <span className="font-semibold text-foreground">
          {PACKAGES[finalPackage].name}
        </span>
        <span>·</span>
        <span>{grade}</span>
        <span>·</span>
        <span>{copy.tracksLabel[track as TutoringTrack]}</span>
        <span>·</span>
        <span>{copy.residenceText[residence as TutoringResidence]}</span>
      </div>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="source" value="contact-page-wizard" />
        <input type="hidden" name="gradeLevel" value={grade} />
        <input type="hidden" name="track" value={track} />
        <input type="hidden" name="residence" value={residence} />
        <input type="hidden" name="recommendedPackage" value={finalPackage} />

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
            onClick={() => setStep(2)}
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
