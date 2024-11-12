// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../css/RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/register', { username, password, email });
      if (response.status === 201) {
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        setError('Registration failed, please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
        <Link to="/login" className="redirect-link">Already have an account? Login here</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
