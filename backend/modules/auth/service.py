from core.security import create_access_token, create_refresh_token

from modules.auth.repository import AuthRepository
from modules.user.service import UserService


class AuthService:
    def __init__(self, auth_repo: AuthRepository, user_service: UserService):
        self.auth_repo = auth_repo
        self.user_service = user_service


    def obtain_pair(self, sub: int) -> tuple[str, str, int]:
        data = {"sub": str(sub)}
        access, _ = create_access_token(data)
        refresh, exp = create_refresh_token(data)

        return access, refresh, exp