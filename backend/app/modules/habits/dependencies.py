from fastapi import Depends

from app.core.db import AsyncSession, get_session
from app.modules.habits.repository import HabitRepository, UserRepository


async def get_habit_repository(session: AsyncSession = Depends(get_session)):
    return HabitRepository(session=session, user_repo=UserRepository(session=session))
