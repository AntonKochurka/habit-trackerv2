from core.mixins import Base, BaseMixin
from sqlalchemy import Column, String


class BlacklistedToken(Base, BaseMixin):
    __tablename__ = "blacklisted_tokens"

    jti = Column(String, unique=True, nullable=False)
    token_type = Column(String, nullable=False)
