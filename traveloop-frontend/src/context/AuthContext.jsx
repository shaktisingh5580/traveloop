import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '@/lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  // Sync user from backend on boot to ensure session is still valid
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // MOCK DATA BYPASS
        // const userData = await api.get("/users/me");
        const userData = { id: 1, name: "Pratham", email: "pratham@traveloop.com", plan: "Pro", avatar: "https://i.pravatar.cc/150?img=11" };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.error("Session invalid or expired");
        setUser(null);
        api.clearTokens();
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("access_token")) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      // MOCK DATA BYPASS
      // const response = await api.post("/auth/login", { email, password });
      // api.setTokens(response.access_token, response.refresh_token);
      // const userData = await api.get("/users/me");
      
      const response = { access_token: "mock_token", refresh_token: "mock_refresh" };
      api.setTokens(response.access_token, response.refresh_token);
      const userData = { id: 1, name: "Pratham", email, plan: "Pro", avatar: "https://i.pravatar.cc/150?img=11" };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const signup = async (data) => {
    try {
      // MOCK DATA BYPASS
      // const response = await api.post("/auth/signup", data);
      // api.setTokens(response.access_token, response.refresh_token);
      // const userData = await api.get("/users/me");

      const response = { access_token: "mock_token", refresh_token: "mock_refresh" };
      api.setTokens(response.access_token, response.refresh_token);
      const userData = { id: 1, name: data.name, email: data.email, plan: "Free", avatar: "https://i.pravatar.cc/150?img=12" };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    api.clearTokens();
    localStorage.removeItem("user");
    window.location.href = '/'; 
  };

  const requireAuth = (callback) => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }
    if (callback) callback();
  };

  const openLogin = () => {
    setSignupModalOpen(false);
    setLoginModalOpen(true);
  };
  
  const openSignup = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };
  
  const closeModals = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, signup, logout, requireAuth, loading,
      isLoginModalOpen, isSignupModalOpen, openLogin, openSignup, closeModals 
    }}>
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
