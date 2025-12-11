import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RecentSearchItem } from "@/types";

interface RecentSearchState {
  // 상태
  recentDancers: RecentSearchItem[];
  recentStudios: RecentSearchItem[];

  // 액션
  addRecentSearch: (item: RecentSearchItem) => void;
  removeRecentSearch: (id: string, type: "dancer" | "studio") => void;
  clearRecentSearches: (type?: "dancer" | "studio") => void;
}

/**
 * 최근 검색어 저장 Store
 * localStorage persist로 영구 저장
 */
export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set) => ({
      recentDancers: [],
      recentStudios: [],

      addRecentSearch: (item) =>
        set((state) => {
          const listKey =
            item.type === "dancer" ? "recentDancers" : "recentStudios";
          const currentList = state[listKey];

          // 중복 제거 (같은 ID가 있으면 제거)
          const filtered = currentList.filter((i) => i.id !== item.id);

          // 최신 항목을 맨 앞에 추가, 최대 10개 유지
          const updated = [item, ...filtered].slice(0, 10);

          return {
            [listKey]: updated,
          };
        }),

      removeRecentSearch: (id, type) =>
        set((state) => {
          const listKey =
            type === "dancer" ? "recentDancers" : "recentStudios";
          return {
            [listKey]: state[listKey].filter((item) => item.id !== id),
          };
        }),

      clearRecentSearches: (type) =>
        set(() => {
          if (!type) {
            return { recentDancers: [], recentStudios: [] };
          }
          const listKey =
            type === "dancer" ? "recentDancers" : "recentStudios";
          return { [listKey]: [] };
        }),
    }),
    {
      name: "recent-search-storage", // localStorage key
    }
  )
);
