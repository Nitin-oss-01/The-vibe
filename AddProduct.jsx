
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, fetchShops as fetchUserShops } from "../services/authservice";

const AddProduct = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    shopId: "",
  });

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await fetchUserShops();
        setShops(data);
      } catch (err) {
        alert("Error fetching your shops");
      }
    };

    fetchShops();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(formData);
      alert("Product added successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Error creating product");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="url"
            className="form-control"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Shop</label>
          <select
            className="form-select"
            name="shopId"
            required
            value={formData.shopId}
            onChange={handleChange}
          >
            <option value="">-- Choose your shop --</option>
            {shops.map((shop) => (
              <option key={shop.id || shop._id} value={shop.id || shop._id}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
