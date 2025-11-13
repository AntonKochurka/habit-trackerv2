from app.core.db import AsyncSession
from app.modules.users.repo import UserRepo


class HabitRepo:
    def __init__(self, session: AsyncSession, user_repo: UserRepo):
        self.session = session
        self.user_repo = user_repo
