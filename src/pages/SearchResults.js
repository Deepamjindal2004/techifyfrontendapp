import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../services/api';
import '../css/SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  // Extract query parameter from URL
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        setError('Please enter a search query.');
        return;
      }

      try {
        const response = await axios.get(`/ads/search?search=${query}`);
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching search results:', err);
        if (err.response && err.response.status === 404) {
          setError('No results found.');
        } else {
          setError('An error occurred while fetching results.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading)
    return (
      <div className="loading-container">
        <p>Loading search results...</p>
        <div className="spinner"></div>
      </div>
    );

  if (error)
    return (
      <div className="search-results-container">
        <h1>Search Results</h1>
        <p className="error">{error}</p>
      </div>
    );

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <ul className="search-results-list">
          {results.map((ad) => (
            <li key={ad._id} className="search-result-item">
              <h3>{ad.title}</h3>
              <p>{ad.description}</p>
              <p>Price: ${ad.price}</p>
              <a href={`/ad/${ad._id}`} className="view-details-link">
                View Details
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;
