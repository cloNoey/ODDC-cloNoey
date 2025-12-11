import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import type {
  Studio,
  Dancer,
  ClassSchedule,
  CalendarFilters,
  ClassDancer,
} from "@/types";
import { INITIAL_FILTERS, getTimeSlot } from "@/types";
import CalendarHeader from "./CalendarHeader";
import CalendarNavigator from "./CalendarNavigator";
import CalendarGrid from "./CalendarGrid";
import DisplayOptionsModal from "./DisplayOptionsModal";

interface CalendarProps<T extends Studio | Dancer> {
  entity: T;
  entityType: "studio" | "dancer";
  classes: ClassSchedule[];
  onDateClick?: (date: Date, classes: ClassSchedule[]) => void;
  className?: string;
}

/**
 * Calendar 메인 컴포넌트
 * 스튜디오/댄서 캘린더 - 상태 관리 및 하위 컴포넌트 조합
 */
export default function Calendar<T extends Studio | Dancer>({
  entity,
  entityType,
  classes,
  onDateClick,
  className,
}: CalendarProps<T>) {
  // 상태
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState<CalendarFilters>(INITIAL_FILTERS);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // 해당 엔티티의 클래스만 필터링
  const entityClasses = useMemo(() => {
    if (entityType === "studio") {
      const studio = entity as Studio;
      return classes.filter((cls) => cls.studio_id === studio.studio_id);
    } else {
      const dancer = entity as Dancer;
      return classes.filter((cls) =>
        cls.dancers.some((d) => d.dancer_id === dancer.dancer_id)
      );
    }
  }, [classes, entity, entityType]);

  // 필터 적용된 클래스 목록
  const filteredClasses = useMemo(() => {
    return entityClasses.filter((cls) => {
      // 댄서 필터 (many-to-many)
      if (filters.dancers.length > 0) {
        const hasDancer = cls.dancers.some((d) =>
          filters.dancers.includes(d.dancer_id)
        );
        if (!hasDancer) return false;
      }

      // 시간대 필터
      if (
        filters.timeSlots.length > 0 &&
        !filters.timeSlots.includes(getTimeSlot(cls.start_time))
      ) {
        return false;
      }

      // 장르 필터 (nullable)
      if (filters.genres.length > 0) {
        if (!cls.genre || !filters.genres.includes(cls.genre)) {
          return false;
        }
      }

      // 레벨 필터
      if (filters.levels.length > 0 && !filters.levels.includes(cls.level)) {
        return false;
      }

      return true;
    });
  }, [entityClasses, filters]);

  // 사용 가능한 댄서 목록 (studio 컨텍스트만)
  const availableDancers = useMemo(() => {
    if (entityType !== "studio") return [];

    // entityClasses에서 댄서 추출 (중복 제거)
    const dancerMap = new Map<string, ClassDancer>();

    entityClasses.forEach((cls) => {
      cls.dancers.forEach((dancer) => {
        if (!dancerMap.has(dancer.dancer_id)) {
          dancerMap.set(dancer.dancer_id, dancer);
        }
      });
    });

    return Array.from(dancerMap.values());
  }, [entityClasses, entityType]);

  // 이벤트 핸들러
  const handleMonthChange = (delta: number) => {
    setCurrentMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + delta);
      return next;
    });
  };

  const handleDateClick = (date: Date, dayClasses: ClassSchedule[]) => {
    setSelectedDate(date);
    onDateClick?.(date, dayClasses);
  };

  const handleFilterChange = (newFilters: CalendarFilters) => {
    setFilters(newFilters);
  };

  const handleOpenFilters = () => setIsFilterModalOpen(true);
  const handleCloseFilters = () => setIsFilterModalOpen(false);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* 헤더: 엔티티 정보 */}
      <CalendarHeader entity={entity} entityType={entityType} />

      {/* 네비게이터: 년/월 및 화살표 */}
      <CalendarNavigator
        currentDate={currentMonth}
        onMonthChange={handleMonthChange}
        onOpenFilters={handleOpenFilters}
      />

      {/* 그리드: 날짜 캘린더 */}
      <CalendarGrid
        currentMonth={currentMonth}
        classes={filteredClasses}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
      />

      {/* 필터 모달 */}
      <DisplayOptionsModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilters}
        filters={filters}
        onFilterChange={handleFilterChange}
        entityType={entityType}
        availableDancers={availableDancers}
      />
    </div>
  );
}
