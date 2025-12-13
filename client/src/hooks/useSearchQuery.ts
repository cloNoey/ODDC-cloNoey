import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "@/api/services";
import type { SearchResultItem } from "@/types";

const DANCERS_PER_PAGE = 10;

/**
 * 검색 Hook
 * 백엔드 API를 사용하여 스튜디오/댄서 검색
 * @param searchQuery 검색어
 * @returns 스튜디오/댄서 검색 결과
 */
export function useSearchQuery(searchQuery: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) {
        return { studios: [], dancers: [] };
      }

      const response = await searchApi.search(searchQuery);
      const results = response.data.results || [];

      // 타입별로 분리
      const studios: SearchResultItem[] = results
        .filter((r: any) => r.type === "STUDIO")
        .map((r: any) => ({
          id: r.id,
          name: r.name,
          type: "studio" as const,
          instagram: r.instagram || "",
        }));

      const dancers: SearchResultItem[] = results
        .filter((r: any) => r.type === "DANCER")
        .map((r: any) => ({
          id: r.id,
          name: r.name,
          type: "dancer" as const,
          instagram: r.instagram || "",
        }));

      return { studios, dancers };
    },
    enabled: searchQuery.trim().length > 0, // 검색어가 있을 때만 활성화
  });

  // 댄서 페이지네이션 (프론트엔드에서 처리)
  const allDancers = data?.dancers ?? [];
  const [displayedCount, setDisplayedCount] = useState(DANCERS_PER_PAGE);

  const dancers = allDancers.slice(0, displayedCount);
  const hasMoreDancers = displayedCount < allDancers.length;

  const loadMoreDancers = () => {
    setDisplayedCount((prev) => prev + DANCERS_PER_PAGE);
  };

  return {
    studios: data?.studios ?? [],
    dancers,
    hasMoreDancers,
    isLoading,
    isFetchingNextPage: false,
    loadMoreDancers,
  };
}
