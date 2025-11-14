from app.core.db import AsyncSession
from app.modules.auth.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.modules.users.repository import UserRepository

# from app.modules.auth.crud import *


class AuthRepository:
    def __init__(self, session: AsyncSession, user_repo: UserRepo):
        self.session = session
        self.user_repo = user_repo

    def obtain_tokens(self): ...

    def refresh_tokens(self, refresh: str): ...

    def blacklist_tokens(self, access: str | None, refresh: str | None): ...
