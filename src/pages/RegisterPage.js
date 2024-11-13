import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import '../css/RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = zxcvbn(newPassword);
    setPasswordStrength(strength.score);
  };

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

  const getPasswordStrengthMessage = (score) => {
    switch (score) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
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
          onChange={handlePasswordChange} 
          required 
        />
        <p>Password Strength: {getPasswordStrengthMessage(passwordStrength)}</p>
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
        <Link to="/login" className="redirect-link">Already have an account? Login here</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
