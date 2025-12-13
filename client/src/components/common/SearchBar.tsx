import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import searchIcon from "@/assets/icons/search_icon.svg";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

/**
 * SearchBar 컴포넌트
 * 클릭 시 검색 페이지로 이동하는 버튼
 * 다른 페이지에서도 재사용 가능
 */
export default function SearchBar({
  className,
  placeholder = "어떤 클래스를 찾고 있나요?",
}: SearchBarProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/search");
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "h-[40px] rounded-[20px]",
        "flex items-center justify-center",
        "relative cursor-pointer",
        className
      )}
      style={{ backgroundColor: "var(--color-lavender)" }}
      aria-label="검색 페이지로 이동"
    >
      {/* 중앙 텍스트 */}
      <span
        className="absolute left-1/2 transform -translate-x-1/2 text-[12px]"
        style={{ color: "var(--color-primary)" }}
      >
        {placeholder}
      </span>

      {/* 우측 검색 아이콘 */}
      <div className="absolute right-4 sm:right-4 w-[20px] h-[20px] flex items-center justify-center">
        <img src={searchIcon} alt="검색" className="w-full h-full" />
      </div>
    </button>
  );
}
