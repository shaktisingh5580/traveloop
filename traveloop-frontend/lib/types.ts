/**
 * TypeScript interfaces matching the backend Pydantic schemas.
 * Shared across all pages and components.
 */

// -------------------- Auth --------------------
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

// -------------------- User --------------------
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  language_pref: string;
  role: "user" | "admin";
  created_at: string;
}

// -------------------- Trip --------------------
export type TripStatus = "draft" | "planned" | "ongoing" | "completed" | "cancelled";

export interface Trip {
  id: string;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  total_days: number;
  status: TripStatus;
  is_public: boolean;
  share_slug: string | null;
  cover_image_url: string | null;
  total_budget: number | null;
  currency_code: string;
  stop_count: number;
  activity_count: number;
  total_estimated_cost: number;
  created_at: string;
}

export interface TripCreate {
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  total_budget?: number;
  currency_code?: string;
}

// -------------------- Trip Stop --------------------
export interface TripStop {
  id: string;
  trip_id: string;
  city_id: number;
  city_name: string;
  country_name: string;
  arrival_date: string;
  departure_date: string;
  sort_order: number;
  transport_mode: string | null;
  transport_cost: number;
  accommodation: string | null;
  accommodation_cost: number;
  notes: string | null;
  activities: StopActivity[];
}

// -------------------- Activity --------------------
export type ActivityType =
  | "sightseeing"
  | "food_tour"
  | "adventure"
  | "culture"
  | "shopping"
  | "nightlife"
  | "relaxation"
  | "transport";

export interface Activity {
  id: number;
  city_id: number;
  name: string;
  description: string | null;
  activity_type: ActivityType;
  duration_hours: number | null;
  estimated_cost: number;
  image_url: string | null;
  rating: number | null;
}

export interface StopActivity {
  id: string;
  activity_id: number;
  activity_name: string;
  activity_type: ActivityType;
  scheduled_date: string | null;
  start_time: string | null;
  end_time: string | null;
  cost: number;
  is_completed: boolean;
}

// -------------------- City --------------------
export interface City {
  id: number;
  name: string;
  country_name: string;
  country_code: string;
  region_name: string | null;
  latitude: number | null;
  longitude: number | null;
  cost_index: number;
  popularity: number;
  description: string | null;
  image_url: string | null;
  best_season: string | null;
}

// -------------------- Expense --------------------
export type ExpenseCategory =
  | "transport"
  | "accommodation"
  | "food"
  | "activities"
  | "shopping"
  | "miscellaneous";

export interface Expense {
  id: string;
  trip_id: string;
  stop_id: string | null;
  category: ExpenseCategory;
  description: string;
  amount: number;
  currency_code: string;
  expense_date: string | null;
  is_estimated: boolean;
}

export interface BudgetBreakdown {
  category: ExpenseCategory;
  item_count: number;
  category_total: number;
  avg_per_item: number;
}

// -------------------- Packing --------------------
export type PackingCategory =
  | "clothing"
  | "documents"
  | "electronics"
  | "toiletries"
  | "medicine"
  | "accessories"
  | "miscellaneous";

export interface PackingItem {
  id: string;
  trip_id: string;
  category: PackingCategory;
  name: string;
  quantity: number;
  is_packed: boolean;
  is_essential: boolean;
}

// -------------------- Notes --------------------
export interface TripNote {
  id: string;
  trip_id: string;
  stop_id: string | null;
  title: string | null;
  content: string;
  note_date: string | null;
  created_at: string;
  updated_at: string;
}

// -------------------- Admin --------------------
export interface PlatformStats {
  total_users: number;
  total_trips: number;
  active_trips: number;
  public_trips: number;
  trips_this_week: number;
  new_users_this_week: number;
}
