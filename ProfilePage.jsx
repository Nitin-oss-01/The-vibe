import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchShops } from "../services/authservice";
import ShopCard from "../components/ShopCard"; // ✅ Ensure this path is correct

const ProfilePage = () => {
const navigate = useNavigate();
const [shops, setShops] = useState([]);
const [loading, setLoading] = useState(true);
const [userLocation, setUserLocation] = useState(null);

useEffect(() => {
const token = localStorage.getItem("token");
if (!token) {
alert("Please log in or sign up first.");
navigate("/login");
return;
}

// Get user's current location
navigator.geolocation.getCurrentPosition(
(position) => {
setUserLocation({
lat: position.coords.latitude,
lng: position.coords.longitude,
});
},
(err) => {
console.error("Location access denied", err);
}
);

// Fetch shops
const fetchData = async () => {
try {
const fetchedShops = await fetchShops();
const updatedShops = fetchedShops.map((shop) => ({
...shop,
imageUrl: shop.imageUrl?.startsWith("http")
? shop.imageUrl
: `http://localhost:5000${shop.imageUrl}`,
}));
setShops(updatedShops);
} catch (err) {
console.error("Error fetching profile data", err);
} finally {
setLoading(false);
}
};

fetchData();
}, [navigate]);

// Delete shop
const handleDelete = async (shopId) => {
if (!window.confirm("Are you sure you want to delete this shop?")) return;

try {
const token = localStorage.getItem("token");
if (!token) throw new Error("No token found. Please login.");

const res = await fetch(
`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/shops/${shopId}`,
{
method: "DELETE",
headers: {
Authorization: `Bearer ${token}`,
},
}
);

if (!res.ok) {
throw new Error("Failed to delete shop");
}

setShops((prevShops) => prevShops.filter((shop) => shop._id !== shopId));
} catch (err) {
console.error("Failed to delete shop:", err);
alert("Failed to delete the shop. Try again later.");
}
};

if (loading) return <div className="text-center mt-5">Loading...</div>;

return (
<div className="container mt-4">
<h2 className="mb-4 fw-bold text-center">My Shop Profile</h2>

{shops.length > 0 ? (
<div className="row g-4">
{shops.map((shop, index) => (
<div className="col-md-6 col-lg-4" key={shop._id || index}>
<ShopCard shop={shop} isOwner={true} onDelete={handleDelete} />
<div className="text-center mt-2">
{/* <button
  className="btn btn-success btn-sm"
  onClick={() => navigate(`/AddProduct/${shop._id}`)}
>
  Add Product
</button> */}
</div>
</div>
))}
</div>
) : (
<p className="text-center text-muted">
You haven't created any shops yet.
</p>
)}

<div className="text-center mt-5">
<button
className="btn btn-primary px-4 py-2"
onClick={() => navigate("/dashboard")}
>
Add New Shop
</button>
</div>
</div>
);
};

export default ProfilePage;
