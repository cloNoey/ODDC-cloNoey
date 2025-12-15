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

  // 1.0 = 원본, 0.9 = 90%로 축소 (10% 안쪽으로 모임), 0.8 = 80% ...
  const SCALE_FACTOR = 0.8;

  // 중앙(50)을 기준으로 거리를 구해서 배율을 곱하고, 다시 중앙 위치를 더해줌
  const scaledX = 51 + (studio.coordinates.x - 45) * SCALE_FACTOR;
  const scaledY = 57 + (studio.coordinates.y - 50) * SCALE_FACTOR * 1.35;

  const style = {
    left: `${scaledX}%`,
    // 기존의 +20px 오프셋은 유지
    top: `${scaledY}%`,
  };

  return (
    <div
      onClick={handleClick}
      style={style}
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-full",
        "cursor-pointer group z-10",
        className
      )}
    >
      {/* 핀 이미지 */}
      <div className="relative">
        {/* 핀 아이콘 - 추후 실제 핀 이미지로 교체 */}
        <div className="text-xl">📍</div>

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
