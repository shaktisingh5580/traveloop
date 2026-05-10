import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/ui/MetricCard';
import ChartCard from '../../components/ui/ChartCard';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { tripAnalyticsData } from '../../data/mockData';

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];

const TripAnalytics = () => {
  return (
    <DashboardLayout title="Trip Analytics">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <MetricCard title="Trips This Month" value="1,240" change="+12.5%" trend="up" />
        <MetricCard title="Avg Trip Budget" value="$2,450" change="+5.2%" trend="up" />
        <MetricCard title="Success Rate" value="98.2%" change="+0.4%" trend="up" />
        <MetricCard title="Cancellations" value="12" change="-15.0%" trend="up" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <ChartCard title="Trip Status Distribution" subtitle="All-time trip lifecycle breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tripAnalyticsData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="status"
              >
                {tripAnalyticsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Popular Destinations Volume" subtitle="Top regions by trip count">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { region: 'Europe', count: 450 },
              { region: 'Asia', count: 320 },
              { region: 'N. America', count: 280 },
              { region: 'S. America', count: 150 },
            ]}>
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
