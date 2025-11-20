from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str
    email: EmailStr


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None


class UserPublic(UserBase):
    id: int
    is_active: bool

    created_at: datetime
    updated_at: datetime | None

    model_config = ConfigDict(from_attributes=True)


class UserInDB(UserPublic):
    is_superuser: bool
    email: EmailStr
