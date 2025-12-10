import { cn } from "@/lib/utils";
import type { Studio } from "@/types";
import MapPin from "./MapPin";

interface StudioMapViewProps {
  studios: Studio[];
  className?: string;
}

/**
 * StudioMapView 컴포넌트
 * 서울 지도 배경 위에 스튜디오 핀을 표시
 */
export default function StudioMapView({
  studios,
  className,
}: StudioMapViewProps) {
  return (
    <div
      className={cn(
        "relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden px-8",
        className
      )}
    >
      {/* 배경 지도 이미지 */}
      <div className="absolute inset-0">
        {/* 임시 placeholder - 추후 실제 지도 이미지로 교체 */}
        <img
          src="/map-seoul.png"
          alt="서울 지도"
          className="w-full h-full object-cover"
          onError={(e) => {
            // 이미지 로드 실패 시 fallback
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          서울 지도 (추후 이미지 추가)
        </div>
      </div>

      {/* 스튜디오 핀들 */}
      {studios
        .filter((studio) => studio.coordinates)
        .map((studio) => (
          <MapPin key={studio.studio_id} studio={studio} />
        ))}
    </div>
  );
}
