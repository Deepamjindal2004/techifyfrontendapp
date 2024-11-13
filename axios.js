// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',  // Your backend URL
});

export default axiosInstance;