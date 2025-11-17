from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.modules.auth.dependencies import (
    AuthRepository,
    get_auth_repository,
    get_access_token,
    get_refresh_token,
    get_current_user
)
from app.modules.auth.schemas import ObtainTokensRequest, TokenPairResponse
from app.modules.users.schemas import UserPublic

router = APIRouter(prefix="/auth")


def set_refresh_cookie(tokens: TokenPairResponse) -> JSONResponse:
    response = JSONResponse(tokens.model_dump())
    response.set_cookie(
        key="refresh",
        value=tokens.refresh,
        httponly=True,
        max_age=settings.REFRESH_TOKEN_EXPIRE_SECONDS,
        expires=settings.REFRESH_TOKEN_EXPIRE_SECONDS,
        secure=False,
        # secure=True,
        samesite="lax",
    )
    return response


@router.post("/obtain", response_model=TokenPairResponse)
async def obtain_tokens(
    body: ObtainTokensRequest,
    repo: AuthRepository = Depends(get_auth_repository),
):
    tokens = await repo.obtain_tokens(body)
    return set_refresh_cookie(tokens)


@router.post("/refresh", response_model=TokenPairResponse)
async def refresh_tokens(
    refresh: str = Depends(get_refresh_token),
    repo: AuthRepository = Depends(get_auth_repository),
):
    tokens = await repo.refresh_tokens(refresh)
    await repo.blacklist_tokens(refresh=refresh)

    return set_refresh_cookie(tokens)


@router.post("/blacklist")
async def blacklist_tokens(
    access: str = Depends(get_access_token),
    refresh: str = Depends(get_refresh_token),
    repo: AuthRepository = Depends(get_auth_repository),
):
    response = JSONResponse({"detail": "Blacklisted"})
    await repo.blacklist_tokens()

    response.delete_cookie("refresh")
    return response

@router.get("/me", response_model=UserPublic)
async def get_me(user = Depends(get_current_user)):
    return UserPublic.from_orm(user)

@router.get("/healt")
async def healt(user = Depends(get_current_user)):
    return {"status": "Ok"}