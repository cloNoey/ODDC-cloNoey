import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "@/components/common";
import {
  SearchInput,
  RecentSearches,
  SearchResults,
} from "@/components/search";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useRecentSearchStore } from "@/store/useRecentSearchStore";
import type { SearchResultItem, RecentSearchItem } from "@/types";

/**
 * SearchPage - 검색 페이지
 * 댄서 및 스튜디오 검색 기능
 */
export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { addRecentSearch } = useRecentSearchStore();

  // 검색 쿼리 실행
  const { studios, dancers, hasMoreDancers, loadMoreDancers } =
    useSearchQuery(searchQuery);

  // 검색 결과 클릭 핸들러
  const handleResultClick = (item: SearchResultItem) => {
    // 최근 검색어에 추가
    const recentItem: RecentSearchItem = {
      id: item.id,
      name: item.name,
      type: item.type,
      searchedAt: Date.now(),
    };
    addRecentSearch(recentItem);
  };

  // 최근 검색어 클릭 핸들러
  const handleRecentSearchClick = (item: RecentSearchItem) => {
    const path =
      item.type === "dancer" ? `/dancer/${item.id}` : `/studio/${item.id}`;
    navigate(path);
  };

  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 상단 고정 영역 */}
      <div className="sticky top-0 bg-white z-10 mx-10 pt-8 pb-4 border-b border-gray-100">
        {/* Logo - 좌측 정렬 */}
        <div className="mb-3 ml-2">
          <Link to="/">
            <Logo className="justify-start h-6" />
          </Link>
        </div>

        {/* SearchInput */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="댄서 또는 스튜디오를 검색하세요"
        />
      </div>

      {/* 하단 스크롤 가능 컨텐츠 영역 */}
      <div className="flex-1 overflow-y-auto px-8 py-2">
        {!hasSearchQuery ? (
          // 검색어 없을 때: 최근 검색어
          <RecentSearches onSearchItemClick={handleRecentSearchClick} />
        ) : (
          // 검색어 있을 때: 검색 결과
          <SearchResults
            studios={studios}
            dancers={dancers}
            hasMoreDancers={hasMoreDancers}
            onLoadMore={() => loadMoreDancers()}
            onResultClick={handleResultClick}
          />
        )}
      </div>
    </div>
  );
}
