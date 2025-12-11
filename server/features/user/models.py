from server.database.common import Base

from sqlalchemy import String, DateTime, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from server.features.dancer.models import Dancer
    from server.features.studio.models import Studio

import uuid
import enum

# 유저 타입
class UserType(enum.Enum):
    USER = "user"
    DANCER = "dancer"

# 유저 정보
class User(Base):
    __tablename__ = "users"

    # 유저 고유 식별자
    user_id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    # 유저 아이디 (unique)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    # 유저 비밀번호
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    # 유저 타입
    type: Mapped[UserType] = mapped_column(Enum(UserType), nullable=False, default=UserType.USER)
    # 유저 계정 생성 날짜
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)

    # relationship (one-to-one with Dancer and Studio)
    dancer: Mapped[Optional["Dancer"]] = relationship("Dancer", back_populates="user", uselist=False, lazy="selectin")
    studio: Mapped[Optional["Studio"]] = relationship("Studio", back_populates="user", uselist=False, lazy="selectin")


# JWT Token
class BlockedToken(Base):
    __tablename__ = "blocked_tokens"

    # jti for refresh, user_id_exp for access
    jti: Mapped[str] = mapped_column(String(255), primary_key=True)

    # 토큰 유효기간
    expires_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)

    # 토큰 생성날짜
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
