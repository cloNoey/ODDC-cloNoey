from sqlalchemy.sql import select
from datetime import time as time_type
from typing import Optional, List

from server.database.connection import SESSION
from server.database.annotation import transactional
from server.features.studio.models import Studio
from server.features.studio.errors import studio_creation_error, studio_edit_error, studio_delete_error


class StudioStore:
    def __init__(self) -> None:
        self.session = SESSION

    # ======================== READ OPERATIONS ========================

    async def get_studio_by_id(self, studio_id: str) -> Studio | None:
        """스튜디오 ID로 조회"""
        return await self.session.scalar(
            select(Studio).where(Studio.studio_id == studio_id)
        )

    async def get_studio_by_name(self, name: str) -> Studio | None:
        """스튜디오 이름으로 조회 (정확히 일치하는 경우만)"""
        return await self.session.scalar(
            select(Studio).where(Studio.name == name)
        )

    async def get_studio_by_instagram(self, instagram: str) -> Studio | None:
        """인스타그램 아이디로 조회"""
        return await self.session.scalar(
            select(Studio).where(Studio.instagram == instagram)
        )

    async def get_all_studios(self) -> List[Studio]:
        """전체 스튜디오 목록 조회"""
        result = await self.session.scalars(
            select(Studio).execution_options(populate_existing=True)
        )
        return list(result.all())

    # ======================== WRITE OPERATIONS ========================

    @transactional
    async def create_studio(
        self,
        name: str,
        instagram: Optional[str] = None,
        location: Optional[str] = None,
        lat: Optional[float] = None,
        lng: Optional[float] = None,
        station: Optional[str] = None,
        city: Optional[str] = None,
        district: Optional[str] = None,
        email: Optional[str] = None,
        website: Optional[str] = None,
        reservation_form: Optional[str] = None,
        default_duration: Optional[str] = None,  # Receive as HH:MM:SS string
        default_price: Optional[int] = None,
        youtube: Optional[str] = None,
        bio: Optional[str] = None,
        user_id: Optional[str] = None
    ) -> Studio:
        """새 스튜디오 생성"""
        try:
            # Convert time string to time object if provided
            duration_obj = None
            if default_duration:
                hours, minutes, seconds = map(int, default_duration.split(':'))
                duration_obj = time_type(hours, minutes, seconds)

            studio = Studio(
                name=name,
                instagram=instagram,
                location=location,
                lat=lat,
                lng=lng,
                station=station,
                city=city,
                district=district,
                email=email,
                website=website,
                reservation_form=reservation_form,
                default_duration=duration_obj,
                default_price=default_price,
                youtube=youtube,
                bio=bio,
                user_id=user_id
            )
            SESSION.add(studio)
            return studio
        except Exception as e:
            raise studio_creation_error(e)

    @transactional
    async def edit_studio(
        self,
        studio: Studio,
        name: Optional[str] = None,
        instagram: Optional[str] = None,
        location: Optional[str] = None,
        lat: Optional[float] = None,
        lng: Optional[float] = None,
        station: Optional[str] = None,
        city: Optional[str] = None,
        district: Optional[str] = None,
        email: Optional[str] = None,
        website: Optional[str] = None,
        reservation_form: Optional[str] = None,
        default_duration: Optional[str] = None,  # Receive as HH:MM:SS string
        default_price: Optional[int] = None,
        youtube: Optional[str] = None,
        bio: Optional[str] = None,
        is_verified: Optional[bool] = None
    ) -> Studio:
        """스튜디오 정보 수정"""
        try:
            # Ensure studio is in session
            studio_in_session = await SESSION.get(Studio, studio.studio_id)
            if studio_in_session is None:
                studio = await SESSION.merge(studio)
            else:
                studio = studio_in_session

            # Update fields if provided
            if name is not None:
                studio.name = name
            if instagram is not None:
                studio.instagram = instagram
            if location is not None:
                studio.location = location
            if lat is not None:
                studio.lat = lat
            if lng is not None:
                studio.lng = lng
            if station is not None:
                studio.station = station
            if city is not None:
                studio.city = city
            if district is not None:
                studio.district = district
            if email is not None:
                studio.email = email
            if website is not None:
                studio.website = website
            if reservation_form is not None:
                studio.reservation_form = reservation_form
            if default_duration is not None:
                hours, minutes, seconds = map(int, default_duration.split(':'))
                studio.default_duration = time_type(hours, minutes, seconds)
            if default_price is not None:
                studio.default_price = default_price
            if youtube is not None:
                studio.youtube = youtube
            if bio is not None:
                studio.bio = bio
            if is_verified is not None:
                studio.is_verified = is_verified

            return studio
        except Exception as e:
            raise studio_edit_error(e)

    @transactional
    async def delete_studio(self, studio: Studio) -> None:
        """스튜디오 삭제"""
        try:
            # Ensure studio is in session
            studio_in_session = await SESSION.get(Studio, studio.studio_id)
            if studio_in_session is None:
                studio = await SESSION.merge(studio)
            else:
                studio = studio_in_session

            await SESSION.delete(studio)
        except Exception as e:
            raise studio_delete_error(e)
