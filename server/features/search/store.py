from sqlalchemy.sql import select
from typing import List, Tuple

from server.database.connection import SESSION
from server.features.studio.models import Studio
from server.features.dancer.models import Dancer


class SearchStore:
    def __init__(self) -> None:
        self.session = SESSION

    async def search(self, keyword: str) -> List[Tuple[str, str, str]]:
        """스튜디오와 댄서를 검색 (ID, 이름, type만 반환)"""
        # 스튜디오: ID, name만 SELECT
        studio_result = await self.session.execute(
            select(Studio.studio_id, Studio.name)
            .where(Studio.name.like(f"{keyword}%"))
        )
        studios = [(row.studio_id, row.name, "STUDIO") for row in studio_result.all()]

        # 댄서: ID, main_name만 SELECT
        dancer_result = await self.session.execute(
            select(Dancer.dancer_id, Dancer.main_name)
            .where(Dancer.main_name.like(f"{keyword}%"))
        )
        dancers = [(row.dancer_id, row.main_name, "DANCER") for row in dancer_result.all()]

        # 통합 반환
        return studios + dancers
