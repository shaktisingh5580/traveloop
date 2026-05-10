"""
Dashboard Router — groups endpoints for the traveloop admin dashboard.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import auth, admin, users, cities, trips

router = APIRouter()

# Admin Authentication
router.include_router(auth.router, prefix="/auth", tags=["Dashboard Authentication"])

# Administration Management
router.include_router(admin.router, prefix="/admin", tags=["Dashboard Administration"])

# Overview & Data Management (Read/Write access for admins)
router.include_router(users.router, prefix="/users", tags=["Dashboard User Management"])
router.include_router(cities.router, prefix="/cities", tags=["Dashboard Content Management"])
router.include_router(trips.router, prefix="/trips", tags=["Dashboard Trip Overview"])
