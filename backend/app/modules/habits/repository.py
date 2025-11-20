from fastapi import HTTPException, status

from app.core.db import AsyncSession
from app.modules.habits.crud import create_habit, get_habit_by_id
from app.modules.habits.models import Habit
from app.modules.habits.schemas import HabitCreate, HabitPublic
from app.modules.users.repository import UserRepository


class HabitRepository:
    def __init__(self, session: AsyncSession, user_repo: UserRepository):
        self.session = session
        self.user_repo = user_repo

    async def create_habit(self, body: HabitCreate) -> HabitPublic:
        habit = Habit(**body.model_dump())

        habit = await create_habit(self.session, habit)
        return HabitPublic.from_orm(habit)

    async def find_habit_by_id(
        self, habit_id: str, strict: bool = True, orm: bool = False
    ) -> HabitPublic | Habit | None:
        habit = await get_habit_by_id(self.session, habit_id)
        if strict and habit is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Habit not found")
        return HabitPublic.from_orm(user) if orm else user
