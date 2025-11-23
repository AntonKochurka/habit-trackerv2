from datetime import datetime
from typing import Literal, List, Optional, Dict, Any

from pydantic import BaseModel, Field, ConfigDict, field_validator


LHabitTypes = Literal["default", "timer", "counter"]


class HabitSettings(BaseModel):
    pass


class BaseHabit(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: str = Field("", max_length=500)

    type: LHabitTypes = Field("default")
    goal_value: int = Field(..., ge=1)

    active_on: List[int]
    settings: Dict[str, Any] = Field(default_factory=HabitSettings)

    @field_validator("active_on")
    def validate_active_on(cls, days):
        if not days:
            raise ValueError("active_on cannot be empty")
        for d in days:
            if d < 1 or d > 7:
                raise ValueError("active_on must contain values 1–7")
        return days


class HabitCreate(BaseHabit):
    pass


class HabitUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)

    type: Optional[LHabitTypes] = None
    goal_value: Optional[int] = None

    active_on: Optional[List[int]] = None
    settings: Optional[Dict[str, Any]] = None

    @field_validator("active_on")
    def validate_active_on(cls, days):
        if days is None:
            return days
        if not days:
            raise ValueError("active_on cannot be empty")
        for d in days:
            if d < 1 or d > 7:
                raise ValueError("active_on must contain values 1–7")
        return days


class HabitPublic(BaseHabit):
    id: int
    created_at: datetime
    updated_at: datetime | None

    model_config = ConfigDict(from_attributes=True)
