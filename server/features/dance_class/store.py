from sqlalchemy.sql import select
from datetime import datetime, date as date_type, time as time_type
from typing import List, Optional

from server.database.connection import SESSION
from server.database.annotation import transactional
from server.features.dance_class.models import Class, Level
from server.features.dancer.models import Dancer, Genre
from server.features.dance_class.errors import class_creation_error, class_edit_error, class_delete_error

class ClassStore:
    def __init__(self) -> None:
        self.session = SESSION

    # ======================== READ OPERATIONS ========================

    async def get_class_by_id(self, class_id: str) -> Class | None:
        """수업 ID로 조회"""
        return await self.session.scalar(
            select(Class)
            .where(Class.class_id == class_id)
            .execution_options(populate_existing=True)
        )

    async def get_classes_by_studio(self, studio_id: str) -> List[Class]:
        """스튜디오별 수업 목록 조회"""
        result = await self.session.scalars(
            select(Class)
            .where(Class.studio_id == studio_id)
            .execution_options(populate_existing=True)
        )
        return list(result.all())

    async def get_classes_by_dancer(self, dancer_id: str) -> List[Class]:
        """댄서별 수업 목록 조회 (association table 조인)"""
        result = await self.session.scalars(
            select(Class)
            .join(Class.dancers)
            .where(Dancer.dancer_id == dancer_id)
            .execution_options(populate_existing=True)
        )
        return list(result.all())

    # ======================== WRITE OPERATIONS ========================

    @transactional
    async def create_class(
        self,
        studio_id: str,
        dancer_ids: List[str],
        timezone: str,            # IANA timezone format
        class_datetime: str,      # ISO8601 datetime string
        level: Optional[str] = None,  # "BASIC" or "ADVANCED" or None
        genre: Optional[str] = None
    ) -> Class:
        """새 수업 생성"""
        try:
            # Parse ISO8601 datetime
            parsed_datetime = datetime.fromisoformat(class_datetime.replace('Z', '+00:00'))

            # Fetch dancers
            dancers_result = await SESSION.scalars(
                select(Dancer).where(Dancer.dancer_id.in_(dancer_ids))
            )
            dancers = list(dancers_result.all())

            # Validate all dancer IDs exist
            if len(dancers) != len(dancer_ids):
                raise ValueError("One or more dancer IDs not found")

            class_obj = Class(
                studio_id=studio_id,
                timezone=timezone,
                class_datetime=parsed_datetime,
                genre=Genre(genre) if genre else None,
                level=Level(level) if level else Level.BASIC,  # Default to BASIC if not provided
                dancers=dancers
            )
            SESSION.add(class_obj)
            return class_obj
        except Exception as e:
            raise class_creation_error(e)

    @transactional
    async def edit_class(
        self,
        class_obj: Class,
        dancer_ids: Optional[List[str]] = None,
        timezone: Optional[str] = None,
        class_datetime: Optional[str] = None,
        level: Optional[str] = None,
        genre: Optional[str] = None
    ) -> Class:
        """수업 정보 수정"""
        try:
            # Ensure class is in session
            class_in_session = await SESSION.get(Class, class_obj.class_id)
            if class_in_session is None:
                class_obj = await SESSION.merge(class_obj)
            else:
                class_obj = class_in_session

            # Update dancer relationships
            if dancer_ids is not None:
                dancers_result = await SESSION.scalars(
                    select(Dancer).where(Dancer.dancer_id.in_(dancer_ids))
                )
                dancers = list(dancers_result.all())
                if len(dancers) != len(dancer_ids):
                    raise ValueError("One or more dancer IDs not found")
                class_obj.dancers = dancers

            # Update timezone
            if timezone is not None:
                class_obj.timezone = timezone

            # Update datetime
            if class_datetime is not None:
                class_obj.class_datetime = datetime.fromisoformat(class_datetime.replace('Z', '+00:00'))

            # Update level
            if level is not None:
                if level == "":  # Empty string to clear level
                    class_obj.level = None
                else:
                    try:
                        class_obj.level = Level(level)
                    except ValueError:
                        raise ValueError(f"Invalid level: {level}. Must be BASIC or ADVANCED")

            # Update genre
            if genre is not None:
                try:
                    class_obj.genre = Genre(genre)
                except ValueError:
                    class_obj.genre = None  # Set to None if invalid

            return class_obj
        except Exception as e:
            raise class_edit_error(e)

    async def delete_class(self, class_obj: Class) -> None:
        """수업 삭제"""
        try:
            # Ensure class is in session
            class_in_session = await SESSION.get(Class, class_obj.class_id)
            if class_in_session is None:
                class_obj = await SESSION.merge(class_obj)
            else:
                class_obj = class_in_session

            SESSION.delete(class_obj)
            await SESSION.flush()  # Ensure deletion is processed
        except Exception as e:
            raise class_delete_error(e)
