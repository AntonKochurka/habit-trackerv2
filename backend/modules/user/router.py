from fastapi import APIRouter, Depends
from modules.user.dependencies import UserService, get_user_service
from modules.user.schemas import UserCreateRequest, UserReadResponse

router = APIRouter(prefix="/users")


@router.post("/", response_model=UserReadResponse)
async def create_user(
    body: UserCreateRequest,
    user_service: UserService = Depends(get_user_service),
):
    user = await user_service.create_user(body)
    return UserReadResponse(user.to_dict())
