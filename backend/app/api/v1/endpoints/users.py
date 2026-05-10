"""
User endpoints — profile, settings, saved destinations.
Owner: Shakti & Kunal
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id

router = APIRouter()


@router.get("/me")
async def get_profile(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Get current user profile."""
    # TODO: Implement
    pass


@router.put("/me")
async def update_profile(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Update user profile (name, avatar, language)."""
    # TODO: Implement
    pass


@router.get("/me/saved-destinations")
async def get_saved_destinations(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """List user's saved/wishlisted cities."""
    # TODO: Implement
    pass


@router.post("/me/saved-destinations/{city_id}")
async def save_destination(city_id: int, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Save a city to user's wishlist."""
    # TODO: Implement
    pass


@router.delete("/me/saved-destinations/{city_id}")
async def remove_saved_destination(city_id: int, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Remove a city from user's wishlist."""
    # TODO: Implement
    pass
