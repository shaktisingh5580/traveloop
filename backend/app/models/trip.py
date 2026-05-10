"""
Trip, TripStop, StopActivity models.
"""

import uuid
from datetime import datetime, timezone, date

from sqlalchemy import String, Boolean, Integer, Date, Time, Numeric, ForeignKey, DateTime, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


class Trip(Base):
    __tablename__ = "trips"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date] = mapped_column(Date, nullable=False)
    cover_image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="draft", index=True)
    is_public: Mapped[bool] = mapped_column(Boolean, default=False)
    share_slug: Mapped[str | None] = mapped_column(String(100), unique=True, nullable=True)
    total_budget: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    currency_code: Mapped[str] = mapped_column(String(3), default="USD")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        CheckConstraint("end_date >= start_date", name="chk_trip_dates"),
    )

    # Relationships
    user = relationship("User", back_populates="trips")
    stops = relationship("TripStop", back_populates="trip", cascade="all, delete-orphan", order_by="TripStop.sort_order")
    expenses = relationship("TripExpense", back_populates="trip", cascade="all, delete-orphan")
    packing_items = relationship("PackingItem", back_populates="trip", cascade="all, delete-orphan")
    notes = relationship("TripNote", back_populates="trip", cascade="all, delete-orphan")
    shares = relationship("TripShare", back_populates="trip", cascade="all, delete-orphan")


class TripStop(Base):
    __tablename__ = "trip_stops"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    trip_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, index=True)
    city_id: Mapped[int] = mapped_column(Integer, ForeignKey("cities.id", ondelete="RESTRICT"), nullable=False, index=True)
    arrival_date: Mapped[date] = mapped_column(Date, nullable=False)
    departure_date: Mapped[date] = mapped_column(Date, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    transport_mode: Mapped[str | None] = mapped_column(String(50), nullable=True)
    transport_cost: Mapped[float] = mapped_column(Numeric(10, 2), default=0)
    accommodation: Mapped[str | None] = mapped_column(String(255), nullable=True)
    accommodation_cost: Mapped[float] = mapped_column(Numeric(10, 2), default=0)
    notes: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        CheckConstraint("departure_date >= arrival_date", name="chk_stop_dates"),
    )

    # Relationships
    trip = relationship("Trip", back_populates="stops")
    city = relationship("City")
    activities = relationship("StopActivity", back_populates="stop", cascade="all, delete-orphan", order_by="StopActivity.sort_order")


class StopActivity(Base):
    __tablename__ = "stop_activities"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    stop_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("trip_stops.id", ondelete="CASCADE"), nullable=False, index=True)
    activity_id: Mapped[int] = mapped_column(Integer, ForeignKey("activities.id", ondelete="RESTRICT"), nullable=False)
    scheduled_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    start_time: Mapped[str | None] = mapped_column(Time, nullable=True)
    end_time: Mapped[str | None] = mapped_column(Time, nullable=True)
    custom_cost: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    notes: Mapped[str | None] = mapped_column(String, nullable=True)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        UniqueConstraint("stop_id", "activity_id", name="uq_stop_activity"),
    )

    # Relationships
    stop = relationship("TripStop", back_populates="activities")
    activity = relationship("Activity")
