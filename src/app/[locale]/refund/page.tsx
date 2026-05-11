import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

const content: Record<
  string,
  {
    title: string;
    effectiveDate: string;
    sections: { heading: string; body: string }[];
  }
> = {
  ko: {
    title: "환불정책",
    effectiveDate: "시행일: 2026년 5월 8일",
    sections: [
      {
        heading: "",
        body: `<p>엘리코바(Elicova)(이하 "회사")가 운영하는 Mathiter 서비스의 환불정책을 안내드립니다. 본 환불정책은 「전자상거래 등에서의 소비자보호에 관한 법률」 및 「학원의 설립·운영 및 과외교습에 관한 법률」에 따라 정해진 절차를 준수하며, 회사 서비스 이용약관과 함께 적용됩니다.</p><p>회사는 두 가지 별도의 서비스 트랙(Mathiter Tutoring / Mathiter 학습앱 구독)을 운영하며, 트랙별 환불 정책은 각각 § A, § B에서 별도로 규정됩니다. 어느 트랙에 해당하는지 명확하지 않은 경우 <a href="mailto:support@mathiter.com">support@mathiter.com</a>으로 문의해 주시기 바랍니다.</p>`,
      },
      {
        heading: "§ A. Mathiter Tutoring 환불 정책",
        body: `<p>Mathiter Tutoring은 「학원의 설립·운영 및 과외교습에 관한 법률」에 따라 신고된 개인과외교습 서비스입니다. 본 환불 정책은 동 법령 시행령 제18조의2의 환불 기준을 준수합니다.</p>`,
      },
      {
        heading: "A-1. 사이클 시작 전 환불",
        body: `<p>학부모가 결제수단(빌링키)을 등록했으나 아직 사이클이 시작되지 않은 경우(첫 1:1 화상 수업 개시 전), 회사는 이미 청구된 금액이 없으므로 별도 환불 처리가 필요하지 않습니다. 학부모는 마이페이지에서 빌링키를 즉시 삭제할 수 있습니다.</p><p>사전 영업 프로세스(학부모 상담·진단 테스트·결과 리뷰) 단계는 무료이므로 환불 대상이 아닙니다.</p>`,
      },
      {
        heading: "A-2. 사이클 진행 중 환불 — 회차 비율 정산",
        body: `<p>학부모는 사이클 진행 중 언제든 서비스를 해지할 수 있으며, 진행한 1:1 화상 수업 회차 비율로 정산됩니다.</p><p><strong>환불액 산정 공식</strong>:</p><p style="background:#f9f9f9;padding:12px;border-left:3px solid #2D6BFF;margin:12px 0;font-family:monospace;">정산액 = 사이클 패키지 금액 × (진행한 1:1 화상 회차 ÷ 사이클 총 회차)</p><p><strong>예시</strong>:</p><table style="width:100%;border-collapse:collapse;margin:12px 0;"><thead><tr style="background:#f5f5f5;"><th style="border:1px solid #ddd;padding:8px;text-align:left;">시나리오</th><th style="border:1px solid #ddd;padding:8px;text-align:right;">정산액 (회사 수령)</th><th style="border:1px solid #ddd;padding:8px;text-align:right;">환불액 (학부모)</th></tr></thead><tbody><tr><td style="border:1px solid #ddd;padding:8px;">Basic 60만원 사이클 (8회 중 2회 진행 후 해지)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">150,000원</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">450,000원</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Advanced 86만원 사이클 (8회 중 3회 진행 후 해지)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">322,500원</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">537,500원</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Pro 96만원 사이클 (8회 중 4회 진행 후 해지)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">480,000원</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">480,000원</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Master 120만원 사이클 (12회 중 5회 진행 후 해지)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">500,000원</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">700,000원</td></tr></tbody></table><p>비동기 학습 활동(AI 학습 모니터링·과제 첨삭·학부모 주간 리포트·Q&A)은 1:1 화상 회차에 비례해 진행되므로, 1:1 회차 비율을 전체 교습 진행률의 대표 지표로 사용합니다.</p>`,
      },
      {
        heading: "A-3. 사이클 후납 결제 후 환불",
        body: `<p>사이클이 모두 완료된 후 자동 결제가 이미 이뤄진 상태에서 환불 사유가 발생하는 경우, 회사는 다음 기준으로 처리합니다:</p><ul><li><strong>회사의 책임 있는 사유</strong> (예: 회사가 수업을 정상 제공하지 못함, 시스템 장애로 회차 카운팅 오류) — 회사가 책임지는 부분에 대해 전액 환불 또는 추가 수업 제공.</li><li><strong>학부모의 이의제기가 정당한 경우</strong> — 회차 마킹 오류 또는 정상 진행되지 않은 회차에 대해 해당 회차분 환불.</li><li><strong>일반적 해지</strong> — 이미 완료된 사이클에 대해서는 환불 대상 아님 (서비스가 정상 제공되었으므로).</li></ul>`,
      },
      {
        heading: "A-4. 회사 사정으로 인한 서비스 중단",
        body: `<p>회사의 사정으로 정식 수업 제공이 불가능해진 경우(질병, 시스템 장기 장애 등) 다음 절차에 따라 처리합니다:</p><ul><li><strong>단기 (1~2주 이내)</strong>: 회사가 다른 시간에 보충 수업을 진행하여 회차를 회복합니다.</li><li><strong>장기 (2주 초과)</strong>: 학부모와 협의하여 보충 진행 또는 잔여 회차 비율로 환불 처리합니다.</li><li><strong>서비스 완전 중단</strong>: 진행 중이던 사이클을 즉시 종료하고, 진행하지 못한 회차에 대해 전액 환불합니다.</li></ul>`,
      },
      {
        heading: "A-5. 회차 카운팅 이의제기",
        body: `<p>학부모는 회차가 자동 마킹된 후 24시간 이내 이의를 제기할 수 있습니다. 이의제기는 학부모 대시보드 또는 <a href="mailto:support@mathiter.com">support@mathiter.com</a>으로 제출하시면 됩니다. 회사는 이의제기를 검토 후 정당한 경우 해당 회차의 카운팅을 취소합니다.</p>`,
      },
      {
        heading: "§ B. Mathiter 학습앱 구독 환불 정책",
        body: `<p>Mathiter 학습앱(SaaS) 구독은 「전자상거래 등에서의 소비자보호에 관한 법률」 및 디지털 콘텐츠 약관 일반 원칙에 따라 다음과 같이 운영됩니다.</p>`,
      },
      {
        heading: "B-1. 구독 해지 — 일할 환불 미제공",
        body: `<p>유료 구독자는 마이페이지에서 언제든 구독을 해지할 수 있습니다. 해지 시점에 다음 정책이 적용됩니다:</p><ul><li><strong>해지 후 즉시 자동 갱신 중단</strong>: 다음 결제 주기에는 자동 청구되지 않습니다.</li><li><strong>현재 결제 주기 종료 시까지 이용 가능</strong>: 이미 결제된 1개월 기간 동안 유료 기능을 그대로 이용할 수 있습니다.</li><li><strong>일할 환불 미제공</strong>: 결제 주기 중간에 해지하더라도 잔여 기간에 대한 일할 환불은 제공되지 않습니다.</li></ul>`,
      },
      {
        heading: "B-2. 청약철회의 제한 (디지털 콘텐츠 즉시 제공)",
        body: `<p>Mathiter 학습앱은 결제 즉시 모든 디지털 콘텐츠(강의, 문제 풀이, AI 코칭)가 회원에게 제공됩니다. 「전자상거래 등에서의 소비자보호에 관한 법률」 제17조 제2항 제5호에 따라, 디지털 콘텐츠를 회원이 즉시 이용 가능한 경우 청약철회권이 제한될 수 있습니다.</p><p>다만, 다음의 경우에는 청약철회 또는 환불이 가능합니다:</p><ul><li><strong>결제 후 콘텐츠 미이용</strong>: 결제 후 7일 이내, 단 한 번도 유료 기능에 접속하지 않은 경우 전액 환불.</li><li><strong>회사의 책임 있는 사유</strong>: 시스템 장애로 24시간 이상 정상 이용이 불가했던 경우 해당 일수 일할 환불.</li><li><strong>광고와 다르게 제공된 경우</strong>: 표시·광고와 실제 서비스 내용이 현저히 다른 경우 전액 환불.</li></ul>`,
      },
      {
        heading: "B-3. 결제 실패 시 자동 환불 처리",
        body: `<p>회사 시스템 오류로 동일 회원에 대해 동일 청구 건이 중복 결제된 경우 또는 결제 실패 처리가 잘못된 경우, 회사는 자동 감지 후 영업일 기준 7일 이내 결제수단으로 자동 환불합니다.</p>`,
      },
      {
        heading: "B-4. Mathiter Tutoring 종료 후 학습앱 결제 처리",
        body: `<p>Mathiter Tutoring 회원은 § A 트랙 진행 동안 학습앱 유료 기능을 무료로 이용합니다(별도 결제 없음). Tutoring이 종료되면 14일간 학습앱 유예 기간이 적용되며, 이 기간 중 회원이 학습앱 정기결제를 명시적으로 시작하지 않으면 자동으로 무료 사용자로 전환됩니다(별도 환불 사항 없음).</p>`,
      },
      {
        heading: "§ C. 공통 사항",
        body: ``,
      },
      {
        heading: "C-1. 환불 요청 방법",
        body: `<p>환불을 요청하시려면 다음 중 하나의 방법으로 연락해 주시기 바랍니다:</p><ul><li><strong>이메일</strong>: <a href="mailto:support@mathiter.com">support@mathiter.com</a> — 회원 가입 이메일·결제 일시·환불 사유 명시.</li><li><strong>카카오톡 ID</strong>: mathiter — 친구 추가 후 1:1 채팅으로 요청.</li><li><strong>마이페이지</strong>: "결제 내역 → 환불 요청" 메뉴 (개발 예정).</li></ul>`,
      },
      {
        heading: "C-2. 환불 처리 기간",
        body: `<p>회사는 환불 요청 접수 후 영업일 기준 7일 이내에 환불을 처리하며, 결제대행사(토스페이먼츠) 및 카드사 정책에 따라 실제 카드 청구 취소 또는 입금까지 추가로 3~7영업일이 소요될 수 있습니다.</p><p>등록된 결제수단이 만료되었거나 환불 처리가 불가한 경우 학부모/회원과 협의하여 계좌 환불로 대체합니다.</p>`,
      },
      {
        heading: "C-3. 분쟁 해결",
        body: `<p>환불 처리에 이의가 있는 경우 회원은 먼저 회사 고객센터(<a href="mailto:support@mathiter.com">support@mathiter.com</a>)로 연락해 주시기 바랍니다. 회사는 신속하게 답변드립니다.</p><p>회사와 협의가 이루어지지 않는 경우 회원은 다음 기관에 분쟁 조정을 요청할 수 있습니다:</p><ul><li>한국소비자원 (consumer.go.kr, 1372)</li><li>전자거래분쟁조정위원회 (ecmc.or.kr)</li><li>서울중앙지방법원 등 회사 사업장 소재지 관할 법원</li></ul>`,
      },
      {
        heading: "C-4. 본 환불정책의 변경",
        body: `<p>회사는 본 환불정책을 수시로 업데이트할 수 있습니다. 중요한 변경 사항이 있을 경우 시행 최소 7일 전(불리한 변경의 경우 최소 30일 전) 서비스 내 공지 및 등록된 이메일로 사전 통지합니다.</p>`,
      },
    ],
  },
  en: {
    title: "Refund Policy",
    effectiveDate: "Effective Date: May 8, 2026",
    sections: [
      {
        heading: "",
        body: `<p>This Refund Policy applies to all paid services operated by Elicova (the "Company") under the Mathiter brand. It complies with Korea's Act on Consumer Protection in Electronic Commerce and the Act on the Establishment and Operation of Private Teaching Institutes and applies together with the Company's Terms of Service.</p><p>The Company operates two distinct service tracks (Mathiter Tutoring / Mathiter learning app subscription), each with its own refund rules detailed in § A and § B. If you are unsure which track applies to you, please contact <a href="mailto:support@mathiter.com">support@mathiter.com</a>.</p>`,
      },
      {
        heading: "§ A. Mathiter Tutoring Refunds",
        body: `<p>Mathiter Tutoring is a registered private tutoring service under Korea's Act on the Establishment and Operation of Private Teaching Institutes. This refund policy adheres to the refund standards in Article 18-2 of the Enforcement Decree of that Act.</p>`,
      },
      {
        heading: "A-1. Refund Before Cycle Starts",
        body: `<p>If the parent has registered a billing key but the cycle has not yet started (i.e., before the first 1:1 video session), no amount has been charged and no refund is required. The parent may delete the billing key immediately via My Page.</p><p>The pre-enrollment process (parent consultation, diagnostic test, result review) is free of charge and not subject to refund.</p>`,
      },
      {
        heading: "A-2. Refund Mid-Cycle — Session-Ratio Settlement",
        body: `<p>The parent may terminate the service mid-cycle at any time. Settlement is calculated based on the ratio of completed 1:1 video sessions.</p><p><strong>Refund formula</strong>:</p><p style="background:#f9f9f9;padding:12px;border-left:3px solid #2D6BFF;margin:12px 0;font-family:monospace;">Settlement = Cycle Package Amount × (Completed 1:1 Sessions ÷ Total Cycle Sessions)</p><p><strong>Examples</strong>:</p><table style="width:100%;border-collapse:collapse;margin:12px 0;"><thead><tr style="background:#f5f5f5;"><th style="border:1px solid #ddd;padding:8px;text-align:left;">Scenario</th><th style="border:1px solid #ddd;padding:8px;text-align:right;">Settlement (Company)</th><th style="border:1px solid #ddd;padding:8px;text-align:right;">Refund (Parent)</th></tr></thead><tbody><tr><td style="border:1px solid #ddd;padding:8px;">Basic KRW 600,000 (2 of 8 sessions completed)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 150,000</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 450,000</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Advanced KRW 860,000 (3 of 8 sessions completed)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 322,500</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 537,500</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Pro KRW 960,000 (4 of 8 sessions completed)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 480,000</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 480,000</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Master KRW 1,200,000 (5 of 12 sessions completed)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 500,000</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 700,000</td></tr></tbody></table><p>Because asynchronous activities (AI learning monitoring, homework review, parent weekly reports, Q&A) progress in proportion to the 1:1 video sessions, the ratio of completed sessions serves as a representative measure of total tutoring progress.</p>`,
      },
      {
        heading: "A-3. Refund After Post-Cycle Auto-Charge",
        body: `<p>If a refund situation arises after a cycle has been completed and automatically charged, the Company handles it as follows:</p><ul><li><strong>Company's responsibility</strong> (e.g., the Company failed to deliver sessions normally, or a system fault caused incorrect session counting) — Full refund for the affected portion, or additional sessions provided as compensation.</li><li><strong>Valid parent objection</strong> — Refund of sessions that were incorrectly marked or not delivered properly.</li><li><strong>Standard termination</strong> — Completed cycles for which service was delivered normally are not eligible for refund.</li></ul>`,
      },
      {
        heading: "A-4. Service Discontinuation Due to Company Circumstances",
        body: `<p>If the Company cannot continue formal sessions (e.g., illness, prolonged system outage), the following procedures apply:</p><ul><li><strong>Short-term (within 1–2 weeks)</strong>: The Company arranges make-up sessions to restore counted sessions.</li><li><strong>Long-term (more than 2 weeks)</strong>: The Company and parent coordinate make-up sessions or proportional refund of the remaining cycle.</li><li><strong>Complete service discontinuation</strong>: The current cycle ends immediately, and the unfulfilled portion is refunded in full.</li></ul>`,
      },
      {
        heading: "A-5. Disputing Session Counts",
        body: `<p>The parent may dispute an automatic session marking within 24 hours via the parent dashboard or by emailing <a href="mailto:support@mathiter.com">support@mathiter.com</a>. The Company reviews disputes and cancels the count for valid objections.</p>`,
      },
      {
        heading: "§ B. Mathiter learning app Subscription Refunds",
        body: `<p>The Mathiter learning app (SaaS) subscription follows the principles of Korea's Act on Consumer Protection in Electronic Commerce and standard digital content terms.</p>`,
      },
      {
        heading: "B-1. Cancellation — No Pro-Rated Refund",
        body: `<p>Paid subscribers may cancel anytime via My Page. The following applies at cancellation:</p><ul><li><strong>Auto-renewal stops immediately</strong>: No further automatic charges occur in subsequent billing periods.</li><li><strong>Access continues until end of current period</strong>: Paid features remain accessible through the end of the already-paid month.</li><li><strong>No pro-rated refunds</strong>: Mid-period cancellations do not trigger a refund for unused days.</li></ul>`,
      },
      {
        heading: "B-2. Withdrawal Restrictions (Immediate Digital Content)",
        body: `<p>The Mathiter learning app provides all digital content (lessons, problems, AI coaching) to the Member immediately upon payment. Under Article 17(2)(5) of Korea's Act on Consumer Protection in Electronic Commerce, the right of withdrawal may be limited for digital content that can be used immediately.</p><p>However, refunds are available in the following cases:</p><ul><li><strong>Payment without use</strong>: Full refund if the Member has never accessed any paid feature within 7 days of payment.</li><li><strong>Company's responsibility</strong>: Pro-rated refund for days the Service was unavailable due to system fault for more than 24 hours.</li><li><strong>Service materially different from advertisement</strong>: Full refund if the actual service differs significantly from displayed/advertised content.</li></ul>`,
      },
      {
        heading: "B-3. Automatic Refund for Payment Errors",
        body: `<p>If a system error causes duplicate charges for the same Member or incorrect failure handling, the Company detects and automatically refunds to the original payment method within 7 business days.</p>`,
      },
      {
        heading: "B-4. Learning App Subscription After Tutoring Ends",
        body: `<p>Mathiter Tutoring Members receive free access to learning app paid features while § A is active (no separate charge). When tutoring ends, a 14-day grace period applies; if the Member does not explicitly start a learning app subscription during this period, they are automatically switched to the free tier (no separate refund applies).</p>`,
      },
      {
        heading: "§ C. Common Provisions",
        body: ``,
      },
      {
        heading: "C-1. How to Request a Refund",
        body: `<p>To request a refund, contact us through one of the following:</p><ul><li><strong>Email</strong>: <a href="mailto:support@mathiter.com">support@mathiter.com</a> — Include registered email, payment date/time, and refund reason.</li><li><strong>KakaoTalk ID</strong>: mathiter — Add as friend for direct 1:1 chat.</li><li><strong>My Page</strong>: "Payment history → Request refund" menu (planned).</li></ul>`,
      },
      {
        heading: "C-2. Processing Time",
        body: `<p>The Company processes refunds within 7 business days of request receipt. Depending on the payment processor (Toss Payments) and card issuer policies, the actual card cancellation or bank deposit may take an additional 3–7 business days.</p><p>If the registered payment method has expired or is otherwise unusable, the Company coordinates with the Member for an alternative refund method such as bank transfer.</p>`,
      },
      {
        heading: "C-3. Dispute Resolution",
        body: `<p>If you have any issue with refund processing, please first contact our customer support at <a href="mailto:support@mathiter.com">support@mathiter.com</a>. The Company will respond promptly.</p><p>If resolution is not reached, Members may request mediation through:</p><ul><li>Korea Consumer Agency (consumer.go.kr, 1372)</li><li>E-Commerce Dispute Mediation Committee (ecmc.or.kr)</li><li>The court of first instance having jurisdiction over the Company's business address</li></ul>`,
      },
      {
        heading: "C-4. Changes to This Refund Policy",
        body: `<p>The Company may update this Refund Policy from time to time. Material changes will be announced via in-Service notice and email to registered Members at least 7 days in advance (or at least 30 days in advance for changes adverse to Members).</p>`,
      },
    ],
  },
};

export default async function RefundPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale] || content.en;

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">{c.title}</h1>
          <p className="text-sm text-muted mb-10">{c.effectiveDate}</p>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground/90 [&_a]:text-primary [&_a]:underline [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_p]:leading-relaxed [&_table]:text-sm">
            {c.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="text-xl font-semibold mt-10 mb-3">
                    {section.heading}
                  </h2>
                )}
                <div dangerouslySetInnerHTML={{ __html: section.body }} />
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
