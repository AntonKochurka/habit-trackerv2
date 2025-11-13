from sqlalchemy import Boolean, Column, String
from sqlalchemy.orm import relationship

from app.core.db import Base, BaseMixin


class HabitEntry(Base, BaseMixin):
    __tablename__ = "habit_entries"
