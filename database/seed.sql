-- ============================================================
-- TRAVELOOP - Seed Data for Development & Demo
-- ============================================================

-- ============================================================
-- REGIONS
-- ============================================================
INSERT INTO regions (name, description) VALUES
('South Asia', 'Indian subcontinent and surrounding areas'),
('Southeast Asia', 'Tropical region between India and China'),
('East Asia', 'China, Japan, Korea and surrounding areas'),
('Europe', 'European continent'),
('North America', 'USA, Canada, Mexico'),
('South America', 'Central and South American nations'),
('Middle East', 'Western Asia and North Africa'),
('Oceania', 'Australia, New Zealand, Pacific Islands'),
('Africa', 'African continent');

-- ============================================================
-- COUNTRIES
-- ============================================================
INSERT INTO countries (name, code, region_id, currency_code, currency_symbol) VALUES
('India', 'IN', 1, 'INR', '₹'),
('Thailand', 'TH', 2, 'THB', '฿'),
('Japan', 'JP', 3, 'JPY', '¥'),
('France', 'FR', 4, 'EUR', '€'),
('Italy', 'IT', 4, 'EUR', '€'),
('United States', 'US', 5, 'USD', '$'),
('Australia', 'AU', 8, 'AUD', 'A$'),
('United Kingdom', 'GB', 4, 'GBP', '£'),
('Indonesia', 'ID', 2, 'IDR', 'Rp'),
('Spain', 'ES', 4, 'EUR', '€'),
('Turkey', 'TR', 7, 'TRY', '₺'),
('Greece', 'GR', 4, 'EUR', '€'),
('Vietnam', 'VN', 2, 'VND', '₫'),
('Mexico', 'MX', 5, 'MXN', '$'),
('Brazil', 'BR', 6, 'BRL', 'R$');

-- ============================================================
-- CITIES
-- ============================================================
INSERT INTO cities (name, country_id, latitude, longitude, cost_index, popularity, description, timezone, best_season) VALUES
('Mumbai', 1, 19.0760, 72.8777, 2, 85, 'Financial capital of India with iconic landmarks and street food', 'Asia/Kolkata', 'Oct-Mar'),
('Delhi', 1, 28.7041, 77.1025, 2, 90, 'Historical capital with Mughal architecture and vibrant markets', 'Asia/Kolkata', 'Oct-Mar'),
('Goa', 1, 15.2993, 74.1240, 2, 88, 'Beach paradise with Portuguese heritage and nightlife', 'Asia/Kolkata', 'Nov-Feb'),
('Jaipur', 1, 26.9124, 75.7873, 1, 82, 'The Pink City - forts, palaces, and colorful bazaars', 'Asia/Kolkata', 'Oct-Mar'),
('Bangkok', 2, 13.7563, 100.5018, 2, 92, 'Temple-filled capital with legendary street food scene', 'Asia/Bangkok', 'Nov-Feb'),
('Tokyo', 3, 35.6762, 139.6503, 4, 95, 'Ultra-modern metropolis blending tradition and technology', 'Asia/Tokyo', 'Mar-May'),
('Paris', 4, 48.8566, 2.3522, 5, 98, 'City of Light - art, cuisine, and timeless romance', 'Europe/Paris', 'Apr-Jun'),
('Rome', 5, 41.9028, 12.4964, 4, 93, 'Eternal City with ancient ruins and world-class cuisine', 'Europe/Rome', 'Apr-Jun'),
('New York', 6, 40.7128, -74.0060, 5, 97, 'The city that never sleeps - culture, food, and skyline', 'America/New_York', 'Apr-Jun'),
('Sydney', 7, -33.8688, 151.2093, 4, 88, 'Harbour city with iconic Opera House and beaches', 'Australia/Sydney', 'Sep-Nov'),
('London', 8, 51.5074, -0.1278, 5, 96, 'Historic capital with world-class museums and theatre', 'Europe/London', 'May-Sep'),
('Bali', 9, -8.3405, 115.0920, 2, 91, 'Tropical island with temples, rice terraces, and surf', 'Asia/Makassar', 'Apr-Oct'),
('Barcelona', 10, 41.3874, 2.1686, 3, 90, 'Gaudi architecture, beaches, and vibrant nightlife', 'Europe/Madrid', 'May-Sep'),
('Istanbul', 11, 41.0082, 28.9784, 2, 87, 'Where East meets West - bazaars, mosques, and Bosphorus', 'Europe/Istanbul', 'Apr-Jun'),
('Santorini', 12, 36.3932, 25.4615, 4, 86, 'Iconic white-washed cliffs and stunning Aegean sunsets', 'Europe/Athens', 'Jun-Sep'),
('Hanoi', 13, 21.0278, 105.8342, 1, 80, 'Charming old quarter with pho and French colonial charm', 'Asia/Ho_Chi_Minh', 'Oct-Dec'),
('Cancun', 14, 21.1619, -86.8515, 3, 84, 'Caribbean beaches with Mayan ruins nearby', 'America/Cancun', 'Dec-Apr'),
('Rio de Janeiro', 15, -22.9068, -43.1729, 3, 89, 'Carnival city with Christ the Redeemer and Copacabana', 'America/Sao_Paulo', 'Dec-Mar'),
('Kyoto', 3, 35.0116, 135.7681, 3, 88, 'Ancient capital with thousands of temples and geisha culture', 'Asia/Tokyo', 'Mar-May'),
('Dubai', NULL, 25.2048, 55.2708, 4, 91, 'Futuristic skyline with luxury shopping and desert adventures', 'Asia/Dubai', 'Nov-Mar');

-- ============================================================
-- ACTIVITIES (Sample for key cities)
-- ============================================================

-- Mumbai Activities
INSERT INTO activities (city_id, name, description, activity_type, duration_hours, estimated_cost, rating) VALUES
(1, 'Gateway of India Visit', 'Iconic arch monument overlooking the Arabian Sea', 'sightseeing', 1.5, 0, 4.5),
(1, 'Street Food Walk - Chowpatty', 'Guided tour of Mumbai iconic street food scene', 'food_tour', 3, 25, 4.8),
(1, 'Dharavi Art Tour', 'Explore the creative side of one of Asia largest neighborhoods', 'culture', 2.5, 15, 4.3),
(1, 'Elephanta Caves Day Trip', 'Ferry ride to ancient rock-cut cave temples', 'sightseeing', 5, 20, 4.4);

-- Bangkok Activities
INSERT INTO activities (city_id, name, description, activity_type, duration_hours, estimated_cost, rating) VALUES
(5, 'Grand Palace & Wat Phra Kaew', 'Thailands most sacred Buddhist temple and royal palace', 'sightseeing', 3, 15, 4.7),
(5, 'Floating Market Tour', 'Visit Damnoen Saduak or Amphawa floating markets', 'culture', 4, 30, 4.5),
(5, 'Khao San Road Nightlife', 'Experience Bangkoks legendary backpacker street after dark', 'nightlife', 4, 20, 4.2),
(5, 'Thai Cooking Class', 'Learn to cook authentic Pad Thai and curries', 'food_tour', 3, 35, 4.9);

-- Paris Activities
INSERT INTO activities (city_id, name, description, activity_type, duration_hours, estimated_cost, rating) VALUES
(7, 'Eiffel Tower Summit', 'Ascend to the top of the iconic iron lattice tower', 'sightseeing', 2.5, 28, 4.8),
(7, 'Louvre Museum Tour', 'See the Mona Lisa and 35000 other masterpieces', 'culture', 4, 22, 4.9),
(7, 'Seine River Cruise', 'Evening cruise past illuminated Paris landmarks', 'sightseeing', 1.5, 18, 4.6),
(7, 'Montmartre Food Walk', 'Cheese, wine, and pastries in the artist quarter', 'food_tour', 3, 45, 4.7),
(7, 'Versailles Day Trip', 'Visit the opulent palace and gardens of Louis XIV', 'sightseeing', 6, 35, 4.5);

-- Tokyo Activities
INSERT INTO activities (city_id, name, description, activity_type, duration_hours, estimated_cost, rating) VALUES
(6, 'Shibuya Crossing & Harajuku', 'Iconic scramble crossing and Tokyos fashion district', 'sightseeing', 3, 0, 4.6),
(6, 'Tsukiji Outer Market Food Tour', 'Fresh sushi and Japanese street food paradise', 'food_tour', 3, 40, 4.8),
(6, 'Meiji Shrine & Yoyogi Park', 'Peaceful Shinto shrine surrounded by forest in central Tokyo', 'culture', 2, 0, 4.5),
(6, 'Robot Restaurant Show', 'Wild neon-lit robot cabaret in Shinjuku', 'nightlife', 2, 55, 4.0),
(6, 'TeamLab Borderless', 'Immersive digital art museum experience', 'culture', 2.5, 30, 4.9);

-- Bali Activities
INSERT INTO activities (city_id, name, description, activity_type, duration_hours, estimated_cost, rating) VALUES
(12, 'Ubud Rice Terrace Trek', 'Walk through the stunning Tegallalang rice paddies', 'adventure', 3, 10, 4.7),
(12, 'Uluwatu Temple Sunset', 'Cliffside temple with Kecak fire dance at sunset', 'culture', 3, 8, 4.8),
(12, 'Bali Surf Lesson - Kuta', 'Beginner-friendly surfing on Bali most famous beach', 'adventure', 2, 25, 4.4),
(12, 'Mount Batur Sunrise Trek', 'Pre-dawn hike to an active volcano crater', 'adventure', 6, 45, 4.6);

-- ============================================================
-- DEMO USER (password: "demo123" - bcrypt hashed)
-- ============================================================
INSERT INTO users (id, email, password_hash, full_name, role, email_verified) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'demo@traveloop.com', '$2a$10$dummyhashfordemopurposesonly1234567890abcdef', 'Demo Traveler', 'user', TRUE),
('f9e8d7c6-b5a4-3210-fedc-ba0987654321', 'admin@traveloop.com', '$2a$10$dummyhashfordemopurposesonly1234567890abcdef', 'Admin User', 'admin', TRUE);
