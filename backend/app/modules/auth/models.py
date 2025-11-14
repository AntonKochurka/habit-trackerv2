from sqlalchemy import Column, String

from app.core.db import Base, BaseMixin


class BlacklistedToken(Base, BaseMixin):
    __tablename__ = "blacklisted_tokens"

    jti = Column(String, unique=True, nullable=False)
    token_type = Column(String, nullable=False)
