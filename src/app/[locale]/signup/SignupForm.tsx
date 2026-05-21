"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getClientAuth, isFirebaseClientConfigured } from "@/lib/firebase-client";

type Labels = {
  displayNameLabel: string;
  emailLabel: string;
  passwordLabel: string;
  passwordHint: string;
  submit: string;
  google: string;
  hasAccount: string;
  loginLink: string;
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
};

type Props = {
  locale: string;
  labels: Labels;
  nextUrl: string;
  loginHref: string;
  termsHref: string;
  privacyHref: string;
  refundHref: string;
};

export default function SignupForm({
  labels,
  nextUrl,
  loginHref,
  termsHref,
  privacyHref,
  refundHref,
}: Props) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configured = isFirebaseClientConfigured();

  function mapFirebaseError(code: string | undefined): string {
    if (!code) return labels.networkError;
    if (code === "auth/email-already-in-use") return labels.errEmailInUse;
    if (code === "auth/weak-password") return labels.errWeakPassword;
    if (code === "auth/invalid-email") return labels.errInvalidEmail;
    return labels.networkError;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setError(labels.agreementRequired);
      return;
    }
    if (!configured) {
      setError(labels.notConfigured);
      return;
    }
    const auth = getClientAuth();
    if (!auth) {
      setError(labels.notConfigured);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      if (displayName.trim()) {
        await updateProfile(cred.user, { displayName: displayName.trim() });
      }
      router.push(nextUrl);
    } catch (err) {
      const code = (err as { code?: string }).code;
      setError(mapFirebaseError(code));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSignup() {
    if (!agreed) {
      setError(labels.agreementRequired);
      return;
    }
    if (!configured) {
      setError(labels.notConfigured);
      return;
    }
    const auth = getClientAuth();
    if (!auth) {
      setError(labels.notConfigured);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push(nextUrl);
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        // no-op
      } else {
        setError(mapFirebaseError(code));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            {labels.displayNameLabel}
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            {labels.emailLabel}
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1.5">
            {labels.passwordLabel}
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <p className="mt-1 text-xs text-muted/80">{labels.passwordHint}</p>
        </div>

        <label className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
          />
          <span>
            {labels.termsLabel}
            <span className="block mt-1 space-x-3">
              <a href={termsHref} target="_blank" rel="noopener" className="text-primary hover:underline">
                {labels.termsLink} ↗
              </a>
              <a href={privacyHref} target="_blank" rel="noopener" className="text-primary hover:underline">
                {labels.privacyLink} ↗
              </a>
              <a href={refundHref} target="_blank" rel="noopener" className="text-primary hover:underline">
                {labels.refundLink} ↗
              </a>
            </span>
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary text-white font-semibold py-2.5 text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {submitting ? "..." : labels.submit}
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted/70">
        <div className="flex-1 h-px bg-gray-100" />
        <span>OR</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={submitting}
        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <GoogleIcon />
        {labels.google}
      </button>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <p className="text-xs text-muted text-center leading-relaxed">
        {labels.legalNote}
      </p>

      <p className="text-sm text-center pt-2 border-t border-gray-100">
        {labels.hasAccount}{" "}
        <a href={loginHref} className="text-primary hover:underline font-medium">
          {labels.loginLink}
        </a>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44a5.5 5.5 0 0 1-2.4 3.61v3h3.88c2.27-2.1 3.57-5.18 3.57-8.85z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.88-3c-1.08.73-2.47 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.27a12.02 12.02 0 0 0 0 10.76l4-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.23 0 12 0 7.7 0 3.99 2.47 1.27 6.62l4 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}
