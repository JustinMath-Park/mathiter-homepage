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

function buildEmailBody(inquiry: InquiryEmailPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const when = (inquiry.receivedAt ?? new Date()).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  const subject = `[Mathiter Tutoring] ${inquiry.parentName} 학부모 상담 신청 — ${inquiry.studentGrade}`;

  const lines = [
    `📬 새 상담 신청이 들어왔습니다`,
    ``,
    `[학부모] ${inquiry.parentName}`,
    `[자녀 학년/시험] ${inquiry.studentGrade}`,
    inquiry.school ? `[재학(예정) 학교] ${inquiry.school}` : null,
    inquiry.examGoal ? `[목표 시험·단계] ${inquiry.examGoal}` : null,
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
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid #e2e8f0;">
    <div style="font-size:12px;font-weight:700;letter-spacing:0.16em;color:#f97316;text-transform:uppercase;margin-bottom:8px;">📬 새 상담 신청</div>
    <h2 style="margin:0 0 20px;font-size:20px;font-weight:700;color:#0b2a57;letter-spacing:-0.01em;">${escapeHtml(inquiry.parentName)} 학부모님 — ${escapeHtml(inquiry.studentGrade)}</h2>

    <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">
      <tr><td style="padding:6px 0;color:#64748b;width:120px;">학부모</td><td style="padding:6px 0;color:#0f172a;font-weight:600;">${escapeHtml(inquiry.parentName)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">자녀 학년/시험</td><td style="padding:6px 0;color:#0f172a;">${escapeHtml(inquiry.studentGrade)}</td></tr>
      ${inquiry.school ? `<tr><td style="padding:6px 0;color:#64748b;">재학(예정) 학교</td><td style="padding:6px 0;color:#0f172a;">${escapeHtml(inquiry.school)}</td></tr>` : ""}
      ${inquiry.examGoal ? `<tr><td style="padding:6px 0;color:#64748b;">목표 시험·단계</td><td style="padding:6px 0;color:#0f172a;">${escapeHtml(inquiry.examGoal)}</td></tr>` : ""}
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
