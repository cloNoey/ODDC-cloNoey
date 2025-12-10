import { cn } from "@/lib/utils";
import type { Studio } from "@/types";

interface MapPinProps {
  studio: Studio;
  onClick?: (studio: Studio) => void;
  className?: string;
}

/**
 * MapPin 컴포넌트
 * 지도 위에 스튜디오 위치를 핀으로 표시
 */
export default function MapPin({ studio, onClick, className }: MapPinProps) {
  const handleClick = () => {
    onClick?.(studio);
  };

  if (!studio.coordinates) {
    return null;
  }

  // 좌표를 %로 변환 (지도 이미지 기준)
  const style = {
    left: `${studio.coordinates.x}%`,
    top: `${studio.coordinates.y}%`,
  };

  return (
    <div
      onClick={handleClick}
      style={style}
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-full",
        "cursor-pointer group",
        className
      )}
    >
      {/* 핀 이미지 */}
      <div className="relative">
        {/* 핀 아이콘 - 추후 실제 핀 이미지로 교체 */}
        <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md"></div>

        {/* 스튜디오 이름 카드 */}
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                        whitespace-nowrap bg-white px-2 py-1 rounded shadow-md text-xs
                        opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {studio.name}
        </div>
      </div>
    </div>
  );
}
