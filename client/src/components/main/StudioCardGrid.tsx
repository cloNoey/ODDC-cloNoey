import { cn } from "@/lib/utils";
import type { Studio } from "@/types";
import StudioCard from "./StudioCard";

interface StudioCardGridProps {
  studios: Studio[];
  className?: string;
}

/**
 * StudioCardGrid 컴포넌트
 * 스튜디오 카드를 2열 그리드로 표시
 */
export default function StudioCardGrid({
  studios,
  className,
}: StudioCardGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-5",
        // gap-5 = 20px (간격)
        className
      )}
    >
      {studios.map((studio) => (
        <StudioCard key={studio.studio_id} studio={studio} />
      ))}
    </div>
  );
}
