// FoundItemsPage.js
import React, { useEffect, useState } from 'react';
import './ItemsGrid.css'; // ✅ Reusing the same CSS as LostItemsPage

function FoundItemsPage() {
  const [items, setItems] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/items/found')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching found items:', err));
  }, []);

  const handleViewImage = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

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
            <button onClick={() => handleViewImage(item.id)}>
              {expandedItemId === item.id ? 'Hide Image' : 'View Product'}
            </button>
            {expandedItemId === item.id && (
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
