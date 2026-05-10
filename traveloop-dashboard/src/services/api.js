/**
 * Traveloop Dashboard — API Service Layer
 * Connects to the FastAPI backend at http://localhost:8000
 */

const API_BASE = 'http://localhost:8000/api/v1';

let accessToken = null;
let refreshToken = null;

/**
 * Set auth tokens after login.
 */
export const setTokens = (access, refresh) => {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem('traveloop_admin_token', access);
  localStorage.setItem('traveloop_admin_refresh', refresh);
};

/**
 * Load tokens from localStorage on app boot.
 */
export const loadTokens = () => {
  accessToken = localStorage.getItem('traveloop_admin_token');
  refreshToken = localStorage.getItem('traveloop_admin_refresh');
  return !!accessToken;
};

/**
 * Clear tokens on logout.
 */
export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem('traveloop_admin_token');
  localStorage.removeItem('traveloop_admin_refresh');
};

/**
 * Authenticated fetch wrapper.
 */
const apiFetch = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearTokens();
    window.location.reload();
    throw new Error('Session expired');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `API Error ${res.status}`);
  }

  // 204 No Content
  if (res.status === 204) return null;

  return res.json();
};

// ==================== AUTH ====================

export const loginAPI = async (email, password) => {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setTokens(data.access_token, data.refresh_token);
  return data;
};

export const signupAPI = async (email, password, fullName) => {
  const data = await apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, full_name: fullName }),
  });
  setTokens(data.access_token, data.refresh_token);
  return data;
};

// ==================== ADMIN ====================

export const getAdminStats = () => apiFetch('/admin/stats');
export const getTopCities = (limit = 10) => apiFetch(`/admin/top-cities?limit=${limit}`);
export const getAdminUsers = (page = 1, limit = 20) => apiFetch(`/admin/users?page=${page}&limit=${limit}`);

// ==================== USERS ====================

export const getCurrentUser = () => apiFetch('/users/me');
export const updateProfile = (data) => apiFetch('/users/me', { method: 'PUT', body: JSON.stringify(data) });

// ==================== TRIPS ====================

export const listTrips = (status) => apiFetch(`/trips${status ? `?status=${status}` : ''}`);
export const getTrip = (id) => apiFetch(`/trips/${id}`);

// ==================== CITIES ====================

export const searchCities = (query) => apiFetch(`/cities/search?q=${encodeURIComponent(query)}`);
export const getPopularCities = (limit = 10) => apiFetch(`/cities/popular?limit=${limit}`);
export const getCityDetails = (id) => apiFetch(`/cities/${id}`);
