from pydantic import BaseModel, Field, field_validator
from typing import List, Optional


class ClassCreateRequest(BaseModel):
    """수업 생성 요청"""
    studio_id: str = Field(
        description="스튜디오 ID",
        examples=["550e8400-e29b-41d4-a716-446655440000"]
    )
    dancer_ids: List[str] = Field(
        description="댄서 ID 목록",
        examples=[["550e8400-e29b-41d4-a716-446655440001", "550e8400-e29b-41d4-a716-446655440002"]],
        min_length=1
    )
    timezone: str = Field(
        description="타임존 (IANA timezone format)",
        examples=["Asia/Seoul", "America/New_York"],
        default="Asia/Seoul"
    )
    class_datetime: str = Field(
        description="수업 날짜 및 시간 (ISO8601 형식)",
        examples=["2025-01-15T14:00:00+09:00", "2025-02-20T19:30:00+09:00"]
    )
    level: Optional[str] = Field(
        default=None,
        description="수업 레벨 (BASIC, ADVANCED)",
        examples=["BASIC", "ADVANCED"]
    )
    genre: Optional[str] = Field(
        default=None,
        description="댄스 장르",
        examples=["HIPHOP", "CHOREOGRAPHY", "POPPING"]
    )

    @field_validator('class_datetime')
    @classmethod
    def validate_datetime_format(cls, v: str) -> str:
        """ISO8601 datetime 형식 검증"""
        try:
            from datetime import datetime
            # ISO8601 형식 파싱 (Z를 +00:00으로 변환)
            datetime.fromisoformat(v.replace('Z', '+00:00'))
            return v
        except ValueError:
            raise ValueError('Invalid datetime format. Expected ISO8601 (e.g., 2025-01-15T14:00:00+09:00)')


class ClassEditRequest(BaseModel):
    """수업 정보 수정 요청"""
    class_id: str = Field(
        description="수업 ID"
    )
    dancer_ids: Optional[List[str]] = Field(
        default=None,
        description="댄서 ID 목록 (전체 교체)"
    )
    timezone: Optional[str] = Field(
        default=None,
        description="타임존 (IANA timezone format)"
    )
    class_datetime: Optional[str] = Field(
        default=None,
        description="수업 날짜 및 시간 (ISO8601 형식)"
    )
    level: Optional[str] = Field(
        default=None,
        description="수업 레벨"
    )
    genre: Optional[str] = Field(
        default=None,
        description="댄스 장르"
    )

    @field_validator('class_datetime')
    @classmethod
    def validate_datetime_format(cls, v: Optional[str]) -> Optional[str]:
        """ISO8601 datetime 형식 검증"""
        if v is None:
            return v
        try:
            from datetime import datetime
            # ISO8601 형식 파싱 (Z를 +00:00으로 변환)
            datetime.fromisoformat(v.replace('Z', '+00:00'))
            return v
        except ValueError:
            raise ValueError('Invalid datetime format. Expected ISO8601 (e.g., 2025-01-15T14:00:00+09:00)')


class ClassDeleteRequest(BaseModel):
    """수업 삭제 요청"""
    class_id: str = Field(
        description="삭제할 수업 ID"
    )
