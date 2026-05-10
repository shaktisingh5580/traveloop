import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useRole } from './context/RoleContext';
import Overview from './pages/Overview';
import UserManagement from './pages/UserManagement';
import Revenue from './pages/Revenue';
import TripAnalytics from './pages/TripAnalytics';
import ActivityInsights from './pages/ActivityInsights';
import Community from './pages/Community';
import Settings from './pages/Settings';
import Destinations from './pages/Destinations';
import UserAnalytics from './pages/UserAnalytics';
import Reports from './pages/Reports';
import Login from './pages/Login';

function App() {
  const { user, loading } = useRole();

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div className="animate-pulse" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent)' }}>Traveloop Dashboard...</div>
      </div>
    );
  }

  // Guard: Show login if not authenticated
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Dashboard Routes
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/users-analytics" element={<UserAnalytics />} />
      <Route path="/trip-analytics" element={<TripAnalytics />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/activity" element={<ActivityInsights />} />
      <Route path="/revenue" element={<Revenue />} />
      <Route path="/community" element={<Community />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/settings" element={<Settings />} />
      {/* Redirect /login to home if already logged in */}
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
