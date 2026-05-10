import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import ActionModal from '../../modals/ActionModal';

const MetricCard = ({ title, value, change, trend }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div 
      className="card" 
      style={{ flex: 1, minWidth: '240px', cursor: 'pointer' }}
      onClick={() => setShowModal(true)}
    >
      <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>
        {title}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-outfit)' }}>
          {value}
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px', 
          fontSize: '12px', 
          fontWeight: '600',
          color: trend === 'up' ? '#10b981' : 'var(--red)',
          background: trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          padding: '2px 6px',
          borderRadius: '4px'
        }}>
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
      </div>
    </div>

    <ActionModal 
      isOpen={showModal} 
      onClose={() => setShowModal(false)} 
      title={`${title} Insights`}
      message={`The current value of ${value} represents a ${change} trend. This metric is calculated based on real-time platform data aggregated over the selected period.`}
    />
    </>
  );
};

export default MetricCard;
