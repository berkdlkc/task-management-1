// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
// import AdminDashboard from './components/admin/AdminDashboard';
// import UserDashboard from './components/user/UserDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

      </Routes>
    </Router>
  );
};

export default App;
