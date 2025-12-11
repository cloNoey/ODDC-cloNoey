from fastapi import Depends, HTTPException
from typing import Annotated, List

from server.features.studio.models import Studio
from server.features.studio.dto.requests import (
    StudioCreateRequest,
    StudioEditRequest,
    StudioDeleteRequest
)
from server.features.studio.dto.responses import StudioResponse
from server.features.studio.store import StudioStore


class StudioService:
    def __init__(self, studio_db_store: Annotated[StudioStore, Depends()]):
        self.studio_db_store = studio_db_store

    # ======================== CRUD ENDPOINTS ========================

    async def create_studio(self, studio_request: StudioCreateRequest) -> StudioResponse:
        """스튜디오 생성"""
        studio = await self.studio_db_store.create_studio(
            name=studio_request.name,
            instagram=studio_request.instagram,
            location=studio_request.location,
            lat=studio_request.lat,
            lng=studio_request.lng,
            station=studio_request.station,
            city=studio_request.city,
            district=studio_request.district,
            email=studio_request.email,
            website=studio_request.website,
            reservation_form=studio_request.reservation_form,
            default_duration=studio_request.default_duration,
            default_price=studio_request.default_price,
            youtube=studio_request.youtube,
            bio=studio_request.bio,
            user_id=studio_request.user_id
        )
        return StudioResponse.from_studio(studio)

    async def edit_studio(self, studio_request: StudioEditRequest) -> StudioResponse:
        """스튜디오 정보 수정"""
        # 먼저 스튜디오를 조회
        studio = await self.studio_db_store.get_studio_by_id(studio_request.studio_id)
        if studio is None:
            raise HTTPException(
                status_code=404,
                detail={"message": "스튜디오를 찾을 수 없습니다."}
            )

        # 수정
        updated_studio = await self.studio_db_store.edit_studio(
            studio=studio,
            name=studio_request.name,
            instagram=studio_request.instagram,
            location=studio_request.location,
            lat=studio_request.lat,
            lng=studio_request.lng,
            station=studio_request.station,
            city=studio_request.city,
            district=studio_request.district,
            email=studio_request.email,
            website=studio_request.website,
            reservation_form=studio_request.reservation_form,
            default_duration=studio_request.default_duration,
            default_price=studio_request.default_price,
            youtube=studio_request.youtube,
            bio=studio_request.bio,
            is_verified=studio_request.is_verified
        )
        return StudioResponse.from_studio(updated_studio)

    async def delete_studio(self, studio_request: StudioDeleteRequest) -> None:
        """스튜디오 삭제"""
        # 먼저 스튜디오를 조회
        studio = await self.studio_db_store.get_studio_by_id(studio_request.studio_id)
        if studio is None:
            raise HTTPException(
                status_code=404,
                detail={"message": "스튜디오를 찾을 수 없습니다."}
            )

        # 삭제
        await self.studio_db_store.delete_studio(studio)

    # ======================== GETTER METHODS ========================

    async def get_studio_by_id(self, studio_id: str) -> Studio | None:
        """스튜디오 ID로 조회"""
        return await self.studio_db_store.get_studio_by_id(studio_id)

    async def get_studio_by_name(self, name: str) -> Studio | None:
        """스튜디오 이름으로 조회"""
        return await self.studio_db_store.get_studio_by_name(name)

    async def get_studio_by_instagram(self, instagram: str) -> Studio | None:
        """인스타그램 아이디로 조회"""
        return await self.studio_db_store.get_studio_by_instagram(instagram)

    async def get_all_studios(self) -> List[Studio]:
        """전체 스튜디오 목록 조회"""
        return await self.studio_db_store.get_all_studios()
