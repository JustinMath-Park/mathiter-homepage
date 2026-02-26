export interface DemoStep {
  id: string;
  duration: number; // ms to stay on this step
  caption: {
    en: string;
    ko: string;
    ms: string;
    zh: string;
  };
}

export const COACH_STEPS: DemoStep[] = [
  {
    id: "problem",
    duration: 6000,
    caption: {
      en: "The student is solving a test problem.\nSeeing b = −6, they think \"half of 6 is 3, so k = 3!\"",
      ko: "학생이 시험 문제를 풀고 있어요.\nb = −6을 보고 \"절반이 3이니까 k = 3이겠지?\" 하고 풀었는데...",
      ms: "Pelajar sedang menyelesaikan soalan ujian.\nMelihat b = −6, mereka fikir \"separuh 6 ialah 3, jadi k = 3!\"",
      zh: "学生正在解题。\n看到 b = −6，想着\u201c6的一半是3，所以 k = 3！\u201d",
    },
  },
  {
    id: "feedback",
    duration: 6000,
    caption: {
      en: "Wrong — but the AI doesn't just give the answer.\n\"Want to think it through?\" It starts asking questions.",
      ko: "틀렸지만 그냥 답을 알려주지 않아요.\n\"다시 생각해볼래?\" — AI 코치가 질문을 던집니다.",
      ms: "Salah — tetapi AI tidak terus beri jawapan.\n\"Nak cuba fikir semula?\" AI mula bertanya soalan.",
      zh: "答错了——但AI不会直接给答案。\n\u201c要不要再想想？\u201d它开始提问引导。",
    },
  },
  {
    id: "socratic1",
    duration: 7000,
    caption: {
      en: "\"You halved b... but is that what the formula says?\"\nOne precise question helps the student discover the root cause.",
      ko: "\"b를 반으로 나눈 거 아니야?\"\nAI가 핵심을 찌른 질문 하나로 실수의 근본 원인을 스스로 발견하게 도와줘요.",
      ms: "\"Awak bahagi b... tapi betulkah formula itu?\"\nSatu soalan tepat membantu pelajar temui punca kesilapan.",
      zh: "\u201c你把b除以2了……但公式里是这样吗？\u201d\n一个精准的问题，帮助学生自己发现错误根源。",
    },
  },
  {
    id: "socratic2",
    duration: 6000,
    caption: {
      en: "\"(−6)² = 36, not 6 ÷ 2 = 3!\"\nThe student calculates it themselves and discovers their own mistake.",
      ko: "\"(−6)² = 36이지, 6/2 = 3이 아니야!\"\n학생이 직접 계산하면서 자신의 실수를 발견하는 순간이에요.",
      ms: "\"(−6)² = 36, bukan 6 ÷ 2 = 3!\"\nPelajar mengira sendiri dan menemui kesilapan mereka.",
      zh: "\u201c(−6)² = 36，不是 6 ÷ 2 = 3！\u201d\n学生亲自计算，发现了自己的错误。",
    },
  },
  {
    id: "socratic3",
    duration: 7000,
    caption: {
      en: "Got it wrong again? That's okay. The hint gently nudges:\n\"36 ÷ 4 = ?\" — solving it yourself makes it stick.",
      ko: "또 틀려도 괜찮아요. 힌트가 살짝 도와주니까.\n\"36 ÷ 4 = ?\" — 직접 계산해서 맞춘 거라 오래 기억에 남아요.",
      ms: "Salah lagi? Tak apa. Petunjuk bantu sedikit:\n\"36 ÷ 4 = ?\" — selesai sendiri supaya lebih ingat.",
      zh: "又错了？没关系。提示轻轻引导：\n\u201c36 ÷ 4 = ？\u201d——自己算出来的答案记得更牢。",
    },
  },
  {
    id: "visualNudge",
    duration: 8000,
    caption: {
      en: "After discovering it through questions, the Visual Nudge\nshows the full solution at a glance. Now you see exactly where you went wrong.",
      ko: "질문으로 스스로 깨달은 뒤,\n전체 풀이를 한눈에 정리해주는 Visual Nudge.\n\"내가 어디서 틀렸는지\" 정확히 보이니까 다음엔 안 틀려요.",
      ms: "Selepas faham melalui soalan, Visual Nudge\ntunjukkan penyelesaian penuh. Kini jelas di mana kesilapan berlaku.",
      zh: "通过问题自己领悟之后，\nVisual Nudge 将完整解题过程一目了然地展示。\n清楚看到\u201c哪里出错了\u201d，下次不会再犯。",
    },
  },
  {
    id: "retry",
    duration: 6000,
    caption: {
      en: "This time, they got it right! They solved the problem they got wrong — on their own.\nThe AI coach didn't give the answer. It just guided with questions.",
      ko: "이번엔 맞췄어요! 틀렸던 문제를 스스로 해결했으니까요.\nAI 코치는 답을 알려주지 않았고, 질문만으로 이끌어줬을 뿐이에요.",
      ms: "Kali ini betul! Mereka selesaikan soalan yang salah — sendiri.\nAI coach tak beri jawapan. Hanya bimbing dengan soalan.",
      zh: "这次答对了！自己解决了之前做错的题目。\nAI教练没有给答案，只是用问题引导而已。",
    },
  },
  {
    id: "result",
    duration: 7000,
    caption: {
      en: "Fixing mistakes earns XP and collection cards.\nThe process of correcting errors IS the learning.\nThe more you stumble, the stronger you get.",
      ko: "틀린 문제를 해결하면 XP와 컬렉션 카드를 획득해요.\n실수를 고치는 과정 자체가 성장이 되는 학습 시스템.\n틀리면 틀릴수록 더 강해져요.",
      ms: "Betulkan kesilapan, dapat XP dan kad koleksi.\nProses membetulkan kesilapan ITULAH pembelajaran.\nLebih banyak tersalah, lebih kuat anda jadi.",
      zh: "改正错误可获得XP和收集卡。\n纠错的过程本身就是成长。\n错得越多，变得越强。",
    },
  },
];

export const TOTAL_LOOP_DURATION = COACH_STEPS.reduce((sum, s) => sum + s.duration, 0);
