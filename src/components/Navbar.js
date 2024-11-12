// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Import the CSS for Navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Techify</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
