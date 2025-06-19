import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear role and redirect to login
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="nav-header">
      <h2>E-Waste Portal</h2>
      <nav>
        <ul>
          {role === 'user' && <li><Link to="/user">Dashboard</Link></li>}
          {role === 'recycler' && <li><Link to="/recycler">Dashboard</Link></li>}
          {role === 'admin' && <li><Link to="/admin">Dashboard</Link></li>}
          
          <li><Link to="/awareness">Awareness</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
