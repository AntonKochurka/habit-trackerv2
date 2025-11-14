from app.core.db import AsyncSession
from app.modules.habits.repo import HabitRepo


class HabitEntryRepository:
    def __init__(self, session: AsyncSession, habit_repo: HabitRepo):
        self.session = session
        self.habit_repo = habit_repo
