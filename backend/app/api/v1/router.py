"""
API v1 Router — aggregates all endpoint routers.
"""

from fastapi import APIRouter

from app.api.v1.routers import client, dashboard
from app.api.v1.endpoints import auth, users, trips, admin

api_router = APIRouter()

# --- Client Application Endpoints ---
# These routes are specifically for the traveloop mobile/web frontend
api_router.include_router(client.router, prefix="/client")

# --- Admin Dashboard Endpoints ---
# These routes are specifically for the traveloop admin/business dashboard
api_router.include_router(dashboard.router, prefix="/dashboard")

# --- Legacy/Direct Endpoints (Keeping for compatibility) ---
# Note: It's recommended to migrate to /client or /dashboard prefixes
api_router.include_router(auth.router, prefix="/auth", tags=["Legacy Auth"])
api_router.include_router(users.router, prefix="/users", tags=["Legacy Users"])
api_router.include_router(trips.router, prefix="/trips", tags=["Legacy Trips"])
api_router.include_router(admin.router, prefix="/admin", tags=["Legacy Admin"])
