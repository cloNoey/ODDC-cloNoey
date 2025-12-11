import type { ClassSchedule } from "@/types";

/**
 * Mock 클래스 일정 데이터
 * 백엔드 스키마와 정확히 일치
 * server/features/dance_class/models.py Class 모델 참고
 */
export const mockClasses: ClassSchedule[] = [
  // 1MILLION (studio-001) - 2025-12-15
  {
    class_id: "class-001",
    studio_id: "studio-001",
    class_date: "2025-12-15",
    start_time: "10:00",
    genre: "HIPHOP",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-001",
        main_name: "김지은",
        instagram: "jieun_kim",
      },
    ],
  },
  {
    class_id: "class-002",
    studio_id: "studio-001",
    class_date: "2025-12-15",
    start_time: "14:00",
    genre: "POPPING",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-002",
        main_name: "이민호",
        instagram: "minho_pop",
      },
    ],
  },
  {
    class_id: "class-003",
    studio_id: "studio-001",
    class_date: "2025-12-15",
    start_time: "19:00",
    genre: "CHOREOGRAPHY",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-024",
        main_name: "1DON",
        instagram: "1don_official",
      },
    ],
  },
  {
    class_id: "class-004",
    studio_id: "studio-001",
    class_date: "2025-12-15",
    start_time: "21:00",
    genre: "LOCKING",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-003",
        main_name: "박준서",
        instagram: "junsu_lock",
      },
    ],
  },

  // 1MILLION (studio-001) - 2025-12-16
  {
    class_id: "class-005",
    studio_id: "studio-001",
    class_date: "2025-12-16",
    start_time: "11:00",
    genre: "GIRLS_HIPHOP",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-004",
        main_name: "최서연",
        instagram: "seoyeon_ghh",
      },
    ],
  },
  {
    class_id: "class-006",
    studio_id: "studio-001",
    class_date: "2025-12-16",
    start_time: "15:00",
    genre: "BREAKING",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-005",
        main_name: "정하늘",
        instagram: "haneul_breaking",
      },
    ],
  },

  // MU:TUDIO (studio-002) - 2025-12-15
  {
    class_id: "class-007",
    studio_id: "studio-002",
    class_date: "2025-12-15",
    start_time: "09:30",
    genre: "WACKING",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-030",
        main_name: "자넷",
        instagram: "janet_wack",
      },
    ],
  },
  {
    class_id: "class-008",
    studio_id: "studio-002",
    class_date: "2025-12-15",
    start_time: "13:00",
    genre: "VOGUING",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-006",
        main_name: "이준영",
        instagram: "junyoung_vogue",
      },
    ],
  },
  {
    class_id: "class-009",
    studio_id: "studio-002",
    class_date: "2025-12-15",
    start_time: "18:00",
    genre: "HOUSE",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-007",
        main_name: "강민수",
        instagram: "minsu_house",
      },
      {
        dancer_id: "dancer-008",
        main_name: "윤지원",
        instagram: "jiwon_house",
      },
    ],
  },

  // MU:TUDIO (studio-002) - 2025-12-17
  {
    class_id: "class-010",
    studio_id: "studio-002",
    class_date: "2025-12-17",
    start_time: "10:00",
    genre: "KRUMP",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-009",
        main_name: "박성훈",
        instagram: "sunghun_krump",
      },
    ],
  },
  {
    class_id: "class-011",
    studio_id: "studio-002",
    class_date: "2025-12-17",
    start_time: "19:30",
    genre: "HEEL",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-010",
        main_name: "김수진",
        instagram: "sujin_heel",
      },
    ],
  },

  // FEEDBACK (studio-003) - 2025-12-16
  {
    class_id: "class-012",
    studio_id: "studio-003",
    class_date: "2025-12-16",
    start_time: "10:30",
    genre: "SOUL",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-011",
        main_name: "오현수",
        instagram: "hyunsu_soul",
      },
    ],
  },
  {
    class_id: "class-013",
    studio_id: "studio-003",
    class_date: "2025-12-16",
    start_time: "16:00",
    genre: "AFRO",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-012",
        main_name: "조민재",
        instagram: "minjae_afro",
      },
    ],
  },
  {
    class_id: "class-014",
    studio_id: "studio-003",
    class_date: "2025-12-16",
    start_time: "20:00",
    genre: "K_POP",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-013",
        main_name: "임유진",
        instagram: "yujin_kpop",
      },
    ],
  },

  // MID (studio-004) - 2025-12-17
  {
    class_id: "class-015",
    studio_id: "studio-004",
    class_date: "2025-12-17",
    start_time: "11:00",
    genre: "CONTEMPORARY",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-014",
        main_name: "서동현",
        instagram: "donghyun_contemp",
      },
    ],
  },
  {
    class_id: "class-016",
    studio_id: "studio-004",
    class_date: "2025-12-17",
    start_time: "14:30",
    genre: "JAZZ",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-015",
        main_name: "한지민",
        instagram: "jimin_jazz",
      },
    ],
  },
  {
    class_id: "class-017",
    studio_id: "studio-004",
    class_date: "2025-12-17",
    start_time: "19:00",
    genre: "DANCEHALL",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-016",
        main_name: "최영준",
        instagram: "youngjun_dancehall",
      },
    ],
  },

  // JUSTJERK (studio-005) - 2025-12-18
  {
    class_id: "class-018",
    studio_id: "studio-005",
    class_date: "2025-12-18",
    start_time: "10:00",
    genre: "HIPHOP",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-017",
        main_name: "권태양",
        instagram: "taeyang_hiphop",
      },
    ],
  },
  {
    class_id: "class-019",
    studio_id: "studio-005",
    class_date: "2025-12-18",
    start_time: "15:00",
    genre: "CHOREOGRAPHY",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-018",
        main_name: "송민지",
        instagram: "minji_choreo",
      },
      {
        dancer_id: "dancer-019",
        main_name: "이예린",
        instagram: "yerin_choreo",
      },
    ],
  },
  {
    class_id: "class-020",
    studio_id: "studio-005",
    class_date: "2025-12-18",
    start_time: "20:30",
    genre: null, // nullable genre example
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-020",
        main_name: "박시우",
        instagram: "siwoo_dance",
      },
    ],
  },

  // JUSTJERK EWHA (studio-006) - 2025-12-19
  {
    class_id: "class-021",
    studio_id: "studio-006",
    class_date: "2025-12-19",
    start_time: "11:30",
    genre: "GIRLS_HIPHOP",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-021",
        main_name: "정다은",
        instagram: "daeun_ghh",
      },
    ],
  },
  {
    class_id: "class-022",
    studio_id: "studio-006",
    class_date: "2025-12-19",
    start_time: "16:30",
    genre: "POPPING",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-022",
        main_name: "김도윤",
        instagram: "doyun_pop",
      },
    ],
  },

  // URBANPLAY (studio-007) - 2025-12-20
  {
    class_id: "class-023",
    studio_id: "studio-007",
    class_date: "2025-12-20",
    start_time: "09:00",
    genre: "WACKING",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-023",
        main_name: "최하늘",
        instagram: "haneul_wack",
      },
    ],
  },
  {
    class_id: "class-024",
    studio_id: "studio-007",
    class_date: "2025-12-20",
    start_time: "14:00",
    genre: "LOCKING",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-025",
        main_name: "유지훈",
        instagram: "jihun_lock",
      },
    ],
  },
  {
    class_id: "class-025",
    studio_id: "studio-007",
    class_date: "2025-12-20",
    start_time: "18:30",
    genre: "BREAKING",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-026",
        main_name: "안서준",
        instagram: "seojun_breaking",
      },
    ],
  },

  // PLAY THE URBAN (studio-008) - 2025-12-21
  {
    class_id: "class-026",
    studio_id: "studio-008",
    class_date: "2025-12-21",
    start_time: "10:30",
    genre: "HOUSE",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-027",
        main_name: "홍수빈",
        instagram: "subin_house",
      },
    ],
  },
  {
    class_id: "class-027",
    studio_id: "studio-008",
    class_date: "2025-12-21",
    start_time: "17:00",
    genre: "KRUMP",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-028",
        main_name: "장우진",
        instagram: "woojin_krump",
      },
    ],
  },

  // OFD (studio-009) - 2025-12-22
  {
    class_id: "class-028",
    studio_id: "studio-009",
    class_date: "2025-12-22",
    start_time: "11:00",
    genre: "HEEL",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-029",
        main_name: "백지우",
        instagram: "jiwoo_heel",
      },
    ],
  },
  {
    class_id: "class-029",
    studio_id: "studio-009",
    class_date: "2025-12-22",
    start_time: "15:30",
    genre: "VOGUING",
    level: "ADVANCED",
    dancers: [
      {
        dancer_id: "dancer-001",
        main_name: "김지은",
        instagram: "jieun_kim",
      },
    ],
  },
  {
    class_id: "class-030",
    studio_id: "studio-009",
    class_date: "2025-12-22",
    start_time: "19:30",
    genre: "SOUL",
    level: "BASIC",
    dancers: [
      {
        dancer_id: "dancer-002",
        main_name: "이민호",
        instagram: "minho_pop",
      },
      {
        dancer_id: "dancer-003",
        main_name: "박준서",
        instagram: "junsu_lock",
      },
    ],
  },
];
