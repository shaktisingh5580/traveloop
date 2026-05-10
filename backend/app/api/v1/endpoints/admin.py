"""Admin dashboard endpoints. Owner: Shakti"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, func, cast, String
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone, timedelta
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.user import User
from app.models.trip import Trip, TripStop
from app.models.geography import City, Country

router = APIRouter()

async def require_admin(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user or user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user_id

@router.get("/stats")
async def get_platform_stats(admin_id: str = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)
    total_users = (await db.execute(select(func.count(User.id)).where(User.is_active == True))).scalar()
    total_trips = (await db.execute(select(func.count(Trip.id)))).scalar()
    active_trips = (await db.execute(select(func.count(Trip.id)).where(cast(Trip.status, String) == "ongoing"))).scalar()
    public_trips = (await db.execute(select(func.count(Trip.id)).where(Trip.is_public == True))).scalar()
    new_trips = (await db.execute(select(func.count(Trip.id)).where(Trip.created_at >= week_ago))).scalar()
    new_users = (await db.execute(select(func.count(User.id)).where(User.created_at >= week_ago))).scalar()
    return {"total_users": total_users, "total_trips": total_trips, "active_trips": active_trips, "public_trips": public_trips, "trips_this_week": new_trips, "new_users_this_week": new_users}

@router.get("/top-cities")
async def get_top_cities(limit: int = 10, admin_id: str = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(City.name, Country.name.label("country"), func.count(TripStop.id).label("visits"))
        .join(TripStop, City.id == TripStop.city_id).join(Country, City.country_id == Country.id)
        .group_by(City.name, Country.name).order_by(func.count(TripStop.id).desc()).limit(limit)
    )
    return [{"city": r[0], "country": r[1], "visits": r[2]} for r in result.all()]

@router.get("/users")
async def list_users(page: int = 1, limit: int = 20, admin_id: str = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    offset = (page - 1) * limit
    result = await db.execute(select(User).order_by(User.created_at.desc()).offset(offset).limit(limit))
    users = result.scalars().all()
    return [{"id": str(u.id), "email": u.email, "full_name": u.full_name, "role": u.role, "is_active": u.is_active, "created_at": u.created_at.isoformat()} for u in users]
