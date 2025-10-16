from fastapi import Depends, HTTPException, status
from fastapi.security import APIKeyCookie, HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError

from core.database import AsyncSession, get_async_session
from core.security import verify_token
from modules.auth.repository import AuthRepository
from modules.auth.service import AuthService
from modules.user.dependencies import get_user_service
from modules.user.models import User
from modules.user.service import UserService

access_token_scheme = HTTPBearer(scheme_name="access", auto_error=False)
refresh_cookie = APIKeyCookie(name="refresh", auto_error=False)


async def get_auth_service(
    session: AsyncSession = Depends(get_async_session),
    user_service: UserService = Depends(get_user_service),
) -> AuthService:
    return AuthService(auth_repo=AuthRepository(session), user_service=user_service)


async def get_optional_current_user(
    service: AuthService = Depends(get_auth_service),
    token: HTTPAuthorizationCredentials | None = Depends(access_token_scheme),
) -> User | None:
    if not token:
        return None
    try:
        payload = verify_token(
            token.credentials,
            HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid access token",
            ),
        )
        user_id = int(payload.get("sub"))
        if not user_id:
            return None
        return await service.user_service.user_repo.get_user_by_id(user_id)
    except JWTError:
        return None


async def get_current_user(
    optional_user: User | None = Depends(get_optional_current_user),
) -> User:
    if optional_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )
    return optional_user
