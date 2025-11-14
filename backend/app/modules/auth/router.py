from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.modules.auth.dependencies import (
    AuthRepository,
    get_auth_repository,
    get_refresh_token,
)
from app.modules.auth.schemas import ObtainTokensRequest, TokenPairResponse

router = APIRouter(prefix="/auth")


@router.post("/obtain", response_model=TokenPairResponse)
async def obtain_tokens(
    body: ObtainTokensRequest,
    repo: AuthRepository = Depends(get_auth_repository),
):
    tokens = await repo.obtain_tokens(body)

    response = JSONResponse(tokens.model_dump())
    response.set_cookie(
        "refresh",
        tokens.refresh,
        httponly=True,
        expires=settings.REFRESH_TOKEN_EXPIRE_SECONDS,
    )
    return response


@router.post("/refresh", response_model=TokenPairResponse)
async def refresh_tokens(
    refresh: str = Depends(get_refresh_token),
    repo: AuthRepository = Depends(get_auth_repository),
):
    tokens = await repo.refresh_tokens(refresh)

    response = JSONResponse(tokens.model_dump())
    response.set_cookie(
        "refresh",
        tokens.refresh,
        httponly=True,
        expires=settings.REFRESH_TOKEN_EXPIRE_SECONDS,
    )
    return response


@router.post("/blacklist")
async def blacklist_tokens(
    access: str = Depends(get_refresh_token),
    repo: AuthRepository = Depends(get_auth_repository)
):
    await repo.blacklist_tokens(access, None)
    return {"detail": "Blacklisted"}
