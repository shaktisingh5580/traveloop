import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/ui/MetricCard';
import ChartCard from '../../components/ui/ChartCard';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import ActionModal from '../../modals/ActionModal';

const ActivityInsights = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const activityData = [
    { hour: '00:00', users: 120 }, { hour: '04:00', users: 80 },
    { hour: '08:00', users: 350 }, { hour: '12:00', users: 820 },
    { hour: '16:00', users: 950 }, { hour: '20:00', users: 450 },
  ];

  return (
    <DashboardLayout title="Activity Insights">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <MetricCard title="Daily Active Users" value="8,432" change="+4.3%" trend="up" />
        <MetricCard title="Avg. Session Time" value="12m 45s" change="+1.2%" trend="up" />
        <MetricCard title="Bounce Rate" value="32.4%" change="-2.1%" trend="up" />
        <MetricCard title="New Signups" value="452" change="+18.5%" trend="up" />
      </div>

      <ChartCard title="Peak Usage Hours" subtitle="User activity throughout the day (UTC)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="hour" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
            />
            <Area type="monotone" dataKey="users" stroke="var(--accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Feature Engagement</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Map Editor', value: '85%', color: 'var(--accent)' },
            { label: 'Budget Planner', value: '72%', color: '#3b82f6' },
            { label: 'Community Feed', value: '45%', color: '#f59e0b' },
            { label: 'Export PDF', value: '28%', color: '#ef4444' }
          ].map((item, i) => (
            <div 
              key={i} 
              style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '8px', cursor: 'pointer' }}
              onClick={() => setSelectedFeature(item)}
            >
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>{item.value}</div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '2px', marginTop: '8px' }}>
                <div style={{ width: item.value, height: '100%', background: item.color, borderRadius: '2px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ActionModal 
        isOpen={!!selectedFeature} 
        onClose={() => setSelectedFeature(null)} 
        title="Feature Engagement Insight"
        message={selectedFeature ? `The ${selectedFeature.label} has an engagement score of ${selectedFeature.value}. This represents the percentage of daily active users who interacted with this feature at least once in the last 24 hours.` : ""}
      />
    </DashboardLayout>
  );
};

export default ActivityInsights;
