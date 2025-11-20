from fastapi import APIRouter, HTTPException, status, Depends

from app.modules.entries.dependencies import HabitEntryRepository, get_habit_entry_repository
from app.modules.entries.schemas import HabitEntryCreate, HabitEntryPublic

router = APIRouter(prefix="/habit_entry")


@router.post("/", response_model=HabitEntryPublic)
async def create_habit_entry_route(
    body: HabitEntryCreate,
    repo: HabitEntryRepository = Depends(get_habit_entry_repository)
):
    return await repo.create_habit_entry(body)


@router.get("/{habit_entry_id}", response_model=HabitEntryPublic)
async def get_habit_entry_by_id_route(
    habit_entry_id: int,
    repo: HabitEntryRepository = Depends(get_habit_entry_repository)
):
    return await repo.find_habit_entry_by_id(habit_entry_id)