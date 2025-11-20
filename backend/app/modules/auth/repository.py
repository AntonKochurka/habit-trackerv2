from fastapi import HTTPException, status

from app.core.db import AsyncSession
from app.modules.auth import crud
from app.modules.auth.models import BlacklistedToken
from app.modules.auth.schemas import ObtainTokensRequest, TokenPairResponse
from app.modules.auth.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.modules.users.repository import UserRepository


class AuthRepository:
    def __init__(self, session: AsyncSession, user_repo: UserRepository):
        self.session = session
        self.user_repo = user_repo

    async def obtain_tokens(self, body: ObtainTokensRequest) -> TokenPairResponse:
        if (not body.username and not body.email) or not body.password:
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST, "Provide correct credentials."
            )

        if body.username:
            user = await self.user_repo.find_user_by_username(body.username)
        else:
            user = await self.user_repo.find_user_by_email(body.email)

        if not self.user_repo.verify_password(body.password, user.password):
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Incorrect password.")

        access = create_access_token(user_id=user.id)
        refresh = create_refresh_token(user_id=user.id)

        return TokenPairResponse(access=access, refresh=refresh)

    async def refresh_tokens(self, refresh: str, access: str | None = None):
        decoded = decode_token(refresh, ttype="refresh")
        await self.check_blacklisted_jti(decoded["jti"])

        user_id = int(decoded["sub"])
        user = await self.user_repo.find_user_by_id(user_id)

        new_access = create_access_token(user_id=user.id)
        new_refresh = create_refresh_token(user_id=user.id)

        return TokenPairResponse(access=new_access, refresh=new_refresh)

    async def blacklist_tokens(
        self, access: str | None = None, refresh: str | None = None
    ):
        for token, ttype in ((access, "access"), (refresh, "refresh")):
            if token:
                decoded = decode_token(token, ttype=ttype)
                jti = decoded["jti"]

                entity = BlacklistedToken(jti=jti, token_type=ttype)
                await crud.add_blacklisted_token(self.session, entity)

    async def check_blacklisted_jti(self, jti: str):
        is_blacklisted = await crud.is_token_blacklisted(self.session, jti)
        if is_blacklisted:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Token is blacklisted.")
