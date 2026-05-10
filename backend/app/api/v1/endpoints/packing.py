"""Packing checklist endpoints. Owner: Aman & Pratham"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.trip import Trip
from app.models.packing import PackingItem
from app.schemas.packing import PackingItemCreate, PACKING_CATEGORIES

router = APIRouter()

async def _verify(trip_id, user_id, db):
    r = await db.execute(select(Trip).where(Trip.id == trip_id, Trip.user_id == user_id))
    if not r.scalar_one_or_none(): raise HTTPException(404, "Trip not found")

@router.get("/")
async def list_packing_items(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify(trip_id, user_id, db)
    result = await db.execute(select(PackingItem).where(PackingItem.trip_id == trip_id).order_by(PackingItem.category, PackingItem.name))
    items = result.scalars().all()
    # Group by category
    grouped = {}
    for item in items:
        grouped.setdefault(item.category, []).append({"id": str(item.id), "name": item.name, "quantity": item.quantity, "is_packed": item.is_packed, "is_essential": item.is_essential})
    return {"items": grouped, "total": len(items), "packed": sum(1 for i in items if i.is_packed)}

@router.post("/", status_code=201)
async def add_packing_item(trip_id: str, data: PackingItemCreate, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify(trip_id, user_id, db)
    if data.category not in PACKING_CATEGORIES:
        raise HTTPException(400, f"Invalid category. Use: {PACKING_CATEGORIES}")
    item = PackingItem(trip_id=trip_id, category=data.category, name=data.name, quantity=data.quantity, is_essential=data.is_essential)
    db.add(item)
    await db.flush()
    return {"id": str(item.id), "message": "Item added"}

@router.put("/{item_id}/toggle")
async def toggle_packed(trip_id: str, item_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify(trip_id, user_id, db)
    result = await db.execute(select(PackingItem).where(PackingItem.id == item_id, PackingItem.trip_id == trip_id))
    item = result.scalar_one_or_none()
    if not item: raise HTTPException(404, "Item not found")
    item.is_packed = not item.is_packed
    return {"is_packed": item.is_packed}

@router.delete("/{item_id}", status_code=204)
async def remove_packing_item(trip_id: str, item_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify(trip_id, user_id, db)
    result = await db.execute(select(PackingItem).where(PackingItem.id == item_id, PackingItem.trip_id == trip_id))
    item = result.scalar_one_or_none()
    if not item: raise HTTPException(404, "Item not found")
    await db.delete(item)

@router.post("/reset", status_code=204)
async def reset_checklist(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify(trip_id, user_id, db)
    await db.execute(update(PackingItem).where(PackingItem.trip_id == trip_id).values(is_packed=False))
