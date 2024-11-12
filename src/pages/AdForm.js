// src/pages/AdForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../services/api';
import '../css/AdForm.css';
import { isAuthenticated } from '../utils/auth';

const AdForm = () => {
  const { id } = useParams(); // If id exists, it's an edit form
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchAd = async () => {
        try {
          const response = await axios.get(`/ads/${id}`);
          const ad = response.data;

          // Check if the logged-in user is the owner of the ad
          const tokenPayload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
          if (ad.userId !== tokenPayload.id) {
            setError('You are not authorized to edit this ad.');
            return;
          }

          setTitle(ad.title);
          setDescription(ad.description);
          setPrice(ad.price);
          setEndDate(ad.endDate.slice(0, 10)); // Format date for input
        } catch (error) {
          console.error('Error fetching ad:', error);
          setError('Failed to load ad details.');
        }
      };

      fetchAd();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adData = { title, description, price, endDate };
      if (id) {
        // Update existing ad
        await axios.put(`/ads/${id}`, adData);
        navigate(`/ad/${id}`);
      } else {
        // Create new ad
        await axios.post('/ads', adData);
        navigate('/');
      }
    } catch (err) {
      console.error('Error submitting ad:', err);
      setError('An error occurred while submitting the ad.');
    }
  };

  if (id && error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="ad-form-container">
      <form className="ad-form" onSubmit={handleSubmit}>
        <h2>{id ? 'Edit Ad' : 'Create Ad'}</h2>
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />

        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        ></textarea>

        <label>Price ($):</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          min="0"
          step="0.01"
        />

        <label>End Date:</label>
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          required 
        />

        <button type="submit">{id ? 'Update Ad' : 'Create Ad'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AdForm;
