import { cn } from "@/lib/utils";
import type { CalendarDayData } from "@/types";

interface CalendarDayProps {
  dayData: CalendarDayData;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

interface DateNumberProps {
  date: number;
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
}

/**
 * DateNumber 컴포넌트
 * 날짜 숫자 박스 (둥근 네모)
 */
function DateNumber({
  date,
  isToday,
  isSelected,
  isCurrentMonth,
}: DateNumberProps) {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      {/* 선택 테두리 (바깥 레이어) */}
      {isSelected && (
        <div
          className="absolute inset-0 rounded"
          style={{ border: "1px solid var(--color-primary)" }}
        />
      )}

      {/* 날짜 박스 (안쪽 레이어) */}
      <div
        className={cn(
          "flex items-center justify-center rounded",
          isToday ? "w-[20px] h-[20px]" : "w-6 h-6",
          isToday || isSelected ? "font-bold" : "font-medium",
          !isToday &&
            !isSelected &&
            (isCurrentMonth ? "text-gray-900" : "text-gray-400")
        )}
        style={{
          fontSize: "var(--text-base)",
          fontFamily: "var(--font-calendar-number)",
          letterSpacing: "var(--letter-spacing-calendar)",
          backgroundColor: isToday
            ? "var(--color-primary)"
            : isSelected
              ? "var(--color-white)"
              : undefined,
          color: isToday
            ? "var(--color-white)"
            : isSelected
              ? "var(--color-primary)"
              : undefined,
        }}
      >
        {date}
      </div>
    </div>
  );
}

/**
 * CalendarDay 컴포넌트
 * 개별 날짜 셀 렌더링
 */
export default function CalendarDay({
  dayData,
  isSelected,
  onClick,
  className,
}: CalendarDayProps) {
  const { date, isCurrentMonth, isToday, classes } = dayData;
  const hasClasses = classes.length > 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "aspect-square flex flex-col items-center justify-center",
        "cursor-pointer transition-colors",
        "relative",
        !isCurrentMonth && "opacity-40",
        className
      )}
    >
      {/* 날짜 숫자 */}
      <DateNumber
        date={date.getDate()}
        isToday={isToday}
        isSelected={isSelected}
        isCurrentMonth={isCurrentMonth}
      />

      {/* 클래스 있을 때 점 표시 - 오른쪽 위 */}
      {hasClasses && (
        <div
          className="absolute top-2 right-2 w-1 h-1 rounded-full"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
      )}
    </div>
  );
}
