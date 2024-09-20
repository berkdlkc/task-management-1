// Kullanıcı kontrol paneli bileşeni

import React from 'react';

const UserDashboard = () => {
    const location = useLocation();
    const username = location.state?.username || 'User';

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {username}</p>
    </div>
  );
};

export default UserDashboard;
