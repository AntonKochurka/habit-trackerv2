import enum

from sqlalchemy import JSON, Column, Enum, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.core.db import Base, BaseMixin


class HabitType(enum.Enum):
    DEFAULT = "default"
    COUNTER = "counter"
    TIMER = "timer"


class Habit(Base, BaseMixin):
    __tablename__ = "habits"

    title = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)

    type = Column(Enum(HabitType), nullable=False, default=HabitType.DEFAULT)
    goal_value = Column(Integer, nullable=False, default=1)
    active_on = Column(JSON, default=list)
    settings = Column(JSON, default=dict)

    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    author = relationship("User", back_populates="habits")
    entries = relationship(
        "HabitEntry", back_populates="habit", cascade="all, delete-orphan"
    )
