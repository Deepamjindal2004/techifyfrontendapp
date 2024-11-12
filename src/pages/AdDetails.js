// src/pages/AdDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../services/api';
import '../css/AdDetails.css';
import { isAuthenticated } from '../utils/auth';

const AdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(`/ads/${id}`);
        setAd(response.data);
      } catch (error) {
        console.error('Error fetching ad:', error);
        setError('Failed to load ad details.');
      }
    };

    fetchAd();
  }, [id]);

  const handleSendMessage = () => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      // Implement messaging logic here
      alert('Message functionality is under development!');
    }
  };

  const handleBuyItem = () => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      // Implement buy logic here
      alert('Buy functionality is under development!');
    }
  };

  if (!ad) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ad-details-container">
      <div className="ad-details">
        <h2>{ad.title}</h2>
        <p>{ad.description}</p>
        <p className="price">Price: ${ad.price}</p>
        <p className="dates">Available until: {new Date(ad.endDate).toLocaleDateString()}</p>
        {ad.image && <img src={ad.image} alt={ad.title} className="ad-image" />}
        <div className="ad-actions">
          <button onClick={handleSendMessage}>Send Message</button>
          <button onClick={handleBuyItem}>Buy Item</button>
          {isAuthenticated() && isAdOwner(ad.userId) && (
            <Link to={`/ad/${ad._id}/edit`} className="edit-button">Edit Ad</Link>
          )}
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

// Helper function to check if the current user is the owner of the ad
const isAdOwner = (ownerId) => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id === ownerId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

export default AdDetails;
