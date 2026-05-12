#!/usr/bin/env node
/**
 * Blog post lint — runs all SSOT rules (위키 §13) + markdown safety checks
 * against content/blog/posts/*.md before publish.
 *
 * Usage:
 *   npm run lint:blog                  # all posts
 *   npm run lint:blog -- <path>        # specific file(s)
 *
 * Exit code:
 *   0 = clean or warnings only
 *   1 = at least one error
 *
 * Add new checks: append to `markdownChecks`, `contentChecks`,
 * `structureChecks`, or `frontmatterChecks` arrays below.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import matter from "gray-matter";

const POSTS_DIR = resolve("./content/blog/posts");

const C = {
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

// ─────────────────────────────────────────────────────────────
// Checks
// ─────────────────────────────────────────────────────────────

// Markdown-level (rendering correctness)
const markdownChecks = [
  {
    name: "Raw **bold**한국어 will leak ** to readers (CommonMark right-flanking)",
    severity: "error",
    // (?<![\w가-힣*]) → opening ** must be preceded by non-word/Korean/asterisk
    // (?=[가-힣])     → closing ** must be followed by a Korean letter
    pattern: /(?<![\w가-힣*])\*\*([^*\n]+?)\*\*(?=[가-힣])/g,
    hint: "Replace with <strong>xxx</strong>한국어조사 HTML (remark-rehype-raw handles it).",
  },
  {
    name: "Backslash-paren LaTeX — remark-math only recognizes $...$ / $$...$$",
    severity: "error",
    pattern: /\\\\?\([^)\n]*\\\\?\)/g,
    hint: "Replace \\(...\\) → $...$ for inline, \\[...\\] → $$...$$ for block.",
  },
  {
    name: "Korean-tilde range may trigger GFM strikethrough",
    severity: "warn",
    pattern: /[가-힣]~[가-힣0-9]/g,
    hint: 'Use en dash "–": "6개월~12개월" → "6개월–12개월".',
  },
];

// Content/tone (위키 §13 + §4 SSOT)
const contentChecks = [
  {
    name: "자기 객관화 — 박세준 3인칭 자기 지칭",
    severity: "error",
    pattern: /박세준(의\s|\s원장(이|의|은)|\s본인(이|의|은))/g,
    hint: '1인칭 사용: "박세준의 X" → "제 X" / "박세준 원장이" → "제가".',
  },
  {
    name: "박세준을 학원 강사 출신처럼 표기",
    severity: "error",
    pattern: /박세준\s(강사|학원)/g,
    hint: '박세준은 "대치동에서 자란 학생" 신분 (위키 §13.7).',
  },
  {
    name: "Zoom 언급 (위키 §13.8 — 항상 Google Meet)",
    severity: "error",
    pattern: /\bZoom\b/g,
    hint: 'Replace with "Google Meet 기반 Mathiter 학습앱".',
  },
  {
    name: "광고법 위반 가능 문구 (Top 1%, 100% 보장 등)",
    severity: "error",
    pattern: /(Top\s*1%|100%\s*(보장|만점|합격|환불\s*보장)|무조건\s*만점|유일한\s*강사|업계\s*최고)/g,
    hint: "검증된 fact만 사용 (위키 §13.4).",
  },
  {
    name: "Guide-only H2 used as actual heading",
    severity: "error",
    pattern: /^##\s+(Hook|Pain\s*Recognition|Why\s*this\s*matters)\b/gm,
    hint: "These are author-guide labels, not real H2s. Use keyword-absorbed meaningful heading.",
  },
  {
    name: "TODO / FIXME / placeholder left in body",
    severity: "warn",
    pattern: /\b(TODO|FIXME|XXX|TBD|placeholder)\b/g,
    hint: "Resolve before publish.",
  },
];

// Frontmatter / metadata
const frontmatterChecks = [
  {
    name: "id ≠ slug",
    severity: "error",
    test: (fm) => fm.id && fm.slug && fm.id !== fm.slug,
    hint: "id and slug must match for Firestore document id consistency.",
  },
  {
    name: "title > 60 chars (SEO)",
    severity: "warn",
    test: (fm) => fm.title && fm.title.length > 60,
    hint: "Google truncates titles past ~60 chars. Tighten.",
    detail: (fm) => `current: ${fm.title.length} chars`,
  },
  {
    name: "description > 155 chars (meta description limit)",
    severity: "warn",
    test: (fm) => fm.description && fm.description.length > 155,
    hint: "Google truncates meta descriptions past ~155 chars. Tighten.",
    detail: (fm) => `current: ${fm.description.length} chars`,
  },
  {
    name: "excerpt > 130 chars (blog card preview)",
    severity: "warn",
    test: (fm) => fm.excerpt && fm.excerpt.length > 130,
    hint: "Card preview will wrap awkwardly.",
    detail: (fm) => `current: ${fm.excerpt.length} chars`,
  },
  {
    name: "Missing required frontmatter field",
    severity: "error",
    test: (fm) => {
      const required = ["id", "slug", "locale", "title", "description", "category", "publishedAt", "status"];
      return required.find((k) => fm[k] === undefined);
    },
    hint: "Add the missing field.",
    detail: (fm) => {
      const required = ["id", "slug", "locale", "title", "description", "category", "publishedAt", "status"];
      const missing = required.filter((k) => fm[k] === undefined);
      return `missing: ${missing.join(", ")}`;
    },
  },
  {
    name: "Unknown category (must be one of sat/ap/ib/igcse/school-life/moving/general)",
    severity: "warn",
    test: (fm) => fm.category && !["sat", "ap", "ib", "igcse", "school-life", "moving", "general"].includes(fm.category),
    hint: "Use one of the canonical categories.",
    detail: (fm) => `current: "${fm.category}"`,
  },
];

// ─────────────────────────────────────────────────────────────
// Engine
// ─────────────────────────────────────────────────────────────

function lineOf(text, charOffset) {
  return text.slice(0, charOffset).split("\n").length;
}

function lintFile(path) {
  const raw = readFileSync(path, "utf8");
  const { data: fm, content } = matter(raw);
  const bodyOffset = raw.indexOf(content);
  const issues = [];

  // Markdown checks (body only)
  for (const c of markdownChecks) {
    for (const m of content.matchAll(c.pattern)) {
      const sample = m[0].length > 60 ? m[0].slice(0, 60) + "…" : m[0];
      issues.push({
        severity: c.severity,
        line: lineOf(raw, bodyOffset + m.index),
        name: c.name,
        sample,
        hint: c.hint,
      });
    }
  }

  // Content/tone checks (body only — frontmatter author bio mentions 박세준)
  for (const c of contentChecks) {
    for (const m of content.matchAll(c.pattern)) {
      const sample = m[0].length > 60 ? m[0].slice(0, 60) + "…" : m[0];
      issues.push({
        severity: c.severity,
        line: lineOf(raw, bodyOffset + m.index),
        name: c.name,
        sample,
        hint: c.hint,
      });
    }
  }

  // Frontmatter checks
  for (const c of frontmatterChecks) {
    if (c.test(fm)) {
      issues.push({
        severity: c.severity,
        line: 1,
        name: c.name,
        sample: c.detail ? c.detail(fm) : "",
        hint: c.hint,
      });
    }
  }

  // Footnote integrity
  const markers = new Set([...content.matchAll(/\[\^([^\]\s]+)\](?!:)/g)].map((m) => m[1]));
  const defs = new Set([...content.matchAll(/^\[\^([^\]\s]+)\]:/gm)].map((m) => m[1]));
  for (const name of markers) {
    if (!defs.has(name)) {
      issues.push({
        severity: "error",
        line: 0,
        name: `Footnote marker [^${name}] has no definition`,
        sample: `[^${name}]`,
        hint: `Add "[^${name}]: **${name}** — explanation" at end of article.`,
      });
    }
  }
  for (const name of defs) {
    if (!markers.has(name)) {
      issues.push({
        severity: "warn",
        line: 0,
        name: `Orphan footnote definition [^${name}]:`,
        sample: `[^${name}]:`,
        hint: "Reference it in body or delete the definition.",
      });
    }
  }

  // Internal-link sanity
  const hasMathiterAnchor = /https?:\/\/mathiter\.com\//.test(content);
  if (!hasMathiterAnchor) {
    issues.push({
      severity: "warn",
      line: 0,
      name: "No https://mathiter.com/ anchor in body",
      sample: "",
      hint: "Add at least one natural anchor to landing (위키 §9.1).",
    });
  }
  const hasContactCta = /\/(?:ko\/)?contact/.test(content);
  if (!hasContactCta) {
    issues.push({
      severity: "warn",
      line: 0,
      name: "No /contact (or /ko/contact) link in CTA",
      sample: "",
      hint: "CTA blockquote should link to /ko/contact (Korean) or /contact (English).",
    });
  }

  return { fm, issues };
}

// ─────────────────────────────────────────────────────────────
// Output
// ─────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const files =
  args.length > 0
    ? args.map((a) => resolve(a))
    : readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
        .sort()
        .map((f) => resolve(POSTS_DIR, f));

let totalErrors = 0;
let totalWarns = 0;

console.log(
  `${C.bold}${C.cyan}🔍 Blog lint${C.reset} — ${files.length} file(s)\n`
);

for (const path of files) {
  if (!existsSync(path)) {
    console.error(`${C.red}❌ Not found: ${path}${C.reset}\n`);
    process.exit(1);
  }

  const fileName = path.split("/").pop();
  const { issues } = lintFile(path);

  if (issues.length === 0) {
    console.log(`${C.green}✓${C.reset} ${C.bold}${fileName}${C.reset}`);
    continue;
  }

  const errCount = issues.filter((i) => i.severity === "error").length;
  const warnCount = issues.filter((i) => i.severity === "warn").length;
  totalErrors += errCount;
  totalWarns += warnCount;

  const tags = [];
  if (errCount > 0) tags.push(`${C.red}${errCount} error${errCount > 1 ? "s" : ""}${C.reset}`);
  if (warnCount > 0) tags.push(`${C.yellow}${warnCount} warning${warnCount > 1 ? "s" : ""}${C.reset}`);
  console.log(`${C.bold}${fileName}${C.reset} — ${tags.join(", ")}`);

  for (const i of issues) {
    const icon = i.severity === "error" ? `${C.red}✗${C.reset}` : `${C.yellow}⚠${C.reset}`;
    const linePart = i.line ? ` ${C.gray}[line ${i.line}]${C.reset}` : "";
    console.log(`  ${icon} ${i.name}${linePart}`);
    if (i.sample) console.log(`     ${C.cyan}match:${C.reset} ${i.sample}`);
    console.log(`     ${C.gray}↳ ${i.hint}${C.reset}`);
  }
  console.log();
}

console.log();
if (totalErrors > 0) {
  console.log(
    `${C.red}${C.bold}✗ ${totalErrors} error(s), ${totalWarns} warning(s) — fix errors before publish${C.reset}`
  );
  process.exit(1);
}
if (totalWarns > 0) {
  console.log(
    `${C.yellow}⚠ ${totalWarns} warning(s) (no errors) — safe to publish${C.reset}`
  );
} else {
  console.log(`${C.green}${C.bold}✓ All ${files.length} file(s) clean${C.reset}`);
}
process.exit(0);
