// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdDetails from './pages/AdDetails';
import AdForm from './pages/AdForm';
import ProtectedRoute from './components/ProtectedRoute';
import SearchResults from './pages/SearchResults'; // Import SearchResults
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ad/:id" element={<AdDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route 
            path="/ad/new" 
            element={
              <ProtectedRoute>
                <AdForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ad/:id/edit" 
            element={
              <ProtectedRoute>
                <AdForm />
              </ProtectedRoute>
            } 
          />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
