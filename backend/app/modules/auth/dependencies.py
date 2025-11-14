from typing import Optional

from fastapi import Depends, HTTPException
from fastapi.security import APIKeyCookie, HTTPAuthorizationCredentials, HTTPBearer

from app.core.db import AsyncSession, get_session
from app.modules.users.models import User

access_token = HTTPBearer(scheme_name="access_token", auto_error=False)
refresh_token = APIKeyCookie(name="refresh", scheme_name="refresh_token")
