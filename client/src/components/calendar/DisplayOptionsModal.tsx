import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type {
  CalendarFilters,
  Genre,
  Level,
  TimeSlot,
  ClassDancer,
} from "@/types";
import { GENRE_LABELS, LEVEL_LABELS } from "@/types";

interface DisplayOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: CalendarFilters;
  onFilterChange: (filters: CalendarFilters) => void;
  entityType: "studio" | "dancer";
  availableDancers: ClassDancer[];
  className?: string;
}

/**
 * 시간대 옵션
 */
const TIME_SLOT_OPTIONS: { value: TimeSlot; label: string }[] = [
  { value: "morning", label: "오전 (6-12시)" },
  { value: "afternoon", label: "오후 (12-18시)" },
  { value: "evening", label: "저녁 (18-24시)" },
];

/**
 * DisplayOptionsModal 컴포넌트
 * 필터 UI 모달
 */
export default function DisplayOptionsModal({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  entityType,
  availableDancers,
  className,
}: DisplayOptionsModalProps) {
  // 임시 필터 상태 (Apply 전까지는 부모에 전달하지 않음)
  const [tempFilters, setTempFilters] = useState<CalendarFilters>(filters);

  // isOpen이 변경되면 tempFilters를 초기화
  useEffect(() => {
    if (isOpen) {
      setTempFilters(filters);
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  // 댄서 토글
  const toggleDancer = (dancerId: string) => {
    setTempFilters((prev) => ({
      ...prev,
      dancers: prev.dancers.includes(dancerId)
        ? prev.dancers.filter((id) => id !== dancerId)
        : [...prev.dancers, dancerId],
    }));
  };

  // 시간대 토글
  const toggleTimeSlot = (timeSlot: TimeSlot) => {
    setTempFilters((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(timeSlot)
        ? prev.timeSlots.filter((ts) => ts !== timeSlot)
        : [...prev.timeSlots, timeSlot],
    }));
  };

  // 장르 토글
  const toggleGenre = (genre: Genre) => {
    setTempFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  // 레벨 토글
  const toggleLevel = (level: Level) => {
    setTempFilters((prev) => ({
      ...prev,
      levels: prev.levels.includes(level)
        ? prev.levels.filter((l) => l !== level)
        : [...prev.levels, level],
    }));
  };

  // 초기화
  const handleReset = () => {
    setTempFilters({
      dancers: [],
      timeSlots: [],
      genres: [],
      levels: [],
    });
  };

  // 적용
  const handleApply = () => {
    onFilterChange(tempFilters);
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 z-50",
        "flex items-center justify-center p-4",
        className
      )}
      onClick={onClose}
    >
      {/* 모달 콘텐츠 */}
      <div
        className={cn(
          "bg-white rounded-xl max-w-md w-full",
          "max-h-[80vh] overflow-y-auto",
          "p-6"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[18px] font-bold text-[#0C1A58]">
            디스플레이 옵션
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-[24px]"
          >
            ×
          </button>
        </div>

        {/* 필터 섹션 */}
        <div className="flex flex-col gap-6">
          {/* 댄서 필터 (Studio 컨텍스트만) */}
          {entityType === "studio" && availableDancers.length > 0 && (
            <div>
              <h4 className="text-[14px] font-semibold text-gray-900 mb-3">
                댄서 (필수)
              </h4>
              <div className="flex flex-col gap-2">
                {availableDancers.map((dancer) => (
                  <label
                    key={dancer.dancer_id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={tempFilters.dancers.includes(dancer.dancer_id)}
                      onChange={() => toggleDancer(dancer.dancer_id)}
                      className="w-4 h-4"
                    />
                    <span className="text-[14px] text-gray-700">
                      {dancer.main_name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 시간대 필터 */}
          <div>
            <h4 className="text-[14px] font-semibold text-gray-900 mb-3">
              시간대 (필수)
            </h4>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleTimeSlot(option.value)}
                  className={cn(
                    "px-3 py-1.5 text-[12px] font-medium rounded-lg",
                    "transition-colors",
                    tempFilters.timeSlots.includes(option.value)
                      ? "bg-[#0C1A58] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 장르 필터 */}
          <div>
            <h4 className="text-[14px] font-semibold text-gray-900 mb-3">
              장르 (선택)
            </h4>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(GENRE_LABELS) as Genre[]).map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={cn(
                    "px-3 py-1.5 text-[12px] font-medium rounded-lg",
                    "transition-colors",
                    tempFilters.genres.includes(genre)
                      ? "bg-[#0C1A58] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {GENRE_LABELS[genre]}
                </button>
              ))}
            </div>
          </div>

          {/* 레벨 필터 */}
          <div>
            <h4 className="text-[14px] font-semibold text-gray-900 mb-3">
              레벨 (선택)
            </h4>
            <div className="flex gap-2">
              {(Object.keys(LEVEL_LABELS) as Level[]).map((level) => (
                <button
                  key={level}
                  onClick={() => toggleLevel(level)}
                  className={cn(
                    "flex-1 px-4 py-2 text-[14px] font-medium rounded-lg",
                    "transition-colors",
                    tempFilters.levels.includes(level)
                      ? "bg-[#0C1A58] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {LEVEL_LABELS[level]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 액션 버튼 */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleReset}
            className={cn(
              "flex-1 px-4 py-2 text-[14px] font-medium",
              "bg-gray-200 text-gray-700 rounded-lg",
              "hover:bg-gray-300 transition-colors"
            )}
          >
            초기화
          </button>
          <button
            onClick={handleApply}
            className={cn(
              "flex-1 px-4 py-2 text-[14px] font-medium",
              "bg-[#0C1A58] text-white rounded-lg",
              "hover:bg-opacity-90 transition-colors"
            )}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
