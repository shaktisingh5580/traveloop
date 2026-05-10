"""
Trip notes/journal endpoints — per-trip or per-stop notes.
Owner: Kunal & Aman
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id

router = APIRouter()


@router.get("/")
async def list_notes(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """List all notes for a trip, sorted by date."""
    # TODO: Implement
    pass


@router.post("/", status_code=201)
async def create_note(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Create a note tied to a trip or specific stop."""
    # TODO: Implement
    pass


@router.put("/{note_id}")
async def update_note(trip_id: str, note_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Update a note's content or title."""
    # TODO: Implement
    pass


@router.delete("/{note_id}", status_code=204)
async def delete_note(trip_id: str, note_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Delete a note."""
    # TODO: Implement
    pass
