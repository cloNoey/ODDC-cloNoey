import { useState } from "react";
import { Logo, SearchBar } from "@/components/common";
import {
  ContentToggle,
  StudioCardGrid,
  StudioMapView,
} from "@/components/main";
import { mockStudios } from "@/data";
import type { ViewMode } from "@/types";

/**
 * MainPage - 메인 페이지
 * 댄스 스튜디오 검색 및 탐색
 */
export default function MainPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("card");

  return (
    <div className="relative min-h-screen px-8 pb-8">
      {/* Logo - Y: 177px */}
      <div style={{ marginTop: "100px" }}>
        <Logo />
      </div>

      {/* SearchBar - Y: 250px (177 + 73) */}
      <div style={{ marginTop: "30px" }} className="flex justify-center">
        <SearchBar />
      </div>

      {/* ContentToggle - Y: 330px (250 + 80) */}
      <div style={{ marginTop: "50px" }}>
        <ContentToggle viewMode={viewMode} onToggle={setViewMode} />
      </div>

      {/* Content Area */}
      <div className="mt-3">
        {viewMode === "card" ? (
          <StudioCardGrid studios={mockStudios} />
        ) : (
          <StudioMapView studios={mockStudios} />
        )}
      </div>
    </div>
  );
}
