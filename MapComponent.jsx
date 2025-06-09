// src/components/MapComponent.jsx
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
width: '100%',
height: '500px'
};

const defaultCenter = {
lat: 19.0760, // Mumbai
lng: 72.8777
};

const MapComponent = ({ shops }) => {
const [selectedShop, setSelectedShop] = useState(null);

return (
<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
<GoogleMap
mapContainerStyle={containerStyle}
center={defaultCenter}
zoom={12}
>
{shops.map(shop => {
const lat = parseFloat(shop.latitude);
const lng = parseFloat(shop.longitude);

// Skip invalid coordinates
if (isNaN(lat) || isNaN(lng)) return null;

return (
<Marker
key={shop.id}
position={{ lat, lng }}
onClick={() => setSelectedShop(shop)}
/>
);
})}

{selectedShop && !isNaN(parseFloat(selectedShop.latitude)) && !isNaN(parseFloat(selectedShop.longitude)) && (
<InfoWindow
position={{
lat: parseFloat(selectedShop.latitude),
lng: parseFloat(selectedShop.longitude)
}}
onCloseClick={() => setSelectedShop(null)}
>
<div>
<h6>{selectedShop.name}</h6>
<p>{selectedShop.description}</p>
{selectedShop.imageUrl && (
<img src={selectedShop.imageUrl} alt="Shop" width="100" />
)}
</div>
</InfoWindow>
)}
</GoogleMap>
</LoadScript>
);
};

export default MapComponent;
