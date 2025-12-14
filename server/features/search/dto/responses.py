from pydantic import BaseModel
from typing import List, Optional


class SearchResultItem(BaseModel):
    """검색 결과 항목 (경량)"""
    id: str
    name: str
    type: str  # "DANCER" or "STUDIO"
    instagram: Optional[str] = None


class SearchResponse(BaseModel):
    """통합 검색 결과"""
    results: List[SearchResultItem]
