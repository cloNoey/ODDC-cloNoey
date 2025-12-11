import { useParams } from "react-router-dom";
import { Calendar } from "@/components/calendar";
import { mockDancers, mockClasses } from "@/data";

/**
 * DancerDetailPage - 댄서 상세 페이지
 * 댄서 클래스 일정 표시
 */
export default function DancerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dancer = mockDancers.find((d) => d.dancer_id === id);

  if (!dancer) {
    return (
      <div className="px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900">
          댄서를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600 mt-2">
          해당 ID의 댄서가 존재하지 않습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="px-8 py-8">
      <Calendar entity={dancer} entityType="dancer" classes={mockClasses} />
    </div>
  );
}
