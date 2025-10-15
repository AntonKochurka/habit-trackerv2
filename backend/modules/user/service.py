from fastapi import HTTPException, status

from core.security import get_password_hash, verify_password
from modules.user.models import User
from modules.user.repository import UserRepository
from modules.user.schemas import UserCreateRequest


class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def create_user(self, body: UserCreateRequest):
        if await self.user_repo.get_user_by_email(body.email):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="User already exists."
            )

        user = User(email=body.email, hashed_password=get_password_hash(body.password))
        return await self.user_repo.create(user)

    async def check_password(self, email: str, password: str) -> bool:
        user = await self.user_repo.get_user_by_email(email)
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Wrong email or password.",
            )
        return True
