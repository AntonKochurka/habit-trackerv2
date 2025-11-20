from sqlalchemy import (
    JSON,
    Boolean,
    Column,
    Date,
    ForeignKey,
    Integer,
)
from sqlalchemy.orm import relationship

from app.core.db import Base, BaseMixin


class HabitEntry(Base, BaseMixin):
    __tablename__ = "habit_entries"

    habit_id = Column(Integer, ForeignKey("habits.id"), nullable=False, index=True)
    habit = relationship("Habit", back_populates="entries")

    date = Column(Date, nullable=False, index=True)

    progress_value = Column(Integer, nullable=False, default=0)

    completed = Column(Boolean, nullable=False, default=False)

    entry_metadata = Column(JSON, default=dict)
