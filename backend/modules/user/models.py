from sqlalchemy import Column, String

from core.mixins import Base, BaseMixin


class User(Base, BaseMixin):
    __tablename__ = "Users"

    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    ORMP_EXCLUDED_FIELDS = ["hashed_password"]
    EXCLUDED_FIELDS = ["hashed_password"]
