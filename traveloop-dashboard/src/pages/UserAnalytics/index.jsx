import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/ui/MetricCard';
import ChartCard from '../../components/ui/ChartCard';
import { api } from '../../lib/api';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const UserAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/admin/recent-trips');
        setData(res.map(t => ({ name: t.date, users: t.count * 10, trips: t.count })));
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <DashboardLayout title="User Analytics">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <MetricCard title="Total Users" value="42,892" change="+12.5%" trend="up" />
        <MetricCard title="Active Users" value="8,432" change="+4.3%" trend="up" />
        <MetricCard title="Retention Rate" value="78.2%" change="+2.1%" trend="up" />
        <MetricCard title="Churn Rate" value="1.4%" change="-0.2%" trend="up" />
      </div>

      <ChartCard title="Acquisition vs Engagement" subtitle="Monthly user growth and active sessions">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
            />
            <Line type="monotone" dataKey="users" name="New Users" stroke="var(--accent)" strokeWidth={2} dot={{ fill: 'var(--accent)' }} />
            <Line type="monotone" dataKey="trips" name="Active Sessions" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>User Demographics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['United States', 'Japan', 'United Kingdom', 'Germany'].map((country, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{country}</span>
                <div style={{ flex: 1, height: '6px', background: 'var(--bg-elevated)', borderRadius: '3px', margin: '0 16px', position: 'relative' }}>
                  <div style={{ width: `${80 - i * 15}%`, height: '100%', background: 'var(--accent)', borderRadius: '3px' }} />
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', width: '32px' }}>{35 - i * 8}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Top User Agents</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Chrome / macOS', 'Safari / iOS', 'Chrome / Windows', 'Firefox / Linux'].map((ua, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{ua}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{42 - i * 10}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserAnalytics;
