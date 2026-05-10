"""
Packing checklist endpoints — manage packing items per trip.
Owner: Aman & Pratham (frontend integration)
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id

router = APIRouter()


@router.get("/")
async def list_packing_items(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """List all packing items grouped by category."""
    # TODO: Implement
    pass


@router.post("/", status_code=201)
async def add_packing_item(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Add an item to the packing checklist."""
    # TODO: Implement
    pass


@router.put("/{item_id}/toggle")
async def toggle_packed(trip_id: str, item_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Toggle packed/unpacked status."""
    # TODO: Implement
    pass


@router.delete("/{item_id}", status_code=204)
async def remove_packing_item(trip_id: str, item_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Remove item from checklist."""
    # TODO: Implement
    pass


@router.post("/reset", status_code=204)
async def reset_checklist(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Reset all items to unpacked (for trip re-use)."""
    # TODO: Implement
    pass
