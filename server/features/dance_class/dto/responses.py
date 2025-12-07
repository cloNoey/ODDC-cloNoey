from pydantic import BaseModel
from typing import List, Optional

from server.features.dance_class.models import Class


class ClassResponse(BaseModel):
    class_id: str
    studio_id: str
    dancer_ids: List[str]  # Just IDs, not full dancer objects
    class_date: str        # YYYY-MM-DD format
    start_time: str        # HH:MM:SS format
    level: Optional[str]   # "BASIC" or "ADVANCED" or None
    genre: Optional[str]   # Genre enum value or None

    @staticmethod
    def from_class(class_obj: Class) -> "ClassResponse":
        return ClassResponse(
            class_id=class_obj.class_id,
            studio_id=class_obj.studio_id,
            dancer_ids=[dancer.dancer_id for dancer in class_obj.dancers],
            class_date=class_obj.class_date.strftime("%Y-%m-%d"),
            start_time=class_obj.start_time.strftime("%H:%M:%S"),
            level=class_obj.level.value if class_obj.level else None,
            genre=class_obj.genre.value if class_obj.genre else None
        )
