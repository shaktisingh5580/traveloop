# 🌍 Traveloop — Personalized Travel Planning Made Easy

> Plan multi-city trips, manage budgets, build itineraries, and share your adventures.

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Next.js 16 + TypeScript + Tailwind v4 | SSR, App Router, file-based routing |
| **Backend** | FastAPI (Python) | Async I/O, auto-docs, Pydantic validation |
| **Database** | PostgreSQL | Relational integrity, GIN indexes, B-tree |
| **Auth** | JWT + bcrypt | Stateless, secure, refresh token support |
| **Optimization** | Gzip + WebP | Low-bandwidth performance |

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+

### 1. Clone & Setup
```bash
git clone <repo-url>
cd traveloop
```

### 2. Database
```bash
psql -U postgres -c "CREATE DATABASE traveloop;"
psql -U postgres -d traveloop -f database/schema.sql
psql -U postgres -d traveloop -f database/seed.sql
```

### 3. Backend
```bash
cd backend
python -m venv venv && venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env    # Edit DB credentials
uvicorn main:app --reload --port 8000
```
API docs at: `http://localhost:8000/api/docs`

### 4. Frontend
```bash
cd traveloop-frontend
npm install
cp .env.example .env.local
npm run dev
```
App at: `http://localhost:3000`

## Project Structure

```
traveloop/
├── backend/                            # FastAPI server
│   ├── main.py                         # Entry point + middleware
│   ├── requirements.txt
│   ├── .env.example
│   └── app/
│       ├── core/                       # Config, DB, auth
│       ├── api/v1/endpoints/           # Route handlers
│       ├── models/                     # SQLAlchemy ORM models
│       ├── schemas/                    # Pydantic validation
│       ├── services/                   # Business logic
│       └── utils/                      # Helpers (image, etc.)
├── traveloop-frontend/                 # Next.js 16 + TypeScript
│   ├── app/                            # App Router pages
│   │   ├── page.tsx                    # Landing page
│   │   ├── login/page.tsx              # Login
│   │   ├── signup/page.tsx             # Signup
│   │   ├── trip/[slug]/page.tsx        # Public shared trip
│   │   └── dashboard/                  # Protected routes
│   │       ├── layout.tsx              # Sidebar + Topbar
│   │       ├── page.tsx                # Dashboard home
│   │       ├── trips/                  # Trip CRUD + sub-pages
│   │       ├── cities/                 # City search
│   │       ├── activities/             # Activity search
│   │       ├── profile/                # User settings
│   │       └── admin/                  # Admin dashboard
│   ├── components/                     # Reusable UI components
│   ├── lib/                            # API client + types
│   └── .env.example
├── database/                           # SQL files
│   ├── schema.sql                      # Full DDL
│   └── seed.sql                        # Sample data
├── CONTRIBUTING.md                     # Team roles & git workflow
└── README.md
```

## Team
- **Shakti Singh** — Full Stack Lead (DB + Backend + Frontend)
- **Kunal Malviya** — Backend + Frontend
- **Aman Yadav** — Database + Frontend
- **Pratham** — Frontend & UI/UX Design

## License
See [LICENSE](./LICENSE)
