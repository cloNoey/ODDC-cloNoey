import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { ClassSchedule } from "@/types";
import { GENRE_LABELS, LEVEL_LABELS } from "@/types";
import InstagramIcon from "@/assets/icons/instagram.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";

interface ClassCardProps {
  classSchedule: ClassSchedule;
  className?: string;
}

/**
 * ClassCard 컴포넌트
 * 수업 카드 - 시간, 댄서 정보, 장르/레벨 표시
 */
export default function ClassCard({
  classSchedule,
  className,
}: ClassCardProps) {
  const { start_time, dancers, genre, level } = classSchedule;

  return (
    <div
      className={cn(
        "flex-shrink-0 w-30 rounded-lg border-2 p-4",
        "flex flex-col justify-between",
        "bg-white shadow-sm",
        className
      )}
      style={{ borderColor: "var(--color-primary)", minHeight: "200px" }}
    >
      {/* 상단: 시간 */}
      <div
        className="font-bold text-lg"
        style={{ color: "var(--color-primary)" }}
      >
        {start_time}
      </div>

      {/* 중간: 댄서 목록 */}
      <div className="flex flex-col gap-2 flex-1 py-2">
        {dancers.map((dancer) => (
          <div
            key={dancer.dancer_id}
            className="flex items-center justify-between gap-2"
          >
            {/* 댄서 이름 */}
            <span className="text-sm font-medium text-gray-700 truncate">
              {dancer.main_name}
            </span>

            {/* 아이콘 */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* 인스타그램 아이콘 */}
              {dancer.instagram && (
                <a
                  href={`https://instagram.com/${dancer.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={InstagramIcon}
                    alt="Instagram"
                    className="w-3.5 h-3.5"
                  />
                </a>
              )}

              {/* 댄서 상세 페이지 링크 (캘린더 아이콘) */}
              <Link
                to={`/dancer/${dancer.dancer_id}`}
                className="hover:opacity-70 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={CalendarIcon} alt="Calendar" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 하단: 장르 & 레벨 */}
      <div className="flex flex-col gap-2 text-xs">
        {genre && (
          <span
            className="px-2 py-1 rounded"
            style={{
              backgroundColor: "var(--color-primary-bg)",
              color: "var(--color-primary)",
            }}
          >
            {GENRE_LABELS[genre]}
          </span>
        )}
        <span
          className="px-2 py-1 rounded"
          style={{
            backgroundColor: "var(--color-lavender)",
            color: "var(--color-primary)",
          }}
        >
          {LEVEL_LABELS[level]}
        </span>
      </div>
    </div>
  );
}
