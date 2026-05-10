"""
Trip expense endpoints — budget tracking and cost breakdown.
Owner: Shakti & Kunal
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id

router = APIRouter()


@router.get("/")
async def list_expenses(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """List all expenses for a trip."""
    # TODO: Implement
    pass


@router.get("/breakdown")
async def get_budget_breakdown(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Get cost breakdown by category (for pie/bar charts)."""
    # TODO: Implement — group by category, compute totals, avg per day
    pass


@router.post("/", status_code=201)
async def add_expense(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Add an expense item to the trip."""
    # TODO: Implement
    pass


@router.put("/{expense_id}")
async def update_expense(trip_id: str, expense_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Update an expense item."""
    # TODO: Implement
    pass


@router.delete("/{expense_id}", status_code=204)
async def delete_expense(trip_id: str, expense_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Remove an expense item."""
    # TODO: Implement
    pass
