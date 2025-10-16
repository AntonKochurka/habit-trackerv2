from sqlalchemy import select

from core.database import AsyncSession
from modules.user.models import User


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, user: User):
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def get_user_by_id(self, id_: int) -> User | None:
        q = select(User).where(User.id == id_)
        result = await self.session.execute(q)
        return result.scalar_one_or_none()

    async def get_user_by_email(self, email: str) -> User | None:
        q = select(User).where(User.email == email)
        result = await self.session.execute(q)
        return result.scalar_one_or_none()
