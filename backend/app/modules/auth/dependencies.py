from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import APIKeyCookie, HTTPAuthorizationCredentials, HTTPBearer

from app.core.db import AsyncSession, get_session
from app.modules.auth.repository import AuthRepository
from app.modules.auth.security import decode_token
from app.modules.users.models import User
from app.modules.users.repository import UserRepository


async def get_auth_repository(
    session: AsyncSession = Depends(get_session),
) -> AuthRepository:
    return AuthRepository(session, UserRepository(session))


access_token = HTTPBearer(scheme_name="access_token", auto_error=False)
refresh_token = APIKeyCookie(name="refresh", scheme_name="refresh_token")


async def get_optional_access_token(
    access: Optional[HTTPAuthorizationCredentials],
) -> Optional[str]:
    if not access or not access.credentials:
        return None
    return access.credentials


async def get_access_token(
    access_token: Optional[str] = Depends(get_optional_access_token),
) -> str:
    if not access_token:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    return access_token


async def get_refresh_token(
    refresh_token: Optional[str] = Depends(refresh_token),
) -> str:
    if not refresh_token:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    return refresh_token


async def get_optional_user(
    access: Optional[str] = Depends(get_access_token),
    repo: AuthRepository = Depends(get_auth_repository),
) -> Optional[User]:
    if not access:
        return None
    try:
        user_id = decode_token(access)["sub"]
        return await repo.user_repo.find_user_by_id(user_id=user_id)
    except HTTPException as e:
        if e.status_code in (401, 403):
            return None
        raise


async def get_current_user(user: Optional[User] = Depends(get_optional_user)) -> User:
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    return user
