"""
SQLAlchemy ORM Models — maps to PostgreSQL schema.
Import all models here so Alembic and Base.metadata can discover them.
"""

from app.models.user import User, UserSession, PasswordReset
from app.models.geography import Region, Country, City
from app.models.trip import Trip, TripStop, StopActivity
from app.models.activity import Activity
from app.models.expense import TripExpense
from app.models.packing import PackingItem
from app.models.note import TripNote
from app.models.sharing import TripShare, TripCopy, SavedDestination
from app.models.analytics import AnalyticsEvent

__all__ = [
    "User", "UserSession", "PasswordReset",
    "Region", "Country", "City",
    "Trip", "TripStop", "StopActivity",
    "Activity",
    "TripExpense",
    "PackingItem",
    "TripNote",
    "TripShare", "TripCopy", "SavedDestination",
    "AnalyticsEvent",
]
