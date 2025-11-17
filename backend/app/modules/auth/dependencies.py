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
refresh_token_cookie = APIKeyCookie(name="refresh", scheme_name="refresh_token", auto_error=False)


async def get_optional_access_token(
    access: Optional[HTTPAuthorizationCredentials] = Depends(access_token),
) -> Optional[str]:
    return access.credentials if access and access.credentials else None


async def get_access_token(
    access: Optional[str] = Depends(get_optional_access_token),
) -> str:
    if not access:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Unauthorized")
    return access


async def get_refresh_token(
    refresh: Optional[str] = Depends(refresh_token_cookie),
) -> str:
    if not refresh:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Unauthorized")
    return refresh


async def get_optional_user(
    access: Optional[str] = Depends(get_access_token),
    repo: AuthRepository = Depends(get_auth_repository),
) -> Optional[User]:
    if not access:
        return None

    decoded = decode_token(access)
    await repo.check_blacklisted_jti(decoded["jti"])

    user_id = int(decoded["sub"])
    return await repo.user_repo.find_user_by_id(user_id)


async def get_current_user(user: Optional[User] = Depends(get_optional_user)) -> User:
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Unauthorized")
    return user
