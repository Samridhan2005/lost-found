import React, { useEffect, useState } from 'react';
import './ItemsGrid.css';

function LostItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const res = await fetch('http://localhost:8080/items/lost');
        const data = await res.json();
        if (Array.isArray(data)) setItems(data);
      } catch (err) {
        console.error('Failed to fetch lost items:', err);
        setItems([]);
      }
    };

    fetchLostItems();
  }, []);

  return (
    <div className="grid-container">
      <h2>Lost Items</h2>
      <div className="grid">
        {items.map((item) => (
          <div className="grid-item" key={item.id}>
            <h3>{item.name}</h3>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Description:</strong> {item.description}</p>
            {item.imageUrl && (
              <div className="image-container">
                <img src={item.imageUrl} alt={item.name} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LostItemsPage;
