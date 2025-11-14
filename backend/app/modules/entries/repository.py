from app.core.db import AsyncSession
from app.modules.habits.repository import HabitRepository


class HabitEntryRepository:
    def __init__(self, session: AsyncSession, habit_repo: HabitRepository):
        self.session = session
        self.habit_repo = habit_repo
