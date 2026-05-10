import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Server, Shield, Database, Globe, Key, UserCog } from 'lucide-react';
import ActionModal from '../../modals/ActionModal';
import { useRole } from '../../context/RoleContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { hasPermission } = useRole();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('General');
  const [modalTitle, setModalTitle] = useState(null);

  const systemLogs = [
    { id: 1, service: 'API Gateway', status: 'Healthy', latency: '24ms' },
    { id: 2, service: 'Auth Service', status: 'Healthy', latency: '12ms' },
    { id: 3, service: 'Trip DB', status: 'Healthy', latency: '8ms' },
    { id: 4, service: 'CDN', status: 'Degraded', latency: '450ms' },
  ];

  const canEditSettings = hasPermission('change_system_settings');

  const toggleSwitch = (title) => {
    if (!canEditSettings) {
      alert("Only Super Admins can modify global configuration.");
      return;
    }
    setModalTitle(title);
  };

  const handleTabClick = (label) => {
    if (label === 'Users') {
      navigate('/users');
    } else {
      setActiveTab(label);
    }
  };

  return (
    <DashboardLayout title="System Settings">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'General', icon: Globe },
            { label: 'Users', icon: UserCog },
            { label: 'Security', icon: Shield },
            { label: 'Infrastructure', icon: Server },
            { label: 'Database', icon: Database },
            { label: 'API Keys', icon: Key },
          ].map((item, i) => (
            <button 
              key={i} 
              className="btn btn-ghost" 
              style={{ 
                justifyContent: 'flex-start', 
                padding: '12px 16px', 
                background: activeTab === item.label ? 'var(--bg-elevated)' : 'transparent',
                color: activeTab === item.label ? 'var(--accent)' : 'var(--text-secondary)'
              }}
              onClick={() => handleTabClick(item.label)}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Service Health</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {systemLogs.map((log) => (
                <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-base)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: log.status === 'Healthy' ? 'var(--accent)' : 'var(--amber)' }} />
                    <div style={{ fontWeight: '500' }}>{log.service}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Latency: <span style={{ color: 'var(--text-primary)' }}>{log.latency}</span></span>
                    <span style={{ color: log.status === 'Healthy' ? 'var(--accent)' : 'var(--amber)' }}>{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Global Configuration</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500' }}>Maintenance Mode</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Disable public access to the platform</div>
                </div>
                <div 
                  onClick={() => toggleSwitch('Maintenance Mode')}
                  style={{ width: '40px', height: '22px', background: '#e2e8f0', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}
                >
                  <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500' }}>New User Registration</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Allow new users to create accounts</div>
                </div>
                <div 
                  onClick={() => toggleSwitch('User Registration')}
                  style={{ width: '40px', height: '22px', background: 'var(--accent)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}
                >
                  <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ActionModal 
        isOpen={!!modalTitle} 
        onClose={() => setModalTitle(null)} 
        title="Settings Change"
        message={`You are about to modify the ${modalTitle} configuration. This change will be propagated across all active nodes in the cluster within 60 seconds.`}
      />
    </DashboardLayout>
  );
};

export default Settings;
