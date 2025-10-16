from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from modules.auth.dependencies import AuthService, get_auth_service
from modules.auth.schemas import ObtainTokenRequest, ObtainTokenResponse

router = APIRouter("/auth")


@router.post("/obtain", response_model=ObtainTokenResponse)
async def obtain_tokens(
    body: ObtainTokenRequest, auth_service: AuthService = Depends(get_auth_service)
):
    user = await auth_service.user_service.check_password(body.email, body.password)
    if user:
        access, refresh, exp = auth_service.obtain_pair(user.id)

        response = JSONResponse(
            ObtainTokenRequest(
                access=access,
                refresh=refresh
            )
        )

        response.set_cookie("refresh", refresh, expires=exp)

        return response