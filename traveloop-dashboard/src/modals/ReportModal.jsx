import React from 'react';
import BaseModal from './BaseModal';

const ReportModal = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Generate New Report">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Report Type</label>
          <select style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '10px',
            color: 'var(--text-primary)',
            outline: 'none'
          }}>
            <option>Financial Summary</option>
            <option>User Growth Analysis</option>
            <option>Trip Performance</option>
            <option>Community Engagement</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Date Range</label>
          <select style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '10px',
            color: 'var(--text-primary)',
            outline: 'none'
          }}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Year to Date</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Export Format</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['PDF', 'CSV', 'JSON'].map(format => (
              <label key={format} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="radio" name="format" defaultChecked={format === 'PDF'} />
                <span style={{ fontSize: '13px' }}>{format}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose}>Generate</button>
          <button onClick={onClose} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ReportModal;
