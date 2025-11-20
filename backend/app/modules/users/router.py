from fastapi import APIRouter, Depends

from app.core.db import get_session
from app.modules.users.repository import UserRepository
from app.modules.users.schemas import UserCreate, UserPublic

router = APIRouter(prefix="/users")


@router.post("/", response_model=UserPublic)
async def register_user(user_in: UserCreate, session=Depends(get_session)):
    repo = UserRepository(session)
    return await repo.register_user(user_in)


@router.get("/{user_id}", response_model=UserPublic)
async def get_user_by_id(user_id: int, session=Depends(get_session)):
    repo = UserRepository(session)
    user = await repo.find_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
