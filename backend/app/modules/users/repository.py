from passlib.hash import bcrypt

from app.core.db import AsyncSession
from app.modules.users.crud import (
    create_user,
    get_user_by_email,
    get_user_by_id,
    get_user_by_username,
)
from app.modules.users.models import User
from app.modules.users.schemas import UserCreate, UserPublic


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def register_user(self, user_in: UserCreate) -> UserPublic:
        existing = await get_user_by_email(self.session, user_in.email)
        if existing:
            raise ValueError("User with this email already exists")
        hashed_password = bcrypt.hash(user_in.password)
        user = User(**user_in.dict(), password=hashed_password)
        user = await create_user(self.session, user)
        return UserPublic.from_orm(user)

    async def find_user_by_id(self, user_id: str) -> UserPublic | None:
        user = await get_user_by_id(self.session, user_id)
        return UserPublic.from_orm(user) if user else None

    async def find_user_by_username(self, username: str) -> UserPublic | None:
        user = await get_user_by_username(self.session, username)
        return UserPublic.from_orm(user) if user else None
