from server.database.common import Base

from sqlalchemy import String, BigInteger, Time, Boolean, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import time
from typing import Optional, List, TYPE_CHECKING

if TYPE_CHECKING:
    from server.features.user.models import User
    from server.features.dance_class.models import Class

import uuid

# 스튜디오 정보
class Studio(Base):
    __tablename__ = "studios"

    # 스튜디오 고유 식별자
    studio_id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    # 유저 고유 식별자 (nullable - 스튜디오는 유저 계정 없이 존재 가능) # 한 유저는 하나의 스튜디오 프로필만 가능
    user_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("users.user_id", ondelete="SET NULL"), nullable=True, unique=True)
    # 스튜디오 이름
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    # 스튜디오 인스타그램
    instagram: Mapped[Optional[str]] = mapped_column(String(50), unique=True, nullable=True)
    # 스튜디오 위치
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    # 스튜디오 위도
    lat: Mapped[Optional[float]] = mapped_column(Numeric(precision=10, scale=7), nullable=True)
    # 스튜디오 경도
    lng: Mapped[Optional[float]] = mapped_column(Numeric(precision=10, scale=7), nullable=True)
    # 가까운 역
    station: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    # 도시
    city: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    # 구
    district: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    # 스튜디오 이메일
    email: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    # 스튜디오 웹사이트
    website: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    # 인증 상태
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    # 예약 폼 URL
    reservation_form: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    # 스튜디오 기본 수업 시간 (HH:MM:SS)
    default_duration: Mapped[Optional[time]] = mapped_column(Time, nullable=True)
    # 스튜디오 기본 가격
    default_price: Mapped[Optional[int]] = mapped_column(BigInteger, nullable=True)
    # 스튜디오 유튜브 채널
    youtube: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    # 스튜디오 소개글
    bio: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    # User와의 관계
    user: Mapped[Optional["User"]] = relationship("User", back_populates="studio", lazy="selectin")

    # Class와의 관계 (one-to-many)
    classes: Mapped[List["Class"]] = relationship(
        "Class",
        back_populates="studio",
        lazy="selectin",
        cascade="all, delete-orphan"
    )
