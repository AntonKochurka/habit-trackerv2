from typing import Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None


class UserInDB(UserBase):
    id: str
    is_active: bool
    is_superuser: bool

    class Config:
        orm_mode = True


class UserPublic(UserBase):
    id: str
    is_active: bool

    class Config:
        orm_mode = True
