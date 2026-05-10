import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.core.config import settings

async def fix_database():
    engine = create_async_engine(settings.async_database_url)
    async with engine.begin() as conn:
        print("Adding 'phone' column to users table...")
        try:
            await conn.execute(text("ALTER TABLE users ADD COLUMN phone VARCHAR(20);"))
            print("Successfully added 'phone' column!")
        except Exception as e:
            print(f"Column might already exist or error occurred: {e}")

if __name__ == "__main__":
    asyncio.run(fix_database())
