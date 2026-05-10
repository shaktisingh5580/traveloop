"""
Trip expense endpoints — budget tracking and cost breakdown.
Owner: Shakti & Kunal
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.trip import Trip
from app.models.expense import TripExpense
from app.schemas.expense import ExpenseCreate, ExpenseUpdate, EXPENSE_CATEGORIES

router = APIRouter()


async def _verify_trip(trip_id: str, user_id: str, db: AsyncSession):
    result = await db.execute(select(Trip).where(Trip.id == trip_id, Trip.user_id == user_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Trip not found")


@router.get("/")
async def list_expenses(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify_trip(trip_id, user_id, db)
    result = await db.execute(
        select(TripExpense).where(TripExpense.trip_id == trip_id).order_by(TripExpense.expense_date.desc().nullslast())
    )
    return [{"id": str(e.id), "category": e.category, "description": e.description, "amount": float(e.amount), "currency_code": e.currency_code, "expense_date": str(e.expense_date) if e.expense_date else None, "stop_id": str(e.stop_id) if e.stop_id else None, "is_estimated": e.is_estimated} for e in result.scalars().all()]


@router.get("/breakdown")
async def get_budget_breakdown(trip_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify_trip(trip_id, user_id, db)
    result = await db.execute(
        select(TripExpense.category, func.count(TripExpense.id).label("cnt"), func.sum(TripExpense.amount).label("total"), func.round(func.avg(TripExpense.amount), 2).label("avg"))
        .where(TripExpense.trip_id == trip_id).group_by(TripExpense.category)
    )
    rows = result.all()
    trip = (await db.execute(select(Trip).where(Trip.id == trip_id))).scalar_one()
    total_spent = sum(float(r.total or 0) for r in rows)
    budget = float(trip.total_budget) if trip.total_budget else None
    days = (trip.end_date - trip.start_date).days + 1
    return {
        "breakdown": [{"category": r.category, "item_count": r.cnt, "category_total": float(r.total or 0), "avg_per_item": float(r.avg or 0)} for r in rows],
        "total_spent": total_spent, "total_budget": budget,
        "remaining": (budget - total_spent) if budget else None,
        "avg_per_day": round(total_spent / days, 2) if days > 0 else 0,
        "over_budget": total_spent > budget if budget else False,
    }


@router.post("/", status_code=201)
async def add_expense(trip_id: str, data: ExpenseCreate, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify_trip(trip_id, user_id, db)
    if data.category not in EXPENSE_CATEGORIES:
        raise HTTPException(status_code=400, detail=f"Invalid category. Use: {EXPENSE_CATEGORIES}")
    expense = TripExpense(trip_id=trip_id, stop_id=data.stop_id, category=data.category, description=data.description, amount=data.amount, currency_code=data.currency_code, expense_date=data.expense_date, is_estimated=data.is_estimated)
    db.add(expense)
    await db.flush()
    return {"id": str(expense.id), "message": "Expense added"}


@router.put("/{expense_id}")
async def update_expense(trip_id: str, expense_id: str, data: ExpenseUpdate, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify_trip(trip_id, user_id, db)
    result = await db.execute(select(TripExpense).where(TripExpense.id == expense_id, TripExpense.trip_id == trip_id))
    expense = result.scalar_one_or_none()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(expense, field, value)
    return {"message": "Expense updated"}


@router.delete("/{expense_id}", status_code=204)
async def delete_expense(trip_id: str, expense_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    await _verify_trip(trip_id, user_id, db)
    result = await db.execute(select(TripExpense).where(TripExpense.id == expense_id, TripExpense.trip_id == trip_id))
    expense = result.scalar_one_or_none()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    await db.delete(expense)
