---
id: sat-math-800-korean-traps
slug: sat-math-800-korean-traps
locale: ko
title: 'SAT 수학 800점 — 한국 학생이 자주 틀리는 5가지 함정'
description: >-
  한국에서 수학을 잘하던 아이가 SAT Math만 보면 800이 안 나오는 이유. 8년간 국제학교 학생을 1:1로 가르치며 본 5가지 함정과
  800점 학생들의 공통 풀이 패턴을 정리했습니다.
excerpt: >-
  한국에서 수학 1등급, SAT Math는 720. 8년간 국제학교 학생을 가르치며 본 5가지 함정 — 어휘, 문장 해독, Desmos, 간접
  질문, 단위·표 해석.
heroImage: /blog/heroes/sat-math-800-korean-traps.svg
category: sat
tags:
  - SAT
  - SAT Math
  - SAT 수학 과외
  - SAT 800점
  - 한국 학생 SAT
persona: 2
author:
  name: 박세준
  bio: Mathiter 창업자 · 8년 국제학교 수학 전담 · 두 자녀를 해외 국제학교에서 양육 중
  photo: /team/park-sejun.jpg
publishedAt: '2026-05-12'
updatedAt: '2026-05-12'
status: published
showOnTutoring: true
showOnHome: true
readingTime: 11
canonicalSlug: sat-math-800-korean-traps
---
> "한국에서는 수학 1등급이었는데, SAT Math만 보면 720에서 멈춰요. 수학을 못하는 것도 아닌데, 도대체 80점이 어디로 사라지는 걸까요."

학부모 상담에서 정말 자주 듣는 말입니다. 저도 한국에서 초·중·고 12년을 보내고 대치동에서 수학을 공부했기에, '수학을 잘한다'는 말의 의미를 잘 압니다. 그런데 8년간 국제학교 학생을 1:1로 지도하며 깨달은 게 있습니다. 한국에서 잘하던 아이가 <strong>SAT 수학 800 만점</strong>을 놓치는 이유는, 대부분 '수학 실력'이 아니라 그 옆에 있는 무언가 때문이라는 사실입니다.

![Digital SAT 모의 시험을 풀고 있는 한국 고등학생 — 노트북 + 메모지 + 시간 압박](/blog/photos/sat-math-800-korean-traps-1.png)

## SAT 수학 800점은 '수학 실력 + α'입니다

Digital SAT[^dsat]의 수학 영역은 총 44문항, 70분, 두 개의 모듈로 구성됩니다. 첫 모듈 성적에 따라 두 번째 모듈 난이도가 달라지는 적응형 시험[^adaptive]이라, 모듈 1을 잘 풀어야 800이 가능한 모듈 2로 넘어갑니다. 즉 초반 22문항에서 실수 한두 개가 점수 천장을 결정하는 구조입니다.

출제 영역은 Algebra 35%, Advanced Math 35%, Problem-Solving and Data Analysis[^psda] 15%, Geometry and Trigonometry 15%로 College Board[^cb]가 공식 발표한 비중입니다. 한국 고등수학으로 치면 이차함수·일차연립·통계·삼각비 정도의 범위 안에 있고, 실제로 한국에서 중3–고1 수준의 수학을 끝낸 학생이라면 '수학 내용 자체'로는 거의 부족하지 않습니다.

그런데도 점수가 안 나옵니다. 제가 8년간 <strong>SAT Math 800점</strong>을 받은 학생을 다수 배출하면서 본 패턴은 분명합니다. 한국식 수학 교육에 잘 적응한 학생일수록, 영어 시험의 미세한 함정에 더 잘 빠집니다. 아래 다섯 가지가 가장 흔한 함정입니다.

## 한국 학생이 자주 틀리는 5가지 함정

### 함정 1 – 영어 수학 어휘 미스매치

한국 학생이 가장 빨리 점수를 잃는 곳은 어휘입니다. 'integer'와 'whole number'를 같은 것으로 알고 푸는 학생이 정말 많습니다. integer는 음수를 포함한 정수($\dots,-2,-1,0,1,2,\dots$)이고 whole number는 0과 양의 정수만 가리킵니다. 'evaluate $f(3)$'과 'solve $f(x)=3$'을 구분 못해서 같은 절차로 풀다가 답을 놓치는 학생도 있습니다.

유사 유형 예제 한 개 (실제 시험과 동일하게 영어 원문 그대로):

> *If $f(x) = 2x^2 - 5$, what is the sum of all integer values of $x$ for which $f(x) = 27$?*

이 문제에서 한국 학생들이 자주 놓치는 단어는 <strong>'all'</strong>입니다. 영어를 빠르게 읽으면 'integer values'까지만 눈에 들어와 양의 해 $x = 4$만 적고 4를 답으로 적습니다. 또는 'sum'을 함수값들의 합으로 잘못 해석해 $f(4) = 27$ 같은 값을 적기도 합니다. 정답은 $2x^2 - 5 = 27$에서 $x = \pm 4$, **'all'** integer values이므로 $-4 + 4 = 0$.

수학 자체는 한국 학생 전원이 풀 수 있는 문제입니다. 영어 한 단어를 놓쳐서 점수가 깎이는 거죠. 800점 학생들은 풀이 시작 전 문제에서 어휘 한 줄을 다시 봅니다. 'integer / positive / sum / value / which of the following / all'에 동그라미부터 칩니다.

### 함정 2 – 영어 문장을 식으로 옮기는 단계

워드 프로블럼[^word]에서 한국 학생이 가장 자주 무너지는 지점입니다. 한국 교과서의 응용문제는 문장이 짧고 정형화되어 있지만, SAT 문장은 의도적으로 길고 한 줄에 두 개의 조건이 섞입니다.

유사 유형 예제 (영어 원문):

> *A store sells boxes containing apples and pears. Each box has 24 fruits in total. Apples cost \$1.50 each and pears cost \$2.00 each. If one box costs \$42.00, how many pears are in each box?*

영어 문장 한 단락 안에 정보 네 가지(과일 종류 2개·총 개수 24·단가 2종·총가 \$42)가 압축되어 있습니다. 한국 학생들은 보통 'apples and pears'에서 한번 멈칫하고, '\$1.50'과 '\$2.00'이 나오면 곧바로 계산기를 두드리려 합니다. 그러다 시간이 빠지고 마지막 'how many pears'를 보고 다시 처음부터 읽는 식입니다. 800점 학생들은 문제를 **끝까지** 읽은 다음 옆 여백에 $a + b = 24$와 $1.5a + 2b = 42$ 두 식을 거의 동시에 적고 풀이를 시작합니다.

저는 학생에게 '문장을 다 읽기 전엔 숫자를 만지지 마라'고 늘 강조합니다. 식이 먼저, 계산은 나중입니다.

### 함정 3 – Desmos를 손계산으로 대체하려는 고집

Digital SAT의 가장 큰 변화는 시험 화면에 Desmos[^desmos] 그래핑 계산기가 내장됐다는 점입니다. 두 식의 교점, 이차식 꼭짓점, 부등식 영역, 평균·중앙값 함수까지 거의 모두 Desmos로 30초 안에 풀 수 있습니다.

그런데 한국에서 손계산과 암산으로 훈련된 학생일수록 이걸 안 씁니다. '계산기는 약하다'는 자존심도 있고, Desmos 조작이 어색하기도 합니다. 결국 풀이 시간은 두 배가 되고 모듈 1 후반에서 시간이 모자라 실수합니다.

유사 유형 예제 (영어 원문):

> *What is the sum of the $x$-coordinates of the two intersection points of the line $y = -2x + 7$ and the parabola $y = x^2 - 4x + 3$?*

손으로 풀면 두 식을 같다 두고 $x^2 - 2x - 4 = 0$을 세운 뒤 근과 계수의 관계로 답을 구해야 합니다. Desmos에 두 식을 입력하면 교점 두 개가 회색 점으로 자동 표시되고, 점을 클릭하기만 하면 좌표가 즉시 뜹니다. 30초입니다. 800점 학생들은 두 가지 풀이를 모두 갖고 있되, 시험장에서는 빠른 쪽을 고릅니다. 무엇이 더 빠른지는 평소 훈련에서 결정됩니다.

### 함정 4 – 'Which of the following could be ...' 류 간접 질문

SAT는 직접 답을 묻기보다 '다음 중 ~일 수 있는 것은?' 식으로 묻습니다. 한국 학생은 'could be'를 'must be'처럼 해석해 보기 한 개만 맞으면 답으로 고르는 경우가 많습니다.

유사 유형 예제 (영어 원문):

> *If $n$ is an integer and $n^2$ is even, which of the following must be true?*
>
> *(A) $n$ is even*
> *(B) $n$ is odd*
> *(C) $n$ is a multiple of 4*
> *(D) $n$ is negative*

핵심 단어는 <strong>'must be true'</strong>입니다. SAT는 'could be true'(가능한 것)를 묻기도 하고 'must be true'(반드시 참인 것)를 묻기도 합니다. 한국 학생들은 이 둘을 빠르게 같은 것으로 처리해 한 케이스만 확인하고 답을 고릅니다. $n=2$로 시도해 $n^2=4$가 짝수이므로 (A) — 답은 맞습니다. 하지만 풀이 과정에 'must'에 대한 검증이 빠져 있습니다. 800점 학생들은 'must'를 표시하고 대우 추론을 마지막에 한 줄 적습니다 — '$n$이 홀수면 $n^2$도 홀수, 그러므로 $n^2$이 짝수면 $n$은 **반드시** 짝수'. 같은 문제 패턴이 'could be'로 출제될 때도 같은 사고가 작동합니다.

### 함정 5 – 단위·표·그래프 해석 실수

Problem-Solving and Data Analysis 영역은 한국 학생이 가장 만만하게 보지만 가장 자주 틀리는 영역입니다. 평균과 중앙값, 단위 환산, 표·산점도 해석이 핵심입니다.

유사 유형 예제 (영어 원문):

> *In a city, the daily mean rainfall in May (31 days) was 4 mm. After 30 days of June data were added, the daily mean rainfall over the two months combined became 7 mm. What was the daily mean rainfall in June?*

핵심 함정은 <strong>'daily mean'을 단순 평균으로 처리하는 것</strong>입니다. 한국 학생들은 자주 $(4 + x) / 2 = 7$로 풀어서 $x = 10$을 답합니다. 그러나 두 달의 일수가 다르므로 가중평균 $(31 \times 4 + 30 \times x) / 61 = 7$로 풀어야 합니다 — 정답은 $x \approx 10.1$. 'mean'과 'median'을 빠르게 읽다가 혼동하는 사례도 많습니다. 'typical value'라는 단어가 보이면 보통 중앙값을 묻는 신호입니다.

800점 학생들은 표나 그래프 문제를 만나면 항상 단위·축 라벨·제목·기간을 먼저 손가락으로 짚고 시작합니다.

## 800점 학생들의 공통 풀이 패턴

8년간 SAT 800점 학생을 다수 가르치며 본 공통점은 세 가지입니다.

첫째, **문제를 다 읽기 전에는 풀지 않습니다**. 마지막 줄에 'integer', 'positive', 'sum'이 있는 경우가 너무 많기 때문입니다.

둘째, **풀이를 두 가지 이상 갖고 있습니다**. 손계산과 Desmos, 대수적 풀이와 그래프 풀이를 모두 알고 시험장에서 빠른 쪽을 고릅니다.

셋째, **모듈 1에 80% 에너지를 씁니다**. 적응형 시험의 구조상 모듈 1이 천장을 결정한다는 사실을 알고, 모듈 1에서 한 문항도 흘리지 않으려 합니다. 800점이 가능한 모듈 2를 받은 다음에는 모듈 2를 차분히 마무리합니다.

![1:1 SAT 과외 — 틀린 문항을 빨간 펜으로 함께 분석하는 장면](/blog/photos/sat-math-800-korean-traps-2.png)

## 제가 가르친 한 학생의 사례 – 720에서 800까지

제가 가르친 한 고2 학생은 한국 SKY 수준의 수학 실력을 갖고 있었지만 SAT Math는 720에서 멈춰 있었습니다. 첫 진단에서 본 문제는 분명했습니다. 영어 어휘에서 'integer'와 'positive'를 놓치고, 'which of the following could'를 빠르게 읽어 넘기고, Desmos는 거의 쓰지 않고 손으로만 풀고 있었습니다.

저희는 두 달간 세 가지만 훈련했습니다. (1) 어휘 카드 60개, (2) Desmos로 15가지 표준 풀이, (3) 문제를 다 읽고 식을 먼저 쓰는 습관. 그 다음 시험에서 760, 그다음 시험에서 800. 수학 실력은 그대로였습니다. 시험을 푸는 방식이 바뀌었을 뿐입니다.

또 한 학생은 한국 국제학교에서 학교 성적은 A를 받지만 SAT만 보면 750에서 멈췄습니다. 이 친구는 Word problem에서 식을 세 줄 안에 정리하지 못했습니다. 영어 문장을 한국어로 직역한 다음 식을 세우려다 보니 시간을 다 썼습니다. 8주간 'read once, translate once, solve once' 원칙으로 훈련했고, 결국 800에 닿았습니다.

[Mathiter Tutoring의 1:1 SAT 수학 과외](/ko/tutoring)는 이런 식의 '한국 학생 specific 함정'에 맞춰진 커리큘럼을 운영합니다. 한국식 수학 어휘에 익숙한 학생이 영어 시험에서 어떻게 무너지는지를 8년간 직접 봤기에 가능한 진단입니다.

## 이번 달 안에 점검할 3가지

자녀의 SAT 수학 점수가 800에 닿지 않는다면 다음 세 가지를 이번 달 안에 확인해 보세요.

1. **영어 수학 어휘 60개 자가 진단** – integer, whole number, positive, evaluate, simplify, sum, product, mean, median, mode, range, slope, intercept, vertex, integer solution, rational, irrational 등이 한국어 정의 없이 영어 그대로 떠오르는지.
2. **Desmos 표준 풀이 15가지** – 두 식의 교점, 이차식 꼭짓점, 부등식 영역, mean·median·stdev 함수, 슬라이더로 미지수 처리. desmos.com/practice의 College Board 인터페이스로 직접 풀어보면 됩니다.
3. **모의 한 회 분석** – 가장 최근 모의 결과를 펴고 틀린 문항을 다음 네 분류로 나눠보세요. 어휘 실수 / 문장 해독 실수 / 계산 실수 / 개념 실수. 자녀가 어디서 점수를 잃는지가 분명해집니다. 보통 한 분류가 절반 이상을 차지합니다.

수학을 못해서 800이 안 나오는 게 아닙니다. 시험을 푸는 방식이 한국식에 머물러 있어서 안 나오는 겁니다. 그리고 그 방식은 두 달이면 바뀝니다.

> SAT 수학 800점이 안 나오는 자녀의 풀이를 직접 보면 어디서 점수가 새는지 30분 안에 진단할 수 있습니다. <strong>Mathiter Tutoring</strong>에서 30분 무료 상담을 진행합니다. 8년간 SAT 만점·AP BC 5점 학생을 다수 배출한 제가 직접 자녀의 최근 모의 결과를 같이 봐 드립니다.
>
> [👉 무료 30분 상담 신청 →](/ko/tutoring)
>
> *영업시간 1시간 이내 회신 · 1회 시범 수업 후 결정*

[^dsat]: **Digital SAT** — 2024년 College Board가 종이 시험을 대체한 디지털 적응형 SAT. 시험 시간이 약 2시간 14분으로 단축되고 시험 화면 내에서 풀이가 진행됩니다.

[^adaptive]: **Adaptive testing** — 적응형 시험. 모듈 1의 성적에 따라 모듈 2의 난이도가 결정되는 방식. 모듈 1에서 좋은 성적을 받아야 800점이 가능한 모듈 2로 진입합니다.

[^psda]: **Problem-Solving and Data Analysis** — Digital SAT 수학의 4대 영역 중 하나. 비율·비례·퍼센트·단위 환산·표·그래프·평균/중앙값 등 데이터 해석 문제를 포함합니다.

[^cb]: **College Board** — SAT·AP·PSAT 등을 주관하는 미국의 비영리 교육 기관. 시험 구조와 출제 비중을 공식 발표합니다.

[^word]: **Word problem** — 영어 문장으로 상황이 서술된 응용 문제. SAT Math에서 가장 많은 학생이 시간을 잃는 유형으로, 영어 문장을 식으로 옮기는 단계에서 실수가 자주 발생합니다.

[^desmos]: **Desmos** — Digital SAT 시험 화면에 내장된 그래핑 계산기. 별도 설치 없이 시험 중 사용 가능하며, 두 식의 교점·이차식 꼭짓점·평균/중앙값 함수까지 지원합니다. desmos.com/practice에서 실제 시험과 동일한 인터페이스로 연습할 수 있습니다.
