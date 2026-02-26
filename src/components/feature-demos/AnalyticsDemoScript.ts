import { DemoStep } from "./CoachDemoScript";

export const ANALYTICS_STEPS: DemoStep[] = [
  {
    id: "overview",
    duration: 6000,
    caption: {
      en: "Your learning dashboard shows everything at a glance.\nTotal problems, accuracy, study days, and your current streak.",
      ko: "\ud559\uc2b5 \ub300\uc2dc\ubcf4\ub4dc\uc5d0\uc11c \ubaa8\ub4e0 \uac83\uc744 \ud55c\ub208\uc5d0 \ubcf4\uc5ec\uc918\uc694.\n\ud480\uc740 \ubb38\uc81c \uc218, \uc815\ub2f5\ub960, \ud559\uc2b5\uc77c\uc218, \uc5f0\uc18d \ud559\uc2b5 \uae30\ub85d\uae4c\uc9c0.",
      ms: "Papan pemuka pembelajaran menunjukkan segala-galanya sekali imbas.\nJumlah soalan, ketepatan, hari belajar, dan rekod berturut-turut.",
      zh: "\u5b66\u4e60\u4eea\u8868\u76d8\u4e00\u76ee\u4e86\u7136\u3002\n\u603b\u9898\u6570\u3001\u51c6\u786e\u7387\u3001\u5b66\u4e60\u5929\u6570\u3001\u8fde\u7eed\u6253\u5361\u8bb0\u5f55\u3002",
    },
  },
  {
    id: "weekly",
    duration: 7000,
    caption: {
      en: "Weekly progress charts show correct vs. incorrect answers.\nYou can actually see yourself getting better week by week.",
      ko: "\uc8fc\uac04 \uc9c4\ub3c4 \ucc28\ud2b8\uac00 \uc815\ub2f5/\uc624\ub2f5\uc744 \ubcf4\uc5ec\uc918\uc694.\n\ub9e4\uc8fc \ub098\uc544\uc9c0\uace0 \uc788\ub2e4\ub294 \uac8c \ub208\uc73c\ub85c \ubcf4\uc5ec\uc694.",
      ms: "Carta kemajuan mingguan tunjukkan jawapan betul vs salah.\nAnda boleh lihat sendiri peningkatan setiap minggu.",
      zh: "\u6bcf\u5468\u8fdb\u5ea6\u56fe\u8868\u5c55\u793a\u6b63\u786e\u4e0e\u9519\u8bef\u7b54\u6848\u3002\n\u4f60\u80fd\u771f\u5b9e\u770b\u5230\u81ea\u5df1\u6bcf\u5468\u90fd\u5728\u8fdb\u6b65\u3002",
    },
  },
  {
    id: "radar",
    duration: 7000,
    caption: {
      en: "A radar chart maps your ability across every topic.\nInstantly see your strengths and where to focus next.",
      ko: "\ub808\uc774\ub354 \ucc28\ud2b8\uac00 \uc8fc\uc81c\ubcc4 \ub2a5\ub825\uce58\ub97c \ubcf4\uc5ec\uc918\uc694.\n\uac15\uc810\uacfc \uc57d\uc810\uc774 \ub531 \ubcf4\uc774\ub2c8\uae4c, \ub2e4\uc74c\uc5d0 \ubb50 \uacf5\ubd80\ud574\uc57c \ud560\uc9c0 \ubc14\ub85c \uc54c \uc218 \uc788\uc5b4\uc694.",
      ms: "Carta radar memetakan kebolehan anda merentas setiap topik.\nLihat kekuatan anda dan di mana perlu fokus seterusnya.",
      zh: "\u96f7\u8fbe\u56fe\u5c55\u793a\u4f60\u5728\u6bcf\u4e2a\u4e3b\u9898\u7684\u80fd\u529b\u3002\n\u7acb\u523b\u770b\u5230\u4f18\u52bf\u548c\u4e0b\u4e00\u6b65\u8be5\u91cd\u70b9\u653b\u514b\u7684\u65b9\u5411\u3002",
    },
  },
  {
    id: "predicted",
    duration: 7000,
    caption: {
      en: "AI predicts your exam score based on how you learn.\nWatch the number climb as you practice more \u2014 it's real motivation.",
      ko: "AI\uac00 \ud559\uc2b5 \ud328\ud134\uc744 \ubd84\uc11d\ud574\uc11c \uc608\uc0c1 \uc2dc\ud5d8 \uc810\uc218\ub97c \uc608\uce21\ud574\uc694.\n\uc5f0\uc2b5\ud560\uc218\ub85d \uc810\uc218\uac00 \uc62c\ub77c\uac00\ub294 \uac8c \ubcf4\uc5ec\uc11c, \uc9c4\uc9dc \ub3d9\uae30\ubd80\uc5ec\uac00 \ub3fc\uc694.",
      ms: "AI meramal skor peperiksaan berdasarkan cara anda belajar.\nLihat nombor naik setiap kali berlatih \u2014 motivasi sebenar.",
      zh: "AI\u6839\u636e\u4f60\u7684\u5b66\u4e60\u6a21\u5f0f\u9884\u6d4b\u8003\u8bd5\u5206\u6570\u3002\n\u968f\u7740\u7ec3\u4e60\u589e\u52a0\uff0c\u770b\u7740\u5206\u6570\u4e0d\u65ad\u4e0a\u5347\u2014\u2014\u8fd9\u662f\u771f\u6b63\u7684\u52a8\u529b\u3002",
    },
  },
  {
    id: "misconception",
    duration: 7000,
    caption: {
      en: "The system tracks your recurring misconceptions.\nNot just what you got wrong \u2014 but WHY, so you never repeat the same mistake.",
      ko: "\uc2dc\uc2a4\ud15c\uc774 \ubc18\ubcf5\ub418\ub294 \uc624\uac1c\ub150\uc744 \ucd94\uc801\ud574\uc694.\n\ubb50\ub97c \ud2c0\ub838\ub294\uc9c0\uac00 \uc544\ub2c8\ub77c, \u2018\uc65c\u2019 \ud2c0\ub838\ub294\uc9c0\ub97c \uc54c\ub824\uc918\uc11c \uac19\uc740 \uc2e4\uc218\ub97c \ubc18\ubcf5\ud558\uc9c0 \uc54a\uc544\uc694.",
      ms: "Sistem mengesan miskonsepsi berulang anda.\nBukan sekadar apa yang salah \u2014 tetapi MENGAPA, supaya tidak ulangi kesilapan sama.",
      zh: "\u7cfb\u7edf\u8ffd\u8e2a\u4f60\u53cd\u590d\u51fa\u73b0\u7684\u8bef\u89e3\u3002\n\u4e0d\u4ec5\u662f\u54ea\u9519\u4e86\u2014\u2014\u800c\u662f\u4e3a\u4ec0\u4e48\u9519\uff0c\u8ba9\u4f60\u4e0d\u518d\u91cd\u590d\u540c\u6837\u7684\u9519\u8bef\u3002",
    },
  },
];
