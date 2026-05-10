"""Trip sharing endpoints. Owner: Shakti & Kunal"""

import re, uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.trip import Trip
from app.models.sharing import TripShare
from app.models.user import User

router = APIRouter()

@router.post("/publish")
async def make_public(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Trip).where(Trip.id == trip_id, Trip.user_id == user_id))
    trip = result.scalar_one_or_none()
    if not trip: raise HTTPException(404, "Trip not found")
    trip.is_public = True
    slug = re.sub(r"[^a-z0-9]+", "-", trip.name.lower()).strip("-")
    trip.share_slug = f"{slug}-{str(trip.id)[:8]}"
    return {"share_slug": trip.share_slug, "public_url": f"/trip/{trip.share_slug}"}

@router.post("/unpublish")
async def make_private(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Trip).where(Trip.id == trip_id, Trip.user_id == user_id))
    trip = result.scalar_one_or_none()
    if not trip: raise HTTPException(404, "Trip not found")
    trip.is_public = False
    return {"message": "Trip is now private"}

@router.get("/public/{share_slug}")
async def get_public_trip(share_slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Trip).where(Trip.share_slug == share_slug, Trip.is_public == True))
    trip = result.scalar_one_or_none()
    if not trip: raise HTTPException(404, "Trip not found or is private")
    return {"id": str(trip.id), "name": trip.name, "description": trip.description, "start_date": str(trip.start_date), "end_date": str(trip.end_date), "status": trip.status}

@router.post("/invite")
async def share_with_user(trip_id: str, email: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Trip).where(Trip.id == trip_id, Trip.user_id == user_id))
    if not result.scalar_one_or_none(): raise HTTPException(404, "Trip not found")
    target = await db.execute(select(User).where(User.email == email))
    target_user = target.scalar_one_or_none()
    if not target_user: raise HTTPException(404, "User not found")
    share = TripShare(trip_id=trip_id, shared_with_id=target_user.id, permission="view")
    db.add(share)
    await db.flush()
    return {"message": f"Trip shared with {email}"}

@router.delete("/invite/{share_id}", status_code=204)
async def revoke_share(trip_id: str, share_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TripShare).where(TripShare.id == share_id, TripShare.trip_id == trip_id))
    share = result.scalar_one_or_none()
    if not share: raise HTTPException(404, "Share not found")
    await db.delete(share)
