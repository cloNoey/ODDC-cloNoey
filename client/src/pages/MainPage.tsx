import { useState, useRef, useEffect } from "react";
import { Logo, SearchBar } from "@/components/common";
import {
  ContentToggle,
  StudioCardGrid,
  StudioMapView,
} from "@/components/main";
import { Calendar } from "@/components/calendar";
import { mockStudios, mockClasses } from "@/data";
import type { ViewMode, Studio } from "@/types";

/**
 * MainPage - 메인 페이지
 * 댄스 스튜디오 검색 및 탐색
 */
export default function MainPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  // 1. 선택된 스튜디오 상태 관리 (null이면 선택 안 됨)
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  // 2. 스크롤 이동할 목표 지점(캘린더 뷰)을 위한 ref 생성
  const calendarSectionRef = useRef<HTMLDivElement>(null);

  // 3. selectedStudio가 변경되어 하단 영역이 생기면 자동으로 스크롤 이동
  useEffect(() => {
    if (selectedStudio && calendarSectionRef.current) {
      // DOM 렌더링 안정성을 위해 약간의 지연 후 이동
      setTimeout(() => {
        calendarSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start", // 캘린더 상단이 화면 맨 위로 오게 하려면 'start', 중앙은 'center'
        });
      }, 100);
    }
  }, [selectedStudio]);

  // 4. 스튜디오 클릭 핸들러
  const handleStudioClick = (studio: Studio) => {
    // 이미 선택된 스튜디오를 다시 클릭했을 때 상태 유지
    if (selectedStudio?.studio_id === studio.studio_id) {
      return;
    }
    // 다른 스튜디오를 클릭했을 때만 상태 변경
    setSelectedStudio(studio);
  };

  // 5. 뷰 모드 변경 핸들러
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode); // 1. 모드 변경 (Card <-> Map)
    setSelectedStudio(null); // 2. 선택된 스튜디오 초기화 (캘린더 닫기)
  };

  return (
    <div className="relative min-h-screen px-8 pb-20">
      {/* Logo */}
      <div style={{ marginTop: "100px" }}>
        <Logo />
      </div>

      {/* SearchBar */}
      <div style={{ marginTop: "30px" }} className="flex justify-center">
        <SearchBar />
      </div>

      {/* ContentToggle */}
      <div style={{ marginTop: "50px" }}>
        <ContentToggle viewMode={viewMode} onToggle={handleViewModeChange} />
      </div>

      {/* Content Area */}
      <div className="mt-3">
        {viewMode === "card" ? (
          <StudioCardGrid
            studios={mockStudios}
            onStudioClick={handleStudioClick}
          />
        ) : (
          <StudioMapView studios={mockStudios} onPinClick={handleStudioClick} />
        )}
      </div>

      {/* 👇 동적으로 생성되는 하단 캘린더 영역 (선택된 경우에만 렌더링) */}
      {selectedStudio && (
        <div
          ref={calendarSectionRef} // ⭐ 스크롤 목적지
          className="mt-10 pt-8 border-t border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <Calendar
            entity={selectedStudio}
            entityType="studio"
            classes={mockClasses}
          />
        </div>
      )}
    </div>
  );
}
