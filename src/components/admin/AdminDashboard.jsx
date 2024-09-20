import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
    const location = useLocation();
    const username = location.state?.username || 'Admin';

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {username}!</p>
    </div>
  );
};

export default AdminDashboard;
