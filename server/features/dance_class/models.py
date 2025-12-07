from server.database.common import Base

from sqlalchemy import String, Date, Time, ForeignKey, Enum, Table, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date, time
from typing import List, Optional, TYPE_CHECKING

# Import Genre for actual use (not TYPE_CHECKING)
from server.features.dancer.models import Genre

if TYPE_CHECKING:
    from server.features.studio.models import Studio
    from server.features.dancer.models import Dancer

import uuid
import enum

# Level Enum
class Level(enum.Enum):
    BASIC = "BASIC"
    ADVANCED = "ADVANCED"

# Association Table for Class-Dancer many-to-many relationship
class_dancer_association = Table(
    'class_dancer_association',
    Base.metadata,
    Column('class_id', String(36), ForeignKey('classes.class_id', ondelete='CASCADE'), primary_key=True),
    Column('dancer_id', String(36), ForeignKey('dancers.dancer_id', ondelete='CASCADE'), primary_key=True)
)

# Class Model
class Class(Base):
    __tablename__ = "classes"

    # Primary Key
    class_id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    # Foreign Key to Studio (NOT NULL)
    studio_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("studios.studio_id", ondelete="CASCADE"),
        nullable=False
    )

    # Date and Time
    class_date: Mapped[date] = mapped_column(Date, nullable=False)
    start_time: Mapped[time] = mapped_column(Time, nullable=False)

    # Genre (from Dancer model)
    genre: Mapped[Optional[Genre]] = mapped_column(Enum(Genre), nullable=True)

    # Level
    level: Mapped[Level] = mapped_column(Enum(Level), nullable=False)

    # Relationships
    studio: Mapped["Studio"] = relationship("Studio", back_populates="classes", lazy="selectin")
    dancers: Mapped[List["Dancer"]] = relationship(
        "Dancer",
        secondary=class_dancer_association,
        back_populates="classes",
        lazy="selectin"
    )
