import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
    const location = useLocation();
    const username = location.state?.username || 'Admin';
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    const toggleSidebar = () =>{
   
      setIsActive(!isActive)
      console.log("Sidebar toggle clicked!", isActive);
    }

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    };
  
    return (
      <>
      <div className={`sidebar ${isActive ? 'active': ''}`}>
        <div className='logo_content'>
          <div className='logo'>
            <i className='bx bxs-analyse'></i>
            <div className='logo_name'>TaskSystem</div>
          </div>
          <i className='bx bx-menu' id='btn' onClick={toggleSidebar}></i>
        </div>
        <ul className="nav_list">
          <li>
              <i className='bx bx-search' onClick={toggleSidebar}></i>
              <input type="text" placeholder='Search...' />
              <span className="tooltip">Search</span>
          </li>

          <li>
            <a href=''>
              <i className='bx bx-grid'></i>
              <span className="links_name">Dashboard</span> 
            </a>
            <span className="tooltip">Dashboard</span>
          </li>

          <li>
            <a href=''>
              <i className='bx bx-user'></i>
              <span className="links_name">Users</span> 
            </a> 
            <span className="tooltip">Users</span>
          </li>

          <li>
            <a href=''>
              <i className='bx bx-task'></i>
              <span className="links_name">Tasks</span> 
            </a>
            <span className="tooltip">Tasks</span>
          </li>

          <li>
            <a href=''>
              <i className='bx bx-chat' ></i>
              <span className="links_name">Messages</span> 
            </a> 
            <span className="tooltip">Messages</span>
          </li>

          <li>
            <a href=''>
              <i className='bx bx-cog' ></i>
              <span className="links_name">Setting</span> 
            </a> 
            <span className="tooltip">Setting</span>
          </li>
        </ul>
        
        <div className="profile_content">
          <div className="profile">
            <div className="profile_details">
              <img src="profile.jpg" alt="" className="" />
              <div className="name_job">
                <div className="name">{username}</div>
                <div className="job">Frontend Dev.</div>
              </div>
            </div>
            <i className='bx bx-log-out' id='log_out' onClick={handleLogout}></i>
          </div>
        </div>

        <div className="home_content">
          <div className="text">Admin Content</div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
