"""
Trip sharing endpoints — public links, friend sharing, copy trip.
Owner: Shakti & Kunal
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id

router = APIRouter()


@router.post("/publish")
async def make_public(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Make a trip public and generate share slug."""
    # TODO: Implement — set is_public=True, auto-generate share_slug via trigger
    pass


@router.post("/unpublish")
async def make_private(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Make a trip private again."""
    # TODO: Implement
    pass


@router.get("/public/{share_slug}")
async def get_public_trip(share_slug: str, db: AsyncSession = Depends(get_db)):
    """View a public trip (no auth required)."""
    # TODO: Implement — lookup by share_slug, return read-only itinerary
    pass


@router.post("/invite")
async def share_with_user(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Share trip with a specific user (by email)."""
    # TODO: Implement — create trip_shares record
    pass


@router.delete("/invite/{share_id}", status_code=204)
async def revoke_share(trip_id: str, share_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Revoke a user's access to the trip."""
    # TODO: Implement
    pass
