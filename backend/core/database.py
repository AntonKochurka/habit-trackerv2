from typing import AsyncGenerator

from core.config import config
from core.mixins import Base
from sqlalchemy.ext.asyncio import (AsyncSession, async_sessionmaker,
                                    create_async_engine)

engine = create_async_engine(url=config.DB_URL, echo=False)

get_session = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with get_session() as session:
        yield session


async def init_all() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
