import uuid
from datetime import datetime
from typing import Optional

from fastapi import HTTPException, status
from jose import JWTError, jwt

from app.core.config import settings


def _now_ts() -> int:
    return int(datetime.utcnow().timestamp())


def create_access_token(
    *, user_id: str, username: str, device_id: Optional[str] = None
) -> str:
    iat = _now_ts()
    exp = iat + settings.ACCESS_TOKEN_EXPIRE_SECONDS
    jti = str(uuid.uuid4())

    payload = {
        "sub": user_id,
        "username": username,
        "iat": iat,
        "exp": exp,
        "jti": jti,
        "device_id": device_id or "",
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def create_refresh_token(
    *, user_id: str, username: str, device_id: Optional[str] = None
) -> str:
    iat = _now_ts()
    exp = iat + settings.REFRESH_TOKEN_EXPIRE_SECONDS
    jti = str(uuid.uuid4())

    payload = {
        "sub": user_id,
        "username": username,
        "iat": iat,
        "exp": exp,
        "jti": jti,
        "device_id": device_id or "",
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_token(token: str):
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
