"use client";

import { useActionState } from "react";
import { submitInquiry, type SubmitResult } from "./actions";
import type { BlogLocale } from "@/types/blog";

const COPY = {
  ko: {
    parentName: "학부모 성함",
    parentNamePh: "예: 박세준",
    studentGrade: "자녀 학년",
    studentGradePh: "예: G9 (중3) / Y10 / 고1",
    school: "재학(예정) 학교 (선택)",
    schoolPh: "예: KIS, Chadwick, 일반 중학교 등",
    examGoal: "목표 시험 또는 단계 (선택)",
    examGoalPh: "예: SAT 800 목표, AP Calc BC 5점, IB AA HL 7점, 국제학교 입학 준비 등",
    contactMethod: "선호 연락 방법",
    contactMethods: {
      kakao: "카카오톡",
      phone: "전화",
      email: "이메일",
    },
    contactDetail: "연락처",
    contactDetailPh: "카카오톡 ID, 전화번호, 또는 이메일",
    message: "남기실 말씀 (선택)",
    messagePh: "자녀의 현재 상황이나 가장 고민되는 부분을 자유롭게 적어 주세요.",
    submit: "무료 30분 상담 신청",
    submitting: "보내는 중...",
    successFire: "신청이 접수되었습니다. 영업시간 1시간 이내에 회신드리겠습니다.",
    successLog:
      "신청이 접수되었습니다 (서버 로그 모드). 박세준 원장이 곧 직접 연락드립니다.",
    requiredHint: "* 표시는 필수 항목입니다.",
  },
  en: {
    parentName: "Parent's name",
    parentNamePh: "e.g., Sejun Park",
    studentGrade: "Student's grade",
    studentGradePh: "e.g., G9, Y10, 9th",
    school: "School (optional)",
    schoolPh: "e.g., KIS, Chadwick, or current school",
    examGoal: "Target exam or stage (optional)",
    examGoalPh:
      "e.g., SAT 800, AP Calc BC 5, IB AA HL 7, preparing to move to international school",
    contactMethod: "Preferred contact method",
    contactMethods: {
      kakao: "KakaoTalk",
      phone: "Phone",
      email: "Email",
    },
    contactDetail: "Contact details",
    contactDetailPh: "KakaoTalk ID, phone number, or email address",
    message: "Anything else (optional)",
    messagePh:
      "Please share your child's current situation or what worries you most.",
    submit: "Book free 30-min consultation",
    submitting: "Sending...",
    successFire:
      "Received. We'll reply within 1 business hour.",
    successLog:
      "Received (server log mode). Sejun Park will contact you shortly.",
    requiredHint: "* indicates required fields.",
  },
} as const;

interface Props {
  locale: BlogLocale;
}

export default function ContactForm({ locale }: Props) {
  const copy = COPY[locale];
  const [state, formAction, isPending] = useActionState<
    SubmitResult | null,
    FormData
  >(submitInquiry, null);

  if (state?.ok) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-white to-accent/5 border border-primary/20 p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="text-xl font-bold mb-3">
          {state.mode === "firestore" ? copy.successFire : copy.successLog}
        </h2>
        <p className="text-sm text-muted">
          contact@mathiter.com
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source" value="contact-page" />

      {state?.ok === false && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <Field
        label={copy.parentName}
        required
        name="parentName"
        placeholder={copy.parentNamePh}
      />

      <Field
        label={copy.studentGrade}
        required
        name="studentGrade"
        placeholder={copy.studentGradePh}
      />

      <Field
        label={copy.school}
        name="school"
        placeholder={copy.schoolPh}
      />

      <Field
        label={copy.examGoal}
        name="examGoal"
        placeholder={copy.examGoalPh}
      />

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

      <Field
        label={copy.contactDetail}
        required
        name="contactDetail"
        placeholder={copy.contactDetailPh}
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {copy.message}
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder={copy.messagePh}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm resize-none"
        />
      </div>

      <div className="text-xs text-muted">{copy.requiredHint}</div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full gradient-bg text-white font-semibold px-6 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  name,
  placeholder,
}: {
  label: string;
  required?: boolean;
  name: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <input
        type="text"
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm"
      />
    </div>
  );
}
