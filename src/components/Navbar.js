import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const NavBar = () => {
    const navigate = useNavigate();

    // Check if token exists in localStorage to determine login status
    const isLoggedIn = localStorage.getItem('token') ? true : false;

    const handleLogout = () => {
        // Remove token from localStorage on logout
        localStorage.removeItem('token');
        navigate('/'); // Redirect to home page or login page after logout
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isLoggedIn ? (
                    // Show Logout link when the user is logged in
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    // Show Login and Register links when the user is not logged in
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
