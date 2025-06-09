import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const EditShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shopData, setShopData] = useState({
    name: "",
    description: "",
    area: "",
    latitude: "",
    longitude: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const res = await fetch(`${API_URL}/shops/my`);
        const shops = await res.json();
        const shop = shops.find((s) => s._id === id);

        if (!shop) {
          alert("Shop not found");
          navigate("/profile");
          return;
        }

        setShopData({
          name: shop.name || "",
          description: shop.description || "",
          area: shop.area || "",
          latitude: shop.latitude || "",
          longitude: shop.longitude || "",
          category: shop.category || "",
        });

        // Preview current image
        setImagePreview(
          shop.imageUrl?.startsWith("http")
            ? shop.imageUrl
            : `http://localhost:5000${shop.imageUrl}`
        );

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch shop:", err);
        alert("Failed to load shop data");
        navigate("/profile");
      }
    };

    fetchShop();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const formData = new FormData();
      formData.append("name", shopData.name);
      formData.append("description", shopData.description);
      formData.append("area", shopData.area);
      formData.append("latitude", shopData.latitude);
      formData.append("longitude", shopData.longitude);
      formData.append("category", shopData.category);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch(`${API_URL}/shops/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update shop");
      }

      alert("Shop updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error updating shop:", err);
      alert("Error updating shop: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading shop data...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Shop</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Shop Name</label>
          <input
            type="text"
            name="name"
            value={shopData.name}
            onChange={handleInputChange}
            className="form-control"
            required
            maxLength={100}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={shopData.description}
            onChange={handleInputChange}
            className="form-control"
            rows={3}
            maxLength={500}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Area</label>
          <input
            type="text"
            name="area"
            value={shopData.area}
            onChange={handleInputChange}
            className="form-control"
            required
            maxLength={50}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Latitude</label>
          <input
            type="number"
            step="any"
            name="latitude"
            value={shopData.latitude}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Longitude</label>
          <input
            type="number"
            step="any"
            name="longitude"
            value={shopData.longitude}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            value={shopData.category}
            onChange={handleInputChange}
            className="form-control"
            maxLength={50}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Shop Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Shop Preview"
              style={{ marginTop: "10px", maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/profile")}
          disabled={saving}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditShop;
