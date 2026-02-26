import { DemoStep } from "./CoachDemoScript";

export const GAMIFICATION_STEPS: DemoStep[] = [
  {
    id: "xp",
    duration: 6000,
    caption: {
      en: "Every problem you solve earns XP.\nWatch your level climb from Beginner to Champion.",
      ko: "\ubb38\uc81c\ub97c \ud480 \ub54c\ub9c8\ub2e4 XP\ub97c \ud68d\ub4dd\ud574\uc694.\nBeginner\uc5d0\uc11c Champion\uae4c\uc9c0, \ub808\ubca8\uc774 \uc62c\ub77c\uac00\ub294 \uc7ac\ubbf8\ub97c \ub290\uaef4\ubcf4\uc138\uc694.",
      ms: "Setiap soalan yang diselesaikan memberi XP.\nLihat tahap anda naik dari Beginner ke Champion.",
      zh: "\u6bcf\u89e3\u4e00\u9053\u9898\u90fd\u80fd\u83b7\u5f97XP\u3002\n\u770b\u7740\u81ea\u5df1\u4ece\u65b0\u624b\u5347\u7ea7\u5230\u51a0\u519b\u3002",
    },
  },
  {
    id: "streak",
    duration: 6000,
    caption: {
      en: "Keep your streak alive! 7 days in a row and counting.\nThe weekly attendance grid makes you not want to break the chain.",
      ko: "\uc5f0\uc18d \ud559\uc2b5 \uae30\ub85d\uc744 \uc774\uc5b4\uac00\uc138\uc694! \ubcc4\uc368 7\uc77c\uc9f8.\n\uc8fc\uac04 \ucd9c\uc11d \uadf8\ub9ac\ub4dc\ub97c \ubcf4\uba74 \ub04a\uace0 \uc2f6\uc9c0 \uc54a\uc544\uc838\uc694.",
      ms: "Kekalkan rekod berturut-turut anda! 7 hari dan terus.\nGrid kehadiran mingguan buat anda tak mahu putus rantaian.",
      zh: "\u4fdd\u6301\u8fde\u7eed\u6253\u5361\uff01\u5df2\u7ecf\u8fde\u7eed7\u5929\u4e86\u3002\n\u6bcf\u5468\u51fa\u52e4\u8868\u8ba9\u4f60\u4e0d\u60f3\u4e2d\u65ad\u3002",
    },
  },
  {
    id: "cards",
    duration: 7000,
    caption: {
      en: "Overcome mistakes to collect cards \u2014 Bronze, Silver, Gold, Diamond.\nEach card represents a misconception you've conquered.",
      ko: "\uc2e4\uc218\ub97c \uadf9\ubcf5\ud558\uba74 \uce74\ub4dc\ub97c \ud68d\ub4dd\ud574\uc694 \u2014 \ube0c\ub860\uc988, \uc2e4\ubc84, \uace8\ub4dc, \ub2e4\uc774\uc544\ubaac\ub4dc.\n\uac01 \uce74\ub4dc\ub294 \ub0b4\uac00 \uc815\ubcf5\ud55c \uc624\uac1c\ub150\uc744 \ub098\ud0c0\ub0b4\uc694.",
      ms: "Atasi kesilapan untuk kumpul kad \u2014 Gangsa, Perak, Emas, Berlian.\nSetiap kad mewakili miskonsepsi yang anda telah takluki.",
      zh: "\u514b\u670d\u9519\u8bef\u6536\u96c6\u5361\u7247\u2014\u2014\u94dc\u3001\u94f6\u3001\u91d1\u3001\u94bb\u77f3\u3002\n\u6bcf\u5f20\u5361\u4ee3\u8868\u4f60\u5df2\u7ecf\u5f81\u670d\u7684\u4e00\u4e2a\u8bef\u89e3\u3002",
    },
  },
  {
    id: "avatar",
    duration: 6000,
    caption: {
      en: "Level up your avatar as you learn.\nYour character grows with every study session.",
      ko: "\ud559\uc2b5\ud558\uba74\uc11c \uc544\ubc14\ud0c0\ub97c \uc131\uc7a5\uc2dc\ucf1c\uc694.\n\uacf5\ubd80\ud560\uc218\ub85d \ub0b4 \uce90\ub9ad\ud130\uac00 \uac19\uc774 \uc131\uc7a5\ud574\uc694.",
      ms: "Naik taraf avatar anda sambil belajar.\nWatak anda berkembang dengan setiap sesi belajar.",
      zh: "\u968f\u7740\u5b66\u4e60\u5347\u7ea7\u4f60\u7684\u5934\u50cf\u3002\n\u4f60\u7684\u89d2\u8272\u968f\u7740\u6bcf\u6b21\u5b66\u4e60\u5171\u540c\u6210\u957f\u3002",
    },
  },
  {
    id: "badges",
    duration: 6000,
    caption: {
      en: "Earn badges for milestones \u2014 first streak, high score, daily missions.\nEvery achievement is a reminder of how far you've come.",
      ko: "\ub9c8\uc77c\uc2a4\ud1a4\uc744 \ub2ec\uc131\ud558\uba74 \ubc43\uc9c0\ub97c \ud68d\ub4dd\ud574\uc694.\n\ubaa8\ub4e0 \uc131\ucde8\uac00 \ub0b4\uac00 \uc5bc\ub9c8\ub098 \uc131\uc7a5\ud588\ub294\uc9c0\ub97c \ubcf4\uc5ec\uc918\uc694.",
      ms: "Raih lencana untuk pencapaian \u2014 rekod pertama, skor tinggi, misi harian.\nSetiap pencapaian mengingatkan betapa jauh anda telah maju.",
      zh: "\u8fbe\u6210\u91cc\u7a0b\u7891\u83b7\u5f97\u5fbd\u7ae0\u2014\u2014\u9996\u6b21\u8fde\u7eed\u3001\u9ad8\u5206\u3001\u6bcf\u65e5\u4efb\u52a1\u3002\n\u6bcf\u4e2a\u6210\u5c31\u90fd\u63d0\u9192\u4f60\u8d70\u4e86\u591a\u8fdc\u3002",
    },
  },
];
