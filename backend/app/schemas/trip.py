"""
Trip schemas — request/response models for trip operations.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from enum import Enum


class TripStatus(str, Enum):
    draft = "draft"
    planned = "planned"
    ongoing = "ongoing"
    completed = "completed"
    cancelled = "cancelled"


class TripCreate(BaseModel):
    """Create a new trip."""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    start_date: date
    end_date: date
    total_budget: Optional[float] = Field(None, ge=0)
    currency_code: str = Field("USD", max_length=3)


class TripUpdate(BaseModel):
    """Update trip details."""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: Optional[TripStatus] = None
    total_budget: Optional[float] = Field(None, ge=0)


class TripResponse(BaseModel):
    """Trip data returned to client."""
    id: str
    name: str
    description: Optional[str]
    start_date: date
    end_date: date
    total_days: int
    status: TripStatus
    is_public: bool
    share_slug: Optional[str]
    total_budget: Optional[float]
    stop_count: int = 0
    activity_count: int = 0
    total_estimated_cost: float = 0

    class Config:
        from_attributes = True
