import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
    const location = useLocation();
    const username = location.state?.username || 'Admin';
    const navigate = useNavigate();
    
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px' }}>
          <div>
              <h1>Admin Dashboard</h1>
              <p>Welcome, {username}</p>
          </div>
          <button 
              onClick={handleLogout} 
              style={{ 
                  padding: '10px 20px', 
                  backgroundColor: '#f44336', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer'
              }}
          >
              Çıkış
          </button>
      </div>
  );
};

export default AdminDashboard;
