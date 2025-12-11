import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { ClassSchedule, CalendarDayData } from "@/types";
import CalendarDay from "./CalendarDay";

interface CalendarGridProps {
  currentMonth: Date;
  classes: ClassSchedule[];
  onDateClick?: (date: Date, classes: ClassSchedule[]) => void;
  selectedDate: Date | null;
  className?: string;
}

/**
 * 요일 이름
 */
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/**
 * Date → "2025-12-15" 변환
 */
function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * 두 날짜가 같은 날인지 확인
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * 날짜 셀 데이터 생성
 */
function createDayData(
  date: Date,
  isCurrentMonth: boolean,
  classes: ClassSchedule[]
): CalendarDayData {
  const dateString = formatDateISO(date);
  const today = new Date();
  const isToday = isSameDay(date, today);

  const dayClasses = classes.filter((cls) => cls.class_date === dateString);

  return {
    date,
    dateString,
    isCurrentMonth,
    isToday,
    classes: dayClasses,
  };
}

/**
 * 해당 월의 캘린더 데이터 생성 (42일)
 */
function generateCalendarDays(
  month: Date,
  classes: ClassSchedule[]
): CalendarDayData[] {
  const days: CalendarDayData[] = [];
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  // 첫째 날
  const firstDay = new Date(year, monthIndex, 1);
  const startingDayOfWeek = firstDay.getDay(); // 0-6 (Sun-Sat)

  // 마지막 날
  const lastDay = new Date(year, monthIndex + 1, 0);

  // 이전 달 overflow
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = new Date(year, monthIndex, -i);
    days.push(createDayData(day, false, classes));
  }

  // 현재 달 날짜들
  for (let date = 1; date <= lastDay.getDate(); date++) {
    const day = new Date(year, monthIndex, date);
    days.push(createDayData(day, true, classes));
  }

  // 다음 달 overflow (42일까지 채우기)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(year, monthIndex + 1, i);
    days.push(createDayData(day, false, classes));
  }

  return days;
}

/**
 * CalendarGrid 컴포넌트
 * 요일 헤더와 날짜 그리드 렌더링
 */
export default function CalendarGrid({
  currentMonth,
  classes,
  onDateClick,
  selectedDate,
  className,
}: CalendarGridProps) {
  // 캘린더 날짜 생성
  const calendarDays = useMemo(
    () => generateCalendarDays(currentMonth, classes),
    [currentMonth, classes]
  );

  // 날짜 클릭 핸들러
  const handleDayClick = (dayData: CalendarDayData) => {
    onDateClick?.(dayData.date, dayData.classes);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-[12px] font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayData, index) => (
          <CalendarDay
            key={index}
            dayData={dayData}
            isSelected={
              selectedDate ? isSameDay(dayData.date, selectedDate) : false
            }
            onClick={() => handleDayClick(dayData)}
          />
        ))}
      </div>
    </div>
  );
}
