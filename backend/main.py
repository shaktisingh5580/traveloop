"""
Traveloop - Backend Application Entry Point
FastAPI async server with Gzip compression and CORS middleware.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup: Create upload directory
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    yield
    # Shutdown: Close DB connections
    await engine.dispose()


app = FastAPI(
    title=settings.APP_NAME,
    description="Personalized Travel Planning Made Easy",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan,
)

# --- Middleware ---
app.add_middleware(GZipMiddleware, minimum_size=settings.GZIP_MINIMUM_SIZE)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Static files (user uploads) ---
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# --- API Routes ---
app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "app": settings.APP_NAME}
