from core.database import AsyncSession
from modules.auth.models import BlacklistedToken


class AuthRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_blacklisted_token(
        self, blacklisted_token: BlacklistedToken
    ) -> BlacklistedToken:
        self.session.add(token)
        await self.session.commit()
        await self.session.refresh(blacklisted_token)
        return blacklisted_token

    async def get_blacklisted_token_by_jti(self, jti: str) -> BlacklistedToken | None:
        q = select(BlacklistedToken).where(BlacklistedToken.jti == jti)
        blacklisted_token = await self.session.execute(q)

        return blacklisted_token.one_or_none()
