from sqlalchemy import Boolean, Column, String
from sqlalchemy.orm import relationship

from app.core.db import Base, BaseMixin


class User(Base, BaseMixin):
    __tablename__ = "users"

    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(256), unique=True, index=True, nullable=False)
    password = Column(String(256), nullable=False)

    is_active = Column(Boolean, default=True, nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)
