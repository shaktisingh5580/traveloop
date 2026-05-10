/**
 * API client — centralized fetch wrapper for all backend calls.
 * Handles auth tokens, error formatting, and base URL.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

/**
 * Get stored JWT token (client-side only).
 */
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

/**
 * Store JWT tokens after login/signup.
 */
export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

/**
 * Clear tokens on logout.
 */
export function clearTokens(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

/**
 * Core fetch wrapper with auth and error handling.
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers as Record<string, string>),
  };

  // Don't set Content-Type for FormData (file uploads)
  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Network error" }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  // 204 No Content
  if (response.status === 204) return null as T;

  return response.json();
}

/** GET request */
export const get = <T>(endpoint: string) => request<T>(endpoint);

/** POST request */
export const post = <T>(endpoint: string, data?: unknown) =>
  request<T>(endpoint, { method: "POST", body: JSON.stringify(data) });

/** PUT request */
export const put = <T>(endpoint: string, data?: unknown) =>
  request<T>(endpoint, { method: "PUT", body: JSON.stringify(data) });

/** DELETE request */
export const del = <T>(endpoint: string) =>
  request<T>(endpoint, { method: "DELETE" });

/** POST with FormData (file uploads) */
export const upload = <T>(endpoint: string, formData: FormData) =>
  request<T>(endpoint, { method: "POST", body: formData });
