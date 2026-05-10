"""
PackingItem model — per-trip packing checklist.
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Integer, Boolean, ForeignKey, DateTime, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


class PackingItem(Base):
    __tablename__ = "packing_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    trip_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, index=True)
    category: Mapped[str] = mapped_column(String(20), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    is_packed: Mapped[bool] = mapped_column(Boolean, default=False)
    is_essential: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        CheckConstraint("quantity > 0", name="chk_packing_quantity"),
    )

    # Relationships
    trip = relationship("Trip", back_populates="packing_items")
