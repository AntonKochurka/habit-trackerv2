from fastapi import APIRouter, Depends, HTTPException, status

from app.modules.habits.dependencies import HabitRepository, get_habit_repository
from app.modules.habits.schemas import HabitCreate, HabitPublic

router = APIRouter(prefix="/habits")


@router.post("/", response_model=HabitPublic)
async def habit_create(
    body: HabitCreate, repo: HabitRepository = Depends(get_habit_repository)
):
    return
