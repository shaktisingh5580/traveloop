import React, { createContext, useContext, useState } from 'react';
import { authUsers } from '../data/mockData';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (id, password) => {
    const authUser = authUsers.find(u => u.id === id && u.password === password);
    if (authUser) {
      console.log('Login successful for:', authUser.name);
      setUser({
        name: authUser.name,
        role: authUser.role,
        email: `${authUser.id}@traveloop.com`
      });
      return true;
    }
    return false;
  };

  const logout = () => {
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

  return (
    <RoleContext.Provider value={{ user, login, logout, hasPermission }}>
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
