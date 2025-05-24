import React, { useEffect, useState } from 'react';
import './ItemsGrid.css';

function LostItemsPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const res = await fetch('http://localhost:8080/items/lost');
        const data = await res.json();

        if (Array.isArray(data)) {
          setItems(data);
          setFilteredItems(data); // initialize with all
        }
      } catch (err) {
        console.error('Failed to fetch lost items:', err);
      }
    };

    fetchLostItems();
  }, []);

  useEffect(() => {
    let filtered = items;

    if (categoryFilter) {
      filtered = filtered.filter(item =>
        item.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(item =>
        item.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [categoryFilter, locationFilter, items]);

  return (
    <div className="page-container">
      <h2>Lost Items</h2>

      <div className="filters">
        <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Stationery">Stationery</option>
          <option value="Accessories">Accessories</option>
          <option value="ID Cards">ID Cards</option>
          <option value="Books">Books</option>
          {/* Add more categories as needed */}
        </select>

        <input
          type="text"
          placeholder="Filter by Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      <div className="grid">
        {filteredItems.map((item, index) => (
          <div className="grid-item" key={index}>
            <h3>{item.name}</h3>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <img src={item.imageUrl} alt={item.name} className="item-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LostItemsPage;
