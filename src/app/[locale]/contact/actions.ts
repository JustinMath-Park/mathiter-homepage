"use server";

import { getAdminDb, isFirebaseConfigured } from "@/lib/firebase-admin";
import { sendInquiryNotification } from "@/lib/notify-email";
import type {
  TutoringInquiry,
  TutoringTrack,
  TutoringResidence,
  TutoringPackage,
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
function asPackage(v: string | null): TutoringPackage {
  if (v === "basic" || v === "advanced" || v === "pro" || v === "master")
    return v;
  return "basic";
}

export async function submitInquiry(
  _prevState: SubmitResult | null,
  formData: FormData
): Promise<SubmitResult> {
  const inquiry: TutoringInquiry = {
    // Step 3 — 연락처
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

    // Step 2 — 추천 패키지
    recommendedPackage: asPackage(
      formData.get("recommendedPackage") as string | null
    ),

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
