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
    title: "개인정보처리방침",
    effectiveDate: "시행일: 2026년 5월 8일",
    sections: [
      {
        heading: "",
        body: `<p>엘리코바(Elicova)(이하 "회사")는 「개인정보 보호법」을 비롯한 관련 법령을 준수하며, 회원의 개인정보를 소중하게 보호합니다. 본 개인정보처리방침은 회사가 운영하는 Mathiter 웹사이트(<a href="https://mathiter.com">mathiter.com</a>), 웹·모바일 애플리케이션, Mathiter Tutoring 서비스 및 모든 관련 제품·서비스(이하 통칭 "서비스")를 회원이 이용할 때 회사가 개인정보를 수집·이용·보관·파기하는 방법을 설명합니다.</p>`,
      },
      {
        heading: "1. 수집하는 개인정보 항목",
        body: `<h3>1.1 회원이 직접 제공하는 정보</h3><ul><li><strong>계정 정보 (필수)</strong>: 이메일 주소, 비밀번호(암호화 저장), 이름/닉네임, 학년 또는 학습 단계, 프로필 이미지(선택).</li><li><strong>학부모 계정 정보 (Mathiter Tutoring 트랙)</strong>: 학부모 이름, 휴대전화 번호, 이메일 주소, 학생과의 관계.</li><li><strong>결제 정보</strong>: 결제대행사(토스페이먼츠)를 통해 발급된 빌링키, 카드 끝 4자리, 카드사 명. <strong>회사는 전체 카드 번호·CVC·유효기간을 저장하지 않습니다.</strong></li><li><strong>학습 데이터</strong>: 진단 테스트 결과, 문제 풀이 기록, 학습 진도, AI 코칭 상호작용, 노트, 취약 단원 분석 결과.</li><li><strong>Mathiter Tutoring 영업 프로세스 데이터</strong>: 학부모 상담 메모, 학습 목표, 수업 일정, 학부모 리포트 내용.</li><li><strong>커뮤니케이션</strong>: 고객지원 메시지, 피드백, 설문 응답.</li></ul><h3>1.2 자동 수집 정보</h3><ul><li><strong>기기/접속 정보</strong>: IP 주소, 기기 유형, 운영체제, 브라우저 종류, 언어 설정, 접속 시각·기간.</li><li><strong>이용 데이터</strong>: 방문 페이지, 사용 기능, 클릭·탐색 경로, 학습 세션 통계.</li><li><strong>쿠키 및 유사 기술</strong>: 자세한 내용은 제7조를 참조하시기 바랍니다.</li></ul><h3>1.3 제3자 인증 시 수집 정보</h3><p>Google·Apple 등을 통해 가입·로그인하는 경우 해당 서비스로부터 이름, 이메일 주소 등 기본 프로필 정보를 받을 수 있습니다.</p>`,
      },
      {
        heading: "2. 개인정보의 이용 목적",
        body: `<p>회사는 수집한 개인정보를 다음 목적으로 이용합니다:</p><ul><li><strong>서비스 제공</strong>: 회원 인증, 결제 처리, 학습 콘텐츠 제공, 1:1 화상 수업 운영, 학부모 대시보드 노출.</li><li><strong>맞춤형 학습</strong>: 진단 테스트 결과 기반 커리큘럼 추천, AI 코칭, 취약 단원 분석.</li><li><strong>요금 결제 및 정산</strong>: 사이클 후납 자동 결제, 정기결제 자동 갱신, 환불 처리, 영수증·현금영수증 발행.</li><li><strong>고객지원</strong>: 문의 응답, 결제 실패·환불 안내, 서비스 변경 통지.</li><li><strong>서비스 개선</strong>: 비식별·집계된 학습 패턴 분석으로 콘텐츠·기능 개선.</li><li><strong>법적 의무 이행</strong>: 「학원의 설립·운영 및 과외교습에 관한 법률」에 따른 매월 교습료 신고, 세법상 매출 기록 보관, 분쟁 대응.</li></ul><p><strong>중요</strong>: 회사는 회원의 개인 학습 데이터 또는 AI 상호작용 데이터를 제3자 AI 모델 훈련에 사용하지 않습니다.</p>`,
      },
      {
        heading: "3. 개인정보의 보유 및 이용 기간",
        body: `<p>회사는 개인정보 수집·이용 목적이 달성될 때까지 또는 회원이 탈퇴할 때까지 개인정보를 보유하며, 다음의 경우 별도 기간 동안 보관합니다.</p><h3>3.1 일반 보존 기간</h3><ul><li><strong>계정 활성 동안</strong>: 계정 정보, 학습 데이터, 결제 정보 등을 활성 상태로 유지.</li><li><strong>회원 탈퇴 시</strong>: 탈퇴 즉시 식별 정보 삭제. 단, 아래 법령상 보존 기간이 있는 항목은 별도 분리 보관 후 만료 시 파기.</li></ul><h3>3.2 SaaS 다운그레이드 시 학습 데이터 보존 정책</h3><p>유료 구독이 결제 실패 등으로 무료 등급으로 다운그레이드된 경우 학습 데이터(문제풀이 기록·진도·취약 단원 분석·노트 등)는 다음 일정으로 처리됩니다:</p><ul><li><strong>Day 7 ~ Day 37</strong> (30일간): 학습 데이터 유지, 무료 사용자 limit 내 접근 가능.</li><li><strong>Day 37</strong>: 학습 데이터 휴면 처리, "복구 가능 90일 남음" 안내.</li><li><strong>Day 67</strong>: "복구 가능 60일 남음" 알림.</li><li><strong>Day 97</strong>: "복구 가능 30일 남음" 마지막 경고.</li><li><strong>Day 127</strong>: 백업 영구 삭제. 재구독해도 복구 불가.</li></ul><p>회원은 Day 127 이전 재구독하면 학습 데이터를 즉시 복원할 수 있습니다.</p><h3>3.3 법령에 따른 의무 보관</h3><ul><li><strong>전자상거래 등에서의 소비자보호에 관한 법률</strong>: 계약·청약철회·대금결제·재화 공급 기록 5년 / 소비자 불만·분쟁 처리 기록 3년.</li><li><strong>전자금융거래법</strong>: 결제 관련 기록 5년.</li><li><strong>국세기본법</strong>: 거래에 관한 장부 및 증빙 5년.</li><li><strong>학원의 설립·운영 및 과외교습에 관한 법률</strong>: 교습료 신고 관련 매출 기록 (관할 교육지원청 보고 의무 기간).</li><li><strong>통신비밀보호법</strong>: 로그인 기록 3개월.</li></ul>`,
      },
      {
        heading: "4. 개인정보의 제3자 제공",
        body: `<p>회사는 회원의 개인정보를 제3자에게 판매·임대·제공하지 않습니다. 다만 다음의 경우에는 예외로 합니다:</p><ul><li><strong>회원의 사전 동의가 있는 경우</strong>.</li><li><strong>법령에 따라 요구되는 경우</strong>: 적법한 영장·수사 협조 요청·법원의 명령 등.</li><li><strong>학부모 대시보드</strong>: Mathiter Tutoring 또는 학부모 연결 학생 계정의 경우, 학습 진도 데이터(점수, 학습 시간, 취약 영역)가 연결된 학부모 계정에 노출됩니다. 이는 정상적인 서비스 운영 흐름이며 별도 제3자 제공이 아닙니다.</li><li><strong>사업 양도</strong>: 합병·인수·자산 양도가 발생하는 경우, 양수인에게 본 방침이 그대로 적용된다는 조건 하에 정보가 이전될 수 있습니다.</li></ul>`,
      },
      {
        heading: "5. 개인정보 처리의 위탁",
        body: `<p>회사는 서비스 운영에 필요한 다음 업무를 외부 업체에 위탁하며, 각 수탁업체는 개인정보보호 의무를 계약상 부담합니다.</p><table style="width:100%;border-collapse:collapse;margin:12px 0;"><thead><tr style="background:#f5f5f5;"><th style="border:1px solid #ddd;padding:8px;text-align:left;">수탁업체</th><th style="border:1px solid #ddd;padding:8px;text-align:left;">위탁 업무</th></tr></thead><tbody><tr><td style="border:1px solid #ddd;padding:8px;">토스페이먼츠㈜</td><td style="border:1px solid #ddd;padding:8px;">결제 처리, 빌링키 발급·관리, 현금영수증 자동 발행</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Google LLC (Firebase / Cloud Run / Firestore)</td><td style="border:1px solid #ddd;padding:8px;">서비스 인프라, 회원 인증, 데이터베이스, 호스팅 (us-central1)</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Vercel Inc.</td><td style="border:1px solid #ddd;padding:8px;">홈페이지(mathiter-homepage) 호스팅</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Whois Corp.</td><td style="border:1px solid #ddd;padding:8px;">도메인(mathiter.com) 등록·관리</td></tr></tbody></table><p>일부 수탁업체는 해외 사업자이며, 이 경우 개인정보가 국외로 이전됩니다. 자세한 사항은 제8조를 참조하시기 바랍니다.</p>`,
      },
      {
        heading: "6. 만 14세 미만 아동의 개인정보",
        body: `<p>회사는 만 14세 미만 아동의 회원 가입 시 법정대리인(부모 또는 보호자)의 동의를 받습니다. 동의 받지 않은 만 14세 미만 아동의 개인정보가 수집된 사실을 인지한 경우, 회사는 즉시 해당 정보를 삭제합니다.</p><p>법정대리인은 언제든 자녀의 개인정보 열람·정정·삭제를 요청할 수 있으며, <a href="mailto:support@mathiter.com">support@mathiter.com</a>으로 연락해 주시기 바랍니다.</p>`,
      },
      {
        heading: "7. 쿠키 및 추적 기술",
        body: `<p>회사는 다음 유형의 쿠키 및 유사 기술을 사용합니다:</p><ul><li><strong>필수 쿠키</strong>: 회원 인증·세션 유지·보안 등 서비스 작동에 필수적인 쿠키.</li><li><strong>분석 쿠키</strong>: 회원의 서비스 이용 패턴을 분석하여 서비스 개선에 활용.</li><li><strong>환경설정 쿠키</strong>: 언어·테마 등 회원 설정을 기억.</li></ul><p>회원은 브라우저 설정을 통해 쿠키 수신을 거부할 수 있으나, 필수 쿠키를 차단할 경우 일부 서비스가 정상 작동하지 않을 수 있습니다.</p>`,
      },
      {
        heading: "8. 개인정보의 국외 이전",
        body: `<p>회사가 이용하는 인프라(Google Cloud, Vercel 등)의 일부 서버가 해외에 위치하여 회원의 개인정보가 국외로 이전될 수 있습니다. 이전되는 항목·수신자·이전 국가·이전 일시·보유 기간은 다음과 같습니다:</p><ul><li><strong>이전 항목</strong>: 회원의 모든 서비스 이용 데이터.</li><li><strong>수신자</strong>: Google LLC (미국), Vercel Inc. (미국).</li><li><strong>이전 국가</strong>: 미국.</li><li><strong>이전 방법</strong>: 네트워크 전송(암호화).</li><li><strong>보유 기간</strong>: 본 방침 제3조에 따른 보유 기간.</li></ul><p>회원은 본 국외 이전에 동의하지 않을 수 있으나, 그 경우 서비스 이용이 불가합니다.</p>`,
      },
      {
        heading: "9. 정보주체의 권리",
        body: `<p>회원(정보주체)은 회사에 대해 다음 권리를 행사할 수 있습니다:</p><ul><li><strong>열람 요청</strong>: 회사가 보유한 본인의 개인정보 열람.</li><li><strong>정정·삭제 요청</strong>: 부정확하거나 불완전한 정보의 정정, 삭제.</li><li><strong>처리정지 요청</strong>: 개인정보 처리의 일시적 중단 요청.</li><li><strong>동의 철회</strong>: 개인정보 수집·이용·제공에 대한 동의의 철회.</li><li><strong>이동권</strong>: 개인정보를 기계 판독 가능한 형식으로 제공받을 권리.</li></ul><p>위 권리 행사는 회사 고객센터(<a href="mailto:support@mathiter.com">support@mathiter.com</a>)로 요청하시면 지체 없이 처리합니다. 회사는 본인 확인 절차를 거친 후 회원의 요청을 처리합니다.</p><p>회원이 회사의 처리에 대해 이의가 있는 경우 개인정보보호위원회(privacy.go.kr) 또는 한국인터넷진흥원 개인정보침해신고센터(privacy.kisa.or.kr, 국번없이 118)에 신고할 수 있습니다.</p>`,
      },
      {
        heading: "10. 개인정보의 안전성 확보 조치",
        body: `<p>회사는 회원의 개인정보를 보호하기 위해 다음 조치를 시행하고 있습니다:</p><ul><li><strong>관리적 조치</strong>: 개인정보 처리 직원 최소화 및 접근 권한 관리, 정기 보안 교육.</li><li><strong>기술적 조치</strong>: 비밀번호 단방향 암호화(bcrypt), 결제 정보 토큰화(빌링키), 전송 구간 TLS 1.2+ 암호화, 데이터베이스 접근 통제, 정기 백업.</li><li><strong>물리적 조치</strong>: 데이터 처리를 위탁한 Google Cloud·Vercel 등의 데이터센터 물리적 보안(수탁사 보안 정책 준수).</li></ul>`,
      },
      {
        heading: "11. 개인정보보호책임자 및 문의처",
        body: `<div style="background:#f9f9f9;padding:16px;border-radius:8px;margin:12px 0;"><p style="margin:0;"><strong>개인정보보호책임자</strong>: 박세준 (대표)<br/><strong>이메일</strong>: <a href="mailto:support@mathiter.com">support@mathiter.com</a><br/><strong>소속</strong>: 엘리코바 (Elicova)<br/><strong>전화</strong>: 010-5187-8080 (운영 시간: 평일 10:00~18:00 KST)</p></div><p>개인정보 관련 문의·민원은 위 책임자에게 접수해 주시기 바랍니다. 회사는 접수 후 지체 없이 답변드립니다(영업일 기준 7일 이내).</p>`,
      },
      {
        heading: "12. 본 개인정보처리방침의 변경",
        body: `<p>회사는 본 개인정보처리방침을 수시로 업데이트할 수 있습니다. 중요한 변경이 있는 경우 시행 최소 7일 전(불리한 변경의 경우 최소 30일 전) 서비스 내 공지 및 등록된 이메일로 사전 통지합니다.</p>`,
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    effectiveDate: "Effective Date: May 8, 2026",
    sections: [
      {
        heading: "",
        body: `<p>Elicova (hereinafter "the Company"), a sole proprietorship in the Republic of Korea, is committed to protecting Members' personal information in compliance with the Personal Information Protection Act of Korea and other applicable laws. This Privacy Policy describes how the Company collects, uses, stores, and disposes of personal information when Members use the Mathiter website (<a href="https://mathiter.com">mathiter.com</a>), web and mobile applications, the Mathiter Tutoring service, and all related products and services (collectively, the "Service").</p>`,
      },
      {
        heading: "1. Information We Collect",
        body: `<h3>1.1 Information You Provide</h3><ul><li><strong>Account information (required)</strong>: Email address, password (stored encrypted), name/nickname, grade or learning stage, optional profile image.</li><li><strong>Parent account information (Mathiter Tutoring)</strong>: Parent's name, mobile number, email, and relationship to the student.</li><li><strong>Payment information</strong>: Billing key issued by our payment processor (Toss Payments), last 4 digits of card, card issuer. <strong>The Company does not store full card numbers, CVC, or expiration dates.</strong></li><li><strong>Learning data</strong>: Diagnostic test results, problem-solving history, learning progress, AI coaching interactions, notes, and weak-topic analysis.</li><li><strong>Mathiter Tutoring enrollment process data</strong>: Consultation notes, learning goals, session schedules, parent reports.</li><li><strong>Communications</strong>: Customer support messages, feedback, survey responses.</li></ul><h3>1.2 Information Collected Automatically</h3><ul><li><strong>Device/access information</strong>: IP address, device type, OS, browser, language settings, access time and duration.</li><li><strong>Usage data</strong>: Pages visited, features used, click and navigation paths, learning session statistics.</li><li><strong>Cookies and similar technologies</strong>: See Section 7 for details.</li></ul><h3>1.3 Information from Third-Party Authentication</h3><p>If you sign up or log in through Google, Apple, or similar services, we may receive basic profile information (name, email) from those services.</p>`,
      },
      {
        heading: "2. Purposes of Use",
        body: `<p>The Company uses the information collected for the following purposes:</p><ul><li><strong>Service delivery</strong>: Member authentication, payment processing, learning content delivery, 1:1 video session operation, parent dashboard display.</li><li><strong>Personalized learning</strong>: Curriculum recommendation based on diagnostic results, AI coaching, weak-topic analysis.</li><li><strong>Billing and settlement</strong>: Post-cycle automatic charging, recurring subscription renewal, refund processing, cash receipt issuance.</li><li><strong>Customer support</strong>: Inquiry responses, payment-failure and refund notifications, service-change announcements.</li><li><strong>Service improvement</strong>: De-identified, aggregated learning-pattern analysis to improve content and features.</li><li><strong>Legal compliance</strong>: Monthly tutoring fee reporting under Korean law, tax record keeping, dispute resolution.</li></ul><p><strong>Important</strong>: The Company does not use Member personal learning data or AI interaction data to train third-party AI models.</p>`,
      },
      {
        heading: "3. Retention and Use Period",
        body: `<p>The Company retains personal information until the collection/use purpose is fulfilled or the Member terminates the account, except as noted below.</p><h3>3.1 General Retention</h3><ul><li><strong>While the account is active</strong>: Account information, learning data, and payment information are retained in an active state.</li><li><strong>Upon account termination</strong>: Identifying information is deleted immediately, except items with statutory retention periods (separately stored and disposed of upon expiration).</li></ul><h3>3.2 Learning Data Retention After SaaS Downgrade</h3><p>When a paid subscription is downgraded to free tier due to payment failure or other reasons, learning data is processed as follows:</p><ul><li><strong>Day 7 ~ Day 37</strong> (30 days): Data retained as-is, accessible within free-tier limits.</li><li><strong>Day 37</strong>: Data enters dormant state with "90 days remaining for recovery" notice.</li><li><strong>Day 67</strong>: "60 days remaining for recovery" notice.</li><li><strong>Day 97</strong>: "30 days remaining for recovery" final warning.</li><li><strong>Day 127</strong>: Backup permanently deleted. Re-subscription cannot restore data.</li></ul><p>Members may re-subscribe before Day 127 to instantly restore all learning data.</p><h3>3.3 Statutory Retention</h3><ul><li><strong>Act on Consumer Protection in Electronic Commerce</strong>: Contract / withdrawal / payment / delivery records — 5 years. Customer complaint and dispute records — 3 years.</li><li><strong>Electronic Financial Transactions Act</strong>: Payment-related records — 5 years.</li><li><strong>Framework Act on National Taxes</strong>: Transaction ledgers and supporting documents — 5 years.</li><li><strong>Act on Private Teaching Institutes</strong>: Tutoring fee reporting records (as required by the regional Education Office).</li><li><strong>Protection of Communications Secrets Act</strong>: Login records — 3 months.</li></ul>`,
      },
      {
        heading: "4. Disclosure to Third Parties",
        body: `<p>The Company does not sell, rent, or provide Member personal information to third parties, except in the following cases:</p><ul><li><strong>Member's prior consent</strong>.</li><li><strong>Required by law</strong>: Valid warrants, investigation cooperation requests, court orders, etc.</li><li><strong>Parent dashboard</strong>: For Mathiter Tutoring or linked parent-student accounts, learning progress data (scores, study time, weak areas) is displayed in the connected parent account. This is part of normal Service operation and is not deemed a third-party disclosure.</li><li><strong>Business transfer</strong>: In a merger, acquisition, or asset transfer, information may be transferred to the successor under the condition that this Policy continues to apply.</li></ul>`,
      },
      {
        heading: "5. Entrusted Processing",
        body: `<p>The Company entrusts the following processing tasks to external providers, each contractually bound by data protection obligations.</p><table style="width:100%;border-collapse:collapse;margin:12px 0;"><thead><tr style="background:#f5f5f5;"><th style="border:1px solid #ddd;padding:8px;text-align:left;">Processor</th><th style="border:1px solid #ddd;padding:8px;text-align:left;">Entrusted Task</th></tr></thead><tbody><tr><td style="border:1px solid #ddd;padding:8px;">Toss Payments Co., Ltd.</td><td style="border:1px solid #ddd;padding:8px;">Payment processing, billing key issuance and management, automatic cash receipt issuance</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Google LLC (Firebase / Cloud Run / Firestore)</td><td style="border:1px solid #ddd;padding:8px;">Service infrastructure, authentication, database, hosting (us-central1)</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Vercel Inc.</td><td style="border:1px solid #ddd;padding:8px;">Landing site (mathiter-homepage) hosting</td></tr><tr><td style="border:1px solid #ddd;padding:8px;">Whois Corp.</td><td style="border:1px solid #ddd;padding:8px;">Domain (mathiter.com) registration and management</td></tr></tbody></table><p>Some processors are based abroad, resulting in cross-border data transfer. See Section 8 for details.</p>`,
      },
      {
        heading: "6. Personal Information of Children Under 14",
        body: `<p>For Members under the age of 14, the Company obtains consent from a legal representative (parent or guardian) at registration. If the Company becomes aware that it has collected personal information of a child under 14 without legal representative consent, the Company will promptly delete such information.</p><p>Legal representatives may request access, correction, or deletion of their child's personal information at any time via <a href="mailto:support@mathiter.com">support@mathiter.com</a>.</p>`,
      },
      {
        heading: "7. Cookies and Tracking Technologies",
        body: `<p>The Company uses the following types of cookies and similar technologies:</p><ul><li><strong>Essential cookies</strong>: Required for authentication, session, security, and core service operation.</li><li><strong>Analytics cookies</strong>: Used to analyze usage patterns for service improvement.</li><li><strong>Preference cookies</strong>: Remember Member settings such as language and theme.</li></ul><p>Members may decline cookies through browser settings, but blocking essential cookies may render parts of the Service unusable.</p>`,
      },
      {
        heading: "8. Cross-Border Data Transfer",
        body: `<p>Because some of the Company's infrastructure (Google Cloud, Vercel, etc.) is hosted outside Korea, Member personal information may be transferred abroad. Details are as follows:</p><ul><li><strong>Items transferred</strong>: All Member service usage data.</li><li><strong>Recipients</strong>: Google LLC (United States), Vercel Inc. (United States).</li><li><strong>Country of transfer</strong>: United States.</li><li><strong>Transfer method</strong>: Network transmission (encrypted).</li><li><strong>Retention period</strong>: Per Section 3 of this Policy.</li></ul><p>Members may decline cross-border transfer, but doing so will prevent use of the Service.</p>`,
      },
      {
        heading: "9. Rights of Data Subjects",
        body: `<p>As a data subject, you may exercise the following rights with respect to the Company:</p><ul><li><strong>Right of access</strong>: Request to view personal information held by the Company about you.</li><li><strong>Right to correction/deletion</strong>: Request correction or deletion of inaccurate or incomplete data.</li><li><strong>Right to suspend processing</strong>: Request temporary suspension of data processing.</li><li><strong>Right to withdraw consent</strong>: Withdraw consent for collection, use, or provision of personal information.</li><li><strong>Right to data portability</strong>: Receive your personal information in a machine-readable format.</li></ul><p>To exercise these rights, please contact our customer support at <a href="mailto:support@mathiter.com">support@mathiter.com</a>. The Company will process requests without undue delay after identity verification.</p><p>You may also report concerns to the Personal Information Protection Commission of Korea (privacy.go.kr) or the Korea Internet & Security Agency's Privacy Infringement Reporting Center (privacy.kisa.or.kr, dial 118).</p>`,
      },
      {
        heading: "10. Security Measures",
        body: `<p>The Company implements the following measures to protect Member personal information:</p><ul><li><strong>Administrative</strong>: Minimization of personal-information handlers, access privilege management, regular security training.</li><li><strong>Technical</strong>: One-way password hashing (bcrypt), payment information tokenization (billing keys), TLS 1.2+ encryption in transit, database access control, regular backups.</li><li><strong>Physical</strong>: Data center physical security compliance by processors (Google Cloud, Vercel, etc.).</li></ul>`,
      },
      {
        heading: "11. Data Protection Officer and Contact",
        body: `<div style="background:#f9f9f9;padding:16px;border-radius:8px;margin:12px 0;"><p style="margin:0;"><strong>Data Protection Officer</strong>: Sejun Park (Representative)<br/><strong>Email</strong>: <a href="mailto:support@mathiter.com">support@mathiter.com</a><br/><strong>Affiliation</strong>: Elicova<br/><strong>Phone</strong>: 010-5187-8080 (Hours: Weekdays 10:00–18:00 KST)</p></div><p>Please direct privacy-related inquiries or complaints to the officer above. The Company will respond without undue delay (within 7 business days).</p>`,
      },
      {
        heading: "12. Changes to This Privacy Policy",
        body: `<p>The Company may update this Privacy Policy from time to time. Material changes will be announced via in-Service notice and email to registered Members at least 7 days in advance (or at least 30 days in advance for changes adverse to Members), with the "Effective Date" updated accordingly.</p>`,
      },
    ],
  },
};

export default async function PrivacyPage({ params }: Props) {
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
