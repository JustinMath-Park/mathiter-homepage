import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm text-muted mb-10">
            Effective Date: February 23, 2026
          </p>

          <div className="prose prose-sm max-w-none space-y-8 text-foreground/90">
            <p>
              Welcome to Mathiter. These Terms of Service (&quot;Terms&quot;)
              govern your access to and use of the Mathiter website (
              <a href="https://mathiter.com">mathiter.com</a>), mobile
              applications, and all related products and services
              (collectively, the &quot;Service&quot;) provided by 주식회사
              매쓰이터 (Mathiter Inc.) (&quot;Mathiter,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;).
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these
              Terms. If you do not agree, do not use the Service.
            </p>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">1. Access and Eligibility</h2>
              <p>
                The Service is available to individuals who are at least 13
                years of age. Users under 18 must have consent from a parent or
                legal guardian. Parents or guardians who register on behalf of a
                minor accept these Terms on the minor&apos;s behalf and are
                responsible for the minor&apos;s use of the Service.
              </p>
              <p>
                We reserve the right to modify, suspend, or discontinue any
                part of the Service at any time, with or without notice. We may
                also verify your age, identity, or parental consent and suspend
                accounts that fail verification.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">2. Accounts and Registration</h2>
              <p>
                To access certain features, you may be required to create an
                account. You agree to provide accurate, current, and complete
                information during registration and to keep your account
                information updated.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your
                password and for all activities that occur under your account.
                You must notify us immediately of any unauthorized use of your
                account. Mathiter is not liable for any loss arising from your
                failure to secure your credentials.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">3. Fees and Payment</h2>
              <h3 className="text-base font-semibold mt-4 mb-2">3.1 Billing</h3>
              <p>
                The basic Service is available free of charge. Premium features
                require a paid subscription. All fees are exclusive of
                applicable taxes, which are your responsibility. You must
                maintain current and valid billing information.
              </p>
              <h3 className="text-base font-semibold mt-4 mb-2">3.2 Automatic Renewal</h3>
              <p>
                Paid subscriptions automatically renew at the end of each
                billing period unless you cancel before the renewal date. You
                may cancel at any time through your account settings. Upon
                cancellation, you will retain access to premium features through
                the end of your current billing period.
              </p>
              <h3 className="text-base font-semibold mt-4 mb-2">3.3 Refunds</h3>
              <p>
                All payments are final and non-refundable, except as required by
                applicable law. We may, at our sole discretion, issue refunds on
                a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">4. Intellectual Property</h2>
              <p>
                All content on the Service — including text, graphics, logos,
                images, audio, video, software, math problems, explanations, and
                curriculum materials — is owned by Mathiter or its licensors and
                is protected by copyright, trademark, and other intellectual
                property laws.
              </p>
              <p>
                You may not copy, modify, distribute, sell, license, or create
                derivative works from any content on the Service without our
                express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">5. User Content</h2>
              <p>
                You may submit content to the Service, including responses to
                practice problems, feedback, and other materials (&quot;User
                Content&quot;). You retain ownership of your User Content but
                grant Mathiter a worldwide, non-exclusive, royalty-free license
                to use, display, modify, and distribute your User Content in
                connection with operating and improving the Service.
              </p>
              <p>
                You represent that you have all necessary rights to submit your
                User Content and that it does not violate any third-party
                rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">6. AI Features</h2>
              <p>
                The Service includes AI-powered features such as adaptive
                testing, personalized coaching, and automated explanations
                (&quot;AI Features&quot;). You acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  AI-generated content is provided for educational purposes only
                  and may contain inaccuracies or errors.
                </li>
                <li>
                  AI outputs are not a substitute for professional academic
                  advice or tutoring from a licensed educator.
                </li>
                <li>
                  We may use de-identified or aggregated data from your
                  interactions with AI Features to improve the Service.
                </li>
                <li>
                  We do not use your personal AI interaction data to train
                  third-party AI models.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">7. Prohibited Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Use automated tools, bots, scrapers, or data mining techniques
                  to access or collect data from the Service.
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the
                  Service, other users&apos; accounts, or our systems.
                </li>
                <li>
                  Reverse engineer, decompile, or disassemble any software used
                  in the Service.
                </li>
                <li>
                  Use the Service for any unlawful purpose or in violation of
                  any applicable law.
                </li>
                <li>
                  Submit false, misleading, defamatory, or offensive content.
                </li>
                <li>
                  Interfere with the proper functioning of the Service or
                  impose an unreasonable load on our infrastructure.
                </li>
                <li>
                  Use content from the Service to train AI or machine learning
                  models without written authorization.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">8. Third-Party Links</h2>
              <p>
                The Service may contain links to third-party websites or
                services. Mathiter is not responsible for the content, accuracy,
                or practices of any third-party sites. Your use of third-party
                services is at your own risk and subject to their terms and
                policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">9. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
                AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE
                UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT ANY DEFECTS WILL
                BE CORRECTED.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">10. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, MATHITER SHALL NOT BE
                LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE. OUR
                TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU HAVE PAID TO
                MATHITER IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR
                USD $100, WHICHEVER IS GREATER.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">11. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Mathiter, its
                officers, directors, employees, and agents from any claims,
                damages, losses, or expenses (including reasonable
                attorney&apos;s fees) arising from your use of the Service,
                your violation of these Terms, or your violation of any
                third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">12. Termination</h2>
              <p>
                We may suspend or terminate your access to the Service at any
                time, with or without cause or notice. Upon termination, your
                right to use the Service ceases immediately. Sections related to
                intellectual property, disclaimers, limitation of liability,
                and indemnification shall survive termination.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">13. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the Republic of Korea, without regard to
                conflict of law principles. Any disputes arising from these
                Terms shall be subject to the exclusive jurisdiction of the
                courts of the Republic of Korea.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">14. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify you
                of material changes by posting the updated Terms on the Service
                and updating the &quot;Effective Date&quot; above. Your
                continued use of the Service after changes are posted
                constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">15. Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us at:
              </p>
              <p className="mt-2">
                <strong>주식회사 매쓰이터 (Mathiter Inc.)</strong>
                <br />
                Email:{" "}
                <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>
                <br />
                Website:{" "}
                <a href="https://mathiter.com">https://mathiter.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
