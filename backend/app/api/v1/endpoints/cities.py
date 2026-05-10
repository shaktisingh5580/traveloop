"""
City search endpoints — browse and filter cities.
Owner: Aman & Shakti
"""

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.geography import City, Country, Region
from app.models.activity import Activity

router = APIRouter()


@router.get("/")
async def search_cities(
    q: str = Query(None, description="Search by city name"),
    country: str = Query(None, description="Filter by country code"),
    region: str = Query(None, description="Filter by region name"),
    max_cost: int = Query(None, ge=1, le=5),
    sort_by: str = Query("popularity", description="popularity, name, cost"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    """Search and filter cities with pagination."""
    query = select(City, Country, Region).join(Country, City.country_id == Country.id).outerjoin(Region, Country.region_id == Region.id)

    if q:
        query = query.where(City.name.ilike(f"%{q}%"))
    if country:
        query = query.where(Country.code == country.upper())
    if region:
        query = query.where(Region.name.ilike(f"%{region}%"))
    if max_cost:
        query = query.where(City.cost_index <= max_cost)

    # Sorting
    if sort_by == "name":
        query = query.order_by(City.name)
    elif sort_by == "cost":
        query = query.order_by(City.cost_index)
    else:
        query = query.order_by(City.popularity.desc())

    # Pagination
    offset = (page - 1) * limit
    query = query.offset(offset).limit(limit)

    result = await db.execute(query)
    rows = result.all()

    # Total count for pagination
    count_query = select(func.count(City.id)).join(Country, City.country_id == Country.id)
    if q:
        count_query = count_query.where(City.name.ilike(f"%{q}%"))
    total = (await db.execute(count_query)).scalar()

    return {
        "cities": [
            {
                "id": city.id,
                "name": city.name,
                "country_name": ctry.name,
                "country_code": ctry.code,
                "region_name": rgn.name if rgn else None,
                "cost_index": city.cost_index,
                "popularity": city.popularity,
                "description": city.description,
                "image_url": city.image_url,
                "best_season": city.best_season,
                "latitude": float(city.latitude) if city.latitude else None,
                "longitude": float(city.longitude) if city.longitude else None,
            }
            for city, ctry, rgn in rows
        ],
        "total": total,
        "page": page,
        "limit": limit,
    }


@router.get("/popular")
async def popular_cities(
    limit: int = Query(10, ge=1, le=20),
    db: AsyncSession = Depends(get_db),
):
    """Get top N popular cities for dashboard."""
    result = await db.execute(
        select(City, Country)
        .join(Country, City.country_id == Country.id)
        .order_by(City.popularity.desc())
        .limit(limit)
    )
    rows = result.all()

    return [
        {
            "id": city.id,
            "name": city.name,
            "country_name": ctry.name,
            "cost_index": city.cost_index,
            "popularity": city.popularity,
            "image_url": city.image_url,
            "description": city.description,
        }
        for city, ctry in rows
    ]


@router.get("/{city_id}")
async def get_city(city_id: int, db: AsyncSession = Depends(get_db)):
    """Get city details with available activities."""
    result = await db.execute(
        select(City, Country)
        .join(Country, City.country_id == Country.id)
        .where(City.id == city_id)
    )
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="City not found")

    city, ctry = row

    # Get activities for this city
    act_result = await db.execute(
        select(Activity).where(Activity.city_id == city_id, Activity.is_active == True).order_by(Activity.rating.desc())
    )
    activities = act_result.scalars().all()

    return {
        "id": city.id,
        "name": city.name,
        "country_name": ctry.name,
        "country_code": ctry.code,
        "cost_index": city.cost_index,
        "popularity": city.popularity,
        "description": city.description,
        "image_url": city.image_url,
        "best_season": city.best_season,
        "timezone": city.timezone,
        "latitude": float(city.latitude) if city.latitude else None,
        "longitude": float(city.longitude) if city.longitude else None,
        "activities": [
            {
                "id": a.id,
                "name": a.name,
                "description": a.description,
                "activity_type": a.activity_type,
                "duration_hours": float(a.duration_hours) if a.duration_hours else None,
                "estimated_cost": float(a.estimated_cost),
                "rating": float(a.rating) if a.rating else None,
                "image_url": a.image_url,
            }
            for a in activities
        ],
    }
