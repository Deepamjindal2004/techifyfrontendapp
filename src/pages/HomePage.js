// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';
import '../css/HomePage.css';

const HomePage = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('/ads');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="home-page">
      <h1>All Listings</h1>
      <div className="ads-list">
        {ads.map((ad) => (
          <div className="ad-card" key={ad._id}>
            {/* Display the ad image if available */}
            <div className="ad-image-container">
              {ad.image && <img src={ad.image} alt={ad.title} className="ad-image-preview" />}
            </div>
            <h3>{ad.title}</h3>
            <p>{ad.description.length > 100 ? `${ad.description.substring(0, 100)}...` : ad.description}</p>
            <p className="price">Price: ${ad.price}</p>
            <Link to={`/ad/${ad._id}`} className="view-details-button">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
