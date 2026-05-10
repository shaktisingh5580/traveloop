"""Trip notes/journal endpoints. Owner: Kunal & Aman"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.trip import Trip
from app.models.note import TripNote
from app.schemas.note import NoteCreate, NoteUpdate

router = APIRouter()

async def _verify(trip_id, user_id, db):
    r = await db.execute(select(Trip).where(Trip.id == trip_id, Trip.user_id == user_id))
    if not r.scalar_one_or_none(): raise HTTPException(404, "Trip not found")

@router.get("/")
async def list_notes(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify(trip_id, user_id, db)
    result = await db.execute(select(TripNote).where(TripNote.trip_id == trip_id).order_by(TripNote.note_date.desc().nullslast(), TripNote.created_at.desc()))
    return [{"id": str(n.id), "title": n.title, "content": n.content, "stop_id": str(n.stop_id) if n.stop_id else None, "note_date": str(n.note_date) if n.note_date else None, "created_at": n.created_at.isoformat(), "updated_at": n.updated_at.isoformat()} for n in result.scalars().all()]

@router.post("/", status_code=201)
async def create_note(trip_id: str, data: NoteCreate, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify(trip_id, user_id, db)
    note = TripNote(trip_id=trip_id, title=data.title, content=data.content, stop_id=data.stop_id, note_date=data.note_date)
    db.add(note)
    await db.flush()
    return {"id": str(note.id), "message": "Note created"}

@router.put("/{note_id}")
async def update_note(trip_id: str, note_id: str, data: NoteUpdate, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify(trip_id, user_id, db)
    result = await db.execute(select(TripNote).where(TripNote.id == note_id, TripNote.trip_id == trip_id))
    note = result.scalar_one_or_none()
    if not note: raise HTTPException(404, "Note not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(note, field, value)
    return {"message": "Note updated"}

@router.delete("/{note_id}", status_code=204)
async def delete_note(trip_id: str, note_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify(trip_id, user_id, db)
    result = await db.execute(select(TripNote).where(TripNote.id == note_id, TripNote.trip_id == trip_id))
    note = result.scalar_one_or_none()
    if not note: raise HTTPException(404, "Note not found")
    await db.delete(note)
