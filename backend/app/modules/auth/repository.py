from fastapi import HTTPException, status

from app.core.db import AsyncSession
from app.modules.auth.schemas import ObtainTokensRequest, TokenPairResponse
from app.modules.auth.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.modules.users.repository import UserRepository

# from app.modules.auth.crud import *


class AuthRepository:
    def __init__(self, session: AsyncSession, user_repo: UserRepository):
        self.session = session
        self.user_repo = user_repo

    async def obtain_tokens(self, body: ObtainTokensRequest) -> TokenPairResponse:
        if not body.username and not body.email or not body.password:
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST, "Provide correct credentials."
            )

        if body.username:
            user = await self.user_repo.find_user_by_username(body.username)
        else:
            user = await self.user_repo.find_user_by_email(body.email)

        if not self.user_repo.verify_password(body.password, user.password):
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Incorrect password.")

        access, refresh = create_access_token(user_id=user.id), create_refresh_token(
            user_id=user.id
        )

        return TokenPairResponse(access=access, refresh=refresh)

    def refresh_tokens(self, refresh: str): ...

    def blacklist_tokens(self, access: str | None, refresh: str | None): ...