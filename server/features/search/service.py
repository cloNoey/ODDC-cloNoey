from fastapi import Depends
from typing import Annotated

from server.features.search.store import SearchStore
from server.features.search.dto.responses import SearchResponse, SearchResultItem


class SearchService:
    def __init__(self, search_db_store: Annotated[SearchStore, Depends()]):
        self.search_db_store = search_db_store

    async def search(self, keyword: str) -> SearchResponse:
        """통합 검색"""
        results = await self.search_db_store.search(keyword)

        return SearchResponse(
            results=[
                SearchResultItem(id=id, name=name, type=type)
                for id, name, type in results
            ]
        )
