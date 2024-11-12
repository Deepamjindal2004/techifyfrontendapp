// src/utils/auth.js

// Function to set token in localStorage
export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Function to get token from localStorage
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Function to remove token from localStorage (for logout)
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  // Function to check if user is authenticated
  export const isAuthenticated = () => {
    return !!getToken();
  };
  