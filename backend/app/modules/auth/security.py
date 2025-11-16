import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import HTTPException, status
from jose import JWTError, jwt

from app.core.config import settings


def _now_ts() -> int:
    return int(datetime.now(tz=timezone.utc).timestamp())


def create_access_token(*, user_id: str | int) -> str:
    iat = _now_ts()
    exp = iat + settings.ACCESS_TOKEN_EXPIRE_SECONDS
    jti = str(uuid.uuid4())

    payload = {
        "sub": str(user_id),
        "iat": iat,
        "exp": exp,
        "jti": jti,
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def create_refresh_token(*, user_id: str | int) -> str:
    iat = _now_ts()
    exp = iat + settings.REFRESH_TOKEN_EXPIRE_SECONDS
    jti = str(uuid.uuid4())

    payload = {
        "sub": str(user_id),
        "iat": iat,
        "exp": exp,
        "jti": jti,
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def decode_token(token: str):
    try:
        return jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.JWT_ALGORITHM]
        )
    except JWTError as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
