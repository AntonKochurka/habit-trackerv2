from fastapi import Depends

from app.core.db import AsyncSession, get_session
from app.modules.entries.repository import (
    HabitEntryRepository,
    HabitRepository,
    UserRepository,
)


async def get_habit_entry_repository(session: AsyncSession = Depends(get_session)):
    return HabitEntryRepository(
        session, habit_repo=HabitRepository(session, user_repo=UserRepository(session))
    )
