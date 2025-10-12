from fastapi import FastAPI

from core.database import init_all
from core.dependencies import ormparams, suffix_set

from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_all()
    ormparams.init_app(app, suffix_set=suffix_set)

    yield


def makeapp():
    app = FastAPI()

    return app


app = makeapp()
