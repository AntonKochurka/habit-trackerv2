from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.utils.inits import lifespan, set_router
from app.core.config import settings

def makeapp():
    app = FastAPI(lifespan=lifespan)
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    set_router(app)
    
    return app
