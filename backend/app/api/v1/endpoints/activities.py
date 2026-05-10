"""
Activity search endpoints — browse activities by city, type, cost.
Owner: Aman & Kunal
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db

router = APIRouter()


@router.get("/")
async def search_activities(
    city_id: int = Query(None, description="Filter by city"),
    activity_type: str = Query(None, description="Filter by type"),
    max_cost: float = Query(None, description="Max estimated cost"),
    max_duration: float = Query(None, description="Max duration in hours"),
    sort_by: str = Query("rating", description="Sort: rating, cost, duration"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    """Search activities with filters and pagination."""
    # TODO: Implement
    pass


@router.get("/{activity_id}")
async def get_activity(activity_id: int, db: AsyncSession = Depends(get_db)):
    """Get full activity details."""
    # TODO: Implement
    pass
