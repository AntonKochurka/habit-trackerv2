from core.database import AsyncSession


class AuthRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
