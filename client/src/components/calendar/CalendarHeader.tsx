import { cn } from "@/lib/utils";
import type { Studio, Dancer } from "@/types";
import { useEffect, useRef, useState } from "react";

import CircleRight from "@/assets/icons/circle_right.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import YoutubeIcon from "@/assets/icons/youtube.svg";

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
  const measureRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const entityName = isStudio ? studio?.name : (entity as Dancer).name;

  useEffect(() => {
    if (measureRef.current) {
      const isTextOverflowing = measureRef.current.scrollWidth > 120;
      setIsOverflowing(isTextOverflowing);
    }
  }, [entityName]);

  return (
    <div
      className={cn("flex justify-between items-start gap-4 pb-3", className)}
    >
      {/* 측정용 숨겨진 요소 - 항상 원래 크기(20px)로 측정 */}
      <span
        ref={measureRef}
        className="absolute invisible font-bold whitespace-nowrap"
        style={{ fontSize: "var(--text-xl)" }}
        aria-hidden="true"
      >
        {entityName}
      </span>
      <div className="flex-col w-full">
        {/* 정보 확인 버튼 (placeholder - 추후 모달 구현) */}
        <button
          className="ml-1 mb-1 transition-colors flex items-center gap-1 text-gray-500 hover:text-gray-700"
          style={{ fontSize: "var(--text-xs)" }}
        >
          <img src={CircleRight} className="w-[10px] h-[10px]" />
          {isStudio ? "스튜디오 정보 보기" : "댄서 정보 보기"}
        </button>

        {/* 엔티티 정보 + 결제 정보 */}
        <div className="flex gap-3 justify-between items-center w-full">
          {/* 좌측: 엔티티 정보 */}
          <div className="flex items-center">
            {/* 엔티티 이름 */}
            <h2
              className={cn(
                "flex justify-center items-center w-[140px] font-bold mr-2 border-r border-gray-400",
                isOverflowing ? "tracking-[-1.5px]" : ""
              )}
              style={{
                color: "var(--color-primary)",
                fontSize: isOverflowing ? "var(--text-xl)" : "var(--text-2xl)",
                fontFamily: "var(--font-calendar-number)",
              }}
            >
              {entityName}
            </h2>
            <div
              className="flex flex-col justify-center"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-primary)",
              }}
            >
              {/* 위치 (Studio만) */}
              {isStudio && studio?.location && (
                <p className="flex">{studio.location}</p>
              )}
              {/* Instagram/YouTube 링크 */}
              <div className="flex gap-3 items-center">
                {entity.instagram && (
                  <div className="flex gap-1 items-center">
                    <img src={InstagramIcon} className="w-[10px] h-[10px]" />
                    <a
                      href={`https://instagram.com/${entity.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {/* {entity.instagram} */}
                      Instagram
                    </a>
                  </div>
                )}

                {isStudio && studio?.youtube && (
                  <div className="flex gap-1 items-center">
                    <img src={YoutubeIcon} className="w-[12px] h-[12px]" />
                    <a
                      href={studio.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {/* {studio.youtube.split("@")[1]} */}
                      Youtube
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 결제 정보 */}
          <div className="flex items-center justify-end">
            {isStudio && !studio?.reservation_form && (
              <div
                className="px-2 py-1 border bg-transparent rounded font-medium whitespace-nowrap"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary)",
                  fontSize: "var(--text-sm)",
                }}
              >
                현장결제만
              </div>
            )}
            {isStudio && studio?.reservation_form && (
              <a
                href={studio.reservation_form}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-white)",
                  fontSize: "var(--text-sm)",
                }}
              >
                사전 신청하러 가기
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
