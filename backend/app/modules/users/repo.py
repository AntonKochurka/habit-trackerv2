from app.core.db import AsyncSession


class UserRepo:
    def __init__(self, session: AsyncSession):
        self.session = session
