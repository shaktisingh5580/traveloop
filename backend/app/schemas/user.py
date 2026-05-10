"""
User schemas — profile request/response.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserResponse(BaseModel):
    """User profile data returned to client."""
    id: str
    email: str
    full_name: str
    avatar_url: Optional[str] = None
    phone: Optional[str] = None
    language_pref: str = "en"
    role: str = "user"
    created_at: datetime

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    """Update user profile."""
    full_name: Optional[str] = Field(None, min_length=2, max_length=150)
    phone: Optional[str] = Field(None, max_length=20)
    language_pref: Optional[str] = Field(None, max_length=10)
