import React, { useEffect, useState } from 'react';
import './ItemsGrid.css';

function FoundItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const res = await fetch('http://localhost:8080/items/found');
        const data = await res.json();
        if (Array.isArray(data)) setItems(data);
      } catch (err) {
        console.error('Error fetching found items:', err);
        setItems([]);
      }
    };

    fetchFoundItems();
  }, []);

  return (
    <div className="grid-container">
      <h2>Found Items</h2>
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

export default FoundItemsPage;
