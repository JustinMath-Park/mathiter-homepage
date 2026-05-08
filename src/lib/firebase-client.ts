"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
  type Auth,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Client-side Firebase init for the /admin pages.
 *
 * Config values come from NEXT_PUBLIC_FIREBASE_* environment variables
 * (these are public — they're shipped to the browser, but Firestore Security
 * Rules + the email allowlist below are what actually protect writes).
 *
 * Set these in Vercel Environment Variables (Production + Preview):
 *   NEXT_PUBLIC_FIREBASE_API_KEY
 *   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN     (e.g. mathiter-prod.firebaseapp.com)
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID      (mathiter-prod)
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 *   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *   NEXT_PUBLIC_FIREBASE_APP_ID
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

function getApp(): FirebaseApp | null {
  if (!firebaseConfig.apiKey) return null;
  if (app) return app;
  if (getApps().length > 0) {
    app = getApps()[0];
    return app;
  }
  app = initializeApp(firebaseConfig);
  return app;
}

export function getClientAuth(): Auth | null {
  if (authInstance) return authInstance;
  const a = getApp();
  if (!a) return null;
  authInstance = getAuth(a);
  return authInstance;
}

export function getClientDb(): Firestore | null {
  if (dbInstance) return dbInstance;
  const a = getApp();
  if (!a) return null;
  dbInstance = getFirestore(a);
  return dbInstance;
}

export function isFirebaseClientConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey);
}

/**
 * Email allowlist — only these emails can write to Firestore via the admin UI.
 * Add Justin's Google account email here.
 *
 * Even with this allowlist, you MUST also set Firestore Security Rules
 * in the Firebase Console to enforce the same rule server-side. See the
 * snippet in /admin/blog/page.tsx top-of-file comment.
 */
export const ADMIN_EMAILS: string[] = [
  "sspark222@gmail.com", // Justin's Google account (add more if needed)
];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
};
export type { User };
