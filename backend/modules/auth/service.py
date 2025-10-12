from modules.auth.repository import AuthRepository
from modules.user.service import UserService


class AuthService:
    def __init__(self, auth_repo: AuthRepository, user_service: UserService):
        self.auth_repo = auth_repo
        self.user_service = user_service

    def check_password(self, email: str) -> None: ...
