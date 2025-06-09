// src/pages/ShopMapPage.jsx
import React, { useEffect, useState } from "react";
import ShopMap from "../components/ShopMap";
import { getAllShops } from "../services/shopService";

const ShopMapPage = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await getAllShops();
        setShops(res);
      } catch (err) {
        console.error("Error fetching shops:", err);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Shops on Map</h2>
      <ShopMap shops={shops} />
    </div>
  );
};

export default ShopMapPage;
