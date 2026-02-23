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
    title: "Terms of Service",
    effectiveDate: "Effective Date: February 23, 2026",
    sections: [
      {
        heading: "",
        body: `<p>Welcome to Mathiter. These Terms of Service ("Terms") govern your access to and use of the Mathiter website (<a href="https://mathiter.com">mathiter.com</a>), mobile applications, and all related products and services (collectively, the "Service") provided by 주식회사 매쓰이터 (Mathiter Inc.) ("Mathiter," "we," "us," or "our").</p><p>By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>`,
      },
      {
        heading: "1. Access and Eligibility",
        body: `<p>The Service is available to individuals who are at least 13 years of age. Users under 18 must have consent from a parent or legal guardian. Parents or guardians who register on behalf of a minor accept these Terms on the minor's behalf and are responsible for the minor's use of the Service.</p><p>We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice. We may also verify your age, identity, or parental consent and suspend accounts that fail verification.</p>`,
      },
      {
        heading: "2. Accounts and Registration",
        body: `<p>To access certain features, you may be required to create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated.</p><p>You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. Mathiter is not liable for any loss arising from your failure to secure your credentials.</p>`,
      },
      {
        heading: "3. Fees and Payment",
        body: `<h3>3.1 Billing</h3><p>The basic Service is available free of charge. Premium features require a paid subscription. All fees are exclusive of applicable taxes, which are your responsibility. You must maintain current and valid billing information.</p><h3>3.2 Automatic Renewal</h3><p>Paid subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date. You may cancel at any time through your account settings. Upon cancellation, you will retain access to premium features through the end of your current billing period.</p><h3>3.3 Refunds</h3><p>All payments are final and non-refundable, except as required by applicable law. We may, at our sole discretion, issue refunds on a case-by-case basis.</p>`,
      },
      {
        heading: "4. Intellectual Property",
        body: `<p>All content on the Service — including text, graphics, logos, images, audio, video, software, math problems, explanations, and curriculum materials — is owned by Mathiter or its licensors and is protected by copyright, trademark, and other intellectual property laws.</p><p>You may not copy, modify, distribute, sell, license, or create derivative works from any content on the Service without our express written permission.</p>`,
      },
      {
        heading: "5. User Content",
        body: `<p>You may submit content to the Service, including responses to practice problems, feedback, and other materials ("User Content"). You retain ownership of your User Content but grant Mathiter a worldwide, non-exclusive, royalty-free license to use, display, modify, and distribute your User Content in connection with operating and improving the Service.</p><p>You represent that you have all necessary rights to submit your User Content and that it does not violate any third-party rights.</p>`,
      },
      {
        heading: "6. AI Features",
        body: `<p>The Service includes AI-powered features such as adaptive testing, personalized coaching, and automated explanations ("AI Features"). You acknowledge that:</p><ul><li>AI-generated content is provided for educational purposes only and may contain inaccuracies or errors.</li><li>AI outputs are not a substitute for professional academic advice or tutoring from a licensed educator.</li><li>We may use de-identified or aggregated data from your interactions with AI Features to improve the Service.</li><li>We do not use your personal AI interaction data to train third-party AI models.</li></ul>`,
      },
      {
        heading: "7. Prohibited Conduct",
        body: `<p>You agree not to:</p><ul><li>Use automated tools, bots, scrapers, or data mining techniques to access or collect data from the Service.</li><li>Attempt to gain unauthorized access to any part of the Service, other users' accounts, or our systems.</li><li>Reverse engineer, decompile, or disassemble any software used in the Service.</li><li>Use the Service for any unlawful purpose or in violation of any applicable law.</li><li>Submit false, misleading, defamatory, or offensive content.</li><li>Interfere with the proper functioning of the Service or impose an unreasonable load on our infrastructure.</li><li>Use content from the Service to train AI or machine learning models without written authorization.</li></ul>`,
      },
      {
        heading: "8. Third-Party Links",
        body: `<p>The Service may contain links to third-party websites or services. Mathiter is not responsible for the content, accuracy, or practices of any third-party sites. Your use of third-party services is at your own risk and subject to their terms and policies.</p>`,
      },
      {
        heading: "9. Disclaimer of Warranties",
        body: `<p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT ANY DEFECTS WILL BE CORRECTED.</p>`,
      },
      {
        heading: "10. Limitation of Liability",
        body: `<p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, MATHITER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU HAVE PAID TO MATHITER IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR USD $100, WHICHEVER IS GREATER.</p>`,
      },
      {
        heading: "11. Indemnification",
        body: `<p>You agree to indemnify and hold harmless Mathiter, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney's fees) arising from your use of the Service, your violation of these Terms, or your violation of any third-party rights.</p>`,
      },
      {
        heading: "12. Termination",
        body: `<p>We may suspend or terminate your access to the Service at any time, with or without cause or notice. Upon termination, your right to use the Service ceases immediately. Sections related to intellectual property, disclaimers, limitation of liability, and indemnification shall survive termination.</p>`,
      },
      {
        heading: "13. Governing Law",
        body: `<p>These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea, without regard to conflict of law principles. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of the Republic of Korea.</p>`,
      },
      {
        heading: "14. Changes to These Terms",
        body: `<p>We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on the Service and updating the "Effective Date" above. Your continued use of the Service after changes are posted constitutes your acceptance of the updated Terms.</p>`,
      },
      {
        heading: "15. Contact Us",
        body: `<p>If you have questions about these Terms, please contact us at:</p><p><strong>주식회사 매쓰이터 (Mathiter Inc.)</strong><br/>Email: <a href="mailto:contact@mathiter.com">contact@mathiter.com</a><br/>Website: <a href="https://mathiter.com">https://mathiter.com</a></p>`,
      },
    ],
  },
  ko: {
    title: "서비스 이용약관",
    effectiveDate: "시행일: 2026년 2월 23일",
    sections: [
      {
        heading: "",
        body: `<p>Mathiter에 오신 것을 환영합니다. 본 서비스 이용약관("약관")은 주식회사 매쓰이터("Mathiter", "회사", "당사")가 제공하는 Mathiter 웹사이트(<a href="https://mathiter.com">mathiter.com</a>), 모바일 애플리케이션 및 모든 관련 제품과 서비스(이하 "서비스")에 대한 귀하의 접근과 이용을 규율합니다.</p><p>서비스를 이용함으로써 귀하는 본 약관에 동의하게 됩니다. 동의하지 않으시면 서비스를 이용하지 마시기 바랍니다.</p>`,
      },
      {
        heading: "1. 서비스 이용 자격",
        body: `<p>서비스는 만 13세 이상의 개인이 이용할 수 있습니다. 만 18세 미만의 사용자는 부모 또는 법정대리인의 동의가 필요합니다. 미성년자를 대신하여 등록하는 부모 또는 보호자는 해당 미성년자를 대리하여 본 약관에 동의하며, 미성년자의 서비스 이용에 대한 책임을 집니다.</p><p>당사는 사전 통지 여부와 관계없이 서비스의 전부 또는 일부를 수정, 중단 또는 종료할 권리를 보유합니다. 당사는 귀하의 연령, 신원 또는 보호자 동의를 확인할 수 있으며, 확인에 실패한 계정은 정지할 수 있습니다.</p>`,
      },
      {
        heading: "2. 계정 및 가입",
        body: `<p>특정 기능에 접근하려면 계정을 생성해야 할 수 있습니다. 귀하는 가입 시 정확하고 최신의 완전한 정보를 제공하고, 계정 정보를 최신 상태로 유지하는 데 동의합니다.</p><p>귀하는 비밀번호의 기밀성을 유지하고 계정에서 발생하는 모든 활동에 대해 책임을 집니다. 계정의 무단 사용을 인지한 경우 즉시 당사에 통보해야 합니다. Mathiter는 귀하의 보안 관리 실패로 인한 손실에 대해 책임지지 않습니다.</p>`,
      },
      {
        heading: "3. 요금 및 결제",
        body: `<h3>3.1 청구</h3><p>기본 서비스는 무료로 이용할 수 있습니다. 프리미엄 기능은 유료 구독이 필요합니다. 모든 요금에는 관련 세금이 포함되지 않으며, 세금은 귀하의 책임입니다. 유효한 결제 정보를 항상 유지해야 합니다.</p><h3>3.2 자동 갱신</h3><p>유료 구독은 갱신일 전에 해지하지 않는 한 각 청구 기간이 끝나면 자동으로 갱신됩니다. 계정 설정을 통해 언제든지 해지할 수 있습니다. 해지 후에도 현재 청구 기간이 끝날 때까지 프리미엄 기능에 접근할 수 있습니다.</p><h3>3.3 환불</h3><p>모든 결제는 최종적이며 환불되지 않습니다. 다만 관련 법률에 의해 요구되는 경우는 예외입니다. 당사는 자체 재량에 따라 개별적으로 환불을 진행할 수 있습니다.</p>`,
      },
      {
        heading: "4. 지적재산권",
        body: `<p>서비스의 모든 콘텐츠 — 텍스트, 그래픽, 로고, 이미지, 오디오, 비디오, 소프트웨어, 수학 문제, 해설 및 교육 자료를 포함하여 — 는 Mathiter 또는 그 라이선서가 소유하며, 저작권, 상표권 및 기타 지적재산권법에 의해 보호됩니다.</p><p>당사의 명시적인 서면 허가 없이 서비스의 콘텐츠를 복사, 수정, 배포, 판매, 라이선스 또는 2차적 저작물을 만들 수 없습니다.</p>`,
      },
      {
        heading: "5. 사용자 콘텐츠",
        body: `<p>귀하는 연습 문제에 대한 답변, 피드백 및 기타 자료("사용자 콘텐츠")를 서비스에 제출할 수 있습니다. 귀하는 사용자 콘텐츠에 대한 소유권을 유지하지만, 서비스의 운영 및 개선과 관련하여 사용자 콘텐츠를 사용, 표시, 수정 및 배포할 수 있는 전 세계적, 비독점적, 무상 라이선스를 Mathiter에 부여합니다.</p><p>귀하는 사용자 콘텐츠를 제출할 수 있는 모든 필요한 권리를 보유하고 있으며, 해당 콘텐츠가 제3자의 권리를 침해하지 않음을 보증합니다.</p>`,
      },
      {
        heading: "6. AI 기능",
        body: `<p>서비스에는 적응형 테스트, 개인화된 코칭, 자동 해설 등 AI 기반 기능("AI 기능")이 포함됩니다. 귀하는 다음 사항을 인정합니다:</p><ul><li>AI가 생성한 콘텐츠는 교육 목적으로만 제공되며, 부정확하거나 오류를 포함할 수 있습니다.</li><li>AI 결과물은 전문적인 학업 조언이나 공인 교육자의 지도를 대체하지 않습니다.</li><li>당사는 AI 기능과의 상호작용에서 비식별화되거나 집계된 데이터를 서비스 개선에 사용할 수 있습니다.</li><li>당사는 귀하의 개인 AI 상호작용 데이터를 제3자 AI 모델 훈련에 사용하지 않습니다.</li></ul>`,
      },
      {
        heading: "7. 금지 행위",
        body: `<p>귀하는 다음 행위를 하지 않는 데 동의합니다:</p><ul><li>자동화된 도구, 봇, 스크래퍼 또는 데이터 마이닝 기술을 사용하여 서비스의 데이터에 접근하거나 수집하는 행위.</li><li>서비스의 일부, 다른 사용자의 계정 또는 당사의 시스템에 무단으로 접근을 시도하는 행위.</li><li>서비스에 사용된 소프트웨어를 역설계, 디컴파일 또는 디어셈블하는 행위.</li><li>불법적인 목적이나 관련 법률을 위반하여 서비스를 이용하는 행위.</li><li>허위, 오해의 소지가 있는, 명예를 훼손하는 또는 불쾌한 콘텐츠를 제출하는 행위.</li><li>서비스의 정상적인 작동을 방해하거나 인프라에 과도한 부하를 가하는 행위.</li><li>서면 승인 없이 서비스의 콘텐츠를 AI 또는 머신러닝 모델 훈련에 사용하는 행위.</li></ul>`,
      },
      {
        heading: "8. 제3자 링크",
        body: `<p>서비스에는 제3자 웹사이트 또는 서비스에 대한 링크가 포함될 수 있습니다. Mathiter는 제3자 사이트의 콘텐츠, 정확성 또는 관행에 대해 책임지지 않습니다. 제3자 서비스의 이용은 귀하의 자기 책임이며, 해당 서비스의 약관 및 정책에 따릅니다.</p>`,
      },
      {
        heading: "9. 보증의 부인",
        body: `<p>서비스는 명시적이든 묵시적이든, 상품성, 특정 목적에의 적합성 및 비침해에 대한 보증을 포함하여 어떠한 종류의 보증도 없이 "있는 그대로" 및 "이용 가능한 상태로" 제공됩니다. 당사는 서비스가 중단 없이, 오류 없이 또는 안전하게 제공되거나 결함이 수정될 것을 보증하지 않습니다.</p>`,
      },
      {
        heading: "10. 책임의 제한",
        body: `<p>법률이 허용하는 최대 범위 내에서, Mathiter는 귀하의 서비스 이용으로 인한 간접적, 부수적, 특별, 결과적 또는 징벌적 손해에 대해 책임지지 않습니다. 당사의 총 책임은 청구 전 12개월 동안 귀하가 Mathiter에 지불한 금액 또는 100,000원 중 더 큰 금액을 초과하지 않습니다.</p>`,
      },
      {
        heading: "11. 면책",
        body: `<p>귀하는 서비스 이용, 본 약관 위반 또는 제3자 권리 침해로 인해 발생하는 모든 청구, 손해, 손실 또는 비용(합리적인 변호사 비용 포함)으로부터 Mathiter, 그 임원, 이사, 직원 및 대리인을 면책하고 해를 끼치지 않을 것에 동의합니다.</p>`,
      },
      {
        heading: "12. 서비스 해지",
        body: `<p>당사는 사유 또는 사전 통지 여부와 관계없이 언제든지 귀하의 서비스 접근을 중단하거나 해지할 수 있습니다. 해지 시 서비스 이용 권리는 즉시 소멸됩니다. 지적재산권, 보증 부인, 책임 제한 및 면책에 관한 조항은 해지 후에도 존속합니다.</p>`,
      },
      {
        heading: "13. 준거법",
        body: `<p>본 약관은 대한민국 법률에 따라 규율되고 해석됩니다. 본 약관으로 인해 발생하는 모든 분쟁은 대한민국 법원의 전속적 관할에 따릅니다.</p>`,
      },
      {
        heading: "14. 약관 변경",
        body: `<p>당사는 수시로 본 약관을 업데이트할 수 있습니다. 중요한 변경 사항이 있을 경우 서비스에 업데이트된 약관을 게시하고 위의 "시행일"을 업데이트하여 알려드립니다. 변경 사항이 게시된 후 서비스를 계속 이용하시면 업데이트된 약관에 동의하는 것으로 간주됩니다.</p>`,
      },
      {
        heading: "15. 문의처",
        body: `<p>본 약관에 대한 질문이 있으시면 아래로 연락해 주시기 바랍니다:</p><p><strong>주식회사 매쓰이터 (Mathiter Inc.)</strong><br/>이메일: <a href="mailto:contact@mathiter.com">contact@mathiter.com</a><br/>웹사이트: <a href="https://mathiter.com">https://mathiter.com</a></p>`,
      },
    ],
  },
  ms: {
    title: "Terma Perkhidmatan",
    effectiveDate: "Tarikh Berkuat Kuasa: 23 Februari 2026",
    sections: [
      {
        heading: "",
        body: `<p>Selamat datang ke Mathiter. Terma Perkhidmatan ("Terma") ini mengawal akses dan penggunaan anda terhadap laman web Mathiter (<a href="https://mathiter.com">mathiter.com</a>), aplikasi mudah alih, dan semua produk serta perkhidmatan berkaitan (secara kolektif, "Perkhidmatan") yang disediakan oleh 주식회사 매쓰이터 (Mathiter Inc.) ("Mathiter," "kami," atau "kita").</p><p>Dengan mengakses atau menggunakan Perkhidmatan, anda bersetuju untuk terikat dengan Terma ini. Jika anda tidak bersetuju, jangan gunakan Perkhidmatan.</p>`,
      },
      {
        heading: "1. Akses dan Kelayakan",
        body: `<p>Perkhidmatan ini tersedia untuk individu yang berumur sekurang-kurangnya 13 tahun. Pengguna di bawah 18 tahun mesti mendapat persetujuan daripada ibu bapa atau penjaga yang sah. Ibu bapa atau penjaga yang mendaftar bagi pihak kanak-kanak menerima Terma ini bagi pihak mereka dan bertanggungjawab terhadap penggunaan Perkhidmatan oleh kanak-kanak tersebut.</p><p>Kami berhak untuk mengubah suai, menggantung, atau menghentikan mana-mana bahagian Perkhidmatan pada bila-bila masa, dengan atau tanpa notis. Kami juga boleh mengesahkan umur, identiti, atau persetujuan ibu bapa anda dan menggantung akaun yang gagal pengesahan.</p>`,
      },
      {
        heading: "2. Akaun dan Pendaftaran",
        body: `<p>Untuk mengakses ciri-ciri tertentu, anda mungkin perlu membuat akaun. Anda bersetuju untuk memberikan maklumat yang tepat, terkini, dan lengkap semasa pendaftaran dan untuk mengemas kini maklumat akaun anda.</p><p>Anda bertanggungjawab untuk menjaga kerahsiaan kata laluan anda dan untuk semua aktiviti yang berlaku di bawah akaun anda. Anda mesti memberitahu kami dengan segera tentang sebarang penggunaan tanpa kebenaran akaun anda. Mathiter tidak bertanggungjawab terhadap sebarang kerugian yang timbul daripada kegagalan anda untuk menjaga kelayakan keselamatan anda.</p>`,
      },
      {
        heading: "3. Yuran dan Pembayaran",
        body: `<h3>3.1 Pengebilan</h3><p>Perkhidmatan asas tersedia secara percuma. Ciri premium memerlukan langganan berbayar. Semua yuran tidak termasuk cukai yang berkenaan, yang menjadi tanggungjawab anda. Anda mesti mengekalkan maklumat pengebilan yang sah dan terkini.</p><h3>3.2 Pembaharuan Automatik</h3><p>Langganan berbayar diperbaharui secara automatik pada akhir setiap tempoh pengebilan melainkan anda membatalkan sebelum tarikh pembaharuan. Anda boleh membatalkan pada bila-bila masa melalui tetapan akaun anda. Selepas pembatalan, anda akan mengekalkan akses kepada ciri premium sehingga akhir tempoh pengebilan semasa anda.</p><h3>3.3 Bayaran Balik</h3><p>Semua pembayaran adalah muktamad dan tidak boleh dibayar balik, kecuali seperti yang dikehendaki oleh undang-undang yang berkenaan. Kami boleh, atas budi bicara kami sendiri, mengeluarkan bayaran balik secara kes demi kes.</p>`,
      },
      {
        heading: "4. Harta Intelek",
        body: `<p>Semua kandungan dalam Perkhidmatan — termasuk teks, grafik, logo, imej, audio, video, perisian, soalan matematik, penjelasan, dan bahan kurikulum — adalah milik Mathiter atau pemberi lesennya dan dilindungi oleh undang-undang hak cipta, tanda dagangan, dan harta intelek lain.</p><p>Anda tidak boleh menyalin, mengubah suai, mengedar, menjual, melesenkan, atau mencipta karya terbitan daripada mana-mana kandungan dalam Perkhidmatan tanpa kebenaran bertulis kami yang jelas.</p>`,
      },
      {
        heading: "5. Kandungan Pengguna",
        body: `<p>Anda boleh menghantar kandungan ke Perkhidmatan, termasuk jawapan kepada soalan latihan, maklum balas, dan bahan lain ("Kandungan Pengguna"). Anda mengekalkan pemilikan Kandungan Pengguna anda tetapi memberikan Mathiter lesen seluruh dunia, bukan eksklusif, tanpa royalti untuk menggunakan, memaparkan, mengubah suai, dan mengedarkan Kandungan Pengguna anda berkaitan dengan pengendalian dan penambahbaikan Perkhidmatan.</p><p>Anda mewakili bahawa anda mempunyai semua hak yang diperlukan untuk menghantar Kandungan Pengguna anda dan ia tidak melanggar mana-mana hak pihak ketiga.</p>`,
      },
      {
        heading: "6. Ciri AI",
        body: `<p>Perkhidmatan termasuk ciri berkuasa AI seperti ujian adaptif, bimbingan peribadi, dan penjelasan automatik ("Ciri AI"). Anda mengakui bahawa:</p><ul><li>Kandungan yang dijana AI disediakan untuk tujuan pendidikan sahaja dan mungkin mengandungi ketidaktepatan atau ralat.</li><li>Output AI bukan pengganti nasihat akademik profesional atau bimbingan daripada pendidik berlesen.</li><li>Kami boleh menggunakan data yang dinyahkenal pasti atau diagregatkan daripada interaksi anda dengan Ciri AI untuk menambah baik Perkhidmatan.</li><li>Kami tidak menggunakan data interaksi AI peribadi anda untuk melatih model AI pihak ketiga.</li></ul>`,
      },
      {
        heading: "7. Kelakuan Dilarang",
        body: `<p>Anda bersetuju untuk tidak:</p><ul><li>Menggunakan alat automatik, bot, pengikis, atau teknik perlombongan data untuk mengakses atau mengumpul data daripada Perkhidmatan.</li><li>Cuba mendapatkan akses tanpa kebenaran ke mana-mana bahagian Perkhidmatan, akaun pengguna lain, atau sistem kami.</li><li>Kejuruteraan terbalik, menyahkompilasi, atau menyahhimpun mana-mana perisian yang digunakan dalam Perkhidmatan.</li><li>Menggunakan Perkhidmatan untuk tujuan yang menyalahi undang-undang atau melanggar mana-mana undang-undang yang berkenaan.</li><li>Menghantar kandungan palsu, mengelirukan, memfitnah, atau menyinggung perasaan.</li><li>Mengganggu fungsi Perkhidmatan yang betul atau mengenakan beban yang tidak munasabah ke atas infrastruktur kami.</li><li>Menggunakan kandungan daripada Perkhidmatan untuk melatih model AI atau pembelajaran mesin tanpa kebenaran bertulis.</li></ul>`,
      },
      {
        heading: "8. Pautan Pihak Ketiga",
        body: `<p>Perkhidmatan mungkin mengandungi pautan ke laman web atau perkhidmatan pihak ketiga. Mathiter tidak bertanggungjawab terhadap kandungan, ketepatan, atau amalan mana-mana laman pihak ketiga. Penggunaan perkhidmatan pihak ketiga anda adalah atas risiko anda sendiri dan tertakluk kepada terma dan dasar mereka.</p>`,
      },
      {
        heading: "9. Penafian Waranti",
        body: `<p>PERKHIDMATAN DISEDIAKAN "SEADANYA" DAN "SEPERTI YANG TERSEDIA" TANPA WARANTI DALAM APA JUA BENTUK, SAMA ADA NYATA ATAU TERSIRAT, TERMASUK TETAPI TIDAK TERHAD KEPADA WARANTI KEBOLEHDAGANGAN, KESESUAIAN UNTUK TUJUAN TERTENTU, DAN BUKAN PELANGGARAN. KAMI TIDAK MENJAMIN BAHAWA PERKHIDMATAN AKAN TIDAK TERGANGGU, BEBAS RALAT, ATAU SELAMAT, ATAU BAHAWA SEBARANG KECACATAN AKAN DIPERBETULKAN.</p>`,
      },
      {
        heading: "10. Had Liabiliti",
        body: `<p>SETAKAT MAKSIMUM YANG DIBENARKAN OLEH UNDANG-UNDANG, MATHITER TIDAK AKAN BERTANGGUNGJAWAB TERHADAP SEBARANG KEROSAKAN TIDAK LANGSUNG, SAMPINGAN, KHAS, BERBANGKIT, ATAU PUNITIF YANG TIMBUL DARIPADA PENGGUNAAN PERKHIDMATAN ANDA. JUMLAH LIABILITI KAMI TIDAK AKAN MELEBIHI JUMLAH YANG ANDA TELAH BAYAR KEPADA MATHITER DALAM TEMPOH DUA BELAS (12) BULAN SEBELUM TUNTUTAN, ATAU RM 500, YANG MANA LEBIH BESAR.</p>`,
      },
      {
        heading: "11. Ganti Rugi",
        body: `<p>Anda bersetuju untuk menanggung rugi dan tidak membahayakan Mathiter, pegawai, pengarah, pekerja, dan ejennya daripada sebarang tuntutan, kerosakan, kerugian, atau perbelanjaan (termasuk yuran peguam yang munasabah) yang timbul daripada penggunaan Perkhidmatan anda, pelanggaran Terma ini, atau pelanggaran mana-mana hak pihak ketiga.</p>`,
      },
      {
        heading: "12. Penamatan",
        body: `<p>Kami boleh menggantung atau menamatkan akses anda kepada Perkhidmatan pada bila-bila masa, dengan atau tanpa sebab atau notis. Selepas penamatan, hak anda untuk menggunakan Perkhidmatan terhenti serta-merta. Bahagian berkaitan harta intelek, penafian, had liabiliti, dan ganti rugi akan terus berkuat kuasa selepas penamatan.</p>`,
      },
      {
        heading: "13. Undang-undang yang Mentadbir",
        body: `<p>Terma ini akan ditadbir oleh dan ditafsirkan mengikut undang-undang Republik Korea, tanpa mengambil kira prinsip percanggahan undang-undang. Sebarang pertikaian yang timbul daripada Terma ini akan tertakluk kepada bidang kuasa eksklusif mahkamah Republik Korea.</p>`,
      },
      {
        heading: "14. Perubahan kepada Terma Ini",
        body: `<p>Kami boleh mengemas kini Terma ini dari semasa ke semasa. Kami akan memberitahu anda tentang perubahan material dengan menyiarkan Terma yang dikemas kini pada Perkhidmatan dan mengemas kini "Tarikh Berkuat Kuasa" di atas. Penggunaan berterusan anda terhadap Perkhidmatan selepas perubahan disiarkan merupakan penerimaan anda terhadap Terma yang dikemas kini.</p>`,
      },
      {
        heading: "15. Hubungi Kami",
        body: `<p>Jika anda mempunyai soalan tentang Terma ini, sila hubungi kami di:</p><p><strong>주식회사 매쓰이터 (Mathiter Inc.)</strong><br/>E-mel: <a href="mailto:contact@mathiter.com">contact@mathiter.com</a><br/>Laman Web: <a href="https://mathiter.com">https://mathiter.com</a></p>`,
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
