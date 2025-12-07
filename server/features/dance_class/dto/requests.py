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
    class_date: str = Field(
        description="수업 날짜 (YYYY-MM-DD 형식)",
        examples=["2025-01-15", "2025-02-20"]
    )
    start_time: str = Field(
        description="수업 시작 시간 (HH:MM:SS 형식)",
        examples=["14:00:00", "19:30:00"]
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

    @field_validator('class_date')
    @classmethod
    def validate_date_format(cls, v: str) -> str:
        """날짜 형식 검증 (YYYY-MM-DD)"""
        try:
            from datetime import datetime
            datetime.strptime(v, "%Y-%m-%d")
            return v
        except ValueError:
            raise ValueError('Invalid date format. Expected YYYY-MM-DD')

    @field_validator('start_time')
    @classmethod
    def validate_time_format(cls, v: str) -> str:
        """시간 형식 검증 (HH:MM:SS)"""
        try:
            from datetime import datetime
            datetime.strptime(v, "%H:%M:%S")
            return v
        except ValueError:
            raise ValueError('Invalid time format. Expected HH:MM:SS')


class ClassEditRequest(BaseModel):
    """수업 정보 수정 요청"""
    class_id: str = Field(
        description="수업 ID"
    )
    dancer_ids: Optional[List[str]] = Field(
        default=None,
        description="댄서 ID 목록 (전체 교체)"
    )
    class_date: Optional[str] = Field(
        default=None,
        description="수업 날짜 (YYYY-MM-DD)"
    )
    start_time: Optional[str] = Field(
        default=None,
        description="수업 시작 시간 (HH:MM:SS)"
    )
    level: Optional[str] = Field(
        default=None,
        description="수업 레벨"
    )
    genre: Optional[str] = Field(
        default=None,
        description="댄스 장르"
    )

    @field_validator('class_date')
    @classmethod
    def validate_date_format(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        try:
            from datetime import datetime
            datetime.strptime(v, "%Y-%m-%d")
            return v
        except ValueError:
            raise ValueError('Invalid date format. Expected YYYY-MM-DD')

    @field_validator('start_time')
    @classmethod
    def validate_time_format(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        try:
            from datetime import datetime
            datetime.strptime(v, "%H:%M:%S")
            return v
        except ValueError:
            raise ValueError('Invalid time format. Expected HH:MM:SS')


class ClassDeleteRequest(BaseModel):
    """수업 삭제 요청"""
    class_id: str = Field(
        description="삭제할 수업 ID"
    )
