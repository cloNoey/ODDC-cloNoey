import { cn } from "@/lib/utils";
import arrowLeft from "@/assets/icons/arrow_left.svg";
import arrowRight from "@/assets/icons/arrow_right.svg";
import verticalDots from "@/assets/icons/vertical_dots.svg";

interface CalendarNavigatorProps {
  currentDate: Date;
  onMonthChange: (delta: number) => void;
  onOpenFilters: () => void;
  className?: string;
}

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
  const month = currentDate.getMonth() + 1;

  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {/* 왼쪽 빈 공간 (중앙 정렬을 위한 균형) */}
      <div className="flex-1"></div>

      {/* 중앙: navigator content */}
      <div className="flex flex-col items-center">
        <span
          className="font-medium text-gray-600 items-center justify-center pl-0.5"
          style={{ fontSize: "var(--text-sm)" }}
        >
          {year}
        </span>
        <div className="flex gap-5 items-center justify-center">
          {/* 이전 달 버튼 */}
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

          <span
            className="flex font-bold items-center tracking-[-2px]"
            style={{
              fontSize: "var(--text-3xl)",
              color: "var(--color-primary)",
              fontFamily: "'Inria Serif', serif",
            }}
          >
            {month}
          </span>

          {/* 다음 달 버튼 */}
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
        </div>
      </div>

      {/* 오른쪽: option 버튼 */}
      <div className="flex-1 flex justify-end">
        <button
          onClick={onOpenFilters}
          className={cn(
            "p-2 hover:bg-gray-100 rounded-lg transition-colors",
            "flex items-center justify-center"
          )}
          aria-label="필터 옵션"
        >
          <img src={verticalDots} alt="옵션" className="w-[20px] h-[20px]" />
        </button>
      </div>
    </div>
  );
}
