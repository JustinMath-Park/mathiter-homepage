# 블로그 글 직접 편집 가이드

> 누가 보나 — Justin (또는 본인이 직접 글을 손볼 사람)
> 이 가이드 위치 — `content/blog/EDITING.md`

블로그 글은 `content/blog/posts/<slug>.md` 파일들로 관리됩니다. 이 디렉토리의 `.md` 파일을 직접 열어 수정하세요. 이게 production의 SSOT(단일 진실원)입니다.

---

## ✏️ 단어/문장 몇 개만 빠르게 수정하고 싶을 때

### 1단계 — `.md` 파일 열기

VSCode / Cursor 등에서:

```
content/blog/posts/us-vs-uk-exam-tree-which-tree.md
content/blog/posts/ap-calculus-ab-vs-bc-which-one.md
content/blog/posts/international-school-math-english-terms-50.md
```

각 파일은 두 부분:

```yaml
---
# 위쪽 = 메타데이터 (frontmatter, YAML)
title: '유학 준비 시험 트리 — ...'
description: 'SAT vs A-Level...'
publishedAt: '2026-05-08'
tags:
  - 유학 준비
  - SAT
---
# 아래쪽 = 글 본문 (markdown)
> "유학 가서 다시 정하면 되지 않나요?"

저는 두 아이를 처음부터...
```

### 2단계 — 수정 후 저장

본문 부분(`---` 아래)을 자유롭게 수정. markdown 문법 그대로:
- `## 제목` — H2 헤더
- `**굵게**` 또는 `<strong>굵게</strong>` (한국어 조사 직전엔 `<strong>` 권장)
- `[링크 텍스트](URL)` — 링크
- `> 인용문` — 인용구 (CTA에 사용)
- `![대체 텍스트](/blog/figures/이미지.svg)` — 이미지 (caption은 alt 텍스트)
- 빈 줄 = 단락 구분

### 3단계 — production에 반영

```bash
# 1. dev 서버에서 미리보기 (선택)
npm run dev
# → http://localhost:5186/ko/blog/<slug> 에서 확인

# 2. Firestore에 push (필수 — production이 즉시 반영됨)
npm run seed:blog

# 3. git에 보존 (필수 — 다음 빌드에도 유지)
git add content/blog/posts
git commit -m "edit: <어떤 글의 무엇을 수정>"
git push origin main
```

→ Vercel이 자동 빌드하지만, **Firestore가 SSOT**이라 push 없이도 production 페이지는 5분 이내 자동 갱신됩니다 (ISR `revalidate: 300`). 단 git에 보존 안 하면 다음 누군가가 빌드할 때 옛 글로 돌아가니 반드시 commit.

---

## 🚫 작성 시 절대 피할 것 (공통 규칙)

이건 자동화 봇이 새 글 만들 때도 지키는 규칙입니다. 직접 편집 시에도 같음.

1. **임의 숫자 X** — "Top 1%", "350명+", "100% 보장" 같은 검증 안 된 수치 X
2. **자기 객관화 X** — "박세준의 경험", "박세준 원장이 ..." → "제가 ...", "제가 본"
3. **`## Hook` / `## Pain Recognition` / `## Why this matters` H2 X** — 의미 있는 키워드 흡수형 H2로
4. **`~` 단독 사용 X** — 한국어 범위 표시는 `–` (en dash). "A*~G" → "A*–G"
5. **한국어 조사 직전 bold X (markdown)** — `**텍스트**조사` 패턴은 깨짐. `<strong>텍스트</strong>조사` 사용
6. **시험 사실 단정 X** — 특히 A-Level은 "5–6월에만 / 연 1회" 단정 금지. International A-Level은 1월·10–11월 추가 세션 존재
7. **Zoom 언급 X** — "Google Meet 기반 Mathiter 학습앱"
8. **학생 기명 X** — case는 항상 익명

세부는 `~/.claude/llm-wiki/wiki/projects/mathiter-tutoring-seo.md` 참조.

---

## 📝 Frontmatter 필드 설명

수정 가능 (대부분 그대로 두기):

| 필드 | 의미 | 예시 |
|---|---|---|
| `title` | 글 제목 (60자 이내, SEO) | `'유학 준비 시험 트리 — ...'` |
| `description` | 메타 description (155자 이내, 검색결과 노출) | `'SAT vs A-Level...'` |
| `excerpt` | 카드 요약 (100자 내외) | `'옆집은 SAT...'` |
| `heroImage` | 글 상단 이미지 경로 | `/blog/figures/exam-tree-hero.svg` |
| `category` | 분류 | `sat / ap / ib / igcse / school-life / moving / general` |
| `tags` | 태그 (3–6개) | `[유학 준비, SAT, ...]` |
| `persona` | 타깃 페르소나 | `1` (이주 준비) / `2` (한국 거주) / `3` (해외 거주) |
| `publishedAt` | 발행일 | `'2026-05-08'` |
| `updatedAt` | 수정일 (수정 시 갱신 추천) | `'2026-05-08'` |
| `status` | 발행 상태 | `published` / `draft` (draft는 페이지에 안 보임) |
| `showOnTutoring` | 메인 홈 블로그 카드에 표시 | `true` / `false` |
| `showOnHome` | (현재는 동일하게 사용) | `true` / `false` |
| `readingTime` | 예상 읽기 분 (UI엔 안 보이지만 SEO 메타에 사용) | `13` |

변경 안 권장:
- `id`, `slug`, `canonicalSlug` — URL 영향. 바꾸면 기존 링크 깨짐
- `locale` — 다국어 분리

---

## 🆕 새 글 작성

새 글은 직접 .md 만들지 말고 **스킬 사용 권장**:

```
/tutoring-blog-write
```

위키 SSOT 톤가이드 + Opus 위임 + 자동 검증으로 글 생성됨.
새 글 하나 = `content/blog/posts/<slug>.md` 파일 1개 추가.

직접 만들고 싶으면 기존 `.md` 파일 복사 → 새 slug + frontmatter + body 작성 → save → `npm run seed:blog`.

---

## 🛠 자주 쓰는 명령

```bash
# 글 수정 후 production에 push
npm run seed:blog

# dev 서버에서 즉시 확인 (mock fallback이라 .md 변경 즉시 반영)
npm run dev

# 빌드 검증 (배포 전에)
npm run build
```

---

## 🆘 문제 발생 시

- **`npm run seed:blog` 에러**: `.env.local`에 `FIREBASE_*` 환경변수 있는지 확인
- **글이 라이브에 안 보임**: Vercel 배포 끝났는지 확인 (보통 1–2분), 또는 5분 ISR 갱신 대기
- **`<strong>` raw 노출**: rehype-raw 설치되어 있는지 (`package.json`)
- **이전 버전 복원**: `posts.json.bak` 파일에 변환 전 데이터 있음 (수동 복원 가능)

---

*Last updated: 2026-05-08 — Justin이 직접 편집 가능 구조로 전환*
