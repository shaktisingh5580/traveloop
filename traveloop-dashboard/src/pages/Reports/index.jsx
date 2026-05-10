import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/ui/MetricCard';
import { FileText, Download, Clock, Filter } from 'lucide-react';
import ReportModal from '../../modals/ReportModal';
import ActionModal from '../../modals/ActionModal';

const Reports = () => {
  const [isGenModalOpen, setIsGenModalOpen] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(null);

  const reports = [
    { title: 'Monthly Financial Summary', date: 'May 2024', size: '2.4 MB', type: 'PDF' },
    { title: 'User Growth Q1 Analysis', date: 'Apr 2024', size: '1.8 MB', type: 'CSV' },
    { title: 'Community Moderation Log', date: 'May 2024', size: '840 KB', type: 'JSON' },
    { title: 'System Performance Audit', date: 'Mar 2024', size: '3.1 MB', type: 'PDF' },
  ];

  return (
    <DashboardLayout title="Reports & Exports">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <MetricCard title="Total Exports" value="1,245" change="+5.2%" trend="up" />
        <MetricCard title="Scheduled" value="12" change="0" trend="up" />
        <MetricCard title="Storage Used" value="4.2 GB" change="+1.2%" trend="up" />
        <MetricCard title="Last Backup" value="2h ago" change="Success" trend="up" />
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Recent Reports</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-ghost" style={{ fontSize: '13px' }}><Filter size={14} /> Filter</button>
            <button className="btn btn-primary" onClick={() => setIsGenModalOpen(true)} style={{ fontSize: '13px' }}>Generate New Report</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reports.map((report, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-base)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--bg-elevated)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{report.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '12px', marginTop: '2px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {report.date}</span>
                    <span>{report.size}</span>
                    <span style={{ color: 'var(--accent)' }}>{report.type}</span>
                  </div>
                </div>
              </div>
              <button 
                className="btn btn-ghost" 
                style={{ padding: '8px', color: 'var(--text-primary)' }}
                onClick={() => setDownloadingReport(report)}
              >
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <ReportModal isOpen={isGenModalOpen} onClose={() => setIsGenModalOpen(false)} />
      <ActionModal 
        isOpen={!!downloadingReport} 
        onClose={() => setDownloadingReport(null)} 
        title="Download Started" 
        message={downloadingReport ? `Your report "${downloadingReport.title}" is being prepared for download in ${downloadingReport.type} format. It will start automatically in a few seconds.` : ""}
      />
    </DashboardLayout>
  );
};

export default Reports;
