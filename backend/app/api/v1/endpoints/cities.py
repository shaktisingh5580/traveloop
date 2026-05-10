"""
City search endpoints — browse and filter cities.
Owner: Aman & Shakti
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db

router = APIRouter()


@router.get("/")
async def search_cities(
    q: str = Query(None, description="Search by city name"),
    country: str = Query(None, description="Filter by country code"),
    region: str = Query(None, description="Filter by region"),
    max_cost: int = Query(None, ge=1, le=5, description="Max cost index (1-5)"),
    sort_by: str = Query("popularity", description="Sort: popularity, name, cost"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    """Search and filter cities with pagination."""
    # TODO: Implement — full-text search, filter, paginate
    pass


@router.get("/popular")
async def popular_cities(limit: int = Query(10, ge=1, le=20), db: AsyncSession = Depends(get_db)):
    """Get top N popular cities for dashboard recommendations."""
    # TODO: Implement
    pass


@router.get("/{city_id}")
async def get_city(city_id: int, db: AsyncSession = Depends(get_db)):
    """Get full city details with available activities."""
    # TODO: Implement — join activities, return city + activity list
    pass
