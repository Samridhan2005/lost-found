// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Lost & Found</h1>
      <div className="button-group">
        <button onClick={() => navigate('/report')}>Report Item</button>
        <button onClick={() => navigate('/lost-items')}>View Lost Items</button>
        <button onClick={() => navigate('/found-items')}>View Found Items</button>
      </div>
    </div>
  );
}

export default HomePage;
