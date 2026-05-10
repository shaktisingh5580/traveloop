import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/ui/MetricCard';
import ChartCard from '../../components/ui/ChartCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area
} from 'recharts';

const Revenue = () => {
  const revenueData = [
    { month: 'Jan', revenue: 65000, cost: 32000 },
    { month: 'Feb', revenue: 72000, cost: 35000 },
    { month: 'Mar', revenue: 85000, cost: 40000 },
    { month: 'Apr', revenue: 98000, cost: 45000 },
    { month: 'May', revenue: 110000, cost: 52000 },
    { month: 'Jun', revenue: 125000, cost: 58000 },
  ];
  return (
    <DashboardLayout title="Revenue & Cost Metrics">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <MetricCard title="Total Revenue" value="$742,000" change="+15.2%" trend="up" />
        <MetricCard title="Total Costs" value="$295,000" change="+8.4%" trend="up" />
        <MetricCard title="Net Profit" value="$447,000" change="+22.1%" trend="up" />
        <MetricCard title="Avg Transaction" value="$156.40" change="-2.1%" trend="down" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <ChartCard title="Revenue vs Cost" subtitle="Monthly financial breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="revenue" name="Revenue" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cost" name="Cost" fill="var(--text-muted)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Profit Margin" subtitle="Trend over last 6 months">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey={(d) => d.revenue - d.cost} stroke="var(--accent)" fill="var(--accent-dim)" />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent)' }}>60.2%</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Avg. Gross Margin</div>
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default Revenue;
