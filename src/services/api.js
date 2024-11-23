// src/services/api.js
import axios from 'axios';

// Set Axios default base URL
axios.defaults.baseURL = 'https://techifybackendapi.onrender.com/api';

// Function to set token in local storage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Function to get token from local storage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Function to remove token from local storage (e.g., on logout)
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Add Authorization header to Axios requests if token exists
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
