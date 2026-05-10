const BASE_URL = 'http://localhost:8000/api/v1/dashboard';

const getHeaders = () => {
  const token = localStorage.getItem('traveloop_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const api = {
  async get(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`, { headers: getHeaders() });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },

  async post(endpoint, data) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },

  setToken(token) {
    localStorage.setItem('traveloop_admin_token', token);
  },

  clearToken() {
    localStorage.removeItem('traveloop_admin_token');
  }
};
