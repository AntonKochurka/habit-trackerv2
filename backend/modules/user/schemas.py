from pydantic import BaseModel, ConfigDict, EmailStr


class BaseUser(BaseModel):
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)


class UserCreateRequest(BaseUser):
    password: str


class UserReadResponse(BaseUser):
    id: int
    created_at: str | None = None
    updated_at: str | None = None


class UserUpdateRequest(BaseModel):
    email: EmailStr | None = None
    password: str | None = None
