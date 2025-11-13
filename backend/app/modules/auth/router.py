from fastapi import APIRouter, HTTPException, status

router = APIRouter(prefix="/auth")


@router.post("/obtain")
async def obtain_tokens(): ...


@router.post("/refresh")
async def refresh_tokens(): ...


@router.post("/blacklist")
async def blacklist_tokens(): ...
