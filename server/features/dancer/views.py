from fastapi import APIRouter, File, UploadFile, HTTPException
from typing import Annotated
from fastapi import Depends

from server.features.dancer.service import DancerService
from server.features.dancer.dto.requests import *
from server.features.dancer.dto.responses import DancerResponse, DancerBulkUploadResponse
from starlette.status import HTTP_200_OK, HTTP_204_NO_CONTENT

dancer_router = APIRouter()

# ======================== CREATE ========================

@dancer_router.post("/create", status_code=HTTP_200_OK,
                      summary="댄서 생성",
                      description="새로운 댄서를 생성합니다.")
async def create_dancer(
    dancer_service: Annotated[DancerService, Depends()],
    dancer_request: DancerCreateRequest,
) -> DancerResponse:
    """댄서 생성 엔드포인트"""
    return await dancer_service.create_dancer(dancer_request)

@dancer_router.post("/bulk-upload", status_code=HTTP_200_OK,
                      summary="댄서 대량 업로드",
                      description="CSV 파일로 여러 댄서를 한 번에 생성/업데이트합니다.")
async def bulk_upload_dancers(
    dancer_service: Annotated[DancerService, Depends()],
    file: UploadFile = File(...)
) -> DancerBulkUploadResponse:
    """CSV 파일로 댄서 대량 업로드"""
    return await dancer_service.bulk_upload_dancers(file)

# ======================== READ ========================

@dancer_router.get("/{dancer_id}", status_code=HTTP_200_OK,
                     summary="댄서 조회",
                     description="댄서 ID로 댄서 정보를 조회합니다.")
async def get_dancer_by_id(
    dancer_service: Annotated[DancerService, Depends()],
    dancer_id: str
) -> DancerResponse:
    """댄서 ID로 조회"""
    dancer = await dancer_service.get_dancer_by_id(dancer_id)
    if dancer is None:
        raise HTTPException(
            status_code=404,
            detail={"message": "댄서를 찾을 수 없습니다."}
        )
    return DancerResponse.from_dancer(dancer)

@dancer_router.get("/instagram/{instagram}", status_code=HTTP_200_OK,
                     summary="댄서 조회 (인스타그램)",
                     description="인스타그램 아이디로 댄서 정보를 조회합니다.")
async def get_dancer_by_instagram(
    dancer_service: Annotated[DancerService, Depends()],
    instagram: str
) -> DancerResponse:
    """인스타그램 아이디로 조회"""
    dancer = await dancer_service.get_dancer_by_instagram(instagram)
    if dancer is None:
        raise HTTPException(
            status_code=404,
            detail={"message": "댄서를 찾을 수 없습니다."}
        )
    return DancerResponse.from_dancer(dancer)

# ======================== UPDATE ========================

@dancer_router.patch("/{dancer_id}", status_code=HTTP_200_OK,
                       summary="댄서 정보 수정",
                       description="댄서의 정보를 수정합니다.")
async def edit_dancer(
    dancer_service: Annotated[DancerService, Depends()],
    dancer_request: DancerEditRequest,
) -> DancerResponse:
    """댄서 정보 수정"""
    return await dancer_service.edit_dancer(dancer_request)

@dancer_router.post("/{dancer_id}/names", status_code=HTTP_200_OK,
                      summary="댄서 이름 추가",
                      description="댄서의 새로운 이름을 추가합니다.")
async def add_dancer_name(
    dancer_service: Annotated[DancerService, Depends()],
    dancer_request: DancerNameAddRequest,
) -> DancerResponse:
    """댄서 이름 추가"""
    return await dancer_service.add_dancer_name(dancer_request)

# ======================== DELETE ========================

@dancer_router.delete("/{dancer_id}", status_code=HTTP_204_NO_CONTENT,
                        summary="댄서 삭제",
                        description="댄서를 삭제합니다.")
async def delete_dancer(
    dancer_service: Annotated[DancerService, Depends()],
    dancer_request: DancerDeleteRequest,
) -> None:
    """댄서 삭제"""
    return await dancer_service.delete_dancer(dancer_request)