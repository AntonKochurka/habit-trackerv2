from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

from app.modules.habits.schemas import HabitPublic
from app.modules.entries.schemas import EntryPublic


class MergedHabit(HabitPublic):
    # if the user hasn't touched the habit for today yet, it's None
    entry: Optional[EntryPublic] = None

