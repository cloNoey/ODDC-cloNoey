import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import searchIcon from "@/assets/icons/search_icon.svg";
import arrowLeftIcon from "@/assets/icons/arrow_left.svg";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * SearchInput 컴포넌트
 * 검색어 입력 필드
 */
export default function SearchInput({
  value,
  onChange,
  placeholder = "댄서 또는 스튜디오를 검색하세요",
  className,
}: SearchInputProps) {
  const navigate = useNavigate();

  // 메인 페이지로 이동 핸들러
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center gap-3 w-full px-2">
      {/* 1. 뒤로가기 버튼 (검색바 좌측 외부 배치) */}
      <button
        onClick={handleBackClick}
        className="w-4 h-4 flex-shrink-0 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
        aria-label="메인 페이지로 돌아가기"
      >
        <img src={arrowLeftIcon} alt="뒤로가기" className="w-full h-full" />
      </button>

      {/* 2. 검색바 영역 (남은 너비 모두 차지) */}
      <div
        className={cn(
          "relative flex-1 h-[40px] rounded-[20px]",
          "flex items-center",
          className
        )}
        style={{ backgroundColor: "var(--color-lavender)" }}
      >
        {/* 입력 필드 */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-full px-4 pr-12",
            "bg-transparent",
            "focus:outline-none rounded-[20px]"
          )}
          style={{
            fontSize: "var(--text-base)",
            color: "var(--color-primary)",
          }}
          aria-label="검색어 입력"
        />

        {/* 우측 검색 아이콘 */}
        <div className="absolute right-4 w-[20px] h-[20px] pointer-events-none">
          <img src={searchIcon} alt="검색" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
