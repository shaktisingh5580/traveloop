import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Map, Compass, Activity, 
  BarChart3, ShieldCheck, FileText, UserCog, Settings, LogOut 
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';

const Sidebar = () => {
  const { user, logout } = useRole();
  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'User Analytics', path: '/users-analytics', icon: Users },
    { name: 'Trip Analytics', path: '/trip-analytics', icon: Map },
    { name: 'Destinations', path: '/destinations', icon: Compass },
    { name: 'Activity', path: '/activity', icon: Activity },
    { name: 'Revenue', path: '/revenue', icon: BarChart3 },
    { name: 'Community', path: '/community', icon: ShieldCheck },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'User Mgmt', path: '/users', icon: UserCog },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="sidebar" style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      background: '#ffffff',
      borderRight: '1px solid var(--border)',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: '700',
          fontSize: '20px'
        }}>T</div>
        <span style={{ fontWeight: '700', fontSize: '18px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Traveloop
        </span>
      </div>

      <nav style={{ flex: 1, padding: '12px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              borderRadius: '8px',
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '4px',
              background: isActive ? 'var(--accent-dim)' : 'transparent',
              transition: 'all 0.2s'
            })}
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', marginBottom: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: user?.role === 'super-admin' ? 'var(--accent)' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: user?.role === 'super-admin' ? '#fff' : '#64748b' }}>
            {user?.name[0]}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{user?.name}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700' }}>{user?.role}</div>
          </div>
        </div>
        <button 
          className="btn btn-ghost" 
          onClick={logout}
          style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--red)', fontSize: '13px', padding: '8px' }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
