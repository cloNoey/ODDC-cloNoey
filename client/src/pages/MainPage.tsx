import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo, SearchBar } from "@/components/common";
import {
  ContentToggle,
  StudioCardGrid,
  StudioMapView,
} from "@/components/main";
import { Calendar } from "@/components/calendar";
import { useStudioList } from "@/hooks/useStudio";
import { useStudioClasses } from "@/hooks/useClasses";
import type { ViewMode, Studio } from "@/types";

/**
 * MainPage - 메인 페이지
 * 댄스 스튜디오 검색 및 탐색
 */
export default function MainPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  // 1. 선택된 스튜디오 상태 관리 (null이면 선택 안 됨)
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  // 2. 페이지 최상단 여부 관리
  const [isAtTop, setIsAtTop] = useState(true);
  // 3. 헤더 높이 관리 (placeholder용)
  const [headerHeight, setHeaderHeight] = useState(0);

  // 6. 스크롤 이동할 목표 지점(캘린더 뷰)을 위한 ref 생성
  const calendarSectionRef = useRef<HTMLDivElement>(null);
  // 7. 헤더 ref
  const headerRef = useRef<HTMLDivElement>(null);

  // API 데이터 가져오기
  const { data: studios = [], isLoading: studiosLoading } = useStudioList();
  const { data: classes = [] } = useStudioClasses(selectedStudio?.studio_id || "");

  // 8. 헤더 높이 측정
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current && isAtTop) {
        // 최상단일 때만 높이 업데이트 (원래 큰 헤더 높이 저장)
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
  }, [isAtTop]);

  // 9. 스크롤 위치 감지 및 헤더 크기 변경
  useEffect(() => {
    const SCROLL_THRESHOLD = 30; // 30px 이상 스크롤 시 헤더 크기 변경

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 30px 미만이면 최상단 상태 유지
      if (currentScrollY < SCROLL_THRESHOLD) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 8. selectedStudio가 변경되어 하단 영역이 생기면 자동으로 스크롤 이동
  useEffect(() => {
    if (selectedStudio && calendarSectionRef.current) {
      // 스크롤 시작 시점의 헤더 상태 캡처
      const currentIsAtTop = isAtTop;

      // DOM 렌더링 안정성을 위해 약간의 지연 후 이동
      setTimeout(() => {
        const calendarTop =
          calendarSectionRef.current!.getBoundingClientRect().top +
          window.scrollY;

        // 스크롤 시작 시점의 헤더 상태에 따라 오프셋 계산
        // isAtTop = true (큰 헤더): 200px 오프셋
        // isAtTop = false (작은 fixed 헤더): 80px 오프셋
        const offset = currentIsAtTop ? 200 : 130;

        window.scrollTo({
          top: calendarTop - offset,
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
    <div
      className={cn(
        "relative min-h-screen px-4",
        selectedStudio ? "pb-[50vh]" : "pb-10"
      )}
    >
      {/* Header: Logo + SearchBar */}
      <div
        ref={headerRef}
        className={cn(
          "transition-all duration-300 bg-white",
          isAtTop
            ? "relative z-50 mx-[-16px] sm:mx-[-24px] md:mx-[-32px] lg:mx-[-48px] px-4 sm:px-6 md:px-8 lg:px-12"
            : "fixed top-0 left-0 right-0 z-50 px-12 sm:px-16 md:px-24 lg:px-32"
        )}
        style={{
          marginTop: isAtTop ? "70px" : "0px",
          paddingTop: isAtTop ? "20px" : "16px",
          paddingBottom: isAtTop ? "20px" : "16px",
          boxShadow: isAtTop ? "none" : "0 4px 6px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <div>
          <Logo />
        </div>

        {/* SearchBar */}
        <div
          className={cn("flex justify-center transition-all duration-300")}
          style={{ marginTop: isAtTop ? "30px" : "12px" }}
        >
          <SearchBar className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px]" />
        </div>
      </div>

      {/* Placeholder when header is fixed */}
      {!isAtTop && <div style={{ height: `${headerHeight}px` }} />}

      {/* ContentToggle */}
      <div style={{ marginTop: "30px" }}>
        <ContentToggle viewMode={viewMode} onToggle={handleViewModeChange} />
      </div>

      {/* Content Area */}
      <div className="mt-3">
        {studiosLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        ) : viewMode === "card" ? (
          <StudioCardGrid
            studios={studios}
            onStudioClick={handleStudioClick}
          />
        ) : (
          <StudioMapView studios={studios} onPinClick={handleStudioClick} />
        )}
      </div>

      {/* 👇 동적으로 생성되는 하단 캘린더 영역 (선택된 경우에만 렌더링) */}
      {selectedStudio && (
        <div
          ref={calendarSectionRef} // ⭐ 스크롤 목적지
          className="mt-5 pt-5 pb-10 mb-5 border-t border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="flex justify-center">
            <div className="w-full w-[400px]">
              <Calendar
                entity={selectedStudio}
                entityType="studio"
                classes={classes}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
