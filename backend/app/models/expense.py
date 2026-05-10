"""
TripExpense model — budget tracking per trip.
"""

import uuid
from datetime import datetime, timezone, date

from sqlalchemy import String, Numeric, Boolean, Date, ForeignKey, DateTime, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


class TripExpense(Base):
    __tablename__ = "trip_expenses"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    trip_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, index=True)
    stop_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("trip_stops.id", ondelete="SET NULL"), nullable=True)
    category: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    amount: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    currency_code: Mapped[str] = mapped_column(String(3), default="USD")
    expense_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    is_estimated: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        CheckConstraint("amount >= 0", name="chk_expense_amount"),
    )

    # Relationships
    trip = relationship("Trip", back_populates="expenses")
