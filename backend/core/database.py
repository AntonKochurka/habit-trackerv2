from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
    async_sessionmaker,
)

from core.mixins import Base
from core.config import config

engine = create_async_engine(url=config.DB_URL, echo=False)

get_session = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with get_session() as session:
        yield session


async def init_all() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
