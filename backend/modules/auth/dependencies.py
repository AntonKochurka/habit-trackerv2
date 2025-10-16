from core.database import AsyncSession, get_async_session
from fastapi import Depends
from modules.auth.repository import AuthRepository
from modules.auth.service import AuthService
from modules.user.dependencies import UserService, get_user_service


async def get_auth_service(
    session: AsyncSession = Depends(get_async_session),
    user_service: UserService = Depends(get_user_service),
) -> AuthRepository:
    return AuthService(auth_repo=AuthRepository(session), user_service=user_service)
