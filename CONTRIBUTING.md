# 🤝 Contributing — Team Work Division

## Team Members & Responsibilities

### 🔵 Shakti Singh — Full Stack Lead
**Role:** Database + Backend + Frontend
- **Backend:** Core API architecture, auth system, trip CRUD, expenses, sharing, admin
- **Database:** Schema design, migrations, seed data, indexing
- **Frontend:** Itinerary Builder, Itinerary View, Budget Breakdown, Shared Trip, Admin Dashboard
- **DevOps:** Env setup, project scaffolding, CI/CD

### 🟢 Kunal Malviya — Backend + Frontend
**Role:** Backend API + Frontend Integration
- **Backend:** Trip stops, stop activities, notes, expenses, activity search
- **Frontend:** Itinerary Builder, Itinerary View, Budget Breakdown, Shared Trip, Trip Notes

### 🟡 Aman Yadav — Database + Frontend
**Role:** Database + Frontend Screens
- **Database:** Seed data, data validation, query optimization
- **Frontend:** Create Trip, My Trips, City Search, Activity Search, Packing Checklist, Profile

### 🟣 Pratham — Frontend Specialist
**Role:** Frontend Design & UI/UX
- **Frontend:** Landing Page, Login/Signup, Dashboard, Sidebar, Topbar, 404 Page
- **Design:** CSS design system, responsive layout, animations, color scheme
- **UI/UX:** All component styling, hover effects, micro-animations

---

## Screen Ownership Matrix

| Screen | Pratham | Aman | Kunal | Shakti |
|--------|---------|------|-------|--------|
| 1. Landing Page | ⭐ Lead | | | |
| 1a. Login | ⭐ Lead | | | Support |
| 1b. Signup | ⭐ Lead | | | Support |
| 2. Dashboard | ⭐ Lead | Support | | |
| 3. Create Trip | | ⭐ Lead | | Support |
| 4. My Trips | Support | ⭐ Lead | | |
| 5. Itinerary Builder | | | Support | ⭐ Lead |
| 6. Itinerary View | | | ⭐ Lead | Support |
| 7. City Search | Support | ⭐ Lead | | |
| 8. Activity Search | | Support | ⭐ Lead | |
| 9. Budget Breakdown | | | Support | ⭐ Lead |
| 10. Packing Checklist | Support | ⭐ Lead | | |
| 11. Shared Trip | | | Support | ⭐ Lead |
| 12. Profile/Settings | Support | ⭐ Lead | | |
| 13. Trip Notes | | Support | ⭐ Lead | |
| 14. Admin Dashboard | | | | ⭐ Lead |

---

## Git Workflow

### Branch Naming
```
feature/<your-name>/<screen-name>
bugfix/<your-name>/<description>
```

**Examples:**
- `feature/pratham/landing-page`
- `feature/shakti/auth-api`
- `feature/kunal/itinerary-builder`
- `feature/aman/city-search`

### Commit Messages
Use conventional commits:
```
feat: add login form validation
fix: correct budget calculation rounding
style: update card hover animation
docs: add API endpoint documentation
```

### Pull Request Flow
1. Create branch from `main`
2. Make your changes
3. Push and create PR
4. Get at least 1 review
5. Merge to `main`

---

## Getting Started

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
cp .env.example .env           # Edit with your DB credentials
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd traveloop-frontend
npm install
cp .env.example .env.local
npm run dev
```

### Database Setup
```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE traveloop;"
psql -U postgres -d traveloop -f ../database/schema.sql
psql -U postgres -d traveloop -f ../database/seed.sql
```
