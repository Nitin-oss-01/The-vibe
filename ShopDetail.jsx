import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const mapContainerStyle = {
width: "100%",
height: "300px",
};

const libraries = ["places"];

const ShopDetail = () => {
const { id } = useParams();
const navigate = useNavigate();

const [shop, setShop] = useState(null);
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
if (!id) {
alert("Invalid shop id");
navigate("/");
return;
}

const fetchShopDetails = async () => {
try {
// Fetch single shop details
const shopRes = await axios.get(`${API_URL}/shops/${id}`);

// Fetch products belonging to the shop
const productsRes = await axios.get(`${API_URL}/products/shop/${id}`);

// Dynamically build full image URL if needed
const baseUrl = API_URL.replace("/api", "");

setShop({
...shopRes.data,
imageUrl: shopRes.data.imageUrl?.startsWith("http")
? shopRes.data.imageUrl
: `${baseUrl}${shopRes.data.imageUrl}`,
});

// Same for product images if needed
const productsWithFullImage = productsRes.data.map((product) => ({
...product,
imageUrl: product.imageUrl?.startsWith("http")
? product.imageUrl
: `${baseUrl}${product.imageUrl}`,
}));

setProducts(productsWithFullImage);
} catch (error) {
console.error(
"Error fetching shop details or products:",
error.response?.data || error.message
);
alert("Error loading shop details");
navigate("/");
} finally {
setLoading(false);
}
};

fetchShopDetails();
}, [id, navigate]);

if (loading) {
return <div className="text-center mt-5">Loading shop details...</div>;
}

if (!shop) {
return <div className="text-center mt-5">Shop not found.</div>;
}

return (
<div className="container mt-4">
<h2 className="mb-3">{shop.name}</h2>

<div className="row">
<div className="col-md-6">
<img
src={shop.imageUrl || "https://placehold.co/600x400"}
alt={shop.name}
style={{ width: "100%", height: "auto", borderRadius: "8px" }}
/>
<p className="mt-3">{shop.description}</p>
<p>
<strong>Area:</strong> {shop.area}
</p>
<p>
<strong>Category:</strong> {shop.category || "N/A"}
</p>
</div>

<div className="col-md-6">
<h5>Location</h5>
{shop.latitude && shop.longitude ? (
<LoadScript
googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
libraries={libraries}
>
<GoogleMap
mapContainerStyle={mapContainerStyle}
center={{
lat: parseFloat(shop.latitude),
lng: parseFloat(shop.longitude),
}}
zoom={14}
>
<Marker
position={{
lat: parseFloat(shop.latitude),
lng: parseFloat(shop.longitude),
}}
label={shop.name}
/>
</GoogleMap>
</LoadScript>
) : (
<p>Location not specified</p>
)}
</div>
</div>

<hr className="my-4" />

<h4>Products</h4>
{products.length > 0 ? (
<div className="row">
{products.map((product) => (
<div className="col-md-4 mb-4" key={product._id}>
<div className="card h-100 shadow-sm">
<img
src={product.imageUrl || "https://placehold.co/600x400"}
alt={product.name}
className="card-img-top"
style={{ height: "200px", objectFit: "cover" }}
/>
<div className="card-body">
<h5 className="card-title">{product.name}</h5>
<p className="card-text">{product.description}</p>
<p>
<strong>Price: </strong> ₹{product.price}
</p>
</div>
</div>
</div>
))}
</div>
) : (
<p>No products available for this shop.</p>
)}
</div>
);
};

export default ShopDetail;
