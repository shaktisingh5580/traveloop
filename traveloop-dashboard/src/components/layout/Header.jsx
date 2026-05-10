import React, { useState } from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import ActionModal from '../../modals/ActionModal';

const Header = ({ title }) => {
  const [modalType, setModalType] = useState(null);

  return (
    <>
    <header style={{
      height: 'var(--header-height)',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>{title}</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search analytics..." 
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '8px 12px 8px 36px',
              fontSize: '13px',
              color: 'var(--text-primary)',
              width: '240px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-ghost" style={{ padding: '8px' }} onClick={() => setModalType('help')}>
            <HelpCircle size={20} />
          </button>
          <button className="btn btn-ghost" style={{ padding: '8px', position: 'relative' }} onClick={() => setModalType('notifications')}>
            <Bell size={20} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              background: 'var(--red)',
              borderRadius: '50%',
              border: '2px solid #fff'
            }} />
          </button>
        </div>
      </div>
    </header>

    <ActionModal 
      isOpen={modalType === 'help'} 
      onClose={() => setModalType(null)} 
      title="Admin Help Center"
      message="Welcome to the Traveloop Admin Portal. You can manage users, monitor community activities, and view real-time trip analytics. If you need technical support, please contact the DevOps team via Slack."
    />
    <ActionModal 
      isOpen={modalType === 'notifications'} 
      onClose={() => setModalType(null)} 
      title="Notifications"
      message="You have 3 new system alerts: 1. A new trip from Tokyo was flagged. 2. Monthly revenue goal was reached. 3. System backup completed successfully."
    />
    </>
  );
};

export default Header;
