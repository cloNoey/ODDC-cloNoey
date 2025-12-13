import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
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
  // 2. Sticky 상태 관리
  const [isSticky, setIsSticky] = useState(false);
  // 3. 헤더 높이 관리 (placeholder용)
  const [headerHeight, setHeaderHeight] = useState(0);

  // 3. 스크롤 이동할 목표 지점(캘린더 뷰)을 위한 ref 생성
  const calendarSectionRef = useRef<HTMLDivElement>(null);
  // 4. Sticky 감지를 위한 sentinel ref
  const sentinelRef = useRef<HTMLDivElement>(null);
  // 5. Sticky 헤더 ref
  const headerRef = useRef<HTMLDivElement>(null);

  // 5. 헤더 높이 측정 및 업데이트
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current && !isSticky) {
        // sticky가 아닐 때만 높이 업데이트 (원래 높이 저장)
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    // 초기 측정
    updateHeaderHeight();

    // ResizeObserver로 헤더 크기 변화 감지
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isSticky]);

  // 6. Intersection Observer로 sticky 상태 감지
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // sentinel이 화면에서 사라지면 sticky 상태
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 1 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 6. selectedStudio가 변경되어 하단 영역이 생기면 자동으로 스크롤 이동
  useEffect(() => {
    if (selectedStudio && calendarSectionRef.current && headerRef.current) {
      // DOM 렌더링 안정성을 위해 약간의 지연 후 이동
      setTimeout(() => {
        const headerHeight = headerRef.current!.offsetHeight;
        const calendarTop =
          calendarSectionRef.current!.getBoundingClientRect().top +
          window.scrollY;

        window.scrollTo({
          top: calendarTop - headerHeight - 10, // 헤더 높이 + 10px 오프셋
          behavior: "smooth",
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
    <div className="relative min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 pb-40">
      {/* Sentinel for Intersection Observer */}
      <div
        ref={sentinelRef}
        style={{ height: "1px", position: "absolute", top: "10px" }}
      />

      {/* Sticky Header: Logo + SearchBar */}
      <div
        ref={headerRef}
        className={cn(
          "transition-all duration-300 bg-white",
          isSticky
            ? "fixed top-0 left-0 right-0 z-50 px-12 sm:px-16 md:px-24 lg:px-32"
            : "relative z-50 mx-[-16px] sm:mx-[-24px] md:mx-[-32px] lg:mx-[-48px] px-4 sm:px-6 md:px-8 lg:px-12"
        )}
        style={{
          marginTop: isSticky ? "0px" : "100px",
          paddingTop: isSticky ? "16px" : "20px",
          paddingBottom: isSticky ? "16px" : "20px",
          boxShadow: isSticky ? "0 4px 6px 0 rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        {/* Logo */}
        <div>
          <Logo />
        </div>

        {/* SearchBar */}
        <div
          className={cn("flex justify-center transition-all duration-300")}
          style={{ marginTop: isSticky ? "12px" : "30px" }}
        >
          <SearchBar className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px]" />
        </div>
      </div>

      {/* Placeholder when header is fixed */}
      {isSticky && <div style={{ height: `${headerHeight + 100}px` }} />}

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
          className="mt-5 pt-5 pb-50 mb-5 border-t border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500"
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
