import type { ClassSchedule, Genre, Level, TimeSlot } from "./class";

/**
 * 캘린더 필터 상태
 */
export interface CalendarFilters {
  dancers: string[]; // 필수: 댄서 ID 배열
  timeSlots: TimeSlot[]; // 필수: 시간대 배열
  genres: Genre[]; // 선택: 장르 배열
  levels: Level[]; // 선택: 난이도 배열 (BASIC, ADVANCED)
}

/**
 * 초기 필터 상태
 */
export const INITIAL_FILTERS: CalendarFilters = {
  dancers: [],
  timeSlots: [],
  genres: [],
  levels: [],
};

/**
 * 날짜 셀 데이터
 */
export interface CalendarDayData {
  date: Date;
  dateString: string; // "2025-12-15"
  isCurrentMonth: boolean; // 이번 달 vs 이전/다음 달
  isToday: boolean; // 오늘 표시용
  classes: ClassSchedule[]; // 해당 날짜의 클래스
}
