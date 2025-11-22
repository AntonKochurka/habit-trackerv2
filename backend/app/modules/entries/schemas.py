from datetime import datetime, date
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator


class EntryMetadata(BaseModel):
    pass


class BaseEntry(BaseModel):
    habit_id: int = Field(gt=0)
    date: date
    entry_metadata: EntryMetadata = Field(default_factory=EntryMetadata)

    @field_validator("date")
    def validate_date(cls, v: date) -> date:
        if v.year < 2000:
            raise ValueError("Date must not be earlier than year 2000.")
        if v.year > 2100:
            raise ValueError("Date must not be later than year 2100.")
        return v


class EntryCreate(BaseEntry):
    progress_value: int = Field(default=0, ge=0, le=100)
    completed: bool = Field(default=False)


class EntryUpdate(BaseModel):
    progress_value: Optional[int] = Field(None, ge=0, le=100)
    completed: Optional[bool] = None
    entry_metadata: Optional[EntryMetadata] = None


class EntryPublic(BaseEntry):
    id: int = Field(gt=0)
    progress_value: int = Field(ge=0, le=100)
    completed: bool

    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
