import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignupForm from "./SignupForm";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
};

const content: Record<
  string,
  {
    title: string;
    subtitle: string;
    displayNameLabel: string;
    emailLabel: string;
    passwordLabel: string;
    passwordHint: string;
    submit: string;
    google: string;
    hasAccount: string;
    loginLink: string;
    backToHome: string;
    legalNote: string;
    agreementRequired: string;
    termsLabel: string;
    termsLink: string;
    privacyLink: string;
    refundLink: string;
    errEmailInUse: string;
    errWeakPassword: string;
    errInvalidEmail: string;
    networkError: string;
    notConfigured: string;
  }
> = {
  ko: {
    title: "회원가입",
    subtitle: "Mathiter Premium 결제를 위해 계정을 만들어 주세요.",
    displayNameLabel: "이름",
    emailLabel: "이메일",
    passwordLabel: "비밀번호",
    passwordHint: "최소 8자 이상, 영문·숫자 조합 권장",
    submit: "회원가입하고 결제하기",
    google: "Google 계정으로 가입",
    hasAccount: "이미 계정이 있으신가요?",
    loginLink: "로그인 →",
    backToHome: "← 홈으로",
    legalNote:
      "회원가입 시 아래 약관에 동의한 것으로 간주됩니다.",
    agreementRequired: "약관 동의는 필수입니다.",
    termsLabel: "(필수) 이용약관, 개인정보처리방침, 환불정책에 동의합니다.",
    termsLink: "이용약관",
    privacyLink: "개인정보처리방침",
    refundLink: "환불정책",
    errEmailInUse:
      "이미 가입된 이메일입니다. 로그인 페이지로 이동해주세요.",
    errWeakPassword: "비밀번호는 최소 6자 이상이어야 합니다.",
    errInvalidEmail: "올바른 이메일 형식이 아닙니다.",
    networkError: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    notConfigured:
      "인증 서비스가 설정되지 않았습니다. 운영자에게 문의해주세요.",
  },
  en: {
    title: "Sign up",
    subtitle: "Create an account to purchase Mathiter Premium.",
    displayNameLabel: "Name",
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordHint: "At least 8 characters, mix letters & numbers recommended",
    submit: "Sign up & continue to payment",
    google: "Sign up with Google",
    hasAccount: "Already have an account?",
    loginLink: "Log in →",
    backToHome: "← Back to home",
    legalNote: "By signing up, you agree to the following:",
    agreementRequired: "You must agree to the terms.",
    termsLabel:
      "(Required) I agree to the Terms of Service, Privacy Policy, and Refund Policy.",
    termsLink: "Terms",
    privacyLink: "Privacy Policy",
    refundLink: "Refund Policy",
    errEmailInUse:
      "This email is already registered. Please log in instead.",
    errWeakPassword: "Password must be at least 6 characters.",
    errInvalidEmail: "Invalid email format.",
    networkError: "A network error occurred. Please try again later.",
    notConfigured:
      "Authentication is not configured. Please contact the administrator.",
  },
  ms: {
    title: "Daftar",
    subtitle: "Buat akaun untuk membeli Mathiter Premium.",
    displayNameLabel: "Nama",
    emailLabel: "E-mel",
    passwordLabel: "Kata laluan",
    passwordHint: "Sekurang-kurangnya 8 aksara, gabungan huruf & nombor disyorkan",
    submit: "Daftar & teruskan pembayaran",
    google: "Daftar dengan Google",
    hasAccount: "Sudah ada akaun?",
    loginLink: "Log masuk →",
    backToHome: "← Kembali ke laman utama",
    legalNote: "Dengan mendaftar, anda bersetuju dengan yang berikut:",
    agreementRequired: "Anda mesti bersetuju dengan terma.",
    termsLabel:
      "(Wajib) Saya bersetuju dengan Terma Perkhidmatan, Dasar Privasi, dan Dasar Bayaran Balik.",
    termsLink: "Terma",
    privacyLink: "Dasar Privasi",
    refundLink: "Dasar Bayaran Balik",
    errEmailInUse:
      "E-mel ini sudah didaftarkan. Sila log masuk.",
    errWeakPassword: "Kata laluan mesti sekurang-kurangnya 6 aksara.",
    errInvalidEmail: "Format e-mel tidak sah.",
    networkError: "Ralat rangkaian. Sila cuba lagi sebentar lagi.",
    notConfigured: "Perkhidmatan pengesahan belum dikonfigurasikan.",
  },
  zh: {
    title: "注册",
    subtitle: "创建账号以购买 Mathiter Premium。",
    displayNameLabel: "姓名",
    emailLabel: "电子邮箱",
    passwordLabel: "密码",
    passwordHint: "至少 8 个字符,建议字母与数字组合",
    submit: "注册并继续付款",
    google: "使用 Google 注册",
    hasAccount: "已有账号?",
    loginLink: "登录 →",
    backToHome: "← 回到首页",
    legalNote: "注册即表示您同意以下条款:",
    agreementRequired: "您必须同意条款。",
    termsLabel:
      "(必填) 我同意服务条款、隐私政策和退款政策。",
    termsLink: "服务条款",
    privacyLink: "隐私政策",
    refundLink: "退款政策",
    errEmailInUse: "该邮箱已被注册。请直接登录。",
    errWeakPassword: "密码至少需要 6 个字符。",
    errInvalidEmail: "邮箱格式无效。",
    networkError: "网络错误,请稍后再试。",
    notConfigured: "认证服务尚未配置。请联系管理员。",
  },
};

export default async function SignupPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const c = content[locale] || content.en;
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const nextUrl = sp.next || `${localePrefix}/pricing`;

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-gradient-to-b from-blue-50/40 to-white">
        <div className="mx-auto max-w-md px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{c.title}</h1>
            <p className="mt-2 text-sm text-muted">{c.subtitle}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8">
            <SignupForm
              locale={locale}
              labels={c}
              nextUrl={nextUrl}
              loginHref={`${localePrefix}/login?next=${encodeURIComponent(nextUrl)}`}
              termsHref={`${localePrefix}/terms`}
              privacyHref={`${localePrefix}/privacy`}
              refundHref={`${localePrefix}/refund`}
            />
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            <a href={`${localePrefix}/`} className="hover:underline">
              {c.backToHome}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
