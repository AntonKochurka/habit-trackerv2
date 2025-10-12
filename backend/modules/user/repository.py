from core.database import AsyncSession


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
