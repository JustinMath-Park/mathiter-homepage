import { DemoStep } from "./CoachDemoScript";

export const VIDEOS_STEPS: DemoStep[] = [
  {
    id: "curriculum",
    duration: 6000,
    caption: {
      en: "The student opens the lecture page.\nA curriculum sidebar shows exactly where they are in their learning path.",
      ko: "\ud559\uc0dd\uc774 \uac15\uc758 \ud398\uc774\uc9c0\ub97c \uc5f4\uc5b4\uc694.\n\ucee4\ub9ac\ud058\ub7fc \uc0ac\uc774\ub4dc\ubc14\uc5d0\uc11c \uc9c0\uae08 \uc5b4\ub514\ub97c \ubc30\uc6b0\uace0 \uc788\ub294\uc9c0 \ud55c\ub208\uc5d0 \ubcf4\uc5ec\uc694.",
      ms: "Pelajar membuka halaman kuliah.\nSidebar kurikulum menunjukkan di mana mereka berada dalam laluan pembelajaran.",
      zh: "\u5b66\u751f\u6253\u5f00\u8bfe\u7a0b\u9875\u9762\u3002\n\u8bfe\u7a0b\u5bfc\u822a\u680f\u6e05\u6670\u663e\u793a\u5f53\u524d\u5b66\u4e60\u8fdb\u5ea6\u3002",
    },
  },
  {
    id: "video",
    duration: 7000,
    caption: {
      en: "A short, focused video explains the exact concept they struggled with.\nNot a generic lecture \u2014 it targets their specific mistake.",
      ko: "\ud2c0\ub9b0 \ubd80\ubd84\ub9cc \ucf55 \uc9da\uc5b4\uc11c \uc124\uba85\ud574\uc8fc\ub294 \ub9de\ucda4\ud615 \uc601\uc0c1.\n\ubc94\uc6a9 \uac15\uc758\uac00 \uc544\ub2c8\ub77c, \ub0b4\uac00 \uc2e4\uc218\ud55c \ubd80\ubd84\ub9cc \ucf69 \uc9da\uc5b4\uc11c \uc124\uba85\ud574\uc918\uc694.",
      ms: "Video pendek menjelaskan konsep tepat yang mereka sukar fahami.\nBukan kuliah umum \u2014 ia mensasarkan kesilapan spesifik mereka.",
      zh: "\u4e00\u6bb5\u7b80\u77ed\u7684\u89c6\u9891\u89e3\u91ca\u4ed6\u4eec\u56f0\u60d1\u7684\u786e\u5207\u6982\u5ff5\u3002\n\u4e0d\u662f\u901a\u7528\u8bfe\u7a0b\u2014\u2014\u800c\u662f\u9488\u5bf9\u4ed6\u4eec\u7684\u5177\u4f53\u9519\u8bef\u3002",
    },
  },
  {
    id: "graph",
    duration: 7000,
    caption: {
      en: "The parabola draws itself on screen, vertex and intercepts appear one by one.\nSeeing math come alive makes abstract concepts click.",
      ko: "\ud3ec\ubb3c\uc120\uc774 \ud654\uba74\uc5d0 \uadf8\ub824\uc9c0\uace0, \uaf2d\uc9d3\uc810\uacfc \uc808\ud3b8\uc774 \ud558\ub098\uc529 \ub098\ud0c0\ub098\uc694.\n\uc218\ud559\uc774 \uc0b4\uc544 \uc6c0\uc9c1\uc774\ub294 \uac78 \ubcf4\uba74, \ucd94\uc0c1\uc801\uc778 \uac1c\ub150\uc774 \ub531 \uc774\ud574\ub3fc\uc694.",
      ms: "Parabola melukis sendiri di skrin, verteks dan pintasan muncul satu demi satu.\nMelihat matematik hidup menjadikan konsep abstrak mudah difahami.",
      zh: "\u629b\u7269\u7ebf\u5728\u5c4f\u5e55\u4e0a\u81ea\u52a8\u7ed8\u5236\uff0c\u9876\u70b9\u548c\u622a\u8ddd\u9010\u4e00\u51fa\u73b0\u3002\n\u770b\u5230\u6570\u5b66\u201c\u6d3b\u201d\u8d77\u6765\uff0c\u62bd\u8c61\u6982\u5ff5\u7acb\u523b\u53d8\u5f97\u6e05\u6670\u3002",
    },
  },
  {
    id: "concept",
    duration: 7000,
    caption: {
      en: "Below the video, a step-by-step breakdown of the concept.\nVertex form, key points, x-intercepts \u2014 all clearly organized.",
      ko: "\uc601\uc0c1 \uc544\ub798\uc5d0 \uac1c\ub150\uc744 \ub2e8\uacc4\ubcc4\ub85c \uc815\ub9ac\ud574\uc918\uc694.\n\uaf2d\uc9d3\uc810 \ud615\ud0dc, \ud575\uc2ec \ud3ec\uc778\ud2b8, x\uc808\ud3b8 \u2014 \ubaa8\ub450 \uae54\ub054\ud558\uac8c \uc815\ub9ac\ub3fc \uc788\uc5b4\uc694.",
      ms: "Di bawah video, pecahan langkah demi langkah konsep.\nBentuk verteks, titik utama, pintasan-x \u2014 semua tersusun jelas.",
      zh: "\u89c6\u9891\u4e0b\u65b9\u662f\u6982\u5ff5\u7684\u9010\u6b65\u89e3\u6790\u3002\n\u9876\u70b9\u5f0f\u3001\u5173\u952e\u70b9\u3001x\u622a\u8ddd\u2014\u2014\u5168\u90e8\u6e05\u6670\u6574\u7406\u3002",
    },
  },
  {
    id: "askAI",
    duration: 6000,
    caption: {
      en: "Still confused? Tap 'Ask AI' and type your question.\nThe AI answers based on the exact lecture you're watching.",
      ko: "\uc544\uc9c1 \uc774\ud574\uac00 \uc548 \ub3fc\uc694? 'Ask AI' \ubc84\ud2bc\uc744 \ub204\ub974\uace0 \uc9c8\ubb38\ud558\uba74 \ub3fc\uc694.\nAI\uac00 \uc9c0\uae08 \ubcf4\uace0 \uc788\ub294 \uac15\uc758 \ub0b4\uc6a9\uc744 \uae30\ubc18\uc73c\ub85c \ub2f5\ubcc0\ud574\uc918\uc694.",
      ms: "Masih keliru? Tekan 'Ask AI' dan taip soalan anda.\nAI menjawab berdasarkan kuliah yang sedang ditonton.",
      zh: "\u8fd8\u662f\u4e0d\u61c2\uff1f\u70b9\u51fb\u201cAsk AI\u201d\u8f93\u5165\u95ee\u9898\u3002\nAI\u4f1a\u6839\u636e\u4f60\u6b63\u5728\u89c2\u770b\u7684\u8bfe\u7a0b\u5185\u5bb9\u6765\u56de\u7b54\u3002",
    },
  },
];
