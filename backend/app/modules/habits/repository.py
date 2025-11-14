from app.core.db import AsyncSession
from app.modules.users.repository import UserRepository


class HabitRepository:
    def __init__(self, session: AsyncSession, user_repo: UserRepository):
        self.session = session
        self.user_repo = user_repo
