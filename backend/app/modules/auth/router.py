from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.db import AsyncSession, get_session
from app.modules.auth.dependencies import AuthRepository, get_auth_repository
from app.modules.auth.schemas import ObtainTokensRequest, TokenPairResponse

router = APIRouter(prefix="/auth")


@router.post("/obtain", response_model=TokenPairResponse)
async def obtain_tokens(
    body: ObtainTokensRequest, repository: AuthRepository = Depends(get_auth_repository)
):
    tokens = await repository.obtain_tokens(body)
    response = JSONResponse(tokens.model_dump())
    response.set_cookie(
        "refresh",
        tokens.refresh,
        httponly=True,
        expires=settings.REFRESH_TOKEN_EXPIRE_SECONDS,
    )

    return response


@router.post("/refresh")
async def refresh_tokens(): ...


@router.post("/blacklist")
async def blacklist_tokens(): ...
