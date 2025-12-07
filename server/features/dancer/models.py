from server.database.common import Base

from sqlalchemy import String, ForeignKey, Boolean, JSON, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from server.features.user.models import User
    from server.features.dance_class.models import Class

import uuid
import enum

# 댄스 장르
class Genre(enum.Enum):
    CHOREOGRAPHY = "CHOREOGRAPHY"
    HIPHOP = "HIPHOP"
    GIRLS_HIPHOP = "GIRLS HIPHOP"
    BREAKING = "BREAKING"
    LOCKING = "LOCKING"
    POPPING = "POPPING"
    HOUSE = "HOUSE"
    KRUMP = "KRUMP"
    WACKING = "WACKING"
    VOGUING = "VOGUING"
    HEEL = "HEEL"
    SOUL = "SOUL"
    AFRO = "AFRO"
    K_POP = "K-POP"
    CONTEMPORARY = "CONTEMPORARY"
    JAZZ = "JAZZ"
    DANCEHALL = "DANCEHALL"

# 댄서 정보
class Dancer(Base):
    __tablename__ = "dancers"

    # 댄서 고유 식별자
    dancer_id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    # 유저 고유 식별자 (nullable - 댄서는 유저 계정 없이 존재 가능) # 한 유저는 하나의 댄서 프로필만 가능 
    user_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("users.user_id", ondelete="SET NULL"), nullable=True, unique=True)
    # 댄서 대표 이름
    main_name: Mapped[str] = mapped_column(String(20), nullable=False)
    # 댄서 이름 목록 (JSON 배열)
    names: Mapped[List[str]] = mapped_column(JSON, nullable=False)
    # 댄서 인스타그램
    instagram: Mapped[Optional[str]] = mapped_column(String(50), unique=True, nullable=True)
    # 인증 상태
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    # 댄스 장르
    genre: Mapped[Optional[Genre]] = mapped_column(Enum(Genre), nullable=True)

    # User와의 관계
    user: Mapped[Optional["User"]] = relationship("User", back_populates="dancer", lazy="selectin")

    # Class와의 관계 (many-to-many)
    classes: Mapped[List["Class"]] = relationship(
        "Class",
        secondary="class_dancer_association",
        back_populates="dancers",
        lazy="selectin"
    )
