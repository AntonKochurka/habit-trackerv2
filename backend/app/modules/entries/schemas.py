from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, Field


class EntryMetadata(BaseModel): ...


class BaseHabitEntry(BaseModel):
    habit_id: int
    date: datetime

    entry_metadata: EntryMetadata


class HabitEntryCreate(BaseHabitEntry):
    progress_value: int = Field(default=0)
    completed: bool = Field(default=False)


class HabitUpdate(BaseModel):
    progress_value: Optional[int] = None
    completed: Optional[bool] = None

    entry_metadata: Optional[EntryMetadata] = None


class HabitPublic(BaseHabitEntry):
    id: int

    progress_value: int = Field(default=0)
    completed: bool = Field(default=False)

    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
