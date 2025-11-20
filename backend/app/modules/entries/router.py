from fastapi import APIRouter, HTTPException, status, Depends

from app.modules.entries.dependencies import EntryRepository, get_entry_repository
from app.modules.entries.schemas import EntryCreate, EntryPublic

router = APIRouter(prefix="/entry")


@router.post("/", response_model=EntryPublic)
async def create_entry_route(
    body: EntryCreate,
    repo: EntryRepository = Depends(get_entry_repository)
):
    return await repo.create_habit_entry(body)


@router.get("/{entry_id}", response_model=EntryPublic)
async def get_entry_by_id_route(
    entry_id: int,
    repo: EntryRepository = Depends(get_entry_repository)
):
    return await repo.find_entry_by_id(entry_id)