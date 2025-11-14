from sqlalchemy.future import select

from app.core.db import AsyncSession
from app.modules.auth.models import BlacklistedToken


async def blacklist_token(session: AsyncSession, blacklisted_token: BlacklistedToken):
    session.add(blacklist_token)
    await session.commit()
    await session.refresh(user)
    return user


async def is_token_blacklisted(session: AsyncSession, jti: str) -> bool:
    q = select(BlacklistedToken).where(BlacklistedToken.jti == jti)
    res = await session.execute(q)
    return res.scalar() is not None
