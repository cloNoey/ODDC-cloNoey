import { cn } from "@/lib/utils";
import arrowLeft from "@/assets/icons/arrow_left.svg";
import arrowRight from "@/assets/icons/arrow_right.svg";

interface CalendarNavigatorProps {
  currentDate: Date;
  onMonthChange: (delta: number) => void;
  onOpenFilters: () => void;
  className?: string;
}

/**
 * 월 이름
 */
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * CalendarNavigator 컴포넌트
 * 년도/월 표시 및 네비게이션 버튼
 */
export default function CalendarNavigator({
  currentDate,
  onMonthChange,
  onOpenFilters,
  className,
}: CalendarNavigatorProps) {
  const year = currentDate.getFullYear();
  const month = MONTH_NAMES[currentDate.getMonth()];

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {/* 좌측: 이전 달 버튼 */}
      <button
        onClick={() => onMonthChange(-1)}
        className={cn(
          "p-2 hover:bg-gray-100 rounded-lg transition-colors",
          "flex items-center justify-center"
        )}
        aria-label="이전 달"
      >
        <img src={arrowLeft} alt="이전 달" className="w-[8px] h-[14px]" />
      </button>

      {/* 중앙: 년도/월 표시 */}
      <div className="flex flex-col items-center">
        <span className="text-[14px] font-medium text-gray-600">{year}</span>
        <span className="text-[18px] font-bold text-[#0C1A58]">{month}</span>
      </div>

      {/* 우측: 다음 달 버튼 + 옵션 버튼 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onMonthChange(1)}
          className={cn(
            "p-2 hover:bg-gray-100 rounded-lg transition-colors",
            "flex items-center justify-center"
          )}
          aria-label="다음 달"
        >
          <img src={arrowRight} alt="다음 달" className="w-[8px] h-[14px]" />
        </button>

        <button
          onClick={onOpenFilters}
          className={cn(
            "px-3 py-1.5 text-[12px] font-medium",
            "bg-[#EEF3FF] text-[#0C1A58]",
            "rounded-lg hover:bg-[#E6E6FA] transition-colors"
          )}
          aria-label="필터 옵션"
        >
          옵션
        </button>
      </div>
    </div>
  );
}
