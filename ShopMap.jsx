// src/components/ShopMap.jsx
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
width: "100%",
height: "500px",
};

const defaultCenter = {
lat: 20.5937,
lng: 78.9629, // Center of India or fallback
};

const ShopMap = ({ shops }) => {
const [userLocation, setUserLocation] = useState(null);

// Load Google Maps
const { isLoaded } = useJsApiLoader({
googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
});

// Get current user's location
useEffect(() => {
navigator.geolocation.getCurrentPosition(
(position) => {
setUserLocation({
lat: position.coords.latitude,
lng: position.coords.longitude,
});
},
(error) => {
console.warn("User location error:", error);
}
);
}, []);

if (!isLoaded) return <div>Loading Map...</div>;

return (
<GoogleMap
mapContainerStyle={containerStyle}
center={userLocation || defaultCenter}
zoom={5}
>
{/* User location marker */}
{userLocation && (
<Marker
position={userLocation}
icon={{
url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
}}
title="Your Location"
/>
)}

{/* Shop markers */}
{shops.map((shop, index) => (
<Marker
key={index}
position={{ lat: shop.latitude, lng: shop.longitude }}
title={shop.name}
/>
))}
</GoogleMap>
);
};

export default ShopMap;
