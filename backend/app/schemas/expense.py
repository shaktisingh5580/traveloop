"""
Expense schemas.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


EXPENSE_CATEGORIES = ["transport", "accommodation", "food", "activities", "shopping", "miscellaneous"]


class ExpenseCreate(BaseModel):
    category: str
    description: str = Field(..., min_length=1, max_length=255)
    amount: float = Field(..., ge=0)
    currency_code: str = Field("USD", max_length=3)
    expense_date: Optional[date] = None
    stop_id: Optional[str] = None
    is_estimated: bool = True


class ExpenseUpdate(BaseModel):
    category: Optional[str] = None
    description: Optional[str] = Field(None, min_length=1, max_length=255)
    amount: Optional[float] = Field(None, ge=0)
    expense_date: Optional[date] = None
    is_estimated: Optional[bool] = None


class ExpenseResponse(BaseModel):
    id: str
    trip_id: str
    stop_id: Optional[str] = None
    category: str
    description: str
    amount: float
    currency_code: str
    expense_date: Optional[date] = None
    is_estimated: bool

    class Config:
        from_attributes = True


class BudgetBreakdownResponse(BaseModel):
    category: str
    item_count: int
    category_total: float
    avg_per_item: float
