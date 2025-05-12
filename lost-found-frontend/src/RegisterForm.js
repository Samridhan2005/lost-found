import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'USER' })
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/report');
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error occurred during registration.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
        <div className="redirect-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
