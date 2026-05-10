import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children, title }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <Header title={title} />
        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
