import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { ClassSchedule } from "@/types";
import ClassCard from "./ClassCard";

interface ClassBottomSheetProps {
  isOpen: boolean;
  selectedDate: Date | null;
  classes: ClassSchedule[];
  onClose: () => void;
  entityType: "studio" | "dancer";
}

/**
 * ClassBottomSheet 컴포넌트
 * 선택된 날짜의 수업 목록을 하단바로 표시
 */
export default function ClassBottomSheet({
  isOpen,
  selectedDate,
  classes,
  onClose,
  entityType,
}: ClassBottomSheetProps) {
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  // 하단바 열릴 때 배경 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 날짜 포맷팅
  const formattedDate = selectedDate
    ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
    : "";

  // 드래그 시작 (터치)
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientY);
  };

  // 드래그 중 (터치)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart === null) return;
    const currentY = e.touches[0].clientY;
    const offset = Math.max(0, currentY - dragStart); // 아래로만 드래그 가능
    setDragOffset(offset);
  };

  // 드래그 종료 (터치)
  const handleTouchEnd = () => {
    if (dragOffset > 100) {
      // 100px 이상 드래그하면 닫기
      onClose();
    }
    setDragStart(null);
    setDragOffset(0);
  };

  // 드래그 시작 (마우스)
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientY);
  };

  // 드래그 중 (마우스)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart === null) return;
    const currentY = e.clientY;
    const offset = Math.max(0, currentY - dragStart);
    setDragOffset(offset);
  };

  // 드래그 종료 (마우스)
  const handleMouseUp = () => {
    if (dragOffset > 100) {
      onClose();
    }
    setDragStart(null);
    setDragOffset(0);
  };

  return (
    <>
      {/* 하단바 */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "bg-white rounded-t-2xl",
          dragOffset === 0 && "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{
          maxHeight: "85vh",
          boxShadow: "0 -4px 12px 0 rgba(0, 0, 0, 0.15)",
          transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 드래그 핸들 */}
        <div className="flex justify-center py-2">
          <div
            className="w-12 h-1 rounded-full"
            style={{ backgroundColor: "var(--color-light-gray)" }}
          />
        </div>

        {/* 헤더 */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200">
          <h3
            className="font-bold text-lg"
            style={{ color: "var(--color-primary)" }}
          >
            {formattedDate}
          </h3>
        </div>

        {/* 바디: 수업 카드 horizontal scroll */}
        <div className="px-4 py-5 overflow-y-auto" style={{ height: "25vh" }}>
          {classes.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              수업이 없습니다
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-4">
              {classes.map((classSchedule) => (
                <ClassCard
                  key={classSchedule.class_id}
                  classSchedule={classSchedule}
                  entityType={entityType}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
