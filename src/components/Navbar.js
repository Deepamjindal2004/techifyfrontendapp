// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, isAuthenticated } from '../utils/auth';
import '../css/Navbar.css'; // Import the CSS file for styling

const NavBar = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    removeToken();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Techify</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {loggedIn ? (
          <>
            <li>
              <Link to="/ad/new">Create Ad</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
