"""
Auth endpoints — login, signup, refresh token, forgot password.
Owner: Shakti & Kunal
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token
from app.schemas.auth import LoginRequest, SignupRequest, TokenResponse, ForgotPasswordRequest

router = APIRouter()


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(data: SignupRequest, db: AsyncSession = Depends(get_db)):
    """Register a new user account."""
    # TODO: Implement — check email uniqueness, hash password, insert user, return tokens
    pass


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Authenticate user and return JWT tokens."""
    # TODO: Implement — verify email/password, return access + refresh tokens
    pass


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(refresh_token: str, db: AsyncSession = Depends(get_db)):
    """Refresh an expired access token."""
    # TODO: Implement — validate refresh token, issue new access token
    pass


@router.post("/forgot-password", status_code=status.HTTP_204_NO_CONTENT)
async def forgot_password(data: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)):
    """Send password reset email."""
    # TODO: Implement — generate reset token, send email
    pass
