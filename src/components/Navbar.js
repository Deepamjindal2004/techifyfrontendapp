import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, isAuthenticated, getUser } from '../utils/auth';
import { MoonIcon, SunIcon } from 'lucide-react';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const user = loggedIn ? getUser() : null;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode); // Toggle dark mode on body
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo-container">
            <img 
              src="/techifylogo.jpg"
              alt="Techify"
              className="navbar-logo"
            />
            <h1 className="navbar-text">Techify</h1>
          </Link>
        </div>
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search listings..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {loggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/ad/new" className="nav-link">Create Ad</Link>
              </li>
              <li className="nav-item profile">
                <button onClick={toggleDropdown} className="nav-link profile-button">
                  {user ? user.name : 'Profile'}
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/profile" className="dropdown-item">Profile</Link>
                    </li>
                    <li>
                      <Link onClick={handleLogout} className="dropdown-item">Logout</Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <button onClick={toggleDarkMode} className="nav-link dark-mode-toggle">
              {isDarkMode ? <SunIcon size={24} /> : <MoonIcon size={24} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
