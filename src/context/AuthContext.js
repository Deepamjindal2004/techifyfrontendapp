// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Register function
    const register = async (username, email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
            
            // Ensure response.data exists before setting user
            if (response && response.data && response.data.user) {
                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            } else {
                console.error("Unexpected response structure:", response);
            }
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
        }
    };

    // Login function
    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
    
            // Ensure response.data exists before accessing token
            if (response && response.data && response.data.token) {
                setUser(response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.token));
            } else {
                console.error("Unexpected response structure:", response);
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
