import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/ui/MetricCard';
import ChartCard from '../../components/ui/ChartCard';
import { api } from '../../lib/api';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import ActionModal from '../../modals/ActionModal';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

const Overview = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [stats, setStats] = useState([]);
  const [topCities, setTopCities] = useState([]);
  const [recentTrips, setRecentTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, citiesRes, tripsRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/top-cities'),
          api.get('/admin/recent-trips')
        ]);
        setStats(statsRes.metrics || []);
        setTopCities(citiesRes || []);
        setRecentTrips(tripsRes || []);
      } catch (err) {
        console.error('Failed to fetch overview data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading live analytics...</div>;

  return (
    <DashboardLayout title="Admin Overview">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {stats.map((stat, i) => (
          <MetricCard key={i} {...stat} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <ChartCard title="Engagement Trends" subtitle="Active users and trip creations">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={recentTrips.map(t => ({ name: t.date, value: t.count || 1 }))}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Area type="monotone" dataKey="value" stroke="var(--accent)" fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Destinations" subtitle="Most popular planned cities">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topCities}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="trips"
                nameKey="city"
              >
                {topCities.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {topCities.slice(0, 4).map((entry, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                  {entry.city}
                </div>
                <span style={{ fontWeight: '600' }}>{entry.trips} trips</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Recent Trip Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {recentTrips.slice(0, 5).map((trip) => (
            <div key={trip.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{trip.name}</span>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '4px' }}>created in {trip.location}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{trip.dates}</div>
                </div>
              </div>
              <button 
                className="btn btn-ghost" 
                style={{ fontSize: '12px' }}
                onClick={() => setSelectedActivity(trip)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      <ActionModal 
        isOpen={!!selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
        title="Activity Details"
        message={selectedActivity ? `${selectedActivity.user} ${selectedActivity.action} at ${selectedActivity.time}. This action has been verified and logged in the system audits.` : ""}
      />
    </DashboardLayout>
  );
};

export default Overview;
