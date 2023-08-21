import React, { useState } from 'react';
import '../Admin/Style.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function OwnerSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const location = useLocation();

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="bar">
      <h1 className="text-primary ">
            <i className="fa fa-utensils me-3"></i>FineDine
          </h1>
      <button className="toggle-btn" onClick={handleToggle}>
        <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      </div>
      <nav id="sidebar" className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-content">

          <ul className="sidebar-nav text-uppercase">
            <li className="sidebar-header">Pages</li>

            <Link to="/admin" className={`nav-item sidebar-link nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            <i class="fa fa-bars mr-3" aria-hidden="true"></i>Dashboard
            </Link>
            <Link to="/admin/restaurants" className={`nav-item sidebar-link nav-link ${location.pathname === '/admin/restaurants' ? 'active' : ''}`}>
            <i class="fa fa-cutlery mr-3" aria-hidden="true"></i>Restaurant
            </Link>
            <Link to="/admin/users" className={`nav-item sidebar-link nav-link ${location.pathname === '/admin/users' ? 'active' : ''}`}>
            <i class="fa fa-users mr-3" aria-hidden="true"></i>Users
            </Link>
            <Link to="/" className='nav-item sidebar-link nav-link' >
            <i class="fa fa-backward mr-3" aria-hidden="true"></i>Site
            </Link>

            {/* Add other sidebar items as needed */}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default OwnerSidebar;
