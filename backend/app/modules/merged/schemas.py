from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

from app.modules.habits.schemas import HabitPublic
from app.modules.entries.schemas import EntryPublic


class MergedHabit(HabitPublic):
    entry: Optional[EntryPublic] = None

