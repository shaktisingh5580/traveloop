"""
Note schemas.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime


class NoteCreate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    content: str = Field(..., min_length=1)
    stop_id: Optional[str] = None
    note_date: Optional[date] = None


class NoteUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    content: Optional[str] = Field(None, min_length=1)
    note_date: Optional[date] = None


class NoteResponse(BaseModel):
    id: str
    trip_id: str
    stop_id: Optional[str] = None
    title: Optional[str] = None
    content: str
    note_date: Optional[date] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
