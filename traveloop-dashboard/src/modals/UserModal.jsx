import React from 'react';
import BaseModal from './BaseModal';

const UserModal = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add New User">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Full Name</label>
          <input 
            type="text" 
            placeholder="e.g. John Doe"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '10px',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Email Address</label>
          <input 
            type="email" 
            placeholder="john@example.com"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '10px',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Role</label>
          <select style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '10px',
            color: 'var(--text-primary)',
            outline: 'none'
          }}>
            <option>Basic User</option>
            <option>Premium User</option>
            <option>Administrator</option>
          </select>
        </div>
        <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" style={{ flex: 1 }}>Create User</button>
          <button onClick={onClose} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
        </div>
      </div>
    </BaseModal>
  );
};

export default UserModal;
