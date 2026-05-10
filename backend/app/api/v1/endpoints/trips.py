"""
Trip endpoints — full CRUD + copy.
Owner: Shakti & Kunal
"""

import uuid
import re
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.trip import Trip, TripStop, StopActivity
from app.models.expense import TripExpense
from app.schemas.trip import TripCreate, TripUpdate

router = APIRouter()


def _generate_slug(name: str, trip_id: str) -> str:
    """Generate a URL-friendly slug from trip name."""
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return f"{slug}-{trip_id[:8]}"


@router.post("/", status_code=201)
async def create_trip(
    data: TripCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Create a new trip."""
    # Validate dates
    if data.end_date < data.start_date:
        raise HTTPException(status_code=400, detail="End date must be after start date")

    trip = Trip(
        user_id=user_id,
        name=data.name,
        description=data.description,
        start_date=data.start_date,
        end_date=data.end_date,
        total_budget=data.total_budget,
        currency_code=data.currency_code or "USD",
    )
    db.add(trip)
    await db.flush()

    return {
        "id": str(trip.id),
        "name": trip.name,
        "start_date": str(trip.start_date),
        "end_date": str(trip.end_date),
        "status": trip.status,
        "message": "Trip created successfully",
    }


@router.get("/")
async def list_trips(
    status_filter: str = Query(None, alias="status"),
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """List all trips for the current user."""
    query = select(Trip).where(Trip.user_id == user_id)

    if status_filter:
        query = query.where(Trip.status == status_filter)

    query = query.order_by(Trip.created_at.desc())
    result = await db.execute(query)
    trips = result.scalars().all()

    trip_list = []
    for t in trips:
        # Count stops
        stop_count = await db.execute(
            select(func.count(TripStop.id)).where(TripStop.trip_id == t.id)
        )
        # Sum expenses
        expense_sum = await db.execute(
            select(func.coalesce(func.sum(TripExpense.amount), 0)).where(TripExpense.trip_id == t.id)
        )
        trip_list.append({
            "id": str(t.id),
            "name": t.name,
            "description": t.description,
            "start_date": str(t.start_date),
            "end_date": str(t.end_date),
            "total_days": (t.end_date - t.start_date).days + 1,
            "status": t.status,
            "is_public": t.is_public,
            "share_slug": t.share_slug,
            "cover_image_url": t.cover_image_url,
            "total_budget": float(t.total_budget) if t.total_budget else None,
            "currency_code": t.currency_code,
            "stop_count": stop_count.scalar(),
            "total_estimated_cost": float(expense_sum.scalar()),
            "created_at": t.created_at.isoformat(),
        })

    return trip_list


@router.get("/{trip_id}")
async def get_trip(
    trip_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Get full trip details with stops."""
    result = await db.execute(
        select(Trip)
        .options(selectinload(Trip.stops).selectinload(TripStop.city))
        .where(Trip.id == trip_id, Trip.user_id == user_id)
    )
    trip = result.scalar_one_or_none()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    # Build stops with city names
    stops_data = []
    for stop in trip.stops:
        stops_data.append({
            "id": str(stop.id),
            "city_id": stop.city_id,
            "city_name": stop.city.name if stop.city else "",
            "arrival_date": str(stop.arrival_date),
            "departure_date": str(stop.departure_date),
            "sort_order": stop.sort_order,
            "transport_mode": stop.transport_mode,
            "transport_cost": float(stop.transport_cost or 0),
            "accommodation": stop.accommodation,
            "accommodation_cost": float(stop.accommodation_cost or 0),
        })

    # Sum expenses
    expense_sum = await db.execute(
        select(func.coalesce(func.sum(TripExpense.amount), 0)).where(TripExpense.trip_id == trip.id)
    )

    return {
        "id": str(trip.id),
        "name": trip.name,
        "description": trip.description,
        "start_date": str(trip.start_date),
        "end_date": str(trip.end_date),
        "total_days": (trip.end_date - trip.start_date).days + 1,
        "status": trip.status,
        "is_public": trip.is_public,
        "share_slug": trip.share_slug,
        "cover_image_url": trip.cover_image_url,
        "total_budget": float(trip.total_budget) if trip.total_budget else None,
        "currency_code": trip.currency_code,
        "stops": stops_data,
        "stop_count": len(stops_data),
        "total_estimated_cost": float(expense_sum.scalar()),
        "created_at": trip.created_at.isoformat(),
    }


@router.put("/{trip_id}")
async def update_trip(
    trip_id: str,
    data: TripUpdate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Update trip details."""
    result = await db.execute(
        select(Trip).where(Trip.id == trip_id, Trip.user_id == user_id)
    )
    trip = result.scalar_one_or_none()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    update_data = data.model_dump(exclude_unset=True)

    # Validate dates if both provided
    start = update_data.get("start_date", trip.start_date)
    end = update_data.get("end_date", trip.end_date)
    if end < start:
        raise HTTPException(status_code=400, detail="End date must be after start date")

    for field, value in update_data.items():
        setattr(trip, field, value)

    return {"message": "Trip updated", "id": str(trip.id)}


@router.delete("/{trip_id}", status_code=204)
async def delete_trip(
    trip_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Delete a trip and all associated data (cascade)."""
    result = await db.execute(
        select(Trip).where(Trip.id == trip_id, Trip.user_id == user_id)
    )
    trip = result.scalar_one_or_none()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    await db.delete(trip)


@router.post("/{trip_id}/copy", status_code=201)
async def copy_trip(
    trip_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Copy a public trip to user's own trips."""
    result = await db.execute(
        select(Trip)
        .options(selectinload(Trip.stops).selectinload(TripStop.activities))
        .where(Trip.id == trip_id)
    )
    source = result.scalar_one_or_none()
    if not source:
        raise HTTPException(status_code=404, detail="Trip not found")
    if not source.is_public and str(source.user_id) != user_id:
        raise HTTPException(status_code=403, detail="Trip is not public")

    # Deep copy
    new_trip = Trip(
        user_id=user_id,
        name=f"Copy of {source.name}",
        description=source.description,
        start_date=source.start_date,
        end_date=source.end_date,
        total_budget=source.total_budget,
        currency_code=source.currency_code,
        status="draft",
    )
    db.add(new_trip)
    await db.flush()

    for stop in source.stops:
        new_stop = TripStop(
            trip_id=new_trip.id,
            city_id=stop.city_id,
            arrival_date=stop.arrival_date,
            departure_date=stop.departure_date,
            sort_order=stop.sort_order,
            transport_mode=stop.transport_mode,
            transport_cost=stop.transport_cost,
            accommodation=stop.accommodation,
            accommodation_cost=stop.accommodation_cost,
        )
        db.add(new_stop)
        await db.flush()

        for sa in stop.activities:
            new_sa = StopActivity(
                stop_id=new_stop.id,
                activity_id=sa.activity_id,
                scheduled_date=sa.scheduled_date,
                start_time=sa.start_time,
                end_time=sa.end_time,
                custom_cost=sa.custom_cost,
                sort_order=sa.sort_order,
            )
            db.add(new_sa)

    return {"message": "Trip copied", "new_trip_id": str(new_trip.id)}
