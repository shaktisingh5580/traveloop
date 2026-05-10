"""
Activity search endpoints — browse activities by city, type, cost.
Owner: Aman & Kunal
"""

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.activity import Activity
from app.models.geography import City

router = APIRouter()


@router.get("/")
async def search_activities(
    city_id: int = Query(None, description="Filter by city"),
    activity_type: str = Query(None, description="Filter by type"),
    max_cost: float = Query(None, description="Max estimated cost"),
    max_duration: float = Query(None, description="Max duration in hours"),
    sort_by: str = Query("rating", description="rating, cost, duration"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    """Search activities with filters and pagination."""
    query = select(Activity, City).join(City, Activity.city_id == City.id).where(Activity.is_active == True)

    if city_id:
        query = query.where(Activity.city_id == city_id)
    if activity_type:
        query = query.where(Activity.activity_type == activity_type)
    if max_cost is not None:
        query = query.where(Activity.estimated_cost <= max_cost)
    if max_duration is not None:
        query = query.where(Activity.duration_hours <= max_duration)

    # Sorting
    if sort_by == "cost":
        query = query.order_by(Activity.estimated_cost)
    elif sort_by == "duration":
        query = query.order_by(Activity.duration_hours)
    else:
        query = query.order_by(Activity.rating.desc().nullslast())

    offset = (page - 1) * limit
    query = query.offset(offset).limit(limit)

    result = await db.execute(query)
    rows = result.all()

    return {
        "activities": [
            {
                "id": a.id,
                "city_id": a.city_id,
                "city_name": city.name,
                "name": a.name,
                "description": a.description,
                "activity_type": a.activity_type,
                "duration_hours": float(a.duration_hours) if a.duration_hours else None,
                "estimated_cost": float(a.estimated_cost),
                "rating": float(a.rating) if a.rating else None,
                "image_url": a.image_url,
            }
            for a, city in rows
        ],
        "page": page,
        "limit": limit,
    }


@router.get("/{activity_id}")
async def get_activity(activity_id: int, db: AsyncSession = Depends(get_db)):
    """Get full activity details."""
    result = await db.execute(
        select(Activity, City).join(City, Activity.city_id == City.id).where(Activity.id == activity_id)
    )
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="Activity not found")

    a, city = row
    return {
        "id": a.id,
        "city_id": a.city_id,
        "city_name": city.name,
        "name": a.name,
        "description": a.description,
        "activity_type": a.activity_type,
        "duration_hours": float(a.duration_hours) if a.duration_hours else None,
        "estimated_cost": float(a.estimated_cost),
        "rating": float(a.rating) if a.rating else None,
        "image_url": a.image_url,
        "address": a.address,
    }
