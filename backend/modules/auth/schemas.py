from pydantic import BaseModel


class ObtainTokenRequest(BaseModel):
    email: str
    password: str


class ObtainTokenResponse(BaseModel):
    refresh: str
    access: str
