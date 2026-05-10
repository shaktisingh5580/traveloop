"""
Trip Stop endpoints — manage cities/stops within a trip.
Owner: Kunal & Shakti
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id

router = APIRouter()


@router.post("/", status_code=201)
async def add_stop(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Add a city stop to a trip."""
    # TODO: Implement — validate city, dates, insert stop with sort_order
    pass


@router.get("/")
async def list_stops(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """List all stops in a trip, ordered by sort_order."""
    # TODO: Implement
    pass


@router.put("/{stop_id}")
async def update_stop(trip_id: str, stop_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Update stop details (dates, transport, accommodation)."""
    # TODO: Implement
    pass


@router.delete("/{stop_id}", status_code=204)
async def remove_stop(trip_id: str, stop_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Remove a stop from the trip."""
    # TODO: Implement
    pass


@router.put("/reorder")
async def reorder_stops(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Reorder stops — accepts list of {stop_id, sort_order}."""
    # TODO: Implement — batch update sort_order
    pass


@router.post("/{stop_id}/activities", status_code=201)
async def add_activity_to_stop(trip_id: str, stop_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Schedule an activity at a stop."""
    # TODO: Implement
    pass


@router.delete("/{stop_id}/activities/{activity_id}", status_code=204)
async def remove_activity_from_stop(trip_id: str, stop_id: str, activity_id: int, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Remove a scheduled activity from a stop."""
    # TODO: Implement
    pass
