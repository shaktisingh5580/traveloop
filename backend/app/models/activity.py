"""
Activity model — things to do in each city.
"""

from datetime import datetime, timezone

from sqlalchemy import String, Integer, Numeric, Boolean, ForeignKey, DateTime, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Activity(Base):
    __tablename__ = "activities"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    city_id: Mapped[int] = mapped_column(Integer, ForeignKey("cities.id", ondelete="CASCADE"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    activity_type: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    duration_hours: Mapped[float | None] = mapped_column(Numeric(4, 1), nullable=True)
    estimated_cost: Mapped[float] = mapped_column(Numeric(10, 2), default=0)
    image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    rating: Mapped[float | None] = mapped_column(Numeric(2, 1), nullable=True)
    address: Mapped[str | None] = mapped_column(String, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        CheckConstraint("rating BETWEEN 0 AND 5", name="chk_activity_rating"),
    )

    # Relationships
    city = relationship("City", back_populates="activities")
