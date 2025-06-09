// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createShop } from "../services/authService";
import LocationPicker from "../components/LocationPicker";

const Dashboard = () => {
const navigate = useNavigate();

const [shopData, setShopData] = useState({
name: "",
description: "",
products: [],
image: null,
});

const [productInput, setProductInput] = useState("");
const [error, setError] = useState(null);
const [successMessage, setSuccessMessage] = useState("");
const [coordinates, setCoordinates] = useState(null);
const [address, setAddress] = useState("");

useEffect(() => {
const token = localStorage.getItem("token");
if (!token) {
alert("You must be logged in to access the dashboard.");
navigate("/login");
}
}, [navigate]);

useEffect(() => {
if (!coordinates) {
navigator.geolocation.getCurrentPosition(
(pos) => {
  const { latitude, longitude } = pos.coords;
  setCoordinates({ lat: latitude, lng: longitude });
  setAddress(`Lat: ${latitude}, Lng: ${longitude}`);
},
(err) => {
  console.warn("Location access denied or unavailable", err);
  setAddress("Unable to access current location.");
}
);
}
}, [coordinates]);

const handleInputChange = (e) => {
const { name, value } = e.target;
setShopData((prev) => ({ ...prev, [name]: value }));
};

const handleProductAdd = () => {
if (productInput.trim()) {
setShopData((prev) => ({
...prev,
products: [...prev.products, productInput.trim()],
}));
setProductInput("");
}
};

const handleImageChange = (e) => {
setShopData((prev) => ({ ...prev, image: e.target.files[0] }));
};

const handleLocationSelect = ({ lat, lng, address }) => {
setCoordinates({ lat, lng });
setAddress(address || `Lat: ${lat}, Lng: ${lng}`);
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
const formData = new FormData();
formData.append("name", shopData.name);
formData.append("description", shopData.description);
if (shopData.image) {
formData.append("image", shopData.image);
}
formData.append("products", JSON.stringify(shopData.products));
if (coordinates) {
formData.append("latitude", coordinates.lat);
formData.append("longitude", coordinates.lng);
}
if (address) {
formData.append("address", address);
}

const result = await createShop(formData);
console.log("Shop created:", result);
setSuccessMessage("Shop created successfully!");
setShopData({ name: "", description: "", products: [], image: null });
setCoordinates(null);
setAddress("");
} catch (err) {
console.error(err);
setError("Failed to create shop");
}
};

return (
<div className="container mt-4">
<h2>Create a Shop</h2>
<form onSubmit={handleSubmit} encType="multipart/form-data">
<div className="mb-3">
  <label>Shop Name</label>
  <input
    type="text"
    name="name"
    value={shopData.name}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Enter shop name"
  />
</div>

<div className="mb-3">
  <label>Description</label>
  <input
    type="text"
    name="description"
    value={shopData.description}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Enter description"
  />
</div>

<div className="mb-3">
  <label>Select Shop Location</label>
  <LocationPicker onLocationSelect={handleLocationSelect} />
  {address && (
    <div className="mt-2">
      <strong>Selected Address:</strong> {address}
    </div>
  )}
</div>

<div className="mb-3">
  <label>Products</label>
  <input
    type="text"
    value={productInput}
    onChange={(e) => setProductInput(e.target.value)}
    className="form-control"
    placeholder="Add product"
  />
  {/* <button
    type="button"
    onClick={handleProductAdd}
    className="btn btn-secondary mt-2"
  >
    Add Product
  </button> */}
  <ul className="mt-2">
    {shopData.products.map((prod, i) => (
      <li key={i}>{prod}</li>
    ))}
  </ul>
</div>

<div className="mb-3">
  <label>Shop Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="form-control"
  />
</div>

<button type="submit" className="btn btn-primary">
  Create Shop
</button>
</form>

{successMessage && <p className="text-success mt-3">{successMessage}</p>}
{error && <p className="text-danger mt-3">{error}</p>}
</div>
);
};

export default Dashboard;
