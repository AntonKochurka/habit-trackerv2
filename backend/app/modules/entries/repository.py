from app.core.db import AsyncSession

from app.modules.habits.repository import HabitRepository, UserRepository
from app.modules.entries.crud import create_entry, get_entry_by_id 
from app.modules.entries.schemas import EntryCreate, EntryPublic
from app.modules.entries.models import HabitEntry



class EntryRepository:
    def __init__(self, session: AsyncSession, habit_repo: HabitRepository):
        self.session = session
        self.habit_repo = habit_repo

    async def create_entry(body: EntryCreate) -> EntryPublic:
        habit_entry = HabitEntry(**body.model_dump())
        habit_entry = await create_habit_entry(self.session, habit_entry)
        
        return EntryPublic.from_orm(habit_entry)


    async def find_entry_by_id(
        entry_id: int, strict: bool = True, orm: bool = False
    ) -> EntryPublic | HabitEntry | None:
        entry = await get_entry_by_id(self.session, habit_entry_id)
        if strict and entry is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Habit entry not found")
        return HabitPublic.from_orm(entry) if orm else entry
