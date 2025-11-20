from fastapi import FastAPI

from . import auth, entries, habits, merged, users


def set_router(app: FastAPI):
    app.include_router(users.router.router)
    app.include_router(auth.router.router)
    app.include_router(habits.router.router)
    app.include_router(entries.router.router)
    app.include_router(merged.router.router)
