#!/usr/bin/env node
/**
 * Seed Firestore `blogPosts` collection from content/blog/posts.json (SSOT).
 *
 * Usage:
 *   1. Put service account env vars in .env.local:
 *      FIREBASE_PROJECT_ID=mathiter-prod
 *      FIREBASE_CLIENT_EMAIL=...
 *      FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
 *   2. node scripts/seed-blog.mjs
 *
 * Idempotent: uses post.id as document id and merges.
 * Adding a new post = just edit content/blog/posts.json and rerun.
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const POSTS_FILE = resolve(ROOT, "content/blog/posts.json");

function loadEnv() {
  try {
    const envPath = resolve(ROOT, ".env.local");
    const text = readFileSync(envPath, "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^([A-Z_]+)\s*=\s*(.*)$/);
      if (!m) continue;
      const [, key, raw] = m;
      let val = raw.trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // no .env.local — fall through to process env
  }
}

loadEnv();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKeyRaw) {
  console.error(
    "❌ Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY in env."
  );
  console.error("   Set them in .env.local or your shell, then rerun.");
  process.exit(1);
}

const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

if (getApps().length === 0) {
  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    projectId,
  });
}

const db = getFirestore();

let posts;
try {
  posts = JSON.parse(readFileSync(POSTS_FILE, "utf8"));
} catch (err) {
  console.error(`❌ Failed to read ${POSTS_FILE}:`, err);
  process.exit(1);
}

if (!Array.isArray(posts)) {
  console.error("❌ content/blog/posts.json must be a JSON array.");
  process.exit(1);
}

async function seed() {
  console.log(`\n📝 Seeding ${posts.length} blog post(s) into Firestore...`);
  const batch = db.batch();

  for (const post of posts) {
    if (!post.id) {
      console.error(`  ⚠ skipping post without id:`, post.slug ?? "(no slug)");
      continue;
    }
    const ref = db.collection("blogPosts").doc(post.id);
    batch.set(
      ref,
      {
        ...post,
        seededAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`  • [${post.locale ?? "?"}] ${post.slug ?? post.id}`);
  }

  await batch.commit();
  console.log(`✅ Done.\n`);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
