import { cn } from "@/lib/utils";
import type { CalendarDayData } from "@/types";

interface CalendarDayProps {
  dayData: CalendarDayData;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
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
        "hover:bg-gray-50",
        isSelected && "bg-[#EEF3FF]",
        !isCurrentMonth && "opacity-40",
        className
      )}
    >
      {/* 날짜 숫자 */}
      <div
        className={cn(
          "text-[14px] font-medium",
          "flex items-center justify-center",
          "w-8 h-8 rounded-full",
          isToday && "border-2 border-[#0C1A58]",
          isCurrentMonth ? "text-gray-900" : "text-gray-400"
        )}
      >
        {date.getDate()}
      </div>

      {/* 클래스 있을 때 점 표시 */}
      {hasClasses && (
        <div className="w-1 h-1 rounded-full bg-[#0C1A58] mt-1" />
      )}
    </div>
  );
}
