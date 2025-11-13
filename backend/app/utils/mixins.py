from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, func
from sqlalchemy.inspection import inspect


@declarative_mixin
class BaseMixin:
    id = Column(Integer, primary_key=True, index=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
