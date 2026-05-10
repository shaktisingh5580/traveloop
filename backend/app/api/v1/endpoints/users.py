"""
User endpoints — profile CRUD, saved destinations.
Owner: Shakti & Kunal
"""

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.user import User
from app.models.sharing import SavedDestination
from app.models.geography import City, Country
from app.schemas.user import UserResponse, UserUpdate
from app.utils.image import save_upload

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_profile(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Get current user profile."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": str(user.id),
        "email": user.email,
        "full_name": user.full_name,
        "avatar_url": user.avatar_url,
        "phone": user.phone,
        "language_pref": user.language_pref,
        "role": user.role,
        "created_at": user.created_at.isoformat(),
    }
async def update_profile(
    data: UserUpdate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Update user profile (name, phone, language)."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)

    return {
        "id": str(user.id),
        "email": user.email,
        "full_name": user.full_name,
        "avatar_url": user.avatar_url,
        "phone": user.phone,
        "language_pref": user.language_pref,
        "role": user.role,
        "created_at": user.created_at.isoformat(),
    }
async def upload_avatar(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Upload user avatar — auto-converts to WebP."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    file_bytes = await file.read()
    try:
        url = save_upload(file_bytes, file.filename or "avatar.jpg", subfolder="avatars")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    user.avatar_url = url
    return {
        "id": str(user.id),
        "email": user.email,
        "full_name": user.full_name,
        "avatar_url": user.avatar_url,
        "phone": user.phone,
        "language_pref": user.language_pref,
        "role": user.role,
        "created_at": user.created_at.isoformat(),
    }


@router.get("/me/saved-destinations")
async def get_saved_destinations(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """List user's saved/wishlisted cities."""
    result = await db.execute(
        select(SavedDestination, City, Country)
        .join(City, SavedDestination.city_id == City.id)
        .join(Country, City.country_id == Country.id)
        .where(SavedDestination.user_id == user_id)
        .order_by(SavedDestination.created_at.desc())
    )
    rows = result.all()
    return [
        {
            "city_id": sd.city_id,
            "city_name": city.name,
            "country_name": country.name,
            "cost_index": city.cost_index,
            "image_url": city.image_url,
            "saved_at": sd.created_at.isoformat(),
        }
        for sd, city, country in rows
    ]


@router.post("/me/saved-destinations/{city_id}", status_code=201)
async def save_destination(
    city_id: int,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Save a city to user's wishlist."""
    # Verify city exists
    city = await db.execute(select(City).where(City.id == city_id))
    if not city.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="City not found")

    # Check duplicate
    existing = await db.execute(
        select(SavedDestination).where(
            SavedDestination.user_id == user_id,
            SavedDestination.city_id == city_id,
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="City already saved")

    saved = SavedDestination(user_id=user_id, city_id=city_id)
    db.add(saved)
    return {"message": "City saved", "city_id": city_id}


@router.delete("/me/saved-destinations/{city_id}", status_code=204)
async def remove_saved_destination(
    city_id: int,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Remove a city from user's wishlist."""
    await db.execute(
        delete(SavedDestination).where(
            SavedDestination.user_id == user_id,
            SavedDestination.city_id == city_id,
        )
    )
