import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/ui/MetricCard';
import ChartCard from '../../components/ui/ChartCard';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { getAdminStats, getTopCities } from '../../services/api';
import { mockStats, userGrowthData, tripCategoryData, recentActivities } from '../../data/mockData';
import ActionModal from '../../modals/ActionModal';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

const Overview = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [stats, setStats] = useState(null);
  const [topCities, setTopCities] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, citiesData] = await Promise.all([
          getAdminStats(),
          getTopCities(5),
        ]);
        setStats(statsData);
        setTopCities(citiesData);
      } catch (err) {
        console.warn('Backend unavailable, using mock data:', err.message);
        setStats(null);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchData();
  }, []);

  // Build metric cards from real data or fallback to mock
  const metricsData = stats
    ? [
        { title: 'Total Users', value: stats.total_users?.toLocaleString() || '0', change: `+${stats.new_users_this_week || 0} this week`, trend: 'up', color: '#22c55e' },
        { title: 'Total Trips', value: stats.total_trips?.toLocaleString() || '0', change: `+${stats.trips_this_week || 0} this week`, trend: 'up', color: '#22c55e' },
        { title: 'Active Trips', value: stats.active_trips?.toLocaleString() || '0', change: 'Ongoing', trend: 'up', color: '#22c55e' },
        { title: 'Public Trips', value: stats.public_trips?.toLocaleString() || '0', change: 'Shared', trend: 'up', color: '#22c55e' },
      ]
    : mockStats;

  // Build destination data from real or mock
  const destinationDisplay = topCities.length > 0
    ? topCities.map(c => ({ name: `${c.city}, ${c.country}`, count: c.visits, growth: '+N/A' }))
    : [
        { name: 'Kyoto, Japan', count: 450, growth: '+15%' },
        { name: 'Amalfi, Italy', count: 390, growth: '+12%' },
        { name: 'Banff, Canada', count: 320, growth: '+8%' },
        { name: 'Bali, Indonesia', count: 280, growth: '+20%' },
        { name: 'Paris, France', count: 240, growth: '+5%' },
      ];

  // Pie chart data from real cities or fallback to mock categories
  const pieData = topCities.length > 0
    ? topCities.map(c => ({ name: c.city, value: c.visits }))
    : tripCategoryData;
  const pieDataKey = topCities.length > 0 ? 'value' : 'value';

  return (
    <DashboardLayout title="Admin Overview">
      {/* Live Data Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: stats ? '#22c55e' : '#f59e0b',
          boxShadow: stats ? '0 0 6px rgba(34, 197, 94, 0.4)' : 'none',
        }} />
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          {stats ? '● Connected to Live Backend' : '● Using Demo Data (backend offline)'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {metricsData.map((stat, i) => (
          <MetricCard key={i} {...stat} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <ChartCard title="Engagement Trends" subtitle="Active users and trip creations">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userGrowthData}>
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
              <Area type="monotone" dataKey="users" stroke="var(--accent)" fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Destinations" subtitle="Most popular planned cities">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey={pieDataKey}
                nameKey="name"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {pieData.slice(0, 4).map((entry, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                  {entry.name}
                </div>
                <span style={{ fontWeight: '600' }}>{entry.value} trips</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Top Destinations + Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
            🏆 Top Destinations {stats ? '(Live)' : '(Demo)'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {destinationDisplay.map((dest, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < destinationDisplay.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--accent)', width: '24px' }}>#{i + 1}</span>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{dest.name}</span>
                </div>
                <span className="badge badge-success">{dest.count} trips</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivities.map((activity) => (
              <div key={activity.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
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
                      <span style={{ color: 'var(--text-primary)' }}>{activity.user}</span>
                      <span style={{ color: 'var(--text-secondary)', marginLeft: '4px' }}>{activity.action}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{activity.time}</div>
                  </div>
                </div>
                <button 
                  className="btn btn-ghost" 
                  style={{ fontSize: '12px' }}
                  onClick={() => setSelectedActivity(activity)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
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
