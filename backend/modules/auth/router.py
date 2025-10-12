from fastapi import APIRouter, Depends

from modules.auth.schemas import ObtainTokenRequest, ObtainTokenResponse
from modules.auth.dependencies import AuthService, get_auth_service

router = APIRouter("/auth")


@router.post("/obtain", response_model=ObtainTokenResponse)
async def obtain_tokens(
    body: ObtainTokenRequest, auth_service: AuthService = Depends(get_auth_service)
):

    return ObtainTokenRequest()
