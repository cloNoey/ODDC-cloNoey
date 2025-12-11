import { useParams } from "react-router-dom";
import { Calendar } from "@/components/calendar";
import { mockStudios, mockClasses } from "@/data";

/**
 * StudioDetailPage - 스튜디오 상세 페이지
 * 스튜디오 클래스 일정 표시
 */
export default function StudioDetailPage() {
  const { id } = useParams<{ id: string }>();
  const studio = mockStudios.find((s) => s.studio_id === id);

  if (!studio) {
    return (
      <div className="px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900">
          스튜디오를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600 mt-2">
          해당 ID의 스튜디오가 존재하지 않습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="px-8 py-8">
      <Calendar entity={studio} entityType="studio" classes={mockClasses} />
    </div>
  );
}
