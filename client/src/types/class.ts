/**
 * 댄스 장르 (백엔드 Genre enum과 일치)
 * server/features/dancer/models.py Genre enum 참고
 */
export type Genre =
  | "CHOREOGRAPHY"
  | "HIPHOP"
  | "GIRLS_HIPHOP"
  | "BREAKING"
  | "LOCKING"
  | "POPPING"
  | "HOUSE"
  | "KRUMP"
  | "WACKING"
  | "VOGUING"
  | "HEEL"
  | "SOUL"
  | "AFRO"
  | "K_POP"
  | "CONTEMPORARY"
  | "JAZZ"
  | "DANCEHALL";

/**
 * 난이도 레벨 (백엔드 Level enum과 일치)
 * server/features/dance_class/models.py Level enum 참고
 */
export type Level = "BASIC" | "ADVANCED";

/**
 * 시간대 (프론트엔드 전용 - 필터링용)
 */
export type TimeSlot = "morning" | "afternoon" | "evening";

/**
 * 댄서 정보 (클래스 강사)
 * Class-Dancer many-to-many 관계
 */
export interface ClassDancer {
  dancer_id: string;
  main_name: string; // 댄서 대표 이름
  instagram?: string; // 인스타그램
}

/**
 * 클래스 일정 (백엔드 Class 모델과 일치)
 * server/features/dance_class/models.py Class 모델 참고
 */
export interface ClassSchedule {
  class_id: string; // UUID
  studio_id: string; // 필수 - FK to studios

  class_date: string; // "2025-12-15" (ISO date)
  start_time: string; // "19:00" (HH:MM)

  genre: Genre | null; // nullable
  level: Level; // 필수

  // Many-to-many relationship
  dancers: ClassDancer[]; // 해당 클래스를 가르치는 댄서들
}

/**
 * 시작 시간으로 시간대 계산 (필터링용)
 */
export function getTimeSlot(startTime: string): TimeSlot {
  const hour = parseInt(startTime.split(":")[0], 10);
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "evening";
}

/**
 * Genre 한글 표시명 매핑
 */
export const GENRE_LABELS: Record<Genre, string> = {
  CHOREOGRAPHY: "코레오그래피",
  HIPHOP: "힙합",
  GIRLS_HIPHOP: "걸스힙합",
  BREAKING: "브레이킹",
  LOCKING: "락킹",
  POPPING: "팝핑",
  HOUSE: "하우스",
  KRUMP: "크럼프",
  WACKING: "왁킹",
  VOGUING: "보깅",
  HEEL: "힐",
  SOUL: "소울",
  AFRO: "아프로",
  K_POP: "K-POP",
  CONTEMPORARY: "컨템포러리",
  JAZZ: "재즈",
  DANCEHALL: "댄스홀",
};

/**
 * Level 한글 표시명 매핑
 */
export const LEVEL_LABELS: Record<Level, string> = {
  BASIC: "기초",
  ADVANCED: "심화",
};
