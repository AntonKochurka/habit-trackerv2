from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.core.db import engine, Base
from app.modules import set_router


async def init_all() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_all()

    yield
