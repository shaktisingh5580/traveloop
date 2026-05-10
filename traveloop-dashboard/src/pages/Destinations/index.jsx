import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import MetricCard from '../../components/ui/MetricCard';
import { api } from '../../lib/api';
import ActionModal from '../../modals/ActionModal';
import { ExternalLink } from 'lucide-react';

const Destinations = () => {
  const [selectedDest, setSelectedDest] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await api.get('/cities/popular');
        setCities(data);
      } catch (err) {
        console.error('Failed to fetch popular cities:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const columns = [
    { header: 'Destination', accessor: 'city' },
    { header: 'Trip Volume', accessor: 'trips' },
    {
      header: 'Score',
      render: (row) => (
        <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{row.rating || '4.8'}</span>
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

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading destination data...</div>;

  return (
    <DashboardLayout title="Popular Destinations">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <MetricCard title="Monitored Cities" value={cities.length} change="+12" trend="up" />
        <MetricCard title="Top City" value={cities[0]?.city || 'N/A'} change="+8.2%" trend="up" />
        <MetricCard title="Avg. Trips/City" value={Math.round(cities.reduce((a, b) => a + (b.trips || 0), 0) / cities.length)} change="+12.5%" trend="up" />
        <MetricCard title="Avg. Rating" value="4.8/5" change="+0.1" trend="up" />
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Destination Performance</h3>
        </div>
        <DataTable columns={columns} data={cities} />
      </div>

      <ActionModal
        isOpen={!!selectedDest}
        onClose={() => setSelectedDest(null)}
        title="Destination Insight"
        message={selectedDest ? `Viewing detailed analytics for ${selectedDest.city}. This destination is currently trending with ${selectedDest.trips} active trip plans.` : ""}
      />
    </DashboardLayout>
  );
};

export default Destinations;
