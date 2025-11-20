from app.core.db import AsyncSession

from app.modules.habits.repository import HabitRepository, UserRepository
from app.modules.entries.crud import create_habit_entry, get_habit_entry_by_id 
from app.modules.entries.schemas import HabitEntryCreate, HabitEntryPublic
from app.modules.entries.models import HabitEntry



class HabitEntryRepository:
    def __init__(self, session: AsyncSession, habit_repo: HabitRepository):
        self.session = session
        self.habit_repo = habit_repo

    async def create_habit_entry(body: HabitEntryCreate) -> HabitEntryPublic:
        habit_entry = HabitEntry(**body.model_dump())
        habit_entry = await create_habit_entry(self.session, habit_entry)
        
        return HabitEntryPublic.from_orm(habit_entry)


    async def find_habit_entry_by_id(
        habit_entry_id: int, strict: bool = True, orm: bool = False
    ) -> HabitEntryPublic | HabitEntry | None:
        habit_entry_id = await get_habit_entry_by_id(self.session, habit_entry_id)
        if strict and habit is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Habit not found")
        return HabitPublic.from_orm(user) if orm else user
