"""
Trip endpoints — CRUD for trips (create, list, view, update, delete).
Owner: Shakti & Kunal
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id

router = APIRouter()


@router.post("/", status_code=201)
async def create_trip(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Create a new trip."""
    # TODO: Implement — validate dates, insert trip, return trip data
    pass


@router.get("/")
async def list_trips(
    status: str = Query(None),
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """List all trips for the current user, optionally filtered by status."""
    # TODO: Implement
    pass


@router.get("/{trip_id}")
async def get_trip(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Get full trip details with stops and budget summary."""
    # TODO: Implement
    pass


@router.put("/{trip_id}")
async def update_trip(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Update trip details (name, dates, description, status)."""
    # TODO: Implement
    pass


@router.delete("/{trip_id}", status_code=204)
async def delete_trip(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Delete a trip and all associated data (cascade)."""
    # TODO: Implement
    pass


@router.post("/{trip_id}/copy", status_code=201)
async def copy_trip(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Copy a public trip to user's own trips."""
    # TODO: Implement — deep copy stops, activities, packing items
    pass
