-- ============================================================
-- TRAVELOOP - Complete PostgreSQL Database Schema
-- Version: 1.0.0
-- Description: Personalized Travel Planning Platform
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE trip_status AS ENUM ('draft', 'planned', 'ongoing', 'completed', 'cancelled');
CREATE TYPE share_permission AS ENUM ('view', 'edit');
CREATE TYPE expense_category AS ENUM ('transport', 'accommodation', 'food', 'activities', 'shopping', 'miscellaneous');
CREATE TYPE packing_category AS ENUM ('clothing', 'documents', 'electronics', 'toiletries', 'medicine', 'accessories', 'miscellaneous');
CREATE TYPE activity_type AS ENUM ('sightseeing', 'food_tour', 'adventure', 'culture', 'shopping', 'nightlife', 'relaxation', 'transport');

-- ============================================================
-- 1. USERS TABLE (Screen 1: Login/Signup, Screen 12: Profile)
-- ============================================================

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(150) NOT NULL,
    avatar_url      TEXT,
    phone           VARCHAR(20),
    language_pref   VARCHAR(10) DEFAULT 'en',
    role            user_role DEFAULT 'user',
    is_active       BOOLEAN DEFAULT TRUE,
    email_verified  BOOLEAN DEFAULT FALSE,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================================
-- 2. USER SESSIONS (Screen 1: Login/Signup - Auth)
-- ============================================================

CREATE TABLE user_sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR(255) NOT NULL,
    ip_address      INET,
    user_agent      TEXT,
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(token_hash);
CREATE INDEX idx_sessions_expiry ON user_sessions(expires_at);

-- ============================================================
-- 3. PASSWORD RESET TOKENS (Screen 1: Forgot Password)
-- ============================================================

CREATE TABLE password_resets (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR(255) NOT NULL,
    expires_at      TIMESTAMPTZ NOT NULL,
    used_at         TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pw_reset_user ON password_resets(user_id);

-- ============================================================
-- 4. COUNTRIES & REGIONS (Screen 7: City Search)
-- ============================================================

CREATE TABLE regions (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL UNIQUE,
    description     TEXT
);

CREATE TABLE countries (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    code            CHAR(2) UNIQUE NOT NULL,  -- ISO 3166-1 alpha-2
    region_id       INT REFERENCES regions(id) ON DELETE SET NULL,
    currency_code   CHAR(3),                  -- ISO 4217
    currency_symbol VARCHAR(5)
);

CREATE INDEX idx_countries_region ON countries(region_id);
CREATE INDEX idx_countries_code ON countries(code);

-- ============================================================
-- 5. CITIES (Screen 7: City Search)
-- ============================================================

CREATE TABLE cities (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    country_id      INT NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    latitude        DECIMAL(10, 7),
    longitude       DECIMAL(10, 7),
    cost_index      SMALLINT CHECK (cost_index BETWEEN 1 AND 5),  -- 1=cheap, 5=expensive
    popularity      INT DEFAULT 0,
    description     TEXT,
    image_url       TEXT,
    timezone        VARCHAR(50),
    best_season     VARCHAR(100),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cities_country ON cities(country_id);
CREATE INDEX idx_cities_popularity ON cities(popularity DESC);
CREATE INDEX idx_cities_cost ON cities(cost_index);
CREATE INDEX idx_cities_name ON cities(name);

-- ============================================================
-- 6. TRIPS (Screen 3: Create Trip, Screen 4: My Trips)
-- ============================================================

CREATE TABLE trips (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    start_date      DATE NOT NULL,
    end_date        DATE NOT NULL,
    cover_image_url TEXT,
    status          trip_status DEFAULT 'draft',
    is_public       BOOLEAN DEFAULT FALSE,
    share_slug      VARCHAR(100) UNIQUE,      -- for public URL
    total_budget    DECIMAL(12, 2),            -- user-set budget limit
    currency_code   CHAR(3) DEFAULT 'USD',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT chk_trip_dates CHECK (end_date >= start_date)
);

CREATE INDEX idx_trips_user ON trips(user_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_trips_dates ON trips(start_date, end_date);
CREATE INDEX idx_trips_public ON trips(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_trips_slug ON trips(share_slug) WHERE share_slug IS NOT NULL;

-- ============================================================
-- 7. TRIP STOPS (Screen 5: Itinerary Builder)
-- ============================================================

CREATE TABLE trip_stops (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id         UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    city_id         INT NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
    arrival_date    DATE NOT NULL,
    departure_date  DATE NOT NULL,
    sort_order      INT NOT NULL DEFAULT 0,
    transport_mode  VARCHAR(50),              -- flight, train, bus, car, etc.
    transport_cost  DECIMAL(10, 2) DEFAULT 0,
    accommodation   VARCHAR(255),
    accommodation_cost DECIMAL(10, 2) DEFAULT 0,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT chk_stop_dates CHECK (departure_date >= arrival_date)
);

CREATE INDEX idx_stops_trip ON trip_stops(trip_id);
CREATE INDEX idx_stops_city ON trip_stops(city_id);
CREATE INDEX idx_stops_order ON trip_stops(trip_id, sort_order);

-- ============================================================
-- 8. ACTIVITIES MASTER (Screen 8: Activity Search)
-- ============================================================

CREATE TABLE activities (
    id              SERIAL PRIMARY KEY,
    city_id         INT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    activity_type   activity_type NOT NULL,
    duration_hours  DECIMAL(4, 1),
    estimated_cost  DECIMAL(10, 2) DEFAULT 0,
    image_url       TEXT,
    rating          DECIMAL(2, 1) CHECK (rating BETWEEN 0 AND 5),
    address         TEXT,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activities_city ON activities(city_id);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_cost ON activities(estimated_cost);
CREATE INDEX idx_activities_rating ON activities(rating DESC);

-- ============================================================
-- 9. STOP ACTIVITIES (Screen 5 & 6: Itinerary Builder/View)
-- ============================================================

CREATE TABLE stop_activities (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stop_id         UUID NOT NULL REFERENCES trip_stops(id) ON DELETE CASCADE,
    activity_id     INT NOT NULL REFERENCES activities(id) ON DELETE RESTRICT,
    scheduled_date  DATE,
    start_time      TIME,
    end_time        TIME,
    custom_cost     DECIMAL(10, 2),           -- user override of estimated_cost
    notes           TEXT,
    is_completed    BOOLEAN DEFAULT FALSE,
    sort_order      INT DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(stop_id, activity_id)
);

CREATE INDEX idx_stop_act_stop ON stop_activities(stop_id);
CREATE INDEX idx_stop_act_date ON stop_activities(scheduled_date);

-- ============================================================
-- 10. TRIP EXPENSES (Screen 9: Budget & Cost Breakdown)
-- ============================================================

CREATE TABLE trip_expenses (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id         UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    stop_id         UUID REFERENCES trip_stops(id) ON DELETE SET NULL,
    category        expense_category NOT NULL,
    description     VARCHAR(255) NOT NULL,
    amount          DECIMAL(12, 2) NOT NULL CHECK (amount >= 0),
    currency_code   CHAR(3) DEFAULT 'USD',
    expense_date    DATE,
    is_estimated    BOOLEAN DEFAULT TRUE,     -- estimated vs actual
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_expenses_trip ON trip_expenses(trip_id);
CREATE INDEX idx_expenses_stop ON trip_expenses(stop_id);
CREATE INDEX idx_expenses_category ON trip_expenses(category);
CREATE INDEX idx_expenses_date ON trip_expenses(expense_date);

-- ============================================================
-- 11. PACKING ITEMS (Screen 10: Packing Checklist)
-- ============================================================

CREATE TABLE packing_items (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id         UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    category        packing_category NOT NULL,
    name            VARCHAR(255) NOT NULL,
    quantity        INT DEFAULT 1 CHECK (quantity > 0),
    is_packed       BOOLEAN DEFAULT FALSE,
    is_essential    BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_packing_trip ON packing_items(trip_id);
CREATE INDEX idx_packing_category ON packing_items(category);

-- ============================================================
-- 12. TRIP NOTES / JOURNAL (Screen 13: Trip Notes)
-- ============================================================

CREATE TABLE trip_notes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id         UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    stop_id         UUID REFERENCES trip_stops(id) ON DELETE SET NULL,
    title           VARCHAR(255),
    content         TEXT NOT NULL,
    note_date       DATE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notes_trip ON trip_notes(trip_id);
CREATE INDEX idx_notes_stop ON trip_notes(stop_id);
CREATE INDEX idx_notes_date ON trip_notes(note_date);

-- ============================================================
-- 13. TRIP SHARING (Screen 11: Shared/Public Itinerary)
-- ============================================================

CREATE TABLE trip_shares (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id         UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    shared_with_id  UUID REFERENCES users(id) ON DELETE CASCADE,  -- NULL = public link
    permission      share_permission DEFAULT 'view',
    share_token     VARCHAR(100),             -- for link-based sharing
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(trip_id, shared_with_id)
);

CREATE INDEX idx_shares_trip ON trip_shares(trip_id);
CREATE INDEX idx_shares_user ON trip_shares(shared_with_id);
CREATE INDEX idx_shares_token ON trip_shares(share_token);

-- ============================================================
-- 14. SAVED DESTINATIONS (Screen 12: Profile - Saved List)
-- ============================================================

CREATE TABLE saved_destinations (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    city_id         INT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id, city_id)
);

CREATE INDEX idx_saved_user ON saved_destinations(user_id);

-- ============================================================
-- 15. TRIP COPIES (Screen 11: "Copy Trip" tracking)
-- ============================================================

CREATE TABLE trip_copies (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_trip_id  UUID NOT NULL REFERENCES trips(id) ON DELETE SET NULL,
    copied_by       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    new_trip_id     UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_copies_source ON trip_copies(source_trip_id);

-- ============================================================
-- 16. PLATFORM ANALYTICS LOG (Screen 14: Admin Dashboard)
-- ============================================================

CREATE TABLE analytics_events (
    id              BIGSERIAL PRIMARY KEY,
    user_id         UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type      VARCHAR(50) NOT NULL,     -- 'trip_created', 'city_searched', 'trip_shared', etc.
    event_data      JSONB,
    ip_address      INET,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_date ON analytics_events(created_at);
CREATE INDEX idx_analytics_data ON analytics_events USING GIN (event_data);

-- ============================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================

-- View: Trip summary with stop count and total cost
CREATE OR REPLACE VIEW v_trip_summary AS
SELECT
    t.id AS trip_id,
    t.user_id,
    t.name,
    t.status,
    t.start_date,
    t.end_date,
    (t.end_date - t.start_date + 1) AS total_days,
    t.total_budget,
    t.is_public,
    COUNT(DISTINCT ts.id) AS stop_count,
    COUNT(DISTINCT sa.id) AS activity_count,
    COALESCE(SUM(DISTINCT te.amount), 0) AS total_estimated_cost,
    t.created_at
FROM trips t
LEFT JOIN trip_stops ts ON t.id = ts.trip_id
LEFT JOIN stop_activities sa ON ts.id = sa.stop_id
LEFT JOIN trip_expenses te ON t.id = te.trip_id
GROUP BY t.id;

-- View: Budget breakdown by category per trip
CREATE OR REPLACE VIEW v_budget_breakdown AS
SELECT
    trip_id,
    category,
    COUNT(*) AS item_count,
    SUM(amount) AS category_total,
    ROUND(AVG(amount), 2) AS avg_per_item
FROM trip_expenses
GROUP BY trip_id, category;

-- View: Popular cities (for Dashboard recommendations)
CREATE OR REPLACE VIEW v_popular_cities AS
SELECT
    c.id,
    c.name AS city_name,
    co.name AS country_name,
    co.code AS country_code,
    r.name AS region_name,
    c.cost_index,
    c.popularity,
    c.image_url,
    COUNT(ts.id) AS times_visited
FROM cities c
JOIN countries co ON c.country_id = co.id
LEFT JOIN regions r ON co.region_id = r.id
LEFT JOIN trip_stops ts ON c.id = ts.city_id
GROUP BY c.id, co.name, co.code, r.name
ORDER BY c.popularity DESC;

-- View: Admin dashboard stats
CREATE OR REPLACE VIEW v_admin_stats AS
SELECT
    (SELECT COUNT(*) FROM users WHERE is_active = TRUE) AS total_users,
    (SELECT COUNT(*) FROM trips) AS total_trips,
    (SELECT COUNT(*) FROM trips WHERE status = 'ongoing') AS active_trips,
    (SELECT COUNT(*) FROM trips WHERE is_public = TRUE) AS public_trips,
    (SELECT COUNT(*) FROM trips WHERE created_at >= NOW() - INTERVAL '7 days') AS trips_this_week,
    (SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '7 days') AS new_users_this_week;

-- View: Daily itinerary for a stop
CREATE OR REPLACE VIEW v_daily_itinerary AS
SELECT
    sa.id AS schedule_id,
    ts.trip_id,
    ts.id AS stop_id,
    c.name AS city_name,
    a.name AS activity_name,
    a.activity_type,
    sa.scheduled_date,
    sa.start_time,
    sa.end_time,
    COALESCE(sa.custom_cost, a.estimated_cost) AS cost,
    a.duration_hours,
    sa.is_completed,
    sa.sort_order
FROM stop_activities sa
JOIN trip_stops ts ON sa.stop_id = ts.id
JOIN activities a ON sa.activity_id = a.id
JOIN cities c ON ts.city_id = c.id
ORDER BY sa.scheduled_date, sa.start_time, sa.sort_order;

-- ============================================================
-- TRIGGER: Auto-update updated_at timestamps
-- ============================================================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_trips_updated
    BEFORE UPDATE ON trips
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_stops_updated
    BEFORE UPDATE ON trip_stops
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_notes_updated
    BEFORE UPDATE ON trip_notes
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ============================================================
-- TRIGGER: Auto-generate share_slug when trip goes public
-- ============================================================

CREATE OR REPLACE FUNCTION generate_share_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_public = TRUE AND (OLD.is_public = FALSE OR OLD.share_slug IS NULL) THEN
        NEW.share_slug = LOWER(REPLACE(NEW.name, ' ', '-')) || '-' || SUBSTRING(NEW.id::TEXT, 1, 8);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_trip_share_slug
    BEFORE UPDATE ON trips
    FOR EACH ROW EXECUTE FUNCTION generate_share_slug();

-- ============================================================
-- TRIGGER: Log analytics on trip creation
-- ============================================================

CREATE OR REPLACE FUNCTION log_trip_created()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO analytics_events (user_id, event_type, event_data)
    VALUES (
        NEW.user_id,
        'trip_created',
        jsonb_build_object(
            'trip_id', NEW.id,
            'trip_name', NEW.name,
            'duration_days', (NEW.end_date - NEW.start_date + 1)
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_trip_created
    AFTER INSERT ON trips
    FOR EACH ROW EXECUTE FUNCTION log_trip_created();
