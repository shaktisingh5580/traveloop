import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '@/lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from backend using token on initial boot
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.get("/users/me");
        setUser(userData);
      } catch (err) {
        console.error("Auth session expired or invalid");
        api.clearTokens();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      api.setTokens(response.access_token, response.refresh_token);
      const userData = await api.get("/users/me");
      setUser(userData);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const signup = async (data) => {
    try {
      await api.post("/auth/signup", {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        phone: data.phone,
      });
      return await login(data.email, data.password);
    } catch (err) {
      console.error("Signup failed:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    api.clearTokens();
    window.location.href = '/'; 
  };

  const requireAuth = (callback) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    if (callback) callback();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, requireAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
