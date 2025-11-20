from datetime import date, datetime, timedelta
from typing import Union

DateInput = Union[date, datetime, str]


def _to_date(d: DateInput) -> date:
    """Converts string or datetime to date object"""
    if isinstance(d, date):
        return d
    if isinstance(d, datetime):
        return d.date()
    if isinstance(d, str):
        try:
            return datetime.fromisoformat(d).date()
        except ValueError:
            raise ValueError(f"Cannot parse date string: {d}")
    raise TypeError(f"Unsupported type: {type(d)}")


def normalize_date(d: DateInput) -> date:
    """Returns only the day part, removes time"""
    return _to_date(d)


def day_of_week(d: DateInput) -> int:
    """Returns 1-7 (Mon-Sun)"""
    return _to_date(d).isoweekday()


def days_between(d1: DateInput, d2: DateInput) -> int:
    """Returns absolute number of days between two dates"""
    delta = _to_date(d2) - _to_date(d1)
    return abs(delta.days)


def is_same_day(d1: DateInput, d2: DateInput) -> bool:
    return _to_date(d1) == _to_date(d2)


def is_in_range(d: DateInput, start: DateInput, end: DateInput) -> bool:
    d = _to_date(d)
    return _to_date(start) <= d <= _to_date(end)
