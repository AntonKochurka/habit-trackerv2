from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from pwdlib import PasswordHash

from core.config import config

pwd_context = PasswordHash.recommended()


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def _create_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire_at = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire_at})
    return jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)


def create_access_token(data: dict) -> str:
    return _create_token(data, timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES))


def create_refresh_token(data: dict) -> str:
    return _create_token(data, timedelta(days=config.REFRESH_TOKEN_EXPIRE_DAYS))


def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        return payload
    except JWTError:
        raise credentials_exception
