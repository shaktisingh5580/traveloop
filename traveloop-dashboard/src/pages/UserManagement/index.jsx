import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import { usersTableData } from '../../data/mockData';
import { MoreHorizontal, UserPlus } from 'lucide-react';
import UserModal from '../../modals/UserModal';
import ActionModal from '../../modals/ActionModal';
import { useRole } from '../../context/RoleContext';

const UserManagement = () => {
  const { hasPermission } = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserAction, setSelectedUserAction] = useState(null);

  const canAddUser = hasPermission('create_user'); // I'll add this to context or just use role check

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
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manage your platform users and their permissions.</p>
        </div>
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
        <DataTable columns={columns} data={usersTableData} />
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ActionModal 
        isOpen={!!selectedUserAction} 
        onClose={() => setSelectedUserAction(null)} 
        title="Manage User"
        message={selectedUserAction ? `Opening management portal for ${selectedUserAction.name}. You can update roles, reset passwords, or suspend this account from the elevated access terminal.` : ""}
      />
    </DashboardLayout>
  );
};

export default UserManagement;
