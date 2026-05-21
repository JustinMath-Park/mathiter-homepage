import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginForm from "./LoginForm";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
};

const content: Record<
  string,
  {
    title: string;
    subtitle: string;
    emailLabel: string;
    passwordLabel: string;
    submit: string;
    google: string;
    noAccount: string;
    signupLink: string;
    backToHome: string;
    legalNote: string;
    invalidCredential: string;
    tooManyRequests: string;
    networkError: string;
    notConfigured: string;
  }
> = {
  ko: {
    title: "로그인",
    subtitle: "Mathiter Premium 결제를 위해 로그인해주세요.",
    emailLabel: "이메일",
    passwordLabel: "비밀번호",
    submit: "로그인",
    google: "Google 계정으로 로그인",
    noAccount: "아직 계정이 없으신가요?",
    signupLink: "회원가입 →",
    backToHome: "← 홈으로",
    legalNote:
      "로그인 시 Mathiter 이용약관 및 개인정보처리방침에 동의한 것으로 간주됩니다.",
    invalidCredential: "이메일 또는 비밀번호가 올바르지 않습니다.",
    tooManyRequests:
      "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.",
    networkError: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    notConfigured:
      "인증 서비스가 설정되지 않았습니다. 운영자에게 문의해주세요.",
  },
  en: {
    title: "Log in",
    subtitle: "Please log in to purchase Mathiter Premium.",
    emailLabel: "Email",
    passwordLabel: "Password",
    submit: "Log in",
    google: "Continue with Google",
    noAccount: "Don't have an account yet?",
    signupLink: "Sign up →",
    backToHome: "← Back to home",
    legalNote:
      "By logging in, you agree to the Mathiter Terms of Service and Privacy Policy.",
    invalidCredential: "Email or password is incorrect.",
    tooManyRequests: "Too many attempts. Please try again later.",
    networkError: "A network error occurred. Please try again later.",
    notConfigured:
      "Authentication is not configured. Please contact the administrator.",
  },
  ms: {
    title: "Log masuk",
    subtitle: "Sila log masuk untuk membeli Mathiter Premium.",
    emailLabel: "E-mel",
    passwordLabel: "Kata laluan",
    submit: "Log masuk",
    google: "Teruskan dengan Google",
    noAccount: "Belum ada akaun?",
    signupLink: "Daftar →",
    backToHome: "← Kembali ke laman utama",
    legalNote:
      "Dengan log masuk, anda bersetuju dengan Terma Perkhidmatan dan Dasar Privasi Mathiter.",
    invalidCredential: "E-mel atau kata laluan tidak tepat.",
    tooManyRequests:
      "Terlalu banyak percubaan. Sila cuba lagi sebentar lagi.",
    networkError:
      "Ralat rangkaian. Sila cuba lagi sebentar lagi.",
    notConfigured: "Perkhidmatan pengesahan belum dikonfigurasikan.",
  },
  zh: {
    title: "登录",
    subtitle: "请登录以购买 Mathiter Premium。",
    emailLabel: "电子邮箱",
    passwordLabel: "密码",
    submit: "登录",
    google: "使用 Google 账号继续",
    noAccount: "还没有账号？",
    signupLink: "注册 →",
    backToHome: "← 回到首页",
    legalNote: "登录即表示您同意 Mathiter 服务条款和隐私政策。",
    invalidCredential: "邮箱或密码不正确。",
    tooManyRequests: "尝试次数过多,请稍后再试。",
    networkError: "网络错误,请稍后再试。",
    notConfigured: "认证服务尚未配置。请联系管理员。",
  },
};

export default async function LoginPage({ params, searchParams }: Props) {
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
            <LoginForm
              locale={locale}
              labels={c}
              nextUrl={nextUrl}
              signupHref={`${localePrefix}/signup?next=${encodeURIComponent(nextUrl)}`}
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
