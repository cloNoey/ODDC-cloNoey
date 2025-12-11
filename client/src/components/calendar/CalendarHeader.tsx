import { cn } from "@/lib/utils";
import type { Studio, Dancer } from "@/types";

interface CalendarHeaderProps<T extends Studio | Dancer> {
  entity: T;
  entityType: "studio" | "dancer";
  className?: string;
}

/**
 * CalendarHeader 컴포넌트
 * 스튜디오/댄서 정보 및 액션 버튼 표시
 */
export default function CalendarHeader<T extends Studio | Dancer>({
  entity,
  entityType,
  className,
}: CalendarHeaderProps<T>) {
  const isStudio = entityType === "studio";
  const studio = isStudio ? (entity as Studio) : null;

  return (
    <div className={cn("flex justify-between items-start gap-4", className)}>
      {/* 좌측: 엔티티 정보 */}
      <div className="flex-1">
        {/* 정보 확인 버튼 (placeholder - 추후 모달 구현) */}
        <button className="text-[12px] text-gray-500 mb-1 hover:text-gray-700 transition-colors">
          {isStudio ? "스튜디오 정보 보기 >" : "댄서 정보 보기 >"}
        </button>

        {/* 엔티티 이름 */}
        <h2 className="text-[24px] font-bold text-[#0C1A58] mb-1">
          {isStudio ? studio?.name : (entity as Dancer).name}
        </h2>

        {/* 위치 (Studio만) */}
        {isStudio && studio?.location && (
          <p className="text-[14px] text-gray-600 mb-2">{studio.location}</p>
        )}

        {/* Instagram/YouTube 링크 */}
        <div className="flex gap-3">
          {entity.instagram && (
            <a
              href={`https://instagram.com/${entity.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-[#0C1A58] hover:underline"
            >
              Instagram
            </a>
          )}

          {isStudio && studio?.youtube && (
            <a
              href={studio.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-[#0C1A58] hover:underline"
            >
              YouTube
            </a>
          )}
        </div>
      </div>

      {/* 우측: 사전신청 버튼 (Studio만) */}
      {isStudio && studio?.reservation_form && (
        <a
          href={studio.reservation_form}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "px-4 py-2 bg-[#0C1A58] text-white",
            "rounded-lg text-[14px] font-medium",
            "hover:bg-opacity-90 transition-colors",
            "whitespace-nowrap"
          )}
        >
          사전 신청
        </a>
      )}
    </div>
  );
}
