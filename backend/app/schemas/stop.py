"""
Stop schemas — trip stop and stop activity request/response.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date


class StopCreate(BaseModel):
    city_id: int
    arrival_date: date
    departure_date: date
    transport_mode: Optional[str] = None
    transport_cost: float = Field(0, ge=0)
    accommodation: Optional[str] = None
    accommodation_cost: float = Field(0, ge=0)
    notes: Optional[str] = None


class StopUpdate(BaseModel):
    arrival_date: Optional[date] = None
    departure_date: Optional[date] = None
    transport_mode: Optional[str] = None
    transport_cost: Optional[float] = Field(None, ge=0)
    accommodation: Optional[str] = None
    accommodation_cost: Optional[float] = Field(None, ge=0)
    notes: Optional[str] = None


class StopActivityCreate(BaseModel):
    activity_id: int
    scheduled_date: Optional[date] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    custom_cost: Optional[float] = Field(None, ge=0)
    notes: Optional[str] = None


class StopReorder(BaseModel):
    """List of stop IDs in the desired order."""
    stop_ids: List[str]


class StopResponse(BaseModel):
    id: str
    trip_id: str
    city_id: int
    city_name: str = ""
    country_name: str = ""
    arrival_date: date
    departure_date: date
    sort_order: int
    transport_mode: Optional[str] = None
    transport_cost: float = 0
    accommodation: Optional[str] = None
    accommodation_cost: float = 0
    notes: Optional[str] = None

    class Config:
        from_attributes = True
