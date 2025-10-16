from contextlib import asynccontextmanager

from fastapi import FastAPI

from core.database import init_all
from core.dependencies import ormparams, suffix_set
from modules.auth.router import router as auth_router
from modules.user.router import router as user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_all()
    ormparams.init_app(app, suffix_set=suffix_set)

    yield


def makeapp():
    app = FastAPI()

    app.include_router(auth_router)
    app.include_router(user_router)

    return app


app = makeapp()
