"""
WebP image converter — converts uploaded images to WebP format.
Reduces file size ~30% vs JPEG while preserving quality.
"""

from PIL import Image
from pathlib import Path
import io
import uuid

from app.core.config import settings


def validate_image(file_bytes: bytes, filename: str) -> bool:
    """
    Validate uploaded image file.
    Returns True if valid, raises ValueError otherwise.
    """
    # Check file extension
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    if ext not in settings.ALLOWED_EXTENSIONS:
        raise ValueError(f"File type '.{ext}' not allowed. Use: {settings.ALLOWED_EXTENSIONS}")

    # Check file size
    size_mb = len(file_bytes) / (1024 * 1024)
    if size_mb > settings.MAX_UPLOAD_SIZE_MB:
        raise ValueError(f"File too large ({size_mb:.1f}MB). Max: {settings.MAX_UPLOAD_SIZE_MB}MB")

    # Verify it's actually an image
    try:
        img = Image.open(io.BytesIO(file_bytes))
        img.verify()
    except Exception:
        raise ValueError("Invalid image file")

    return True


def convert_to_webp(file_bytes: bytes, quality: int = 85) -> tuple[str, bytes]:
    """
    Convert image bytes to WebP format.
    Returns (filename, webp_bytes).
    """
    img = Image.open(io.BytesIO(file_bytes))

    # Convert RGBA to RGB if needed (WebP supports both, but smaller in RGB)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")

    # Save as WebP
    output = io.BytesIO()
    img.save(output, format="WEBP", quality=quality, method=4)
    webp_bytes = output.getvalue()

    filename = f"{uuid.uuid4().hex}.webp"
    return filename, webp_bytes


def save_upload(file_bytes: bytes, original_filename: str, subfolder: str = "") -> str:
    """
    Validate, convert to WebP, and save to disk.
    Returns the relative URL path for the saved file.
    """
    validate_image(file_bytes, original_filename)

    filename, webp_bytes = convert_to_webp(file_bytes)

    save_dir = Path(settings.UPLOAD_DIR) / subfolder
    save_dir.mkdir(parents=True, exist_ok=True)

    filepath = save_dir / filename
    filepath.write_bytes(webp_bytes)

    return f"/uploads/{subfolder}/{filename}" if subfolder else f"/uploads/{filename}"
