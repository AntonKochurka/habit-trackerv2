from sqlalchemy import Column, String
from core.mixins import Base, BaseMixin


class User(Base, BaseMixin):
    __tablename__ = "Users"

    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
