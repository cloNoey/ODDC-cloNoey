from fastapi import Depends, HTTPException
from typing import Annotated, List

from server.features.dance_class.models import Class
from server.features.dance_class.dto.requests import (
    ClassCreateRequest,
    ClassEditRequest,
    ClassDeleteRequest
)
from server.features.dance_class.dto.responses import ClassResponse
from server.features.dance_class.store import ClassStore

class ClassService:
    def __init__(self, class_db_store: Annotated[ClassStore, Depends()]):
        self.class_db_store = class_db_store

    # ======================== CRUD ENDPOINTS ========================

    async def create_class(self, class_request: ClassCreateRequest) -> ClassResponse:
        """수업 생성"""
        class_obj = await self.class_db_store.create_class(
            studio_id=class_request.studio_id,
            dancer_ids=class_request.dancer_ids,
            class_date=class_request.class_date,
            start_time=class_request.start_time,
            level=class_request.level,
            genre=class_request.genre
        )
        return ClassResponse.from_class(class_obj)

    async def edit_class(self, class_request: ClassEditRequest) -> ClassResponse:
        """수업 정보 수정"""
        # 먼저 수업을 조회
        class_obj = await self.class_db_store.get_class_by_id(class_request.class_id)
        if class_obj is None:
            raise HTTPException(
                status_code=404,
                detail={"message": "수업을 찾을 수 없습니다."}
            )

        # 수정
        updated_class = await self.class_db_store.edit_class(
            class_obj=class_obj,
            dancer_ids=class_request.dancer_ids,
            class_date=class_request.class_date,
            start_time=class_request.start_time,
            level=class_request.level,
            genre=class_request.genre
        )
        return ClassResponse.from_class(updated_class)

    async def delete_class(self, class_request: ClassDeleteRequest) -> None:
        """수업 삭제"""
        # 먼저 수업을 조회
        class_obj = await self.class_db_store.get_class_by_id(class_request.class_id)
        if class_obj is None:
            raise HTTPException(
                status_code=404,
                detail={"message": "수업을 찾을 수 없습니다."}
            )

        # 삭제
        await self.class_db_store.delete_class(class_obj)

    # ======================== GETTER METHODS ========================

    async def get_class_by_id(self, class_id: str) -> Class | None:
        """수업 ID로 조회"""
        return await self.class_db_store.get_class_by_id(class_id)

    async def get_classes_by_studio(self, studio_id: str) -> List[Class]:
        """스튜디오별 수업 목록 조회"""
        return await self.class_db_store.get_classes_by_studio(studio_id)

    async def get_classes_by_dancer(self, dancer_id: str) -> List[Class]:
        """댄서별 수업 목록 조회"""
        return await self.class_db_store.get_classes_by_dancer(dancer_id)
