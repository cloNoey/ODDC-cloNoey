from pydantic import BaseModel
from typing import Optional

from server.features.studio.models import Studio


class StudioListItem(BaseModel):
    """Lightweight studio info for list/card views"""
    studio_id: str
    name: str
    instagram: Optional[str]
    station: Optional[str]
    city: Optional[str]
    district: Optional[str]
    is_verified: bool

    @staticmethod
    def from_studio(studio: Studio) -> "StudioListItem":
        return StudioListItem(
            studio_id=studio.studio_id,
            name=studio.name,
            instagram=studio.instagram,
            station=studio.station,
            city=studio.city,
            district=studio.district,
            is_verified=studio.is_verified
        )


class StudioResponse(BaseModel):
    studio_id: str
    user_id: Optional[str]
    name: str
    instagram: Optional[str]
    location: Optional[str]
    # New location fields
    lat: Optional[float]
    lng: Optional[float]
    station: Optional[str]
    city: Optional[str]
    district: Optional[str]
    email: Optional[str]
    website: Optional[str]
    is_verified: bool
    reservation_form: Optional[str]
    default_duration: Optional[str]  # Return as HH:MM:SS string
    default_price: Optional[int]
    youtube: Optional[str]
    bio: Optional[str]
    role: str

    @staticmethod
    def from_studio(studio: Studio) -> "StudioResponse":
        return StudioResponse(
            studio_id=studio.studio_id,
            user_id=studio.user_id,
            name=studio.name,
            instagram=studio.instagram,
            location=studio.location,
            # New location fields - convert Decimal to float for JSON serialization
            lat=float(studio.lat) if studio.lat is not None else None,
            lng=float(studio.lng) if studio.lng is not None else None,
            station=studio.station,
            city=studio.city,
            district=studio.district,
            email=studio.email,
            website=studio.website,
            is_verified=studio.is_verified,
            reservation_form=studio.reservation_form,
            # Convert time object to string for JSON serialization
            default_duration=studio.default_duration.strftime("%H:%M:%S") if studio.default_duration else None,
            default_price=studio.default_price,
            youtube=studio.youtube,
            bio=studio.bio,
            role="STUDIO"
        )
