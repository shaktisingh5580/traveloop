"""
Client Router — groups endpoints for the traveloop mobile/web frontend.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, trips, stops, activities, cities
from app.api.v1.endpoints import expenses, packing, notes, sharing

router = APIRouter()

# Authentication & Profile
router.include_router(auth.router, prefix="/auth", tags=["Client Authentication"])
router.include_router(users.router, prefix="/users", tags=["Client Profile"])

# Core Travel Features
router.include_router(trips.router, prefix="/trips", tags=["Client Trips"])
router.include_router(stops.router, prefix="/trips/{trip_id}/stops", tags=["Client Trip Stops"])
router.include_router(activities.router, prefix="/activities", tags=["Client Activities"])
router.include_router(cities.router, prefix="/cities", tags=["Client Cities"])

# Trip Utilities
router.include_router(expenses.router, prefix="/trips/{trip_id}/expenses", tags=["Client Expenses"])
router.include_router(packing.router, prefix="/trips/{trip_id}/packing", tags=["Client Packing"])
router.include_router(notes.router, prefix="/trips/{trip_id}/notes", tags=["Client Notes"])
router.include_router(sharing.router, prefix="/trips/{trip_id}/share", tags=["Client Sharing"])
