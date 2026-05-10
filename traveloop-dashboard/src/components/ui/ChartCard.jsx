import React, { useState } from 'react';
import ActionModal from '../../modals/ActionModal';

const ChartCard = ({ title, subtitle, children, height = 300 }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState('30D');

  return (
    <>
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>{title}</h3>
          {subtitle && <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{subtitle}</p>}
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['7D', '30D', '90D'].map(range => (
            <button 
              key={range} 
              className="btn btn-ghost" 
              style={{ 
                padding: '4px 8px', 
                fontSize: '11px', 
                background: selectedRange === range ? 'var(--bg-elevated)' : 'transparent',
                color: selectedRange === range ? 'var(--accent)' : 'var(--text-secondary)'
              }}
              onClick={() => { setSelectedRange(range); setShowModal(true); }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div style={{ width: '100%', height: `${height}px` }}>
        {children}
      </div>
    </div>

    <ActionModal 
      isOpen={showModal} 
      onClose={() => setShowModal(false)} 
      title="Time Range Updated"
      message={`The ${title} is now filtering data for the last ${selectedRange}. In a live environment, this would trigger a new API fetch for the specific period.`}
    />
    </>
  );
};

export default ChartCard;
