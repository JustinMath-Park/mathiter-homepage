import { DemoStep } from "./CoachDemoScript";

export const DASHBOARD_STEPS: DemoStep[] = [
  {
    id: "overview",
    duration: 6000,
    caption: {
      en: "Teachers see their entire class at a glance.\nStudent count, average accuracy, levels, and weekly activity.",
      ko: "\uc120\uc0dd\ub2d8\uc774 \ubc18 \uc804\uccb4\ub97c \ud55c\ub208\uc5d0 \ud30c\uc545\ud560 \uc218 \uc788\uc5b4\uc694.\n\ud559\uc0dd \uc218, \ud3c9\uade0 \uc815\ub2f5\ub960, \ub808\ubca8, \uc8fc\uac04 \ud65c\ub3d9\ub7c9\uae4c\uc9c0.",
      ms: "Guru melihat seluruh kelas sekali imbas.\nJumlah pelajar, ketepatan purata, tahap, dan aktiviti mingguan.",
      zh: "\u8001\u5e08\u4e00\u773c\u770b\u5230\u6574\u4e2a\u73ed\u7ea7\u3002\n\u5b66\u751f\u6570\u3001\u5e73\u5747\u51c6\u786e\u7387\u3001\u7b49\u7ea7\u3001\u5468\u6d3b\u52a8\u91cf\u3002",
    },
  },
  {
    id: "student",
    duration: 7000,
    caption: {
      en: "Click any student to see their full learning profile.\nStreak, accuracy, problem count \u2014 everything teachers need to support each student.",
      ko: "\ud559\uc0dd\uc744 \ud074\ub9ad\ud558\uba74 \uc804\uccb4 \ud559\uc2b5 \ud504\ub85c\ud544\uc744 \ubcfc \uc218 \uc788\uc5b4\uc694.\n\uc5f0\uc18d\uc77c, \uc815\ub2f5\ub960, \ubb38\uc81c \uc218 \u2014 \ud559\uc0dd\uc744 \ub3c4\uc640\uc8fc\ub294 \ub370 \ud544\uc694\ud55c \ubaa8\ub4e0 \uc815\ubcf4.",
      ms: "Klik mana-mana pelajar untuk lihat profil pembelajaran penuh.\nRekod, ketepatan, jumlah soalan \u2014 semua yang guru perlu untuk menyokong setiap pelajar.",
      zh: "\u70b9\u51fb\u4efb\u4e00\u5b66\u751f\u67e5\u770b\u5b8c\u6574\u5b66\u4e60\u6863\u6848\u3002\n\u8fde\u7eed\u5929\u6570\u3001\u51c6\u786e\u7387\u3001\u505a\u9898\u6570\u2014\u2014\u8001\u5e08\u652f\u6301\u6bcf\u4e2a\u5b66\u751f\u6240\u9700\u7684\u4e00\u5207\u3002",
    },
  },
  {
    id: "assignment",
    duration: 7000,
    caption: {
      en: "Create assignments in seconds \u2014 pick from the question bank or let AI choose.\nAutomatic grading saves hours of manual work every week.",
      ko: "\uacfc\uc81c\ub97c \ucd08 \ub9cc\uc5d0 \ub9cc\ub4e4 \uc218 \uc788\uc5b4\uc694 \u2014 \ubb38\uc81c \uc740\ud589\uc5d0\uc11c \uc120\ud0dd\ud558\uac70\ub098 AI\uac00 \ucd94\ucc9c.\n\uc790\ub3d9 \ucc44\uc810\uc73c\ub85c \ub9e4\uc8fc \uc218\uc2dc\uac04\uc758 \uc218\uc791\uc5c5\uc744 \uc808\uc57d\ud574\uc694.",
      ms: "Buat tugasan dalam beberapa saat \u2014 pilih dari bank soalan atau biar AI pilih.\nPemarkahan automatik jimat berjam-jam kerja manual setiap minggu.",
      zh: "\u79d2\u9020\u4f5c\u4e1a\u2014\u2014\u4ece\u9898\u5e93\u9009\u62e9\u6216\u8ba9AI\u63a8\u8350\u3002\n\u81ea\u52a8\u8bc4\u5206\u6bcf\u5468\u8282\u7701\u6570\u5c0f\u65f6\u624b\u52a8\u5de5\u4f5c\u3002",
    },
  },
  {
    id: "results",
    duration: 7000,
    caption: {
      en: "See every student's results in a clear O/X table.\nExport to Excel with one click for school reports.",
      ko: "\ubaa8\ub4e0 \ud559\uc0dd\uc758 \uacb0\uacfc\ub97c O/X \ud45c\ub85c \ud55c\ub208\uc5d0.\n\ud55c \ubc88\uc758 \ud074\ub9ad\uc73c\ub85c \uc5d1\uc140 \ub0b4\ubcf4\ub0b4\uae30. \uc131\uc801 \ubcf4\uace0\uc11c\ub3c4 \uac04\ub2e8\ud558\uc8e0.",
      ms: "Lihat keputusan setiap pelajar dalam jadual O/X yang jelas.\nEksport ke Excel dengan satu klik untuk laporan sekolah.",
      zh: "\u6e05\u6670\u7684O/X\u8868\u683c\u5c55\u793a\u6bcf\u4e2a\u5b66\u751f\u7684\u7ed3\u679c\u3002\n\u4e00\u952e\u5bfc\u51faExcel\uff0c\u5b66\u6821\u62a5\u544a\u8f7b\u677e\u641e\u5b9a\u3002",
    },
  },
  {
    id: "parent",
    duration: 6000,
    caption: {
      en: "Parents track their child's progress in real time.\nXP growth, ability trends, and what they're learning this week.",
      ko: "\ud559\ubd80\ubaa8\ub2d8\uc774 \uc2e4\uc2dc\uac04\uc73c\ub85c \uc790\ub140\uc758 \ud559\uc2b5 \uc9c4\ub3c4\ub97c \ud655\uc778\ud560 \uc218 \uc788\uc5b4\uc694.\nXP \uc131\uc7a5, \ub2a5\ub825 \ucd94\uc774, \uc774\ubc88 \uc8fc \ud559\uc2b5 \ub0b4\uc6a9\uae4c\uc9c0.",
      ms: "Ibu bapa jejak kemajuan anak mereka secara masa nyata.\nPertumbuhan XP, trend kebolehan, dan apa yang dipelajari minggu ini.",
      zh: "\u5bb6\u957f\u5b9e\u65f6\u8ffd\u8e2a\u5b69\u5b50\u7684\u5b66\u4e60\u8fdb\u5ea6\u3002\nXP\u589e\u957f\u3001\u80fd\u529b\u8d8b\u52bf\u3001\u672c\u5468\u5b66\u4e60\u5185\u5bb9\u3002",
    },
  },
];
