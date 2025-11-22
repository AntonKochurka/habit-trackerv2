from fastapi import APIRouter

router = APIRouter(prefix="/merged")


@router.get("/forday")
async def get_for_day_route():
    """
        Get all Merged Habits for given day.
        Pagination will be included.
        Also gets the meta information (for eg: how much habit were completed.)
    """
    ...