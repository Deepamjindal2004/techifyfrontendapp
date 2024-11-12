import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Corrected usage of navigate instead of history.push

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending data to API for registration
      const response = await axios.post('http://localhost:3000/api/users/register', { username, password, email });

      // Check if the registration was successful
      if (response.status === 201) {  // 201 is the standard success code for resource creation
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      // Log the error for debugging purposes
      console.error('Error during registration:', err);

      // Check if the error has a response from the backend
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed or error occurred.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default RegisterPage;
