import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await api.get('/users/me');
        setUser(userData);
      } catch (err) {
        api.clearToken();
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (id, password) => {
    try {
      const { access_token } = await api.post('/auth/login', { email: id, password });
      api.setToken(access_token);
      const userData = await api.get('/users/me');
      setUser(userData);
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    api.clearToken();
  };

  const hasPermission = (action) => {
    if (!user) return false;
    if (user.role === 'super-admin') return true;
    
    // Restricted actions for 'admin'
    const restrictedActions = [
      'create_user', 
      'delete_user', 
      'change_system_settings', 
      'export_financials',
      'manage_community'
    ];
    return !restrictedActions.includes(action);
  };

  return (
    <RoleContext.Provider value={{ user, login, logout, hasPermission, loading }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
