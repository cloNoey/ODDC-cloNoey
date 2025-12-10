import { cn } from "@/lib/utils";
import type { Studio } from "@/types";
import locationIcon from "@/assets/icons/location_on.svg";

interface StudioCardProps {
  studio: Studio;
  onClick?: (studio: Studio) => void;
  className?: string;
}

/**
 * StudioCard 컴포넌트
 * 개별 스튜디오 정보를 카드 형태로 표시
 */
export default function StudioCard({
  studio,
  onClick,
  className,
}: StudioCardProps) {
  const handleClick = () => {
    onClick?.(studio);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "border border-gray-300 rounded-lg pl-4 pb-5 pr-2 pt-2 cursor-pointer",
        "hover:shadow-md transition-shadow",
        "flex flex-col",
        className
      )}
    >
      {/* 근처역 - 위쪽, 우측 정렬, 8px */}
      {studio.nearby_station && (
        <div className="flex items-center justify-end">
          <img src={locationIcon} alt="위치" className="w-2 h-2" />
          <p className="text-[8px] text-gray-600">{studio.nearby_station}</p>
        </div>
      )}

      {/* 스튜디오 이름 - 가운데(아래쪽), 왼쪽 정렬, 20px */}
      <h3 className="font-semibold text-[20px] text-left truncate">
        {studio.name}
      </h3>
    </div>
  );
}
