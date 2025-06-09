import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const defaultCenter = {
  lat: 19.0760, // Mumbai
  lng: 72.8777
};

const LocationPicker = ({ onLocationSelect }) => {
  const [marker, setMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const mapRef = useRef(null);
  const autoCompleteRef = useRef(null);

  // ✅ Load Google Maps API safely
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  });

  // ✅ Try to get user's current location if map takes time to load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMapCenter({ lat, lng });
        },
        (error) => {
          console.warn("Geolocation error:", error);
        }
      );
    }
  }, []);

  const handleMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
      onLocationSelect({ lat, lng, address: "" });
    },
    [onLocationSelect]
  );

  const handlePlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const address = place.formatted_address;

    setMarker({ lat, lng });
    setMapCenter({ lat, lng });
    onLocationSelect({ lat, lng, address });
  };

  if (!isLoaded) return <div>Loading map...</div>; // prevent premature access

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker || mapCenter}
      zoom={13}
      onClick={handleMapClick}
      onLoad={(map) => (mapRef.current = map)}
    >
      <Autocomplete
        onLoad={(autoC) => (autoCompleteRef.current = autoC)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location"
          className="form-control m-2"
          style={{
            width: "300px",
            height: "40px",
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: "10"
          }}
        />
      </Autocomplete>

      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
};

export default LocationPicker;
