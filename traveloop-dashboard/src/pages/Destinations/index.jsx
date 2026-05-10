import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import MetricCard from '../../components/ui/MetricCard';
import { destinationData } from '../../data/mockData';
import ActionModal from '../../modals/ActionModal';
import { ExternalLink } from 'lucide-react';

const Destinations = () => {
  const [selectedDest, setSelectedDest] = useState(null);

  const columns = [
    { header: 'Destination', accessor: 'name' },
    { header: 'Trip Volume', accessor: 'count' },
    { 
      header: 'Monthly Growth', 
      render: (row) => (
        <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{row.growth}</span>
      )
    },
    { 
      header: 'Status', 
      render: () => (
        <span className="badge badge-success">Trending</span>
      )
    },
    { 
      header: 'Actions', 
      render: (row) => (
        <button className="btn btn-ghost" style={{ padding: '4px' }} onClick={() => setSelectedDest(row)}>
          <ExternalLink size={16} />
        </button>
      )
    }
  ];

  return (
    <DashboardLayout title="Popular Destinations">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <MetricCard title="Total Cities" value="1,420" change="+12" trend="up" />
        <MetricCard title="Top Country" value="Japan" change="+8.2%" trend="up" />
        <MetricCard title="Wishlisted" value="45,800" change="+12.5%" trend="up" />
        <MetricCard title="Avg. Reviews" value="4.8/5" change="+0.1" trend="up" />
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Destination Performance</h3>
        </div>
        <DataTable columns={columns} data={destinationData} />
      </div>

      <ActionModal 
        isOpen={!!selectedDest} 
        onClose={() => setSelectedDest(null)} 
        title="Destination Insight"
        message={selectedDest ? `Viewing detailed analytics for ${selectedDest.name}. Trip volume has increased by ${selectedDest.growth} this month, primarily driven by seasonal trends and social media exposure.` : ""}
      />
    </DashboardLayout>
  );
};

export default Destinations;
