from core.database import AsyncSession, get_async_session
from fastapi import Depends
from modules.user.repository import UserRepository
from modules.user.service import UserService


async def get_user_service(
    session: AsyncSession = Depends(get_async_session),
) -> UserService:
    return UserService(user_repo=UserRepository(session))
