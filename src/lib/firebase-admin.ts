import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let cachedDb: Firestore | null = null;
let cachedAuth: Auth | null = null;
let initialized = false;

function getServiceAccount() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyRaw) {
    return null;
  }

  return {
    projectId,
    clientEmail,
    privateKey: privateKeyRaw.replace(/\\n/g, "\n"),
  };
}

function initAdmin(): App | null {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const sa = getServiceAccount();
  if (!sa) {
    if (!initialized) {
      console.warn(
        "[firebase-admin] Service account env vars missing. " +
          "Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env.local. " +
          "Falling back to in-memory mock data."
      );
      initialized = true;
    }
    return null;
  }

  return initializeApp({
    credential: cert(sa),
    projectId: sa.projectId,
  });
}

export function getAdminDb(): Firestore | null {
  if (cachedDb) return cachedDb;
  const app = initAdmin();
  if (!app) return null;
  const db = getFirestore(app);
  // Allow optional form fields (school/examGoal/message) to be omitted
  // without failing the write. settings() can only be called once before any
  // read/write — if blog/sitemap already initialized Firestore in this
  // process, this throws; we swallow and rely on the existing settings.
  try {
    db.settings({ ignoreUndefinedProperties: true });
  } catch {
    // Already initialized elsewhere — that's fine, fields handled in caller.
  }
  cachedDb = db;
  return cachedDb;
}

export function getAdminAuth(): Auth | null {
  if (cachedAuth) return cachedAuth;
  const app = initAdmin();
  if (!app) return null;
  cachedAuth = getAuth(app);
  return cachedAuth;
}

export function isFirebaseConfigured(): boolean {
  return getServiceAccount() !== null;
}
