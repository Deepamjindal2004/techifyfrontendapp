// src/pages/Dashboard.js
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [ads, setAds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            const fetchAds = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/ads', {
                        headers: { Authorization: `Bearer ${user.token}` },
                    });
                    setAds(response.data);
                } catch (error) {
                    console.error('Error fetching ads', error);
                }
            };

            fetchAds();
        }
    }, [user, navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Your Ads</h3>
            <ul>
                {ads.map((ad) => (
                    <li key={ad._id}>{ad.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
