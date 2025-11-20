from sqlalchemy import select

from app.core.db import AsyncSession
from app.modules.habits.models import Habit


async def create_habit(session: AsyncSession, habit: Habit) -> Habit:
    session.add(habit)
    await session.commit()
    await session.refresh(habit)

    return habit


async def get_habit_by_id(session: AsyncSession, habit_id: str) -> Habit | None:
    result = await session.execute(select(Habit).where(Habit.id == habit_id))
    return result.scalar_one_or_none()
