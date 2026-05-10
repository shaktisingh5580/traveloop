"""
Trip Stop endpoints — manage cities/stops within a trip.
Owner: Kunal & Shakti
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.trip import Trip, TripStop, StopActivity
from app.models.geography import City, Country
from app.schemas.stop import StopCreate, StopUpdate, StopActivityCreate, StopReorder

router = APIRouter()


async def _verify_trip_owner(trip_id: str, user_id: str, db: AsyncSession) -> Trip:
    """Helper: verify trip exists and belongs to user."""
    result = await db.execute(select(Trip).where(Trip.id == trip_id, Trip.user_id == user_id))
    trip = result.scalar_one_or_none()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip


@router.post("/", status_code=201)
async def add_stop(
    trip_id: str,
    data: StopCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Add a city stop to a trip."""
    await _verify_trip_owner(trip_id, user_id, db)

    # Verify city exists
    city_result = await db.execute(select(City).where(City.id == data.city_id))
    if not city_result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="City not found")

    # Validate dates
    if data.departure_date < data.arrival_date:
        raise HTTPException(status_code=400, detail="Departure must be after arrival")

    # Get next sort order
    max_order = await db.execute(
        select(func.coalesce(func.max(TripStop.sort_order), -1)).where(TripStop.trip_id == trip_id)
    )
    next_order = max_order.scalar() + 1

    stop = TripStop(
        trip_id=trip_id,
        city_id=data.city_id,
        arrival_date=data.arrival_date,
        departure_date=data.departure_date,
        sort_order=next_order,
        transport_mode=data.transport_mode,
        transport_cost=data.transport_cost,
        accommodation=data.accommodation,
        accommodation_cost=data.accommodation_cost,
        notes=data.notes,
    )
    db.add(stop)
    await db.flush()

    return {"id": str(stop.id), "sort_order": stop.sort_order, "message": "Stop added"}


@router.get("/")
async def list_stops(
    trip_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """List all stops in a trip, ordered by sort_order."""
    await _verify_trip_owner(trip_id, user_id, db)

    result = await db.execute(
        select(TripStop, City, Country)
        .join(City, TripStop.city_id == City.id)
        .join(Country, City.country_id == Country.id)
        .where(TripStop.trip_id == trip_id)
        .order_by(TripStop.sort_order)
    )
    rows = result.all()

    return [
        {
            "id": str(stop.id),
            "city_id": stop.city_id,
            "city_name": city.name,
            "country_name": country.name,
            "arrival_date": str(stop.arrival_date),
            "departure_date": str(stop.departure_date),
            "sort_order": stop.sort_order,
            "transport_mode": stop.transport_mode,
            "transport_cost": float(stop.transport_cost or 0),
            "accommodation": stop.accommodation,
            "accommodation_cost": float(stop.accommodation_cost or 0),
            "notes": stop.notes,
        }
        for stop, city, country in rows
    ]


@router.put("/{stop_id}")
async def update_stop(
    trip_id: str,
    stop_id: str,
    data: StopUpdate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Update stop details."""
    await _verify_trip_owner(trip_id, user_id, db)

    result = await db.execute(select(TripStop).where(TripStop.id == stop_id, TripStop.trip_id == trip_id))
    stop = result.scalar_one_or_none()
    if not stop:
        raise HTTPException(status_code=404, detail="Stop not found")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(stop, field, value)

    return {"message": "Stop updated", "id": str(stop.id)}


@router.delete("/{stop_id}", status_code=204)
async def remove_stop(
    trip_id: str,
    stop_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Remove a stop from the trip."""
    await _verify_trip_owner(trip_id, user_id, db)

    result = await db.execute(select(TripStop).where(TripStop.id == stop_id, TripStop.trip_id == trip_id))
    stop = result.scalar_one_or_none()
    if not stop:
        raise HTTPException(status_code=404, detail="Stop not found")

    await db.delete(stop)


@router.put("/reorder")
async def reorder_stops(
    trip_id: str,
    data: StopReorder,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Reorder stops — accepts list of stop IDs in desired order."""
    await _verify_trip_owner(trip_id, user_id, db)

    for index, stop_id in enumerate(data.stop_ids):
        result = await db.execute(
            select(TripStop).where(TripStop.id == stop_id, TripStop.trip_id == trip_id)
        )
        stop = result.scalar_one_or_none()
        if stop:
            stop.sort_order = index

    return {"message": "Stops reordered"}


@router.post("/{stop_id}/activities", status_code=201)
async def add_activity_to_stop(
    trip_id: str,
    stop_id: str,
    data: StopActivityCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Schedule an activity at a stop."""
    await _verify_trip_owner(trip_id, user_id, db)

    # Verify stop exists
    result = await db.execute(select(TripStop).where(TripStop.id == stop_id, TripStop.trip_id == trip_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Stop not found")

    # Check duplicate
    existing = await db.execute(
        select(StopActivity).where(
            StopActivity.stop_id == stop_id,
            StopActivity.activity_id == data.activity_id,
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Activity already added to this stop")

    # Get next sort order
    max_order = await db.execute(
        select(func.coalesce(func.max(StopActivity.sort_order), -1)).where(StopActivity.stop_id == stop_id)
    )

    sa = StopActivity(
        stop_id=stop_id,
        activity_id=data.activity_id,
        scheduled_date=data.scheduled_date,
        custom_cost=data.custom_cost,
        notes=data.notes,
        sort_order=max_order.scalar() + 1,
    )
    db.add(sa)
    await db.flush()

    return {"id": str(sa.id), "message": "Activity added to stop"}


@router.delete("/{stop_id}/activities/{activity_id}", status_code=204)
async def remove_activity_from_stop(
    trip_id: str,
    stop_id: str,
    activity_id: int,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Remove a scheduled activity from a stop."""
    await _verify_trip_owner(trip_id, user_id, db)

    result = await db.execute(
        select(StopActivity).where(
            StopActivity.stop_id == stop_id,
            StopActivity.activity_id == activity_id,
        )
    )
    sa = result.scalar_one_or_none()
    if not sa:
        raise HTTPException(status_code=404, detail="Activity not found in stop")

    await db.delete(sa)
