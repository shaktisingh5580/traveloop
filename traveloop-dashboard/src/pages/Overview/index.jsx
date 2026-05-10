import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/ui/MetricCard';
import ChartCard from '../../components/ui/ChartCard';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { mockStats, userGrowthData, tripCategoryData, recentActivities } from '../../data/mockData';
import ActionModal from '../../modals/ActionModal';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

const Overview = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  return (
    <DashboardLayout title="Admin Overview">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {mockStats.map((stat, i) => (
          <MetricCard key={i} {...stat} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <ChartCard title="User Growth" subtitle="Daily registration trends over the last 30 days">
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

        <ChartCard title="Trip Categories" subtitle="Distribution by trip type">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tripCategoryData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {tripCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
            {tripCategoryData.map((entry, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                {entry.name}
              </div>
            ))}
          </div>
        </ChartCard>
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
