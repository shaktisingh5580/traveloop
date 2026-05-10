import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/ui/MetricCard';
import ChartCard from '../../components/ui/ChartCard';
import { api } from '../../lib/api';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];

const TripAnalytics = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await api.get('/trips/');
        setTrips(data);
      } catch (err) {
        console.error('Failed to fetch trips:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading trip analytics...</div>;

  // Process data for charts
  const statusData = trips.reduce((acc, trip) => {
    const status = trip.status || 'Active';
    const existing = acc.find(item => item.status === status);
    if (existing) existing.count++;
    else acc.push({ status, count: 1 });
    return acc;
  }, []);

  const locationData = trips.reduce((acc, trip) => {
    const location = trip.location || 'Unknown';
    const existing = acc.find(item => item.region === location);
    if (existing) existing.count++;
    else acc.push({ region: location, count: 1 });
    return acc;
  }, []).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <DashboardLayout title="Trip Analytics">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <MetricCard title="Total Trips" value={trips.length} change="+12.5%" trend="up" />
        <MetricCard title="Active Locations" value={locationData.length} change="+5.2%" trend="up" />
        <MetricCard title="Success Rate" value="98.2%" change="+0.4%" trend="up" />
        <MetricCard title="Planned Budget" value="₹1.2M" change="+8.0%" trend="up" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <ChartCard title="Trip Status Distribution" subtitle="All-time trip lifecycle breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="status"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Planned Destinations" subtitle="Regions by trip count">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="region" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default TripAnalytics;
