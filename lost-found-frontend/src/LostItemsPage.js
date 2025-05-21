import React, { useEffect, useState } from 'react';

function LostItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const res = await fetch('http://localhost:8080/items/lost');
        const data = await res.json();

        // Check and ensure it's an array before setting state
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.warn('Expected array but got:', data);
          setItems([]); // fallback
        }
      } catch (err) {
        console.error('Failed to fetch lost items:', err);
        setItems([]);
      }
    };

    fetchLostItems();
  }, []);

  return (
    <div className="items-grid">
      {items.map((item, index) => (
        <div className="item-card" key={index}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Category: {item.category}</p>
          <p>Location: {item.location}</p>
          <button onClick={() => window.open(item.imageUrl, '_blank')}>View Product</button>
        </div>
      ))}
    </div>
  );
}

export default LostItemsPage;
