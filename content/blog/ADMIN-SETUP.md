# 어드민 페이지 셋업 가이드

> 일회성 셋업 — 이걸 한 번 하면 그 다음부터 `mathiter.com/admin/blog` 로 가서 글 직접 편집 가능

---

## ✅ 2026-05-11 — Claude가 자동 처리한 부분

| 단계 | 상태 | 비고 |
|---|---|---|
| 1. Firebase Web App 등록 | ✅ 이미 있었음 | "Mathiter Web App" — Mathiter 학습앱과 공유 |
| 2. Authentication Google 로그인 | 🟡 Justin 확인 필요 | console에서 토글만 (1분) |
| 3. Vercel 환경변수 6개 | ✅ CLI로 자동 추가 | production + preview scope |
| 4. Firestore Security Rules | ✅ CLI로 자동 deploy | 학습앱 기존 25+ rules 보존 + blog/inquiry 2개 추가 |

**Justin이 해야 할 일 (1개만 남음)**: 2단계 Authentication Google 로그인 활성화 확인 →
[Authentication > Sign-in method](https://console.firebase.google.com/project/mathiter-prod/authentication/providers)
에서 Google이 "사용 설정됨"이면 끝. 아니면 토글만 켜고 저장. **다음 deploy 끝나면** `https://mathiter.com/admin` 접속 가능.

> ⚠ **firestore.rules SSOT 노트**: 학습앱(`mathiter-app`) repo도 별도의 `firestore.rules`를 갖고 있습니다.
> 이번에 mathiter-homepage의 `firestore.rules`에 `blogPosts` + `tutoringInquiries` 2개 match 블록을
> 추가하고 deploy했지만, **학습앱 repo의 `firestore.rules`에는 아직 그 2개가 빠져 있습니다.**
> 향후 학습앱 repo에서 `firebase deploy --only firestore:rules`를 실행하면 그 2개가 사라집니다.
> 안전을 위해 `/Users/justinminim4/projects/mathiter-app/firestore.rules`에도 동일한 2개 match 블록을
> append 후 commit/push해주세요. (학습앱 repo는 현재 `design/claude-design-v1` branch라 main에 직접
> sync 필요.)

---

## 📋 셋업 4단계

### 1단계 — Firebase Web App 등록 (3분)

[Firebase Console](https://console.firebase.google.com/project/mathiter-prod/settings/general) 접속:

1. **프로젝트 설정** (톱니바퀴 아이콘) → **내 앱** 섹션
2. **`</>` (웹) 아이콘** 클릭하여 새 웹 앱 등록
3. 앱 닉네임: `mathiter-homepage` (아무거나 OK)
4. **"Firebase Hosting도 설정"은 체크 X** — 그냥 등록만
5. **앱 등록** 클릭 → 받는 config 복사:

```js
// 받게 되는 모양 — 이 6개 값을 다음 단계에서 사용
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "mathiter-prod.firebaseapp.com",
  projectId: "mathiter-prod",
  storageBucket: "mathiter-prod.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc...",
};
```

→ 이 6개 값을 메모장에 복사.

---

### 2단계 — Authentication 활성화 (2분)

[Authentication](https://console.firebase.google.com/project/mathiter-prod/authentication/providers) 접속:

1. **시작하기** 클릭 (처음이라면)
2. 로그인 방법 탭 → **Google** 클릭 → **사용 설정** 토글
3. 프로젝트 지원 이메일: Justin 이메일(`sspark222@gmail.com`) 선택
4. **저장**

→ 이제 Google 계정으로 로그인 가능

---

### 3단계 — Vercel 환경변수 6개 추가 (3분)

[Vercel Dashboard](https://vercel.com/mathiter/mathiter-homepage/settings/environment-variables) 접속:

다음 6개 변수를 **Production + Preview** scope로 추가:

| Variable | Value (1단계의 config에서) |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIza...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `mathiter-prod.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `mathiter-prod` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `mathiter-prod.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `1234567890` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:1234567890:web:abc...` |

저장 후 **Deployments → 최신 → ⋯ → Redeploy** 클릭 (env 적용).

---

### 4단계 — Firestore Security Rules (1분)

⚠ **중요**: 이거 안 하면 누구나 글 수정 가능. 반드시 설정.

[Firestore Rules](https://console.firebase.google.com/project/mathiter-prod/firestore/rules) 접속:

다음 규칙을 **그대로 붙여넣기**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 블로그 글 — 누구나 읽기 가능, Justin만 쓰기 가능
    match /blogPosts/{id} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email in [
          'sspark222@gmail.com'
        ];
    }

    // 상담 신청 — 누구나 쓰기 가능 (폼 제출), Justin만 읽기 가능
    match /tutoringInquiries/{id} {
      allow read: if request.auth != null
        && request.auth.token.email in [
          'sspark222@gmail.com'
        ];
      allow write: if true;
    }

  }
}
```

**게시** 클릭.

---

## ✅ 셋업 완료 — 사용법

브라우저에서 https://mathiter.com/admin 접속:
1. Google 로그인 페이지 → Justin 계정으로 로그인
2. `/admin/blog` 글 목록
3. 원하는 글 옆 **편집 →** 클릭
4. 좌측 메타데이터 (제목·요약·상태 등) + 우측 markdown editor (live preview)
5. 저장 버튼 → Firestore 즉시 update → 라이브 5분 내 반영

---

## 🛡 보안 노트

- `NEXT_PUBLIC_FIREBASE_*` 환경변수는 **클라이언트(브라우저)에 그대로 노출**됩니다 — 의도된 동작
- 실제 보안은 두 레이어:
  1. **클라이언트 allowlist**: `src/lib/firebase-client.ts`의 `ADMIN_EMAILS`
  2. **서버 사이드 Firestore Rules**: 4단계의 `request.auth.token.email in [...]`
- 둘 다 같은 이메일로 맞춰져 있어야 합니다. 새 관리자 추가하려면 두 곳 모두 추가.

---

## 🔧 다른 관리자 추가하려면

### `src/lib/firebase-client.ts` — `ADMIN_EMAILS` 배열에 이메일 추가
```ts
export const ADMIN_EMAILS: string[] = [
  "sspark222@gmail.com",
  "newadmin@example.com",  // 추가
];
```

### Firestore Rules — `email in [...]` 배열에도 동일 이메일 추가
```
allow write: if request.auth != null
  && request.auth.token.email in [
    'sspark222@gmail.com',
    'newadmin@example.com'  // 추가
  ];
```

git push + Vercel auto-deploy + Firestore Rules 게시.

---

## 🚨 문제 발생 시

| 증상 | 원인/해결 |
|---|---|
| 로그인 화면에 "Firebase 환경변수가 설정되지 않았습니다" | 3단계 env 변수 빠짐 — Vercel에서 추가 후 redeploy |
| Google 로그인 팝업이 안 열림 | 2단계 Authentication에서 Google provider 활성화 안 됨 |
| "접근 권한 없음" 메시지 | `ADMIN_EMAILS`에 본인 이메일 없음 — 코드 수정 + commit |
| 저장 시 "Missing or insufficient permissions" | 4단계 Firestore Rules 누락 또는 이메일 mismatch |
| 저장은 되는데 라이브에 반영 안 됨 | ISR cache — 5분 대기 또는 Vercel에서 manual redeploy |

---

*Last updated: 2026-05-08*
