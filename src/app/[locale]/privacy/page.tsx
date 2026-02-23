import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted mb-10">
            Effective Date: February 23, 2026
          </p>

          <div className="prose prose-sm max-w-none space-y-8 text-foreground/90">
            <p>
              Mathiter Sdn. Bhd. (&quot;Mathiter,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use the Mathiter
              website (<a href="https://mathiter.com">mathiter.com</a>), mobile
              applications, and related services (collectively, the
              &quot;Service&quot;).
            </p>
            <p>
              By using the Service, you consent to the practices described in
              this Privacy Policy.
            </p>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                1. Information We Collect
              </h2>

              <h3 className="text-base font-semibold mt-4 mb-2">
                1.1 Information You Provide
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  password, age, and profile picture when you create an account.
                </li>
                <li>
                  <strong>Payment Information:</strong> Billing details and
                  payment method when you subscribe to a paid plan. Payment
                  processing is handled by third-party providers; we do not
                  store full credit card numbers.
                </li>
                <li>
                  <strong>Learning Data:</strong> Your responses to practice
                  problems, diagnostic test results, study progress, and
                  interactions with AI coaching features.
                </li>
                <li>
                  <strong>Communications:</strong> Messages you send to our
                  support team, feedback, and survey responses.
                </li>
              </ul>

              <h3 className="text-base font-semibold mt-4 mb-2">
                1.2 Information Collected Automatically
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Device Information:</strong> Device type, operating
                  system, browser type, IP address, device identifiers, and
                  language settings.
                </li>
                <li>
                  <strong>Usage Data:</strong> Pages visited, features used,
                  time spent on the Service, navigation paths, and click
                  patterns.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies and similar tracking
                  technologies to collect this data. See Section 7 for details.
                </li>
              </ul>

              <h3 className="text-base font-semibold mt-4 mb-2">
                1.3 Information from Third Parties
              </h3>
              <p>
                If you sign in through a third-party service (such as Google or
                Apple), we may receive basic profile information from that
                service, such as your name and email address.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Provide, operate, and maintain the Service, including
                  personalized learning experiences and AI-powered features.
                </li>
                <li>
                  Process your transactions and manage your subscription.
                </li>
                <li>
                  Analyze learning patterns to improve our adaptive testing,
                  study recommendations, and content quality.
                </li>
                <li>
                  Communicate with you, including sending service updates,
                  security alerts, and support responses.
                </li>
                <li>
                  Generate aggregated, de-identified analytics to improve the
                  Service and develop new features.
                </li>
                <li>
                  Detect, prevent, and address fraud, abuse, and security
                  issues.
                </li>
                <li>Comply with legal obligations.</li>
              </ul>
              <p className="mt-3">
                <strong>Important:</strong> We do not use your personal learning
                data or AI interaction data to train third-party AI models.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                3. How We Share Your Information
              </h2>
              <p>
                We do not sell your personal information to third parties. We
                may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Service Providers:</strong> With trusted third-party
                  vendors who help us operate the Service, such as hosting
                  providers, payment processors, email delivery services, and
                  analytics tools. These providers are contractually obligated
                  to protect your data.
                </li>
                <li>
                  <strong>Parent/Teacher Dashboard:</strong> If a parent or
                  teacher account is linked to a student account, limited
                  learning progress data (scores, study time, weak areas) may be
                  shared with the linked parent or teacher.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, in
                  response to valid legal process, or to protect the rights,
                  safety, or property of Mathiter, our users, or the public.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of assets, your information may
                  be transferred as part of the transaction.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                4. Children&apos;s Privacy
              </h2>
              <p>
                Mathiter is designed for students, including those under 18. We
                take children&apos;s privacy seriously.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  We do not knowingly collect personal information from children
                  under 13 without verifiable parental consent.
                </li>
                <li>
                  If we learn that we have collected personal information from a
                  child under 13 without parental consent, we will promptly
                  delete that information.
                </li>
                <li>
                  Parents may contact us at any time to review, delete, or
                  restrict the collection of their child&apos;s data.
                </li>
              </ul>
              <p>
                If you believe a child has provided us with personal information
                without parental consent, please contact us at{" "}
                <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                5. Data Security
              </h2>
              <p>
                We implement reasonable technical and organizational measures to
                protect your information against unauthorized access, loss,
                misuse, alteration, and destruction. These measures include
                encryption of data in transit, secure server infrastructure, and
                access controls.
              </p>
              <p>
                However, no method of data transmission or storage is 100%
                secure. While we strive to protect your information, we cannot
                guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                6. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as your account
                is active or as needed to provide the Service. We may also
                retain certain data as required by law or for legitimate
                business purposes, such as resolving disputes and enforcing our
                agreements.
              </p>
              <p>
                You may request deletion of your account and associated data at
                any time by contacting us at{" "}
                <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                7. Cookies and Tracking Technologies
              </h2>
              <p>We use the following types of cookies:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Essential Cookies:</strong> Required for the Service
                  to function properly (e.g., authentication, security).
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  users interact with the Service so we can improve it.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings
                  and language preferences.
                </li>
              </ul>
              <p>
                You can manage cookie preferences through your browser settings.
                Disabling certain cookies may affect the functionality of the
                Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                8. Your Rights
              </h2>
              <p>
                Depending on your location, you may have the following rights
                regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Access:</strong> Request a copy of the personal
                  information we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  or incomplete data.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information, subject to legal obligations.
                </li>
                <li>
                  <strong>Portability:</strong> Request your data in a
                  machine-readable format.
                </li>
                <li>
                  <strong>Opt-Out:</strong> Opt out of marketing communications
                  at any time by clicking &quot;unsubscribe&quot; in any
                  marketing email or contacting us.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:contact@mathiter.com">contact@mathiter.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                9. International Data Transfers
              </h2>
              <p>
                Your information may be transferred to and processed in
                countries other than your country of residence, including
                countries that may have different data protection laws. We
                ensure appropriate safeguards are in place for such transfers in
                accordance with applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                10. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of material changes by posting the updated policy on
                the Service and updating the &quot;Effective Date&quot; above.
                Your continued use of the Service after changes are posted
                constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-10 mb-3">
                11. Contact Us
              </h2>
              <p>
                If you have questions or concerns about this Privacy Policy or
                our data practices, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Mathiter Sdn. Bhd.</strong>
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
