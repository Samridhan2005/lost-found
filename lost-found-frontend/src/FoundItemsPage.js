import React, { useEffect, useState } from 'react';
import './ItemsGrid.css'; // ✅ Reusing the same CSS as LostItemsPage

function FoundItemsPage() {
  const [items, setItems] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const res = await fetch('http://localhost:8080/items/found');
        const data = await res.json();

        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.warn('Expected array but got:', data);
          setItems([]); // Fallback to empty list
        }
      } catch (err) {
        console.error('Error fetching found items:', err);
        setItems([]);
      }
    };

    fetchFoundItems();
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
            {expandedItemId === item.id && item.imageUrl && (
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
