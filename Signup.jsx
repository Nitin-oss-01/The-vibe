import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary bg-gradient px-3">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-5 rounded-4 shadow-lg w-100"
        style={{ maxWidth: "420px", backdropFilter: "blur(10px)" }}
      >
        <h1 className="text-center mb-4 text-primary">Create an Account</h1>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label className="form-label text-dark">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-primary w-100"
          >
            Sign Up
          </motion.button>
        </form>
        <p className="text-center text-dark mt-3">
          Already have an account?{" "}
          <span
            className="text-decoration-underline text-primary cursor-pointer"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
