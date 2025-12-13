import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/calendar";
import { Logo, SearchBar } from "@/components/common";
import { mockStudios, mockClasses } from "@/data";
import ArrowLeftIcon from "@/assets/icons/arrow_left.svg";

/**
 * StudioDetailPage - 스튜디오 상세 페이지
 * 스튜디오 클래스 일정 표시
 */
export default function StudioDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const studio = mockStudios.find((s) => s.studio_id === id);

  if (!studio) {
    return (
      <div className="px-4 py-8">
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
    <div className="min-h-screen">
      {/* 상단바 (정적) */}
      <div
        className="bg-white"
        style={{
          paddingTop: "32px",
        }}
      >
        {/* 로고 - 메인페이지로 이동 */}
        <Link to="/">
          <Logo className="h-6" />
        </Link>

        {/* 검색바 영역 */}
        <div
          className="flex items-center justify-center gap-3 mx-10"
          style={{ marginTop: "12px" }}
        >
          {/* 왼쪽 뒤로가기 버튼 */}
          <button
            onClick={() => navigate("/search")}
            className="hover:opacity-70 transition-opacity flex-shrink-0"
            aria-label="검색 페이지로 이동"
          >
            <img src={ArrowLeftIcon} alt="뒤로가기" className="w-4 h-4" />
          </button>

          {/* 검색바 */}
          <SearchBar
            placeholder="어떤 댄서의 일정을 찾으시나요?"
            className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px]"
          />
        </div>
      </div>

      {/* 캘린더 */}
      <div className="px-4 py-8">
        <Calendar entity={studio} entityType="studio" classes={mockClasses} />
      </div>
    </div>
  );
}
