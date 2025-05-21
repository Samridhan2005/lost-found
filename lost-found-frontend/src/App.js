import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ReportItemForm from './ReportItemForm';
import HomePage from './HomePage'; 
import LostItemsPage from './LostItemsPage';
import FoundItemsPage from './FoundItemsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/report" element={<ReportItemForm />} />
        <Route path="/lost-items" element={<LostItemsPage />} />
        <Route path="/found-items" element={<FoundItemsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
