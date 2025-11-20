from fastapi import APIRouter, Depends

from app.modules.users.dependencies import UserRepository, get_user_reposirory
from app.modules.users.schemas import UserCreate, UserPublic

router = APIRouter(prefix="/users")


@router.post("/", response_model=UserPublic)
async def user_create(
    user_in: UserCreate, repo: UserRepository = Depends(get_user_reposirory)
):
    return await repo.register_user(user_in)


@router.get("/{user_id}", response_model=UserPublic)
async def get_user_by_id(
    user_id: int, repo: UserRepository = Depends(get_user_reposirory)
):
    user = await repo.find_user_by_id(user_id, orm=True)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
