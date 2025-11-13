from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

engine = create_async_engine(url=settings.DB_URL)
SessionMaker = async_sessionmaker(engine)


class Base(DeclarativeBase):
    pass


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with SessionMaker() as session:
        yield session
