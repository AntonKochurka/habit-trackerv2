from app.core.db import AsyncSession
from app.modules.users.repo import UserRepo


class AuthRepo:
    def __init__(self, session: AsyncSession, user_repo: UserRepo):
        self.session = session
        self.user_repo = user_repo

    def obtain_tokens(self): ...

    def refresh_tokens(self, refresh: str): ...

    def blacklist_tokens(self, access: str | None, refresh: str | None): ...
