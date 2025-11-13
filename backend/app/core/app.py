from fastapi import FastAPI

from app.utils.inits import lifespan, set_router


def makeapp():
    app = FastAPI(lifespan=lifespan)
    set_router(app)

    return app
