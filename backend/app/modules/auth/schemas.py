from typing import Literal

from pydantic import BaseModel, EmailStr, model_validator


class ObtainTokensRequest(BaseModel):
    username: str | None = None
    email: EmailStr | None = None

    password: str


class TokenPairResponse(BaseModel):
    access: str
    refresh: str


class BlacklistTokensRequest(BaseModel):
    access: str | None
    refresh: bool = False
