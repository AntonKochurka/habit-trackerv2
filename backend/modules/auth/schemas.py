from pydantic import BaseModel, EmailStr


class ObtainTokenRequest(BaseModel):
    email: EmailStr
    password: str


class ObtainTokenResponse(BaseModel):
    refresh: str
    access: str
