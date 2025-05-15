import React, { useState } from "react";

function ReportItemForm() {
  const [itemType, setItemType] = useState('lost'); // lost or found
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateReported, setDateReported] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('type', itemType); // 👈 Add item type
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('dateReported', dateReported || new Date().toISOString());
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('http://localhost:8080/items/report', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert(`${itemType === 'lost' ? 'Lost' : 'Found'} item reported successfully!`);
        // reset all
        setItemType('lost');
        setName('');
        setCategory('');
        setDescription('');
        setLocation('');
        setDateReported('');
        setImageFile(null);
      } else {
        alert('Failed to report item.');
      }
    } catch (error) {
      console.error("Error while reporting item:", error);
      alert('Error occurred while reporting the item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Report Lost or Found Item</h2>
      <form onSubmit={handleSubmit}>
        <select value={itemType} onChange={(e) => setItemType(e.target.value)} required>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="date" value={dateReported} onChange={(e) => setDateReported(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : `Report ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} Item`}
        </button>
      </form>
    </div>
  );
}

export default ReportItemForm;
