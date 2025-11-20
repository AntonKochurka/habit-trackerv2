from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, Field


class HabitSettings(BaseModel): ...


class BaseHabit(BaseModel):
    title: str
    description: str

    type: Literal["default" | "timer" | "counter"] = Field("default")
    goal_type: int

    active_on: List[int]
    settings: HabitSettings


class HabitCreate(BaseHabit):
    pass


class HabitUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

    type: Optional[Literal["default" | "timer" | "counter"]] = None
    goal_type: Optional[int] = None

    active_on: Optional[List[int]] = None
    settings: Optional[HabitSettings] = None


class HabitPublic(BaseHabit):
    id: int

    created_at: datetime
    updated_at: datetime | None

    model_config = ConfigDict(from_attributes=True)
