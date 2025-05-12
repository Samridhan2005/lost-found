import React, { useState } from 'react';
import './FormStyles.css';

function ReportItemForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateReported, setDateReported] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = {
      name,
      category,
      description,
      location,
      dateReported: dateReported || new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:8080/items/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      });

      if (response.ok) {
        alert('Item reported successfully!');
      } else {
        alert('Failed to report item.');
      }
    } catch (error) {
      console.error("Error while reporting item:", error);
      alert('Error occurred while reporting the item.');
    }
  };

  return (
    <div className="form-container">
      <h2>Report Lost Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date Reported:</label>
          <input
            type="datetime-local"
            value={dateReported}
            onChange={(e) => setDateReported(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReportItemForm;
