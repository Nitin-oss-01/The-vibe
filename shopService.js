// src/services/shopService.js
import axios from "axios";

export const getAllShops = async () => {
  const res = await axios.get("/api/shops"); // Make sure this returns shops with latitude & longitude
  return res.data;
};
