"""
Admin dashboard endpoints — analytics, user management, platform stats.
Owner: Shakti (admin-only, role-checked)
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id

router = APIRouter()


async def require_admin(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Dependency — ensures current user has admin role."""
    # TODO: Implement — query user, check role == 'admin'
    return user_id


@router.get("/stats")
async def get_platform_stats(admin_id: str = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    """Get platform-wide statistics (total users, trips, etc.)."""
    # TODO: Implement — query v_admin_stats view
    pass


@router.get("/top-cities")
async def get_top_cities(limit: int = 10, admin_id: str = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    """Get most visited cities across all users."""
    # TODO: Implement
    pass


@router.get("/users")
async def list_users(page: int = 1, limit: int = 20, admin_id: str = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    """List all users with engagement stats."""
    # TODO: Implement
    pass


@router.get("/recent-trips")
async def recent_trips(limit: int = 20, admin_id: str = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    """Get recently created trips across the platform."""
    # TODO: Implement
    pass
