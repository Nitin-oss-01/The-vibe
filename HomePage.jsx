import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllShops } from "../services/authservice";  // Fetch all shops for HomePage
import ShopCard from "../components/ShopCard";
import MapComponent from '../components/MapComponent'; // 🗺️ Import MapComponent

const HomePage = () => {
  const [shops, setShops] = useState([]);
  const [userId, setUserId] = useState(null);
  const sliderImages = [
    "src/assets/photo5.webp",
    "src/assets/photo6.png",
    "src/assets/photo7.webp"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.userId);
      } catch (e) {
        console.error("Failed to parse token", e);
      }
    }

    // Fetch all shops publicly (no token required)
    fetchAllShops().then((data) => {
      const updatedData = data.map(shop => ({
  ...shop,
  imageUrl: shop.imageUrl?.startsWith("http")
    ? shop.imageUrl
    : `http://localhost:5000${shop.imageUrl}`
}));

      setShops(updatedData);
    });
  }, []);

  return (
    <div className="bg-light text-dark">
      {/* Hero Slider + Login Section */}
      <section
        className="position-relative"
        style={{ height: '300px', overflow: 'hidden' }}
      >
        <img
          src={sliderImages[currentIndex]}
          alt="Hero Slide"
          className="w-100 h-100"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: 'rgba(0,0,0,0.6)' }}
        >
          <div className="container-sm text-center text-white">
            <h1 className="display-5 fw-bold mb-2">THE Vibe</h1>
            <p className="h6 mb-3">Your Anime Market for Local Vendors</p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/signup" className="btn btn-light btn-md rounded-pill px-3 shadow">
                Join Us
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-md rounded-pill px-3">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="py-5 bg-white">
        <div className="container-sm text-center">
          <h2 className="display-5 fw-semibold mb-5">What We Provide</h2>
          <div className="row gy-4">
            {[{
              img: "src/assets/photo3.jpg",
              title: "Browse Shops near you"
            }, {
              img: "src/assets/photo1.jpeg",
              title: "Shop Categories"
            }, {
              img: "src/assets/photo4.jpg",
              title: "Support Vendors"
            }].map((item, idx) => (
              <div key={idx} className="col-md-4">
                <div className="card border-0 shadow-lg h-100">
                  <img
                    src={item.img}
                    className="card-img-top rounded-top"
                    alt={item.title}
                    style={{ height: '200px', objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{item.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shops List Section */}
      <section className="py-5 bg-light">
        <div className="container-sm">
          <h2 className="text-center display-5 fw-semibold mb-4">Local Shops</h2>

          {/* 🗺️ Map Section */}
          <div className="mb-5">
            <MapComponent shops={shops} />
          </div>

          {/* 🛍️ Shops Grid */}
          <div className="row gy-4">
            {shops.map((shop) => (
              <div key={shop.id || shop._id} className="col-md-4">
                <ShopCard shop={shop} isOwner={userId === shop.user_id} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
