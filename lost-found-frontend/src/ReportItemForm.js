import React, { useState, useEffect } from "react";
import './reportitemform.css';
import { useNavigate } from 'react-router-dom';

function ReportItemForm() {
  const [itemType, setItemType] = useState('lost');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateReported, setDateReported] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();


  // Fetch email from localStorage (or context) on component mount
  useEffect(() => {
    const emailFromStorage = localStorage.getItem("userEmail");
    if (emailFromStorage) {
      setUserEmail(emailFromStorage);
    } else {
      alert("You are not logged in. Please log in to report an item.");
      navigate('/login');
      // Optionally redirect to login
    }
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    alert("User email not found. Please log in again.");
    navigate('/login');
    return;
  }

  const formData = new FormData();
  formData.append('type', itemType);
  formData.append('name', name);
  const finalCategory = category === "Others" ? customCategory : category;
  formData.append('category', finalCategory);
  formData.append('description', description);
  formData.append('location', location);
  formData.append('dateReported', dateReported || new Date().toISOString());
  formData.append('userEmail', userEmail); // ✅ Automatically include stored email
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

        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
          <option value="ID Cards">ID Cards</option>
          <option value="Stationery">Stationery</option>
          <option value="Others">Others</option>
        </select>

        {category === "Others" && (
          <input
            type="text"
            placeholder="Specify the Category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            required
          />
        )}

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
