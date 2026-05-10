"""
Packing schemas.
"""

from pydantic import BaseModel, Field
from typing import Optional


PACKING_CATEGORIES = ["clothing", "documents", "electronics", "toiletries", "medicine", "accessories", "miscellaneous"]


class PackingItemCreate(BaseModel):
    category: str
    name: str = Field(..., min_length=1, max_length=255)
    quantity: int = Field(1, gt=0)
    is_essential: bool = False


class PackingItemResponse(BaseModel):
    id: str
    trip_id: str
    category: str
    name: str
    quantity: int
    is_packed: bool
    is_essential: bool

    class Config:
        from_attributes = True
