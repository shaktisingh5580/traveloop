"""
API v1 Router — aggregates all endpoint routers.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, trips, stops, activities, cities
from app.api.v1.endpoints import expenses, packing, notes, sharing, admin

api_router = APIRouter()

# Auth & Users
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])

# Trips & Itinerary
api_router.include_router(trips.router, prefix="/trips", tags=["Trips"])
api_router.include_router(stops.router, prefix="/trips/{trip_id}/stops", tags=["Trip Stops"])
api_router.include_router(activities.router, prefix="/activities", tags=["Activities"])
api_router.include_router(cities.router, prefix="/cities", tags=["Cities"])

# Trip Features
api_router.include_router(expenses.router, prefix="/trips/{trip_id}/expenses", tags=["Expenses"])
api_router.include_router(packing.router, prefix="/trips/{trip_id}/packing", tags=["Packing"])
api_router.include_router(notes.router, prefix="/trips/{trip_id}/notes", tags=["Notes"])
api_router.include_router(sharing.router, prefix="/trips/{trip_id}/share", tags=["Sharing"])

# Admin
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
