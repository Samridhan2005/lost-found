import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ReportItemForm from './ReportItemForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/report" element={<ReportItemForm />} />
      </Routes>
    </Router>
  );
}

export default App;
