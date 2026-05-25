"use server";

import { getAdminDb, isFirebaseConfigured } from "@/lib/firebase-admin";
import { sendInquiryNotification } from "@/lib/notify-email";
import type {
  TutoringInquiry,
  TutoringTrack,
  TutoringResidence,
  TutoringTrack3,
  TutoringGoal,
} from "@/types/blog";

const INQUIRY_COLLECTION = "tutoringInquiries";

export type SubmitResult =
  | { ok: true; mode: "firestore" | "log" }
  | { ok: false; error: string };

function asTrack(v: string | null): TutoringTrack {
  if (v === "us" || v === "uk" || v === "both") return v;
  return "both";
}
function asResidence(v: string | null): TutoringResidence {
  return v === "overseas" ? "overseas" : "kr";
}
function asTrack3(v: string | null): TutoringTrack3 {
  if (v === "regular" || v === "advanced" || v === "elite") return v;
  return "regular";
}

const ALL_GOALS: TutoringGoal[] = [
  "elem-school-pace",
  "elem-foundation",
  "elem-accelerated",
  "mid-school-pace",
  "mid-pre-sat",
  "mid-igcse-intro",
  "mid-accelerated",
  "high-us-sat",
  "high-us-ap-ab",
  "high-us-ap-bc",
  "high-uk-igcse-diagnostic",
  "high-uk-igcse-add-math",
  "high-uk-a-level-bridge",
  "high-uk-a-level-full",
];

function asGoal(v: string | null): TutoringGoal {
  if (v && (ALL_GOALS as string[]).includes(v)) return v as TutoringGoal;
  return "elem-school-pace"; // fallback (validation에서 한 번 더 체크)
}

function asGoals(values: FormDataEntryValue[]): TutoringGoal[] {
  return values
    .filter((v): v is string => typeof v === "string")
    .filter((v) => (ALL_GOALS as string[]).includes(v)) as TutoringGoal[];
}

export async function submitInquiry(
  _prevState: SubmitResult | null,
  formData: FormData
): Promise<SubmitResult> {
  const inquiry: TutoringInquiry = {
    // Step 4 — 연락처
    studentName: String(formData.get("studentName") ?? "").trim(),
    contactMethod:
      (formData.get("contactMethod") as
        | "kakao"
        | "phone"
        | "email"
        | null) ?? "kakao",
    contactDetail: String(formData.get("contactDetail") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim() || undefined,

    // Step 1 — Pre-qualifier
    gradeLevel: String(formData.get("gradeLevel") ?? "").trim(),
    track: asTrack(formData.get("track") as string | null),
    residence: asResidence(formData.get("residence") as string | null),

    // Step 2 — 학습 목표 (다중 선택)
    goals: asGoals(formData.getAll("goals")),
    goal: asGoal(formData.get("goal") as string | null), // legacy first-pick

    // Step 3 — 추천 코스 (가격은 별도 페이지에서 안내)
    recommendedTrack: asTrack3(formData.get("recommendedTrack") as string | null),

    // Meta
    source: String(formData.get("source") ?? "").trim() || "contact-page",
    locale: (formData.get("locale") as "ko" | "en" | null) ?? "ko",
  };

  // Validation
  if (!inquiry.studentName) {
    return { ok: false, error: "학생 이름을 입력해 주세요." };
  }
  if (!inquiry.contactDetail) {
    return { ok: false, error: "연락처를 입력해 주세요." };
  }
  if (!inquiry.gradeLevel) {
    return { ok: false, error: "학년 정보가 비어 있습니다. 처음부터 다시 시도해 주세요." };
  }
  if (!inquiry.goals || inquiry.goals.length === 0) {
    return {
      ok: false,
      error: "학습 목표를 1개 이상 선택해 주세요. 처음부터 다시 시도해 주세요.",
    };
  }

  const db = getAdminDb();
  const receivedAt = new Date();

  // Step A: Firestore 저장 (or log)
  let firestoreDocId: string | undefined;
  let mode: "firestore" | "log" = "log";

  if (!db) {
    console.warn(
      "[contact] Firestore not configured. Inquiry would be:",
      JSON.stringify(inquiry, null, 2)
    );
  } else {
    try {
      const doc = await db.collection(INQUIRY_COLLECTION).add({
        ...inquiry,
        createdAt: receivedAt,
        status: "new",
      });
      firestoreDocId = doc.id;
      mode = "firestore";
    } catch (err) {
      console.error("[contact] Failed to save inquiry:", err);
      return {
        ok: false,
        error:
          "신청 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주시거나 contact@mathiter.com으로 직접 연락해 주세요.",
      };
    }
  }

  // Step B: 이메일 알림 (best-effort)
  try {
    const result = await sendInquiryNotification({
      ...inquiry,
      receivedAt,
      firestoreDocId,
    });
    if (!result.ok) {
      console.warn("[contact] Email notification skipped:", result.error);
    }
  } catch (err) {
    console.error("[contact] Email notification threw:", err);
  }

  return { ok: true, mode };
}

export async function isContactBackendReady(): Promise<boolean> {
  return isFirebaseConfigured();
}
