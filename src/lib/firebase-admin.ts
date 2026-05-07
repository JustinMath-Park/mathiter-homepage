import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let cachedDb: Firestore | null = null;
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
  cachedDb = getFirestore(app);
  return cachedDb;
}

export function isFirebaseConfigured(): boolean {
  return getServiceAccount() !== null;
}
