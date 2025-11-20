from sqlalchemy import select

from app.core.db import AsyncSession
from app.modules.entries.models import HabitEntry


async def create_entry(
    session: AsyncSession, habit_entry: HabitEntry
) -> HabitEntry:
    session.add(habit_entry)
    await session.commit()
    await session.refresh(habit_entry)

    return habit_entry


async def get_entry_by_id(
    session: AsyncSession, habit_entry_id: str
) -> HabitEntry | None:
    result = await session.execute(
        select(HabitEntry).where(HabitEntry.id == habit_entry_id)
    )
    return result.scalar_one_or_none()
