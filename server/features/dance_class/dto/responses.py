from pydantic import BaseModel
from typing import List, Optional

from server.features.dance_class.models import Class


class ClassResponse(BaseModel):
    class_id: str
    studio_id: str
    dancer_ids: List[str]  # Just IDs, not full dancer objects
    timezone: str          # Timezone (e.g., 'Asia/Seoul')
    class_datetime: str    # ISO8601 format
    level: Optional[str]   # "BASIC" or "ADVANCED" or None
    genre: Optional[str]   # Genre enum value or None

    @staticmethod
    def from_class(class_obj: Class) -> "ClassResponse":
        return ClassResponse(
            class_id=class_obj.class_id,
            studio_id=class_obj.studio_id,
            dancer_ids=[dancer.dancer_id for dancer in class_obj.dancers],
            timezone=class_obj.timezone,
            class_datetime=class_obj.class_datetime.isoformat(),
            level=class_obj.level.value if class_obj.level else None,
            genre=class_obj.genre.value if class_obj.genre else None
        )


class DancerInfo(BaseModel):
    """수업에 포함된 댄서 상세 정보"""
    dancer_id: str
    main_name: str
    instagram: Optional[str]


class StudioInfo(BaseModel):
    """수업의 스튜디오 정보"""
    studio_id: str
    name: str


class ClassDetailResponse(BaseModel):
    """수업 상세 정보 (댄서/스튜디오 정보 포함)"""
    class_id: str
    studio: StudioInfo
    dancers: List[DancerInfo]
    timezone: str          # Timezone (e.g., 'Asia/Seoul')
    class_datetime: str    # ISO8601 format
    level: Optional[str]   # "BASIC" or "ADVANCED" or None
    genre: Optional[str]   # Genre enum value or None

    @staticmethod
    def from_class(class_obj: Class) -> "ClassDetailResponse":
        return ClassDetailResponse(
            class_id=class_obj.class_id,
            studio=StudioInfo(
                studio_id=class_obj.studio.studio_id,
                name=class_obj.studio.name
            ),
            dancers=[
                DancerInfo(
                    dancer_id=dancer.dancer_id,
                    main_name=dancer.main_name,
                    instagram=dancer.instagram
                )
                for dancer in class_obj.dancers
            ],
            timezone=class_obj.timezone,
            class_datetime=class_obj.class_datetime.isoformat(),
            level=class_obj.level.value if class_obj.level else None,
            genre=class_obj.genre.value if class_obj.genre else None
        )
