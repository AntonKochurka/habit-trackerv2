from datetime import datetime
from typing import Any, Literal, Sequence, Union

from ormparams import OrmParamsMixin
from sqlalchemy import Column, DateTime, Integer
from sqlalchemy.inspection import inspect
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class BaseMixin(OrmParamsMixin):
    id = Column(Integer, primary_key=True, index=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    EXCLUDED_FIELDS = set()

    def to_dict(
        self,
        *,
        excluded_fields: Sequence[str] | None = None,
        excluded_fields_behavior: Literal["mix", "block"] = "include",
    ) -> dict[str, Any]:
        """
        Method to transform SQLAlchemy model in dictionary.

        [ ARGS ]:
            - excluded_fields: list of fields to exclude for transforming
            - excluded_fields_behavior: behavior of excluding
                - mix (default): mixs self.EXCLUDED_FIELDS and excluded_fields
                - block: does not include self.EXCLUDED_FIELDS
        """
        mapper = inspect(self.__class__)
        result = {}

        excluded_fields_set = set(excluded_fields or [])

        if excluded_fields_behavior == "mix":
            excluded_fields_set |= set(getattr(self, "EXCLUDED_FIELDS", []))

        for column in mapper.columns:
            column_name = column.key

            if column_name in excluded_fields_set:
                continue

            column_value = getattr(self, column_name)

            result[column_name] = self._get_validated_value(column_value, column.type)

        return result

    def _get_validated_value(self, value: Any, type_: Any) -> Any:
        """Checks type of sqlalchemy column and type of value, make validation if needed"""
        if value is None:
            return None
        if isinstance(type_, DateTime):
            return value.isoformat() if isinstance(value, datetime) else value

        return value
