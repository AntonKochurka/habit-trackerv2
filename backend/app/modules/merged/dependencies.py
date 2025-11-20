from fastapi import Depends

from app.core.db import AsyncSession, get_session
from app.modules.entries.dependencies import EntryRepository, get_entry_repository


async def get_merged_repository(
    session: AsyncSession = Depends(get_session),
    entry_repo: EntryRepository = Depends(get_entry_repository)
):
    return HabitEntryRepository(
        session, entry_repo=habit_repo
    )
