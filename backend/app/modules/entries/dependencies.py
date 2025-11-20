from fastapi import Depends

from app.core.db import AsyncSession, get_session
from app.modules.habits.dependencies import HabitRepository, get_habit_repository
from app.modules.entries.repository import (
    EntryRepository,
    UserRepository,
)


async def get_entry_repository(
    session: AsyncSession = Depends(get_session),
    habit_repo: HabitRepository = Depends(get_habit_repository)
):
    return EntryRepository(
        session, habit_repo=habit_repo
    )
