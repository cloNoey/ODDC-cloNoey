from fastapi import APIRouter, Query, HTTPException, Depends
from typing import Annotated, List
from starlette.status import HTTP_200_OK, HTTP_204_NO_CONTENT

from server.features.dance_class.service import ClassService
from server.features.dance_class.dto.requests import (
    ClassCreateRequest,
    ClassEditRequest,
    ClassDeleteRequest
)
from server.features.dance_class.dto.responses import ClassResponse

class_router = APIRouter()

# ======================== CREATE ========================

@class_router.post("/create", status_code=HTTP_200_OK,
                   summary="수업 생성",
                   description="새로운 수업을 생성합니다.")
async def create_class(
    class_service: Annotated[ClassService, Depends()],
    class_request: ClassCreateRequest,
) -> ClassResponse:
    """수업 생성 엔드포인트"""
    return await class_service.create_class(class_request)

# ======================== READ ========================

@class_router.get("/{class_id}", status_code=HTTP_200_OK,
                  summary="수업 조회 (ID)",
                  description="수업 ID로 수업 정보를 조회합니다.")
async def get_class_by_id(
    class_service: Annotated[ClassService, Depends()],
    class_id: str
) -> ClassResponse:
    """수업 ID로 조회"""
    class_obj = await class_service.get_class_by_id(class_id)
    if class_obj is None:
        raise HTTPException(
            status_code=404,
            detail={"message": "수업을 찾을 수 없습니다."}
        )
    return ClassResponse.from_class(class_obj)

@class_router.get("/studio/{studio_id}", status_code=HTTP_200_OK,
                  summary="스튜디오별 수업 목록 조회",
                  description="특정 스튜디오의 모든 수업을 조회합니다.")
async def get_classes_by_studio(
    class_service: Annotated[ClassService, Depends()],
    studio_id: str
) -> List[ClassResponse]:
    """스튜디오별 수업 목록 조회"""
    classes = await class_service.get_classes_by_studio(studio_id)
    return [ClassResponse.from_class(c) for c in classes]

@class_router.get("/dancer/{dancer_id}", status_code=HTTP_200_OK,
                  summary="댄서별 수업 목록 조회",
                  description="특정 댄서가 진행하는 모든 수업을 조회합니다.")
async def get_classes_by_dancer(
    class_service: Annotated[ClassService, Depends()],
    dancer_id: str
) -> List[ClassResponse]:
    """댄서별 수업 목록 조회"""
    classes = await class_service.get_classes_by_dancer(dancer_id)
    return [ClassResponse.from_class(c) for c in classes]

# ======================== UPDATE ========================

@class_router.patch("/{class_id}", status_code=HTTP_200_OK,
                    summary="수업 정보 수정",
                    description="수업의 정보를 수정합니다.")
async def edit_class(
    class_service: Annotated[ClassService, Depends()],
    class_request: ClassEditRequest,
) -> ClassResponse:
    """수업 정보 수정"""
    return await class_service.edit_class(class_request)

# ======================== DELETE ========================

@class_router.delete("/{class_id}", status_code=HTTP_204_NO_CONTENT,
                     summary="수업 삭제",
                     description="수업을 삭제합니다.")
async def delete_class(
    class_service: Annotated[ClassService, Depends()],
    class_request: ClassDeleteRequest,
) -> None:
    """수업 삭제"""
    return await class_service.delete_class(class_request)
