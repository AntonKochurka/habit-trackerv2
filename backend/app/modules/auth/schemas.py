from pydantic import BaseModel, EmailStr


class ObtainTokensRequest(BaseModel):
    username: str | None
    email: EmailStr | None

    password: str


class ObtainTokensResponse(BaseModel):
    access: str
    refresh: str
