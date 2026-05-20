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
    title: "서비스 이용약관",
    effectiveDate: "시행일: 2026년 5월 8일",
    sections: [
      {
        heading: "",
        body: `<p>엘리코바(Elicova)(이하 "회사", "당사", "엘리코바")가 운영하는 Mathiter 서비스를 이용해 주셔서 감사합니다. 본 서비스 이용약관("약관")은 회사가 제공하는 Mathiter 웹사이트(<a href="https://mathiter.com">mathiter.com</a>), 웹·모바일 애플리케이션, Mathiter Tutoring 서비스 및 모든 관련 제품·서비스(이하 통칭 "서비스")에 대한 귀하의 이용을 규율합니다.</p><p>서비스를 이용함으로써 귀하는 본 약관에 동의하게 됩니다. 동의하지 않으시는 경우 서비스를 이용하지 마시기 바랍니다. 회사는 두 가지 별도의 서비스 트랙(Mathiter 학습앱 / Mathiter Tutoring)을 운영하며, 트랙별 별도 규정은 본 약관 A 및 B에 명시되어 있습니다.</p>`,
      },
      {
        heading: "1. 용어의 정의",
        body: `<ul><li><strong>회사</strong>: 엘리코바(Elicova), 개인사업자, 대표 박세준.</li><li><strong>서비스</strong>: 회사가 운영하는 Mathiter 브랜드의 모든 제품·서비스. 본 약관에서 "Mathiter 학습앱"과 "Mathiter Tutoring"으로 구분됩니다.</li><li><strong>회원</strong>: 본 약관에 동의하고 서비스를 이용하는 자. 미성년자의 경우 법정대리인을 포함합니다.</li><li><strong>학부모</strong>: Mathiter Tutoring 트랙에서 학생을 대신하여 결제 및 계약 동의를 수행하는 법정대리인.</li><li><strong>사이클</strong>: Mathiter Tutoring의 결제 단위. 1:1 화상 수업 N회 묶음(Basic·Advanced·Pro = 8회, Master = 12회).</li><li><strong>빌링키</strong>: 회사가 결제대행사(토스페이먼츠)를 통해 발급하는 자동결제용 토큰. 카드 정보 대체 식별자.</li></ul>`,
      },
      {
        heading: "2. 서비스 이용 자격",
        body: `<p>서비스는 만 13세 이상의 개인이 이용할 수 있습니다. 만 18세 미만의 사용자는 부모 또는 법정대리인의 동의가 필요합니다. 미성년자를 대신하여 등록·결제하는 부모 또는 법정대리인은 해당 미성년자를 대리하여 본 약관에 동의하며, 미성년자의 서비스 이용에 대한 책임을 집니다.</p><p>회사는 사전 통지 여부와 관계없이 서비스의 전부 또는 일부를 수정, 중단 또는 종료할 권리를 보유합니다. 회사는 회원의 연령, 신원 또는 보호자 동의를 확인할 수 있으며, 확인에 실패한 계정은 정지할 수 있습니다.</p>`,
      },
      {
        heading: "3. 계정 및 가입",
        body: `<p>특정 기능에 접근하려면 계정을 생성해야 합니다. 회원은 가입 시 정확하고 최신의 완전한 정보를 제공하고, 계정 정보를 최신 상태로 유지하는 데 동의합니다.</p><p>Mathiter Tutoring 트랙 이용을 위해서는 학생 계정과 학부모 계정이 모두 생성되어야 하며, 학부모 계정이 결제 및 계약 주체가 됩니다.</p><p>회원은 비밀번호의 기밀성을 유지하고 계정에서 발생하는 모든 활동에 대해 책임을 집니다. 계정의 무단 사용을 인지한 경우 즉시 회사에 통보해야 합니다. 회사는 회원의 보안 관리 실패로 인한 손실에 대해 책임지지 않습니다.</p>`,
      },
      {
        heading: "4. 서비스의 구성",
        body: `<p>회사는 다음 두 가지 독립된 서비스 트랙을 제공합니다:</p><ul><li><strong>Mathiter 학습앱 (SaaS 트랙)</strong>: 적응형 진단 테스트(adaptive-test), AI 학습 코칭, 문제 풀이, 강의, 학부모 대시보드 등을 포함한 자기주도 학습 도구. 무료 사용자와 유료 구독자로 구분됩니다. 본 약관 B에서 별도로 규정합니다.</li><li><strong>Mathiter Tutoring (튜터링 트랙)</strong>: 「학원의 설립·운영 및 과외교습에 관한 법률」에 따라 신고된 개인과외교습 서비스로, 박세준 대표가 직접 운영하는 1:1 화상 코칭 + AI 학습 모니터링 + 학부모 리포트 + Q&A를 포함한 종합 교습 패키지. 본 약관 A에서 별도로 규정합니다.</li></ul><p>회원은 각 트랙을 개별 또는 동시에 이용할 수 있으며, 트랙별로 별도의 결제·환불·운영 규정이 적용됩니다. 트랙 간 전환에 관한 규정은 C를 따릅니다.</p>`,
      },
      {
        heading: "A. Mathiter Tutoring (튜터링 트랙)",
        body: `<p>본 A의 조항은 Mathiter Tutoring 트랙 이용에만 적용됩니다.</p>`,
      },
      {
        heading: "A-1. 사전 영업 프로세스 (무료)",
        body: `<p>회사는 정식 수업 개시 전 다음 4단계의 사전 프로세스를 진행하며, 본 단계들은 <strong>무료</strong>이고 결제수단(빌링키) 등록을 요구하지 않습니다.</p><ol><li><strong>학부모 상담</strong> — 학습 목표 및 학년·시험 정보 확인.</li><li><strong>Mathiter 학습앱 진단 테스트</strong> — 학생·학부모 계정 생성 후, 학생이 adaptive-test를 진행하여 현재 수준을 측정. 결과 데이터는 정식 수업 운영을 위한 참고자료로 활용됩니다.</li><li><strong>진단 결과 리뷰 및 수업 방향 협의</strong> — 학부모 및 학생과 진단 결과 리뷰, 커리큘럼 설계 (오프라인 1회 미팅 가능).</li><li><strong>정식 수업 진행 여부 결정</strong> — 학부모가 정식 수업 진행을 결정하는 경우, 결제수단(빌링키) 등록 후 정식 수업이 개시됩니다. 결정하지 않는 경우 계정은 유지되며 Mathiter 학습앱 무료 사용자로 남습니다.</li></ol><p>본 사전 단계의 시간은 「학원의 설립·운영 및 과외교습에 관한 법률」상 신고된 교습 시간에 포함되지 않으며, 사전 진단·상담의 성격을 가집니다.</p>`,
      },
      {
        heading: "A-2. 패키지 및 교습료 산정 기준",
        body: `<p>Mathiter Tutoring의 교습료는 회사가 거주지 관할 교육지원청에 신고한 시간당 단가 × 월간 교습 시간으로 산정되며, 「학원의 설립·운영 및 과외교습에 관한 법률」 시간당 단가 상한(22,000원)을 준수합니다.</p><p>회사가 교육지원청에 신고한 패키지별 교습 시간 구성은 다음과 같습니다(2026-05-08 기준):</p><table style="width:100%;border-collapse:collapse;margin:12px 0;"><thead><tr style="background:#f5f5f5;"><th style="border:1px solid #ddd;padding:8px;text-align:left;">패키지</th><th style="border:1px solid #ddd;padding:8px;text-align:left;">학년</th><th style="border:1px solid #ddd;padding:8px;text-align:right;">월 교습료</th><th style="border:1px solid #ddd;padding:8px;text-align:left;">신고 교습 시간 (일분 × 주회 × 4.3주)</th><th style="border:1px solid #ddd;padding:8px;text-align:right;">시간당 단가</th></tr></thead><tbody><tr><td style="border:1px solid #ddd;padding:8px;">Basic</td><td style="border:1px solid #ddd;padding:8px;">초등 (US G1~5)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">600,000원</td><td style="border:1px solid #ddd;padding:8px;"><strong>30.1h</strong><br/><span style="color:#666;font-size:12px;">일 140분 × 주 3회 × 4.3주</span></td><td style="border:1px solid #ddd;padding:8px;text-align:right;">19,933원</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Advanced</td><td style="border:1px solid #ddd;padding:8px;">중등 (US G6~8)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">860,000원</td><td style="border:1px solid #ddd;padding:8px;"><strong>43.0h</strong><br/><span style="color:#666;font-size:12px;">일 150분 × 주 4회 × 4.3주</span></td><td style="border:1px solid #ddd;padding:8px;text-align:right;">20,000원</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Pro</td><td style="border:1px solid #ddd;padding:8px;">고등 (US G9~11)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">960,000원</td><td style="border:1px solid #ddd;padding:8px;"><strong>45.9h</strong><br/><span style="color:#666;font-size:12px;">일 160분 × 주 4회 × 4.3주 (보완 신고 진행 중)</span></td><td style="border:1px solid #ddd;padding:8px;text-align:right;">20,929원</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Master</td><td style="border:1px solid #ddd;padding:8px;">입시·경시</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">1,200,000원</td><td style="border:1px solid #ddd;padding:8px;"><strong>57.3h</strong><br/><span style="color:#666;font-size:12px;">일 160분 × 주 5회 × 4.3주</span></td><td style="border:1px solid #ddd;padding:8px;text-align:right;">20,942원</td></tr></tbody></table><p>위 신고된 교습 시간은 다음 활동의 총합으로 구성됩니다:</p><ol><li><strong>1:1 실시간 화상 코칭 (동기 활동)</strong><br/>· Basic / Advanced / Pro: 주 2회 × 55분 (월 약 7.3시간)<br/>· Master: 주 3회 × 55분 (월 약 11시간)</li><li><strong>비동기 학습 관리 활동</strong> (위 1:1 시간을 제외한 나머지)<br/>· AI 학습 데이터 모니터링 및 진단<br/>· 과제 첨삭 및 맞춤 커리큘럼 관리<br/>· 학부모 주간 리포트 작성<br/>· Q&A 채널 응답</li></ol><p>본 패키지 금액은 부가가치세법 시행령 제42조에 따라 부가가치세 면세 대상입니다. 회사가 교육지원청에 신고한 단가 및 시간 구성은 사이트 가격 페이지에서 항상 최신 상태로 게시되며, 회사는 단가 변경 시 기존 회원에게 영향을 미치지 않도록 다음 사이클부터 적용합니다.</p>`,
      },
      {
        heading: "A-3. 결제 방식 및 시점 (사이클 후납)",
        body: `<p><strong>결제 단위 — 사이클</strong>: 사이클은 1:1 화상 수업 N회 묶음으로 정의됩니다. Basic·Advanced·Pro = 8회, Master = 12회. 사이클은 첫 1:1 수업 시점에 시작되어 N회차 완료 시점에 종료됩니다(롤링 방식). 캘린더 월(1일~말일) 기준이 아닙니다.</p><p><strong>결제 시점 — 사이클 완료 시 후납</strong>: 회사는 사이클 마지막 회차 완료(정상 종료 + 학부모 24시간 이의제기 윈도우 경과) 시점에 등록된 빌링키로 패키지 금액 전액을 자동 청구합니다. 학부모는 별도의 결제 행위 없이 회차 완료만 확인하면 됩니다.</p><p><strong>사전 고지</strong>: 자동 결제 1일 전 회사는 학부모에게 결제 예정 안내 이메일을 발송합니다(패키지명, 회차 명세, 결제 예정액, 카드 정보 끝 4자리, 결제 예정 일시). 학부모는 결제 전 카드 변경 또는 해지 처리를 진행할 수 있습니다.</p><p><strong>카드 등록 시점</strong>: 학부모는 정식 수업 1회차 개시 전 마이페이지에서 결제수단(빌링키)을 등록해야 합니다. 등록되지 않은 상태에서는 정식 수업 예약이 제한될 수 있습니다.</p>`,
      },
      {
        heading: "A-4. 1:1 화상 수업 회차 카운팅 규칙",
        body: `<p>회차 카운팅은 다음 규칙에 따라 자동 처리됩니다. 수업 완료 마킹은 앱 강의실 종료 시점에 자동 생성되며, 학부모 대시보드에 즉시 노출됩니다. 학부모가 24시간 이내 이의를 제기하지 않으면 자동 확정됩니다.</p><ul><li><strong>정상 완료 수업</strong> — 회차 +1. (앱 강의실에서 정상 종료된 수업)</li><li><strong>학생 노쇼</strong> (약속 시간에 학생 미참석) — 회차 +1. 단, 회사 재량에 따라 추후 보충 슬롯이 제공될 수 있습니다.</li><li><strong>학부모 사전 취소</strong> (시점 무관) — 회차 +0. 사전 알림이 있는 경우 모두 카운트하지 않습니다.</li><li><strong>회사(선생) 사정 취소</strong> — 회차 +0. 회사는 다른 시간에 보충할 의무를 집니다.</li><li><strong>비정상 짧은 수업</strong> (인터넷 장애, 학생 컨디션 등으로 정상 진행 불가) — 회차 +1, 단 못 채운 시간은 다음 정규 수업의 시간 연장 또는 별도 보충 슬롯으로 회사가 보충합니다.</li></ul>`,
      },
      {
        heading: "A-5. 환불 정책 (사이클 진행 중 해지)",
        body: `<p>회원(학부모)은 언제든 Mathiter Tutoring 서비스를 해지할 수 있으며, 해지 시점까지 진행한 1:1 화상 수업 회차 비율로 정산하여 자동 청구 또는 환불됩니다.</p><p><strong>환불액 산정 공식</strong>:</p><p style="background:#f9f9f9;padding:12px;border-left:3px solid #2D6BFF;margin:12px 0;font-family:monospace;">정산액 = 사이클 패키지 금액 × (진행한 1:1 화상 회차 ÷ 사이클 총 회차)</p><p><strong>예시 1</strong>: Advanced 86만원 사이클에서 3회 완료 후 해지<br/>→ 정산액 322,500원 회사 수령, 차액 537,500원 환불.</p><p><strong>예시 2</strong>: Master 120만원 사이클에서 5회 완료 후 해지<br/>→ 정산액 500,000원 회사 수령, 차액 700,000원 환불.</p><p>비동기 활동(AI 학습 모니터링·과제 첨삭·학부모 리포트·Q&A)은 1:1 화상 진도에 비례하여 진행되므로, 1:1 회차 비율을 전체 교습 진행률의 대표 지표로 사용합니다.</p><p>환불은 해지 요청 후 영업일 기준 7일 이내에 등록된 결제수단으로 처리됩니다. 결제수단이 만료되었거나 환불이 불가한 경우 학부모와 협의하여 계좌 환불로 대체합니다.</p>`,
      },
      {
        heading: "A-6. 결제 실패 시 처리",
        body: `<p>사이클 완료 시점의 자동 결제가 실패하는 경우 다음 절차에 따라 처리합니다:</p><ol><li><strong>1차 결제 시도 실패</strong> — 학부모와 회사에 즉시 이메일로 통보합니다.</li><li><strong>24시간 후 2차 자동 재시도</strong> — 카드 한도·만료 등 일시적 문제가 해소된 경우 자동 결제됩니다.</li><li><strong>2차 시도도 실패</strong> — 자동 재시도를 중단하고 학부모와 회사에 이메일 통보합니다. 회사가 학부모와 직접 연락하여 결제수단 갱신 또는 정산 방식을 협의합니다.</li></ol><p>결제 실패 사유로 즉시 수업이 중단되지는 않으며, 학부모와의 협의 절차를 거칩니다.</p>`,
      },
      {
        heading: "B. Mathiter 학습앱 (SaaS 트랙)",
        body: `<p>본 B의 조항은 Mathiter 학습앱 트랙 이용에만 적용됩니다.</p>`,
      },
      {
        heading: "B-1. Freemium 구조",
        body: `<p>Mathiter 학습앱은 다음 두 등급으로 제공됩니다:</p><ul><li><strong>무료 사용자</strong>: 기본 기능을 영구 무료로 이용할 수 있으나, 일일 사용량 제한이 적용됩니다(문제 풀이, AI 코칭, 강의 시청 등). 회원 가입 후 자동 적용되며 결제수단 등록을 요구하지 않습니다.</li><li><strong>유료 사용자</strong>: 모든 기능을 무제한 이용할 수 있으며, 월 34,900원(부가세 포함)의 정기결제가 적용됩니다.</li></ul><p>회사는 무료/유료 기능 범위 및 일일 제한값을 서비스 운영상 필요에 따라 변경할 수 있으며, 중요 변경 사항은 사이트 공지 또는 이메일로 사전 안내합니다.</p>`,
      },
      {
        heading: "B-2. 유료 구독 — 정기결제 및 자동 갱신",
        body: `<p>유료 구독은 회원이 등록한 결제수단(빌링키)에서 매월 자동 청구됩니다. 회원이 해지하기 전까지 자동 갱신되며, 갱신일은 첫 결제일과 동일한 일자입니다.</p><p>회원은 마이페이지에서 언제든 해지할 수 있으며, 해지 후에도 현재 결제 주기 종료 시점까지 유료 기능을 이용할 수 있습니다. 일할 환불은 제공되지 않습니다.</p><p>요금 변경 시 회사는 최소 30일 전 사전 공지하며, 회원은 변경된 요금에 동의하지 않는 경우 다음 갱신 전까지 해지할 수 있습니다.</p>`,
      },
      {
        heading: "B-3. 결제 실패 시 처리 및 유예 기간 (Grace 7일)",
        body: `<p>유료 구독의 정기결제가 실패하는 경우 다음 절차에 따라 처리합니다:</p><ol><li><strong>Day 0 (1차 실패)</strong> — 회원과 회사에 즉시 이메일 통보. 24시간 후 2차 자동 재시도.</li><li><strong>Day 1 (2차 실패)</strong> — 회원과 회사에 이메일 통보. 자동 재시도를 종료하고 <strong>7일 유예 기간</strong>이 시작됩니다. 유예 기간 동안 유료 기능은 그대로 이용 가능합니다.</li><li><strong>Day 4</strong> — 유예 기간 중간 알림 이메일.</li><li><strong>Day 7</strong> — 유예 기간 종료. 결제가 정상화되지 않으면 회원은 무료 사용자로 자동 다운그레이드되고, 일일 사용량 제한이 적용됩니다.</li></ol>`,
      },
      {
        heading: "B-4. 학습 데이터 보존 및 영구 삭제",
        body: `<p>무료 사용자로 다운그레이드된 회원의 학습 데이터(문제풀이 기록·진도·취약 단원 분석·노트 등)는 다음 일정으로 처리됩니다:</p><ul><li><strong>Day 7 ~ Day 37</strong> (30일간) — 학습 데이터를 그대로 유지하며, 무료 사용자 limit 내에서 이용 가능합니다.</li><li><strong>Day 37</strong> — 학습 데이터가 휴면 처리되며, 회원은 "복구 가능 90일 남음"을 안내받습니다. 데이터는 백업으로 안전하게 보관됩니다.</li><li><strong>Day 67</strong> — "복구 가능 60일 남음" 알림 이메일.</li><li><strong>Day 97</strong> — "복구 가능 30일 남음" 마지막 경고 이메일.</li><li><strong>Day 127</strong> — 백업 영구 삭제. 재구독해도 복구할 수 없습니다.</li></ul><p>회원은 Day 127 이전 언제든 재구독하면 학습 데이터를 즉시 복원할 수 있습니다. 본 정책은 회사가 회원의 데이터를 무리하게 장기 보관하지 않으면서, 회원이 결정을 내릴 충분한 시간을 보장하기 위함입니다.</p>`,
      },
      {
        heading: "B-5. Mathiter Tutoring 회원의 자동 무료 이용",
        body: `<p>Mathiter Tutoring(A) 정식 수업이 진행되는 동안(상태: active) 회원은 Mathiter 학습앱 유료 기능을 무료로 이용합니다. 별도 결제 없이 자동 적용되며, 회사는 이를 위해 별도의 빌링키를 발급하지 않습니다.</p><p>튜터링 종료 후 학습앱 구독 처리는 C(트랙 간 전환)을 따릅니다.</p>`,
      },
      {
        heading: "C. 트랙 간 전환",
        body: `<p>회원이 Mathiter Tutoring과 Mathiter 학습앱 간 이동하는 경우 다음 규정을 적용합니다.</p>`,
      },
      {
        heading: "C-1. 결제수단(빌링키) 목적 분리",
        body: `<p>회사는 결제수단의 목적별 분리 원칙을 준수합니다. Mathiter Tutoring 결제용으로 등록된 빌링키는 회원의 명시적 재동의 없이 Mathiter 학습앱 정기결제로 자동 사용되지 않습니다. 본 조항은 「전자상거래 등에서의 소비자보호에 관한 법률」 및 카드사 약관상 빌링키 목적 분리 의무를 반영한 것입니다.</p><p>회원이 두 트랙 모두를 결제하고자 하는 경우 각 트랙별로 별도의 빌링키 등록 및 동의 절차가 필요합니다.</p>`,
      },
      {
        heading: "C-2. Mathiter Tutoring 종료 시 학습앱 14일 유예 기간",
        body: `<p>Mathiter Tutoring 정식 수업이 종료(해지·완료·만료)되면, 회원은 14일 동안 Mathiter 학습앱 유료 기능을 그대로 이용할 수 있습니다(유예 기간). 유예 기간 중 다음 안내 이메일이 발송됩니다:</p><ul><li><strong>Day 1</strong> — 유예 시작 알림 및 학습앱 구독 안내 (선택 옵션 제시)</li><li><strong>Day 7</strong> — 중간 알림</li><li><strong>Day 14</strong> — 마지막 알림</li></ul><p>유예 기간 중 회원은 다음 중 하나를 선택할 수 있습니다:</p><ol><li><strong>Mathiter 학습앱 정기결제 시작</strong> — 회원은 별도의 결제 동의 절차를 거쳐 새로운 빌링키를 등록해야 합니다. 튜터링용 빌링키는 자동 사용되지 않습니다.</li><li><strong>무료 사용자로 전환</strong> — 일일 사용량 제한이 적용되며, B-4의 학습 데이터 보존 정책이 적용됩니다.</li></ol><p>회원이 14일 이내 별도 선택을 하지 않는 경우, 회사는 자동으로 "무료 사용자 전환"을 적용합니다.</p>`,
      },
      {
        heading: "5. 지적재산권",
        body: `<p>서비스의 모든 콘텐츠 — 텍스트, 그래픽, 로고, 이미지, 오디오, 비디오, 소프트웨어, 수학 문제, 해설, 강의, 커리큘럼 자료 및 1:1 코칭 콘텐츠를 포함하여 — 는 회사(엘리코바) 또는 그 라이선서가 소유하며, 저작권, 상표권 및 기타 지적재산권법에 의해 보호됩니다.</p><p>회원은 회사의 명시적인 서면 허가 없이 서비스의 콘텐츠를 복사, 수정, 배포, 판매, 라이선스 또는 2차적 저작물을 만들 수 없습니다. 단, 회원이 본인의 학습 목적으로 서비스를 이용하는 행위는 본 제한에 해당하지 않습니다.</p>`,
      },
      {
        heading: "6. 사용자 콘텐츠",
        body: `<p>회원은 연습 문제에 대한 답변, 1:1 수업 중 작성한 노트, 피드백 및 기타 자료("사용자 콘텐츠")를 서비스에 제출할 수 있습니다. 회원은 사용자 콘텐츠에 대한 소유권을 유지하지만, 서비스의 운영, 개선 및 회원 본인을 위한 맞춤형 학습 제공과 관련하여 사용자 콘텐츠를 사용, 표시, 저장, 분석할 수 있는 전 세계적, 비독점적, 무상 라이선스를 회사에 부여합니다.</p><p>회원은 사용자 콘텐츠를 제출할 수 있는 모든 필요한 권리를 보유하고 있으며, 해당 콘텐츠가 제3자의 권리를 침해하지 않음을 보증합니다.</p>`,
      },
      {
        heading: "7. AI 기능",
        body: `<p>서비스에는 적응형 진단 테스트, 개인화된 학습 코칭, 자동 해설, 풀이 분석 등 AI 기반 기능("AI 기능")이 포함됩니다. 회원은 다음 사항을 인지하고 이용하는 데 동의합니다:</p><ul><li>AI가 생성한 콘텐츠는 교육 목적으로 제공되며, 부정확하거나 오류를 포함할 수 있습니다.</li><li>AI 결과물은 전문 학업 조언이나 공인 교육자의 지도를 대체하지 않습니다. Mathiter Tutoring 트랙의 경우 박세준 대표가 AI 결과 데이터를 참고자료로 활용하여 직접 코칭을 제공합니다.</li><li>회사는 AI 기능과의 상호작용에서 비식별화·집계된 데이터를 서비스 개선에 사용할 수 있습니다.</li><li>회사는 회원의 개인 AI 상호작용 데이터를 제3자 AI 모델 훈련에 사용하지 않습니다.</li></ul>`,
      },
      {
        heading: "8. 금지 행위",
        body: `<p>회원은 다음 행위를 하지 않는 데 동의합니다:</p><ul><li>자동화된 도구, 봇, 스크래퍼 또는 데이터 마이닝 기술을 사용하여 서비스의 데이터에 접근하거나 수집하는 행위.</li><li>서비스의 일부, 다른 회원의 계정 또는 회사의 시스템에 무단으로 접근을 시도하는 행위.</li><li>서비스에 사용된 소프트웨어를 역설계, 디컴파일 또는 디어셈블하는 행위.</li><li>불법적인 목적이나 관련 법률을 위반하여 서비스를 이용하는 행위.</li><li>허위, 오해의 소지가 있는, 명예를 훼손하는 또는 불쾌한 콘텐츠를 제출하는 행위.</li><li>서비스의 정상적인 작동을 방해하거나 인프라에 과도한 부하를 가하는 행위.</li><li>서면 승인 없이 서비스의 콘텐츠를 AI 또는 머신러닝 모델 훈련에 사용하는 행위.</li><li>1:1 수업 콘텐츠 또는 학습 자료를 회사의 사전 서면 동의 없이 외부에 배포하는 행위.</li></ul>`,
      },
      {
        heading: "9. 제3자 서비스 및 결제대행",
        body: `<p>회사는 다음 제3자 서비스를 통해 서비스를 운영하며, 회원의 정보가 해당 서비스에 위탁될 수 있습니다. 자세한 내용은 개인정보처리방침을 참조하시기 바랍니다.</p><ul><li><strong>결제대행</strong>: 토스페이먼츠(주) — 결제 처리 및 빌링키 발급</li><li><strong>인프라/데이터베이스</strong>: Google LLC (Firebase Hosting, Cloud Run, Firestore)</li><li><strong>웹 호스팅(랜딩)</strong>: Vercel Inc. (mathiter-homepage)</li><li><strong>도메인 등록</strong>: Whois Corp.</li></ul>`,
      },
      {
        heading: "10. 보증의 부인",
        body: `<p>서비스는 명시적이든 묵시적이든, 상품성, 특정 목적에의 적합성 및 비침해에 대한 보증을 포함하여 어떠한 종류의 보증도 없이 "있는 그대로" 및 "이용 가능한 상태로" 제공됩니다. 회사는 서비스가 중단 없이, 오류 없이 또는 안전하게 제공되거나 결함이 수정될 것을 보증하지 않습니다.</p><p>Mathiter Tutoring의 경우 회사는 합리적인 노력을 다해 학생의 학습 향상을 지원하지만, 특정 시험 점수, 합격, 학업 성취도를 보증하지 않습니다.</p>`,
      },
      {
        heading: "11. 책임의 제한",
        body: `<p>법률이 허용하는 최대 범위 내에서, 회사는 회원의 서비스 이용으로 인한 간접적, 부수적, 특별, 결과적 또는 징벌적 손해에 대해 책임지지 않습니다. 회사의 총 책임은 청구 발생 직전 6개월 동안 회원이 회사에 지불한 금액을 초과하지 않습니다. 다만 회사의 고의 또는 중과실로 인한 손해는 본 제한이 적용되지 않습니다.</p>`,
      },
      {
        heading: "12. 면책",
        body: `<p>회원은 서비스 이용, 본 약관 위반 또는 제3자 권리 침해로 인해 발생하는 모든 청구, 손해, 손실 또는 비용(합리적인 변호사 비용 포함)으로부터 회사, 그 대표자, 임직원 및 대리인을 면책하고 해를 끼치지 않을 것에 동의합니다.</p>`,
      },
      {
        heading: "13. 서비스 해지",
        body: `<p>회원은 마이페이지에서 언제든 계정 해지를 요청할 수 있습니다. 회사는 다음의 경우 통지 또는 사전 통지 없이 회원의 서비스 접근을 중단하거나 계정을 해지할 수 있습니다: (1) 본 약관 위반, (2) 결제 실패가 7일 이상 지속되는 경우, (3) 부정한 방법으로 서비스를 이용하는 경우, (4) 법적 요구사항에 따라 필요한 경우.</p><p>지적재산권, 보증 부인, 책임 제한, 면책에 관한 조항은 해지 후에도 존속합니다.</p>`,
      },
      {
        heading: "14. 준거법 및 분쟁 해결",
        body: `<p>본 약관은 대한민국 법률에 따라 규율되고 해석됩니다. 본 약관 또는 서비스와 관련하여 발생하는 모든 분쟁은 우선 회사와 회원 간 협의로 해결하며, 협의가 이루어지지 않는 경우 회사의 사업장 소재지 관할 법원(수원지방법원)을 제1심 전속관할 법원으로 합니다.</p>`,
      },
      {
        heading: "15. 약관 변경",
        body: `<p>회사는 수시로 본 약관을 업데이트할 수 있습니다. 중요한 변경 사항이 있을 경우 서비스 내 공지 및 회원이 등록한 이메일로 최소 7일 전(회원에게 불리한 변경의 경우 최소 30일 전) 사전 통지하고 위의 "시행일"을 업데이트합니다. 변경 사항이 시행된 후 서비스를 계속 이용하시면 업데이트된 약관에 동의하는 것으로 간주됩니다.</p>`,
      },
      {
        heading: "16. 사업자 정보 및 문의처",
        body: `<div style="background:#f9f9f9;padding:16px;border-radius:8px;margin:12px 0;"><p style="margin:0 0 8px 0;"><strong>상호</strong>: 엘리코바 (Elicova)<br/><strong>대표자</strong>: 박세준<br/><strong>사업자등록번호</strong>: 710-05-03676<br/><strong>사업자 유형</strong>: 간이과세자<br/><strong>사업장 소재지</strong>: 경기도 용인시 처인구 이동읍 기흥단지로 579-1, 1동 303호 (라센트라)<br/><strong>업태/종목</strong>: 정보통신업·도매및소매업·정보통신업 / 응용소프트웨어 개발 및 공급업·전자상거래 소매업·미디어콘텐츠창작업<br/><strong>통신판매업 신고번호</strong>: 제2026-용인처인-01131호<br/><strong>개인과외교습자 신고번호</strong>: 제9031호 (용인교육지원청, 2026-05-15 발급)</p></div><p><strong>문의 채널</strong>:</p><ul><li><strong>일반 문의</strong>: <a href="mailto:contact@mathiter.com">contact@mathiter.com</a></li><li><strong>사용·결제 문의</strong>: <a href="mailto:support@mathiter.com">support@mathiter.com</a></li><li><strong>카카오톡 ID</strong>: mathiter (친구 추가로 1:1 문의)</li><li><strong>홈페이지</strong>: <a href="https://mathiter.com">https://mathiter.com</a></li></ul>`,
      },
    ],
  },
  en: {
    title: "Terms of Service",
    effectiveDate: "Effective Date: May 8, 2026",
    sections: [
      {
        heading: "",
        body: `<p>Welcome to Mathiter, operated by Elicova (hereinafter "the Company," "we," "us," or "Elicova"), a sole proprietorship registered in the Republic of Korea. These Terms of Service ("Terms") govern your access to and use of the Mathiter website (<a href="https://mathiter.com">mathiter.com</a>), web and mobile applications, the Mathiter Tutoring service, and all related products and services (collectively, the "Service").</p><p>By accessing or using the Service, you agree to be bound by these Terms. The Company operates two distinct service tracks (Mathiter learning app / Mathiter Tutoring), each governed by separate provisions set out in A and B below.</p>`,
      },
      {
        heading: "1. Definitions",
        body: `<ul><li><strong>Company</strong>: Elicova, a sole proprietorship in the Republic of Korea, represented by Sejun Park.</li><li><strong>Service</strong>: All products and services operated under the Mathiter brand, distinguished as "Mathiter learning app" and "Mathiter Tutoring" in these Terms.</li><li><strong>Member</strong>: Any person who agrees to these Terms and uses the Service. For minors, the term includes their legal guardian.</li><li><strong>Parent</strong>: The legal guardian who consents to and pays for the Mathiter Tutoring service on behalf of a minor student.</li><li><strong>Cycle</strong>: The billing unit of Mathiter Tutoring. A bundle of N 1:1 video sessions (Basic/Advanced/Pro = 8 sessions, Master = 12 sessions).</li><li><strong>Billing Key</strong>: An auto-billing token issued by our payment processor (Toss Payments) in lieu of full card details.</li></ul>`,
      },
      {
        heading: "2. Eligibility",
        body: `<p>The Service is available to individuals who are at least 13 years of age. Users under 18 must have consent from a parent or legal guardian. A parent or guardian who registers or pays on behalf of a minor accepts these Terms on behalf of the minor and is responsible for the minor's use of the Service.</p><p>The Company reserves the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice. The Company may verify your age, identity, or parental consent and suspend accounts that fail verification.</p>`,
      },
      {
        heading: "3. Accounts and Registration",
        body: `<p>To access certain features, you must create an account. You agree to provide accurate, current, and complete information at registration and to keep your account information updated.</p><p>For Mathiter Tutoring, both a student account and a parent account must be created. The parent account is the contracting and billing party.</p><p>You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account. You must notify the Company immediately of any unauthorized use of your account. The Company is not liable for any loss arising from your failure to secure your credentials.</p>`,
      },
      {
        heading: "4. Service Structure",
        body: `<p>The Company provides two independent service tracks:</p><ul><li><strong>Mathiter learning app (SaaS track)</strong>: A self-directed learning toolkit including adaptive diagnostic testing, AI-powered coaching, problem practice, video lessons, and a parent dashboard. Available in free and paid tiers, governed by B.</li><li><strong>Mathiter Tutoring (tutoring track)</strong>: A registered private tutoring service under Korea's Act on the Establishment and Operation of Private Teaching Institutes and Extracurricular Lessons, personally operated by Sejun Park as a registered individual private tutor. The package includes 1:1 video coaching, AI learning monitoring, parent reports, and Q&A — governed by A.</li></ul><p>Members may use either or both tracks. Each track has separate billing, refund, and operational rules. Track transitions are governed by C.</p>`,
      },
      {
        heading: "A. Mathiter Tutoring",
        body: `<p>The provisions of this A apply exclusively to the Mathiter Tutoring track.</p>`,
      },
      {
        heading: "A-1. Pre-Enrollment Process (Free)",
        body: `<p>Prior to the start of formal tutoring sessions, the Company conducts a four-step pre-enrollment process. These steps are <strong>free of charge</strong> and do not require billing key registration:</p><ol><li><strong>Parent consultation</strong> — Discussion of learning goals, grade level, and target exams.</li><li><strong>Mathiter learning app diagnostic test</strong> — Student and parent accounts are created; the student completes an adaptive-test to assess current proficiency. Results are used as reference material for formal session planning.</li><li><strong>Result review and curriculum alignment</strong> — Review of diagnostic results with the parent and student, optionally including one offline meeting.</li><li><strong>Enrollment decision</strong> — If the parent decides to proceed, a billing key is registered and formal sessions begin. If not, the account remains active as a free user of the Mathiter learning app.</li></ol><p>Time spent in this pre-enrollment process is not counted toward declared tutoring hours under Korean law; it constitutes diagnostic and consultation activity.</p>`,
      },
      {
        heading: "A-2. Packages and Tuition Calculation",
        body: `<p>Mathiter Tutoring tuition is calculated as the Company's declared hourly rate (filed with the regional Education Office) × monthly tutoring hours, complying with the statutory hourly cap of KRW 22,000 under Korean law.</p><p>Declared package time compositions are as follows (as of 2026-05-08):</p><table style="width:100%;border-collapse:collapse;margin:12px 0;"><thead><tr style="background:#f5f5f5;"><th style="border:1px solid #ddd;padding:8px;text-align:left;">Package</th><th style="border:1px solid #ddd;padding:8px;text-align:left;">Grade</th><th style="border:1px solid #ddd;padding:8px;text-align:right;">Monthly Tuition</th><th style="border:1px solid #ddd;padding:8px;text-align:left;">Declared Hours (min/day × days/wk × 4.3 wks)</th><th style="border:1px solid #ddd;padding:8px;text-align:right;">Hourly Rate</th></tr></thead><tbody><tr><td style="border:1px solid #ddd;padding:8px;">Basic</td><td style="border:1px solid #ddd;padding:8px;">Elementary (US G1~5)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 600,000</td><td style="border:1px solid #ddd;padding:8px;"><strong>30.1h</strong><br/><span style="color:#666;font-size:12px;">140min/day × 3/wk × 4.3wks</span></td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 19,933</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Advanced</td><td style="border:1px solid #ddd;padding:8px;">Middle (US G6~8)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 860,000</td><td style="border:1px solid #ddd;padding:8px;"><strong>43.0h</strong><br/><span style="color:#666;font-size:12px;">150min/day × 4/wk × 4.3wks</span></td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 20,000</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Pro</td><td style="border:1px solid #ddd;padding:8px;">High (US G9~11)</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 960,000</td><td style="border:1px solid #ddd;padding:8px;"><strong>45.9h</strong><br/><span style="color:#666;font-size:12px;">160min/day × 4/wk × 4.3wks (supplementary filing in progress)</span></td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 20,929</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Master</td><td style="border:1px solid #ddd;padding:8px;">College Prep / Olympiad</td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 1,200,000</td><td style="border:1px solid #ddd;padding:8px;"><strong>57.3h</strong><br/><span style="color:#666;font-size:12px;">160min/day × 5/wk × 4.3wks</span></td><td style="border:1px solid #ddd;padding:8px;text-align:right;">KRW 20,942</td></tr></tbody></table><p>The declared monthly tutoring hours above are composed of the following activities:</p><ol><li><strong>1:1 real-time video coaching (synchronous)</strong><br/>· Basic / Advanced / Pro: 2 sessions/wk × 55min (~7.3h/month)<br/>· Master: 3 sessions/wk × 55min (~11h/month)</li><li><strong>Asynchronous learning management</strong> (the remaining hours after subtracting the 1:1 video time above)<br/>· AI learning data monitoring and diagnosis<br/>· Homework review and personalized curriculum management<br/>· Weekly parent reports<br/>· Q&A channel responses</li></ol><p>Package amounts are exempt from Korean VAT under Article 42 of the Enforcement Decree of the Value-Added Tax Act. Current declared rates and time compositions are always published on the pricing page in their latest form. Rate changes apply only from the next cycle for existing members.</p>`,
      },
      {
        heading: "A-3. Billing — Post-Cycle, Auto-Charged",
        body: `<p><strong>Billing unit — Cycle</strong>: A cycle is defined as a bundle of N 1:1 video sessions (Basic/Advanced/Pro = 8 sessions, Master = 12 sessions). Cycles start at the first 1:1 session and end upon completion of the N-th session, on a rolling basis (not calendar months).</p><p><strong>Billing timing — Post-cycle automatic</strong>: Upon completion of the final session of a cycle (normal termination + 24-hour parent dispute window expired), the Company automatically charges the full package amount to the registered billing key.</p><p><strong>Advance notice</strong>: The Company sends an advance notice email to the parent one day before each automatic charge, including the package name, session breakdown, expected amount, last 4 digits of the card, and scheduled charge time. The parent may update their card or terminate the service before the charge.</p><p><strong>Card registration timing</strong>: The parent must register a billing key via My Page before the first formal session of a cycle. Formal session booking may be restricted if no billing key is registered.</p>`,
      },
      {
        heading: "A-4. 1:1 Session Counting Rules",
        body: `<p>Session counting is automatically processed by the following rules. Completion marking is generated automatically when a session ends in the in-app classroom and is immediately displayed in the parent dashboard. If the parent does not dispute within 24 hours, the session is confirmed automatically.</p><ul><li><strong>Normal completion</strong> — Count +1. (Session normally terminated in the in-app classroom)</li><li><strong>Student no-show</strong> (student does not attend scheduled session) — Count +1. The Company may, at its discretion, offer a make-up slot.</li><li><strong>Parent cancellation in advance</strong> (regardless of timing) — Count +0. Any prior cancellation notice exempts the session from counting.</li><li><strong>Company cancellation</strong> — Count +0. The Company is obligated to provide a make-up.</li><li><strong>Abnormally short session</strong> (internet disruption, student condition, etc.) — Count +1, with the unfulfilled time compensated through extended next regular session or a separate make-up slot at the Company's discretion.</li></ul>`,
      },
      {
        heading: "A-5. Refund Policy (Mid-Cycle Termination)",
        body: `<p>The Member (parent) may terminate the Mathiter Tutoring service at any time. Settlement is calculated by the ratio of completed 1:1 sessions, and any difference is refunded.</p><p><strong>Refund formula</strong>:</p><p style="background:#f9f9f9;padding:12px;border-left:3px solid #2D6BFF;margin:12px 0;font-family:monospace;">Settlement = Cycle Package Amount × (Completed 1:1 Sessions ÷ Total Cycle Sessions)</p><p><strong>Example 1</strong>: Termination after 3 sessions in an Advanced KRW 860,000 cycle<br/>→ Settlement KRW 322,500 retained by Company, KRW 537,500 refunded.</p><p><strong>Example 2</strong>: Termination after 5 sessions in a Master KRW 1,200,000 cycle<br/>→ Settlement KRW 500,000 retained by Company, KRW 700,000 refunded.</p><p>Because asynchronous activities (AI monitoring, homework review, parent reports, Q&A) progress in proportion to the 1:1 sessions, the ratio of completed 1:1 sessions serves as a representative metric for total tutoring progress.</p><p>Refunds are processed within 7 business days to the registered payment method. If the payment method has expired or is otherwise unavailable, the Company coordinates with the parent for an alternative refund method (e.g., bank transfer).</p>`,
      },
      {
        heading: "A-6. Failed Payment Handling",
        body: `<p>If the automatic charge at cycle completion fails, the following procedure applies:</p><ol><li><strong>First failed attempt</strong> — The parent and the Company are notified by email immediately.</li><li><strong>Automatic retry after 24 hours</strong> — If the temporary issue (card limit, expiration, etc.) is resolved, the payment is processed automatically.</li><li><strong>Second failed attempt</strong> — Automatic retries cease. The parent and the Company are notified by email. The Company contacts the parent directly to coordinate payment method updates or alternative settlement.</li></ol><p>Tutoring sessions are not immediately suspended due to failed payment; the Company first coordinates with the parent.</p>`,
      },
      {
        heading: "B. Mathiter learning app (SaaS)",
        body: `<p>The provisions of this B apply exclusively to the Mathiter learning app track.</p>`,
      },
      {
        heading: "B-1. Freemium Structure",
        body: `<p>The Mathiter learning app is provided in two tiers:</p><ul><li><strong>Free users</strong>: Basic features available indefinitely without charge, subject to a daily usage cap (problems, AI coaching, lessons, etc.). Automatically applied upon registration; no payment method required.</li><li><strong>Paid users</strong>: All features available without limit for KRW 34,900 per month (including applicable tax), charged on a recurring monthly basis.</li></ul><p>The Company may modify the scope of free/paid features and daily limits as needed for service operation, with material changes announced in advance via site notice or email.</p>`,
      },
      {
        heading: "B-2. Paid Subscription — Recurring Billing and Auto-Renewal",
        body: `<p>Paid subscriptions are automatically charged each month to the Member's registered payment method (billing key). Subscriptions auto-renew until canceled, on the same day of the month as the first payment.</p><p>Members may cancel anytime via My Page. After cancellation, paid features remain accessible until the end of the current billing period. Pro-rated refunds are not provided.</p><p>The Company will notify Members at least 30 days in advance of any price change. Members who do not agree may cancel before the next renewal.</p>`,
      },
      {
        heading: "B-3. Failed Payment and 7-Day Grace Period",
        body: `<p>If a recurring charge fails, the following procedure applies:</p><ol><li><strong>Day 0 (first failure)</strong> — Member and Company notified immediately by email. Automatic retry scheduled in 24 hours.</li><li><strong>Day 1 (second failure)</strong> — Member and Company notified by email. Automatic retries cease and a <strong>7-day grace period</strong> begins. Paid features remain accessible during grace.</li><li><strong>Day 4</strong> — Mid-grace reminder email.</li><li><strong>Day 7</strong> — Grace period ends. If payment is not restored, the Member is automatically downgraded to free tier and the daily usage cap is applied.</li></ol>`,
      },
      {
        heading: "B-4. Learning Data Retention and Permanent Deletion",
        body: `<p>For Members downgraded to the free tier, learning data (problem history, progress, weak topic analysis, notes, etc.) is processed as follows:</p><ul><li><strong>Day 7 ~ Day 37</strong> (30 days) — Learning data preserved as-is, accessible within free-tier limits.</li><li><strong>Day 37</strong> — Learning data enters dormant state. The Member is notified that "90 days remain for recovery." Data is safely stored in backup.</li><li><strong>Day 67</strong> — "60 days remain for recovery" notice email.</li><li><strong>Day 97</strong> — "30 days remain for recovery" final warning email.</li><li><strong>Day 127</strong> — Backup permanently deleted. Re-subscription cannot restore the data.</li></ul><p>Members may re-subscribe anytime before Day 127 to instantly restore all learning data. This policy is designed to avoid indefinite data retention while giving Members ample time to decide.</p>`,
      },
      {
        heading: "B-5. Auto-Free for Mathiter Tutoring Members",
        body: `<p>While Mathiter Tutoring (A) sessions are actively running (status: active), Members automatically receive free access to all Mathiter learning app paid features. No separate payment is required and no billing key is issued for this purpose.</p><p>Subscription handling after tutoring ends follows C (Track Transitions).</p>`,
      },
      {
        heading: "C. Track Transitions",
        body: `<p>The following provisions apply when a Member moves between Mathiter Tutoring and the Mathiter learning app.</p>`,
      },
      {
        heading: "C-1. Billing Key Purpose Separation",
        body: `<p>The Company strictly observes purpose separation for billing keys. A billing key registered for Mathiter Tutoring is <strong>not</strong> automatically used for Mathiter learning app subscriptions without the Member's explicit re-consent. This reflects the Company's obligations under Korea's Act on Consumer Protection in Electronic Commerce and card network rules.</p><p>Members who wish to pay for both tracks must register and consent to a separate billing key for each track.</p>`,
      },
      {
        heading: "C-2. 14-Day Grace After Tutoring Termination",
        body: `<p>When Mathiter Tutoring sessions are terminated (canceled, completed, or expired), Members retain access to Mathiter learning app paid features for 14 days (grace period). The following notification emails are sent during this period:</p><ul><li><strong>Day 1</strong> — Grace start notification with subscription options.</li><li><strong>Day 7</strong> — Mid-grace reminder.</li><li><strong>Day 14</strong> — Final reminder.</li></ul><p>During the grace period, the Member may choose one of the following:</p><ol><li><strong>Start Mathiter learning app subscription</strong> — Requires a separate consent process and registration of a new billing key. The tutoring billing key is not auto-used.</li><li><strong>Switch to free tier</strong> — Daily usage cap applies, and the B-4 learning data retention policy applies.</li></ol><p>If the Member does not make an explicit choice within 14 days, the Company automatically applies "Switch to free tier."</p>`,
      },
      {
        heading: "5. Intellectual Property",
        body: `<p>All content on the Service — including text, graphics, logos, images, audio, video, software, math problems, explanations, lessons, curriculum materials, and 1:1 coaching content — is owned by Elicova or its licensors and is protected by copyright, trademark, and other intellectual property laws.</p><p>You may not copy, modify, distribute, sell, license, or create derivative works from any content on the Service without the Company's express written permission, except for personal learning use within the Service.</p>`,
      },
      {
        heading: "6. User Content",
        body: `<p>You may submit content to the Service, including responses to practice problems, notes during 1:1 sessions, feedback, and other materials ("User Content"). You retain ownership of your User Content but grant the Company a worldwide, non-exclusive, royalty-free license to use, display, store, and analyze your User Content in connection with operating, improving, and providing personalized learning for you.</p><p>You represent that you have all necessary rights to submit your User Content and that it does not violate any third-party rights.</p>`,
      },
      {
        heading: "7. AI Features",
        body: `<p>The Service includes AI-powered features such as adaptive diagnostic testing, personalized learning coaching, automated explanations, and solution analysis ("AI Features"). You acknowledge and agree:</p><ul><li>AI-generated content is provided for educational purposes only and may contain inaccuracies or errors.</li><li>AI outputs are not a substitute for professional academic advice or guidance from a licensed educator. For Mathiter Tutoring, Sejun Park provides direct coaching using AI data as reference.</li><li>The Company may use de-identified or aggregated data from AI Feature interactions to improve the Service.</li><li>The Company does not use your personal AI interaction data to train third-party AI models.</li></ul>`,
      },
      {
        heading: "8. Prohibited Conduct",
        body: `<p>You agree not to:</p><ul><li>Use automated tools, bots, scrapers, or data mining techniques to access or collect data from the Service.</li><li>Attempt to gain unauthorized access to any part of the Service, other Members' accounts, or the Company's systems.</li><li>Reverse engineer, decompile, or disassemble any software used in the Service.</li><li>Use the Service for any unlawful purpose or in violation of any applicable law.</li><li>Submit false, misleading, defamatory, or offensive content.</li><li>Interfere with the proper functioning of the Service or impose an unreasonable load on the infrastructure.</li><li>Use content from the Service to train AI or machine learning models without written authorization.</li><li>Distribute 1:1 session content or learning materials externally without the Company's prior written consent.</li></ul>`,
      },
      {
        heading: "9. Third-Party Services and Payment Processing",
        body: `<p>The Company operates the Service through the following third-party providers; Member information may be entrusted to these providers. See the Privacy Policy for details.</p><ul><li><strong>Payment processing</strong>: Toss Payments Co., Ltd. — payment processing and billing key issuance.</li><li><strong>Infrastructure/Database</strong>: Google LLC (Firebase Hosting, Cloud Run, Firestore).</li><li><strong>Web hosting (landing)</strong>: Vercel Inc. (mathiter-homepage).</li><li><strong>Domain registration</strong>: Whois Corp.</li></ul>`,
      },
      {
        heading: "10. Disclaimer of Warranties",
        body: `<p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. THE COMPANY DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT ANY DEFECTS WILL BE CORRECTED.</p><p>For Mathiter Tutoring, the Company makes reasonable efforts to support student learning improvement but does not warrant specific test scores, admissions outcomes, or academic achievement.</p>`,
      },
      {
        heading: "11. Limitation of Liability",
        body: `<p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE. THE COMPANY'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU HAVE PAID TO THE COMPANY IN THE SIX (6) MONTHS PRECEDING THE CLAIM. THE FOREGOING LIMITATION DOES NOT APPLY TO DAMAGES CAUSED BY THE COMPANY'S WILLFUL MISCONDUCT OR GROSS NEGLIGENCE.</p>`,
      },
      {
        heading: "12. Indemnification",
        body: `<p>You agree to indemnify and hold harmless the Company, its representative, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney's fees) arising from your use of the Service, your violation of these Terms, or your violation of any third-party rights.</p>`,
      },
      {
        heading: "13. Termination",
        body: `<p>You may request account termination anytime via My Page. The Company may, with or without prior notice, suspend or terminate your access to the Service if: (1) you violate these Terms, (2) your payment failure persists for 7 or more days, (3) you use the Service fraudulently, or (4) required by law.</p><p>Provisions regarding intellectual property, disclaimers, limitation of liability, and indemnification shall survive termination.</p>`,
      },
      {
        heading: "14. Governing Law and Dispute Resolution",
        body: `<p>These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea. Any disputes arising from these Terms or the Service shall first be resolved through good-faith negotiation between the Company and the Member. If negotiation fails, the court with jurisdiction over the Company's business address (Suwon District Court) shall have exclusive jurisdiction as the court of first instance.</p>`,
      },
      {
        heading: "15. Changes to These Terms",
        body: `<p>The Company may update these Terms from time to time. Material changes will be announced via in-Service notice and email to registered Members at least 7 days in advance (or at least 30 days in advance for changes adverse to Members), and the "Effective Date" above will be updated. Continued use of the Service after the effective date constitutes your acceptance of the updated Terms.</p>`,
      },
      {
        heading: "16. Company Information and Contact",
        body: `<div style="background:#f9f9f9;padding:16px;border-radius:8px;margin:12px 0;"><p style="margin:0 0 8px 0;"><strong>Company Name</strong>: Elicova<br/><strong>Representative</strong>: Sejun Park<br/><strong>Business Registration Number</strong>: 710-05-03676<br/><strong>Business Type</strong>: Simplified Taxpayer (간이과세자)<br/><strong>Business Address</strong>: 1-303 La Sentra, 579-1 Gihungdanji-ro, Idong-eup, Cheoin-gu, Yongin-si, Gyeonggi-do, Republic of Korea<br/><strong>Industry</strong>: Information & Communications / Software Development & Supply, E-commerce Retail, Media Content Creation<br/><strong>E-commerce Registration Number</strong>: No. 2026-Yongin Cheoin-01131<br/><strong>Private Tutoring Registration Number</strong>: No. 9031 (Yongin Education Support Office, issued 2026-05-15)</p></div><p><strong>Contact Channels</strong>:</p><ul><li><strong>General inquiries</strong>: <a href="mailto:contact@mathiter.com">contact@mathiter.com</a></li><li><strong>Service / billing inquiries</strong>: <a href="mailto:support@mathiter.com">support@mathiter.com</a></li><li><strong>KakaoTalk ID</strong>: mathiter (add as friend for 1:1 inquiries)</li><li><strong>Website</strong>: <a href="https://mathiter.com">https://mathiter.com</a></li></ul>`,
      },
    ],
  },
};

export default async function TermsPage({ params }: Props) {
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
