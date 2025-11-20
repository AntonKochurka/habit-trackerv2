from fastapi import Depends

from app.core.db import AsyncSession, get_session
from app.modules.users.repository import UserRepository


async def get_user_reposirory(session: AsyncSession = Depends(get_session)):
    return UserRepository(session=session)
