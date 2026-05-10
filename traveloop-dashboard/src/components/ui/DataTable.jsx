import React from 'react';

const DataTable = ({ columns, data }) => {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {columns.map((col, i) => (
              <th key={i} style={{ 
                padding: '12px 16px', 
                textAlign: 'left', 
                color: 'var(--text-secondary)', 
                fontWeight: '500' 
              }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="table-row-hover">
              {columns.map((col, j) => (
                <td key={j} style={{ padding: '12px 16px', color: 'var(--text-primary)' }}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .table-row-hover:hover {
          background: var(--bg-elevated);
        }
      `}</style>
    </div>
  );
};

export default DataTable;
