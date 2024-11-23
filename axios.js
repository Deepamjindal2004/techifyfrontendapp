// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://techifybackendapi.onrender.com/',  // Your backend URL
});

export default axiosInstance;