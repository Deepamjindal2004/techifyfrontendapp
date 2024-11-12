// src/utils/auth.js

// Function to set user data in localStorage
export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  // Function to get user data from localStorage
  export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
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
  