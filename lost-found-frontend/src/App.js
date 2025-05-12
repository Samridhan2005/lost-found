import React, { useState } from "react";
import './App.css';

function App() {
  // Declare state variables
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateReported, setDateReported] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = {
      name,
      category,
      description,
      location,
      dateReported: dateReported || new Date().toISOString() // Set current date if not provided
    };

    // Post data to backend API
    try {
      const response = await fetch('http://localhost:8080/items/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    <div className="App">
      <h1>Lost and Found - Report Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Item Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="dateReported">Date Reported:</label>
          <input
            type="datetime-local"
            id="dateReported"
            value={dateReported}
            onChange={(e) => setDateReported(e.target.value)}
          />
        </div>

        <button type="submit">Report Item</button>
      </form>
    </div>
  );
}

export default App;
