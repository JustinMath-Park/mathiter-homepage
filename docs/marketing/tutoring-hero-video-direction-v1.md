# Mathiter Tutoring — Hero Video 연출 기획서 v1

> 튜터링 랜딩 페이지 hero 영역에 들어갈 78초 홍보 영상의 Shot-by-Shot Direction Document.
> 본 문서는 대본·연출·에셋·촬영·합성 전 단계의 SSOT.

---

## 0. 메타

| 항목 | 값 |
|---|---|
| **길이** | 78초 |
| **종횡비** | 16:9 (1920×1080) → 9:16 숏츠 재편집 예정 |
| **타겟** | 해외 국제학교에 자녀를 보낸/보낼 한국 학부모 (말레이시아·싱가포르·홍콩 등) |
| **톤** | 차분한 자신감 + 따뜻한 멘토 + 검증된 권위 |
| **브랜드 명칭** | **Mathiter Tutoring** ("박세준의 1:1" 표현 미사용) |
| **CTA 목표** | 영상 종료 시 랜딩 페이지 스크롤·CTA 버튼 클릭 |
| **VO** | ElevenLabs `Justin_Park` 보이스 (이미 등록됨, 박세준 본인 톤) |
| **자동재생** | 랜딩 hero 영역: 음소거 자동재생 + 클릭 시 사운드 ON |

---

## 1. 에셋 제작 도구 스택

| 도구 | 용도 | 비용 |
|---|---|---|
| **Grok Imagine (SuperGrok)** | HOOK 손/키보드, 무드 컷 (10s/720p, 사운드 자동) | $30/mo |
| **Veo 3.1 Lite (Google 계정)** | 책상 탑샷·노을·복도 등 포토리얼 디테일 | 무료 |
| **Pika 2.2** | 트랜지션 파티클·키프레임 효과 | 저가 |
| **Remotion 4.0.419** | 텍스트 모션그래픽·댓글창·카운터·CTA (코드 기반) | 0 |
| **ElevenLabs eleven_v3** | VO 합성 (Justin_Park 보이스 + Request Stitching) | $0.04 / 영상 |
| **Suno AI / Udio** | 음악 3 트랙 주문 제작 (Track 1·2·3) | $10/mo 또는 무료 티어 |
| **DaVinci Resolve (또는 ffmpeg)** | 최종 합성·자막 burn-in·음악 믹스 | 무료 |
| **OBS Studio** | Google Meet 실화면 녹화 + 박세준 PIP 녹화 | 무료 |

---

## 2. 음악 (Suno AI / Udio 주문 제작)

| 트랙 | 시간 | 톤 | 분위기 |
|---|---|---|---|
| **Track 1** | 0–26s (HOOK·TURN·PROOF) | Lo-fi 피아노 + 미니멀 펄스 | 차분, 진중, 호기심 |
| **Track 2** | 26–48s (PIVOT·MENTOR) | 따뜻한 어쿠스틱 (피아노+스트링) | 공감, 멘토 톤 |
| **Track 3** | 48–78s (DEMO·BLEND·CTA) | 가벼운 신스 펄스 + 짧은 build-up | 자신감, 결단 |

**제작 방식**: 3 트랙 별도 생성 후 DaVinci/ffmpeg에서 cross-fade 연결.

### Suno / Udio 프롬프트 (영문 입력)

**Track 1 (26s)** — HOOK·TURN·PROOF
```
Cinematic instrumental, minimal lo-fi piano with soft pulse and subtle synth pad.
Late-night hopeful-but-tired mood. Tempo around 70 BPM. Builds gently to a clean
stamp at 23s. No lyrics, no drums until 18s, then light brush percussion. 26 seconds.
```

**Track 2 (22s)** — PIVOT·MENTOR
```
Warm acoustic piano with subtle cello and ambient strings. Emotional, intimate,
mentor tone. Slow tempo around 65 BPM. Gentle and human, no percussion. Builds
slightly at 12s then settles. No lyrics. 22 seconds.
```

**Track 3 (30s)** — DEMO·BLEND·CTA
```
Light synth pulse with confident build-up, clean modern instrumental. Tempo 85 BPM.
Adds soft electric piano at 12s, then a subtle riser at 22s leading to a calm,
decisive resolution. Ends with a soft 2-second fade. No lyrics, no harsh drums.
30 seconds.
```

> Suno는 보통 30-60s 클립 생성. **트랙 1·3은 한 번에**, **트랙 2는 한 번에 가능**. 길이 초과/부족 시 Suno "Extend" 기능 또는 ffmpeg trim·loop.

---

## 3. 자막 시스템 (Typography)

| 요소 | 한국어 | 영어 |
|---|---|---|
| **폰트** | Pretendard Bold / SemiBold | Inter Tight Medium 또는 Newsreader Italic (강조용) |
| **크기** | 메인 64px / 보조 36px | 메인 56px / 보조 32px |
| **색상** | #FFFFFF (95% 불투명) + 시그널 컬러 #5AB1FF (강조어) | #F5F5F5 (80% 불투명) |
| **위치** | 상단 1/3 또는 중앙 | 자막 한국어 바로 아래, 보조 |
| **모션** | 페이드인 + 슬라이드업 (Remotion spring, mass: 0.6) | 페이드인만 (스프링 X) |
| **노출** | 한 줄당 3-4초 | 한국어와 동기화, 0.2s 후행 |

## 3.5. 로고 워터마크 (영상 전체 상시 노출)

| 항목 | 값 |
|---|---|
| **위치** | 우측 상단 (40px 마진) |
| **크기** | 48×48px (또는 가로형 로고는 높이 36px) |
| **불투명도** | 평소 65% / 비트 8 CTA에서 100% + 살짝 펄스 |
| **컬러** | 다크 배경에서 #FFFFFF 또는 Mathiter 시그널 컬러 |
| **예외** | 비트 6 DEMO의 Google Meet 화면이 본 워터마크와 겹칠 경우 좌측 상단으로 임시 이동 |

> 영상이 추후 YouTube·인스타·LinkedIn 등 다른 플랫폼에 재배포되어도 Mathiter 브랜드 일관 유지.

---

## 4. 비트별 연출 카드 (8장)

> 각 카드 = 시간/메시지/화면/PIP/VO/자막/카메라/이펙트/SFX/에셋출처 통합 표.

---

### 🎯 비트 1 · HOOK (0–7s) — **2-컷 시퀀스**

| 항목 | 디테일 |
|---|---|
| **목표 감정** | 학부모 페인 직격 — "맞아, 우리 얘기야" |
| **메인 메시지** | 한국 수학 ≠ 미국 수학. 양쪽 다 보는 사람이 필요하다. |
| **컷 1 (0–4s)** | **손/키보드 클로즈업** — 어두운 새벽 톤. 손가락이 천천히 타이핑. `Korean tutor SAT KL` 검색 → 결과창 빈약. |
| **컷 2 (4–7s)** | **책상 탑샷** — 한국 수학 워크북(손글씨, 정밀) + 영문 SAT 시험지 + Desmos 그래프 화면이 한 책상 위에 함께 놓인 모습. 골든아워 측면광. 카메라 정지. |
| **트랜지션** | 컷1 페이드아웃 → 컷2 페이드인 (0.5s cross-fade, 0:03.5–0:04 구간) |
| **PIP** | 없음 |
| **VO** | "한국 수학과 미국 수학은… 같은 수학의 다른 표기가 아닙니다. 양쪽을 다 본 사람이 옆에 있어야, 양쪽을 다 잡습니다." (전체 7초에 자연스럽게 분배) |
| **자막 (한)** | (5s 지점, 컷2 위에) **한국 수학 ≠ 미국 수학** |
| **자막 (영)** | (5s 지점) *Korean math ≠ US math.* |
| **카메라 워킹** | 컷1 정지·살짝 줌인 → 컷2 정적 탑샷 |
| **이펙트** | 컷1 화면 가장자리 비네팅, 검색창 텍스트 타이프라이터. 컷2 책상 위 종이·화면이 자연광에 살짝 흔들림 (Veo 자체 모션) |
| **SFX** | 컷1: 키보드 클릭음 (저음) · 시계 초침 미세 · 검색 실패음. 컷2: 종이 살짝 부스럭, ambient 저녁 톤 |
| **음악** | Track 1 (Lo-fi 피아노) intro 페이드인 |
| **에셋 출처** | **컷1**: Grok Imagine 손/키보드 (4s) + **컷2**: Veo 3.1 Lite 책상 탑샷 (3s) + **Remotion**: 검색창 텍스트 애니메이션 + 자막 페이드인 |

**Grok 프롬프트 (컷 1)**:
> *"Extreme close-up of an Asian parent's hand slowly typing on a backlit laptop keyboard in a dark home office at 2 AM. Warm orange desk lamp light catches the metallic keys. Shallow depth of field. Cinematic, moody, hopeful but tired. 4 seconds. No face visible. 16:9. Subtle ambient room tone."*

**Veo 3.1 프롬프트 (컷 2)**:
> *"Top-down shot of a wooden desk at evening golden hour. On the left: an open Korean math workbook with neat handwritten equations (algebra notation, equal signs aligned). Center: a printed English SAT math worksheet with a visible word problem paragraph. Right: a tablet screen showing Desmos graphing calculator with a parabola plotted. Soft warm side light from a window casts long shadows. Camera holds still. Photorealistic. 3 seconds. 16:9. Ambient evening room sound."*

---

### 🎯 비트 2 · TURN (7–16s)

| 항목 | 디테일 |
|---|---|
| **목표 감정** | 신뢰 확립 — "이 사람, 양쪽 다 봤구나" |
| **메인 메시지** | 12년 한국 + 8년 국제학교 = 양쪽을 다 본 사람 |
| **메인 화면** | 다크 배경. 큰 타이포가 차례로 등장. 박세준 PIP 우측 하단 (자연 조명, 살짝 미소). |
| **타이포 시퀀스** | `12 years in Daechi` (1s) → 구분선 → `8 years` (1s) → `tutoring SAT · AP · A-Level` (1s) |
| **PIP** | 박세준 본인. 우측 하단 320×240px. 부드러운 등장 (fade + slide-up 0.4s) |
| **VO** | "대치동에서 학창시절을 모두 보냈고, 8년 동안 국제학교 학생들을 가르치고 있습니다." |
| **자막 (한)** | (10s) **12년 대치동 → 8년 국제학교 1:1** |
| **자막 (영)** | (10s) *12 years in Daechi → 8 years tutoring SAT · AP · A-Level* |
| **카메라 워킹** | 타이포는 정지 (페이드만). PIP는 살짝 들어와서 정지 |
| **이펙트** | 타이포 등장 시 짧은 light flash (한 줄당 1프레임) |
| **SFX** | 종이 페이지 넘기는 부드러운 소리 (타이포 등장 매번) · PIP 등장 시 woosh |
| **음악** | 세그먼트 1 유지, 살짝 빌드업 |
| **에셋 출처** | **Remotion**: TurnTypoSequence 컴포넌트 + **실사 촬영**: 박세준 PIP 컷 #1 (10s 분량 중 9s 사용) |

---

### 🎯 비트 3 · PROOF (16–26s)

| 항목 | 디테일 |
|---|---|
| **목표 감정** | 권위·검증 — "결과가 있구나" |
| **메인 메시지** | SAT Math 만점, AP Calc BC 5점 — 실제 결과 |
| **메인 화면** | 다크 배경. 큰 숫자 카운터 2번. |
| **카운터 시퀀스** | `0 → 800` 카운트업 (3s) + `SAT Math` 로고 → 페이드 → `0 → 5` 카운트업 (3s) + `AP Calculus BC` 로고 |
| **PIP** | 우측 하단 유지 |
| **VO** | "제 학생들은 SAT Math 만점, AP Calculus BC 5점을 받았습니다." |
| **자막 (한)** | (20s) 🏆 **SAT Math 800 · AP Calc BC 5** |
| **자막 (영)** | (20s) *SAT Math 800 · AP Calc BC 5* |
| **카메라 워킹** | 카운터 숫자가 풀스크린 중앙에 떠올랐다 페이드 |
| **이펙트** | 카운터 도달 시 미세한 글로우 puls, 마지막 숫자에 살짝 stamp 모션 |
| **SFX** | 카운터 틱톡 (저음) · 숫자 도달 시 chime (단음, 깔끔) |
| **음악** | 세그먼트 1 클라이맥스, 살짝 펄스 강화 |
| **에셋 출처** | **Remotion**: ProofCounter 컴포넌트 (카운트업 + 로고 + 글로우) |

---

### 🎯 비트 4 · PIVOT (26–36s)

| 항목 | 디테일 |
|---|---|
| **목표 감정** | 인간미·공감 — "이 사람, 그냥 점수 만드는 사람이 아니구나" |
| **메인 메시지** | 해외 한국 아이의 진짜 어려움은 수학이 아니라 낯섦 |
| **메인 화면** | 박세준 PIP가 풀스크린으로 확대 (320×240 → 1920×1080). 토킹헤드, 자연 조명, 따뜻한 톤. 살짝 줌인 (10% 정도). |
| **PIP** | 자체가 풀스크린 |
| **VO** | "해외에 막 나간 한국 아이는, 수학보다 '낯섦'이 더 큽니다. 영어 수업, 문화, 친구… 부모님이 모두 옆에 있을 순 없죠." |
| **자막 (한)** | 없음 (화자 표정에 집중) |
| **자막 (영)** | (33s) *Kids abroad face more than math.* — 하단 작게 |
| **카메라 워킹** | PIP 확대 후 slow zoom in 5% (10초 동안 천천히) |
| **이펙트** | 좌우 비네팅 살짝 (영화 컷 분위기) |
| **SFX** | 없음 (목소리 집중) |
| **음악** | **세그먼트 2 시작**. Lo-fi → 따뜻한 어쿠스틱 피아노로 자연스럽게 전환 |
| **에셋 출처** | **실사 촬영**: 박세준 PIP 컷 #2 (정면 토킹헤드, 자연 조명, 10s 분량 — 가장 중요한 컷) |

---

### 🎯 비트 5 · MENTOR (36–48s)

| 항목 | 디테일 |
|---|---|
| **목표 감정** | 사회적 증거 — "다른 학부모들도 이렇게 느꼈구나" |
| **메인 메시지** | 박세준은 수학만이 아니라 정서적 어른 역할도 한다 |
| **메인 화면** | 다크 댓글창 UI (유튜브/인스타 댓글 느낌). 위로 스크롤되며 댓글 6개가 차례로 등장. 좋아요 ❤️ 아이콘. |
| **댓글 시퀀스** | (각 2초 등장 + 페이드) |
| | `@parent_kl` ─ 부모 외에 믿을 어른이 있다는 게 컸어요 |
| | `@hsk_mom_sg` ─ Word problem만 나오면 막히던 애가 풀기 시작했어요 |
| | `@year10_dad_my` ─ 한국 어휘랑 영어 어휘 둘 다 잡아주신다고 |
| | `@ib_parent_kl` ─ 양쪽 교육 시스템을 다 이해하는 거의 유일한 튜터예요 |
| | `@ap_calc_mom` ─ AP BC 5점 받고 와서 같이 울었어요 |
| | `@psat_mom` ─ Desmos 안 쓰던 애가 시험장에서 자유롭게 쓰더라구요 |
| **PIP** | 우측 하단 복귀 (작게) |
| **VO** | "수학만 가르치지는 않습니다. 같은 길을 걸어본 어른으로서, 아이들 이야기도 듣습니다." |
| **자막 (영)** | (45s) *An adult who's been there.* |
| **카메라 워킹** | 댓글창 살짝 위로 스크롤 (속도: 댓글 등장 페이스에 맞춤) |
| **이펙트** | 좋아요 ❤️ 클릭 애니메이션 (랜덤 댓글 1-2개) · 댓글 등장 시 좌측 슬라이드 |
| **SFX** | 댓글 등장 ding (낮고 부드럽게, 인스타 댓글 알림 느낌) — 6번 |
| **음악** | 세그먼트 2 유지 |
| **에셋 출처** | **Remotion**: MentorComments 컴포넌트 (댓글 카드 6개, 좋아요 애니메이션, 스크롤) + **실사**: 박세준 PIP 컷 #3 (작은 사이즈) |

---

### 🎯 비트 6 · DEMO (48–62s)

| 항목 | 디테일 |
|---|---|
| **목표 감정** | 도구·전문성 시연 — "이 사람의 수업, 진짜로 어떻게 굴러가지" |
| **메인 메시지** | AI(Mathiter)와 사람(박세준)이 같이 가르치는 콜라보 |
| **메인 화면** | Google Meet 실화면 캡처. 화면 공유 영역에 Mathiter 화면. 좌측: 학생이 푼 SAT 문제 + AI 채점 결과 + 약점 분석 그래프. 우측: 박세준이 화이트보드에 손글씨로 풀이 시범. Meet 우측 상단 PIP 박세준 얼굴. |
| **PIP** | Meet 내 우측 상단 (Google Meet 기본 PIP 위치) |
| **VO** | "Mathiter가 학생 풀이를 채점하고, 약점을 분석합니다. 저는 그 데이터를 보면서 다음 수업을 설계합니다. AI와 사람이 같이 가르치는 수업이에요." |
| **자막 (한)** | (55s) **AI 채점·약점 분석 + 선생 1:1 지도** |
| **자막 (영)** | (55s) *AI grading + human teaching. Together.* |
| **카메라 워킹** | Mathiter 화면 좌측 분석 영역 살짝 줌인 (3s) → 우측 화이트보드 영역으로 팬 (3s) → 다시 풀샷 |
| **이펙트** | 약점 분석 그래프가 등장 시 막대 차트 애니메이션 · 화이트보드 손글씨는 실시간 그려지는 느낌 |
| **SFX** | 채점 완료 chime (단음) · 펜 글씨 쓰는 소리 |
| **음악** | **세그먼트 3 시작**. 가벼운 신스 펄스 |
| **에셋 출처** | **실사 촬영**: Google Meet + Mathiter 실화면 녹화 60-90초 (Justin이 실제 가상 수업 시뮬레이션) + **편집**: 14초 클립 추출, 줌인·팬 편집 |

---

### 🎯 비트 7 · BLEND (62–72s)

| 항목 | 디테일 |
|---|---|
| **목표 감정** | 차별점 클라이맥스 — "이래서 박세준이 다르구나" |
| **메인 메시지** | 한국식 정밀함 + 미국식 사고·Desmos = 한 선생이 둘 다 |
| **메인 화면** | 같은 SAT word problem 1개에 대해 3단계 전환. |
| **시퀀스** | (3단계, 각 3초) |
| | **1단계**: 한국식 깨끗한 손풀이 (등호 줄 맞춤, 정밀한 표기) + 자막 "🇰🇷 한국식 정밀함" |
| | **2단계**: Desmos 그래프 + 영어 한 문장 설명 + 자막 "🇺🇸 미국식 사고·도구" |
| | **3단계**: 두 화면이 좌우로 분할되며 합쳐짐. 중앙 자막 "**한 선생이, 둘 다.**" |
| **PIP** | 비트 후반에만 우측 하단 작게 등장 |
| **VO** | "한국식의 정밀한 풀이, 미국식의 영어 설명과 Desmos — **한 선생이, 둘 다 가르칩니다.** 양쪽을 다 본 사람만이 할 수 있는 수업입니다." |
| **자막 (한)** | 🇰🇷 한국식 정밀함 + 🇺🇸 미국식 사고·도구 → 한 선생이, 둘 다 |
| **자막 (영)** | *Korean precision + US reasoning. One tutor. Both.* |
| **카메라 워킹** | 1단계 정적 → 2단계 스플릿 전환 (좌→우 슬라이드) → 3단계 줌아웃 전체 보임 |
| **이펙트** | 두 화면이 합쳐질 때 가운데 light bloom · "한 선생이, 둘 다." 텍스트는 살짝 stamp |
| **SFX** | 화면 합쳐짐 swoosh (저음 → 고음 sweep) · stamp thud |
| **음악** | 세그먼트 3, build-up 시작 |
| **에셋 출처** | **Mathiter 캡처 #3·#4**: 한국식 풀이 화면 + Desmos 그래프 화면 + **Remotion**: BlendSplit 컴포넌트 (좌우 분할 + stamp 텍스트) + **실사**: 박세준 PIP 컷 #5 (작은 사이즈) |

---

### 🎯 비트 8 · CTA (72–78s)

| 항목 | 디테일 |
|---|---|
| **목표 감정** | 명확한 다음 액션 — "스크롤해야지" |
| **메인 메시지** | Mathiter Tutoring 자세히 보기 |
| **메인 화면** | 다크 배경. 중앙에 큰 화살표 ↓ (천천히 펄스). 그 위에 "Mathiter Tutoring 자세히 보기" 텍스트. 우측 하단에 Mathiter 로고 작게. |
| **PIP** | 없음 |
| **VO** | "양쪽을 다 잡는 1:1, 자세히 보시려면 — 아래로." |
| **자막 (한)** | **Mathiter Tutoring 자세히 보기 ↓** |
| **자막 (영)** | *See Mathiter Tutoring below ↓* |
| **카메라 워킹** | 화살표가 천천히 펄스 (1초 주기, 살짝 위아래 움직임) |
| **이펙트** | 텍스트는 stamp 등장 · 화살표는 부드러운 bounce |
| **SFX** | 화살표 펄스마다 미세한 chime |
| **음악** | 세그먼트 3 마무리 페이드아웃 |
| **에셋 출처** | **Remotion**: CtaArrow 컴포넌트 |

---

## 5. 에셋 인벤토리

### 5.1 AI 생성 영상 — Justin이 생성

| # | 신 | 도구 | 길이 | 프롬프트 핵심 |
|---|---|---|---|---|
| 1 | HOOK 컷1 — 손/키보드 | Grok Imagine | 4s | 어두운 새벽, 노트북 키보드 클로즈업, 손가락 타이핑, 따뜻한 desk lamp |
| 2 | HOOK 컷2 — 책상 탑샷 | Veo 3.1 Lite | 3s | 한국 워크북 + 영문 시험지 + Desmos 화면이 한 책상에 만난 탑샷 |
| 3 | (옵션) 트랜지션 파티클 | Pika 2.2 | 2s × 3 | 비트 간 전환용 light particle |
| 4 | 음악 Track 1·2·3 | Suno AI | 26s + 22s + 30s | §2 프롬프트 |

**프롬프트 상세는 §7에서 제공.**

### 5.2 박세준 본인 촬영 — Justin 액션 아이템 ⚡

| # | 컷 | 길이 | 카메라 각도 | 표정 | 의상 |
|---|---|---|---|---|---|
| **#1** | TURN PIP 등장 | 10s | 정면 위 살짝 (눈높이 + 10도) | 자연스러운 미소, 살짝 입꼬리 | 깔끔한 셔츠 또는 니트 (목 라인 단정) |
| **#2** ⭐ | PIVOT 토킹헤드 (가장 중요) | 12s | 정면 (눈높이) | 진지하지만 따뜻하게, 천천히 말함 | 위와 동일 |
| **#3** | MENTOR PIP (작게) | 12s | 정면 | 자연스러운 표정, 듣고 있는 듯 | 위와 동일 |
| **#4** | DEMO Google Meet PIP | 14s | Meet 기본 웹캠 각도 | 가르치는 표정, 화이트보드 보면서 설명 | 위와 동일 |
| **#5** | BLEND PIP (작게) | 4s | 정면 | 자연스러운 표정 | 위와 동일 |

**촬영 가이드**:
- **카메라**: 스마트폰 후면 카메라(1080p 이상) 또는 웹캠(1080p)
- **조명**: 자연광 위주. 정면 또는 살짝 측면 30도. 역광 금지. 형광등 단독 X.
- **배경**: 깔끔한 단색 또는 적당히 정리된 책장. 박세준 정체성 어필 가능.
- **마이크**: 본 영상 VO는 ElevenLabs Justin_Park 합성이므로 촬영 시 음성 녹음 불요. 입 모양만 자연스러우면 OK.
- **연속 촬영**: 한 번 셋업 후 컷 #1~#5 연속 촬영 (의상 일치 위해)
- **총 소요**: 셋업 + 촬영 약 30-45분

### 5.3 Mathiter 화면 캡처 — Justin 액션 아이템 ⚡

| # | 캡처 | 해상도 | 데이터 |
|---|---|---|---|
| **A** | DEMO 좌측: 학생 풀이 + AI 채점 결과 | 1920×1080 | 데모 SAT 문제 1개, 풀이 단계 표시, 정답·오답 채점 표시 |
| **B** | DEMO 좌측 분석: 약점 분석 그래프 | 1920×1080 | 토픽별 정답률 막대 그래프, 약점 토픽 하이라이트 |
| **C** | BLEND 1단계: 한국식 풀이 화면 | 1920×1080 | 같은 SAT 문제의 한국식 깨끗한 손풀이 (등호 줄 맞춤) |
| **D** | BLEND 2단계: Desmos 그래프 | 1920×1080 | 같은 함수의 Desmos 그래프 + 영어 한 줄 설명 |
| **E** | (옵션) HOOK 검색 결과창 | 1920×1080 | "Korean tutor SAT" 검색 결과 빈약하게 |

**캡처 가이드**:
- Mathiter 앱 실제 화면 (목업 X)
- 데모 데이터로 깔끔하게 채운 후 캡처
- 1920×1080 정확히 (브라우저 zoom 100%)
- 다크 모드/라이트 모드는 영상 톤에 맞춰 다크 모드 권장

### 5.4 Google Meet 실화면 녹화 — Justin 액션 아이템 ⚡

**시나리오**: 가상의 SAT 수업 5분 녹화 → DEMO 비트 14초 클립 추출

| 단계 | 길이 | 내용 |
|---|---|---|
| 1 | 30s | Meet 시작, 화면 공유 ON, Mathiter 열기 |
| 2 | 1m | 학생 풀이 보고 채점 결과 같이 보기 (커서 움직임 자연스럽게) |
| 3 | 2m | 화이트보드에 손글씨로 풀이 시범 (실시간 그려지는 것이 핵심) |
| 4 | 1m | 약점 분석 그래프 같이 보기, 다음 수업 계획 언급 |
| 5 | 30s | 마무리 |

**도구**: OBS Studio (Mac) 또는 Google Meet 자체 녹화
**해상도**: 1920×1080
**소요**: 약 5분 녹화 + 셋업 10분

### 5.5 Remotion 모션그래픽 컴포넌트 — Claude 작업

| # | 컴포넌트 | 사용 비트 | 입력 props |
|---|---|---|---|
| 1 | `HookSearchOverlay` | 1 · HOOK | searchQuery, resultCount |
| 2 | `TurnTypoSequence` | 2 · TURN | lines[], delay |
| 3 | `ProofCounter` | 3 · PROOF | targets[{value, label, logo}] |
| 4 | `MentorComments` | 5 · MENTOR | comments[{user, text, likes}] |
| 5 | `BlendSplit` | 7 · BLEND | leftImg, rightImg, stampText |
| 6 | `CtaArrow` | 8 · CTA | ctaText, brandLogo |

---

## 6. 카메라 워킹 카탈로그

| 워킹 | 사용 비트 | 디테일 |
|---|---|---|
| **Static** | HOOK 후반, PROOF, MENTOR, CTA | 정지. 자막·모션그래픽만 움직임 |
| **Slow Zoom In 5%** | PIVOT | 10초 동안 천천히 줌인, 감정 강화 |
| **Slight Zoom In** | HOOK 검색창 | 살짝 줌인 (2-3%) |
| **Pan Left→Right** | DEMO | Mathiter 좌측 분석 → 우측 화이트보드 |
| **Split Slide** | BLEND | 화면 좌우 분할 슬라이드 |
| **Cross Fade** | 비트 전환 대부분 | 0.3-0.5s 페이드 |
| **Whip Pan** | PROOF → PIVOT | 빠른 휘프 (0.2s) — 감정 톤 전환 강조 |

---

## 7. AI 영상 프롬프트 상세 (Grok / Veo / Pika)

### Grok Imagine — HOOK 손/키보드

```
Extreme close-up of an Asian parent's hand slowly typing on a backlit laptop
keyboard in a dark home office at 2 AM. Warm orange desk lamp light catches
the metallic keys. The other hand rests near the trackpad, occasionally tapping.
Shallow depth of field — keys in focus, background blurred. Cinematic 16:9.
Mood: tired but determined, late-night search. No face visible.
5 seconds. Subtle ambient room tone, gentle keyboard clicks.
```

### Veo 3.1 Lite — (옵션) 책상 탑샷

```
Top-down shot of a wooden desk at evening. On the left: an open Korean math
workbook with neat handwritten equations (algebra, fractions), pencil resting
on it. In the center: a printed English SAT math worksheet with a word problem
visible. On the right: a tablet screen showing Desmos graphing calculator with
a parabola plotted. Soft golden hour light from a window casts long shadows.
Camera holds still. 5 seconds. 16:9. Photorealistic, no movement of objects.
Ambient evening room sound.
```

### Pika 2.2 — 트랜지션 파티클

```
Soft golden light particles drifting upward across a dark screen, like
gentle fireflies. 2 seconds. Used as a transition between beats. 16:9.
```

---

## 8. 효과음(SFX) 카탈로그

| SFX | 비트 | 소스 추천 |
|---|---|---|
| 키보드 클릭 (저음) | HOOK | Freesound.org "mechanical keyboard typing" |
| 새벽 시계 초침 | HOOK | Freesound.org "wall clock ticking quiet" |
| 검색 실패 단음 | HOOK | Custom synth, low chime |
| 종이 페이지 넘김 | TURN | Freesound.org "page turn paper" |
| 우슈 (PIP 등장) | TURN, BLEND | Epidemic Sound "subtle whoosh" |
| 카운터 틱 | PROOF | Freesound.org "tick counter low" |
| 카운터 도달 chime | PROOF | Epidemic Sound "notification clean" |
| 댓글 ding (낮고 부드럽게) | MENTOR | Custom, Insta 댓글 톤 |
| 채점 완료 chime | DEMO | 위와 다른 톤, 더 따뜻하게 |
| 펜 글씨 쓰는 소리 | DEMO | Freesound.org "pen writing paper" |
| Stamp thud | BLEND | Epidemic Sound "stamp impact" |
| 화살표 미세 chime | CTA | 가장 깔끔한 톤 |

---

## 9. 작업 순서 (Phase 1·2·3)

### Phase 1 — 자산 제작 준비 (1-2일, Claude 주도)

**작업 위치**: `/Users/justinminim4/Youtube/` (기존 YouTube 파이프라인 재활용)
- 신규 하위 경로 예: `Youtube/mathiter-tutoring-video/remotion/` (Phase 1 시작 시 확정)
- 기존 ElevenLabs 코드(`Youtube/src/youtube_history/audio_generation.py`) 재사용
- 기존 Remotion 패턴(`apps/math-video/remotion/`) 참고

- [x] 본 문서 확정 (2026-05-13)
- [ ] Remotion 컴포넌트 6개 코드 작성
- [ ] ElevenLabs VO 합성 (Justin_Park 보이스, Request Stitching 적용)
- [ ] 자막 SRT 2개 (한·영) 생성

### Phase 2 — 실사 자산 촬영 (2-3시간, Justin 주도)
- [ ] AI 영상 생성: Grok HOOK, Veo 책상샷, Pika 파티클 (각 1-2회 이터레이션)
- [ ] PIP 컷 5개 촬영 (#1~#5, 한 번에 연속)
- [ ] Mathiter 화면 캡처 5장 (A~E)
- [ ] Google Meet + Mathiter 실화면 녹화 5분
- [ ] Justin 검토 후 Claude에 자산 인계

### Phase 3 — 합성·렌더 (1일, Claude 주도)
- [ ] Remotion 프로젝트에 모든 에셋 import
- [ ] 비트별 타임라인 구성
- [ ] VO·음악·SFX 믹스
- [ ] 자막 burn-in
- [ ] 최종 1920×1080 mp4 출력
- [ ] (후) 9:16 숏츠 15초 컷 자동 추출
- [ ] 랜딩 hero 임베드 코드 mathiter-homepage 통합

---

## 10. Justin 액션 아이템 체크리스트 ⚡

본 영상 제작에서 박세준 원장이 **직접 해야 할 일** 한눈에:

### 🎬 촬영 (1회)
- [ ] PIP 컷 5개 연속 촬영 (총 약 1분 분량)
- [ ] Google Meet + Mathiter 화면 녹화 5분
- [ ] Mathiter 화면 캡처 5장 (A~E)

### 🎨 AI 영상 생성
- [ ] HOOK 컷1 손/키보드 (Grok Imagine, 4s) — 프롬프트 §4 비트1
- [ ] HOOK 컷2 책상 탑샷 (Veo 3.1 Lite, 3s) — 프롬프트 §4 비트1
- [ ] (옵션) 트랜지션 파티클 (Pika 2.2, 2s × 3)

### 🎵 음악 생성 (Suno AI 또는 Udio)
- [ ] Track 1 (26s) — Lo-fi 피아노 + 미니멀 펄스
- [ ] Track 2 (22s) — 따뜻한 어쿠스틱 피아노 + 스트링
- [ ] Track 3 (30s) — 가벼운 신스 펄스
- [ ] 프롬프트 §2 그대로 사용 가능

### ✅ 검토·승인
- [ ] 본 연출 기획서 확정
- [ ] Phase 1 완료 후 ElevenLabs VO 합성본 검토
- [ ] Phase 3 최종 영상 검토

### 🎵 음악 라이센스 (선택)
- [ ] Epidemic Sound 또는 Artlist 계정 확인 (없으면 무료 음원으로 대체)

---

## 11. 결정 사항 (2026-05-13 확정)

- [x] **음악**: Suno AI / Udio로 주문 제작. 3 트랙 별도 생성 후 cross-fade.
- [x] **HOOK 책상 탑샷**: Veo 3.1 Lite로 생성. HOOK을 2-컷 시퀀스(손/키보드 → 책상 탑샷)로 강화.
- [x] **MENTOR 댓글**: 전부 한국어로 통일.
- [x] **로고 워터마크**: 우측 상단 상시 노출 (적극 브랜딩, §3.5 참조).
- [ ] **CTA 배경 색**: 다크 단색 또는 Mathiter 시그널 컬러 → Phase 1 컴포넌트 설계 단계에서 시안 2종 비교 후 결정.

---

## 12. Related

- v3.5 대본 (이 문서 §4에 통합)
- [[mathiter-tutoring-seo]] — 블로그 SSOT
- [[justin-direction]] — 마케팅 북극성
- [[tts-pipeline]] — ElevenLabs Justin_Park 보이스
- `/Users/justinminim4/mathiter-homepage/content/blog/posts/korea-vs-us-math-daechi-perspective.md` — 본 영상 메시지 원천

---

*Created: 2026-05-13 | Owner: Justin Park · Claude*
