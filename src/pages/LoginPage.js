// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../css/LoginPage.css';
import { setToken } from '../services/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', { username, password });
      if (response.status === 200) {
        setToken(response.data.token); // Store token in localStorage
        navigate('/'); // Redirect to home page after successful login
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
        <Link to="/register" className="redirect-link">Don't have an account? Register here</Link>
      </form>
    </div>
  );
};

export default LoginPage;
