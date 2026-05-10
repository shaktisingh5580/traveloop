import React from 'react';
import BaseModal from './BaseModal';

const ActionModal = ({ isOpen, onClose, title, message }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
          {message}
        </p>
        <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose}>Acknowledge</button>
          <button onClick={onClose} className="btn btn-ghost" style={{ flex: 1 }}>Close</button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ActionModal;
