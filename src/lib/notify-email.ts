import nodemailer from "nodemailer";
import type { TutoringInquiry } from "@/types/blog";

type Transporter = ReturnType<typeof nodemailer.createTransport>;

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return cachedTransporter;
}

export function isEmailNotifyConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export type InquiryEmailPayload = TutoringInquiry & {
  receivedAt?: Date;
  firestoreDocId?: string;
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const PACKAGE_LABELS: Record<string, { name: string; price: string }> = {
  basic: { name: "Basic (초등)", price: "₩600,000 / 월" },
  advanced: { name: "Advanced (중등)", price: "₩860,000 / 월" },
  pro: { name: "Pro (고등)", price: "₩960,000 / 월" },
  master: { name: "Master (입시·경시)", price: "₩1,200,000 / 월" },
};

const TRACK_LABELS: Record<string, string> = {
  us: "US 트랙 (SAT·AP·Common Core)",
  uk: "UK 트랙 (IGCSE·A-Level)",
  both: "US·UK 양쪽 고려",
};

const RESIDENCE_LABELS: Record<string, string> = {
  kr: "한국 거주",
  overseas: "해외 거주",
};

function buildEmailBody(inquiry: InquiryEmailPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const when = (inquiry.receivedAt ?? new Date()).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  // 새 필드 사용 + legacy fallback
  const studentName = inquiry.studentName || inquiry.parentName || "(이름 미입력)";
  const gradeLevel = inquiry.gradeLevel || inquiry.studentGrade || "(학년 미입력)";
  const trackLabel = inquiry.track ? TRACK_LABELS[inquiry.track] : "—";
  const residenceLabel = inquiry.residence
    ? RESIDENCE_LABELS[inquiry.residence]
    : "—";
  const pkg = inquiry.recommendedPackage
    ? PACKAGE_LABELS[inquiry.recommendedPackage]
    : null;

  const subject = `[Mathiter Tutoring] ${studentName} 학생 상담 신청 · ${gradeLevel}${pkg ? ` · ${pkg.name}` : ""}`;

  const lines = [
    `📬 새 상담 신청이 들어왔습니다`,
    ``,
    `[학생 이름] ${studentName} 학생`,
    `[학년] ${gradeLevel}`,
    `[공부 경로] ${trackLabel}`,
    `[현재 거주지] ${residenceLabel}`,
    pkg ? `[추천 패키지] ${pkg.name} — ${pkg.price}` : null,
    ``,
    `[연락 선호] ${inquiry.contactMethod}`,
    `[연락처] ${inquiry.contactDetail}`,
    inquiry.message ? `\n[메시지]\n${inquiry.message}` : null,
    ``,
    `[유입 경로] ${inquiry.source ?? "(unknown)"}`,
    `[로케일] ${inquiry.locale ?? "ko"}`,
    `[수신 시각] ${when} (KST)`,
    inquiry.firestoreDocId
      ? `[Firestore docId] ${inquiry.firestoreDocId}`
      : null,
    ``,
    `--`,
    `Mathiter Tutoring · mathiter.com/contact`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<!doctype html>
<html lang="ko">
<body style="font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;background:#f8fafc;margin:0;padding:24px;color:#0f172a;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid #e2e8f0;">
    <div style="font-size:12px;font-weight:700;letter-spacing:0.16em;color:#f97316;text-transform:uppercase;margin-bottom:8px;">📬 새 상담 신청</div>
    <h2 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#0b2a57;letter-spacing:-0.01em;">${escapeHtml(studentName)} 학생</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#64748b;">${escapeHtml(gradeLevel)} · ${escapeHtml(trackLabel)} · ${escapeHtml(residenceLabel)}</p>

    ${pkg ? `<div style="margin:0 0 24px;padding:18px 20px;background:linear-gradient(135deg,#eff6ff 0%,#f0f9ff 100%);border:1px solid #bfdbfe;border-radius:12px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.16em;color:#2563eb;text-transform:uppercase;margin-bottom:4px;">사용자가 본 추천 패키지</div>
      <div style="font-size:18px;font-weight:700;color:#0b2a57;margin-bottom:2px;">${escapeHtml(pkg.name)}</div>
      <div style="font-size:14px;color:#475569;">${escapeHtml(pkg.price)} (카드결제 기준)</div>
    </div>` : ""}

    <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">
      <tr><td style="padding:6px 0;color:#64748b;width:120px;">학생 이름</td><td style="padding:6px 0;color:#0f172a;font-weight:600;">${escapeHtml(studentName)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">학년</td><td style="padding:6px 0;color:#0f172a;">${escapeHtml(gradeLevel)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">공부 경로</td><td style="padding:6px 0;color:#0f172a;">${escapeHtml(trackLabel)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">거주지</td><td style="padding:6px 0;color:#0f172a;">${escapeHtml(residenceLabel)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">연락 선호</td><td style="padding:6px 0;color:#0f172a;">${escapeHtml(inquiry.contactMethod)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">연락처</td><td style="padding:6px 0;color:#0f172a;font-weight:600;">${escapeHtml(inquiry.contactDetail)}</td></tr>
    </table>

    ${
      inquiry.message
        ? `<div style="margin-top:20px;padding:16px 18px;background:#f8fafc;border-left:3px solid #f97316;border-radius:4px 12px 12px 4px;font-size:14px;line-height:1.7;color:#334155;white-space:pre-wrap;">${escapeHtml(inquiry.message)}</div>`
        : ""
    }

    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #f1f5f9;font-size:12px;color:#94a3b8;line-height:1.7;">
      유입: ${escapeHtml(inquiry.source ?? "(unknown)")} · 로케일: ${escapeHtml(inquiry.locale ?? "ko")}<br>
      수신: ${escapeHtml(when)} (KST)
      ${inquiry.firestoreDocId ? `<br>Firestore docId: <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">${escapeHtml(inquiry.firestoreDocId)}</code>` : ""}
    </div>

    <div style="margin-top:24px;font-size:12px;color:#cbd5e1;text-align:center;">Mathiter Tutoring · mathiter.com/contact</div>
  </div>
</body>
</html>`;

  return { subject, text: lines, html };
}

export async function sendInquiryNotification(
  inquiry: InquiryEmailPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const transporter = getTransporter();
  if (!transporter) {
    return {
      ok: false,
      error: "GMAIL_USER / GMAIL_APP_PASSWORD env vars are not configured.",
    };
  }

  const to = process.env.NOTIFY_EMAIL_TO ?? "sspark222@gmail.com";
  const from = process.env.GMAIL_USER!;
  const replyTo = inquiry.contactDetail.includes("@")
    ? inquiry.contactDetail
    : undefined;

  const { subject, text, html } = buildEmailBody(inquiry);

  try {
    await transporter.sendMail({
      from: `"Mathiter Tutoring" <${from}>`,
      to,
      subject,
      text,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[notify-email] sendMail failed:", message);
    return { ok: false, error: message };
  }
}
