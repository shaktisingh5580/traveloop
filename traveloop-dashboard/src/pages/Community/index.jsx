import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/ui/MetricCard';
import DataTable from '../../components/ui/DataTable';
import { communityFlags } from '../../data/mockData';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import ActionModal from '../../modals/ActionModal';
import { useRole } from '../../context/RoleContext';

const Community = () => {
  const { hasPermission } = useRole();
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [modalType, setModalType] = useState(null);

  const canModerate = hasPermission('manage_community');

  const columns = [
    { header: 'Reporter', accessor: 'user' },
    { 
      header: 'Reason', 
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--amber)' }}>
          <AlertTriangle size={14} />
          {row.reason}
        </div>
      )
    },
    { header: 'Content Preview', accessor: 'post' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'Reviewed' ? 'success' : 'warning'}`}>
          {row.status}
        </span>
      )
    },
    { 
      header: 'Actions', 
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-ghost" 
            style={{ padding: '4px', color: 'var(--accent)', opacity: canModerate ? 1 : 0.4, cursor: canModerate ? 'pointer' : 'not-allowed' }}
            disabled={!canModerate}
            title={!canModerate ? "Only Super Admins can moderate" : ""}
            onClick={() => { setSelectedFlag(row); setModalType('approve'); }}
          >
            <CheckCircle size={16} />
          </button>
          <button 
            className="btn btn-ghost" 
            style={{ padding: '4px', color: 'var(--red)', opacity: canModerate ? 1 : 0.4, cursor: canModerate ? 'pointer' : 'not-allowed' }}
            disabled={!canModerate}
            title={!canModerate ? "Only Super Admins can ban" : ""}
            onClick={() => { setSelectedFlag(row); setModalType('ban'); }}
          >
            <Shield size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <DashboardLayout title="Community Monitoring">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <MetricCard title="Total Posts" value="24,500" change="+8.2%" trend="up" />
        <MetricCard title="Active Flags" value="42" change="+12" trend="up" />
        <MetricCard title="Moderators" value="15" change="0" trend="up" />
        <MetricCard title="Resolved Today" value="128" change="+15%" trend="up" />
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Flagged Content Queue</h3>
        </div>
        <DataTable columns={columns} data={communityFlags} />
      </div>

      <ActionModal 
        isOpen={!!selectedFlag} 
        onClose={() => { setSelectedFlag(null); setModalType(null); }}
        title={modalType === 'approve' ? 'Approve Content' : 'Shield Protection'}
        message={selectedFlag ? (
          modalType === 'approve' 
            ? `You are approving the post by ${selectedFlag.user}. The flag will be dismissed and the content will remain public.` 
            : `You are applying a protective shield. The post by ${selectedFlag.user} will be hidden from the public feed pending a senior moderator review.`
        ) : ""}
      />
    </DashboardLayout>
  );
};

export default Community;
