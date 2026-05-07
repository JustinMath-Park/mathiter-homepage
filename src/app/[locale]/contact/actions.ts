"use server";

import { getAdminDb, isFirebaseConfigured } from "@/lib/firebase-admin";
import { sendInquiryNotification } from "@/lib/notify-email";
import type { TutoringInquiry } from "@/types/blog";

const INQUIRY_COLLECTION = "tutoringInquiries";

export type SubmitResult =
  | { ok: true; mode: "firestore" | "log" }
  | { ok: false; error: string };

export async function submitInquiry(
  _prevState: SubmitResult | null,
  formData: FormData
): Promise<SubmitResult> {
  const inquiry: TutoringInquiry = {
    parentName: String(formData.get("parentName") ?? "").trim(),
    studentGrade: String(formData.get("studentGrade") ?? "").trim(),
    school: String(formData.get("school") ?? "").trim() || undefined,
    examGoal: String(formData.get("examGoal") ?? "").trim() || undefined,
    contactMethod:
      (formData.get("contactMethod") as
        | "kakao"
        | "phone"
        | "email"
        | null) ?? "kakao",
    contactDetail: String(formData.get("contactDetail") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim() || undefined,
    source: String(formData.get("source") ?? "").trim() || "contact-page",
    locale: (formData.get("locale") as "ko" | "en" | null) ?? "ko",
  };

  if (!inquiry.parentName) {
    return { ok: false, error: "이름을 입력해 주세요." };
  }
  if (!inquiry.contactDetail) {
    return { ok: false, error: "연락처를 입력해 주세요." };
  }

  const db = getAdminDb();
  const receivedAt = new Date();

  // Step 1: Persist to Firestore (or log if not configured)
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

  // Step 2: Email notification (best-effort — don't fail user submission if SMTP fails)
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
