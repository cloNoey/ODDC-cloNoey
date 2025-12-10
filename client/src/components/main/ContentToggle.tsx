import { cn } from "@/lib/utils";
import type { ViewMode } from "@/types";
import cardStacksIcon from "@/assets/icons/card_stacks.svg";
import mapSearchIcon from "@/assets/icons/map_search.svg";

interface ContentToggleProps {
  viewMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
  className?: string;
}

/**
 * ContentToggle 컴포넌트
 * 카드형/지도형 뷰 전환 슬라이딩 토글
 */
export default function ContentToggle({
  viewMode,
  onToggle,
  className,
}: ContentToggleProps) {
  const handleToggle = () => {
    onToggle(viewMode === "card" ? "map" : "card");
  };

  return (
    <div className={cn("flex justify-between items-center gap-4", className)}>
      {/* 좌측: 안내 문구 */}
      <p className="text-sm text-gray-700 flex-1 pl-[2px]">
        관심있는 댄스 스튜디오의 일정을 확인하세요
      </p>

      {/* 우측: 슬라이딩 토글 */}
      <button
        onClick={handleToggle}
        className={cn(
          "relative shrink-0",
          "w-[80px] h-[26px] rounded-[20px]",
          "bg-[#D9D9D9]",
          "transition-all",
          "flex items-center justify-between px-2"
        )}
        style={{
          boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25) inset",
        }}
        aria-label={viewMode === "card" ? "카드형 보기" : "지도형 보기"}
      >
        {/* 배경 좌측 아이콘 (지도형 선택 시 보임) */}
        <img
          src={cardStacksIcon}
          alt=""
          className={cn(
            "w-3 h-3 transition-opacity duration-200 ml-[5px]",
            viewMode === "card" ? "opacity-0" : "opacity-40"
          )}
        />

        {/* 배경 우측 아이콘 (카드형 선택 시 보임) */}
        <img
          src={mapSearchIcon}
          alt=""
          className={cn(
            "w-3 h-3 transition-opacity duration-200 mr-[5px]",
            viewMode === "map" ? "opacity-0" : "opacity-40"
          )}
        />

        {/* 토글 버튼 (Thumb) */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            "w-[45px] h-[22px] rounded-[20px]",
            "border border-[#9E9E9E]",
            "bg-[#EEF3FF]",
            "transition-all duration-200 ease-in-out",
            "flex items-center justify-center",
            // 왼쪽(카드형): left-[2px], 오른쪽(지도형): left-[33px]
            viewMode === "card" ? "left-[2px]" : "left-[33px]"
          )}
          style={{
            boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* 활성 아이콘 */}
          <img
            src={viewMode === "card" ? cardStacksIcon : mapSearchIcon}
            alt={viewMode === "card" ? "카드형" : "지도형"}
            className="w-4 h-4"
          />
        </div>
      </button>
    </div>
  );
}
