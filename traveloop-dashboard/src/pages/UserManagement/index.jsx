import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import { getAdminUsers } from '../../services/api';
import { usersTableData } from '../../data/mockData';
import { MoreHorizontal, UserPlus, RefreshCw } from 'lucide-react';
import UserModal from '../../modals/UserModal';
import ActionModal from '../../modals/ActionModal';
import { useRole } from '../../context/RoleContext';

const UserManagement = () => {
  const { hasPermission } = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserAction, setSelectedUserAction] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  const canAddUser = hasPermission('create_user');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAdminUsers(1, 50);
      setUsers(data.map(u => ({
        id: u.id,
        name: u.full_name,
        email: u.email,
        role: u.role === 'admin' ? 'Admin' : 'User',
        status: u.is_active ? 'Active' : 'Inactive',
        joined: new Date(u.created_at).toLocaleDateString('en-CA'),
      })));
      setIsLive(true);
    } catch {
      // Fallback to mock
      setUsers(usersTableData);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const columns = [
    { 
      header: 'User', 
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
            {row.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontWeight: '500' }}>{row.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{row.email}</div>
          </div>
        </div>
      )
    },
    { header: 'Role', accessor: 'role' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'Active' ? 'success' : row.status === 'Inactive' ? 'warning' : 'danger'}`}>
          {row.status}
        </span>
      )
    },
    { header: 'Joined', accessor: 'joined' },
    { 
      header: 'Actions', 
      render: (row) => (
        <button className="btn btn-ghost" style={{ padding: '4px' }} onClick={() => setSelectedUserAction(row)}>
          <MoreHorizontal size={16} />
        </button>
      )
    }
  ];

  return (
    <DashboardLayout title="User Management">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>Users</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manage your platform users and their permissions.</p>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: isLive ? '#22c55e' : '#f59e0b',
            }} />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {isLive ? 'Live' : 'Demo'}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-ghost" onClick={fetchUsers} title="Refresh">
            <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => setIsModalOpen(true)}
            disabled={!canAddUser}
            style={{ opacity: canAddUser ? 1 : 0.5, cursor: canAddUser ? 'pointer' : 'not-allowed' }}
            title={!canAddUser ? "Only Super Admins can add users" : ""}
          >
            <UserPlus size={16} />
            Add New User
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="Filter by name or email..." 
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '13px',
              color: 'var(--text-primary)',
              width: '300px',
              outline: 'none'
            }}
          />
        </div>
        <DataTable columns={columns} data={users} />
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ActionModal 
        isOpen={!!selectedUserAction} 
        onClose={() => setSelectedUserAction(null)} 
        title="Manage User"
        message={selectedUserAction ? `Opening management portal for ${selectedUserAction.name} (${selectedUserAction.email}). Role: ${selectedUserAction.role}, Status: ${selectedUserAction.status}.` : ""}
      />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default UserManagement;
