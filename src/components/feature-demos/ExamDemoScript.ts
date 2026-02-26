import { DemoStep } from "./CoachDemoScript";

export const EXAM_STEPS: DemoStep[] = [
  {
    id: "select",
    duration: 6000,
    caption: {
      en: "Choose your exam: Digital SAT, IGCSE, IB, and more.\nPractice under the exact format you'll face on test day.",
      ko: "\uc2dc\ud5d8\uc744 \uc120\ud0dd\ud558\uc138\uc694: Digital SAT, IGCSE, IB \ub4f1.\n\uc2e4\uc81c \uc2dc\ud5d8\uacfc \ub611\uac19\uc740 \ud3ec\ub9f7\uc73c\ub85c \uc5f0\uc2b5\ud574\uc694.",
      ms: "Pilih peperiksaan anda: Digital SAT, IGCSE, IB, dan lagi.\nBerlatih dalam format tepat yang akan dihadapi pada hari peperiksaan.",
      zh: "\u9009\u62e9\u4f60\u7684\u8003\u8bd5\uff1aDigital SAT\u3001IGCSE\u3001IB\u7b49\u3002\n\u5728\u4e0e\u8003\u8bd5\u5b8c\u5168\u76f8\u540c\u7684\u683c\u5f0f\u4e0b\u7ec3\u4e60\u3002",
    },
  },
  {
    id: "exam",
    duration: 7000,
    caption: {
      en: "The real exam interface \u2014 timer, question grid, and calculator.\n44 questions across 2 adaptive modules, just like the actual SAT.",
      ko: "\uc2e4\uc81c \uc2dc\ud5d8 \uc778\ud130\ud398\uc774\uc2a4 \u2014 \ud0c0\uc774\uba38, \ubb38\uc81c \uadf8\ub9ac\ub4dc, \uacc4\uc0b0\uae30.\n2\uac1c \uc801\uc751\ud615 \ubaa8\ub4c8, 44\ubb38\uc81c. \uc2e4\uc81c SAT\uacfc \ub611\uac19\uc544\uc694.",
      ms: "Antara muka peperiksaan sebenar \u2014 pemasa, grid soalan, dan kalkulator.\n44 soalan dalam 2 modul adaptif, sama seperti SAT sebenar.",
      zh: "\u771f\u5b9e\u8003\u8bd5\u754c\u9762\u2014\u2014\u8ba1\u65f6\u5668\u3001\u9898\u76ee\u5bfc\u822a\u3001\u8ba1\u7b97\u5668\u3002\n2\u4e2a\u81ea\u9002\u5e94\u6a21\u5757\uff0c44\u9053\u9898\uff0c\u8ddf\u771f\u5b9eSAT\u4e00\u6837\u3002",
    },
  },
  {
    id: "tools",
    duration: 6000,
    caption: {
      en: "Flag tricky questions, use the built-in calculator, check the reference sheet.\nAll the tools you get on test day, right here.",
      ko: "\uc5b4\ub824\uc6b4 \ubb38\uc81c\ub294 \ud50c\ub798\uadf8\ub85c \ud45c\uc2dc\ud558\uace0, \uacc4\uc0b0\uae30\ub97c \uc0ac\uc6a9\ud558\uace0, \ucc38\uace0 \uc2dc\ud2b8\ub97c \ud655\uc778\ud558\uc138\uc694.\n\uc2dc\ud5d8 \ub2f9\uc77c \uc4f0\ub294 \ubaa8\ub4e0 \ub3c4\uad6c\uac00 \uc5ec\uae30 \uc788\uc5b4\uc694.",
      ms: "Tandakan soalan sukar, guna kalkulator terbina dalam, semak helaian rujukan.\nSemua alat yang anda dapat pada hari peperiksaan, di sini.",
      zh: "\u6807\u8bb0\u96be\u9898\uff0c\u4f7f\u7528\u5185\u7f6e\u8ba1\u7b97\u5668\uff0c\u67e5\u770b\u53c2\u8003\u8868\u3002\n\u8003\u8bd5\u5f53\u5929\u7528\u7684\u6240\u6709\u5de5\u5177\uff0c\u8fd9\u91cc\u90fd\u6709\u3002",
    },
  },
  {
    id: "adaptive",
    duration: 7000,
    caption: {
      en: "After Module 1, the difficulty adapts to your level.\nScored well? Module 2 gets harder. This is exactly how the real SAT works.",
      ko: "\ubaa8\ub4c8 1 \ud6c4, \ub09c\uc774\ub3c4\uac00 \ub0b4 \uc218\uc900\uc5d0 \ub9de\ucdb0 \uc870\uc808\ub3fc\uc694.\n\uc798 \ud480\uc5c8\uc73c\uba74 \ubaa8\ub4c8 2\uac00 \ub354 \uc5b4\ub824\uc6cc\uc838\uc694. \uc2e4\uc81c SAT\uacfc \ub611\uac19\uc740 \ubc29\uc2dd\uc774\uc5d0\uc694.",
      ms: "Selepas Modul 1, kesukaran menyesuaikan mengikut tahap anda.\nSkor baik? Modul 2 jadi lebih susah. Inilah cara SAT sebenar berfungsi.",
      zh: "\u6a21\u5757 1 \u7ed3\u675f\u540e\uff0c\u96be\u5ea6\u4f1a\u6839\u636e\u4f60\u7684\u6c34\u5e73\u8c03\u6574\u3002\n\u8868\u73b0\u597d\uff1f\u6a21\u5757 2 \u4f1a\u66f4\u96be\u3002\u8fd9\u5c31\u662f\u771f\u5b9eSAT\u7684\u65b9\u5f0f\u3002",
    },
  },
  {
    id: "results",
    duration: 7000,
    caption: {
      en: "Get your predicted SAT score instantly.\nTopic breakdown, time analysis, and a list of questions to review.",
      ko: "\uc608\uc0c1 SAT \uc810\uc218\ub97c \ubc14\ub85c \ud655\uc778\ud560 \uc218 \uc788\uc5b4\uc694.\n\uc8fc\uc81c\ubcc4 \ubd84\uc11d, \uc2dc\uac04 \ubd84\uc11d, \ubcf5\uc2b5\ud560 \ubb38\uc81c \ubaa9\ub85d\uae4c\uc9c0.",
      ms: "Dapatkan skor SAT ramalan serta-merta.\nPecahan topik, analisis masa, dan senarai soalan untuk disemak.",
      zh: "\u7acb\u5373\u83b7\u5f97\u9884\u6d4bSAT\u5206\u6570\u3002\n\u4e3b\u9898\u5206\u6790\u3001\u65f6\u95f4\u5206\u6790\u3001\u548c\u5f85\u590d\u4e60\u9898\u76ee\u5217\u8868\u3002",
    },
  },
];
