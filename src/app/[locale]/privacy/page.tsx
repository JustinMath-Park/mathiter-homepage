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
  en: {
    title: "Privacy Policy",
    effectiveDate: "Effective Date: February 23, 2026",
    sections: [
      {
        heading: "",
        body: `<p>주식회사 매쓰이터 (Mathiter Inc.) ("Mathiter," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the Mathiter website (<a href="https://mathiter.com">mathiter.com</a>), mobile applications, and related services (collectively, the "Service").</p><p>By using the Service, you consent to the practices described in this Privacy Policy.</p>`,
      },
      {
        heading: "1. Information We Collect",
        body: `<h3>1.1 Information You Provide</h3><ul><li><strong>Account Information:</strong> Name, email address, password, age, and profile picture when you create an account.</li><li><strong>Payment Information:</strong> Billing details and payment method when you subscribe to a paid plan. Payment processing is handled by third-party providers; we do not store full credit card numbers.</li><li><strong>Learning Data:</strong> Your responses to practice problems, diagnostic test results, study progress, and interactions with AI coaching features.</li><li><strong>Communications:</strong> Messages you send to our support team, feedback, and survey responses.</li></ul><h3>1.2 Information Collected Automatically</h3><ul><li><strong>Device Information:</strong> Device type, operating system, browser type, IP address, device identifiers, and language settings.</li><li><strong>Usage Data:</strong> Pages visited, features used, time spent on the Service, navigation paths, and click patterns.</li><li><strong>Cookies:</strong> We use cookies and similar tracking technologies to collect this data. See Section 7 for details.</li></ul><h3>1.3 Information from Third Parties</h3><p>If you sign in through a third-party service (such as Google or Apple), we may receive basic profile information from that service, such as your name and email address.</p>`,
      },
      {
        heading: "2. How We Use Your Information",
        body: `<p>We use the information we collect to:</p><ul><li>Provide, operate, and maintain the Service, including personalized learning experiences and AI-powered features.</li><li>Process your transactions and manage your subscription.</li><li>Analyze learning patterns to improve our adaptive testing, study recommendations, and content quality.</li><li>Communicate with you, including sending service updates, security alerts, and support responses.</li><li>Generate aggregated, de-identified analytics to improve the Service and develop new features.</li><li>Detect, prevent, and address fraud, abuse, and security issues.</li><li>Comply with legal obligations.</li></ul><p><strong>Important:</strong> We do not use your personal learning data or AI interaction data to train third-party AI models.</p>`,
      },
      {
        heading: "3. How We Share Your Information",
        body: `<p>We do not sell your personal information to third parties. We may share your information in the following circumstances:</p><ul><li><strong>Service Providers:</strong> With trusted third-party vendors who help us operate the Service, such as hosting providers, payment processors, email delivery services, and analytics tools. These providers are contractually obligated to protect your data.</li><li><strong>Parent/Teacher Dashboard:</strong> If a parent or teacher account is linked to a student account, limited learning progress data (scores, study time, weak areas) may be shared with the linked parent or teacher.</li><li><strong>Legal Requirements:</strong> When required by law, in response to valid legal process, or to protect the rights, safety, or property of Mathiter, our users, or the public.</li><li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li></ul>`,
      },
      {
        heading: "4. Children's Privacy",
        body: `<p>Mathiter is designed for students, including those under 18. We take children's privacy seriously.</p><ul><li>We do not knowingly collect personal information from children under 13 without verifiable parental consent.</li><li>If we learn that we have collected personal information from a child under 13 without parental consent, we will promptly delete that information.</li><li>Parents may contact us at any time to review, delete, or restrict the collection of their child's data.</li></ul><p>If you believe a child has provided us with personal information without parental consent, please contact us at <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>.</p>`,
      },
      {
        heading: "5. Data Security",
        body: `<p>We implement reasonable technical and organizational measures to protect your information against unauthorized access, loss, misuse, alteration, and destruction. These measures include encryption of data in transit, secure server infrastructure, and access controls.</p><p>However, no method of data transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.</p>`,
      },
      {
        heading: "6. Data Retention",
        body: `<p>We retain your personal information for as long as your account is active or as needed to provide the Service. We may also retain certain data as required by law or for legitimate business purposes, such as resolving disputes and enforcing our agreements.</p><p>You may request deletion of your account and associated data at any time by contacting us at <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>.</p>`,
      },
      {
        heading: "7. Cookies and Tracking Technologies",
        body: `<p>We use the following types of cookies:</p><ul><li><strong>Essential Cookies:</strong> Required for the Service to function properly (e.g., authentication, security).</li><li><strong>Analytics Cookies:</strong> Help us understand how users interact with the Service so we can improve it.</li><li><strong>Preference Cookies:</strong> Remember your settings and language preferences.</li></ul><p>You can manage cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of the Service.</p>`,
      },
      {
        heading: "8. Your Rights",
        body: `<p>Depending on your location, you may have the following rights regarding your personal information:</p><ul><li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li><li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li><li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal obligations.</li><li><strong>Portability:</strong> Request your data in a machine-readable format.</li><li><strong>Opt-Out:</strong> Opt out of marketing communications at any time by clicking "unsubscribe" in any marketing email or contacting us.</li></ul><p>To exercise any of these rights, please contact us at <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>.</p>`,
      },
      {
        heading: "9. International Data Transfers",
        body: `<p>Your information may be transferred to and processed in countries other than your country of residence, including countries that may have different data protection laws. We ensure appropriate safeguards are in place for such transfers in accordance with applicable law.</p>`,
      },
      {
        heading: "10. Changes to This Privacy Policy",
        body: `<p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on the Service and updating the "Effective Date" above. Your continued use of the Service after changes are posted constitutes your acceptance of the updated policy.</p>`,
      },
      {
        heading: "11. Contact Us",
        body: `<p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p><p><strong>주식회사 매쓰이터 (Mathiter Inc.)</strong><br/>Email: <a href="mailto:contact@mathiter.com">contact@mathiter.com</a><br/>Website: <a href="https://mathiter.com">https://mathiter.com</a></p>`,
      },
    ],
  },
  ko: {
    title: "개인정보처리방침",
    effectiveDate: "시행일: 2026년 2월 23일",
    sections: [
      {
        heading: "",
        body: `<p>주식회사 매쓰이터("Mathiter", "회사", "당사")는 귀하의 개인정보 보호를 위해 최선을 다하고 있습니다. 본 개인정보처리방침은 귀하가 Mathiter 웹사이트(<a href="https://mathiter.com">mathiter.com</a>), 모바일 애플리케이션 및 관련 서비스(이하 "서비스")를 이용할 때 당사가 귀하의 정보를 수집, 이용, 공개 및 보호하는 방법을 설명합니다.</p><p>서비스를 이용함으로써 귀하는 본 개인정보처리방침에 설명된 관행에 동의하게 됩니다.</p>`,
      },
      {
        heading: "1. 수집하는 정보",
        body: `<h3>1.1 귀하가 제공하는 정보</h3><ul><li><strong>계정 정보:</strong> 계정 생성 시 이름, 이메일 주소, 비밀번호, 나이 및 프로필 사진.</li><li><strong>결제 정보:</strong> 유료 플랜 구독 시 청구 세부 정보 및 결제 수단. 결제 처리는 제3자 서비스가 담당하며, 당사는 전체 신용카드 번호를 저장하지 않습니다.</li><li><strong>학습 데이터:</strong> 연습 문제에 대한 답변, 진단 테스트 결과, 학습 진도 및 AI 코칭 기능과의 상호작용.</li><li><strong>커뮤니케이션:</strong> 고객지원팀에 보내는 메시지, 피드백 및 설문 응답.</li></ul><h3>1.2 자동으로 수집되는 정보</h3><ul><li><strong>기기 정보:</strong> 기기 유형, 운영 체제, 브라우저 유형, IP 주소, 기기 식별자 및 언어 설정.</li><li><strong>이용 데이터:</strong> 방문한 페이지, 사용한 기능, 서비스 이용 시간, 탐색 경로 및 클릭 패턴.</li><li><strong>쿠키:</strong> 당사는 쿠키 및 유사한 추적 기술을 사용하여 이러한 데이터를 수집합니다. 자세한 내용은 제7조를 참조하시기 바랍니다.</li></ul><h3>1.3 제3자로부터 받는 정보</h3><p>Google 또는 Apple 등의 제3자 서비스를 통해 로그인하는 경우, 해당 서비스로부터 이름 및 이메일 주소와 같은 기본 프로필 정보를 수신할 수 있습니다.</p>`,
      },
      {
        heading: "2. 정보의 이용 방법",
        body: `<p>당사는 수집한 정보를 다음 목적으로 이용합니다:</p><ul><li>개인화된 학습 경험 및 AI 기반 기능을 포함하여 서비스를 제공, 운영 및 유지합니다.</li><li>거래를 처리하고 구독을 관리합니다.</li><li>적응형 테스트, 학습 추천 및 콘텐츠 품질을 개선하기 위해 학습 패턴을 분석합니다.</li><li>서비스 업데이트, 보안 알림 및 고객지원 응답을 포함하여 귀하와 소통합니다.</li><li>서비스 개선 및 신규 기능 개발을 위해 집계된 비식별 분석 데이터를 생성합니다.</li><li>사기, 남용 및 보안 문제를 감지, 방지 및 해결합니다.</li><li>법적 의무를 준수합니다.</li></ul><p><strong>중요:</strong> 당사는 귀하의 개인 학습 데이터 또는 AI 상호작용 데이터를 제3자 AI 모델 훈련에 사용하지 않습니다.</p>`,
      },
      {
        heading: "3. 정보의 공유",
        body: `<p>당사는 귀하의 개인정보를 제3자에게 판매하지 않습니다. 다음의 경우에 귀하의 정보를 공유할 수 있습니다:</p><ul><li><strong>서비스 제공업체:</strong> 호스팅 제공업체, 결제 처리업체, 이메일 전송 서비스 및 분석 도구 등 서비스 운영을 돕는 신뢰할 수 있는 제3자 업체와 공유합니다. 이러한 업체는 계약에 의해 귀하의 데이터를 보호할 의무가 있습니다.</li><li><strong>학부모/교사 대시보드:</strong> 학부모 또는 교사 계정이 학생 계정에 연결된 경우, 제한된 학습 진도 데이터(점수, 학습 시간, 취약 영역)가 연결된 학부모 또는 교사와 공유될 수 있습니다.</li><li><strong>법적 요구사항:</strong> 법률에 의해 요구되는 경우, 적법한 법적 절차에 대응하는 경우, 또는 Mathiter, 당사 이용자 또는 대중의 권리, 안전 또는 재산을 보호하기 위한 경우.</li><li><strong>사업 양도:</strong> 합병, 인수 또는 자산 매각과 관련하여 귀하의 정보가 거래의 일부로 이전될 수 있습니다.</li></ul>`,
      },
      {
        heading: "4. 아동의 개인정보",
        body: `<p>Mathiter는 18세 미만을 포함한 학생을 위해 설계되었습니다. 당사는 아동의 개인정보를 매우 중요하게 생각합니다.</p><ul><li>당사는 확인 가능한 부모 동의 없이 만 13세 미만의 아동으로부터 개인정보를 고의적으로 수집하지 않습니다.</li><li>부모 동의 없이 만 13세 미만 아동의 개인정보를 수집한 사실을 알게 된 경우, 해당 정보를 즉시 삭제합니다.</li><li>부모는 언제든지 자녀의 데이터 수집을 검토, 삭제 또는 제한하기 위해 당사에 연락할 수 있습니다.</li></ul><p>아동이 부모 동의 없이 당사에 개인정보를 제공했다고 생각되시면 <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>으로 연락해 주시기 바랍니다.</p>`,
      },
      {
        heading: "5. 데이터 보안",
        body: `<p>당사는 귀하의 정보를 무단 접근, 분실, 오용, 변경 및 파괴로부터 보호하기 위해 합리적인 기술적, 조직적 조치를 시행하고 있습니다. 이러한 조치에는 전송 중 데이터 암호화, 안전한 서버 인프라 및 접근 통제가 포함됩니다.</p><p>그러나 어떠한 데이터 전송 또는 저장 방법도 100% 안전하지 않습니다. 당사는 귀하의 정보를 보호하기 위해 노력하지만, 절대적인 보안을 보장할 수는 없습니다.</p>`,
      },
      {
        heading: "6. 데이터 보관",
        body: `<p>당사는 귀하의 계정이 활성화되어 있는 동안 또는 서비스 제공에 필요한 기간 동안 귀하의 개인정보를 보관합니다. 분쟁 해결 및 계약 이행 등 정당한 사업 목적 또는 법률에 의해 요구되는 경우 특정 데이터를 보관할 수 있습니다.</p><p><a href="mailto:contact@mathiter.com">contact@mathiter.com</a>으로 연락하시면 언제든지 계정 및 관련 데이터의 삭제를 요청하실 수 있습니다.</p>`,
      },
      {
        heading: "7. 쿠키 및 추적 기술",
        body: `<p>당사는 다음과 같은 유형의 쿠키를 사용합니다:</p><ul><li><strong>필수 쿠키:</strong> 서비스가 올바르게 작동하는 데 필요합니다(예: 인증, 보안).</li><li><strong>분석 쿠키:</strong> 사용자가 서비스와 어떻게 상호작용하는지 파악하여 개선할 수 있도록 합니다.</li><li><strong>환경설정 쿠키:</strong> 귀하의 설정 및 언어 환경설정을 기억합니다.</li></ul><p>브라우저 설정을 통해 쿠키 환경설정을 관리할 수 있습니다. 특정 쿠키를 비활성화하면 서비스 기능에 영향을 미칠 수 있습니다.</p>`,
      },
      {
        heading: "8. 귀하의 권리",
        body: `<p>귀하의 소재지에 따라 개인정보에 관한 다음과 같은 권리를 가질 수 있습니다:</p><ul><li><strong>접근:</strong> 당사가 보유한 귀하의 개인정보 사본을 요청할 수 있습니다.</li><li><strong>정정:</strong> 부정확하거나 불완전한 데이터의 정정을 요청할 수 있습니다.</li><li><strong>삭제:</strong> 법적 의무에 따라 개인정보의 삭제를 요청할 수 있습니다.</li><li><strong>이동성:</strong> 기계 판독 가능한 형식으로 데이터를 요청할 수 있습니다.</li><li><strong>수신거부:</strong> 마케팅 이메일의 "구독 취소"를 클릭하거나 당사에 연락하여 언제든지 마케팅 커뮤니케이션을 거부할 수 있습니다.</li></ul><p>이러한 권리를 행사하시려면 <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>으로 연락해 주시기 바랍니다.</p>`,
      },
      {
        heading: "9. 국제 데이터 이전",
        body: `<p>귀하의 정보는 데이터 보호법이 다를 수 있는 국가를 포함하여 귀하의 거주국 이외의 국가로 이전되어 처리될 수 있습니다. 당사는 관련 법률에 따라 이러한 이전에 대해 적절한 보호 조치를 마련합니다.</p>`,
      },
      {
        heading: "10. 본 개인정보처리방침의 변경",
        body: `<p>당사는 수시로 본 개인정보처리방침을 업데이트할 수 있습니다. 중요한 변경 사항이 있을 경우 서비스에 업데이트된 방침을 게시하고 위의 "시행일"을 업데이트하여 알려드립니다. 변경 사항이 게시된 후 서비스를 계속 이용하시면 업데이트된 방침에 동의하는 것으로 간주됩니다.</p>`,
      },
      {
        heading: "11. 문의처",
        body: `<p>본 개인정보처리방침 또는 당사의 데이터 처리 관행에 대한 질문이나 우려 사항이 있으시면 아래로 연락해 주시기 바랍니다:</p><p><strong>주식회사 매쓰이터 (Mathiter Inc.)</strong><br/>이메일: <a href="mailto:contact@mathiter.com">contact@mathiter.com</a><br/>웹사이트: <a href="https://mathiter.com">https://mathiter.com</a></p>`,
      },
    ],
  },
  ms: {
    title: "Dasar Privasi",
    effectiveDate: "Tarikh Berkuat Kuasa: 23 Februari 2026",
    sections: [
      {
        heading: "",
        body: `<p>주식회사 매쓰이터 (Mathiter Inc.) ("Mathiter," "kami," atau "kita") komited untuk melindungi privasi anda. Dasar Privasi ini menerangkan cara kami mengumpul, menggunakan, mendedahkan, dan melindungi maklumat anda apabila anda menggunakan laman web Mathiter (<a href="https://mathiter.com">mathiter.com</a>), aplikasi mudah alih, dan perkhidmatan berkaitan (secara kolektif, "Perkhidmatan").</p><p>Dengan menggunakan Perkhidmatan, anda bersetuju dengan amalan yang diterangkan dalam Dasar Privasi ini.</p>`,
      },
      {
        heading: "1. Maklumat yang Kami Kumpul",
        body: `<h3>1.1 Maklumat yang Anda Berikan</h3><ul><li><strong>Maklumat Akaun:</strong> Nama, alamat e-mel, kata laluan, umur, dan gambar profil apabila anda membuat akaun.</li><li><strong>Maklumat Pembayaran:</strong> Butiran pengebilan dan kaedah pembayaran apabila anda melanggan pelan berbayar. Pemprosesan pembayaran dikendalikan oleh penyedia pihak ketiga; kami tidak menyimpan nombor kad kredit penuh.</li><li><strong>Data Pembelajaran:</strong> Jawapan anda kepada soalan latihan, keputusan ujian diagnostik, kemajuan pembelajaran, dan interaksi dengan ciri bimbingan AI.</li><li><strong>Komunikasi:</strong> Mesej yang anda hantar kepada pasukan sokongan kami, maklum balas, dan respons tinjauan.</li></ul><h3>1.2 Maklumat yang Dikumpul Secara Automatik</h3><ul><li><strong>Maklumat Peranti:</strong> Jenis peranti, sistem pengendalian, jenis pelayar, alamat IP, pengecam peranti, dan tetapan bahasa.</li><li><strong>Data Penggunaan:</strong> Halaman yang dilawati, ciri yang digunakan, masa yang dihabiskan di Perkhidmatan, laluan navigasi, dan corak klik.</li><li><strong>Kuki:</strong> Kami menggunakan kuki dan teknologi penjejakan yang serupa untuk mengumpul data ini. Lihat Seksyen 7 untuk butiran.</li></ul><h3>1.3 Maklumat daripada Pihak Ketiga</h3><p>Jika anda log masuk melalui perkhidmatan pihak ketiga (seperti Google atau Apple), kami mungkin menerima maklumat profil asas daripada perkhidmatan tersebut, seperti nama dan alamat e-mel anda.</p>`,
      },
      {
        heading: "2. Cara Kami Menggunakan Maklumat Anda",
        body: `<p>Kami menggunakan maklumat yang kami kumpul untuk:</p><ul><li>Menyediakan, mengendalikan, dan menyelenggara Perkhidmatan, termasuk pengalaman pembelajaran peribadi dan ciri berkuasa AI.</li><li>Memproses transaksi anda dan mengurus langganan anda.</li><li>Menganalisis corak pembelajaran untuk meningkatkan ujian adaptif, cadangan pembelajaran, dan kualiti kandungan kami.</li><li>Berkomunikasi dengan anda, termasuk menghantar kemas kini perkhidmatan, amaran keselamatan, dan respons sokongan.</li><li>Menjana analitik agregat yang dinyahkenal pasti untuk meningkatkan Perkhidmatan dan membangunkan ciri baharu.</li><li>Mengesan, mencegah, dan menangani penipuan, penyalahgunaan, dan isu keselamatan.</li><li>Mematuhi kewajipan undang-undang.</li></ul><p><strong>Penting:</strong> Kami tidak menggunakan data pembelajaran peribadi anda atau data interaksi AI untuk melatih model AI pihak ketiga.</p>`,
      },
      {
        heading: "3. Cara Kami Berkongsi Maklumat Anda",
        body: `<p>Kami tidak menjual maklumat peribadi anda kepada pihak ketiga. Kami mungkin berkongsi maklumat anda dalam keadaan berikut:</p><ul><li><strong>Penyedia Perkhidmatan:</strong> Dengan vendor pihak ketiga yang dipercayai yang membantu kami mengendalikan Perkhidmatan, seperti penyedia pengehosan, pemproses pembayaran, perkhidmatan penghantaran e-mel, dan alat analitik. Penyedia ini diwajibkan secara kontrak untuk melindungi data anda.</li><li><strong>Papan Pemuka Ibu Bapa/Guru:</strong> Jika akaun ibu bapa atau guru dipautkan kepada akaun pelajar, data kemajuan pembelajaran terhad (markah, masa belajar, bidang lemah) mungkin dikongsi dengan ibu bapa atau guru yang dipautkan.</li><li><strong>Keperluan Undang-undang:</strong> Apabila dikehendaki oleh undang-undang, sebagai respons kepada proses undang-undang yang sah, atau untuk melindungi hak, keselamatan, atau harta Mathiter, pengguna kami, atau orang awam.</li><li><strong>Pemindahan Perniagaan:</strong> Berkaitan dengan penggabungan, pengambilalihan, atau penjualan aset, maklumat anda mungkin dipindahkan sebagai sebahagian daripada transaksi.</li></ul>`,
      },
      {
        heading: "4. Privasi Kanak-kanak",
        body: `<p>Mathiter direka untuk pelajar, termasuk mereka yang berumur di bawah 18 tahun. Kami mengambil serius privasi kanak-kanak.</p><ul><li>Kami tidak mengumpul maklumat peribadi daripada kanak-kanak di bawah 13 tahun secara sedar tanpa persetujuan ibu bapa yang boleh disahkan.</li><li>Jika kami mendapati bahawa kami telah mengumpul maklumat peribadi daripada kanak-kanak di bawah 13 tahun tanpa persetujuan ibu bapa, kami akan segera memadamkan maklumat tersebut.</li><li>Ibu bapa boleh menghubungi kami pada bila-bila masa untuk menyemak, memadamkan, atau menyekat pengumpulan data anak mereka.</li></ul><p>Jika anda percaya bahawa seorang kanak-kanak telah memberikan kami maklumat peribadi tanpa persetujuan ibu bapa, sila hubungi kami di <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>.</p>`,
      },
      {
        heading: "5. Keselamatan Data",
        body: `<p>Kami melaksanakan langkah teknikal dan organisasi yang munasabah untuk melindungi maklumat anda daripada akses tanpa kebenaran, kehilangan, penyalahgunaan, pengubahan, dan kemusnahan. Langkah-langkah ini termasuk penyulitan data dalam transit, infrastruktur pelayan yang selamat, dan kawalan akses.</p><p>Walau bagaimanapun, tiada kaedah penghantaran atau penyimpanan data yang 100% selamat. Walaupun kami berusaha untuk melindungi maklumat anda, kami tidak dapat menjamin keselamatannya secara mutlak.</p>`,
      },
      {
        heading: "6. Penyimpanan Data",
        body: `<p>Kami menyimpan maklumat peribadi anda selagi akaun anda aktif atau seperti yang diperlukan untuk menyediakan Perkhidmatan. Kami juga mungkin menyimpan data tertentu seperti yang dikehendaki oleh undang-undang atau untuk tujuan perniagaan yang sah, seperti menyelesaikan pertikaian dan menguatkuasakan perjanjian kami.</p><p>Anda boleh meminta pemadaman akaun dan data berkaitan anda pada bila-bila masa dengan menghubungi kami di <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>.</p>`,
      },
      {
        heading: "7. Kuki dan Teknologi Penjejakan",
        body: `<p>Kami menggunakan jenis kuki berikut:</p><ul><li><strong>Kuki Penting:</strong> Diperlukan untuk Perkhidmatan berfungsi dengan betul (cth., pengesahan, keselamatan).</li><li><strong>Kuki Analitik:</strong> Membantu kami memahami cara pengguna berinteraksi dengan Perkhidmatan supaya kami boleh memperbaikinya.</li><li><strong>Kuki Pilihan:</strong> Mengingati tetapan dan pilihan bahasa anda.</li></ul><p>Anda boleh mengurus pilihan kuki melalui tetapan pelayar anda. Melumpuhkan kuki tertentu mungkin menjejaskan fungsi Perkhidmatan.</p>`,
      },
      {
        heading: "8. Hak Anda",
        body: `<p>Bergantung pada lokasi anda, anda mungkin mempunyai hak berikut mengenai maklumat peribadi anda:</p><ul><li><strong>Akses:</strong> Meminta salinan maklumat peribadi yang kami pegang tentang anda.</li><li><strong>Pembetulan:</strong> Meminta pembetulan data yang tidak tepat atau tidak lengkap.</li><li><strong>Pemadaman:</strong> Meminta pemadaman maklumat peribadi anda, tertakluk kepada kewajipan undang-undang.</li><li><strong>Mudah Alih:</strong> Meminta data anda dalam format yang boleh dibaca mesin.</li><li><strong>Pilihan Keluar:</strong> Memilih keluar daripada komunikasi pemasaran pada bila-bila masa dengan mengklik "nyahlanggan" dalam mana-mana e-mel pemasaran atau menghubungi kami.</li></ul><p>Untuk melaksanakan mana-mana hak ini, sila hubungi kami di <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>.</p>`,
      },
      {
        heading: "9. Pemindahan Data Antarabangsa",
        body: `<p>Maklumat anda mungkin dipindahkan ke dan diproses di negara selain negara kediaman anda, termasuk negara yang mungkin mempunyai undang-undang perlindungan data yang berbeza. Kami memastikan perlindungan yang sewajarnya disediakan untuk pemindahan tersebut mengikut undang-undang yang berkenaan.</p>`,
      },
      {
        heading: "10. Perubahan kepada Dasar Privasi Ini",
        body: `<p>Kami mungkin mengemas kini Dasar Privasi ini dari semasa ke semasa. Kami akan memberitahu anda tentang perubahan material dengan menyiarkan dasar yang dikemas kini pada Perkhidmatan dan mengemas kini "Tarikh Berkuat Kuasa" di atas. Penggunaan berterusan anda terhadap Perkhidmatan selepas perubahan disiarkan merupakan penerimaan anda terhadap dasar yang dikemas kini.</p>`,
      },
      {
        heading: "11. Hubungi Kami",
        body: `<p>Jika anda mempunyai soalan atau kebimbangan tentang Dasar Privasi ini atau amalan data kami, sila hubungi kami di:</p><p><strong>주식회사 매쓰이터 (Mathiter Inc.)</strong><br/>E-mel: <a href="mailto:contact@mathiter.com">contact@mathiter.com</a><br/>Laman Web: <a href="https://mathiter.com">https://mathiter.com</a></p>`,
      },
    ],
  },
  zh: {
    title: "隐私政策",
    effectiveDate: "生效日期：2026年2月23日",
    sections: [
      {
        heading: "",
        body: `<p>주식회사 매쓰이터（Mathiter Inc.）（"Mathiter"、"我们"）致力于保护您的隐私。本隐私政策说明了当您使用Mathiter网站（<a href="https://mathiter.com">mathiter.com</a>）、移动应用程序及相关服务（统称"服务"）时，我们如何收集、使用、披露和保护您的信息。</p><p>使用本服务即表示您同意本隐私政策中描述的做法。</p>`,
      },
      {
        heading: "1. 我们收集的信息",
        body: `<h3>1.1 您提供的信息</h3><ul><li><strong>账户信息：</strong>创建账户时的姓名、电子邮箱、密码、年龄和头像。</li><li><strong>支付信息：</strong>订阅付费计划时的账单详情和支付方式。支付处理由第三方服务商完成；我们不存储完整的信用卡号码。</li><li><strong>学习数据：</strong>您对练习题的回答、诊断测试结果、学习进度以及与AI辅导功能的互动。</li><li><strong>通讯记录：</strong>您发送给我们客服团队的消息、反馈和问卷回复。</li></ul><h3>1.2 自动收集的信息</h3><ul><li><strong>设备信息：</strong>设备类型、操作系统、浏览器类型、IP地址、设备标识符和语言设置。</li><li><strong>使用数据：</strong>访问的页面、使用的功能、在服务上花费的时间、浏览路径和点击模式。</li><li><strong>Cookie：</strong>我们使用Cookie和类似追踪技术收集这些数据。详见第7节。</li></ul><h3>1.3 来自第三方的信息</h3><p>如果您通过第三方服务（如Google或Apple）登录，我们可能从该服务接收基本个人资料信息，如您的姓名和电子邮箱。</p>`,
      },
      {
        heading: "2. 我们如何使用您的信息",
        body: `<p>我们使用收集的信息用于：</p><ul><li>提供、运营和维护服务，包括个性化学习体验和AI驱动功能。</li><li>处理您的交易和管理您的订阅。</li><li>分析学习模式以改善我们的自适应测试、学习建议和内容质量。</li><li>与您沟通，包括发送服务更新、安全提醒和客服回复。</li><li>生成汇总的去标识化分析数据以改善服务和开发新功能。</li><li>检测、预防和解决欺诈、滥用和安全问题。</li><li>遵守法律义务。</li></ul><p><strong>重要提示：</strong>我们不会使用您的个人学习数据或AI互动数据来训练第三方AI模型。</p>`,
      },
      {
        heading: "3. 我们如何共享您的信息",
        body: `<p>我们不会向第三方出售您的个人信息。我们可能在以下情况下共享您的信息：</p><ul><li><strong>服务提供商：</strong>与帮助我们运营服务的可信第三方供应商共享，如托管服务商、支付处理商、邮件投递服务和分析工具。这些供应商在合同上有义务保护您的数据。</li><li><strong>家长/教师仪表盘：</strong>如果家长或教师账户与学生账户关联，有限的学习进度数据（成绩、学习时间、薄弱领域）可能与关联的家长或教师共享。</li><li><strong>法律要求：</strong>在法律要求、响应有效的法律程序、或为保护Mathiter、我们的用户或公众的权利、安全或财产时。</li><li><strong>业务转让：</strong>在合并、收购或资产出售的情况下，您的信息可能作为交易的一部分被转让。</li></ul>`,
      },
      {
        heading: "4. 儿童隐私",
        body: `<p>Mathiter为学生设计，包括18岁以下的学生。我们非常重视儿童隐私。</p><ul><li>我们不会在没有可验证的家长同意的情况下故意收集13岁以下儿童的个人信息。</li><li>如果我们得知在没有家长同意的情况下收集了13岁以下儿童的个人信息，我们将立即删除该信息。</li><li>家长可以随时联系我们以查看、删除或限制其子女数据的收集。</li></ul><p>如果您认为某个儿童在没有家长同意的情况下向我们提供了个人信息，请通过<a href="mailto:contact@mathiter.com">contact@mathiter.com</a>联系我们。</p>`,
      },
      {
        heading: "5. 数据安全",
        body: `<p>我们实施合理的技术和组织措施来保护您的信息免受未经授权的访问、丢失、滥用、篡改和销毁。这些措施包括传输中的数据加密、安全的服务器基础设施和访问控制。</p><p>然而，没有任何数据传输或存储方法是100%安全的。虽然我们努力保护您的信息，但我们无法保证其绝对安全。</p>`,
      },
      {
        heading: "6. 数据保留",
        body: `<p>我们在您的账户处于活跃状态期间或根据提供服务的需要保留您的个人信息。我们也可能根据法律要求或出于合法商业目的（如解决争议和执行协议）保留某些数据。</p><p>您可以随时通过<a href="mailto:contact@mathiter.com">contact@mathiter.com</a>联系我们请求删除您的账户和相关数据。</p>`,
      },
      {
        heading: "7. Cookie和追踪技术",
        body: `<p>我们使用以下类型的Cookie：</p><ul><li><strong>必要Cookie：</strong>服务正常运行所需（如认证、安全）。</li><li><strong>分析Cookie：</strong>帮助我们了解用户如何与服务互动，以便改善服务。</li><li><strong>偏好Cookie：</strong>记住您的设置和语言偏好。</li></ul><p>您可以通过浏览器设置管理Cookie偏好。禁用某些Cookie可能会影响服务的功能。</p>`,
      },
      {
        heading: "8. 您的权利",
        body: `<p>根据您所在的位置，您可能对您的个人信息享有以下权利：</p><ul><li><strong>访问：</strong>请求获取我们持有的您的个人信息副本。</li><li><strong>更正：</strong>请求更正不准确或不完整的数据。</li><li><strong>删除：</strong>请求删除您的个人信息，但需遵守法律义务。</li><li><strong>可携带性：</strong>请求以机器可读格式获取您的数据。</li><li><strong>退出：</strong>随时通过点击任何营销邮件中的"退订"链接或联系我们来退出营销通讯。</li></ul><p>要行使上述任何权利，请通过<a href="mailto:contact@mathiter.com">contact@mathiter.com</a>联系我们。</p>`,
      },
      {
        heading: "9. 国际数据传输",
        body: `<p>您的信息可能被传输到您居住国以外的国家/地区并在那里处理，包括数据保护法律可能不同的国家/地区。我们确保根据适用法律为此类传输提供适当的保障措施。</p>`,
      },
      {
        heading: "10. 本隐私政策的变更",
        body: `<p>我们可能不时更新本隐私政策。我们将通过在服务上发布更新后的政策并更新上述"生效日期"来通知您重大变更。变更发布后您继续使用服务即表示您接受更新后的政策。</p>`,
      },
      {
        heading: "11. 联系我们",
        body: `<p>如果您对本隐私政策或我们的数据处理做法有任何疑问或顾虑，请通过以下方式联系我们：</p><p><strong>주식회사 매쓰이터（Mathiter Inc.）</strong><br/>邮箱：<a href="mailto:contact@mathiter.com">contact@mathiter.com</a><br/>网站：<a href="https://mathiter.com">https://mathiter.com</a></p>`,
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

          <div className="prose prose-sm max-w-none space-y-6 text-foreground/90 [&_a]:text-primary [&_a]:underline [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_p]:leading-relaxed">
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
