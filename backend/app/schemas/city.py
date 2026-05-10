"""
City & Activity schemas.
"""

from pydantic import BaseModel
from typing import Optional


class CityResponse(BaseModel):
    id: int
    name: str
    country_name: str = ""
    country_code: str = ""
    region_name: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    cost_index: Optional[int] = None
    popularity: int = 0
    description: Optional[str] = None
    image_url: Optional[str] = None
    best_season: Optional[str] = None

    class Config:
        from_attributes = True


class ActivityResponse(BaseModel):
    id: int
    city_id: int
    name: str
    description: Optional[str] = None
    activity_type: str
    duration_hours: Optional[float] = None
    estimated_cost: float = 0
    image_url: Optional[str] = None
    rating: Optional[float] = None
    address: Optional[str] = None

    class Config:
        from_attributes = True
