from fastapi import HTTPException, status
from passlib.context import CryptContext

from app.core.db import AsyncSession
from app.modules.users.crud import (
    create_user,
    get_user_by_email,
    get_user_by_id,
    get_user_by_username,
)
from app.modules.users.models import User
from app.modules.users.schemas import UserCreate, UserPublic

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def register_user(self, user_in: UserCreate) -> UserPublic:
        existing_username = await get_user_by_username(self.session, user_in.username)
        existing_email = await get_user_by_email(self.session, user_in.email)

        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User with this username already exists",
            )

        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User with this email already exists",
            )

        hashed_password = pwd_context.hash(user_in.password)
        user = User(
            **user_in.model_dump(exclude={"password"}), password=hashed_password
        )
        user = await create_user(self.session, user)

        return UserPublic.from_orm(user)

    async def find_user_by_id(
        self, user_id: str, strict: bool = False
    ) -> UserPublic | None:
        user = await get_user_by_id(self.session, user_id)
        if strict and user is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
        return UserPublic.from_orm(user) if user else None

    async def find_user_by_username(
        self, username: str, strict: bool = False
    ) -> UserPublic | None:
        user = await get_user_by_username(self.session, username)
        if strict and user is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
        return UserPublic.from_orm(user) if user else None

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)
