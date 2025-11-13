from sqlalchemy import Boolean, Column, String
from sqlalchemy.orm import relationship

from app.core.db import Base, BaseMixin


class Habit(Base, BaseMixin):
    __tablename__ = "habits"
