const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1/client";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function setTokens(accessToken, refreshToken) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Network error" }));
    const errorMessage = typeof error.detail === "string" ? error.detail : JSON.stringify(error.detail);
    throw new Error(errorMessage || `HTTP ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}

export const get = (endpoint) => request(endpoint);
export const post = (endpoint, data) => request(endpoint, { method: "POST", body: JSON.stringify(data) });
export const put = (endpoint, data) => request(endpoint, { method: "PUT", body: JSON.stringify(data) });
export const del = (endpoint) => request(endpoint, { method: "DELETE" });
export const upload = (endpoint, formData) => request(endpoint, { method: "POST", body: formData });
