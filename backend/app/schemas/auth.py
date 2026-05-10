"""
Auth schemas — request/response models for authentication endpoints.
"""

from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    """User registration request."""
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128, description="Min 8 characters")
    full_name: str = Field(..., min_length=2, max_length=150)


class LoginRequest(BaseModel):
    """User login request."""
    email: str
    password: str = Field(..., min_length=1)


class TokenResponse(BaseModel):
    """JWT token pair response."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class ForgotPasswordRequest(BaseModel):
    """Forgot password request."""
    email: EmailStr
