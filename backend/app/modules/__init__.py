from fastapi import FastAPI

from . import auth, entries, habits, users


def set_router(app: FastAPI):
    app.include_router(users.router.router)
    app.include_router(auth.router.router)
    app.include_router(habits.router.router)
    app.include_router(entries.router.router)
