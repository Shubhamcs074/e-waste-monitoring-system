import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = ({ role }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="nav-header">
      <div className="nav-left">
        <h2>E-Waste Portal</h2>
        <span className={`role-badge ${role}`}>{role?.toUpperCase()}</span>
      </div>

      <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <ul>
          {role === 'user' && <li><Link to="/user">Dashboard</Link></li>}
          {role === 'recycler' && <li><Link to="/recycler">Dashboard</Link></li>}
          {role === 'admin' && (
            <>
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/analytics">Analytics</Link></li>
            </>
          )}
          <li><Link to="/awareness">Awareness</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
