from fastapi import APIRouter, Depends, HTTPException, status

from modules.user.dependencies import UserService, get_user_service
from modules.user.schemas import UserCreateRequest, UserReadResponse

router = APIRouter(prefix="/users")


@router.post("", response_model=UserReadResponse)
async def create_user(
    body: UserCreateRequest,
    user_service: UserService = Depends(get_user_service),
):
    user = await user_service.create_user(body)
    return UserReadResponse(**user.to_dict())


@router.get("/{user_id}", response_model=UserReadResponse)
async def get_user(user_id: int, user_service: UserService = Depends(get_user_service)):
    user = await user_service.user_repo.get_user_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )

    return UserReadResponse(**user.to_dict())
