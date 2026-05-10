"""
Region, Country, City models.
"""

from datetime import datetime, timezone

from sqlalchemy import String, Integer, SmallInteger, Numeric, ForeignKey, DateTime, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Region(Base):
    __tablename__ = "regions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)

    # Relationships
    countries = relationship("Country", back_populates="region")


class Country(Base):
    __tablename__ = "countries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    code: Mapped[str] = mapped_column(String(2), unique=True, nullable=False, index=True)
    region_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("regions.id", ondelete="SET NULL"), nullable=True, index=True)
    currency_code: Mapped[str | None] = mapped_column(String(3), nullable=True)
    currency_symbol: Mapped[str | None] = mapped_column(String(5), nullable=True)

    # Relationships
    region = relationship("Region", back_populates="countries")
    cities = relationship("City", back_populates="country")


class City(Base):
    __tablename__ = "cities"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    country_id: Mapped[int] = mapped_column(Integer, ForeignKey("countries.id", ondelete="CASCADE"), nullable=False, index=True)
    latitude: Mapped[float | None] = mapped_column(Numeric(10, 7), nullable=True)
    longitude: Mapped[float | None] = mapped_column(Numeric(10, 7), nullable=True)
    cost_index: Mapped[int | None] = mapped_column(SmallInteger, nullable=True)
    popularity: Mapped[int] = mapped_column(Integer, default=0, index=True)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    timezone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    best_season: Mapped[str | None] = mapped_column(String(100), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        CheckConstraint("cost_index BETWEEN 1 AND 5", name="chk_city_cost_index"),
    )

    # Relationships
    country = relationship("Country", back_populates="cities")
    activities = relationship("Activity", back_populates="city")
