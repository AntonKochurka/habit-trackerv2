from typing import Literal

from pydantic import BaseModel, EmailStr


class ObtainTokensRequest(BaseModel):
    username: str | None
    email: EmailStr | None

    password: str


class TokenPairResponse(BaseModel):
    access: str
    refresh: str


class BlacklistTokensRequest(BaseModel):
    access: str | None
    refresh: bool = False
