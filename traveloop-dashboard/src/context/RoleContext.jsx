import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAPI, getCurrentUser, clearTokens, loadTokens } from '../services/api';
import { authUsers } from '../data/mockData';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app boot, check if we have a stored token and try to restore session
  useEffect(() => {
    const restoreSession = async () => {
      const hasToken = loadTokens();
      if (hasToken) {
        try {
          const profile = await getCurrentUser();
          setUser({
            id: profile.id,
            name: profile.full_name,
            email: profile.email,
            role: profile.role === 'admin' ? 'super-admin' : 'admin',
          });
        } catch {
          clearTokens();
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  const login = async (id, password) => {
    // First try real backend login (email-based)
    try {
      await loginAPI(id, password);
      const profile = await getCurrentUser();
      setUser({
        id: profile.id,
        name: profile.full_name,
        email: profile.email,
        role: profile.role === 'admin' ? 'super-admin' : 'admin',
      });
      return true;
    } catch {
      // Fallback to mock auth for offline/demo mode
      const authUser = authUsers.find(u => u.id === id && u.password === password);
      if (authUser) {
        setUser({
          name: authUser.name,
          role: authUser.role,
          email: `${authUser.id}@traveloop.com`
        });
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
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

  // Show nothing while checking auth
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '20px', margin: '0 auto 12px' }}>T</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading...</p>
        </div>
      </div>
    );
  }

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
