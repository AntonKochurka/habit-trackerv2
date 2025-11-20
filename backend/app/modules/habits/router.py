from fastapi import APIRouter, Depends, HTTPException, status

from app.modules.habits.dependencies import HabitRepository, get_habit_repository
from app.modules.habits.schemas import HabitCreate, HabitPublic

router = APIRouter(prefix="/habits")


@router.post("/", response_model=HabitPublic)
async def habit_create_route(
    body: HabitCreate, repo: HabitRepository = Depends(get_habit_repository)
):
    return await repo.create_habit(body)


@router.get("/{habit_id}", response_model=HabitPublic)
async def get_habit_by_id_route(
    habit_id: int,
    repo: HabitRepository = Depends(get_habit_repository)
):
    return await repo.find_habit_by_id(habit_id, orm=True)