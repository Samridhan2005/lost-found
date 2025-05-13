import React, { useState } from "react";

function ReportItemForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateReported, setDateReported] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

 const handleImageUpload = async () => {
  const cloudData = new FormData();
  cloudData.append('file', imageFile);
  cloudData.append('upload_preset', 'lostfound_preset'); // 👈 your Cloudinary preset name
  cloudData.append('cloud_name', 'dlmjxye1m'); // 👈 replace with your Cloudinary cloud name

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dlmjxye1m/image/upload', {
      method: 'POST',
      body: cloudData,
    });
    const data = await res.json();
    return data.url; // 👈 Cloudinary returns the uploaded image URL
  } catch (err) {
    console.error("Image upload failed:", err);
    return null;
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData();
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
      body: formData, // ✅ no need to set Content-Type manually
    });

    if (response.ok) {
      alert('Item reported successfully!');
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
      <h2>Report Lost/Found Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="date" value={dateReported} onChange={(e) => setDateReported(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Report Item'}
        </button>
      </form>
    </div>
  );
}

export default ReportItemForm;
